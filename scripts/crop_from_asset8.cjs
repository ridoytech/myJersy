const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');

async function cropAsset8() {
  const src = 'd:/Next Js/Myjarsey/assets/Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (8).jpg';

  // We can crop the cards from the laptop screen:
  // Laptop screen starts around left: 160, top: 340, width: 620, height: 200
  // Card A: athlete in burgundy/gold kit: roughly left: 450, top: 360, width: 75, height: 110
  // Card B: locker room red kits: roughly left: 535, top: 360, width: 75, height: 110
  // Card C: athlete in cyan kit: roughly left: 255, top: 430, width: 75, height: 100

  // Let's also check asset 4!
  const meta4 = await sharp('d:/Next Js/Myjarsey/assets/Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (4).jpg').metadata();
  console.log('Asset 4:', meta4.width, 'x', meta4.height);
}

cropAsset8();
