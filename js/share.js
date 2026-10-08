/* แชร์ */
(function(){
  var t=document.getElementById('toast'),tt;
  function say(m){ t.textContent=m; t.classList.add('on'); clearTimeout(tt); tt=setTimeout(function(){ t.classList.remove('on') },2200) }
  var _sb=document.getElementById('shareBtn');_sb&&_sb.addEventListener('click',function(){
    var data={title:document.title,url:location.href};
    if(navigator.share){ navigator.share(data).catch(function(){}) }
    else if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(location.href).then(function(){ say('คัดลอกลิงก์แล้ว') },function(){ say('คัดลอกลิงก์ไม่สำเร็จ') }) }
    else say('คัดลอกลิงก์จากแถบที่อยู่ได้เลย');
  });
})();
