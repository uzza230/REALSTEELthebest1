document.addEventListener("dragstart",function(e){if(e.target&&(e.target.tagName==="IMG"||(e.target.closest&&e.target.closest(".wm,.rcard"))))e.preventDefault()});document.addEventListener("contextmenu",function(e){if(e.target&&e.target.closest&&e.target.closest(".herologo"))e.preventDefault()});
/* หน้าแรก: ย่อเนื้อหาให้พอดีหนึ่งหน้าจอเสมอ (ไม่ต้องเลื่อน) */
(function(){
  var hi=document.querySelector('.hero-in'),he=document.getElementById('hero');
  function fit(){
    if(!hi||!he) return;
    hi.style.transform=''; hi.style.transformOrigin='';
    hi.style.marginBottom='';
    if(window.matchMedia('(max-width:900px)').matches) return;
    if(!document.body.classList.contains('is-home')) return;
    var cs=getComputedStyle(he),avail=he.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
    var need=hi.offsetHeight;
    if(need>avail&&avail>0){ hi.style.transformOrigin='left top'; hi.style.transform='scale('+(avail/need)+')'; hi.style.marginBottom=-(need-avail)+'px' } else hi.style.marginBottom='';
  }
  window.addEventListener('resize',fit);
  window.addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
  new MutationObserver(function(){ setTimeout(fit,0) }).observe(document.body,{attributes:true,attributeFilter:['class']});
  fit();
})();
