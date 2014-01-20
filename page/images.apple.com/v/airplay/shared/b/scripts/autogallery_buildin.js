AC.AutoGallery.addType("build-in",{useKeyboardNav:true,animationDuration:0.4},Prototype.emptyFunction(),"image",{delegate:{willAnimate:function(C,B,D,s){var E=C.view.currentContent;
var x=C.options.animationDuration;var v=100;var y=v*3.5;var u=v*1.5;if(E){E.style.position="relative"
}if(B){B.style.position="absolute"}if(D){D.style.position="absolute"}var H=function(){if(E){E.style.position=""
}if(B){B.style.position=""}if(D){D.style.position=""}s()};if(AC.Detector.isCSSAvailable("transition")){if(D){var I=D.down(".screen");
var G=D.down(".ipadhardware");var t=D.down(".appletvhardware");var A=D.down(".hardware-left");
var w=D.down(".hardware-right");var z=B.down(".hardware-left");var J=B.down(".hardware-right");
D.setOpacity(0);D.setVendorPrefixStyle("transition","opacity "+x+"s");D.setVendorPrefixStyle("transition-timing-function"," ");
if(I){I.setOpacity(0);I.setVendorPrefixStyle("transition","opacity "+x+"s");I.setVendorPrefixStyle("transition-timing-function","linear")
}if(G){G.setOpacity(0);G.setVendorPrefixStyle("transition","opacity "+x+"s");G.setVendorPrefixStyle("transition-timing-function","linear")
}if(I&&(A||w)){if((z&&A)||(J&&w)){D.setVendorPrefixStyle("transition","opacity 0.1s")
}else{if(t){t.setOpacity(0);t.setVendorPrefixStyle("transition","opacity "+x+"s");
t.setVendorPrefixStyle("transition-timing-function","linear");window.setTimeout(function(){t.setOpacity(1)
},y)}}}if(B&&C.options.shouldAnimateFadeIn!==true){var I=B.down(".screen");var G=B.down(".ipadhardware");
B.setOpacity(1);B.setVendorPrefixStyle("transition","opacity "+x+"s");B.setVendorPrefixStyle("transition-timing-function"," ");
if(I&&!G){I.setOpacity(1);I.setVendorPrefixStyle("transition","opacity "+x+"s");
I.setVendorPrefixStyle("transition-timing-function","linear")}if(I&&G){G.setOpacity(0);
G.setVendorPrefixStyle("transition","opacity "+x+"s");G.setVendorPrefixStyle("transition-timing-function","linear");
I.setOpacity(1);I.setVendorPrefixStyle("transition","opacity "+x+"s");I.setVendorPrefixStyle("transition-timing-function","linear")
}}window.setTimeout(function(){if(D){D.setOpacity(1)}if(B&&C.options.shouldAnimateFadeIn!==true){B.setOpacity(0)
}},v);if(D){var I=D.down(".screen");var G=D.down(".ipadhardware");var t=D.down(".appletvhardware");
if(I&&!G){window.setTimeout(function(){I.setOpacity(1)},y)}if(I&&G){window.setTimeout(function(){G.setOpacity(1);
window.setTimeout(function(){I.setOpacity(1)},u)},y)}}var F=function(a){if(a.target==D&&a.propertyName=="opacity"){D.removeVendorEventListener("transitionEnd",F,false);
H()}};if(D){D.addVendorEventListener("transitionEnd",F,false)}}}else{if(B&&C.options.shouldAnimateFadeIn!==true){return new Effect.Parallel([new Effect.Opacity(B,{sync:true,from:1,to:0}),new Effect.Opacity(D,{sync:true,from:0,to:1})],{duration:x,afterFinish:H})
}else{return new Effect.Opacity(D,{from:0,to:1,duration:x,afterFinish:H})}}}}});