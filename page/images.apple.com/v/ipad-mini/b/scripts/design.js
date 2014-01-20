AC.define("ipad/shared/section_engagement/track_section_engagement",["require"],function(d){var c=Class.create({__defaultOptions:{onlyTrackOnce:true,id:"",minimumDuration:1,threshold:0.75,debug:false,decimals:1},initialize:function(a,b){if(typeof b!=="object"){b={}
}if(typeof this.__defaultOptions!=="object"){this.__defaultOptions={}}this._options=Object.extend(Object.clone(this.__defaultOptions),b);
this._element=AC.Element.getElementById(a);if(this._options.debug===true){AC.Element.setStyle(this._element,{outline:"5px rgba(223,124,60,0.5) dotted"})
}this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:this._options.threshold});
this._showOnScroll.setDelegate(this);Object.synthesize(this)},scrolledIntoViewPastThreshold:function(b,a,g,h){this.__startTime=new Date().getTime()
},scrolledOutOfViewPastThreshold:function(l,b,m,n){var e=Math.pow(10,this._options.decimals);
var k={prop34:(AC.Tracking.pageName()+" - "+this._options.id+" - section engaged"),prop35:(Math.round((new Date().getTime()-this.__startTime)/(1000/e))/e)};
if(k.prop35>=this._options.minimumDuration){if(this._options.onlyTrackOnce===true&&this.__hasTracked===true){return
}AC.Tracking.trackClick(k,this,"o",k.prop34);this.__hasTracked=true;if(this._options.debug){try{console.log(k.prop34+": "+k.prop35+"s")
}catch(a){}AC.Element.setStyle(l,{outline:"5px rgba(93,208,82,.5) dotted"})}}}});
Event.onDOMReady(function(){var a=AC.Element.selectAll("[data-track-visitor-engagement]");
a.each(function(b){var g={};g.id=b.getAttribute("data-track-visitor-engagement");
var h=parseFloat(b.getAttribute("data-track-visitor-engagement-threshold"));if(!isNaN(h)){g.threshold=h
}new c(b,g)})})});AC.define("ipad/shared/experienceReporter/ExperienceObject",["require"],function(e){var d=function(a,b){this._data=a;
this._experience="static";this._enhanceable=false;this._environment=b;this._parseExperienceFromObject();
return this};var f=d.prototype;f.getExperience=function(){return this._experience
};f.isRetina=function(){return("this._experience".split("_")[1]==="2x")};f.canEnhance=function(){return this._enhanceable
};f.applyClassNames=function(c,b){var a=b||"enhance";AC.Element.addClassName(c,a+"-"+this._experience)
};f._parseExperienceFromObject=function(){var a=this._matchExperienceToEnvironment();
["video","video_2x","flow","flow_2x"].forEach(function(b){if(a[b]){this._enhanceable=true;
this._experience=b}}.bind(this))};f._matchExperienceToEnvironment=function(){var a=this._filterByEnvironment();
var b=this._filterBySpecificity(a);return b};f._filterByEnvironment=function(){var a=this._data.filter(function(c){var h;
for(var b in this._environment){h=false;if(this._environment[b]===c[b]||c[b]===""){h=true
}if(h===false){return false}}return true}.bind(this));return a};f._filterBySpecificity=function(a){var b=a;
["platform","os","os_version","browser","browser_version"].forEach(function(c){var h=false;
b.forEach(function(g){if(g[c]!==""){h=true}});if(h===true){b.forEach(function(g,j){if(g[c]===""){b.splice(j,1)
}})}});if(b.length>0){return b[0]}else{return false}};return d});AC.define("ipad/shared/experienceReporter/ExperienceReporter",["require","ipad/shared/experienceReporter/ExperienceObject"],function(f){var j=f("ipad/shared/experienceReporter/ExperienceObject");
var g;var h=function(){if(g){return h.getInstance()}this._environment={};this._initialize()
};h.getInstance=function(){if(!g){g=new h()}return g};var i=h.prototype;i.newExperience=function(a,b){return new j(a,this._environment)
};i.getEnvironment=function(){return this._environment};i._initialize=function(){this._environment.platform=this._checkPlatform();
var a=this._checkOS();this._environment.os=a.os;this._environment.os_version=a.os_version;
var b=this._checkBrowser();this._environment.browser=b.browser;this._environment.browser_version=b.browser_version
};i._checkPlatform=function(){var a;if(AC.Environment.Feature.isDesktop()){if(AC.Environment.Feature.isRetina()){a="desktop_retina"
}else{a="desktop"}}else{if(AC.Environment.Feature.isTablet()){if(AC.Environment.Feature.isRetina()){a="tablet_retina"
}else{a="tablet"}}}return a};i._checkOS=function(){return{os:AC.Environment.Browser.os.toLowerCase(),os_version:parseInt(AC.Environment.Browser.osVersion,10).toString()}
};i._checkBrowser=function(){return{browser:AC.Environment.Browser.name.toLowerCase(),browser_version:parseInt(AC.Environment.Browser.version,10).toString()}
};return h.getInstance()});AC.define("design/application/galleryData",["require"],function(b){return{touch:AC.Environment.Feature.touchAvailable(),galleryName:"detail",mediaPath:"/105/media/us/ipad-mini/2013/178b6825-6025-419f-8f0c-4e9a1c0bab04/design/",imagePath:"/v/ipad-mini/b/images/",maskPath:"/v/ipad/d/images/",timeout:10000,firstElement:"gallery-material",gallery:{imageDuration:0.4,videoDuration:1,heightFromFirstSection:false,useKeyboardNav:true,shouldAnimateFadeIn:false,discontinuousPreviousNext:true,silentTriggers:true,useTouchEvents:false,manageZ:false},slideshow:{autoplay:false,videoDelay:4750,imageDelay:4750,stopOnInteraction:true},showonscroll:{timeInView:0.03,threshold:0.5}}
});AC.define("ipad/shared/cnamer/cnameURL",["require"],function(d){var c=(function(){var a="../../../images.apple.com/global/elements/blank.gif";
return a.replace(/global\/.*/,"")}());return function(a){if(!!a.match(/(^http(s?))/)){return a
}if(!a.match(/(^\/)/)){throw"cnameURL: Expected that URL is root-relative before cnaming. ("+a+")"
}a=c+a.replace(/^\//,"");a=a.replace(/(^.+)(\/105\/)/,"$1/");return a}});AC.define("ipad/shared/gallery/video/DetailGallery",["require","ipad/shared/cnamer/cnameURL"],function(e){var f=e("ipad/shared/cnamer/cnameURL");
function h(a){this.galleryData=a;this.videoElements=AC.Element.selectAll(".detail-gallery-preload");
this.firstVideoID=this.videoElements[0].id;this.detailGalleryWrapper=AC.Element.select("#gallery-detail");
this.detailGalleryObject;this.detailSlideShowObject;this.detailGalleryShowOnScroll;
this.videoCache={};this.imageCache={};this.shouldStart=false;this.canVideoStart=false;
this.canImageStart=false;this.started=false;this._init()}var g=h.prototype;g._init=function(){AC.Element.addClassName(this.detailGalleryWrapper,"video-gallery");
this.detailGalleryObject=this._makeGallery();this.detailGalleryObject.setDelegate({willShow:this._willShow.bind(this)});
this.detailSlideShowObject=this._makeSlideshow();this.detailGalleryShowOnScroll=this._makeShowOnScroll();
this.detailGalleryShowOnScroll.setDelegate({visitorEngaged:this._setVisitorEngaged.bind(this)});
var b=this._videoElementFactory();this.videoCache[this.firstVideoID]=b;var a=this._maskImageFactory();
this.imageCache[this.firstVideoID]=a;this._recursiveBindNextCanPlayThrough(b,0);
this._recursiveBindImageLoad(a,0)};g._makeGallery=function(){return new AC.ViewMaster.Viewer(AC.Element.selectAll(".detail-gallery-content"),"gallery-detail","gallery-detail",{initialId:this._getFirstGalleryFigureId(),animationDuration:this.galleryData.gallery.videoDuration,heightFromFirstSection:this.galleryData.gallery.heightFromFirstSection,useKeyboardNav:this.galleryData.gallery.useKeyboardNav,shouldAnimateFadeIn:this.galleryData.gallery.shouldAnimateFadeIn,discontinuousPreviousNext:this.galleryData.gallery.discontinuousPreviousNext,silentTriggers:this.galleryData.gallery.silentTriggers,useTouchEvents:this.galleryData.gallery.useTouchEvents,manageZ:this.galleryData.gallery.manageZ})
};g._makeSlideshow=function(){return new AC.ViewMaster.Slideshow(this.detailGalleryObject,null,{autoplay:this.galleryData.slideshow.autoplay,delay:this.galleryData.slideshow.videoDelay,stopOnUserInteraction:this.galleryData.slideshow.stopOnInteraction})
};g._makeShowOnScroll=function(){return new AC.ShowOnScroll(this.detailGalleryWrapper,{timeInView:this.galleryData.showonscroll.timeInView,threshold:this.galleryData.showonscroll.threshold})
};g._getFirstGalleryFigureId=function(){return AC.Element.selectAll("figure",this.detailGalleryWrapper)[0].id
};g._willShow=function(u,b,c,v,a,q){var s=c.content.getElementsByClassName("gallery-asset")[0];
var t=this.videoCache[this.galleryData.galleryName+s.id.substr(7)];var d=AC.Element.select(".slide-video",c.content);
var r=this.galleryData.galleryName+s.id.substr(7);var p=AC.Element.select(".slide-mask",c.content);
if(!d){AC.Element.insert(t,s)}if(!p){AC.Element.insert(this.imageCache[r],s)}t.currentTime=0;
t.play()};g._setVisitorEngaged=function(){this.shouldStart=true;this._startPlaybackIfPossible()
};g._recursiveBindNextCanPlayThrough=function(a,b){var c=b+1;if(typeof this.videoElements[c]!=="undefined"){AC.Element.addEventListener(a,"canplaythrough",this._videoCanPlayThrough.bind(this,b))
}else{AC.Element.addEventListener(a,"canplaythrough",this._videosFinishedCallback.bind(this))
}a.setAttribute("src",this._getVideoPath(b));a.load();if(b===0){AC.Element.insert(this.videoCache[this.firstVideoID],AC.Element.getElementById("gallery-"+this.firstVideoID.substr(7)))
}};g._videosFinishedCallback=function(){};g._videoCanPlayThrough=function(a){var c=a+1;
var b=this._videoElementFactory();this.canVideoStart=true;this.detailGalleryShowOnScroll.delegate.canVideoStart=this.canVideoStart;
this._startPlaybackIfPossible();this.videoCache[this.videoElements[c].id]=b;this._recursiveBindNextCanPlayThrough(b,a+1)
};g._startPlaybackIfPossible=function(){if(!this.started&&this.canVideoStart&&this.canImageStart&&this.shouldStart){this.detailSlideShowObject.start();
this.videoCache[this.firstVideoID].play();this.started=true}};g._videoElementFactory=function(){var a=document.createElement("video");
a.setAttribute("preload","auto");a.setAttribute("class","slide-video");return a
};g._getVideoPath=function(a){var c="m";var b=this.galleryData.mediaPath+"videos/"+this.videoElements[a].id+(this.galleryData.isRetina?"_2x":"")+"."+c+"p4";
return f(b)};g._recursiveBindImageLoad=function(a,b){var c=b+1;if(typeof this.videoElements[c]!=="undefined"){AC.Element.addEventListener(a,"load",this._imageLoaded.bind(this,b))
}else{AC.Element.addEventListener(a,"load",this._imagesFinishedCallback.bind(this))
}a.setAttribute("src",this._getMaskImagePath(b))};g._imagesFinishedCallback=function(){var a=document.getElementsByClassName("gallery-asset")[0];
var b=this.galleryData.galleryName+a.id.substr(7);AC.Element.insert(this.imageCache[b],a);
this.detailGalleryShowOnScroll.delegate.canImageStart=this.canImageStart;this.canImageStart=true
};g._imageLoaded=function(b){var c=b+1;var a=this._maskImageFactory();this.imageCache[this.videoElements[c].id]=a;
this._recursiveBindImageLoad(a,b+1);this._startPlaybackIfPossible()};g._maskImageFactory=function(){var a=document.createElement("img");
a.setAttribute("class","slide-mask");return a};g._getMaskImagePath=function(b){var a="p";
var c=this.galleryData.maskPath+"gallery_"+this.videoElements[b].id.replace(/-/g,"_")+"_mask."+a+"ng";
return f(c)};g.fallBack=function(){};return h});AC.define("ipad/shared/gallery/image/DetailGallery",["require"],function(e){function d(a){this.galleryData=a;
this.imageElements=AC.Element.selectAll(".detail-gallery-preload");this.detailGalleryWrapper=AC.Element.select("#gallery-detail");
this.detailGalleryShowOnScroll;this.detailGalleryObject;this.detailSlideShowObject;
this.detailGalleryShowOnScroll;this.shouldStart=false;this.started=false;this._init()
}var f=d.prototype;f._init=function(){this.detailGalleryObject=this._makeGallery();
this.detailSlideShowObject=this._makeSlideshow();if(!this.galleryData.touch){this.detailGalleryShowOnScroll=this._makeShowOnScroll();
this.detailGalleryShowOnScroll.setDelegate({visitorEngaged:this._setVisitorEngaged.bind(this)})
}this._startPlaybackIfPossible()};f._makeGallery=function(){var a=this.galleryData.touch?AC.ViewMaster.SlideViewer:AC.ViewMaster.Viewer;
return new a(AC.Element.selectAll(".detail-gallery-content"),"gallery-detail","gallery-detail",{initialId:this._getFirstGalleryFigureId(),animationDuration:this.galleryData.touch?this.galleryData.gallery.imageDuration:this.galleryData.gallery.videoDuration,heightFromFirstSection:this.galleryData.gallery.heightFromFirstSection,useKeyboardNav:this.galleryData.gallery.useKeyboardNav,shouldAnimateFadeIn:this.galleryData.gallery.shouldAnimateFadeIn,discontinuousPreviousNext:this.galleryData.gallery.discontinuousPreviousNext,silentTriggers:this.galleryData.gallery.silentTriggers,useTouchEvents:true,manageZ:this.galleryData.gallery.manageZ})
};f._makeSlideshow=function(){return new AC.ViewMaster.Slideshow(this.detailGalleryObject,null,{autoplay:this.galleryData.slideshow.autoplay,delay:this.galleryData.slideshow.imageDelay,stopOnUserInteraction:this.galleryData.slideshow.stopOnInteraction})
};f._makeShowOnScroll=function(){return new AC.ShowOnScroll(this.detailGalleryWrapper,{timeInView:this.galleryData.showonscroll.timeInView,threshold:this.galleryData.showonscroll.threshold})
};f._getFirstGalleryFigureId=function(){return AC.Element.selectAll("figure",this.detailGalleryWrapper)[0].id
};f._setVisitorEngaged=function(){this.shouldStart=true;this._startPlaybackIfPossible()
};f._startPlaybackIfPossible=function(){if(!this.galleryData.touch&&!this.started&&this.shouldStart){this.detailSlideShowObject.start();
this.started=true}};return d});AC.define("ipad/shared/gallery/GalleryController",["require","design/application/galleryData","ipad/shared/gallery/video/DetailGallery","ipad/shared/gallery/image/DetailGallery"],function(l){var h=l("design/application/galleryData");
var g=l("ipad/shared/gallery/video/DetailGallery");var i=l("ipad/shared/gallery/image/DetailGallery");
function j(a){this.canPlayVideo;this.gallery;this.galleryData;this.fallback;this.experience=a;
this._init()}var k=j.prototype;k._init=function(){if(this.experience.platform){if(this.experience.platform.indexOf("desktop")>-1&&!(this.experience.browser==="ie"&&this.experience.browser_version<9)&&this.experience.browser!=="firefox"){this.canPlayVideo=true
}}this._loadGallery()};k._loadGallery=function(){this.galleryData=h;this.galleryData.isRetina=AC.Environment.Feature.isRetina();
this.fallback=i;if(this.canPlayVideo){this.gallery=g}else{this.gallery=i}};return j
});AC.define("design/bootstrap",["require","ipad/shared/section_engagement/track_section_engagement","ipad/shared/experienceReporter/ExperienceReporter","ipad/shared/gallery/GalleryController"],function(g){DEBUG=false;
g("ipad/shared/section_engagement/track_section_engagement");var i=g("ipad/shared/experienceReporter/ExperienceReporter");
var h=g("ipad/shared/gallery/GalleryController");var f=i.getEnvironment();var j=new h(f);
AC.onDOMReady(function(){var a=new j.gallery(j.galleryData)})});