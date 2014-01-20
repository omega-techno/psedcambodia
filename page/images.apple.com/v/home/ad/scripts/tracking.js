(function(){if(s&&Event&&AC&&typeof AC.onDOMReady==="function"&&AC.Tracking&&typeof s==="object"&&typeof AC.Tracking.pageName==="function"&&typeof AC.Tracking.trackClick==="function"){var b=1;
if(Event.Listener&&typeof Event.Listener.listenForEvent==="function"&&typeof AC.ViewMaster==="object"&&typeof AC.Element.addClassName==="function"&&typeof AC.Element.removeClassName==="function"){AC.onDOMReady(function(){var a=true;
Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,function(g){var h=g.event_data.data.sender;
var f=(h.__slideshow&&h.__slideshow._active);if(a===true||a==="sneaky"){if(a===true||!f){h.sections.each(function(c){c=c[1];
if(c.content){if(f){AC.Element.addClassName(c.content,"sneaky")}else{AC.Element.removeClassName(c.content,"sneaky")
}}});a="sneaky"}if(!f){a=false}}if(h._currentTrigger===undefined&&!f){h._currentTrigger="swipe"
}});Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,function(d){b+=1
});if(window.tracker){window.tracker.setDelegate({sectionDidChange:function(l,o,p,j,m){var k=j+" - "+AC.Tracking.pageName();
var n=o._currentTrigger;if(n&&typeof Element.up==="function"){if(n==="arrow_right"||n==="arrow_left"){m.pageName="ki@"+k;
return m}if(n==="swipe"){m.pageName="si@"+k;return m}if(Element.up(n,".dot")){m.pageName="bi@"+k;
return m}if(Element.up(link,".thumb")){m.pageName="gi@"+k;return m}if(Element.up(link,".paddle-nav")){m.pageName="pi@"+k;
return m}}return m}})}})}if(AC.Element&&typeof AC.Element.selectAll==="function"&&typeof AC.Element.select==="function"&&typeof AC.Element.hasClassName==="function"&&typeof AC.Element.addEventListener==="function"){AC.onDOMReady(function(){var g=function(e){var f=(e.innerText)?e.innerText.trim():e.textContent.trim();
var l=AC.Element.select("img",e);var d=e.href.replace(new RegExp("^"+window.location.protocol+"//"),"").replace(new RegExp("^"+window.location.host+"/"),"").replace(/\/$/,"");
var c;if(typeof Element.up==="function"){c=Element.up(e,'[id*="MASKED-"]');if(c){c=c.id.replace("MASKED-","")
}if(AC.Element.hasClassName(e,"learn")){return f+" - "+c}if(Element.up(e,"#hero")){return c
}}if(f!==""){return f}if(l){l=l.getAttribute("src");if(l){return l.substring(l.lastIndexOf("../index.html")+1,l.length)
}}return d};var h=function(m){var e=m.target;var c=false;var n=false;var d;var f;
while(e&&e.parentNode&&e.tagName&&e.tagName.toLowerCase()!=="a"){e=e.parentNode
}if(!e){return}c=g(e);if(c&&c!==""&&typeof Element.up==="function"){if(Element.up(e,".dot")||Element.up(e,".thumb")||Element.up(e,".paddle-nav")){return
}f={prop1:b};if(Element.up(e,"#globalheader")){d="t@";n="tab"}if(Element.up(e,"#billboard")){d="h@";
n="hero"}if(Element.up(e,".learn")){d="l@";n="herolink"}if(Element.up(e,".promos")){d="p@";
n="promos"}f.prop3=(d+c+" - "+AC.Tracking.pageName()).toLowerCase();AC.Tracking.trackClick(f,this,"o",f.prop3)
}if(n&&AC.Storage&&typeof AC.Storage.setItem==="function"){AC.Storage.setItem("s_nav",n,"0")
}};var j=AC.Element.selectAll("a[href]");var i,a;for(i=0,a=j.length;i<a;i+=1){AC.Element.addEventListener(j[i],"mousedown",h)
}})}}})();