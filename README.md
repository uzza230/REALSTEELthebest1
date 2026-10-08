# IDT LEVEL UP MULTI GAME CHALLENGE

เว็บไซต์ประชาสัมพันธ์งานแข่งขัน **LAN LEGACY LEVEL UP+** (Real Steel: The Game)
เป็น static site (HTML + CSS + JavaScript ล้วน) ไม่ต้อง build

## โครงสร้างโปรเจกต์

```
idt-levelup/
├── index.html              โครงหน้าเว็บ (markup เท่านั้น)
├── css/                    สไตล์ เรียงตามลำดับการโหลด (ลำดับมีผลต่อ cascade)
│   ├── 01-fonts.css        @font-face
│   ├── 02-base.css         ตัวแปรสี, reset, พื้นหลัง
│   ├── 03-header.css       แถบเมนูด้านบน
│   ├── 04-hero.css         หน้าแรก (hero) และปุ่ม CTA
│   ├── 05-sections.css     หน้าย่อย: รายละเอียด, กติกา, Q&A, ผังสถานที่, สมัคร
│   ├── 06-theme.css        ธีมน้ำเงิน/ขาว/เทา (override)
│   ├── 07-countdown-nav.css  นับถอยหลัง HUD และกรอบเมนู
│   └── 08-responsive.css   การปรับสำหรับมือถือ/แท็บเล็ต
├── js/
│   ├── navigation.js       สลับแท็บ, scroll spy, เมนูมือถือ
│   ├── accordion.js        การ์ดกติกา/Q&A
│   ├── effects.js          ประกายไฟพื้นหลัง
│   ├── share.js            ปุ่มแชร์
│   ├── countdown.js        นับถอยหลังปิดรับสมัคร
│   ├── prize-cards.js      การ์ดรางวัล
│   ├── logo-rotator.js     สลับโลโก้หน้าแรก
│   ├── guards.js           กันลาก/คลิกขวารูป และปรับขนาด hero ให้พอดีจอ
│   ├── lightbox.js         ดูผังสถานที่เต็มจอ (ซูม/ลาก)
│   └── scroll-cue.js       ตัวชี้ชวนเลื่อนลง
└── assets/
    ├── icons/              favicon และ apple-touch-icon (ทำจากตรามหาวิทยาลัย)
    ├── fonts/              ฟอนต์ที่ฝังไว้เอง
    └── images/             โลโก้ พื้นหลัง ผังสถานที่ การ์ดสมัคร
```

> สคริปต์โหลดแบบ `defer` ตามลำดับใน `index.html` และใช้ global scope ร่วมกัน
> (เช่น `navigation.js` ต้องโหลดก่อนไฟล์อื่น)

## รันบนเครื่อง

```bash
npm run dev      # เปิด http://localhost:3000
```

หรือเปิด `index.html` ตรงๆ ก็ได้ (ใช้งานได้ แต่ URL จะไม่เปลี่ยนตามหน้า)

## URL ของแต่ละหน้า (ไม่มี `#`)

`/` หน้าแรก · `/info` · `/rules` · `/qa` · `/map` · `/reg`

ใช้ History API ใน `js/navigation.js` และ `vercel.json` (`rewrites`) ส่งทุกเส้นทางไปที่ `index.html`
**หลังแก้ `index.html` ต้องรัน `npm run build:routes`** เพื่อสร้าง `info/`, `rules/`, `qa/`, `map/`, `reg/` ใหม่
(โฟลเดอร์เหล่านี้ทำให้ URL ใช้ได้บนโฮสต์ใดก็ได้ แม้ไม่มีกฎ rewrite)

ลิงก์เก่าแบบ `/#info` ยังใช้ได้และจะถูกแปลงเป็น `/info` อัตโนมัติ

## ปรับค่าที่ใช้บ่อย

| สิ่งที่ต้องการแก้ | ไฟล์ |
| --- | --- |
| วัน-เวลาปิดรับสมัคร | `js/countdown.js` (ตัวแปร `deadline`) |
| ข้อความ รางวัล กติกา Q&A | `index.html` |
| สี/ธีม | `css/02-base.css` (`:root`) และ `css/06-theme.css` |
| ลิงก์สมัคร/ทดลองเล่น | `index.html` (ส่วน `#reg`) |

## Deploy

เชื่อมรีโพกับ Vercel ได้เลย (มี `vercel.json` ตั้งค่า cache ไว้ให้) ไม่ต้องตั้ง build command
ตั้ง Output Directory เป็น `.` (root)
