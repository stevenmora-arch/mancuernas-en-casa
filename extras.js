(function(){
var KEY="mc-lista";
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
function track(n,d){d=d||{};try{if(window.gtag)window.gtag("event",n,d);document.dispatchEvent(new CustomEvent("mc:evento",{detail:{nombre:n,datos:d}}))}catch(e){}}
function idOf(h){var m=/link\.amazon\/([A-Za-z0-9]+)/.exec(h);return m?m[1]:null}
function count(){var l=document.getElementById("mc-lista");if(l){var n=load().length;l.textContent=n?"Mi lista ("+n+")":"Mi lista"}}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
/* Guardar productos en "Mi lista" (solo en el navegador) */
[].forEach.call(document.querySelectorAll(".pcard"),function(c){var a=c.querySelector("a.btn");if(!a||c.querySelector(".gd"))return;var id=idOf(a.href);if(!id)return;
var b=el("button","gd");b.type="button";
function paint(){var on=load().some(function(x){return x.id===id});b.setAttribute("aria-pressed",on);b.textContent=on?"Guardado en mi lista":"Guardar en mi lista"}
b.addEventListener("click",function(){var l=load(),i=-1;l.forEach(function(x,k){if(x.id===id)i=k});if(i>-1)l.splice(i,1);else{var ide=c.querySelector(".ideal");l.push({id:id,n:c.querySelector("h3").textContent,l:a.href,i:ide?ide.textContent.replace("Ideal para:","").trim():""});track("lista_guardar",{producto:id})}save(l);paint();count()});
paint();a.parentNode.insertBefore(b,a)});
count();
/* Página Mi lista */
function lista(){var box=document.getElementById("lista");if(!box)return;var l=load();box.innerHTML="";
if(!l.length){box.appendChild(el("p","","Todavía no has guardado nada. Explora el equipo y pulsa «Guardar en mi lista» en los productos que te interesen."));var a=el("a","btn","Ver el equipo");a.href="equipo.html";box.appendChild(a);return}
l.forEach(function(x){var d=el("article","lst");d.appendChild(el("h3","",x.n));if(x.i)d.appendChild(el("p","","Ideal para: "+x.i));var a=el("a","btn","Ver precio y disponibilidad en Amazon");a.href=x.l;a.target="_blank";a.rel="sponsored noopener";var q=el("button","btn ghost","Quitar");q.type="button";q.addEventListener("click",function(){save(load().filter(function(y){return y.id!==x.id}));lista();count()});d.appendChild(a);d.appendChild(q);box.appendChild(d)});
var c=el("button","btn ghost","Copiar mi lista");c.type="button";c.addEventListener("click",function(){var t=l.map(function(x){return x.n+" - "+x.l}).join("\n");if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){c.textContent="Lista copiada"})});box.appendChild(c)}
lista();
/* Funciones de rutina: marcar series, imprimir y temporizador */
var tabs=[].filter.call(document.querySelectorAll("table"),function(t){var th=t.querySelector("th");return th&&th.textContent.trim()==="Ejercicio"});
if(!tabs.length)return;
var HK="mc-hecho:"+location.pathname;
function hl(){try{return JSON.parse(localStorage.getItem(HK)||"{}")}catch(e){return{}}}
function hs(o){try{localStorage.setItem(HK,JSON.stringify(o))}catch(e){}}
var st=hl();
tabs.forEach(function(t,ti){[].forEach.call(t.querySelectorAll("tr"),function(r,ri){if(ri===0)return;var k=ti+"-"+ri,td=r.cells[0],cb=document.createElement("input");cb.type="checkbox";cb.setAttribute("aria-label","Marcar como hecho");cb.checked=!!st[k];cb.addEventListener("change",function(){var o=hl();if(cb.checked)o[k]=1;else delete o[k];hs(o)});td.insertBefore(cb,td.firstChild)})});
var first=tabs[0].closest(".tw")||tabs[0],bar=el("p","acc"),pb=el("button","btn ghost","Imprimir rutina"),rb=el("button","btn ghost","Reiniciar marcas");pb.type=rb.type="button";
pb.addEventListener("click",function(){window.print()});rb.addEventListener("click",function(){hs({});[].forEach.call(document.querySelectorAll("td input[type=checkbox]"),function(c){c.checked=false})});
bar.appendChild(pb);bar.appendChild(rb);first.parentNode.insertBefore(bar,first);
var T=el("div","tmr");T.id="mc-timer";
T.innerHTML='<div class="tmr-p" hidden><p class="tmr-d">0:00</p><div class="tmr-b"><button type="button" data-s="30">30 s</button><button type="button" data-s="45">45 s</button><button type="button" data-s="60">60 s</button><button type="button" data-s="90">90 s</button><button type="button" data-s="120">2 min</button></div><button type="button" class="tmr-x">Detener</button><p class="tmr-ok" role="status"></p></div><button type="button" class="tmr-t" aria-expanded="false">Temporizador</button>';
document.body.appendChild(T);
var P=T.querySelector(".tmr-p"),D=T.querySelector(".tmr-d"),OK=T.querySelector(".tmr-ok"),TT=T.querySelector(".tmr-t"),iv=null;
function fmt(s){return Math.floor(s/60)+":"+("0"+(s%60)).slice(-2)}
function beep(){try{var C=new (window.AudioContext||window.webkitAudioContext)(),o=C.createOscillator(),g=C.createGain();o.connect(g);g.connect(C.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(function(){o.stop();C.close()},400)}catch(e){}if(navigator.vibrate)navigator.vibrate(200)}
function stop(){if(iv){clearInterval(iv);iv=null}}
TT.addEventListener("click",function(){P.hidden=!P.hidden;TT.setAttribute("aria-expanded",!P.hidden)});
T.querySelector(".tmr-x").addEventListener("click",function(){stop();D.textContent="0:00";OK.textContent=""});
[].forEach.call(T.querySelectorAll("[data-s]"),function(b){b.addEventListener("click",function(){stop();OK.textContent="";var end=Date.now()+(+b.dataset.s)*1000;D.textContent=fmt(+b.dataset.s);iv=setInterval(function(){var r=Math.max(0,Math.round((end-Date.now())/1000));D.textContent=fmt(r);if(r===0){stop();OK.textContent="¡Listo! Siguiente serie.";beep()}},250)})});
})();
