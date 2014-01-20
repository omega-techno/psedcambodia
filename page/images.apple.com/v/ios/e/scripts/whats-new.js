(function(){var d=AC.require("animationSlider/builder");var c=AC.Class({__defaultOptions:{horizontalOffset:-4},initialize:function(f,a,b){this._options={};
this._container=null;this._slider=null;this.__containerId=f;this.__slideElementId=a;
this._enabled=AC.Environment.Feature.cssPropertyAvailable("transition")&&!AC.Environment.Feature.touchAvailable();
this.synthesize();this.setOptions(AC.Object.extend(AC.Object.clone(this.__defaultOptions),b||{}))
},willShow:function(a,b,h){if(this.enabled()){if(b&&h){var g=AC.Element.select("a."+a.triggerClassName+'[href$="'+h.id+'"]',this.container());
this.__updateActiveState(g)}}},didShow:function(b,g,h){if(this.enabled()){if(!g&&h){var a=AC.Element.getElementById(this.__slideElementId);
this.setContainer(AC.Element.getElementById(this.__containerId));this.setSlider(d(a,"ease-out"));
AC.Element.addClassName(this.container(),"enhanced")}}},__updateActiveState:function(h){var a=AC.Element.getBoundingBox(this.container());
var b=AC.Element.getBoundingBox(h);var g=b.left-a.left+this.options().horizontalOffset;
this.slider()._parent._currentDistance=0;this.slider().slide(g,400)}});AC.AutoGallery.addType("gallery-ios7-camera",{initialId:"gallery-ios7-camera-5"},AC.Function.emptyFunction,"image-fadein",{delegate:new c("camera-thumbs","highlighter")})
}());AC.onDOMReady(function(){(function(){var c=new AC.Ambient.Scroll("scroller-nav",{didPlayOnTransitionEnd:9,analytics:false,playOnVisitorEngaged:true,cleanupShowOnScrollAfterPlay:true,showOnScrollOptions:{threshold:0,timeInView:0}});
c.setDelegate({canPlay:function(){return AC.Environment.Feature.cssPropertyAvailable("transition")&&!AC.Environment.Feature.touchAvailable()
}});if(c.delegate().canPlay()&&AC.Environment.Browser.isWebKit()){var d=c.showOnScroll();
window.setTimeout(function(){d.__onScroll.call(d)},250)}}())});(function(){var c=AC.require("screenSequence/ScreenSequence");
var d=AC.require("screenSequence/director");AC.onDOMReady(function(){if(AC.Environment.Feature.isTablet()&&!AC.Environment.Feature.isRetina()){var g=AC.Element.getElementById("screensequence-controlcenter");
var a=AC.Element.getElementById("screensequence-notificationcenter");var h=AC.Element.getElementById("screensequence-multitasking");
var b=function(f){var n=f.getAttribute("data-screensequence");var o=AC.Element.select(".screensequence-trigger",f);
AC.Element.addClassName(f,"screensequence-clicktoplay");AC.Element.addClassName(o,"screensequence-clicktoplay");
AC.Element.removeClassName(o,"replay");var p=o.getAttribute("data-alternate-text");
o.textContent=p;var m=document.createElement("span");AC.Element.addClassName(m,"icon show-on-canplay");
AC.Element.insert(m,o);f.setAttribute("data-screensequence",n.replace(/#.*/,"#clicktoplay"));
var e=d.createSequence(f);d.createUXController(e)};[g,a,h].forEach(function(e){b(e)
})}})}());(function(){AC.onDOMReady(function(){if(AC.Detector.isMobile()&&AC.Detector.iOSVersion()>=6){var f=AC.Element.selectAll(".screensequence-enhanced");
var h=document.createElement("span");AC.Element.addClassName(h,"play-large");h.innerHTML="play";
for(var e=0;e<f.length;e++){AC.Element.addClassName(f[e],"large-play-button");var g=h.clone(true);
AC.Element.insert(g,f[e])}}})}());