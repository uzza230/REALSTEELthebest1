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

show(IDS.indexOf(location.hash.slice(1))>=0?location.hash.slice(1):'home',{silent:true});
if(mob.matches&&location.hash.length>1&&IDS.indexOf(location.hash.slice(1))>0) window.addEventListener('load',function(){ var el=document.getElementById(location.hash.slice(1)); window.scrollTo(0,el.getBoundingClientRect().top+scrollY-document.querySelector('.top').offsetHeight-6) });
