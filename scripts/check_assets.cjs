const fs = require('fs');
const sharp = require('d:/Next Js/Myjarsey/apps/web/node_modules/sharp');
const dir = 'd:/Next Js/Myjarsey/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

async function run() {
  for (const f of files) {
    const meta = await sharp(`${dir}/${f}`).metadata();
    console.log(f, ':', meta.width, 'x', meta.height);
  }
}
run();
