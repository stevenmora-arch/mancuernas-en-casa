(function(){
var ID=typeof STORE_ID!=="undefined"?STORE_ID:"TU-TAG-20";
document.querySelectorAll('a[href*="tag=TU-TAG-20"]').forEach(function(a){a.href=a.href.replace("tag=TU-TAG-20","tag="+ID)});
var L=typeof PRODUCTOS!=="undefined"?PRODUCTOS:[];
var FB='<svg class="ic" viewBox="0 0 64 64" aria-hidden="true"><rect class="p" x="20" y="29" width="24" height="6" rx="3"/><rect class="y" x="12" y="18" width="8" height="28" rx="3"/><rect class="y" x="44" y="18" width="8" height="28" rx="3"/><rect class="p" x="6" y="24" width="6" height="16" rx="2"/><rect class="p" x="52" y="24" width="6" height="16" rx="2"/></svg>';
function card(p){
var a=document.createElement("article");a.className="pcard";
var im=document.createElement("div");im.className="pimg";
if(p.img){var i=new Image();i.src=p.img;i.alt=p.nombre;i.loading="lazy";i.onerror=function(){im.innerHTML=FB};im.appendChild(i)}else{im.innerHTML=FB}
var b=document.createElement("div");b.className="pb";
var h=document.createElement("h3");h.textContent=p.nombre;
var t=document.createElement("p");t.textContent=p.texto||"";
var l=document.createElement("a");l.className="btn";l.textContent="Ver en Amazon";
l.href=p.link||("https://www.amazon.com/dp/"+p.asin+"?tag="+ID);l.target="_blank";l.rel="sponsored noopener";
b.appendChild(h);b.appendChild(t);b.appendChild(l);a.appendChild(im);a.appendChild(b);return a}
document.querySelectorAll(".prods").forEach(function(s){
var c=s.dataset.cat.split(",");
var list=L.filter(function(p){return c[0]==="todos"||c.indexOf(p.cat)>-1}).slice(0,8);
if(!list.length)return;
var g=s.querySelector(".grid");list.forEach(function(p){g.appendChild(card(p))});s.hidden=false});
})();
