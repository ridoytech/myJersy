const fs = require('fs');
const https = require('https');
const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Status ' + response.statusCode));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function prepareGalleryImages() {
  // 1. Recrop gallery-8 cleanly:
  const src = 'd:/Next Js/Myjarsey/assets/Recent work at @alphenex.ai An eCom website built for a jersey manufacturer in Southern Africa,  (4).jpg';
  await sharp(src)
    .extract({ left: 276, top: 165, width: 210, height: 200 })
    .resize(320, 500, { fit: 'cover' })
    .toFile('d:/Next Js/Myjarsey/apps/web/public/images/gallery-8.jpg');
  console.log('Recropped gallery-8.jpg');

  // 2. Download additional athlete lifestyle shots
  const downloads = [
    {
      name: 'gallery-9.jpg',
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'gallery-10.jpg',
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'gallery-11.jpg',
      url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop',
    },
  ];

  for (const item of downloads) {
    const dest = `d:/Next Js/Myjarsey/apps/web/public/images/${item.name}`;
    try {
      console.log('Downloading', item.name, '...');
      await download(item.url, dest);
      console.log('Downloaded', item.name);
    } catch (e) {
      console.error('Error on', item.name, e.message);
    }
  }
}

prepareGalleryImages();
