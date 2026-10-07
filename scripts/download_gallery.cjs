const fs = require('fs');
const https = require('https');

const extraImages = [
  {
    name: 'gallery-6.jpg',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    title: 'Matchday Spotlight #10',
    subtitle: 'STADIUM PERFORMANCE • BREATHABLE MESH',
  },
  {
    name: 'gallery-7.jpg',
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop',
    title: 'Pro Championship Kit',
    subtitle: 'ELITE LEAGUE • CUSTOM SUBLIMATION',
  },
  {
    name: 'gallery-8.jpg',
    url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop',
    title: 'Velocity Sprint Series',
    subtitle: 'TRACK & FIELD • SEAMLESS FIT',
  },
  {
    name: 'gallery-9.jpg',
    url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=800&auto=format&fit=crop',
    title: 'Varsity Hoops Edition',
    subtitle: 'BASKETBALL • HERITAGE TEAMWEAR',
  },
];

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

async function run() {
  for (const item of extraImages) {
    const dest = `d:/Next Js/Myjarsey/apps/web/public/images/${item.name}`;
    try {
      console.log('Downloading', item.name, '...');
      await download(item.url, dest);
      console.log('Downloaded', item.name);
    } catch (e) {
      console.error('Error downloading', item.name, e.message);
    }
  }
}

run();
