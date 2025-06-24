import matter from 'gray-matter';
import SHA256 from "crypto-js/sha256";
import { put, list, del } from '@vercel/blob';
import { config } from 'dotenv'

const VERCEL_BLOB_BASE_URL = "https://uobd8cw20y5uorxw.public.blob.vercel-storage.com";

async function fetchGithubFile(filePath) {
  const GITHUB_OWNER = 'tb-dhk';  // update as needed
  const GITHUB_REPO = 'matrix-vault';
  const GITHUB_BRANCH = 'main';
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;  // or wherever you keep it

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.raw"
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub API failed to fetch ${filePath}: ${response.status}`);
  }
  return await response.text();
}

export async function getFileContents(path) {
  // step 1: get the timestamp from github
  const timestamp = (await fetchGithubFile('timestamp.txt')).trim();

  // normalize path and insert timestamp before extension
  const ext = path.endsWith('.json') ? '.json' : '.md';
  let baseName = path;
  if (baseName.endsWith(ext)) {
    baseName = baseName.slice(0, -ext.length);
  }
  const timestampedFile = `${baseName}.${timestamp}${ext}`;

  // step 2: fetch file from vercel blob with timestamp
  const url = `${VERCEL_BLOB_BASE_URL}/${encodeURIComponent(timestampedFile)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file ${timestampedFile}: ${response.status}`);
  }
  return await response.text();
}

export async function getBuildJSON() {
  const json = await getFileContents("build.json")
  return JSON.parse(json)
}

export async function getConfigJSON() {
  const json = await getFileContents("config.json")
  return JSON.parse(json)
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
          content: await getFileContents(`vault${entry.path}`), // adjust path as needed
        };
      }
      return entry;
    })
  );

  return entries;
}

export async function getFrontMatter(path) {
  const fileContents = await getFileContents(path)

  if (!fileContents) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return matter(fileContents).data
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
  while (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path.split("/").slice(0, -1).join("/");
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
