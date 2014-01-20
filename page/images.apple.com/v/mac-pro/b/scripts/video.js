AC.define("video/desktop/main",["require"],function(d){function c(){var a=AC.Element.selectAll("#assembly-video .screen");
var b=AC.AutoGallery.options("video");b.alwaysUseKeyboardNav=true;heroGallery=new AC.ViewMaster.Viewer(a,"assembly-video","assembly-video",b);
heroGallery.setDelegate({willAnimate:function(s,q,u,v,o){var p="enter-video";var r="exit-video";
var w="movie";var t=s.options.animationDuration||0.6;var x=AC.Element.select("#assembled-in-usa");
if(AC.Element.hasClassName(u,w)){AC.Element.addClassName(x,p);AC.Element.removeClassName(x,r)
}else{if(AC.Element.hasClassName(q,w)){AC.Element.removeClassName(x,p);AC.Element.addClassName(x,r)
}}s._animation(s.view,q,u,v,o,t)}})}AC.onDOMReady(c)});