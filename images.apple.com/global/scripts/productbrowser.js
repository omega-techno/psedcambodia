if(typeof(AC)=="undefined"){AC={}}AC.ProductBrowser=function(ab){var F=1,R=7,P=ab.select("ul"),L=P.length,T=ab.getWidth(),U=$(ab.id.replace(/^pb-/,"pb-pi-")),ah=(U)?U.select("a"):[],K=(U)?U.down("b.caret"):false,G=ab.down(".pb-slide"),V=true,Q=false,J=0,O=false,Z=ad();
this.pagesContainer=ab;this.pagesContainer.addClassName("pb-dynamic");if(U&&L>0){document.observe("keydown",M)
}if(Z){var N=function(a){if((a.target==ab&&a.propertyName=="opacity")||a.eventName=="ac:reveal:cancel"){ab.addClassName("pb-open");
ab.removeVendorEventListener("transitionEnd",N,false)}};document.observe("ac:reveal:cancel",N);
ab.addVendorEventListener("transitionEnd",N,false);if(U&&L>0){G.trackTouches(af,S,ac);
G.addVendorEventListener("transitionEnd",aa);for(var i=L-1;i>=0;i--){P[i].addVendorEventListener("animationStart",W);
P[i].addVendorEventListener("animationEnd",Y)}}}else{ab.addClassName("pb-open pb-degraded")
}function ad(){var b=AC.Detector.isCSSAvailable("animation");if(b&&AC.Detector.isWebKit()){var a=AC.Detector.getAgent().match(/version\/(\d)/);
if(!a){return b}if(a[1]){a=a[1]}if(a){a=parseInt(a)}if(a==NaN){return b}if(a<5){return false
}}return b}function W(a){a.target.addClassName("started")}function Y(a){if(a.animationName.match("open")){if(!Q){Q=P[0].items.length
}if(Q--==1){ab.removeClassName("pb-open");ab.addClassName("pb-opened")}}if(a.target.hasAttribute("exit")||a.target.hasAttribute("exited")){a.target.setAttribute("exited",a.target.getAttribute("exit"));
a.target.removeAttribute("exit");if(!a.target.next()){var b=a.target.up("ul");if(b){b.setAttribute("exited",a.target.getAttribute("exited"));
b.removeAttribute("exit")}$$("[toenter]").each(function(c){c.setAttribute("enter",c.getAttribute("toenter"));
c.removeAttribute("toenter")})}}if(a.target.hasAttribute("enter")||a.target.hasAttribute("entered")){a.target.setAttribute("entered",a.target.getAttribute("enter"));
a.target.removeAttribute("enter");a.target.removeAttribute("style");if(!a.target.next()){var b=a.target.up("ul");
if(b){b.setAttribute("entered",a.target.getAttribute("entered"));b.removeAttribute("enter")
}}O=false}}function aa(a){if(a.target==G&&G.hasClassName("end")){V=true;X(F);G.setVendorPrefixStyle("transition-duration","");
G.setVendorPrefixTransform(0,0);G.removeClassName("active");G.removeClassName("end");
G.removeClassName("toucheslock");O=false}}function M(d){if(!!O){return}var a="";
if(d.keyCode==Event.KEY_RIGHT){a="next"}else{if(d.keyCode==Event.KEY_LEFT){a="previous"
}}if(!a){return}var c=(d.target)?d.target:d.srcElement,e=c.getAttribute("contenteditable"),b=true;
if(e==null){b=false}if(b&&e==document.body.getAttribute("contenteditable")){b=false
}if(b&&e=="false"){b=false}if(c.tagName.toLowerCase()=="input"||c.tagName.toLowerCase()=="textarea"||c.tagName.toLowerCase()=="select"||b){return
}if((a=="next"&&F==L)||(a=="previous"&&F==1)){return}if(a=="next"){F++}if(a=="previous"){F--
}O=true;X(F,a)}function af(a){if(!!O){return}G.setVendorPrefixStyle("transition-duration","0");
G.addClassName("active");J=-T*(F-1);G.setVendorPrefixTransform(J+"px",0)}function S(a){if(!!O){return
}if(AC.Detector.iOSVersion()<4){G.setVendorPrefixStyle("transition-duration","")
}G.setVendorPrefixTransform((J-a.difference.x)+"px",0)}function ac(a){if(!!O){return
}O=true;G.addClassName("toucheslock");if(!(a.direction.x=="right"&&F==L)&&!(a.direction.x=="left"&&F==1)){if(a.direction.x=="right"){F++
}if(a.direction.x=="left"){F--}}G.addClassName("end");if(a.direction.x==="right"||a.direction.x==="left"){G.setVendorPrefixStyle("transition-duration","300ms");
G.setVendorPrefixTransform("-"+T*(F-1)+"px",0);ae(F)}else{aa({target:G})}}function H(a){O=false
}function ag(a){if(!!O){return}O=true;var b=parseInt(a.findElement("[page]").getAttribute("page"));
if(b==F){O=false;return}if(b){X(b)}}var ae=this.updateControls=function(g){if(U&&L>0){for(var d=0;
d<L;d++){if(!ah[d].hasAttribute("page")){ah[d].setAttribute("page",d+1);ah[d].observe("click",ag)
}if(d+1==g){var f=ah[d].addClassName("active")}else{ah[d].removeClassName("active")
}}if(U.className.match("page-")){U.className=U.className.replace(/page-\d/,"page-"+g)
}else{U.className+=" page-"+g}if(K&&f){var c=f.positionedOffset().left,a=f.getWidth()/2,e=parseInt(c+a);
if(Z){K.setVendorPrefixTransform(e+"px",0);var b=function(h){if(h.target==K){K.setVendorPrefixTransform(e+"px",0);
K.removeVendorEventListener("transitionEnd",b,false)}};K.addVendorEventListener("transitionEnd",b,false)
}else{if(V){K.style.left=e+"px"}else{K.morph("left:"+e+"px",{duration:0.4})}}}}};
var I=function(a){var b=AC.Tracking.pageName()+" - product nav - "+((ah[a-1])?ah[a-1].innerHTML:"");
AC.Tracking.trackClick({prop3:b},this,"o",b)};var X=this.update=function(a,b){if(L>1){if(!b){b=(F>a)?"previous":"next"
}if(typeof(a)=="number"){F=a}if(!V){I(F)}P.each(function(c,d){d++;if(d<F){c.wrapper.removeAttribute("enter");
c.wrapper.removeAttribute("entered");if(!Z&&c.wrapper.visible()){Effect.Fade(c.wrapper,{duration:0.6})
}else{if(V){c.wrapper.setAttribute("exited","previous")}else{if(!c.wrapper.hasAttribute("exited")){c.wrapper.setAttribute("exit","previous")
}}}}else{if(d>F){c.wrapper.removeAttribute("enter");c.wrapper.removeAttribute("entered");
if(!Z&&c.wrapper.visible()){if(V){c.wrapper.hide()}else{Effect.Fade(c.wrapper,{duration:0.6})
}}else{if(V){c.wrapper.setAttribute("exited","next")}else{if(!c.wrapper.hasAttribute("exited")){c.wrapper.setAttribute("exit","next")
}}}}else{c.wrapper.removeAttribute("exit");c.wrapper.removeAttribute("exited");
if(!Z){Effect.Appear(c.wrapper,{duration:0.6,afterFinish:H})}else{if(V){c.wrapper.setAttribute("entered",b)
}else{c.wrapper.setAttribute("toenter",b)}}}}c.items.each(function(e){e.removeClassName("started");
if(d<F){e.removeAttribute("enter");e.removeAttribute("entered");if(V){e.setAttribute("exited","previous")
}else{if(!e.hasAttribute("exited")){e.setAttribute("exit","previous")}}}else{if(d>F){e.removeAttribute("enter");
e.removeAttribute("entered");if(V){e.setAttribute("exited","next")}else{if(!e.hasAttribute("exited")){e.setAttribute("exit","next")
}}}else{e.removeAttribute("exit");e.removeAttribute("exited");if(V){e.setAttribute("entered",b)
}else{e.setAttribute("toenter",b)}}}})})}ae(a);V=false};P.each(function(b,d){P[d]={index:d+1,wrapper:b,items:b.select("li")};
b.writeAttribute("page",d+1);b.setStyle({width:"auto"});var c=b.getWidth()+(parseInt(b.getStyle("left"),10)*2);
var a=Math.floor((T-c)/2);b.setStyle({width:c+"px",margin:"0 "+a+"px"})});F=1;G.style.width=T*P.length+"px";
this.update(1)};AC.ProductBrowser.setup=function(){var f=document.getElementsByTagName("head")[0];
var d=document.createElement("script");d.type="text/javascript";d.setAttribute("src","../../images.apple.com/global/scripts/pagingview.js");
f.appendChild(d);var d=document.createElement("script");d.type="text/javascript";
d.setAttribute("src","../../images.apple.com/global/scripts/reveal.js");f.appendChild(d);AC.ProductBrowser.browsers={};
var e=$$(".productbrowser");document.observe("ac:trackTouches:load",function(){e.each(function(a){AC.ProductBrowser.browsers[a.id]=new AC.ProductBrowser(a)
})})};AC.ProductBrowser.setup();