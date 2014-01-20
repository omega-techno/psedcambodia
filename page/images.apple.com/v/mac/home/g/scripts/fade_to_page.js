AC.onDOMReady(function(){if(!AC.Detector.isCSSAvailable("transition")){return}var y=["/mac-pro/","/macpro/"];
var H="../../images.apple.com/v/mac-pro/home/b/scripts/redirect.js";var E=document.getElementsByTagName("html")[0];
var F=document.getElementsByTagName("body")[0];var v=document.createElement("div");
var u="#000";var L;var C=["position:relative;","z-index:1;"].join(" ");var G=["background-color:"+u+";","position:absolute;","z-index:10001;","top:0;","right:0;","bottom:0;","left:0;","opacity:0;","-webkit-transition:opacity 1s linear;","-moz-transition:opacity 1s linear;"].join(" ");
var I=0;var w=0;var x=0;var z=0;var A=0;var B=5;var J=0;var K=0;function N(){var a=[];
y.forEach(function(c){var b=document.querySelectorAll('a[href$="'+c+'"]');b=Array.prototype.slice.call(b);
a=a.concat(b)});L=a}function M(){var a=document.createElement("style");a.type="text/css";
var b="html {"+C+"} #overlay { "+G+"}";if(a.styleSheet){a.styleSheet.cssText=b}else{a.appendChild(document.createTextNode(b))
}document.head.appendChild(a)}function D(){L.forEach(function(c){c.addEventListener("click",a,"false");
c.addEventListener("touchstart",f,"false");c.addEventListener("touchmove",d,"false");
c.addEventListener("touchend",b,"false");function f(j){w=j.touches[0].pageX;x=j.touches[0].pageY;
I=j.touches.length;if(I>1){e(j)}}function d(j){if(I===1){z=j.touches[0].pageX;J=Math.round(Math.sqrt(Math.pow(z-w,2)));
K=Math.round(Math.sqrt(Math.pow(A-x,2)))}else{e(j)}}function b(j){j.preventDefault();
if(I===1){if(J<B&&K<B){j.preventDefault();j.stopPropagation();i()}else{e(j)}}else{e(j)
}}function e(j){I=0;z=0;A=0;J=0;K=0}function a(j){j.preventDefault();i()}function i(){v.id="overlay";
v.style.height=document.body.offsetHeight+"px";F.appendChild(v);v.addVendorEventListener("transitionEnd",h,"false");
setTimeout(function(){v.style.opacity=1},50)}function g(){var k=document.title;
var j=document.location.pathname;if(window.history&&history.pushState){history.pushState(null,k,j)
}}function h(){E.style.background=u;F.style.display="none";var j=document.createElement("script");
j.type="text/javascript";j.src=H;document.getElementsByTagName("head")[0].appendChild(j);
g();setTimeout(function(){window.location=c.href||"/mac-pro/"},1000)}})}M();N();
D()});