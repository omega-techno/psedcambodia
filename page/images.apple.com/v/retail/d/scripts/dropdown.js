(function(){function d(){if(AC.Detector.isIE()){$$(".menu li").each(function(a){Event.observe(a,"mouseover",function(){Element.addClassName(a,"hover")
});Event.observe(a,"mouseout",function(){Element.removeClassName(a,"hover")})})
}}function c(l,j){var a=$$(".select"),b=$$(".select .menu");if(a.length>0){for(i=0;
i<a.length;i+=1){m(a[i])}}function k(){if(a.length>0){for(i=0;i<a.length;i+=1){b[i].style.display="none"
}}}function m(g){var e=g.down(".selection"),p=g.down(".menu"),h=p.innerHTML;if(AC.Detector.isMobile()||AC.Detector.isiPad()){var q="change",f=h.replace(/<li/g,"<option").replace(/<\/li>/g,"</option>");
g.innerHTML+='<select class="menu">'+f+"</select>"}else{var q="click"}Event.observe(g,q,function(n){var o=(n.target)?n.target:n.srcElement,y=(p.style.display==="block")?true:false;
if(AC.Detector.isMobile()||AC.Detector.isiPad()){w=f[o.selectedIndex]}else{w=o;
k()}if(y){if(o.tagName==="LI"||o.tagName==="SELECT"){e.innerHTML=o.innerHTML;var v=o.getAttribute("value");
if(v!==null&&v!==0){window.location.href=v}}j(o)}else{var w=o.selectedIndex;if(AC.Detector.isMobile()||AC.Detector.isiPad()){var v=$(o).down("option",[w]).getAttribute("value");
if(v!==null){if(AC.Detector.isMobile()||AC.Detector.isiPad()){$(o).selectedIndex=-1
}window.location.href=v}else{var x=$$(".menu li")[w].innerHTML;$$(".selection")[0].innerHTML=x
}}g.style.zIndex=2000;p.style.display="block";if(n.stopPropagation){n.stopPropagation()
}else{window.event.cancelBubble=true}}});Event.observe(document,"click",function(n){var o=(n.target)?n.target:n.srcElement;
if(o.tagName!=="A"||!AC.Detector.isIE()){p.style.display="none";g.style.zIndex=""
}})}}AC.onDOMReady(function(){c("select",function(f){}.bind(this));var b=function(f){return(function(z){var B=z.responseXML.documentElement;
var C=B.getElementsByTagName("country");var w=null;for(var x=0;x<C.length;x++){var A=C[x];
if(A.getAttribute("name")==f){w=A;break}}var t=w.getElementsByTagName("store");
var v=document.createElement("ul");var u="";if(AC.Detector.isMobile()||AC.Detector.isiPad()){var e="option"
}else{var e="li"}if(t!==""){for(var x=0;x<t.length;x++){var y=(t[x].getElementsByTagName("city")[0].firstChild!==null)?t[x].getElementsByTagName("city")[0].firstChild.nodeValue:"";
var s=(y==="")?"":", ";u+="<"+e+' value="'+t[x].getElementsByTagName("link")[0].firstChild.nodeValue+'">'+y+s+t[x].getElementsByTagName("name")[0].firstChild.nodeValue+"</"+e+">"
}}else{u+="<"+e+">Loading</"+e+">"}if(AC.Detector.isMobile()||AC.Detector.isiPad()){if($$(".hero-search")[0]){$$(".hero-search select.menu")[0].innerHTML=u;
$$(".hero-search select.menu")[0].selectedIndex=-1}$$(".find-store select.menu")[0].innerHTML=u;
$$(".find-store select.menu")[0].selectedIndex=-1}else{if($$(".hero-search")[0]){$$(".hero-search .menu")[0].innerHTML=u
}$$(".find-store .menu")[0].innerHTML=u;d()}})};var a=$("current_country");if(a.getAttribute("data-feedURL")){new Ajax.Request(a.getAttribute("data-feedURL"),{method:"get",onSuccess:b(a.getAttribute("data-init-storeSelector"))})
}})}());