const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');

async function cropMore() {
  const src = 'd:/Next Js/Myjarsey/assets/Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (4).jpg';

  // Crop athlete in cyan kit:
  await sharp(src)
    .extract({ left: 352, top: 638, width: 48, height: 70 })
    .resize(320, 500, { fit: 'cover' })
    .toFile('d:/Next Js/Myjarsey/apps/web/public/images/gallery-9.jpg');
  console.log('Saved gallery-9.jpg (Cyan kit athlete)');
}

cropMore();
