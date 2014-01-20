(function(){var h=AC.require("screenSequence/director");var f;function g(){var a=AC.Element.selectAll("#hero-video .screen");
var b=AC.AutoGallery.options("video");b.alwaysUseKeyboardNav=true;f=new AC.ViewMaster.Viewer(a,"hero-video","hero-video",b);
f.setDelegate({willAnimate:function(t,r,v,w,c){var q="enter-video";var s="exit-video";
var x="video";var u=t.options.animationDuration||0.6;var d=AC.Element.getElementById("hero");
if(AC.Element.hasClassName(v,x)){AC.Element.addClassName(d,q);AC.Element.removeClassName(d,s)
}else{if(AC.Element.hasClassName(r,x)){AC.Element.removeClassName(d,q);AC.Element.addClassName(d,s)
}}t._animation(t.view,r,v,w,c,u)}})}function e(){var c="overview_hero_avail";var b=AC.Element.select("#hero-ambient");
b.setAttribute("data-screensequence",c+"#format:flow");b.setAttribute("data-analytics","play,didPlay,stop");
b.setAttribute("data-analytics-name","hero-ambient");var d=AC.Element.select("#hero-ambient .endstate");
var j=AC.Element.select("#hero-fallback",b);var a=h.createSequence(b);if(typeof a!=="object"){return
}AC.Element.addEventListener(a.sequence().element,"canplaythrough",function(){a.play()
},false);h.createUXController(a);a.load()}AC.onDOMReady(function(){g();e()})})();