if(typeof(AC)=="undefined"){AC={}}AC.ProductBrowser=function(ad){var G=1,R=7,O=ad.select("ul"),N=O.length,T=ad.getWidth(),V=$(ad.id.replace(/^pb-/,"pb-pi-")),aj=(V)?V.select("a"):[],K=(V)?V.down("b.caret"):false,U=(K)?K.down(".caret-transform"):false,H=ad.down(".pb-slide"),W=true,Q=false,L=0,P=false,aa=af();
this.pagesContainer=ad;this.pagesContainer.addClassName("pb-dynamic");if(aa){var M=function(a){if((a.target==ad&&a.propertyName=="opacity")||a.eventName=="ac:reveal:cancel"){ad.addClassName("pb-open");
ad.removeVendorEventListener("transitionEnd",M,false)}};document.observe("ac:reveal:cancel",M);
ad.addVendorEventListener("transitionEnd",M,false);if(V&&N>0){H.trackTouches(ah,S,ae);
H.addVendorEventListener("transitionEnd",ab);for(var i=N-1;i>=0;i--){O[i].addVendorEventListener("animationStart",X);
O[i].addVendorEventListener("animationEnd",Z)}}}else{ad.addClassName("pb-open pb-degraded")
}function af(){var b=AC.Detector.isCSSAvailable("animation");if(b&&AC.Detector.isWebKit()){var a=AC.Detector.getAgent().match(/version\/(\d)/);
if(!a){return b}if(a[1]){a=a[1]}if(a){a=parseInt(a,10)}if(isNaN(a)){return b}if(a<5){return false
}}return b}function X(a){a.target.addClassName("started")}function Z(a){if(a.animationName.match("open")){if(!Q){Q=O[0].items.length
}if(Q--==1){ad.removeClassName("pb-open");ad.addClassName("pb-opened")}}if(a.target.hasAttribute("exit")||a.target.hasAttribute("exited")){a.target.setAttribute("exited",a.target.getAttribute("exit"));
a.target.removeAttribute("exit");if(!a.target.next()){var b=a.target.up("ul");if(b){b.setAttribute("exited",a.target.getAttribute("exited"));
b.removeAttribute("exit")}$$("[toenter]").each(function(c){c.setAttribute("enter",c.getAttribute("toenter"));
c.removeAttribute("toenter")})}}if(a.target.hasAttribute("enter")||a.target.hasAttribute("entered")){a.target.setAttribute("entered",a.target.getAttribute("enter"));
a.target.removeAttribute("enter");a.target.removeAttribute("style");if(!a.target.next()){var b=a.target.up("ul");
if(b){b.setAttribute("entered",a.target.getAttribute("entered"));b.removeAttribute("enter")
}}P=false}}function ab(a){if(a.target==H&&H.hasClassName("end")){W=true;Y(G);H.setVendorPrefixStyle("transition-duration","");
H.setVendorPrefixTransform(0,0);H.removeClassName("active");H.removeClassName("end");
H.removeClassName("toucheslock");P=false}}function ah(a){if(!!P){return}H.setVendorPrefixStyle("transition-duration","0");
H.addClassName("active");L=-T*(G-1);H.setVendorPrefixTransform(L+"px",0)}function S(a){if(!!P){return
}if(AC.Detector.iOSVersion()<4){H.setVendorPrefixStyle("transition-duration","")
}H.setVendorPrefixTransform((L-a.difference.x)+"px",0)}function ae(a){if(!!P){return
}P=true;H.addClassName("toucheslock");if(!(a.direction.x=="right"&&G==N)&&!(a.direction.x=="left"&&G==1)){if(a.direction.x=="right"){G++
}if(a.direction.x=="left"){G--}}H.addClassName("end");if(a.direction.x==="right"||a.direction.x==="left"){H.setVendorPrefixStyle("transition-duration","300ms");
H.setVendorPrefixTransform("-"+T*(G-1)+"px",0);ag(G)}else{ab({target:H})}}function I(a){P=false
}function ai(a){if(!!P){return}P=true;var b=parseInt(a.findElement("[page]").getAttribute("page"),10);
if(b==G){P=false;return}if(b){Y(b)}}var ac=this.getPageLabelWidths=function(){var a=$$("a.page");
var b=[];a.each(function(c){b.push(c.getWidth())});this.getPageLabelWidths=function(){return b
};return b};var ag=this.updateControls=function(b){if(V&&N>0){for(var e=0;e<N;e++){if(!aj[e].hasAttribute("page")){aj[e].setAttribute("page",e+1);
aj[e].observe("click",ai)}if(e+1==b){var a=aj[e].addClassName("active")}else{aj[e].removeClassName("active")
}}if(V.className.match("page-")){V.className=V.className.replace(/page-\d/,"page-"+b)
}else{V.className+=" page-"+b}if(K&&a){var h=a.positionedOffset().left,f=a.getWidth()/2,g=parseInt(h+f,10);
if(aa){var c=$(K).getWidth();var d=ac()[b-1]/c;U.setVendorPrefixStyle("transform","scaleX("+d+")");
K.setVendorPrefixTransform(g+"px",0);var j=function(k){if(k.target==K){K.setVendorPrefixTransform(g+"px",0);
K.removeVendorEventListener("transitionEnd",j,false)}};K.addVendorEventListener("transitionEnd",j,false)
}else{if(W){K.style.left=g+"px"}else{K.morph("left:"+g+"px",{duration:0.4})}}}}};
var J=function(a){var b=AC.Tracking.pageName()+" - product nav - "+((aj[a-1])?aj[a-1].innerHTML:"");
AC.Tracking.trackClick({prop3:b},this,"o",b)};var Y=this.update=function(a,b){if(N>1){if(!b){b=(G>a)?"previous":"next"
}if(typeof(a)=="number"){G=a}if(!W){J(G)}O.each(function(c,d){d++;if(d<G){c.wrapper.removeAttribute("enter");
c.wrapper.removeAttribute("entered");if(!aa&&c.wrapper.visible()){Effect.Fade(c.wrapper,{duration:0.6})
}else{if(W){c.wrapper.setAttribute("exited","previous")}else{if(!c.wrapper.hasAttribute("exited")){c.wrapper.setAttribute("exit","previous")
}}}}else{if(d>G){c.wrapper.removeAttribute("enter");c.wrapper.removeAttribute("entered");
if(!aa&&c.wrapper.visible()){if(W){c.wrapper.hide()}else{Effect.Fade(c.wrapper,{duration:0.6})
}}else{if(W){c.wrapper.setAttribute("exited","next")}else{if(!c.wrapper.hasAttribute("exited")){c.wrapper.setAttribute("exit","next")
}}}}else{c.wrapper.removeAttribute("exit");c.wrapper.removeAttribute("exited");
if(!aa){Effect.Appear(c.wrapper,{duration:0.6,afterFinish:I})}else{if(W){c.wrapper.setAttribute("entered",b)
}else{c.wrapper.setAttribute("toenter",b)}}}}c.items.each(function(e){e.removeClassName("started");
if(d<G){e.removeAttribute("enter");e.removeAttribute("entered");if(W){e.setAttribute("exited","previous")
}else{if(!e.hasAttribute("exited")){e.setAttribute("exit","previous")}}}else{if(d>G){e.removeAttribute("enter");
e.removeAttribute("entered");if(W){e.setAttribute("exited","next")}else{if(!e.hasAttribute("exited")){e.setAttribute("exit","next")
}}}else{e.removeAttribute("exit");e.removeAttribute("exited");if(W){e.setAttribute("entered",b)
}else{e.setAttribute("toenter",b)}}}})})}ag(a);W=false};O.each(function(b,d){O[d]={index:d+1,wrapper:b,items:b.select("li")};
b.writeAttribute("page",d+1);b.setStyle({width:"auto"});var c=b.getWidth()+(parseInt(b.getStyle("left"),10)*2);
var a=Math.floor((T-c)/2);b.setStyle({width:c+"px",margin:"0 "+a+"px"})});G=1;H.style.width=T*O.length+"px";
this.update(1)};AC.ProductBrowser.setup=function(){var f=document.getElementsByTagName("head")[0];
var d=document.createElement("script");d.type="text/javascript";d.setAttribute("src","../../images.apple.com/global/scripts/pagingview.js");
f.appendChild(d);d=document.createElement("script");d.type="text/javascript";d.setAttribute("src","../../images.apple.com/global/scripts/reveal.js");
f.appendChild(d);AC.ProductBrowser.browsers={};var e=$$(".productbrowser");document.observe("ac:trackTouches:load",function(){e.each(function(a){AC.ProductBrowser.browsers[a.id]=new AC.ProductBrowser(a)
})})};AC.ProductBrowser.setup();