/**
 * สร้างไฟล์จริงให้แต่ละเส้นทาง (/info/index.html ฯลฯ) จาก index.html
 * เพื่อให้ URL แบบไม่มี # ใช้ได้บนโฮสต์ static ทุกที่ โดยไม่ต้องพึ่งกฎ rewrite
 * รัน: npm run build:routes   (ทุกครั้งที่แก้ index.html)
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const routes = ['info', 'rules', 'qa', 'map', 'reg'];
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// ในหน้าย่อย ใช้ path แบบ root-absolute (/css/..., /js/..., /assets/...)
const page = source.replace(/(href|src)="(css\/|js\/|assets\/|favicon\.ico)/g, '$1="/$2');

for (const r of routes) {
  const dir = path.join(root, r);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
  console.log('generated', r + '/index.html');
}
