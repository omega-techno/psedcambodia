AC.AutoGallery.addType("build-in",{useKeyboardNav:true,animationDuration:0.4},Prototype.emptyFunction(),"image",{delegate:{willAnimate:function(r,w,x,y){var p=r.view.currentContent;
var s=r.options.animationDuration;var t=100;var o=t*3.5;var v=t*1.5;if(p){p.style.position="relative"
}if(w){w.style.position="absolute"}if(x){x.style.position="absolute"}var z=function(){if(p){p.style.position=""
}if(w){w.style.position=""}if(x){x.style.position=""}y()};if(AC.Detector.isCSSAvailable("transition")){if(x){var n=x.down(".screen");
var u=x.down(".ipadhardware");x.setOpacity(0);x.setVendorPrefixStyle("transition","opacity "+s+"s");
x.setVendorPrefixStyle("transition-timing-function"," ");if(n&&!u){n.setOpacity(0);
n.setVendorPrefixStyle("transition","opacity "+s+"s");n.setVendorPrefixStyle("transition-timing-function","linear")
}if(n&&u){u.setOpacity(0);u.setVendorPrefixStyle("transition","opacity "+s+"s");
u.setVendorPrefixStyle("transition-timing-function","linear");n.setOpacity(0);n.setVendorPrefixStyle("transition","opacity "+s+"s");
n.setVendorPrefixStyle("transition-timing-function","linear")}if(w&&r.options.shouldAnimateFadeIn!==true){var n=w.down(".screen");
var u=w.down(".ipadhardware");w.setOpacity(1);w.setVendorPrefixStyle("transition","opacity "+s+"s");
w.setVendorPrefixStyle("transition-timing-function"," ");if(n&&!u){n.setOpacity(1);
n.setVendorPrefixStyle("transition","opacity "+s+"s");n.setVendorPrefixStyle("transition-timing-function","linear")
}if(n&&u){u.setOpacity(0);u.setVendorPrefixStyle("transition","opacity "+s+"s");
u.setVendorPrefixStyle("transition-timing-function","linear");n.setOpacity(1);n.setVendorPrefixStyle("transition","opacity "+s+"s");
n.setVendorPrefixStyle("transition-timing-function","linear")}}window.setTimeout(function(){if(x){x.setOpacity(1)
}if(w&&r.options.shouldAnimateFadeIn!==true){w.setOpacity(0)}},t);if(x){var n=x.down(".screen");
var u=x.down(".ipadhardware");if(n&&!u){window.setTimeout(function(){n.setOpacity(1)
},o)}if(n&&u){window.setTimeout(function(){u.setOpacity(1);window.setTimeout(function(){n.setOpacity(1)
},v)},o)}}var q=function(a){if(a.target==x&&a.propertyName=="opacity"){x.removeVendorEventListener("transitionEnd",q,false);
z()}};if(x){x.addVendorEventListener("transitionEnd",q,false)}}}else{if(w&&r.options.shouldAnimateFadeIn!==true){return new Effect.Parallel([new Effect.Opacity(w,{sync:true,from:1,to:0}),new Effect.Opacity(x,{sync:true,from:0,to:1})],{duration:s,afterFinish:z})
}else{return new Effect.Opacity(x,{from:0,to:1,duration:s,afterFinish:z})}}}}});