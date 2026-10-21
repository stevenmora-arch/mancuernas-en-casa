(function(){
var cat=JSON.parse(document.getElementById("catalogo").textContent);
var NC={mancuernas:"Mancuernas ajustables",fijas:"Mancuernas fijas",banco:"Bancos",bandas:"Bandas elásticas",tapete:"Tapetes",accesorios:"Accesorios",dominadas:"Barras de dominadas",cardio:"Cuerdas de saltar",recuperacion:"Rodillos de espuma",core:"Core",flexiones:"Flexiones",chalecos:"Chalecos con peso"};
function norm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function s(p){var n=p.n.split(":")[0];return n.length>34?n.split(" ").slice(0,3).join(" "):n}
function track(n,d){d=d||{};d.herramienta="comparador";try{if(window.gtag)window.gtag("event",n,d);document.dispatchEvent(new CustomEvent("mc:evento",{detail:{nombre:n,datos:d}}))}catch(e){}}
var sel={a:null,b:null},res=document.getElementById("cmp-res"),qa=document.getElementById("qa"),qb=document.getElementById("qb"),hb=document.getElementById("hb");
function setup(k,inp){
var ul=document.getElementById("l"+k),act=-1,items=[];
function pool(){return cat.filter(function(p){return k==="a"||(sel.a&&p.g===sel.a.g&&p.id!==sel.a.id)})}
function draw(){var q=norm(inp.value.trim()).split(/\s+/).filter(Boolean);items=pool().filter(function(p){var h=norm(p.n+" "+p.b+" "+(p.t||""));return q.every(function(w){return h.indexOf(w)>-1})}).slice(0,8);ul.innerHTML="";act=-1;
items.forEach(function(p,i){var li=el("li","","");li.id="o"+k+i;li.setAttribute("role","option");li.appendChild(document.createTextNode(p.n));li.appendChild(el("small","",NC[p.c]));li.addEventListener("mousedown",function(e){e.preventDefault();pick(p)});ul.appendChild(li)});
if(!items.length){var v=el("li","vacio",k==="b"&&!sel.a?"Primero elige el producto A.":"No hay coincidencias en nuestro catálogo.");ul.appendChild(v)}
ul.hidden=false;inp.setAttribute("aria-expanded","true")}
function close(){ul.hidden=true;inp.setAttribute("aria-expanded","false");inp.removeAttribute("aria-activedescendant")}
function pick(p){sel[k]=p;inp.value=p.n;close();if(k==="a"){if(sel.b&&sel.b.g!==p.g){sel.b=null;qb.value=""}var n=cat.filter(function(x){return x.g===p.g&&x.id!==p.id}).length;qb.disabled=!n;hb.textContent=n?"Mostramos solo productos comparables con el A.":"Por ahora no tenemos otro producto comparable con este: estamos ampliando el catálogo."}show()}
inp.addEventListener("input",function(){sel[k]=null;if(k==="a"){qb.disabled=true;sel.b=null;qb.value="";hb.textContent="Primero elige el producto A. El B será de su misma categoría."}show();draw()});
inp.addEventListener("focus",draw);inp.addEventListener("blur",close);
inp.addEventListener("keydown",function(e){var li=ul.querySelectorAll("[role=option]");
if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(ul.hidden)draw();li=ul.querySelectorAll("[role=option]");if(!li.length)return;act=(act+(e.key==="ArrowDown"?1:-1)+li.length)%li.length;[].forEach.call(li,function(x,i){x.setAttribute("aria-selected",i===act)});inp.setAttribute("aria-activedescendant",li[act].id)}
else if(e.key==="Enter"){if(items.length&&!ul.hidden){e.preventDefault();pick(items[act>=0?act:0])}}
else if(e.key==="Escape")close()})}
setup("a",qa);setup("b",qb);
function diffs(a,b){var L=[],E=[];
if(a.c==="mancuernas"||a.c==="fijas"){
if(a.mec!==b.mec){L.push("Mecanismo: "+s(a)+" es de "+a.t.toLowerCase()+" y "+s(b)+" es de "+b.t.toLowerCase()+".");[a,b].forEach(function(p){if(p.mec==="discos")E.push([p,"priorizas el precio por libra (en general, los sistemas de discos cuestan menos; no tenemos precios verificados) y no te importa tardar más en cambiar de peso"]);if(p.mec==="selector")E.push([p,"quieres cambiar de peso con rapidez y comodidad"]);if(p.mec==="fija")E.push([p,"prefieres no ajustar nada y quieres un peso fijo en cada mancuerna"])})}
if(a.mx!=null&&b.mx!=null&&a.mx!==b.mx){var m=a.mx>b.mx?a:b;L.push("Peso máximo anunciado: "+s(a)+" llega a "+a.mx+" lb y "+s(b)+" a "+b.mx+" lb.");E.push([m,"quieres más margen para progresar (hasta "+m.mx+" lb anunciados)"])}
[a,b].forEach(function(p){if(p.mx==null)L.push("No tenemos el peso máximo de "+s(p)+": confírmalo en Amazon.")});
if(a.cmp!=null&&b.cmp!=null&&a.cmp!==b.cmp){var c=a.cmp===1?a:b,o=a.cmp===1?b:a;L.push(s(c)+" incluye funda, base o un sistema compacto; "+s(o)+" necesita más espacio para guardar las piezas.");E.push([c,"tienes poco espacio"])}}
if(a.c==="banco"){
if(a.cap&&b.cap&&a.cap!==b.cap){var m2=a.cap>b.cap?a:b;L.push("Capacidad anunciada: "+s(a)+" soporta "+a.cap+" lb y "+s(b)+" "+b.cap+" lb.");E.push([m2,"buscas la mayor capacidad de carga"])}
if(a.pos&&b.pos&&a.pos!==b.pos){var m3=a.pos>b.pos?a:b;L.push("Posiciones de respaldo: "+s(a)+" tiene "+a.pos+" y "+s(b)+" "+b.pos+".");E.push([m3,"quieres más posiciones de respaldo"])}
if(!!a.astm!==!!b.astm){var c2=a.astm?a:b;L.push("Solo "+s(c2)+" indica certificación ASTM en su ficha.");E.push([c2,"valoras que el banco indique una certificación"])}
if(!!a.decl!==!!b.decl){var c3=a.decl?a:b;L.push("Solo "+s(c3)+" indica posición de declive.");E.push([c3,"quieres hacer ejercicios en declive"])}
[a,b].forEach(function(p){if(!p.cap)L.push("No tenemos la capacidad de "+s(p)+": confírmala en Amazon.")})}
if(a.c==="chalecos"){if(a.mx&&b.mx&&a.mx!==b.mx){var m4=a.mx>b.mx?a:b;L.push("Peso máximo anunciado: "+s(a)+" llega a "+a.mx+" lb y "+s(b)+" a "+b.mx+" lb.");E.push([m4,"quieres más carga"])}var rf=function(p){return p.d.some(function(x){return /reflect/i.test(x)})};if(rf(a)!==rf(b)){var r2=rf(a)?a:b;L.push("Solo "+s(r2)+" indica rayas reflectantes.");E.push([r2,"sales a caminar o correr con poca luz"])}}
if(!L.length)L.push("No tenemos datos comparables suficientes entre estos dos productos: revisa sus fichas en Amazon.");
return{L:L,E:E}}
function list(items){var u=el("ul");items.forEach(function(t){u.appendChild(el("li","",t))});return u}
function row(tb,lab,fa,fb){var tr=el("tr");tr.appendChild(el("th","",lab));[fa,fb].forEach(function(f){var td=el("td");if(typeof f==="string")td.textContent=f;else td.appendChild(f);tr.appendChild(td)});tb.appendChild(tr)}
function btn(p){var a=el("a","btn","Ver precio y disponibilidad en Amazon");a.href=p.l;a.target="_blank";a.rel="sponsored noopener";return a}
function show(){res.innerHTML="";if(!sel.a||!sel.b)return;var a=sel.a,b=sel.b,d=diffs(a,b);
res.appendChild(el("h2","","Comparativa"));var w=el("div","tw"),tb=el("table","comp"),h=el("tr");h.appendChild(el("th","",""));h.appendChild(el("th","",a.n));h.appendChild(el("th","",b.n));tb.appendChild(h);
row(tb,"Categoría",NC[a.c],NC[b.c]);if(a.t||b.t)row(tb,"Tipo",a.t||"—",b.t||"—");row(tb,"Peso o capacidad",a.p||"—",b.p||"—");row(tb,"Ideal para",a.i,b.i);
row(tb,"Ventajas",list(a.pro),list(b.pro));row(tb,"Limitaciones",list(a.lim),list(b.lim));row(tb,"",btn(a),btn(b));w.appendChild(tb);res.appendChild(w);
res.appendChild(el("h3","","Diferencias clave"));res.appendChild(list(d.L));
if(d.E.length){res.appendChild(el("h3","","Cuál elegir según tu prioridad"));res.appendChild(list(d.E.map(function(x){return "Elige "+s(x[0])+" si "+x[1]+"."})))}
res.appendChild(el("p","pnote","Esta comparativa es orientativa y usa los datos de las fichas de Amazon que tenemos. Comprueba especificaciones, contenido del paquete, precio y disponibilidad antes de comprar. Como Afiliado de Amazon, gano con las compras que cumplen los requisitos."));
track("comparador_comparar",{a:a.id,b:b.id})}
document.getElementById("ej").addEventListener("click",function(){var a=cat.filter(function(p){return p.id==="B0c6oEyYj"})[0],b=cat.filter(function(p){return p.id==="B043E47n2"})[0];if(!a||!b)return;sel.a=a;sel.b=b;qa.value=a.n;qb.value=b.n;qb.disabled=false;hb.textContent="Mostramos solo productos de la misma categoría que el A.";show();res.focus()});
document.getElementById("lim").addEventListener("click",function(){sel.a=sel.b=null;qa.value=qb.value="";qb.disabled=true;hb.textContent="Primero elige el producto A. El B será de su misma categoría.";res.innerHTML="";qa.focus()});
})();
