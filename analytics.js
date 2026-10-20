(function(){
var GA_ID="G-C64ZLEHBXN"; /* ID de Google Analytics 4 (G-XXXXXXXXXX). Vacío = no se carga nada. */
var KEY="mc-consent";
function track(n,d){d=d||{};try{if(window.gtag)window.gtag("event",n,d);document.dispatchEvent(new CustomEvent("mc:evento",{detail:{nombre:n,datos:d}}))}catch(e){}}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;if(/^https?:\/\/((www\.)?amazon\.|link\.amazon)/.test(a.href))track("clic_amazon",{pagina:location.pathname,enlace:a.href,texto:(a.textContent||"").trim().slice(0,60)})});
if(!GA_ID)return;
function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function load(){if(window.gtag)return;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(s);window.gtag("js",new Date());window.gtag("config",GA_ID)}
function unload(){window["ga-disable-"+GA_ID]=true;document.cookie.split(";").forEach(function(c){var n=c.split("=")[0].trim();if(n.indexOf("_ga")===0)document.cookie=n+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"})}
function banner(){if(document.getElementById("mc-ck"))return;var b=document.createElement("div");b.id="mc-ck";b.className="cb-ck";b.setAttribute("role","dialog");b.setAttribute("aria-label","Aviso de cookies");
b.innerHTML='<p>Usamos Google Analytics para saber qué guías y productos interesan. Solo se activa si aceptas y puedes cambiar tu decisión cuando quieras. Más información en la <a href="privacidad.html">política de privacidad</a>.</p><div class="acts"><button type="button" data-v="si">Aceptar</button><button type="button" data-v="no">Rechazar</button></div>';
b.addEventListener("click",function(e){var v=e.target.getAttribute&&e.target.getAttribute("data-v");if(!v)return;set(v);if(v==="si"){delete window["ga-disable-"+GA_ID];load()}else unload();b.parentNode.removeChild(b)});
document.body.appendChild(b)}
var l=document.getElementById("mc-cookies");if(l){l.hidden=false;l.addEventListener("click",function(e){e.preventDefault();banner()})}
var c=get();if(c==="si")load();else if(c===null)banner();
})();
