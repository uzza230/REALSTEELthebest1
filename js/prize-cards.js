/* การ์ดรางวัล: มือถือ/ทัชสกรีน แตะเพื่อกาง-ซ่อนรายละเอียด (เดสก์ท็อปใช้ hover ผ่าน CSS) */
(function(){
  var touch=window.matchMedia('(hover:none), (pointer:coarse)');
  function toggle(c){var o=c.classList.toggle('open');c.setAttribute('aria-expanded',o)}
  document.querySelectorAll('.pc').forEach(function(c){
    c.addEventListener('click',function(){ if(touch.matches) toggle(c) });
    c.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); if(touch.matches) toggle(c) }
    });
  });
})();

/* เริ่มต้น: อ่านหน้าจาก path (หรือ #เก่า) แล้วแปลง URL ให้สะอาด */
var startId=pathId();
show(startId,{silent:true});
if(location.protocol.indexOf('http')===0){ try{ history.replaceState(null,'',urlFor(startId)) }catch(e){} }
if(mob.matches&&startId!=='home'){
  /* มือถือ: เปิดลิงก์ตรงไปยังหัวข้อ — เลื่อนทันที และเลื่อนซ้ำเมื่อเลย์เอาต์นิ่ง (ฟอนต์/รูปโหลดเสร็จ) */
  var jump=function(){ var el=document.getElementById(startId); if(!el) return; spyLock=Date.now()+900;
    window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-document.querySelector('.top').offsetHeight-6,behavior:'instant'}) };
  window.addEventListener('load',function(){ jump(); setTimeout(jump,400) });
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(jump);
}
