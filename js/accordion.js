/* กติกา + Q&A (เดสก์ท็อป): เปิดได้สูงสุด 2 ข้อ ข้อเก่าสุดจะปิดเอง */
(function(){
  var desk=window.matchMedia('(min-width:901px)');
  function limit(sel){
    var items=[].slice.call(document.querySelectorAll(sel)),
        order=items.filter(function(d){return d.open});
    items.forEach(function(d){
      d.addEventListener('toggle',function(){
        var i=order.indexOf(d);
        if(!d.open){ if(i>=0) order.splice(i,1); return }
        if(i<0) order.push(d);
        if(!desk.matches) return;
        while(order.length>2){ var old=order.shift(); old.open=false }
      });
    });
  }
  limit('#rules details.rd');
  limit('#qa details.card');
})();

/* กติกา (มือถือ): เริ่มต้นพับทุกข้อ กดดูได้ตามปกติ ข้ออื่นไม่หาย */
(function(){
  var mob=window.matchMedia('(max-width:900px)');
  if(mob.matches) [].slice.call(document.querySelectorAll('#rules details.rd')).forEach(function(d){d.open=false});
})();
