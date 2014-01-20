AC.define("AC/SlideView",["require"],function(a){return AC.ViewMaster.SlideViewer
});AC.define("home/FluidGallery",["require"],function(a){var b=AC.Class({initialize:function(c,g,h,d,f,e){this.__defaultOptions={resizeDelay:0.75,debug:false};
this.gallery=c;this.slideshow=f;this.id=c.triggerClassName;this.galleryView=c.view.view();
this.fluidFigures=g;this.previouslyPlaying=null;this.resizing=false;this.minDimensions=e;
this.currentSection=null;this.aspectRatio=h;this.footerHeight=0;if(typeof d!=="object"){d={}
}this.options=Object.extend(Object.clone(this.__defaultOptions),d);this.__setupHandlers();
this.responsiveResize(true);this.adaptiveResize()},__setupHandlers:function(){Event.observe(window,"resize",this.__didResizeWindow.bindAsEventListener(this))
},__didResizeWindow:function(c){if(this.slideshow){if(this.previouslyPlaying===null){this.previouslyPlaying=this.slideshow._playing;
this.slideshow.pause()}}this.responsiveResize(false);this.__startResizeTimer()},__startResizeTimer:function(){this.__cancelResizeTimer();
if(typeof this.__boundAdaptiveResize==="undefined"){this.__boundAdaptiveResize=this.adaptiveResize.bind(this)
}this.__resizeAssetsFlag=setTimeout(this.__boundAdaptiveResize,(this.options.resizeDelay*1000))
},__cancelResizeTimer:function(){if(typeof this.__resizeAssetsFlag!=="undefined"){clearTimeout(this.__resizeAssetsFlag);
delete this.__resizeAssetsFlag}},getBoundingDimensions:function(c,e){var d=Math.max(Math.max(e,this.minDimensions.height)-this.footerHeight,0);
return{width:d*this.aspectRatio,height:d}},getCurrentFigureID:function(){return this.gallery.currentSection.id
},__getFigureIndex:function(d){for(var c=this.fluidFigures.length-1;c>=0;c--){if(this.fluidFigures[c].figure.id===d){return c
}}return 0},__getSectionIndex:function(d){for(var c=this.gallery.orderedSections.length-1;
c>=0;c--){if(this.gallery.orderedSections[c]===d){return c}}return 0},responsiveResize:function(c){if(this.currentSection===null){this.currentSection=this.gallery.currentSection.content;
AC.Element.addClassName(this.galleryView,"resize-mask");AC.Element.addClassName(this.currentSection,"resize-active");
this.galleryView.style.backgroundColor=AC.Element.getStyle(this.currentSection,"background-color")
}this.viewportSize=document.viewport.getDimensions();this.boundedDimensions=this.getBoundingDimensions(this.viewportSize.width,this.viewportSize.height);
this.responsiveResizeFluidFigures();this.responsiveResizeGallery(c)},responsiveResizeFluidFigures:function(){for(var c=this.fluidFigures.length-1;
c>=0;c--){AC.Element.setStyle(this.fluidFigures[c].figure,{width:this.viewportSize.width+"px",height:this.boundedDimensions.height+"px"});
this.fluidFigures[c].resize(this.boundedDimensions)}},responsiveResizeGallery:function(e){var j={};
var h=AC.Detector.isCSSAvailable("transition");var m=AC.Detector.isCSSAvailable("transform");
var c=this.gallery.orderedSections.length;var k=this.viewportSize.width*c;var f=this.boundedDimensions.height;
var i=this.__getSectionIndex(this.getCurrentFigureID());var l=Math.max(this.viewportSize.width,this.minDimensions.width);
var d=-1*i*l;var g=0;if(this.gallery.options.useTouchEvents===true&&typeof window.ontouchstart!=="undefined"){this.gallery.__maskWidth=this.gallery.__mask.getWidth()
}if(this.viewportSize.width<this.minDimensions.width){g=-((this.minDimensions.width-this.viewportSize.width)/2)
}j.width=k+"px";j.height=f+"px";j.marginLeft=g+"px";if(h&&m){if(!e){this.galleryView.setVendorPrefixStyle("transition","none")
}this.galleryView.setVendorPrefixStyle("transform","translate3d("+d+"px, 0, 0)")
}else{j.left=d+"px"}AC.Element.setStyle(this.galleryView,j);if(e){AC.Element.addClassName(this.galleryView,"initial-resize")
}},adaptiveResize:function(){AC.Element.removeClassName(this.galleryView,"resize-mask");
AC.Element.removeClassName(this.currentSection,"resize-active");this.galleryView.style.backgroundColor="";
this.currentSection=null;if(this.slideshow){if(this.previouslyPlaying){this.slideshow.play()
}this.previouslyPlaying=null}},adaptiveResizeFluidFigures:function(){}});return b
});AC.define("home/ContinuousSlideGallery",["require","AC/SlideView","home/FluidGallery"],function(b){var f=b("AC/SlideView");
var i=b("home/FluidGallery");var h=AC.Storage.getItem;var d=AC.Storage.setItem;
var c=AC.Environment.Browser.name;var g=AC.Environment.Browser.version;var e=c.toLowerCase()==="ie"&&g<9;
var a={colors:["blue","yellow","pink","green","white"],colorIndexKey:"home-gallery-colors-20130827",skinAttribute:"data-skin",contentSelector:"#hero-gallery .gallery-content",colorSlidesClassName:"gallery-5c",heroGalleryOptions:{continuous:false,useTouchEvents:true,useKeyboardNav:true,alwaysUseKeyboardNav:true,heightFromFirstSection:false,silentTriggers:true,animationDuration:0.7,shouldAnimateContentChange:false},heroSlideShowOptions:{autoplay:false,delay:7000,stopOnUserInteraction:true},init:function(){this.wrapper=AC.Element.select(".promo-lead");
this.galleryView=AC.Element.select("#hero-gallery");this.navContainer=AC.Element.select(".dot-nav",this.wrapper);
if(!("ontouchstart" in window)&&!e){this.setupContinuousSlider()}this.addFullSpans();
this.colorSlides=AC.Element.selectAll("."+this.colorSlidesClassName);this.galleryContent=AC.Element.selectAll(this.contentSelector);
this.heroGallery=this.createHeroGallery(this.galleryContent,this.heroGalleryOptions);
this.heroSlideShow=this.createHeroSlideShow(this.heroSlideShowOptions);this.dotNavUsed=false;
if(!("ontouchstart" in window)){this.minDimensions={width:1280,height:652};this.setupFluidGallery()
}else{AC.Element.addClassName(this.galleryView,"touch")}var j=function(){this.heroGallery.options.shouldAnimateContentChange=true;
this.heroGallery.__storedShouldAnimateContentChange=true}.bind(this);if("ongestureend" in window){window.addEventListener("gestureend",function(){setTimeout(j,1)
})}this.initNav();this.addEvents();this.initColors();this.initTracking();this.heroSlideShow.pause()
},addFullSpans:function(){var j=AC.Element.selectAll(".gallery-content");j.forEach(function(n){var m=AC.Element.select("h1 img",n);
var o=AC.Element.select("a.block",n);var l=o.getAttribute("href");var k=document.createElement("a");
k.className="full-span";k.setAttribute("href",l);k.innerHTML=m.getAttribute("alt");
n.appendChild(k)})},setupContinuousSlider:function(){var j=AC.Element.select(".gallery-content",this.galleryView);
this.duplicateContentNodes();AC.Element.addClassName(this.wrapper,"continuous");
this.modifyDotNav();this.updateNav(j);this.heroGalleryOptions.continuous=true},modifyDotNav:function(){var k=AC.Element.selectAll("a",this.navContainer);
var l=k[0];var j=k[1];l.setAttribute("data-target","#previous");j.setAttribute("data-target","#next");
[].forEach.call(k,this.interceptClick.bind(this));this.modifiedDotNav=true},interceptClick:function(j){AC.Element.addEventListener(j,"click",function(n){var m=AC.Event.target(n);
var o=m.getAttribute("data-target");var l=m.getAttribute("data-target").replace("#","");
var k=AC.Element.select('a[href="'+o+'"]',this.wrapper);AC.Event.stop(n);if(l==="next"){this.heroGallery.showNext()
}else{if(l==="previous"){this.heroGallery.showPrevious()}}}.bind(this))},duplicateContentNodes:function(){var j=AC.Element.selectAll(this.contentSelector);
[].forEach.call(j,function(k){var l=k.cloneNode(true);AC.Element.addClassName(l,"duplicate");
l.id+="-duplicate";this.galleryView.appendChild(l)}.bind(this))},initNav:function(){var l=window.location.href.indexOf("#")>0;
var k=this.heroGallery.orderedSections[0];var j=(l)?this.heroGallery.currentSection.content:k.content;
if(j){this.updateNav(j)}this.heroGallery.options.shouldAnimateContentChange=true
},updateNav:function(j){var l=AC.Element.selectAll("a",this.navContainer);var k=j.id.replace("MASKED-","").replace("-duplicate","");
if(!this.modifiedDotNav){return}[].forEach.call(l,function(m){var o=m.getAttribute("href");
var n=o.replace("#","");if(j.className.indexOf(n)!=-1){AC.Element.addClassName(m,"active")
}else{AC.Element.removeClassName(m,"active")}}.bind(this))},initColors:function(){var k=AC.Storage.getItem(this.colorIndexKey)||0;
var j=k%this.colors.length;this.setColor(this.colors[j]);AC.Storage.setItem(this.colorIndexKey,j+1)
},initTracking:function(){if(typeof AC.ViewMaster.Tracker==="function"){window.tracker=new AC.ViewMaster.Tracker("click")
}},addEvents:function(){AC.Element.addEventListener(window,"load",function(){this.heroSlideShow.start()
}.bind(this))},setColor:function(j){[].forEach.call(this.colorSlides,function(k){[].forEach.call(this.colors,function(l){AC.Element.removeClassName(k,l)
});AC.Element.addClassName(k,j)}.bind(this))},swapColors:function(){var j;var k=AC.Storage.getItem(this.colorIndexKey);
j=k%this.colors.length;this.setColor(this.colors[j]);AC.Storage.setItem(this.colorIndexKey,k+1)
},createHeroGallery:function(l,k){var m=this.galleryView.id;var j=new f(l,m,m,k);
j.setDelegate({didShow:function(o,p,n){var q=AC.Element.hasClassName;if(p&&p.content&&q(p.content,this.colorSlidesClassName)){this.swapColors()
}}.bind(this),willShow:function(o,p,n){this.updateNav(n.content)}.bind(this)});
return j},createHeroSlideShow:function(j){return new AC.ViewMaster.Slideshow(this.heroGallery,null,j)
},setupFluidGallery:function(){var k=[];var j=new i(this.heroGallery,k,1.17,{},this.heroSlideShow,this.minDimensions);
return j}};return a});AC.define("home/analytics/builder",["require"],function(a){var c=function(f){var e=(f.innerText)?f.innerText.trim():f.textContent.trim();
var d=AC.Element.select("img",f);var g=f.href.replace(new RegExp("^"+window.location.protocol+"//"),"").replace(new RegExp("^"+window.location.host+"/"),"").replace(/\/$/,"");
if(e!==""){return e}if(d){e=d.getAttribute("alt");if(e!==""){return e}d=d.getAttribute("src");
if(d){return d.substring(d.lastIndexOf("../../index.html")+1,d.length)}}return g};var b=function(d){var f=AC.Event.target(d);
var g=false;var e;while(f&&f.parentNode&&f.tagName&&f.tagName.toLowerCase()!=="a"){f=f.parentNode
}if(!f){return}g=c(f);if(g&&g!==""){e={prop3:("h@"+g+" - "+AC.Tracking.pageName()).toLowerCase()};
AC.Tracking.trackClick(e,this,"o",e.prop3)}};return function(h,f){var e=AC.Element.selectAll("#showcase .promo-lead .gallery-content a[href]");
var g,d;for(g=0,d=e.length;g<d;g+=1){AC.Element.addEventListener(e[g],"mousedown",b)
}}});AC.define("home/IEClickBooster",["require"],function(a){return function(b){var c=AC.Element.selectAll(b);
var d=document.createElement("b");if(!c||!c.length){return}d.className="clickbooster";
c.forEach(function(e){e.appendChild(d.cloneNode())})}});AC.define("home/bootstrap",["require","home/ContinuousSlideGallery","home/analytics/builder","home/IEClickBooster"],function(c){var d=c("home/ContinuousSlideGallery");
var b=c("home/analytics/builder");var a=c("home/IEClickBooster");AC.onDOMReady(function(){AC.ViewMaster.SlideViewer.prototype.__touchLoadEventDependencies=function(){if(typeof Element.trackTouches==="function"){this.__touchInitTrackTouches()
}else{this.__boundTouchInitTrackTouches=this.__touchInitTrackTouches.bindAsEventListener(this);
document.observe("ac:trackTouches:load",this.__boundTouchInitTrackTouches)}};d.init();
if(AC.Environment.Browser.name=="IE"&&AC.Environment.Browser.version<=7){a("a.block .column")
}b()})});