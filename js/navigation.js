var IDS=['home','info','rules','qa','map','reg'];
var firstShow=true;
var mob=window.matchMedia('(max-width:900px)'),spyLock=0;
function setActive(id){
  document.querySelectorAll('.nav button').forEach(function(b){
    var on=b.dataset.t===id; b.classList.toggle('on',on);
    if(on) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
  });
  document.body.classList.toggle('is-home',id==='home');
}
function spy(){
  if(!mob.matches||Date.now()<spyLock) return;
  var hh=document.querySelector('.top').offsetHeight+40,cur='home';
  IDS.forEach(function(i){ var e=document.getElementById(i); if(e&&e.getBoundingClientRect().top<=hh) cur=i });
  if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4) cur='reg';
  setActive(cur);
}
var spyT=0;
window.addEventListener('scroll',function(){ if(!spyT) spyT=requestAnimationFrame(function(){spyT=0;spy()}) },{passive:true});
mob.addEventListener&&mob.addEventListener('change',function(){
  document.querySelectorAll('.tab').forEach(function(s){s.classList.toggle('on',s.id==='home')});
  show('home',{silent:true});
});

function show(id,opts){
  if(IDS.indexOf(id)<0) id='home';
  if(!mob.matches) document.querySelectorAll('.tab').forEach(function(s){s.classList.toggle('on',s.id===id)});
  document.querySelectorAll('.nav button').forEach(function(b){
    var on=b.dataset.t===id; b.classList.toggle('on',on);
    if(on) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
  });
  document.body.classList.toggle('is-home',id==='home');
  setMenu(false);
  if(id==='rules'&&window.matchMedia('(max-width:900px)').matches){
    var rl=document.querySelectorAll('#rules details.rd');
    rl.forEach(function(d){d.open=false});
    if(rl[0]&&rl[0].parentNode) rl[0].parentNode.classList.remove('one-open');
  }
  if(!(opts&&opts.silent)){
    try{ if(location.hash!=='#'+id) history.replaceState(null,'',id==='home'?location.pathname+location.search:'#'+id) }catch(e){}
    if(mob.matches){ var el=document.getElementById(id),hh=document.querySelector('.top').offsetHeight; spyLock=Date.now()+900; window.scrollTo({top:id==='home'?0:el.getBoundingClientRect().top+window.scrollY-hh-6,behavior:firstShow?'auto':'smooth'}) }
    else window.scrollTo({top:0,behavior:firstShow?'auto':'smooth'});
  }
  firstShow=false;
}
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-go]');
  if(g){ e.preventDefault(); show(g.dataset.go); return }
  var b=e.target.closest('.nav button');
  if(b) show(b.dataset.t);
});
window.addEventListener('hashchange',function(){ show(location.hash.slice(1)) });

/* เมนูมือถือ */
var burger=document.getElementById('burger');
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  burger.setAttribute('aria-expanded',open);
  burger.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');
}
burger.addEventListener('click',function(){ setMenu(!document.body.classList.contains('menu-open')) });
document.addEventListener('keydown',function(e){ if(e.key==='Escape') setMenu(false) });
window.addEventListener('resize',function(){ if(window.innerWidth>1120) setMenu(false) });
document.addEventListener('click',function(e){ if(document.body.classList.contains('menu-open')&&!e.target.closest('.nav')&&!e.target.closest('#burger,.burger')) setMenu(false) });

var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
