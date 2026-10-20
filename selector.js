(function(){
var root=document.getElementById("selector");if(!root)return;
var form=document.getElementById("sel-form"),res=document.getElementById("sel-res"),bar=root.querySelector(".prog"),cnt=document.getElementById("sel-count"),err=document.getElementById("sel-err");
var rows=[].slice.call(document.querySelectorAll("#comparativa tr[data-id]"));
if(!form||!rows.length){root.hidden=true;return}
function nv(v){return v===""||v==null?null:+v}
function ge(v,n){return v!==null&&v>=n}
function le(v,n){return v!==null&&v<=n}
var P=rows.map(function(r){return{id:r.dataset.id,n:r.querySelector("strong").textContent,l:r.querySelector("a.btn").href,tipo:r.cells[1].textContent,peso:r.cells[2].textContent,mec:r.dataset.mec,mx:nv(r.dataset.mx),cmp:nv(r.dataset.cmp),rap:nv(r.dataset.rap),pro:r.dataset.pro,lim:r.dataset.lim}});
/* Analítica opcional: usa gtag o plausible si existen y siempre emite el evento "mc:evento" en el documento. */
function track(n,d){d=d||{};d.herramienta="selector_mancuernas";try{if(window.gtag)window.gtag("event",n,d);else if(window.plausible)window.plausible(n,{props:d});document.dispatchEvent(new CustomEvent("mc:evento",{detail:{nombre:n,datos:d}}))}catch(e){}}
function ans(){var o={};["pr","es","ni","pri"].forEach(function(k){var c=form.querySelector('input[name="'+k+'"]:checked');if(c)o[k]=c.value});return o}
function upd(){var n=Object.keys(ans()).length;bar.setAttribute("aria-valuenow",n);bar.firstElementChild.style.width=n*25+"%";cnt.textContent=n+" de 4 respondidas"}
var started=false;
form.addEventListener("change",function(){upd();err.textContent="";if(!started){started=true;track("selector_inicio")}});
form.addEventListener("reset",function(){setTimeout(function(){upd();err.textContent="";res.hidden=true;res.innerHTML=""},0)});
function score(p,a){var s=0,w=[];
if(a.pr==="min"&&p.mec==="discos"){s+=2;w.push("Quieres gastar poco y es un sistema de barra con discos, que suele costar menos por libra (no tenemos precios verificados: compáralo en Amazon).")}
if(a.pr==="equil")s+=1;
if(a.pr==="inv"){if(p.mec==="selector"){s+=2;w.push("Puedes invertir y su selector hace más cómodo cambiar de peso.")}if(ge(p.mx,100)){s+=1;w.push("Las versiones anunciadas llegan a "+p.mx+" lb: un sistema con más recorrido.")}}
if(a.es==="poco"){if(p.cmp===1){s+=2;w.push("Tienes poco espacio y es una opción compacta o con funda o base de almacenamiento, según su ficha.")}else if(p.cmp===0)s-=2}
if(a.es==="rincon"&&p.cmp===1)s+=1;
if(a.es==="mucho"&&ge(p.mx,100)){s+=1;w.push("Tienes espacio y admite más discos para guardar varios pesos.")}
if(a.ni==="empiezo"&&le(p.mx,60)){s+=1;w.push("Estás empezando y su peso anunciado ("+p.mx+" lb) es razonable para comenzar.")}
if(a.ni==="frecuente"&&ge(p.mx,50))s+=1;
if(a.ni==="experto"){if(ge(p.mx,100)){s+=3;w.push("Tienes experiencia y las versiones anunciadas llegan a "+p.mx+" lb.")}else if(le(p.mx,60))s-=1}
if(a.pri==="precio"&&p.mec==="discos"){s+=4;w.push("Priorizas el precio y este sistema de discos suele ser la vía más económica.")}
if(a.pri==="rapido"){if(p.rap===1){s+=4;w.push("Priorizas cambiar de peso con rapidez y usa un selector.")}else if(p.rap===0)s-=1}
if(a.pri==="progreso"){if(ge(p.mx,100)){s+=4;w.push("Quieres margen para progresar: sus versiones llegan a "+p.mx+" lb.")}else if(ge(p.mx,55))s+=2}
return{p:p,s:s,w:w}}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function card(r,i){var p=r.p,d=el("article",i?"ra":"rm");
d.appendChild(el("span","badge",i?"Alternativa":"Recomendación principal"));
d.appendChild(el(i?"h4":"h3","",p.n));
d.appendChild(el("p","dato","Tipo: "+p.tipo+" · Peso: "+p.peso));
d.appendChild(el("h4","","Por qué puede encajar contigo"));
var u=el("ul");(r.w.length?r.w:["Coincide solo en parte con tus respuestas: compara bien sus características."]).forEach(function(t){u.appendChild(el("li","",t))});d.appendChild(u);
if(p.pro){d.appendChild(el("h4","","Ventajas"));d.appendChild(el("p","",p.pro))}
if(p.lim){d.appendChild(el("h4","","Limitaciones"));d.appendChild(el("p","",p.lim))}
var m=[];if(p.mx===null)m.push("peso máximo");if(p.mec==="ajustable")m.push("tipo de mecanismo");if(p.cmp===null)m.push("dimensiones");
if(m.length)d.appendChild(el("p","dato","Sin confirmar en nuestros datos: "+m.join(", ")+"."));
d.appendChild(el("p","dato","Antes de comprar, comprueba el peso total del juego, qué piezas incluye y si sus dimensiones se adaptan a tu espacio."));
var a=el("a","btn","Ver precio y disponibilidad en Amazon");a.href=p.l;a.target="_blank";a.rel="sponsored noopener";
a.addEventListener("click",function(){track("selector_clic_amazon",{producto:p.id,posicion:i+1,ubicacion:"selector"})});
d.appendChild(a);return d}
form.addEventListener("submit",function(e){e.preventDefault();var a=ans();
if(Object.keys(a).length<4){err.textContent="Responde las cuatro preguntas para ver tu recomendación.";return}
var rs=P.map(function(p){return score(p,a)}).sort(function(x,y){return y.s-x.s});
res.innerHTML="";var h=el("h3","","Tu recomendación");res.appendChild(h);res.appendChild(card(rs[0],0));
var alt=rs.slice(1,3).filter(function(r){return r.s>0&&r.w.length});
if(alt.length){res.appendChild(el("h4","","Otras opciones que también pueden encajar"));var g=el("div","alts");alt.forEach(function(r,i){g.appendChild(card(r,i+1))});res.appendChild(g)}
res.appendChild(el("p","dato","Esta recomendación es orientativa. Comprueba las especificaciones, el contenido del paquete, el precio y la disponibilidad en la ficha del vendedor antes de comprar. Como Afiliado de Amazon, gano con las compras que cumplen los requisitos."));
var b=el("p");var l=el("a","","Ver la comparativa completa");l.href="#comparativa";b.appendChild(l);res.appendChild(b);
res.hidden=false;res.focus();track("selector_completo",a);track("selector_recomendacion_vista",{producto:rs[0].p.id})});
})();
