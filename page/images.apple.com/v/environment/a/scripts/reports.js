(function(b){b.onDOMReady(function(){var a=b.Element.select("#archive .show-reports-text").innerHTML,f=b.Element.select("#archive .hide-reports-text").innerHTML;
function e(c){var d=c.target||c.srcElement,k=d.parentNode.parentNode,j=b.Element.select(".expandable-content",k);
if(j.style.height==="0px"){j.style.height=j.getAttribute("data-height")+"px";d.innerHTML=f;
b.Element.addClassName(k,"open")}else{j.style.height=0;d.innerHTML=a;b.Element.removeClassName(k,"open")
}}b.Element.selectAll("#archive .expandable").forEach(function(h){var c=document.createElement("a"),d=b.Element.select(".expandable-content",h);
c.className="more";c.setAttribute("aria-hidden","true");b.Element.select("h3",h).insertBefore(c,null);
b.Element.addEventListener(c,"click",e);d.setAttribute("data-height",d.offsetHeight);
e({target:c})})})}(AC));