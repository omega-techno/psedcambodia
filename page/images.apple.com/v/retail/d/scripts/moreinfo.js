(function(D){var J=45;var G="moreinfo-open"+D.location.pathname;var H=AC.Detector.isCSSAvailable("transition");
var x=AC.Element.isElement;var A,F,w,C,I,z,B;function u(){A=AC.Element.select(".moreinfo-trigger");
F=AC.Element.select(".moreinfo-open");w=AC.Element.select(".moreinfo-close");C=AC.Element.select("#moreinfo");
I=C.offsetHeight+J;B=C.parentNode;if(!x(F)||!x(w)||!x(C)){return}if(H){D.setTimeout(t,0)
}if(AC.Storage.getItem(G)){K()}else{L()}AC.Element.addEventListener(A,"click",v)
}function t(){AC.Element.setVendorPrefixStyle(C,"transition","height 1s")}function v(a){AC.Event.stop(a);
if(z){E("close",this);L()}else{E("open",this);K()}}function E(c,b){var d="More info panel - "+AC.Tracking.pageName()+" - "+c;
var a="contextual anchor link";AC.Tracking.trackClick({prop3:d,prop25:a},b,"o",d)
}function K(){F.style.display="none";w.style.display="block";C.style.height=I+"px";
AC.Storage.setItem(G,true,0);if(!H){AC.Element.selectAll("sup",C).forEach(function(a){a.className=a.className+" "
})}else{y()}z=true}function L(){w.style.display="none";F.style.display="block";
C.style.height="0px";AC.Storage.removeItem(G);y();z=false}function y(){var d=AC.Environment.Browser;
var a=d.name==="Chrome"&&d.version<28;var b;if(!a||!D.getComputedStyle(B).background.match(/gradient/)||!D.requestAnimationFrame){return
}function c(){B.style.backgroundImage=D.getComputedStyle(B)["background-image"];
b=D.requestAnimationFrame(c)}B.addEventListener("webkitTransitionEnd",function(){D.webkitCancelAnimationFrame(b)
});c()}AC.onDOMReady(u)})(window);