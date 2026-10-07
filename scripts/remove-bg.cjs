const fs = require('fs');
const path = require('path');
const sharp = require('D:/Next Js/Myjarsey/node_modules/.pnpm/sharp@0.35.5_@types+node@24.19.1/node_modules/sharp');

async function removeBackground(inputPath, outputPath, options = {}) {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Create RGBA buffer
  const outData = Buffer.alloc(width * height * 4);
  const visited = new Uint8Array(width * height);

  // Background criteria:
  // Studio background is neutral gray/white (r, g, b are close to each other)
  // Distance from gray line: max(r,g,b) - min(r,g,b)
  function isBgPixel(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max - min;
    const brightness = (r + g + b) / 3;

    // Below jersey bottom (shadow area)
    if (y > height * 0.82) {
      // In bottom shadow area, anything neutral gray is background or shadow
      if (saturation < 20) return true;
    }

    // Top and sides: background is light neutral gray
    // Studio background brightness is typically > 120 and saturation < 25
    if (brightness > 115 && saturation < 25) {
      return true;
    }

    // Extremely light pixels
    if (brightness > 210 && saturation < 35) {
      return true;
    }

    return false;
  }

  // BFS Queue for flood fill from borders
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function push(x, y) {
    const idx = y * width + x;
    if (visited[idx] === 0) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  }

  // Seed borders
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // Check 4 neighbors
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (visited[nidx] === 0) {
          if (isBgPixel(nx, ny)) {
            visited[nidx] = 1;
            queue[tail++] = nidx;
          }
        }
      }
    }
  }

  // Build RGBA output with edge feathering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * channels;
      const dstIdx = pIdx * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      outData[dstIdx] = r;
      outData[dstIdx + 1] = g;
      outData[dstIdx + 2] = b;

      if (visited[pIdx] === 1) {
        outData[dstIdx + 3] = 0; // Fully transparent
      } else {
        // Check if on border of visited (for smoothing)
        let bgNeighbor = false;
        if (x > 0 && visited[pIdx - 1] === 1) bgNeighbor = true;
        else if (x < width - 1 && visited[pIdx + 1] === 1) bgNeighbor = true;
        else if (y > 0 && visited[pIdx - width] === 1) bgNeighbor = true;
        else if (y < height - 1 && visited[pIdx + width] === 1) bgNeighbor = true;

        if (bgNeighbor) {
          outData[dstIdx + 3] = 180; // Feather edge
        } else {
          outData[dstIdx + 3] = 255;
        }
      }
    }
  }

  await sharp(outData, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile(outputPath);

  console.log('Saved transparent PNG to:', outputPath);
}

async function main() {
  const images = [
    { in: 'apps/web/public/images/jersey-maroon.jpg', out: 'apps/web/public/images/jersey-maroon.png' },
    { in: 'apps/web/public/images/jersey-legacy.jpg', out: 'apps/web/public/images/jersey-legacy.png' },
    { in: 'apps/web/public/images/jersey-volt.jpg', out: 'apps/web/public/images/jersey-volt.png' },
  ];

  for (const img of images) {
    if (fs.existsSync(img.in)) {
      await removeBackground(img.in, img.out);
    }
  }
}

main().catch(console.error);
