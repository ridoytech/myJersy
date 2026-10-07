const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function extractCleanJerseys() {
  const f = path.resolve('../../assets', 'Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (5).jpg');
  const outDir = path.resolve('./public/images/cta-jerseys-clean');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const jerseys = [
    { name: 'maroon', left: 245, top: 220, width: 360, height: 440 },
    { name: 'emerald', left: 240, top: 960, width: 145, height: 200 },
    { name: 'legacy', left: 385, top: 960, width: 145, height: 200 },
    { name: 'volt', left: 530, top: 960, width: 145, height: 200 },
    { name: 'marble', left: 675, top: 960, width: 145, height: 200 },
  ];

  for (const j of jerseys) {
    const rawCrop = await sharp(f)
      .extract({ left: j.left, top: j.top, width: j.width, height: j.height })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = rawCrop;
    const { width, height, channels } = info;
    const rgba = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      rgba[i * 4] = data[i * channels];
      rgba[i * 4 + 1] = data[i * channels + 1];
      rgba[i * 4 + 2] = data[i * channels + 2];
      rgba[i * 4 + 3] = 255;
    }

    function isCream(x, y) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      return r > 224 && g > 218 && b > 208 && Math.abs(r - g) < 20 && Math.abs(r - b) < 30;
    }

    const visited = new Uint8Array(width * height);
    const queue = [];
    for (let x = 0; x < width; x++) {
      if (isCream(x, 0)) queue.push([x, 0]);
      if (isCream(x, height - 1)) queue.push([x, height - 1]);
    }
    for (let y = 0; y < height; y++) {
      if (isCream(0, y)) queue.push([0, y]);
      if (isCream(width - 1, y)) queue.push([width - 1, y]);
    }

    while (queue.length > 0) {
      const [x, y] = queue.pop();
      const pos = y * width + x;
      if (visited[pos]) continue;
      visited[pos] = 1;
      rgba[pos * 4 + 3] = 0;

      const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const npos = ny * width + nx;
          if (!visited[npos] && isCream(nx, ny)) {
            queue.push([nx, ny]);
          }
        }
      }
    }

    // Pass 2: Clean border feather
    for (let pass = 0; pass < 2; pass++) {
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const pos = y * width + x;
          if (visited[pos]) continue;
          const hasBgNeighbor = visited[pos - 1] || visited[pos + 1] || visited[pos - width] || visited[pos + width];
          if (hasBgNeighbor) {
            const idx = pos * channels;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            if (r > 210 && g > 205 && b > 195) {
              rgba[pos * 4 + 3] = 0;
              visited[pos] = 1;
            }
          }
        }
      }
    }

    // Trim bounding box to contents
    const outPath = path.join(outDir, j.name + '.png');
    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .png()
      .trim()
      .toFile(outPath);

    console.log('Saved', outPath);
  }
}

extractCleanJerseys().catch(console.error);
