AC.onDOMReady(function(){var b={element:AC.Element.select(".sticky")};if(b.element&&!AC.Environment.Feature.touchAvailable()){b.start=AC.Element.cumulativeOffset(b.element)[0];
b.end=(AC.Element.cumulativeOffset(b.element.parentElement)[0]+b.element.parentElement.offsetHeight)-b.element.offsetHeight;
b.clone=b.element.cloneNode(true);b.clone.className+=" clone";b.clone.style.display="none";
b.clone.style.position="absolute";b.element.parentElement.insertBefore(b.clone,b.element);
AC.Element.addEventListener(window,"scroll",function(){var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(a<b.start){b.element.style.visibility="";b.clone.style.display="none";b.clone.style.position="absolute";
b.clone.style.top=""}else{if(b.start<a&&a<b.end){b.element.style.visibility="hidden";
b.clone.style.display="block";b.clone.style.position="fixed";b.clone.style.top=""
}else{b.element.style.visibility="hidden";b.clone.style.display="";b.clone.style.position="absolute";
b.clone.style.top=b.end+"px"}}})}});