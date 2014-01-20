AC.define("AC/SlideView",["require"],function(b){return AC.ViewMaster.SlideViewer
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
}if(this.viewportSize.width<this.minDimensions.width){r=-((this.minDimensions.width-this.viewportSize.width)/2)
}o.width=n+"px";o.height=s+"px";o.marginLeft=r+"px";if(q&&a){if(!t){this.galleryView.setVendorPrefixStyle("transition","none")
}this.galleryView.setVendorPrefixStyle("transform","translate3d("+u+"px, 0, 0)")
}else{o.left=u+"px"}AC.Element.setStyle(this.galleryView,o);if(t){AC.Element.addClassName(this.galleryView,"initial-resize")
}},adaptiveResize:function(){AC.Element.removeClassName(this.galleryView,"resize-mask");
AC.Element.removeClassName(this.currentSection,"resize-active");this.galleryView.style.backgroundColor="";
this.currentSection=null;if(this.slideshow){if(this.previouslyPlaying){this.slideshow.play()
}this.previouslyPlaying=null}},adaptiveResizeFluidFigures:function(){}});return c
});AC.define("home/ContinuousSlideGallery",["require","AC/SlideView","home/FluidGallery"],function(m){var j=m("AC/SlideView");
var l=m("home/FluidGallery");var n=AC.Environment.Browser.name;var h=AC.Environment.Browser.version;
var k=n.toLowerCase()==="ie"&&h<9;var i={contentSelector:"#hero-gallery .gallery-content",heroGalleryOptions:{continuous:false,useTouchEvents:true,useKeyboardNav:true,alwaysUseKeyboardNav:true,heightFromFirstSection:false,silentTriggers:true,animationDuration:0.7,shouldAnimateContentChange:false},heroSlideShowOptions:{autoplay:false,delay:7000,stopOnUserInteraction:true},init:function(){this.wrapper=AC.Element.select(".promo-lead");
this.galleryView=AC.Element.select("#hero-gallery");this.navContainer=AC.Element.select(".dot-nav",this.wrapper);
this.updateNav();if(!("ontouchstart" in window)&&!k){this.heroGalleryOptions.continuous=true
}this.galleryContent=AC.Element.selectAll(this.contentSelector);this.heroGallery=this.createHeroGallery(this.galleryContent,this.heroGalleryOptions);
this.heroSlideShow=this.createHeroSlideShow(this.heroSlideShowOptions);this.dotNavUsed=false;
if(!("ontouchstart" in window)){this.minDimensions={width:1280,height:693};this.setupFluidGallery()
}else{AC.Element.addClassName(this.galleryView,"touch")}var a=function(){this.heroGallery.options.shouldAnimateContentChange=true;
this.heroGallery.__storedShouldAnimateContentChange=true}.bind(this);if("ongestureend" in window){window.addEventListener("gestureend",function(){setTimeout(a,1)
})}this.initNav();this.addEvents();this.initTracking();this.heroSlideShow.pause()
},initNav:function(){var a=window.location.href.indexOf("#")>0;var b=this.heroGallery.orderedSections[0];
var c=(a)?this.heroGallery.currentSection.content:b.content;if(c){this.updateNav(c)
}this.heroGallery.options.shouldAnimateContentChange=true},updateNav:function(d){var d=(d)?d:AC.Element.select(".gallery-content",this.galleryView);
var b=d.getAttribute("data-slide-name");var a=AC.Element.select("."+b);var e=AC.Element.select(".promo-lead");
var c=AC.Element.selectAll(".dot-nav a");c.forEach(function(f){AC.Element.removeClassName(f,"active")
});AC.Element.addClassName(a,"active");e.setAttribute("data-active-slide",b)},initTracking:function(){if(typeof AC.ViewMaster.Tracker==="function"){window.tracker=new AC.ViewMaster.Tracker("click")
}},addEvents:function(){AC.Element.addEventListener(window,"load",function(){this.heroSlideShow.start()
}.bind(this))},createHeroGallery:function(b,c){var a=this.galleryView.id;var d=new j(b,a,a,c);
d.setDelegate({willShow:function(e,g,f){this.updateNav(f.content)}.bind(this)});
return d},createHeroSlideShow:function(a){return new AC.ViewMaster.Slideshow(this.heroGallery,null,a)
},setupFluidGallery:function(){var a=[];var b=new l(this.heroGallery,a,1.17,{},this.heroSlideShow,this.minDimensions);
return b}};return i});AC.define("home/analytics/builder",["require"],function(e){var f=function(b){var c=(b.innerText)?b.innerText.trim():b.textContent.trim();
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
}})});