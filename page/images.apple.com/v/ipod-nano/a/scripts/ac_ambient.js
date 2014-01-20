if(typeof AC==="undefined"){AC={}}AC.Ambient={};AC.Ambient.Content=Class.create({initialize:function(d,e){this.__mergeOptions(e);
this._element=$(d);this._delegate={};this._degraded=false;this._hasShown=false;
if(typeof this._element==="undefined"||this._element===null){try{console.error("Ambient container is undefined or missing")
}catch(f){}return}Object.synthesize(this)},setDelegate:function(b){if(typeof b==="object"){this._delegate=b
}if(typeof this._delegate.onSetDelegate==="function"){this._delegate.onSetDelegate(this)
}Object.synthesize(this)},__mixin:function(d){if(AC.Ambient.Content.Mixins.hasOwnProperty(d)){if(typeof AC.Ambient.Content.Mixins[d].parent==="string"){this.__mixin(AC.Ambient.Content.Mixins[d].parent)
}var f=Object.clone(AC.Ambient.Content.Mixins[d]);delete f.parent;if(typeof f.setupMixin==="function"){var e=f.setupMixin.bind(this);
delete f.setupMixin}Object.extend(this,f);if(typeof e==="function"){e(this)}Object.synthesize(this)
}},__mergeOptions:function(b){if(typeof b!=="object"){b={}}if(typeof this.__defaultOptions!=="object"){this.__defaultOptions={}
}this._options=Object.extend(Object.clone(this.__defaultOptions),b);return this._options
}});AC.Ambient.Content.Mixins={Video:{Source:Class.create({initialize:function(c,d){this._src=c;
this._type=d;Object.synthesize(this)}}),setupMixin:function(){if(typeof this._element==="undefined"||this._element===null){return this._video=null
}this._video=this._element.down("video");if(typeof this._video==="undefined"){var d=this._element.down(".ambientVideo");
if(typeof d!=="undefined"){this._video=this.__generateVideo(d);if(this.canPlayVideo()){d.replace(this._video)
}else{this._video=d}this.fallback(d)}}if(typeof this._video==="undefined"){return this._video=null
}if(this._options.muteVideos!==false){this._video.muted=true}var c=this.__videoEventResponder.bindAsEventListener(this);
Event.observe(this._video,"loadstart",c);Event.observe(this._video,"canplay",c);
Event.observe(this._video,"canplaythrough",c);Event.observe(this._video,"play",c);
Event.observe(this._video,"timeupdate",c);Event.observe(this._video,"ended",c);
AC.Ambient.VideoController.sharedInstance.register(this)},sources:function(){if(typeof this._sources!=="undefined"){return this._sources
}this._sources=[];var f=this._video.getAttribute("src");if(f){this._sources.push(new this.Source(f))
}var e=this._video.getElementsByTagName("source");if(e.length>0){for(var d=0;d<e.length;
d+=1){this._sources.push(new this.Source(e[d].getAttribute("src"),e[d].getAttribute("type")))
}}return this._sources},posterframe:function(){if(typeof this._posterframe!=="undefined"){return this._posterframe
}return this._posterframe=(this._video===null)?null:this._video.getAttribute("poster")
},fallback:function(f){if(typeof this._fallback!=="undefined"){return this._fallback
}if(typeof f===undefined){f=this._element}this._fallback=null;var e;if((typeof f!=="undefined"&&f!==null)&&(e=f.down(".ambientDegradation"))){return this._fallback=e
}else{var d;if((this._video!==null)&&(d=this._video.down(".fallback"))){this._fallback=d.getAttribute("src")
}if(!this._fallback&&this.posterframe()){return this._fallback=this.posterframe()
}}return this._fallback},canPlayVideo:function(){if(this._degraded===true||this._video===null){return this._canPlayVideo=false
}if(typeof this._canPlayVideo!=="undefined"){return this._canPlayVideo}if((AC.Detector.isiPad()||AC.Detector.isMobile())||(this.bestSource()===null)){return this._canPlayVideo=false
}return this._canPlayVideo=true},bestSource:function(){if(typeof this._bestSource!=="undefined"){return this._bestSource
}var d=this.sources();for(var c=0;c<d.length;c++){if(("type" in d[c]&&typeof d[c].type()!=="undefined")&&("canPlayType" in this._video&&this._video.canPlayType(d[c].type()))){return this._bestSource=d[c].src()
}}return this._bestSource=null},buffer:function(){if(!!this._video&&this.canPlayVideo()){var d=this._video;
window.setTimeout(function(){d.play()},0);var c=function(a){a.target.pause();d.stopObserving("play",c)
};d.observe("play",c)}},play:function(){if(!!this._video&&this.canPlayVideo()){var b=this._video;
window.setTimeout(function(){b.play()},0);Event.fire(this._video,"video:startedPlaying")
}},pause:function(){if(!!this._video){this._video.pause();Event.fire(this._video,"video:stoppedPlaying")
}},stop:function(){if(!!this._video){this.pause();this._video.currentTime=0}},degrade:function(){if(this._degraded===true||this.fallback()===null||this.fallback()===""){return
}var b=this.fallback();if(typeof b==="string"){b=new Element("img");b.width=this._video.getWidth();
b.height=this._video.getHeight();b.src=this.fallback()}if(this._video===null){this._element.appendChild(b)
}else{if(this._video.parentNode){Element.replace(this._video,b)}}this._degraded=true;
Event.fire(this._video,"video:stoppedPlaying")},seek:function(d,f){if("currentTime" in this._video&&typeof d==="number"){if(f!==true){this._video.pause();
Event.fire(this._video,"video:stoppedPlaying")}if("buffered" in this._video&&d<=this._video.buffered.length){try{this._video.currentTime=d
}catch(e){}}}},showFirstFrame:function(){this.seek(0)},showLastFrame:function(){if("duration" in this._video&&"buffered" in this._video&&this._video.duration<=this._video.buffered.length){this.seek(this._video.duration)
}},__generateVideo:function(e){if(typeof e==="object"&&Object.isElement(e)){var g=this.__generateElement(e,"video");
var h=$A(e.getElementsByClassName("ambientVideoSource"));var f=function(a){g.appendChild(this.__generateElement(a,"source"))
}.bind(this);h.each(f);return g}},__generateElement:function(e,h){if(typeof e==="object"&&Object.isElement(e)){var g=new Element(h);
var f=$A(e.attributes);f.each(function(a){var b=a.name;if(b==="data-autoplay"||b==="data-buffered"||b==="data-controls"||b==="data-height"||b==="data-loop"||b==="data-muted"||b==="data-preload"||b==="data-poster"||b==="data-src"||b==="data-type"||b==="data-width"){b=b.replace("data-","")
}g.setAttribute(b,a.value)});return g}},__videoEventResponder:function(d){switch(d.type){case"loadstart":if(this._video.preload!=="none"){if(typeof this._delegate.onVideoLoad==="function"){this._delegate.onVideoLoad(this,d.target)
}if(this._options.shouldNotTrackVideoLoad!==true){this.trackVideo({prop13:"v@l"})
}}break;case"canplay":if(typeof this._delegate.onVideoCanPlay==="function"){this._delegate.onVideoCanPlay(this,d.target)
}if(this.__isTryingToPlay){if(typeof this._delegate.onVideoStart==="function"){this._delegate.onVideoStart(this,d.target)
}var c={prop13:"v@s"};if(typeof this.__analyticsLoadStartedTime!=="undefined"){c.prop30=(Math.round((new Date()-(this.__analyticsLoadStartedTime||0))/10)/10).toString();
delete this.__analyticsLoadStartedTime}if(this._options.shouldNotTrackVideoStart!==true){this.trackVideo(c)
}}break;case"canplaythrough":if(typeof this._delegate.onVideoCanPlayThrough==="function"){this._delegate.onVideoCanPlayThrough(this,d.target)
}break;case"timeupdate":if(typeof this._delegate.onVideoTimeUpdate==="function"){this._delegate.onVideoTimeUpdate(this,d.target,d.target.currentTime)
}break;case"play":this.__isTryingToPlay=true;if(this._video.preload==="none"&&typeof this._hasStartedLoading==="undefined"){if(typeof this._delegate.onVideoLoad==="function"){this._delegate.onVideoLoad(this,d.target)
}if(this._options.shouldNotTrackVideoLoad!==true){this.trackVideo({prop13:"v@l"})
}this._hasStartedLoading=true}break;case"ended":if(typeof this._delegate.onVideoEnd==="function"){this._delegate.onVideoEnd(this,d.target)
}Event.fire(this._video,"video:stoppedPlaying");if(this._options.shouldNotTrackVideoEnd!==true){this.trackVideo({prop13:"v@e"})
}break}},trackVideo:function(d){if(typeof this.__analytics==="undefined"){this.__analytics={};
this.__analytics.pageName=AC.Tracking.pageName()}if(d.prop13==="v@l"){this.__analyticsLoadStartedTime=new Date()
}if(typeof this.__analyticsSectionName==="undefined"){this.__analyticsSectionName=this._element.getAttribute("id");
if(this.__analyticsSectionName===null){var e=this._video.up("[id]");if(e===null){this.__analyticsSectionName="";
try{console.warn("No section name to track this video!")}catch(f){}}else{this.__analyticsSectionName=e.getAttribute("id")
}}this.__analyticsSectionName=this.__analyticsSectionName.replace(/masked-/i,"")
}Object.extend(d,this.__analytics);d.prop13+=": "+d.pageName+" - "+this.__analyticsSectionName;
AC.Tracking.trackClick(d,this,"o",d.pageName+" - video-hero")}}};AC.Ambient.VideoController=Class.create({initialize:function(){this._registry=$A();
Object.synthesize(this)},register:function(b){this._registry.push(b)},getVideosUnderElement:function(e,g){var f=$A(e.getElementsByTagName("video"));
var h=[];if(f.length>0){this._registry.each(function(b){for(var a=0;a<f.length;
a++){if(b.video()===f[a]){if(typeof g==="function"){g(b)}else{if(typeof g==="string"&&typeof b[g]==="function"){b[g]()
}}h.push(b);f=f.without(f[a]);a=f.length}}})}return h},degradeVideosUnderElement:function(b){this.getVideosUnderElement(b,"degrade")
},playVideosUnderElement:function(b){this.getVideosUnderElement(b,"play")},stopVideosUnderElement:function(b){this.getVideosUnderElement(b,"stop")
},showFirstFrameOnVideosUnderElement:function(b){this.getVideosUnderElement(b,"showFirstFrame")
},showLastFrameOnVideosUnderElement:function(b){this.getVideosUnderElement(b,"showLastFrame")
}});AC.Ambient.VideoController.sharedInstance=new AC.Ambient.VideoController();
AC.Ambient.Content.Video=Class.create(AC.Ambient.Content,{initialize:function($super,c,d){$super(c,d);
this.__mixin("Video")}});AC.Ambient.Content.Scroll=Class.create(AC.Ambient.Content,{__defaultOptions:{showOnScrollOptions:{}},initialize:function($super,c,d){$super(c,d);
this.__createShowOnScroll();Object.synthesize(this)},__createShowOnScroll:function(){this._showOnScroll=new AC.ShowOnScroll(this._element,this._options.showOnScrollOptions);
this._showOnScroll.setDelegate(this)},scrolledIntoView:function(b){if(typeof this._delegate.onBecomesVisible==="function"){this._delegate.onBecomesVisible(this)
}},scrolledOutOfView:function(b){if(typeof this._delegate.onBecomesNotVisible==="function"){this._delegate.onBecomesNotVisible(this)
}},scrolledIntoViewCompletely:function(d,c){if(typeof this._delegate.onBecomesVisibleCompletely==="function"){this._delegate.onBecomesVisibleCompletely(this,c)
}},scrolledOutOfViewCompletely:function(d,c){if(typeof this._delegate.onBecomesNotVisibleCompletely==="function"){this._delegate.onBecomesNotVisibleCompletely(this,c)
}}});AC.Ambient.Content.Scroll.Video=Class.create(AC.Ambient.Content.Scroll,{initialize:function($super,c,d){$super(c,d);
this.__mixin("Video")}});AC.Ambient.Content.Scroll.WithThreshold=Class.create(AC.Ambient.Content.Scroll,{scrolledIntoViewPastThreshold:function(h,g,e,f){if(typeof this._delegate.onBecomesVisiblePastThreshold==="function"){this._delegate.onBecomesVisiblePastThreshold(this,g,e,f)
}},scrolledOutOfViewPastThreshold:function(h,g,e,f){if(typeof this._delegate.onBecomesNotVisiblePastThreshold==="function"){this._delegate.onBecomesNotVisiblePastThreshold(this,g,e,f)
}}});AC.Ambient.Content.Scroll.WithThreshold.Video=Class.create(AC.Ambient.Content.Scroll.WithThreshold,{initialize:function($super,c,d){$super(c,d);
this.__mixin("Video")}});AC.Ambient.Content.Scroll.WithThreshold.AndTimer=Class.create(AC.Ambient.Content.Scroll.WithThreshold,{visitorEngaged:function(h,g,e,f){if(typeof this._delegate.onVisitorEngaged==="function"){this._delegate.onVisitorEngaged(this,g,e,f)
}}});AC.Ambient.Content.Scroll.WithThreshold.AndTimer.Video=Class.create(AC.Ambient.Content.Scroll.WithThreshold.AndTimer,{initialize:function($super,c,d){$super(c,d);
this.__mixin("Video")}});AC.Ambient.Content.Scroll.WithTracking=Class.create(AC.Ambient.Content.Scroll,{scrolledWhileInView:function(d,f,e){if(typeof this._delegate.onScroll==="function"){this._delegate.onScroll(this,f,e)
}}});AC.Ambient.Content.Scroll.WithTracking.Video=Class.create(AC.Ambient.Content.Scroll.WithTracking,{initialize:function($super,c,d){$super(c,d);
this.__mixin("Video")}});