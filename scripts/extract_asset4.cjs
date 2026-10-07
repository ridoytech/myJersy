const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');

async function extractFromAsset4() {
  const src = 'd:/Next Js/Myjarsey/assets/Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (4).jpg';

  // In asset 4 (1088 x 1344):
  // Bottom collage is roughly y: 620 to 760
  // Let's crop:
  // 1. Male athlete in burgundy/gold: x: 500 to 550, y: 630 to 705
  // 2. Red jerseys in locker room: x: 550 to 600, y: 645 to 705
  // 3. Model showing back YOURNAME 00: x: 250 to 495, y: 120 to 365 (This is a huge gorgeous shot!)
  // 4. Fabric texture: x: 405 to 505, y: 288 to 368

  // Big YOURNAME 00 stealth kit shot:
  await sharp(src)
    .extract({ left: 254, top: 122, width: 242, height: 242 })
    .toFile('d:/Next Js/Myjarsey/apps/web/public/images/gallery-8.jpg');
  console.log('Saved gallery-8.jpg (YOURNAME 00 back view)');

  // Fabric close up:
  await sharp(src)
    .extract({ left: 407, top: 290, width: 95, height: 80 })
    .resize(320, 500, { fit: 'cover' })
    .toFile('d:/Next Js/Myjarsey/apps/web/public/images/gallery-9.jpg');
  console.log('Saved gallery-9.jpg (Fabric macro)');

  // Male athlete in burgundy:
  await sharp(src)
    .extract({ left: 502, top: 633, width: 46, height: 68 })
    .resize(320, 500, { fit: 'cover' })
    .toFile('d:/Next Js/Myjarsey/apps/web/public/images/gallery-10.jpg');
  console.log('Saved gallery-10.jpg (Burgundy kit athlete)');
}

extractFromAsset4();
