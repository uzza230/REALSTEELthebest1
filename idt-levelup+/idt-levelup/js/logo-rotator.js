(function(){var l=[].slice.call(document.querySelectorAll(".hlogo")),sp=l.filter(function(x){return x.classList.contains("hsp")})[0],base=l.filter(function(x){return x!==sp}),cur=l.filter(function(x){return x.classList.contains("on")})[0]||base[0],last=Date.now();if(base.length<2)return;
function go(n){cur.classList.remove("on");n.classList.add("on");cur=n}
setInterval(function(){var n;if(sp&&Date.now()-last>=25000){n=sp;last=Date.now()}else{var c=base.filter(function(x){return x!==cur});n=c[Math.floor(Math.random()*c.length)]}go(n)},3000)})();
