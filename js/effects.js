/* ประกายไฟลอยขึ้น */
(function(){
  if(reduce) return;
  var fx=document.getElementById('fx');
  for(var i=0;i<22;i++){
    var s=document.createElement('i'); s.className='sp';
    var z=3+Math.random()*5;
    s.style.cssText='left:'+(Math.random()*100)+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(9+Math.random()*10)+'s;animation-delay:'+(-Math.random()*16)+'s;--dx:'+(-80+Math.random()*160)+'px';
    fx.appendChild(s);
  }
  var f2=document.getElementById('fx2');
  for(var k=0;k<11;k++){
    var q=document.createElement('i'); q.className='sp';
    var w=2.5+Math.random()*3.5;
    q.style.cssText='left:'+(Math.random()*100)+'%;width:'+w+'px;height:'+w+'px;animation-duration:'+(12+Math.random()*12)+'s;animation-delay:'+(-Math.random()*22)+'s;--dx:'+(-60+Math.random()*120)+'px';
    f2.appendChild(q);
  }
})();
