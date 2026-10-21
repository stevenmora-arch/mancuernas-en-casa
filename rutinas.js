(function(){var g=document.getElementById("rut-grid");if(!g)return;var cs=[].slice.call(g.children),o=document.getElementById("f-obj"),n=document.getElementById("f-niv"),d=document.getElementById("f-dias"),c=document.getElementById("f-cnt");
function has(l,v){return l.split(" ").indexOf(v)>-1}
function ap(){var k=0;cs.forEach(function(x){var ok=(!o.value||has(x.dataset.obj,o.value))&&(!n.value||has(x.dataset.niv,n.value))&&(!d.value||d.value.split(",").some(function(v){return has(x.dataset.dias,v)}));x.hidden=!ok;if(ok)k++});c.textContent=k?k+(k===1?" rutina encontrada.":" rutinas encontradas."):"No hay rutinas con esos filtros: prueba a cambiar alguno."}
[o,n,d].forEach(function(s){s.addEventListener("change",ap)});ap()})();
