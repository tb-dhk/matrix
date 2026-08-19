import SHA256 from "crypto-js/sha256";
import YAML from 'yaml';

export const VERCEL_BLOB_BASE_URL = "https://uobd8cw20y5uorxw.public.blob.vercel-storage.com";

export function normalizePath(path) {
  if (!path || path.trim() === "") return "/";

  // Remove all leading and trailing slashes
  const cleaned = path.trim().replace(/^\/+|\/+$/g, "");

  // Return with a single leading slash
  return "/" + cleaned;
}

function rewriteImageLinks(path, markdown) {
  return markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    (_, alt, filename) => {
      const imageExtensions = /\.(png|jpg|jpeg|gif|webp|svg)$/i;
      if (!imageExtensions.test(filename)) return _; // skip if not an image

      const fullURL = `${VERCEL_BLOB_BASE_URL}${parent(path)}/assets/${filename}`;
      return `<img src="${fullURL}" alt="${alt}" style="max-width: 100%;" />\n\n`;
    }
  );
}

export async function fetchFile(path) {
  const url = `${VERCEL_BLOB_BASE_URL}/${encodeURIComponent(path)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file ${path}: ${response.status}`);
  }
  return rewriteImageLinks(path, await response.text());
}

async function getLatestCommit() {
  const url = `https://api.github.com/repos/tb-dhk/matrix-vault/commits?per_page=1`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return data[0].sha
}

export async function getFileContents(path) {
  const manifest = JSON.parse(await fetchFile(`manifest.${await getLatestCommit()}.json`)) 
  return fetchFile(manifest[`./${path}`])
}

export async function getBuildJSON() {
  return JSON.parse(await getFileContents(`build.json`)) 
}

export async function getConfigJSON() {
  return JSON.parse(await getFileContents(`config.json`))
}

export async function getDirectoryContents(directoryPath = '/') {
  const prefix = directoryPath.endsWith('/') ? directoryPath : directoryPath + '/';
  const entriesMap = new Map();

  const buildJSON = await getBuildJSON()

  for (const fullPath of Object.keys(buildJSON)) {
    if (fullPath.startsWith(prefix)) {
      let remainder = fullPath.slice(prefix.length);
      // remove leading slash if present
      if (remainder.startsWith('/')) remainder = remainder.slice(1);

      const nextSegment = remainder.split('/')[0].replace(".md$", "");
      if (!nextSegment) continue; // skip empty

      if (!entriesMap.has(nextSegment)) {
        const isFolder = remainder.includes('/');

        if (isFolder) {
          // folder: no meta
          entriesMap.set(nextSegment, {
            name: nextSegment,
            type: 'folder',
          });
        } else {
          // file: fetch meta + content asynchronously later
          entriesMap.set(nextSegment, {
            name: nextSegment,
            type: 'file',
            // placeholder for meta, to fill below
            meta: buildJSON[fullPath],
            path: fullPath, // keep path for fetching content
          });
        }
      }
    }
  }

  // fetch file contents for all files in parallel
  const entries = await Promise.all(
    Array.from(entriesMap.values()).map(async (entry) => {
      if (entry.type === 'file') {
        entry.meta = {
          ...entry.meta,
          content: await getFileContents(`vault${entry.path}.md`), // adjust path as needed
        };
      }
      return entry;
    })
  );

  return entries;
}

export function getFrontMatter(markdown) {
  const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n?/;

  const match = markdown.match(FRONTMATTER_REGEX);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const rawFrontmatter = match[1];
  const data = YAML.parse(rawFrontmatter);

  return data;
}

export function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export function weightedPick(weights) {
  const entries = Object.entries(weights);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);

  const rnd = Math.random() * totalWeight;

  let accum = 0;
  for (const [tag, weight] of entries) {
    accum += weight;
    if (rnd < accum) {
      return tag;
    }
  }
}

export function weightedPickList(weights, n) {
  const result = new Set();
  const maxAttempts = 1000; // safeguard against infinite loop

  let attempts = 0;
  while (result.size < n && attempts < maxAttempts) {
    const tag = weightedPick(weights);
    result.add(tag);
    attempts++;
  }

  return Array.from(result);
}

export function pathInSeries(path, series) {
  return Object.keys(series)
    .some(seriesPath => path.startsWith(seriesPath + "/"));
}

export function parent(path) {
  // remove trailing slash if present
  return "/" + normalizePath(path).split("/").slice(1, -1).join("/");
}

export function textToColor(text, lightness = 25) {
  const hash = SHA256(text).toString();  // hex string

  // take some portion of hash and turn into hue (0-359)
  const hue = parseInt(hash.substring(0, 6), 16) % 360;

  // build HSL string
  return `hsl(${hue}, 100%, ${lightness}%)`;
}

export function seriesLastUpdated(seriesData) {
  let date = null
  seriesData.forEach(i => {
    if (!date || i.date > date) {
      date = i.date
    }
  })
  return date
}

// characters for base36 (0-9, a-z)
const BASE36_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';

// string to integer (base36)
function stringToIntBase36(str) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const digit = BASE36_CHARS.indexOf(str[i].toLowerCase());
    if (digit === -1) throw new Error(`Invalid character: ${str[i]}`);
    result = result * 36 + digit;
  }
  return result;
}

// integer to string (base36)
function intToStringBase36(num) {
  if (num === 0) return '0';
  let result = '';
  while (num > 0) {
    const remainder = num % 36;
    result = BASE36_CHARS[remainder] + result;
    num = Math.floor(num / 36);
  }
  return result;
}

export function wordFromSecond(second, cycleLength) {
  const words = ["matrix", "origin", "genesis", "singularity"]
  const stage = Math.floor(second / cycleLength * 12) % 12
  const fromLastStage = (second / cycleLength * 12) % 1
  if (stage % 3 < 2) {
    return words[Math.floor(stage/3)]
  } else {
    const oldWord = stringToIntBase36(words[Math.floor(stage/3)])
    const newWord = stringToIntBase36(words[(Math.floor(stage/3) + 1) % 3])
    return intToStringBase36(Math.round((newWord - oldWord) * fromLastStage + oldWord))
  }
}
