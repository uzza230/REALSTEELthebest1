/* นับถอยหลังปิดรับสมัคร */
(function(){
  var deadline=new Date('2026-10-30T23:59:59+07:00').getTime();
  var g={d:document.getElementById('homeCdD'),h:document.getElementById('homeCdH'),m:document.getElementById('homeCdM'),s:document.getElementById('homeCdS'),st:document.getElementById('homeRegStatus')};
  function pad(n){return String(n).padStart(2,'0')}
  function tick(){
    var diff=deadline-Date.now();
    if(diff<=0){
      g.d.textContent=g.h.textContent=g.m.textContent=g.s.textContent='0';
      g.st.textContent='ปิดรับสมัครแล้ว'; g.st.classList.add('closed');
      clearInterval(timer); return;
    }
    g.d.textContent=Math.floor(diff/86400000);
    g.h.textContent=pad(Math.floor(diff%86400000/3600000));
    g.m.textContent=pad(Math.floor(diff%3600000/60000));
    g.s.textContent=pad(Math.floor(diff%60000/1000));
  }
  tick();
  var timer=setInterval(tick,1000);
})();
