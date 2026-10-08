(function(){
var thumb=document.querySelector(".map-img"),btn=document.querySelector(".map-full"),lb=document.getElementById("lb"),im=document.getElementById("lbImg");
if(!thumb||!lb)return;
var sc=1,fit=1,x=0,y=0,pts={},pd=0,ps=1,drag=null;var moved=false,sx=0,sy=0;
function ap(){im.style.transform="translate("+x+"px,"+y+"px) scale("+sc+")"}
function clampXY(){var w=im.naturalWidth*sc,h=im.naturalHeight*sc,W=innerWidth,H=innerHeight;
 x=w<=W?(W-w)/2:Math.min(0,Math.max(W-w,x));y=h<=H?(H-h)/2:Math.min(0,Math.max(H-h,y))}
function reset(){fit=Math.min(innerWidth/im.naturalWidth,innerHeight/im.naturalHeight);sc=fit;x=y=0;clampXY();ap()}
function zoomAt(f,cx,cy){var n=Math.min(fit*8,Math.max(fit,sc*f));f=n/sc;x=cx-(cx-x)*f;y=cy-(cy-y)*f;sc=n;clampXY();ap()}
function open(){im.onload=reset;im.src=thumb.currentSrc||thumb.src;lb.classList.add("on");document.body.style.overflow="hidden";if(im.complete&&im.naturalWidth)reset();
 var r=lb.requestFullscreen||lb.webkitRequestFullscreen;try{r&&r.call(lb)}catch(e){}}
function close(){lb.classList.remove("on");document.body.style.overflow="";
 var f=document.fullscreenElement||document.webkitFullscreenElement;if(f){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}}}
thumb.addEventListener("click",open);btn.addEventListener("click",open);
document.getElementById("lbClose").addEventListener("click",close);
document.getElementById("lbIn").addEventListener("click",function(){zoomAt(1.5,innerWidth/2,innerHeight/2)});
document.getElementById("lbOut").addEventListener("click",function(){zoomAt(1/1.5,innerWidth/2,innerHeight/2)});
lb.addEventListener("click",function(e){if(moved){moved=false;return}if(e.target.closest(".lb-bar"))return;var r=im.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()});
document.addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;
 if(e.key==="Escape")close();else if(e.key==="+"||e.key==="=")zoomAt(1.25,innerWidth/2,innerHeight/2);else if(e.key==="-")zoomAt(.8,innerWidth/2,innerHeight/2)});
document.addEventListener("fullscreenchange",function(){if(!document.fullscreenElement&&lb.classList.contains("on")){lb.classList.remove("on");document.body.style.overflow=""}});
lb.addEventListener("wheel",function(e){e.preventDefault();zoomAt(e.deltaY<0?1.15:1/1.15,e.clientX,e.clientY)},{passive:false});
lb.addEventListener("dblclick",function(e){if(e.target.closest(".lb-bar"))return;if(sc>fit*1.01)reset();else zoomAt(2.5,e.clientX,e.clientY)});
function dist(){var k=Object.keys(pts),a=pts[k[0]],b=pts[k[1]];return Math.hypot(a.x-b.x,a.y-b.y)}
lb.addEventListener("pointerdown",function(e){if(e.target.closest(".lb-bar"))return;pts[e.pointerId]={x:e.clientX,y:e.clientY};try{lb.setPointerCapture(e.pointerId)}catch(_){}
 var n=Object.keys(pts).length;if(n===2){pd=dist();ps=sc;drag=null}else{drag={x:e.clientX-x,y:e.clientY-y};sx=e.clientX;sy=e.clientY;moved=false;lb.classList.add("drag")}});
lb.addEventListener("pointermove",function(e){if(!pts[e.pointerId])return;pts[e.pointerId]={x:e.clientX,y:e.clientY};
 var k=Object.keys(pts);if(k.length===2){var a=pts[k[0]],b=pts[k[1]],t=ps*dist()/pd;zoomAt(t/sc,(a.x+b.x)/2,(a.y+b.y)/2)}
 else if(drag){if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>4)moved=true;x=e.clientX-drag.x;y=e.clientY-drag.y;clampXY();ap()}});
function up(e){delete pts[e.pointerId];drag=null;lb.classList.remove("drag");var k=Object.keys(pts);if(k.length===1){var p=pts[k[0]];drag={x:p.x-x,y:p.y-y}}}
lb.addEventListener("pointerup",up);lb.addEventListener("pointercancel",up);
addEventListener("resize",function(){if(lb.classList.contains("on"))reset()});
})();
