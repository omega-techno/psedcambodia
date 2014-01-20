AC.define("AC/SlideView",["require"],function(b){return AC.ViewMaster.SlideViewer
});AC.define("home/FluidGallery",["require"],function(d){var c=AC.Class({initialize:function(l,b,a,k,i,j){this.__defaultOptions={resizeDelay:0.75,debug:false};
this.gallery=l;this.slideshow=i;this.id=l.triggerClassName;this.galleryView=l.view.view();
this.fluidFigures=b;this.previouslyPlaying=null;this.resizing=false;this.minDimensions=j;
this.currentSection=null;this.aspectRatio=a;this.footerHeight=0;if(typeof k!=="object"){k={}
}this.options=Object.extend(Object.clone(this.__defaultOptions),k);this.__setupHandlers();
this.responsiveResize(true);this.adaptiveResize()},__setupHandlers:function(){Event.observe(window,"resize",this.__didResizeWindow.bindAsEventListener(this))
},__didResizeWindow:function(a){if(this.slideshow){if(this.previouslyPlaying===null){this.previouslyPlaying=this.slideshow._playing;
this.slideshow.pause();this.gallery._locked=true}}this.responsiveResize(false);
this.__startResizeTimer()},__startResizeTimer:function(){this.__cancelResizeTimer();
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
}if(this.viewportSize.width<this.minDimensions.width){r=-((this.minDimensions.width-this.viewportSize.width)/2)
}o.width=n+"px";o.height=s+"px";o.marginLeft=r+"px";if(q&&a){if(!t){this.galleryView.setVendorPrefixStyle("transition","none")
}this.galleryView.setVendorPrefixStyle("transform","translate3d("+u+"px, 0, 0)")
}else{o.left=u+"px"}AC.Element.setStyle(this.galleryView,o);if(t){AC.Element.addClassName(this.galleryView,"initial-resize")
}},adaptiveResize:function(){AC.Element.removeClassName(this.galleryView,"resize-mask");
AC.Element.removeClassName(this.currentSection,"resize-active");this.galleryView.style.backgroundColor="";
this.currentSection=null;this.gallery._locked=false;if(this.slideshow){if(this.previouslyPlaying){this.slideshow.play()
}this.previouslyPlaying=null}},adaptiveResizeFluidFigures:function(){}});return c
});AC.define("home/ContinuousSlideGallery",["require","AC/SlideView","home/FluidGallery"],function(q){var m=q("AC/SlideView");
var j=q("home/FluidGallery");var k=AC.Storage.getItem;var o=AC.Storage.setItem;
var p=AC.Environment.Browser.name;var l=AC.Environment.Browser.version;var n=p.toLowerCase()==="ie"&&l<9;
var r={colors:["blue","yellow","pink","green","white"],colorIndexKey:"home-gallery-colors-20130827",skinAttribute:"data-skin",contentSelector:"#hero-gallery .gallery-content",colorSlidesClassName:"gallery-5c",heroGalleryOptions:{continuous:false,useTouchEvents:true,useKeyboardNav:true,alwaysUseKeyboardNav:true,heightFromFirstSection:false,silentTriggers:true,animationDuration:0.7,shouldAnimateContentChange:false},heroSlideShowOptions:{autoplay:false,delay:7000,stopOnUserInteraction:true},init:function(){this.wrapper=AC.Element.select(".promo-lead");
this.galleryView=AC.Element.select("#hero-gallery");this.navContainer=AC.Element.select(".dot-nav",this.wrapper);
if(!("ontouchstart" in window)&&!n){this.setupContinuousSlider()}this.addFullSpans();
this.colorSlides=AC.Element.selectAll("."+this.colorSlidesClassName);this.galleryContent=AC.Element.selectAll(this.contentSelector);
this.heroGallery=this.createHeroGallery(this.galleryContent,this.heroGalleryOptions);
this.heroSlideShow=this.createHeroSlideShow(this.heroSlideShowOptions);this.dotNavUsed=false;
if(!("ontouchstart" in window)){this.minDimensions={width:1280,height:652};this.setupFluidGallery()
}else{AC.Element.addClassName(this.galleryView,"touch")}var a=function(){this.heroGallery.options.shouldAnimateContentChange=true;
this.heroGallery.__storedShouldAnimateContentChange=true}.bind(this);if("ongestureend" in window){window.addEventListener("gestureend",function(){setTimeout(a,1)
})}this.initNav();this.addEvents();this.initColors();this.initTracking();this.heroSlideShow.pause()
},addFullSpans:function(){var a=AC.Element.selectAll(".gallery-content");a.forEach(function(f){var b=AC.Element.select("h1 img",f);
var e=AC.Element.select("a.block",f);var c=e.getAttribute("href");var d=document.createElement("a");
d.className="full-span";d.setAttribute("href",c);d.innerHTML=b.getAttribute("alt");
f.appendChild(d)})},setupContinuousSlider:function(){var a=AC.Element.select(".gallery-content",this.galleryView);
this.duplicateContentNodes();AC.Element.addClassName(this.wrapper,"continuous");
this.modifyDotNav();this.updateNav(a);this.heroGalleryOptions.continuous=true},modifyDotNav:function(){var b=AC.Element.selectAll("a",this.navContainer);
var a=b[0];var c=b[1];a.setAttribute("data-target","#previous");c.setAttribute("data-target","#next");
[].forEach.call(b,this.interceptClick.bind(this));this.modifiedDotNav=true},interceptClick:function(a){AC.Element.addEventListener(a,"click",function(f){var b=AC.Event.target(f);
var e=b.getAttribute("data-target");var c=b.getAttribute("data-target").replace("#","");
var d=AC.Element.select('a[href="'+e+'"]',this.wrapper);AC.Event.stop(f);if(c==="next"){this.heroGallery.showNext()
}else{if(c==="previous"){this.heroGallery.showPrevious()}}}.bind(this))},duplicateContentNodes:function(){var a=AC.Element.selectAll(this.contentSelector);
[].forEach.call(a,function(c){var b=c.cloneNode(true);AC.Element.addClassName(b,"duplicate");
b.id+="-duplicate";this.galleryView.appendChild(b)}.bind(this))},initNav:function(){var a=window.location.href.indexOf("#")>0;
var b=this.heroGallery.orderedSections[0];var c=(a)?this.heroGallery.currentSection.content:b.content;
if(c){this.updateNav(c)}this.heroGallery.options.shouldAnimateContentChange=true
},updateNav:function(c){var a=AC.Element.selectAll("a",this.navContainer);var b=c.id.replace("MASKED-","").replace("-duplicate","");
if(!this.modifiedDotNav){return}[].forEach.call(a,function(d){var e=d.getAttribute("href");
var f=e.replace("#","");if(c.className.indexOf(f)!=-1){AC.Element.addClassName(d,"active")
}else{AC.Element.removeClassName(d,"active")}}.bind(this))},initColors:function(){var a=AC.Storage.getItem(this.colorIndexKey)||0;
var b=a%this.colors.length;this.setColor(this.colors[b]);AC.Storage.setItem(this.colorIndexKey,b+1)
},initTracking:function(){if(typeof AC.ViewMaster.Tracker==="function"){window.tracker=new AC.ViewMaster.Tracker("click")
}},addEvents:function(){AC.Element.addEventListener(window,"load",function(){this.heroSlideShow.start()
}.bind(this))},setColor:function(a){[].forEach.call(this.colorSlides,function(b){[].forEach.call(this.colors,function(c){AC.Element.removeClassName(b,c)
});AC.Element.addClassName(b,a)}.bind(this))},swapColors:function(){var b;var a=AC.Storage.getItem(this.colorIndexKey);
b=a%this.colors.length;this.setColor(this.colors[b]);AC.Storage.setItem(this.colorIndexKey,a+1)
},createHeroGallery:function(b,c){var a=this.galleryView.id;var d=new m(b,a,a,c);
d.setDelegate({didShow:function(g,f,h){var e=AC.Element.hasClassName;if(f&&f.content&&e(f.content,this.colorSlidesClassName)){this.swapColors()
}}.bind(this),willShow:function(f,e,g){this.updateNav(g.content)}.bind(this)});
return d},createHeroSlideShow:function(a){return new AC.ViewMaster.Slideshow(this.heroGallery,null,a)
},setupFluidGallery:function(){var a=[];var b=new j(this.heroGallery,a,1.17,{},this.heroSlideShow,this.minDimensions);
return b}};return r});AC.define("home/analytics/builder",["require"],function(e){var f=function(b){var c=(b.innerText)?b.innerText.trim():b.textContent.trim();
var h=AC.Element.select("img",b);var a=b.href.replace(new RegExp("^"+window.location.protocol+"//"),"").replace(new RegExp("^"+window.location.host+"/"),"").replace(/\/$/,"");
if(c!==""){return c}if(h){c=h.getAttribute("alt");if(c!==""){return c}h=h.getAttribute("src");
if(h){return h.substring(h.lastIndexOf("../index.html")+1,h.length)}}return a};var d=function(h){var b=AC.Event.target(h);
var a=false;var c;while(b&&b.parentNode&&b.tagName&&b.tagName.toLowerCase()!=="a"){b=b.parentNode
}if(!b){return}a=f(b);if(a&&a!==""){c={prop3:("h@"+a+" - "+AC.Tracking.pageName()).toLowerCase()};
AC.Tracking.trackClick(c,this,"o",c.prop3)}};return function(a,c){var i=AC.Element.selectAll("#showcase .promo-lead .gallery-content a[href]");
var b,j;for(b=0,j=i.length;b<j;b+=1){AC.Element.addEventListener(i[b],"mousedown",d)
}}});AC.define("home/IEClickBooster",["require"],function(b){return function(a){var f=AC.Element.selectAll(a);
var e=document.createElement("b");if(!f||!f.length){return}e.className="clickbooster";
f.forEach(function(c){c.appendChild(e.cloneNode())})}});AC.define("home/bootstrap",["require","home/ContinuousSlideGallery","home/analytics/builder","home/IEClickBooster"],function(h){var g=h("home/ContinuousSlideGallery");
var e=h("home/analytics/builder");var f=h("home/IEClickBooster");AC.onDOMReady(function(){AC.ViewMaster.SlideViewer.prototype.__touchLoadEventDependencies=function(){if(typeof Element.trackTouches==="function"){this.__touchInitTrackTouches()
}else{this.__boundTouchInitTrackTouches=this.__touchInitTrackTouches.bindAsEventListener(this);
document.observe("ac:trackTouches:load",this.__boundTouchInitTrackTouches)}};g.init();
if(AC.Environment.Browser.name=="IE"&&AC.Environment.Browser.version<=7){f("a.block .column")
}e()})});