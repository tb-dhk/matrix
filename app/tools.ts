import matter from 'gray-matter';
import SHA256 from "crypto-js/sha256";

export async function getDirectoryContents(path) {
  const owner = "tb-dhk";
  const repo = "matrix-vault";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });

  const data = await response.json();
  return data;  // array of files and folders
}

export async function getFileContents(path) {
  const owner = "tb-dhk";
  const repo = "matrix-vault";
  const token = import.meta.env.VITE_GITHUB_TOKEN;  // keep this secret!
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3+json"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  // decode base64 content
  const content = atob(data.content.replace(/\n/g, ''));
  return content;
}

export async function getBuildJSON() {
  const json = await getFileContents("build.json")
  return JSON.parse(json)
}

export async function getConfigJSON() {
  const json = await getFileContents("config.json")
  return JSON.parse(json)
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
  return path.split("/").slice(0, -1).join("/") 
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
