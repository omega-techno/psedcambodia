AC.define("clickboosterHotfix",["require"],function(d){var f=function(b,a){b=AC.Element.getElementById(b);
var c=b.parentNode;if(AC.Element.isElement(c)){while(c){if(typeof a==="function"){if(a(c)===false){break
}}if(c!==document.body){c=c.parentNode}else{c=null}}}};var e=function(b,a){b=AC.Element.getElementById(b);
var c=null;if(b!==null&&a===undefined){return b.parentNode}f(b,function(h){if(AC.Element.matchesSelector(h,a)){c=h;
return false}});return c};(function(){if(window.attachEvent){var b=function(){var n=document.compatible;
var i=!n?7:undefined;var o;var m;var p=[];if(n){o=n.length;if(o===0){i=parseInt(document.documentMode,10)
}if(o>0){for(m=0;m<o;m+=1){p.push(parseInt(n[m].version.match(/\d{1,2}/),10))}p=p.sort(function(g,h){return g-h
});i=p.pop()}}return i};var a=b();var c=function(){if(document.body.currentStyle){var n;
var q;var r;var t;var o=[];var p;var s=function(h,g){var i=false;f(h,function(j){if(j===g){return false
}if(j.currentStyle.hasLayout){i=true;return false}});return i};AC.Element.selectAll("a > * img").forEach(function(g){n=g.parentNode;
q=e(g,"a");if(s(g,q)&&g.height>0&&g.width>0){if(!AC.Element.select("ieclickbooster",q)){r=document.createElement("ieclickbooster");
t=AC.Element.getStyle(q,"position");if(t==="static"){AC.Element.setStyle(q,{position:"relative"})
}AC.Element.selectAll("> *",q).forEach(function(i){var h=parseInt(i.currentStyle.zIndex,10);
if(h>0){o.push(h)}});o.sort(function(h,i){return i-h});p=o[0]?o[0].toString():"1";
AC.Element.insert(r,q);AC.Element.setStyle(r,{display:"block",position:"absolute",top:"0",bottom:"0",left:"0",right:"0",background:"url(/global/elements/blank.gif)",cursor:"pointer",zIndex:p})
}}})}};AC.onDOMReady(function(){if(a<=7){c()}})}}())});AC.define("AC/SlideView",["require"],function(b){return AC.ViewMaster.SlideViewer
});AC.define("home/FluidGallery",["require"],function(d){var c=AC.Class({initialize:function(l,b,a,k,i,j){this.__defaultOptions={resizeDelay:0.75,debug:false};
this.gallery=l;this.slideshow=i;this.id=l.triggerClassName;this.galleryView=l.view.view();
this.fluidFigures=b;this.previouslyPlaying=null;this.resizing=false;this.minDimensions=j;
this.currentSection=null;this.aspectRatio=a;this.footerHeight=0;if(typeof k!=="object"){k={}
}this.options=Object.extend(Object.clone(this.__defaultOptions),k);this.__setupHandlers();
this.responsiveResize(true);this.adaptiveResize()},__setupHandlers:function(){Event.observe(window,"resize",this.__didResizeWindow.bindAsEventListener(this))
},__didResizeWindow:function(a){if(this.slideshow){if(this.previouslyPlaying===null){this.previouslyPlaying=this.slideshow._playing;
this.slideshow.pause()}}this.responsiveResize(false);this.__startResizeTimer()},__startResizeTimer:function(){this.__cancelResizeTimer();
if(typeof this.__boundAdaptiveResize==="undefined"){this.__boundAdaptiveResize=this.adaptiveResize.bind(this)
}this.__resizeAssetsFlag=setTimeout(this.__boundAdaptiveResize,(this.options.resizeDelay*1000))
},__cancelResizeTimer:function(){if(typeof this.__resizeAssetsFlag!=="undefined"){clearTimeout(this.__resizeAssetsFlag);
delete this.__resizeAssetsFlag}},getBoundingDimensions:function(f,a){var b=Math.max(Math.max(a,this.minDimensions.height)-this.footerHeight,0);
return{width:b*this.aspectRatio,height:b}},getCurrentFigureID:function(){return this.gallery.currentSection.id
},__getFigureIndex:function(a){for(var b=this.fluidFigures.length-1;b>=0;b--){if(this.fluidFigures[b].figure.id===a){return b
}}return 0},__getSectionIndex:function(a){for(var b=this.gallery.orderedSections.length-1;
b>=0;b--){if(this.gallery.orderedSections[b]===a){return b}}return 0},responsiveResize:function(a){if(this.currentSection===null){this.currentSection=this.gallery.currentSection.content;
AC.Element.addClassName(this.galleryView,"resize-mask");AC.Element.addClassName(this.currentSection,"resize-active");
this.galleryView.style.backgroundColor=AC.Element.getStyle(this.currentSection,"background-color")
}this.viewportSize=document.viewport.getDimensions();this.boundedDimensions=this.getBoundingDimensions(this.viewportSize.width,this.viewportSize.height);
this.responsiveResizeFluidFigures();this.responsiveResizeGallery(a)},responsiveResizeFluidFigures:function(){for(var a=this.fluidFigures.length-1;
a>=0;a--){AC.Element.setStyle(this.fluidFigures[a].figure,{width:this.viewportSize.width+"px",height:this.boundedDimensions.height+"px"});
this.fluidFigures[a].resize(this.boundedDimensions)}},responsiveResizeGallery:function(t){var o={};
var q=AC.Detector.isCSSAvailable("transition");var a=AC.Detector.isCSSAvailable("transform");
var v=this.gallery.orderedSections.length;var n=this.viewportSize.width*v;var s=this.boundedDimensions.height;
var p=this.__getSectionIndex(this.getCurrentFigureID());var b=Math.max(this.viewportSize.width,this.minDimensions.width);
var u=-1*p*b;var r=0;if(this.gallery.options.useTouchEvents===true&&typeof window.ontouchstart!=="undefined"){this.gallery.__maskWidth=this.gallery.__mask.getWidth()
}o.width=n+"px";o.height=s+"px";o.marginLeft=r+"px";if(q&&a){if(!t){this.galleryView.setVendorPrefixStyle("transition","none")
}this.galleryView.setVendorPrefixStyle("transform","translate3d("+u+"px, 0, 0)")
}else{o.left=u+"px"}AC.Element.setStyle(this.galleryView,o);if(t){AC.Element.addClassName(this.galleryView,"initial-resize")
}},adaptiveResize:function(){AC.Element.removeClassName(this.galleryView,"resize-mask");
AC.Element.removeClassName(this.currentSection,"resize-active");this.galleryView.style.backgroundColor="";
this.currentSection=null;if(this.slideshow){if(this.previouslyPlaying){this.slideshow.play()
}this.previouslyPlaying=null}},adaptiveResizeFluidFigures:function(){}});return c
});AC.define("home/ContinuousSlideGallery",["require","AC/SlideView","home/FluidGallery"],function(q){var m=q("AC/SlideView");
var j=q("home/FluidGallery");var k=AC.Storage.getItem;var o=AC.Storage.setItem;
var p=AC.Environment.Browser.name;var l=AC.Environment.Browser.version;var n=p.toLowerCase()==="ie"&&l<9;
var r={colors:["blue","yellow","pink","green","white"],colorIndexKey:"home-gallery-colors-20130827",skinAttribute:"data-skin",contentSelector:"#hero-gallery .gallery-content",colorSlidesClassName:"gallery-5c",heroGalleryOptions:{continuous:false,useTouchEvents:true,useKeyboardNav:true,alwaysUseKeyboardNav:true,heightFromFirstSection:false,silentTriggers:true,animationDuration:0.7,shouldAnimateContentChange:false},heroSlideShowOptions:{autoplay:false,delay:7000,stopOnUserInteraction:true},init:function(){this.wrapper=AC.Element.select(".promo-lead");
this.galleryView=AC.Element.select("#hero-gallery");this.navContainer=AC.Element.select(".dot-nav",this.wrapper);
if(!("ontouchstart" in window)&&!n){this.setupContinuousSlider()}this.colorSlides=AC.Element.selectAll("."+this.colorSlidesClassName);
this.galleryContent=AC.Element.selectAll(this.contentSelector);this.heroGallery=this.createHeroGallery(this.galleryContent,this.heroGalleryOptions);
this.heroSlideShow=this.createHeroSlideShow(this.heroSlideShowOptions);this.dotNavUsed=false;
if(!("ontouchstart" in window)){this.minDimensions={width:980,height:652};this.setupFluidGallery()
}else{AC.Element.addClassName(this.galleryView,"touch")}var a=function(){this.heroGallery.options.shouldAnimateContentChange=true;
this.heroGallery.__storedShouldAnimateContentChange=true}.bind(this);if("ongestureend" in window){window.addEventListener("gestureend",function(){setTimeout(a,1)
})}this.initNav();this.addEvents();this.initColors();this.heroSlideShow.pause()
},addFullSpans:function(){var a=AC.Element.selectAll(".gallery-content");a.forEach(function(f){var b=AC.Element.select("h1 img",f);
var e=AC.Element.select("a.block",f);var c=e.getAttribute("href");var d=document.createElement("a");
d.className="full-span";d.setAttribute("href",c);d.innerHTML=b.getAttribute("alt");
f.appendChild(d)})},setupContinuousSlider:function(){var a=AC.Element.select(".gallery-content",this.galleryView);
this.duplicateContentNodes();AC.Element.addClassName(this.wrapper,"continuous");
this.modifyDotNav();this.updateNav(a);this.heroGalleryOptions.continuous=true},modifyDotNav:function(){var a=AC.Element.selectAll("a",this.navContainer);
[].forEach.call(a,this.interceptClick.bind(this))},interceptClick:function(a){AC.Element.addEventListener(a,"click",function(e){var b=AC.Event.target(e);
var c=b.getAttribute("data-target");var d=AC.Element.select('a[href="#'+c+'"]',this.wrapper);
AC.Event.stop(e);this.heroGallery._currentTrigger=b;if(c==="next"){this.heroGallery.showNext()
}else{if(c==="previous"){this.heroGallery.showPrevious()}}}.bind(this))},duplicateContentNodes:function(){var a=AC.Element.selectAll(this.contentSelector);
[].forEach.call(a,function(c){var b=c.cloneNode(true);AC.Element.addClassName(b,"duplicate");
b.id+="-duplicate";this.galleryView.appendChild(b)}.bind(this))},initNav:function(){var a=window.location.href.indexOf("#")>0;
var b=this.heroGallery.orderedSections[0];var c=(a)?this.heroGallery.currentSection.content:b.content;
if(c){this.updateNav(c)}this.heroGallery.options.shouldAnimateContentChange=true
},updateNav:function(b){var c=AC.Element.select("a.air",this.navContainer);var a=AC.Element.select("a.mini",this.navContainer);
if(AC.Element.hasClassName(b,"gallery-ipad-air")){AC.Element.removeClassName(a,"active");
AC.Element.addClassName(c,"active")}else{AC.Element.removeClassName(c,"active");
AC.Element.addClassName(a,"active")}},initColors:function(){var a=AC.Storage.getItem(this.colorIndexKey)||0;
var b=a%this.colors.length;this.setColor(this.colors[b]);AC.Storage.setItem(this.colorIndexKey,b+1)
},addEvents:function(){AC.Element.addEventListener(window,"load",function(){this.heroSlideShow.start()
}.bind(this))},setColor:function(a){[].forEach.call(this.colorSlides,function(b){[].forEach.call(this.colors,function(c){AC.Element.removeClassName(b,c)
});AC.Element.addClassName(b,a)}.bind(this))},swapColors:function(){var b;var a=AC.Storage.getItem(this.colorIndexKey);
b=a%this.colors.length;this.setColor(this.colors[b]);AC.Storage.setItem(this.colorIndexKey,a+1)
},createHeroGallery:function(b,c){var a=this.galleryView.id;var d=new m(b,a,a,c);
d.setDelegate({didShow:function(g,f,h){var e=AC.Element.hasClassName;if(f&&f.content&&e(f.content,this.colorSlidesClassName)){this.swapColors()
}}.bind(this),willShow:function(f,e,g){this.updateNav(g.content)}.bind(this)});
return d},createHeroSlideShow:function(a){return new AC.ViewMaster.Slideshow(this.heroGallery,null,a)
},setupFluidGallery:function(){var a=[];var b=new j(this.heroGallery,a,1.17,{},this.heroSlideShow,this.minDimensions);
return b}};return r});AC.define("home/analytics/builder",["require"],function(f){var g=function(c){var d=(c.innerText)?c.innerText.trim():c.textContent.trim();
var j=AC.Element.select("img",c);var b=c.href.replace(new RegExp("^"+window.location.protocol+"//"),"").replace(new RegExp("^"+window.location.host+"/"),"").replace(/\/$/,"");
var a=c.getAttribute("data-track-label");if(a){return a}if(d!==""){return d}if(j){d=j.getAttribute("alt");
if(d!==""){return d}j=j.getAttribute("src");if(j){return j.substring(j.lastIndexOf("../index.html")+1,j.length)
}}return b};var e=function(d){var b=AC.Event.target(d);var a=false;var c;while(b&&b.parentNode&&b.tagName&&b.tagName.toLowerCase()!=="a"){b=b.parentNode
}if(!b){return}a=g(b);if(a&&a!==""){c={prop3:("h@"+a+" - "+AC.Tracking.pageName()).toLowerCase()};
AC.Tracking.trackClick(c,this,"o",c.prop3)}};var h=function(){if(window.tracker){window.tracker.setDelegate({sectionDidChange:function(d,o,p,a,m){var c=(a)?a.replace("-duplicate",""):" - "+AC.Tracking.pageName();
var n=o._currentTrigger;delete o._currentTrigger;if(n&&typeof Element.up==="function"){if(n==="arrow_right"||n==="arrow_left"){m.pageName="ki@"+c;
return m}if(n==="swipe"){m.pageName="si@"+c;return m}if(AC.Element.isElement(n)&&Element.up(n,".dot")){m.pageName="bi@"+c;
return m}try{if(AC.Element.isElement(link)&&Element.up(link,".paddle-nav")){m.pageName="pi@"+c;
return m}}catch(b){}}return m}})}};return function(a,c){var d=AC.Element.selectAll("#showcase .promo-lead .gallery-content a[href]");
var b,i;for(b=0,i=d.length;b<i;b+=1){AC.Element.addEventListener(d[b],"mousedown",e)
}h()}});AC.define("home/IEClickBooster",["require"],function(b){return function(a){var f=AC.Element.selectAll(a);
var e=document.createElement("b");if(!f||!f.length){return}e.className="clickbooster";
f.forEach(function(c){c.appendChild(e.cloneNode())})}});AC.define("home/bootstrap",["require","clickboosterHotfix","home/ContinuousSlideGallery","home/analytics/builder","home/IEClickBooster"],function(h){h("clickboosterHotfix");
var g=h("home/ContinuousSlideGallery");var e=h("home/analytics/builder");var f=h("home/IEClickBooster");
AC.onDOMReady(function(){var a=AC.Environment.Browser.os==="iOS"||AC.Environment.Browser.name=="IE";
AC.ViewMaster.SlideViewer.prototype.__touchLoadEventDependencies=function(){if(typeof Element.trackTouches==="function"){this.__touchInitTrackTouches()
}else{this.__boundTouchInitTrackTouches=this.__touchInitTrackTouches.bindAsEventListener(this);
document.observe("ac:trackTouches:load",this.__boundTouchInitTrackTouches)}};if(!a){g.init()
}if(AC.Environment.Browser.name=="IE"&&AC.Environment.Browser.version<=7){f("a.block .column")
}e()})});