const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');

async function testCrop() {
  const src = 'C:/Users/WALTON/.gemini/antigravity-ide/brain/43c52a41-dce4-48cd-b746-c73bd4103f0e/.user_uploaded/media_1791310107946.jpg';
  const meta = await sharp(src).metadata();
  console.log('Source:', meta.width, 'x', meta.height);

  // The 5 cards in media_1791310107946.jpg
  // Card 1: 0 to 167
  // Card 2: 168 to 386
  // Card 3: 387 to 630
  // Card 4: 631 to 852
  // Card 5: 853 to 1024
  // Y range: roughly 130 to 485 (height 355)

  const cards = [
    { name: 'gallery-1.jpg', left: 0, top: 130, width: 168, height: 355 },
    { name: 'gallery-2.jpg', left: 168, top: 130, width: 219, height: 355 },
    { name: 'gallery-3.jpg', left: 387, top: 130, width: 244, height: 355 },
    { name: 'gallery-4.jpg', left: 631, top: 130, width: 222, height: 355 },
    { name: 'gallery-5.jpg', left: 853, top: 130, width: 171, height: 355 },
  ];

  for (const c of cards) {
    await sharp(src)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toFile(`d:/Next Js/Myjarsey/apps/web/public/images/${c.name}`);
    console.log('Saved', c.name);
  }
}

testCrop();
