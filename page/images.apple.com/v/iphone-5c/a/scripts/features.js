(function(){var d={_showOnScrolls:[],__onScroll:function k(q){this._showOnScrolls.forEach(function(r){r.__onScroll(q)
})},add:function f(r,q){this._showOnScrolls.push(r);if(!this.__boundOnScroll){this.__boundOnScroll=this.__onScroll.bind(this);
AC.Element.addEventListener(q,"scroll",this.__boundOnScroll)}}};AC.ShowOnScroll=AC.Class();
AC.ShowOnScroll.prototype={__defaultOptions:{threshold:0.5,timeInView:1,scrollEndDelay:0.4},initialize:function b(r,q){if(typeof q!=="object"){q={}
}this._options=AC.Object.extend(AC.Object.clone(this.__defaultOptions),q);if(AC.Environment.Browser.os==="iOS"){this._options.scrollEndDelay=0
}this._element=AC.Element.getElementById(r);this._delegate={};this._scrollTarget=q.scrollTarget||window;
if(!this._element){throw"AC.ShowOnScroll: Invalid target element - expected Element or (string) element ID"
}if(q.shouldObserve!==false){this.startObserving()}AC.Object.synthesize(this)},startObserving:function n(){if(typeof this.__boundOnScroll==="undefined"){this.__boundOnScroll=AC.Function.bindAsEventListener(this.__onScroll,this)
}if(typeof this.__boundRefreshMetrics==="undefined"){this.__boundRefreshMetrics=AC.Function.bindAsEventListener(this.refreshMetrics,this)
}if(typeof this.__boundWindowLoad==="undefined"){this.__boundWindowLoad=AC.Function.bindAsEventListener(this.__onWindowLoad,this)
}if(this._isObserving!==true){d.add(this,this._scrollTarget);AC.Element.addEventListener(window,"load",this.__boundWindowLoad);
AC.Element.addEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.addEventListener(window,"orientationchange",this.__boundRefreshMetrics);
this._isObserving=true}},stopObserving:function g(){if(this._isObserving===true){AC.Element.removeEventListener(this._scrollTarget,"scroll",this.__boundOnScroll);
AC.Element.removeEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.removeEventListener(window,"orientationchange",this.__boundRefreshMetrics);
this._isObserving=false}},setDelegate:function m(q){if(typeof q==="object"){this._delegate=q
}},refreshMetrics:function i(){delete this._viewportMetrics;delete this._elementMetrics;
this._viewportMetrics=this.viewportMetrics();this._elementMetrics=this.elementMetrics()
},isInView:function l(q){if(typeof q==="undefined"){q=this.pixelsInView()}return(q>0)
},isEnoughInView:function c(q){if(typeof q==="undefined"){q=this.percentInView()
}return(q===0)?false:(q>=this._options.threshold)},viewportMetrics:function p(){if(typeof this._viewportMetrics==="undefined"){this._viewportMetrics={};
this._viewportMetrics.height=window.innerHeight||document.documentElement.clientHeight;
AC.Object.synthesize(this)}return this._viewportMetrics},elementMetrics:function j(){if(typeof this._elementMetrics==="undefined"){this._elementMetrics={};
this._elementMetrics.height=this._element.offsetHeight;this._elementMetrics.offsetY=AC.Element.cumulativeOffset(this._element).top;
AC.Object.synthesize(this)}return this._elementMetrics},pixelsInView:function h(){var s;
var t=this.viewportMetrics();var r=this.elementMetrics();var q=this.elementViewportOffsetY();
if(q>=0){s=t.height-q;if(s>r.height){s=r.height}}else{s=r.height+q}if(s<0){s=0}return(this._pixelsInView=s)
},percentInView:function a(r){var s=this.viewportMetrics();var q=this.elementMetrics();
if(typeof r!=="number"){r=this.pixelsInView()}this._percentInView=(r===0)?0:(r/q.height);
return this._percentInView},percentTravelled:function o(s){var t=this.viewportMetrics();
var r=this.elementMetrics();var q=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
var u=t.height+r.height;this._percentTravelled=1-(((r.height+r.offsetY)-q)/u);return this._percentTravelled
},elementViewportOffsetY:function e(){var r=this.elementMetrics();var q=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
return r.offsetY-q}}}());AC.Object.extend(AC.ShowOnScroll.prototype,{__onScroll:function ac___onScroll(){var d=this._percentInView;
var c=(typeof d==="undefined");var e=this.pixelsInView();var b=this.percentInView(e);
var a=this.percentTravelled(e);if(this.isInView(e)&&(d===0||c)){if(typeof this._delegate.scrolledIntoView==="function"){this._delegate.scrolledIntoView(this._element)
}}if((b===0&&d>0)&&!c){if(typeof this._delegate.scrolledOutOfView==="function"){this._delegate.scrolledOutOfView(this._element)
}}if(b===1&&(d<1||c)){if(typeof this._delegate.scrolledIntoViewCompletely==="function"){this._delegate.scrolledIntoViewCompletely(this._element,e)
}}if((b<1&&d===1)&&!c){if(typeof this._delegate.scrolledOutOfViewCompletely==="function"){this._delegate.scrolledOutOfViewCompletely(this._element,e,a)
}}if(this.__hasChangedInViewPastThresholdStatus(d,b)){if(this.isEnoughInView(b)){this.__scrolledIntoViewPastThreshold()
}else{if(!c){this.__scrolledOutOfViewPastThreshold()}}}if(this.isInView(e)){if(typeof this._delegate.scrolledWhileInView==="function"){this._delegate.scrolledWhileInView(this._element,e,a)
}}if(!c){this.__resetOnScrollEndTimer()}},__onWindowLoad:function ac___onWindowLoad(){var a=this;
window.setTimeout(function(){a.__onScroll.call(a)},500)},__onScrollEnd:function ac___onScrollEnd(){delete this.__onScrollEndTimer;
this.refreshMetrics();if(typeof this._delegate.scrollEnd==="function"){this._delegate.scrollEnd(this._element,this._pixelsInView,this._percentTravelled)
}},__scrolledIntoViewPastThreshold:function ac___scrolledIntoViewPastThreshold(){this.__startTimeInViewTimer();
if(typeof this._delegate.scrolledIntoViewPastThreshold==="function"){this._delegate.scrolledIntoViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}},__scrolledOutOfViewPastThreshold:function ac___scrolledOutOfViewPastThreshold(){this.__cancelTimeInViewTimer();
if(typeof this._delegate.scrolledOutOfViewPastThreshold==="function"){this._delegate.scrolledOutOfViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}},__visitorEngaged:function ac___visitorEngaged(){if(typeof this._delegate.visitorEngaged==="function"){this._delegate.visitorEngaged(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}delete this.__timeInViewTimerId},__hasChangedInViewPastThresholdStatus:function ac___hasChangedInViewPastThresholdStatus(b,a){if(((this.isEnoughInView(a))&&(!this.isEnoughInView(b)))||((!this.isEnoughInView(a))&&(this.isEnoughInView(b)))||(typeof b==="undefined")){return true
}else{return false}},__cancelTimeInViewTimer:function ac___cancelTimeInViewTimer(){if(typeof this.__timeInViewTimerId!=="undefined"){window.clearTimeout(this.__timeInViewTimerId);
delete this.__timeInViewTimerId}},__startTimeInViewTimer:function ac___startTimeInViewTimer(){this.__visitorEngaged()
},__resetOnScrollEndTimer:function ac___resetOnScrollEndTimer(){this.__onScrollEnd()
}});AC.ShowOnScroll.version="2.1";AC.define("iphone/lib/ac_showonscroll/ac_showonscroll",function(){});
AC.define("AC/ShowOnScroll",["require","iphone/lib/ac_showonscroll/ac_showonscroll"],function(a){a("iphone/lib/ac_showonscroll/ac_showonscroll");
return AC.ShowOnScroll});AC.Ambient=AC.Class({__defaultOptions:{classNamePrefix:"ac-ambient-",delayBeforePlay:true,delayBeforeDidPlay:0,didPlayOnAnimationEnd:false,didPlayOnTransitionEnd:false,analytics:false},initialize:function ac_initialize(b,c,a){this._options=this.__mergeOptions(c);
this._container=AC.Element.getElementById(b);this._controller=a||null;this._delegate={};
this._name=null;this._canPlay=null;this._playInitiated=false;this._visitorWasEngaged=false;
if(!AC.Element.isElement(this._container)){throw"Ambient container is not a valid Element."
}this.synthesize();this.didPlay=this.didPlay.bind(this);if(this.options().didPlayOnAnimationEnd||this.options().didPlayOnTransitionEnd){this.__mixin("CSSEventResponding")
}},setDelegate:function ac_setDelegate(a){if(this.__hasSetDelegate===true){throw"Cannot set delegate twice on the same instance of AC.Ambient."
}if(typeof a==="object"){this._delegate=a;this.__hasSetDelegate=true;if(this.canPlay()){this.__addClassName("canplay")
}}return this},name:function ac_name(){var a;if(typeof this._name!=="string"){if(a=this.container().getAttribute("data-analytics-name")){this._name=a
}else{if((a=this.container().id)!==""){this._name=a}}}if(typeof this._name!=="string"){this.play=AC.Function.emptyFunction;
throw"AC.Ambient: name is undefined."}return this._name},setName:function ac_setName(a){if(typeof a==="string"){this._name=a
}return this._name},canPlay:function ac_canPlay(){if(typeof this._canPlay!=="boolean"){this.__canPlay();
if(typeof this._canPlay!=="boolean"){this.setCanPlay(true)}}return this._canPlay
},__canPlay:function ac___canPlay(){var a=this.__runDelegate("canPlay");if(typeof a==="boolean"){this.setCanPlay(a)
}else{if(typeof this.delegate().canPlay==="function"){throw"canPlay delegate expected to return boolean."
}}},play:function ac_play(){if(!this.canPlay()){return false}if(this.controller()){this.controller().add(this.__willPlay.bind(this))
}else{this.__willPlay()}return this},stop:function ac_stop(){this.__stop();return this
},pause:function ac_pause(){this.__pause();return this},didPlay:function ac_didPlay(){if(this.controller()){this.controller().didFinish()
}this.__runDelegate("didPlay");this.__addClassName("didplay");return this},__willPlay:function ac___willPlay(){this.__runDelegate("willPlay");
this.__addClassName("willplay");if(this.options().delayBeforePlay===true){window.setTimeout(this.__play.bind(this),0.02*1000)
}else{this.__play()}},__play:function ac___play(){this.__runDelegate("play");this.__addClassName("play");
this.__delayBeforeDidPlay();if(!this.playInitiated()){this.setPlayInitiated(true)
}},__pause:function ac___pause(){this.__runDelegate("pause")},__stop:function ac___stop(){this.__runDelegate("stop")
},reset:function ac_reset(){this.__removeClassName("willplay");this.__removeClassName("play");
this.__removeClassName("didplay");this.setCanPlay(null);if(!this.canPlay()){this.__removeClassName("canplay")
}},__delayBeforeDidPlay:function ac___delayBeforeDidPlay(){this.options().delayBeforeDidPlay=parseFloat(this.options().delayBeforeDidPlay);
if(this.options().delayBeforeDidPlay>0){window.clearTimeout(this.__didPlayTimer);
this.__didPlayTimer=window.setTimeout(this.didPlay,this.options().delayBeforeDidPlay*1000)
}},__addClassName:function ac___addClassName(a){if(typeof this.options().classNamePrefix==="string"){AC.Element.addClassName(this.container(),this.options().classNamePrefix+a)
}},__removeClassName:function ac___removeClassName(a){if(typeof this.options().classNamePrefix==="string"){AC.Element.removeClassName(this.container(),this.options().classNamePrefix+a)
}},__mixin:function ac___mixin(b,c){var e;var a;var d;if(AC.Ambient.Mixins.hasOwnProperty(b)){if(typeof AC.Ambient.Mixins[b].parent==="string"){this.__mixin(AC.Ambient.Mixins[b].parent)
}e=AC.Object.clone(AC.Ambient.Mixins[b]);delete e.parent;if(typeof e.__setupMixin==="function"){a=e.__setupMixin.bind(this);
delete e.__setupMixin}for(d in e){if(e.hasOwnProperty(d)&&(typeof this[d]==="undefined"||c===true)){this[d]=e[d]
}}if(typeof a==="function"){a(this)}this.synthesize()}},__mergeOptions:function ac___mergeOptions(b){var c;
var a;if(typeof this.__defaultOptions==="object"){a=AC.Object.clone(this.__defaultOptions)
}else{a={}}if(typeof b!=="object"){b={}}if(this.__extends){a=this.__mergeOptions.call(this.__extends.prototype,a)
}c=AC.Object.extend(a,b);return c},__runDelegate:function ac___runDelegate(b){var a=this.options().classNamePrefix+b;
this.__setupAnalytics();AC.NotificationCenter.publish(a,{target:this,data:{ambientContent:this,notificationName:b}},true);
if(typeof this.delegate()[b]==="function"){return this.delegate()[b](this)}},__setupAnalytics:function ac___setupAnalytics(){if(this.__hasSetupAnalytics){return
}this.__analyticsOverrideCheck();if(this.options().analytics===true){this.options().analytics=new AC.Ambient.AnalyticsController()
}if(this.options().analytics&&typeof this.options().analytics.subscribe==="function"){this.options().analytics.subscribe(this)
}this.__hasSetupAnalytics=true},__analyticsOverrideCheck:function ac___analyticsOverrideCheck(){var a=this.container().getAttribute("data-analytics");
if(a){if(a==="true"){this.options().analytics=true}else{if(a!=="false"){a=a.replace(/(\s|\"|\')/g,"").split(",");
this.options().analytics=new AC.Ambient.AnalyticsController(a)}}}}});AC.Ambient.AnalyticsInterpreterRegistry=AC.Class({initialize:function ac_initialize(){this.synthesize()
},interpret:function ac_interpret(a){var b=a.notificationName.replace(a.ambientContent.options().classNamePrefix,"");
if(typeof this.interpreters[b]!=="function"){return false}return this.interpreters[b](a)
},interpreters:{visitorEngaged:function ac_visitorEngaged(a){return"visitorEngaged"
},play:function ac_play(a){if(a.ambientContent.playInitiated()!==true){a.ambientContent.setPlayInitiated(true);
return"play"}else{return"replay"}},didPlay:function ac_didPlay(a){return"ended"
},stop:function ac_stop(a){if(a.ambientContent.playInitiated()===true){return"cancelled"
}return false},willPlay:function ac_willPlay(a){return"willPlay"},canPlay:function ac_canPlay(a){return"canPlay"
}}});AC.Ambient.AnalyticsController=AC.Class({__defaultPlugins:["sCode"],initialize:function ac_initialize(b,a){this._plugins=Array.isArray(a)?a:this.__defaultPlugins;
this._notificationsToTrack=[];this._interpreter=AC.Ambient.AnalyticsInterpreterRegistry.sharedInstance();
this.synthesize();if(!Array.isArray(b)){throw new TypeError("AC.Ambient.AnalyticsController: First parameter expects typeof array")
}this.setNotificationsToTrack(b);this.setPlugins(this.plugins().filter(this.__validatePlugin))
},subscribe:function ac_subscribe(b){if(typeof this.__boundTrack==="undefined"){this.__boundTrack=this.track.bind(this)
}var a=this.__boundTrack;this.notificationsToTrack().forEach(function(c){AC.NotificationCenter.subscribe(b.options().classNamePrefix+c,a,b)
})},getInterpretation:function ac_getInterpretation(a){return this.interpreter().interpret(a)
},unsubscribe:function ac_unsubscribe(b){if(typeof this.__boundTrack==="undefined"){this.__boundTrack=this.track.bind(this)
}var a=this.__boundTrack;this.notificationsToTrack().forEach(function(c){AC.NotificationCenter.unsubscribe(b.options().classNamePrefix+c,a,b)
})},track:function ac_track(a){var b=this.getInterpretation(a);this.plugins().forEach(function(c){if(b!==false){AC.Ambient.AnalyticsController.Plugins[c].track(a,b)
}})},__validatePlugin:function ac___validatePlugin(a){return(typeof AC.Ambient.AnalyticsController.Plugins[a]==="object"&&typeof AC.Ambient.AnalyticsController.Plugins[a].track==="function")
}});AC.Ambient.Controller=AC.Class({__defaultOptions:{autoplay:true,delay:0.2,asynchronous:true},initialize:function ac_initialize(a){this._options=AC.Object.extend(AC.Object.clone(this.__defaultOptions),a||{});
this._deferredQueue=new AC.DeferredQueue(this._options);this.synthesize();this.add=this.deferredQueue().add.bind(this.deferredQueue());
this.remove=this.deferredQueue().remove.bind(this.deferredQueue());this.didFinish=this.deferredQueue().didFinish.bind(this.deferredQueue())
}});AC.Ambient.Scroll=AC.Class(AC.Ambient,{__extends:AC.Ambient,__defaultOptions:{cleanupShowOnScrollAfterPlay:true,playOnVisitorEngaged:false},initialize:function ac_initialize($super,b,c,a){$super(b,c,a);
this.__mixin("Scroll")},didPlay:function ac_didPlay($super){$super();if(this.options().cleanupShowOnScrollAfterPlay===true&&typeof this.showOnScroll()!=="undefined"){this.showOnScroll().stopObserving()
}return this}});AC.Ambient.TrackScrolling=AC.Class(AC.Ambient,{__extends:AC.Ambient,__defaultOptions:{delayBeforeDidPlay:0.5,offsetTop:0,offsetBottom:0,distance:0},initialize:function ac_initialize($super,a,b){$super(a,b);
this._containerHeight=null;this._currentOffset=0;this.synthesize();this.__startingPercentage=null;
this.setContainerHeight(parseInt(AC.Element.getStyle(this.container(),"height"),10));
this.__mixin("Scroll")},scrolledWhileInView:function ac_scrolledWhileInView(b,c,a){this.___percentTravelled=a;
if(this.__isDrawing!==true){this.play()}AC.Ambient.Mixins.Scroll.scrolledWhileInView.apply(this,arguments)
},canPlay:function ac_canPlay(){if(typeof this.__canPlay==="undefined"){this.__canPlay=this.__runDelegate("canPlay");
if(typeof this.__canPlay!=="boolean"){this.__canPlay=AC.Environment.Feature.isDesktop()
}}return this.__canPlay},play:function ac_play(){if(typeof this.__boundPlay!=="function"){this.__boundPlay=this.play.bind(this)
}if(!this.canPlay()||!this.options().distance){return false}if(!this.___percentTravelled){this.__isDrawing=false;
this.__delayBeforeDidPlay()}else{this.__isDrawing=true;this.setCurrentOffset(((1-this.___percentTravelled)*(this.options().distance)*-1)+this.options().offsetTop);
this.__play();delete this.___percentTravelled;window.requestAnimationFrame(this.__boundPlay)
}},__play:function ac___play(){this.__runDelegate("play")}});AC.Ambient.TrackBackground=AC.Class(AC.Ambient.TrackScrolling,{__extends:AC.Ambient.TrackScrolling,initialize:function ac_initialize($super,a,b){$super(a,b);
this.__backgroundPositionX=AC.Element.getStyle(this.container(),"backgroundPosition");
if(this.__backgroundPositionX){this.__backgroundPositionX=this.__backgroundPositionX.split(" ")[0]
}this.__retrieveImageHeightFromElement(this.container())},__play:function ac___play($super){$super();
if(this.__backgroundPositionX){AC.Element.setStyle(this.container(),"backgroundPosition:"+this.__backgroundPositionX+" "+this.currentOffset()+"px")
}else{AC.Element.setStyle(this.container(),"backgroundPositionY:"+this.currentOffset()+"px")
}},__retrieveImageHeightFromElement:function ac___retrieveImageHeightFromElement(a){var d=AC.Element.getStyle(a,"backgroundImage").replace("url(","").replace(")","").replace(/\"/g,"").replace(/\'/g,"");
var c=new Image();var b=this;c.onload=function(){var e=c.height-b.containerHeight()+b.options().offsetTop+b.options().offsetBottom;
b.options().distance=Math.max(0,e)};c.src=d}});AC.Ambient.TrackElement=AC.Class(AC.Ambient.TrackScrolling,{__extends:AC.Ambient.TrackScrolling,initialize:function ac_initialize($super,a,c,b){$super(a,b);
this._element=AC.Element.getElementById(c);this._useTransforms=AC.Environment.Feature.cssPropertyAvailable("transform");
this.synthesize();if(!this.useTransforms()){this.__setupDegradedAnimation(this.element())
}if(this.options().distance===0){this.options().distance=parseInt(AC.Element.getStyle(this.element(),"height"),10)-this.containerHeight()
}},__setupDegradedAnimation:function ac___setupDegradedAnimation(b){var a=AC.Element.getStyle(b,"position");
var d=AC.Element.getStyle(b,"zIndex");if(a!=="relative"&&a!=="absolute"){a="relative"
}if(d<1){d=this.element().getAttribute("data-manage-z")||1}try{console.log(a,d)
}catch(c){}AC.Element.setStyle(this.element(),{position:a,"z-index":d})},__play:function ac___play($super){$super();
if(this.useTransforms()){if(AC.Environment.Feature.threeDTransformsAvailable()){AC.Element.setVendorPrefixStyle(this.element(),"-webkit-transform","translate3d(0, "+this.currentOffset()+"px, 0)")
}else{AC.Element.setVendorPrefixStyle(this.element(),"-webkit-transform","translate(0, "+this.currentOffset()+"px)")
}}else{AC.Element.setStyle(this.element(),"top:"+this.currentOffset()+"px")}}});
AC.namespace("AC.Ambient.Mixins");AC.Ambient.Mixins.CSSEventResponding={__setupMixin:function ac___setupMixin(){var a=this.__canPlay.bind(this);
this.options().didPlayOnAnimationEnd=this.__validateCSSEventOption(this.options().didPlayOnAnimationEnd);
this.options().didPlayOnTransitionEnd=this.__validateCSSEventOption(this.options().didPlayOnTransitionEnd);
if(isNaN(this.options().didPlayOnAnimationEnd)){throw"Incorrect value for option: didPlayOnAnimationEnd"
}if(isNaN(this.options().didPlayOnTransitionEnd)){throw"Incorrect value for option: didPlayOnTransitionEnd"
}this.__resetCSSEventCount();this.__setUpCSSEventListeners();this.__canPlay=function(){a();
if(typeof this._canPlay!=="boolean"){if((this.options().didPlayOnAnimationEnd&&!AC.Environment.Feature.cssPropertyAvailable("animation"))||(this.options().didPlayOnTransitionEnd&&!AC.Environment.Feature.cssPropertyAvailable("transition"))){this.setCanPlay(false)
}}}},__resetCSSEventCount:function ac___resetCSSEventCount(a){this.__animationEndEvents=0;
this.__transitionEndEvents=0;this.__totalCSSEvents=0;this.__totalCSSEvents+=this.options().didPlayOnAnimationEnd;
this.__totalCSSEvents+=this.options().didPlayOnTransitionEnd},__validateCSSEventOption:function ac___validateCSSEventOption(a){if(a===true){return 1
}else{if(a===false){return 0}}return parseInt(a,10)},__respondToCSSEvent:function ac___respondToCSSEvent(a){var b;
var c;if(a.type.match(/animation/i)){this.__animationEndEvents+=1;if(this.options().didPlayOnAnimationEnd<this.__animationEndEvents){AC.log(this.name()+": more animationEnd events fired than expected.")
}}else{this.__transitionEndEvents+=1;if(this.options().didPlayOnTransitionEnd<this.__transitionEndEvents){AC.log(this.name()+": Warning! more transitionEnd events fired than expected.")
}}if((this.__animationEndEvents+this.__transitionEndEvents)===this.__totalCSSEvents){if(a.type.match(/animation/i)){if(this.options().didPlayOnAnimationEnd>this.__animationEndEvents){AC.log(this.name()+": fewer animationEnd events fired than expected.")
}}else{if(this.options().didPlayOnTransitionEnd>this.__transitionEndEvents){AC.log(this.name()+": fewer transitionEnd events fired than expected.")
}}this.didPlay()}},__setUpCSSEventListeners:function ac___setUpCSSEventListeners(){this.__boundRespondToCSSEvent=AC.Function.bindAsEventListener(this.__respondToCSSEvent,this);
if(this.options().didPlayOnAnimationEnd>0){AC.Element.addVendorPrefixEventListener(this.container(),"animationEnd",this.__boundRespondToCSSEvent)
}if(this.options().didPlayOnTransitionEnd>0){AC.Element.addVendorPrefixEventListener(this.container(),"transitionEnd",this.__boundRespondToCSSEvent)
}}};AC.Ambient.Mixins.Scroll={__setupMixin:function ac___setupMixin(){this.__createShowOnScroll()
},__createShowOnScroll:function ac___createShowOnScroll(){if(typeof AC.ShowOnScroll==="undefined"){throw"AC.ShowOnScroll not included on page."
}this._showOnScroll=new AC.ShowOnScroll(this.container(),this.options().showOnScrollOptions);
this._showOnScroll.setDelegate(this)},scrolledIntoView:function ac_scrolledIntoView(a){this.__runDelegate("scrolledIntoView")
},scrolledOutOfView:function ac_scrolledOutOfView(a){this.__runDelegate("scrolledOutOfView")
},scrolledIntoViewCompletely:function ac_scrolledIntoViewCompletely(a,b){this.__runDelegate("scrolledIntoViewCompletely")
},scrolledOutOfViewCompletely:function ac_scrolledOutOfViewCompletely(a,b){this.__runDelegate("scrolledOutOfViewCompletely")
},scrolledIntoViewPastThreshold:function ac_scrolledIntoViewPastThreshold(b,d,c,a){this.__runDelegate("scrolledIntoViewPastThreshold")
},scrolledOutOfViewPastThreshold:function ac_scrolledOutOfViewPastThreshold(b,d,c,a){this.__runDelegate("scrolledOutOfViewPastThreshold")
},visitorEngaged:function ac_visitorEngaged(b,d,c,a){this.__runDelegate("visitorEngaged");
if(this.options().playOnVisitorEngaged===true){this.play()}},scrolledWhileInView:function ac_scrolledWhileInView(a,c,b){this.__runDelegate("onScroll")
}};AC.namespace("AC.Ambient.AnalyticsController.Plugins");AC.Ambient.AnalyticsController.Plugins.sCode={track:function ac_track(b,c){var d=b.ambientContent;
var a;if(!AC.Tracking||!(typeof AC.Tracking.pageName==="function"&&typeof AC.Tracking.pageName()==="string")){throw"AC.Tracking not correctly initialized on page."
}if(typeof AC.Tracking.trackClick!=="function"){throw"apple_core.js required for anayltics tracking using s_code."
}if(typeof this[c]==="function"){a=this[c](b);if(a!==false){this.submit(d,a)}}},submit:function ac_submit(c,b){if(typeof b==="object"){AC.Tracking.trackClick(b,c,"o",b.prop13)
}if(typeof b==="string"){var a={prop13:(b+": "+AC.Tracking.pageName()+" - "+c.name())};
AC.Tracking.trackClick(a,c,"o",a.prop13)}},visitorEngaged:function ac_visitorEngaged(a){if(typeof a.visitorEngaged==="function"){a.visitorEngaged(a);
return false}if(!a.ambientContent.visitorWasEngaged()){a.ambientContent.setVisitorWasEngaged(true);
return"visitorEngaged"}return false},play:function ac_play(a){if(typeof a.play==="function"){a.play(a);
return false}return"v@s"},replay:function ac_replay(a){if(typeof a.replay==="function"){a.replay(a);
return false}return"v@r"},ended:function ac_ended(a){if(typeof a.ended==="function"){a.ended(a);
return false}return"v@e"},cancelled:function ac_cancelled(a){if(typeof a.cancelled==="function"){a.cancelled(a);
return false}if(!a.currentTime){throw new TypeError("AC.Ambient.AnalyticsController.Plugins.sCode: ‘cancelled’ function expects currentTime in event data")
}return"v@c - "+(Math.round(a.currentTime*100)/100)+"s"}};AC.Ambient.version="1.0";
AC.define("iphone/lib/ac_ambient/ac_ambient",function(){});AC.define("AC/Ambient",["require","AC/ShowOnScroll","iphone/lib/ac_ambient/ac_ambient"],function(a){a("AC/ShowOnScroll");
a("iphone/lib/ac_ambient/ac_ambient");return AC.Ambient});AC.define("iphone/shared/analytics/SectionEngagement",["require","AC/ShowOnScroll"],function(b){var e=b("AC/ShowOnScroll");
var d=AC.Tracking;var a=AC.Object;function c(g,f){this._element=g;this._options=f||{}
}c.prototype={__defaultOptions:{onlyTrackOnce:true,id:"",minimumDuration:1,debug:false,decimals:0,pixelOffset:50},determineThreshold:function(){var g;
var f=this._element.offsetHeight;return this._options.pixelOffset/f},scrolledWhileInView:function(){if(document.viewport.getHeight()+window.scrollY>=Element.getHeight(document.body)){this.scrolledOutOfViewPastThreshold()
}},scrolledIntoViewPastThreshold:function(){this.__startTime=new Date().getTime()
},scrolledOutOfViewPastThreshold:function(){var g=Math.pow(10,this._options.decimals);
var f={prop34:(d.pageName()+" - "+this._options.id+" - section engaged"),prop35:(Math.round((new Date().getTime()-this.__startTime)/(1000/g))/g)};
if(f.prop35>=this._options.minimumDuration){if(this._options.onlyTrackOnce===true&&this.__hasTracked===true){return
}d.trackClick(f,this,"o",f.prop34);this.__hasTracked=true;if(this._options.debug){try{console.log(f.prop34+": "+f.prop35+"s")
}catch(h){}}}},activate:function(){if(typeof this.__defaultOptions!=="object"){this.__defaultOptions={}
}this._options=a.extend(a.clone(this.__defaultOptions),this._options);if(this._options.debug===true){this._element.setStyle("outline:5px rgba(255,255,0,.5) dotted")
}this._showOnScroll=new e(this._element,{threshold:this.determineThreshold()});
this._showOnScroll.setDelegate(this)}};return c});AC.define("features/analytics/builder",["require","iphone/shared/analytics/SectionEngagement"],function(a){var b=a("iphone/shared/analytics/SectionEngagement");
return function(d,c){c=c||{};d.forEach(function(e){c.id=e.getAttribute("data-track-visitor-engagement");
var f=new b(e,c);f.activate()})}});AC.define("iphone/shared/assetLoader/AssetLoader",["require","defer/Deferred"],function(c){var b=c("defer/Deferred");
function a(e,d){this._assetsToLoad=[].concat(e);this._type=d||"img"}a.prototype={load:function(){this._assetsLoaded=[];
this._assetsCountLoaded=0;this._defer=new b();this._failure=false;this._assetsToLoad.forEach(this._loadAsset.bind(this));
return this._defer.promise()},_progress:function(e,d){this._defer.progress(this._assetsLoaded[e]=d);
this._assetsCountLoaded+=1;if(this._assetsCountLoaded===this._assetsToLoad.length){this._defer.resolve(this._assetsLoaded)
}},_error:function(d){this._failure=true;this._defer.reject(d.target)},_loadAsset:function(e,f){var d;
if(!this._failure){d=document.createElement(this._type);d.onload=this._progress.bind(this,f,d);
d.onerror=this._error.bind(this);d.src=e}}};return a});AC.define("iphone/shared/gallery/imageLinkPreload",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var a=b("iphone/shared/assetLoader/AssetLoader");
return function(f,e){if(e===undefined){return}var d=[];f.forEach(function(i){var k=i.getAttribute("href");
var j="g";var h=new RegExp("\\.("+["pn"+j,j+"if","jp"+j,"jpe"+j].join("|")+")\\#");
if(h.test(k)){d.push(i.getAttribute("href"))}});var c=new a(d);c.load()}});AC.define("iphone/shared/forceTridentRedraw/forceTridentRedraw",["require"],function(b){var d=(AC.Environment.Browser.name==="IE"&&AC.Environment.Browser.version<=8);
var c=/\#.+/.test(document.location.hash);var a=(!d||!c)?function(){}:function(e){AC.Element.selectAll(e).forEach(function(f){AC.Element.setStyle(f,{overflow:"visible"});
setTimeout(function(){AC.Element.setStyle(f,{overflow:"hidden"});setTimeout(function(){AC.Element.setStyle(f,{overflow:""})
},125)},125)})};return a});AC.define("iphone/shared/fullTakeoverColorPicker/Viewer",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var d=AC.Element;
var a=b("iphone/shared/assetLoader/AssetLoader");var c=AC.Retina.sharedInstance();
var e=function(g,f){AC.onDOMReady(function(){if(window.tracker){window.tracker.setDelegate({sectionDidChange:function(s,q,n,j,r){if(q.delegate&&typeof q.delegate.getCurrentAngleFromId==="function"){var p=q.previousSection.id;
var i=q.delegate.getCurrentDeviceColorFromId(p);var t=q.delegate.getCurrentCaseColorFromId(p);
var m=q.delegate.getCurrentAngleFromId(p);var l=q.delegate.getCurrentDeviceColorFromId(j);
var o=q.delegate.getCurrentCaseColorFromId(j);var k=q.delegate.getCurrentAngleFromId(j);
if(i===l&&t===o&&m!==k){r.pageName=r.pageName.replace("-"+q.delegate.getCurrentDeviceColorFromId(j),"").replace("-"+q.delegate.getCurrentCaseColorFromId(j),"")
}else{r.pageName=r.pageName.replace("-"+q.delegate.getCurrentAngleFromId(j),"")
}}return r}})}});if(AC.Environment.Browser.name==="Safari Mobile"&&AC.Environment.Browser.version===7&&AC.Environment.Feature.isHandheld()){AC.Element.addClassName(document.body.parentNode,"iphone-ios7")
}var h=new AC.ViewMaster.Viewer(d.selectAll(".full-takeover-color-picker-content a.full-takeover-color-picker"),"full-takeover-color-picker","full-takeover-color-picker",{addSectionIdAsClassName:true,heightFromFirstSection:true,imageLinkAutoCaptions:true,manageZ:true,shouldAnimateFadeIn:true,silentTriggers:true,useHTML5Tags:true,useKeyboardNav:true});
h.setDelegate({_links:[],_deviceLinks:[],_caseLinks:[],getCurrentAngleFromId:function(j){var i=j.split("-");
if(i[4]&&i[4]!=="default"){return i[4]}},getCurrentDeviceColorFromId:function(j){var i=j.split("-");
if(i[5]&&i[5]!=="default"){return i[5]}},getCurrentCaseColorFromId:function(j){var i=j.split("-");
if(i[6]&&i[6]!=="default"){return i[6]}},preloadImages:function(){this.viewer._locked=true;
var i=this._angleLinks.concat(this._caseLinks).concat(this._deviceLinks);var j=[];
i.forEach(function(l,k){var n=l.href.replace(/^.*\#/,"");var m=this.viewer.sectionWithId(n);
if(m._isContentLoaded===false){j.push(c.bestSrc(m._contentURL))}}.bind(this));new a(j).load().then(function(){this.viewer._locked=false
}.bind(this))},updateAngleForDeviceAndCaseColor:function(n,l,q){var j,k,p,m,o,i;
j=AC.Element.select("img",n);k=n.href.replace(/^.*\#/,"");if(k&&j){p=this.viewer.sectionWithId(k);
if(p){m=p.triggers();if(m[0]){j.setAttribute("alt",(m[0].textContent||m[0].innerText));
o=new RegExp("("+n.getAttribute("data-angle")+")_[^_.]*_[^_.]*");i=j.src.replace(o,"$1_"+l+"_"+q);
j.src=c.bestSrc(i)}}}},activateLinksForSectionId:function(m){var l,k;var o=this.getCurrentAngleFromId(m);
var j=this.getCurrentDeviceColorFromId(m);var n=this.getCurrentCaseColorFromId(m);
for(l=0,k=this._deviceLinks.length;l<k;l+=1){if(j===this._deviceLinks[l].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._deviceLinks[l].className+=" active"
}else{this._deviceLinks[l].className=this._deviceLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}}for(l=0,k=this._caseLinks.length;l<k;l+=1){if(n===this._caseLinks[l].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._caseLinks[l].className+=" active"
}else{this._caseLinks[l].className=this._caseLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}}for(l=0,k=this._angleLinks.length;l<k;l+=1){if(o===this._angleLinks[l].getAttribute("data-angle")&&this.viewer.currentSection.id.indexOf("-default")<0){this._angleLinks[l].className+=" active"
}else{this._angleLinks[l].className=this._angleLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}this.updateAngleForDeviceAndCaseColor(this._angleLinks[l],j,n)}},setLinksHrefValuesForSectionId:function(o){var m,k;
var q=this.getCurrentAngleFromId(o);var j=this.getCurrentDeviceColorFromId(o);var p=this.getCurrentCaseColorFromId(o);
for(m=0,k=this._deviceLinks.length;m<k;m+=1){this._deviceLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+q+"-"+this._deviceLinks[m].getAttribute("data-color")+"-"+p)
}for(m=0,k=this._caseLinks.length;m<k;m+=1){this._caseLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+q+"-"+j+"-"+this._caseLinks[m].getAttribute("data-color"))
}for(m=0,k=this._angleLinks.length;m<k;m+=1){this._angleLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+this._angleLinks[m].getAttribute("data-angle")+"-"+j+"-"+p);
if(this._angleLinks[m].getAttribute("data-angle")===q){if(this._angleLinks[m-1]){var l=this._angleLinks[m-1].getAttribute("data-angle");
this._paddleLinks[0].setAttribute("href","#"+this.viewer.triggerClassName+"-"+l+"-"+j+"-"+p);
this._paddleLinks[0].className=this._paddleLinks[0].className.replace(/disabled/g,"").replace(/  /g," ")
}else{this._paddleLinks[0].className+=" disabled"}if(this._angleLinks[m+1]){var n=this._angleLinks[m+1].getAttribute("data-angle");
this._paddleLinks[1].setAttribute("href","#"+this.viewer.triggerClassName+"-"+n+"-"+j+"-"+p);
this._paddleLinks[1].className=this._paddleLinks[1].className.replace(/disabled/g,"").replace(/  /g," ")
}else{this._paddleLinks[1].className+=" disabled"}}}},willShow:function(k,j,i){if(i&&i.id){f.scale(i.content);
this.activateLinksForSectionId(i.id)}},didShow:function(n,l,k){var m,j,o;this.viewer=n;
if(!this._didShowInitial){setTimeout(function(){var i=AC.Element.select("#"+g);
if(i){AC.Element.addClassName(i,"takeover-content-loaded")}},250);this._deviceLinks=d.selectAll("#"+g+" .color-nav-devices a");
this._caseLinks=d.selectAll("#"+g+" .color-nav-cases a");this._angleLinks=d.selectAll("#"+g+" .angle-nav a");
this._paddleLinks=d.selectAll("#"+g+" .paddle-nav a");this._links=this._deviceLinks.concat(this._caseLinks,this._angleLinks,this._paddleLinks);
for(m=0,j=this._links.length;m<j;m+=1){d.addClassName(this._links[m],this.viewer.triggerClassName)
}}if(k&&k.id&&k.content){f.scale(k.content);this.setLinksHrefValuesForSectionId(k.id);
if(!this._didShowInitial&&this.viewer.currentSection&&this.viewer.currentSection.id.indexOf("-default")<0){this.activateLinksForSectionId(k.id)
}if(this._didShowInitial){this.preloadImages()}}this._didShowInitial=true;this.viewer.options.shouldAnimateContentChange=true
}});return h};return e});AC.define("iphone/shared/fullTakeoverColorPicker/Scaler",["require"],function(a){function d(f){if(f==="transitionend"&&AC.Environment.Browser.name==="Safari"){f="webkitTransitionEnd"
}return f}function c(f,g,h){g=d(g);AC.Element.addEventListener(f,g,h)}function b(f,g,h){g=d(g);
AC.Element.removeEventListener(f,g,h)}var e=function(i,f,h){h=h||{};h.viewportMargins=h.viewportMargins||{top:0,right:0,bottom:0,left:0};
h.minimumView=h.minimumView||{width:0,height:0};if(!h.imageDimensions||!h.imageDimensions.width||!h.imageDimensions.height){throw new TypeError("you must supply a metrics object as an argument, with an imageDimensions property. The imageDimensions property must have a width and height property.")
}function g(o){var l=0;var j=0;var n=AC.Element.select(i);if(n&&n.offsetWidth>0&&n.offsetHeight>0){var k=AC.Element.selectAll(f);
if(o){k.push(o)}h.imageDimensions.ratio=(h.imageDimensions.height/h.imageDimensions.width);
h.viewportDimensions={width:n.offsetWidth,height:n.offsetHeight};l=Math.max(h.viewportDimensions.width-(h.viewportMargins.left+h.viewportMargins.right),h.minimumView.width);
j=Math.max(h.viewportDimensions.height-(h.viewportMargins.top+h.viewportMargins.bottom),h.minimumView.height);
var m=(l*h.imageDimensions.ratio<=j)?"width":"height";h.constrainedDimensions={width:(m==="width")?l:Math.round(j/h.imageDimensions.ratio),height:(m==="height")?j:Math.round(l*h.imageDimensions.ratio)};
k.each(function(p){if(p&&p.style){p.style.width=h.constrainedDimensions.width+"px";
p.style.height=h.constrainedDimensions.height+"px";p.style.top=Math.round(h.viewportMargins.top+((h.viewportDimensions.height-(h.constrainedDimensions.height+h.viewportMargins.top+h.viewportMargins.bottom))/2))+"px";
p.style.left=Math.round(h.viewportMargins.left+((h.viewportDimensions.width-(h.constrainedDimensions.width+h.viewportMargins.left+h.viewportMargins.right))/2))+"px"
}})}}this.scale=g;this.getMetrics=function(){return h}};return e});AC.DarkBox=AC.Class();
AC.DarkBox.prototype={ESC_KEY_CODE:27,initialize:function ac_initialize(a){this._identifier=a;
this.content=AC.Element.getElementById(this._identifier);AC.Element.setVendorPrefixStyle(this.content,"transform","translateZ(0)");
this.content.setAttribute("data-hires",true);this.triggers=AC.Element.selectAll("."+this._identifier);
this.content.style.display="none";this.content.parentNode.removeChild(this.content);
this._active=false;this.delegate={};this.__setupEvents();AC.Synthesize.synthesize(this)
},__setupEvents:function ac___setupEvents(){var b,a;this.__boundViewportChanged=AC.Function.bindAsEventListener(this.__viewportChanged,this);
this.__boundTriggerClicked=AC.Function.bindAsEventListener(this.__triggerClicked,this);
for(b=0,a=this.triggers.length;b<a;b+=1){AC.Element.addEventListener(this.triggers[b],"click",this.__boundTriggerClicked)
}AC.Element.addEventListener(window,"resize",this.__boundViewportChanged);AC.Element.addEventListener(window,"orientationchange",this.__boundViewportChanged);
AC.Element.addEventListener(document,"keyup",function(c){if(c.keyCode===this.ESC_KEY_CODE){this.closeDarkbox()
}}.bind(this))},__viewportChanged:function ac___viewportChanged(a){if(this._active===true){this.__resizeMask()
}},__triggerClicked:function ac___triggerClicked(a){AC.Event.stop(a);if(this._active===true){this.closeDarkbox()
}else{this.activateDarkbox()}},__maskBody:function ac___maskBody(){AC.Element.addClassName(document.documentElement,"blackout");
AC.Element.addClassName(document.body,"noscroll");this.__resizeMask()},__resizeMask:function ac___resizeMask(){this.content.style.height=(document.documentElement.clientHeight||window.innerHeight||document.documentElement.offsetHeight)+"px"
},activateDarkbox:function ac_activateDarkbox(){if(this._active!==true){this.yOffset=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
this.__maskBody();AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)");
AC.Element.setVendorPrefixStyle(this.content,"transition","400ms");setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"1"});
AC.Element.setVendorPrefixStyle(this.content,"transform","scale(1.0)")}.bind(this),100);
AC.Element.addClassName(this.content,"noscroll-show");document.body.appendChild(this.content);
this._active=true;if(typeof this.delegate.activateDarkbox==="function"){this.delegate.activateDarkbox()
}if(AC&&AC.Retina&&AC.Retina.sharedInstance){AC.Retina.sharedInstance().replace(this.content,this.content)
}}},closeDarkbox:function ac_closeDarkbox(){if(this._active===true){AC.Element.setVendorPrefixStyle(this.content,"transition","300ms");
setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)")
}.bind(this),1);var a=function(){document.body.style.height="";AC.Element.removeClassName(document.documentElement,"blackout");
AC.Element.removeClassName(this.content,"noscroll-show");AC.Element.removeClassName(document.body,"noscroll");
window.scrollTo(0,this.yOffset);this.content.parentNode.removeChild(this.content);
this._active=false;if(typeof this.delegate.closeDarkbox==="function"){this.delegate.closeDarkbox()
}AC.Element.removeVendorEventListener(this.content,"transitionEnd",a,false)}.bind(this);
AC.Element.addVendorEventListener(this.content,"transitionEnd",a,false);if(!AC.Environment.Feature.cssPropertyAvailable("transition")){a()
}}},setDelegate:function ac_setDelegate(a){this.delegate=a}};AC.define("iphone/lib/ac_darkbox/ac_darkbox",function(){});
AC.define("AC/DarkBox",["require","iphone/lib/ac_darkbox/ac_darkbox"],function(a){a("iphone/lib/ac_darkbox/ac_darkbox");
return AC.DarkBox});AC.define("iphone/shared/fullTakeoverColorPicker/DarkboxPicker",["require","iphone/shared/fullTakeoverColorPicker/Viewer","iphone/shared/fullTakeoverColorPicker/Scaler","AC/DarkBox"],function(a){var c={viewportMargins:{top:128,right:50,bottom:147,left:50},imageDimensions:{width:600,height:1200},minimumView:{width:0,height:0}};
var b;var g;function f(i){if(i==="transitionend"&&AC.Environment.Browser.name==="Safari"){i="webkitTransitionEnd"
}return i}function e(i,j,k){j=f(j);AC.Element.addEventListener(i,j,k)}function d(i,j,k){j=f(j);
AC.Element.removeEventListener(i,j,k)}var h=function(){var q="full-takeover-color-picker-overlay-wrapper";
var j="#"+q;var l=j+" figure";var r;var p;var o=AC.Element;var n=a("iphone/shared/fullTakeoverColorPicker/Viewer");
var s=a("iphone/shared/fullTakeoverColorPicker/Scaler");var i=a("AC/DarkBox");var p=new s(j,l,c);
var m=n(q,p);var u=0;function t(){r=new i(q);r.setDelegate({activateDarkbox:function(){var y=b.href.match(/[^\#]+$/)[0];
var x;m.options.shouldAnimateContentChange=false;m._currentTrigger="darkbox";for(x in AC.AutoGallery.galleries){AC.AutoGallery.galleries[x].options.oldUseKeyboardNav=AC.AutoGallery.galleries[x].options.useKeyboardNav;
AC.AutoGallery.galleries[x].options.oldAlwaysUseKeyboardNav=AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav;
AC.AutoGallery.galleries[x].options.useKeyboardNav=false;AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav=false
}m.options.useKeyboardNav=true;m.options.alwaysUseKeyboardNav=true;m.show(m.sectionWithId(y));
p.scale()},closeDarkbox:function(){m._currentTrigger=false;var x;for(x in AC.AutoGallery.galleries){AC.AutoGallery.galleries[x].options.useKeyboardNav=AC.AutoGallery.galleries[x].options.oldUseKeyboardNav;
AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav=AC.AutoGallery.galleries[x].options.oldAlwaysUseKeyboardNav
}m.options.useKeyboardNav=false;m.options.alwaysUseKeyboardNav=false;k()}});AC.Element.addEventListener(AC.Element.select("a.close",r.content),"click",function(x){r.closeDarkbox();
AC.Event.stop(x)});e(window,"resize",p.scale);e(window,"orientationchange",p.scale)
}function v(){if(document.location.hash&&/^\#full\-takeover\-color\-picker\-\w+\-\w+/.test(document.location.hash)){var x=AC.Element.select('a[href*="'+document.location.hash+'"]');
if(x){w(x)}}}function w(x){u=AC.Viewport.scrollOffsets().y;b=x;r.activateDarkbox();
setTimeout(function(){window.scrollTo(0,0)},10)}function k(){window.scrollTo(0,u)
}this.zoom=w;this.init=function(){t();v()}};return h});AC.define("iphone/shared/element/eachAncestor",["require"],function(a){function b(d,e){d=AC.Element.getElementById(d);
var c=d.parentNode;if(AC.Element.isElement(c)){while(c){if(typeof e==="function"){if(e(c)===false){break
}}if(c!==document.body){c=c.parentNode}else{c=null}}}}return b});AC.define("iphone/shared/element/selectAncestor",["require","iphone/shared/element/eachAncestor"],function(a){var b=a("iphone/shared/element/eachAncestor");
return function(d,e){d=AC.Element.getElementById(d);var c=null;if(d!==null&&e===undefined){return d.parentNode
}b(d,function(f){if(AC.Element.matchesSelector(f,e)){c=f;return false}});return c
}});AC.define("features/fullTakeoverColorPicker/builder",["require","iphone/shared/fullTakeoverColorPicker/DarkboxPicker","iphone/shared/element/selectAncestor"],function(b){var d=AC.Element;
var e=AC.Event;var a=AC.onDOMReady;var f=b("iphone/shared/fullTakeoverColorPicker/DarkboxPicker");
var c=b("iphone/shared/element/selectAncestor");return function(g){var h=new f();
a(function(){h.init();d.addEventListener(g,"click",function(k){var j=e.target(k);
var l=c(j,".column");j=c(j,"a");if(!j&&l){j=d.select("a",l)}if(j&&d.hasClassName(j,"product-composite")){h.zoom(j);
e.stop(k)}});var i=d.select('#main a[href*="#full-takeover-color-picker"]');d.addEventListener(i,"click",function(j){h.zoom(e.target(j));
e.stop(j)})})}});AC.define("flow/diff/Loader",["require","assetLoader/AssetLoader"],function(b){var c,a=b("assetLoader/AssetLoader");
function d(g,e){var f,j,h=g.match(/#/g).length;this.imagesUrls=[];if(!e){throw new Error("0 images provided")
}for(f=1;f<=e;f++){j="0000"+f;j=j.substring(j.length-h);this.imagesUrls.push(g.replace(/#{2,}/g,j))
}}c=d.prototype;c.load=function(){return new a(this.imagesUrls).load()};return d
});AC.define("flow/diff/Render",["require","flow/diff/Loader","defer/Deferred"],function(d){var e,c=d("flow/diff/Loader"),b=d("defer/Deferred");
function a(g,f){this.flowData=g;this.flowData.imageUrlPattern=f}e=a.prototype;e._storeImages=function(f){if(DEBUG){console.log("loaded images")
}this.images=f;this._blocksPerFullDiff=(f[0].width/this.flowData.blockSize)*(f[0].height/this.flowData.blockSize);
return(new b()).resolve()};e._applyDiffRange=function(h,o){var m=o.block,i=o.length,g=h.canvas.width/this.flowData.blockSize,k=Math.floor(m/this._blocksPerFullDiff),t=this.images[k].width,f=m%this._blocksPerFullDiff,s=t/this.flowData.blockSize,r=(f%s)*this.flowData.blockSize,q=Math.floor(f/(s||1))*this.flowData.blockSize,n=(o.location%g)*this.flowData.blockSize,l=Math.floor(o.location/g)*this.flowData.blockSize,j,p;
while(i){j=Math.min((i*this.flowData.blockSize),h.canvas.width-n,t-r);p=j/this.flowData.blockSize;
if(DEBUG){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:k,block:m,x:r,y:q})
}}h.drawImage(this.images[k],r,q,j,this.flowData.blockSize,n,l,j,this.flowData.blockSize);
i-=p;if(i){if((r+=j)>=t){r=0;q+=this.flowData.blockSize}if((f+=p)>=this._blocksPerFullDiff){f=0;
r=0;q=0;k+=1;if(k===this.flowData.imagesRequired-1){t=this.images[k].width}}if((n+=j)>=h.canvas.width){n=0;
l+=this.flowData.blockSize}m+=p}}};e.init=function(){if(DEBUG){console.log("load images")
}return new c(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load().then(this._storeImages.bind(this))
};e.renderDiff=function(f,i){var g=f.getContext("2d");i-=1;if(DEBUG){this._frameToRender=i;
console.log("applying diff frame : "+(i+1))}this.frames[i].forEach(function h(j){this._applyDiffRange(g,j)
}.bind(this))};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(e,{frames:{get:function(){return this.flowData.frames},set:function(f){this.flowData.frames=f
},enumerable:true}});return a});AC.define("flow/compositor/Sequence",["require","assetLoader/AssetLoader","flow/diff/Render","defer/Deferred"],function(c){var e,a=c("assetLoader/AssetLoader"),f=c("flow/diff/Render"),b=c("defer/Deferred");
function d(i,h,g){this._keyframes=i;this._imageUrlPattern=h;this._flowDataProvider=g
}e=d.prototype;e._initDiffRender=function(g){this._images=g;this.canvas.height=g[0].height;
this.canvas.width=g[0].width;this.applyFrame(g[0])};e.init=function(g){this.canvas=g||document.createElement("canvas");
return new a(this._keyframes).load().then(this._initDiffRender.bind(this)).then(this._flowDataProvider.load.bind(this._flowDataProvider))
};e.createDiffRender=function(g){this._diffRender=new f(g,this._imageUrlPattern);
return this._diffRender.init()};e.applyFrame=function(h){var g=this.canvas.getContext("2d");
g.drawImage(h,0,0)};e.calculateRenderCount=function(g,h){var i=0;if(Math.abs(h-g)>=h){g=1;
i=1}else{if(Math.abs(h-g)>=(this.frameCount-h)&&this._images[1]){g=this.frameCount-2;
i=1}}if(h>0&&h<this.frameCount-1){return Math.abs(g-h)+i}else{return i}};e.compositeFrames=function(g,i){var h=new b();
i=(this.frameCount<i)?this.frameCount-1:(i<0)?0:i;g=(this.frameCount-2<g)?this.frameCount-2:(g<0)?0:g;
var j;if(DEBUG){console.groupCollapsed("Rendering diff frames: "+g+"..."+i)}if(Math.abs(i-g)>=i){g=1;
if(DEBUG){console.log("applying start keyframe")}this.applyFrame(this._images[0])
}else{if(Math.abs(i-g)>=(this.frameCount-i)&&this._images[1]){g=this.frameCount-2;
if(DEBUG){console.log("applying end keyframe")}this.applyFrame(this._images[1])
}}j=(g>i)?-1:(g<i)?1:0;if(i>0&&i<this.frameCount-1){while(g!==i){h.progress(g);
this._diffRender.renderDiff(this.canvas,g);g+=j;h.progress(g)}}if(DEBUG){console.groupEnd()
}h.resolve(g);return h.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(e,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(g){return this._canvas=g
},enumerable:true},mainCompositor:{get:function(){var g=this;while(g._compositor){g=g._compositor
}return g},enumerable:true}});return d});AC.define("flow/data/Manifest",[],function(){function a(){}return a
});AC.define("flow/data/Block",[],function(){function a(b,c){this.location=b;this.length=c
}return a});AC.define("flow/data/processor",["require","flow/data/Manifest","flow/data/Block"],function(b){var e=b("flow/data/Manifest"),a=b("flow/data/Block"),d;
var c={parseData:function(f){d=0;var g=f.frames.map(this._parseFrame,this);return Object.create(e.prototype,{version:{value:f.version},framecount:{value:f.frameCount},blockSize:{value:f.blockSize},imagesRequired:{value:f.imagesRequired},reversible:{value:f.reversible},superframeFrequency:{value:f.superframeFrequency},frames:{value:g}})
},_valueForCharAt:function(h,f){var g=h.charCodeAt(f);if(g>64&&g<91){return g-65
}if(g>96&&g<123){return g-71}if(g>47&&g<58){return g+4}if(g===43){return 62}if(g===47){return 63
}throw"Invalid Bas64 character: "+h.charAt(f)},_createNumberFromBase64Range:function(j,f,i){var h=0,g;
while(i--){g=this._valueForCharAt(j,f++);h+=(g<<i*6)}return h},_parseFrame:function(g){var h,k=[],g=g.value||g,j,f;
for(h=0;h<g.length;h+=5){f=this._createNumberFromBase64Range(g,h,3);j=this._createNumberFromBase64Range(g,h+3,2);
k.push(Object.create(a.prototype,{location:{value:f,enumerable:true},length:{value:j,enumerable:true},block:{value:(d+=j)-j,enumerable:true}}))
}return k}};return c});AC.define("flow/data/provider/Async",["require","ajax/Ajax","flow/data/processor"],function(b){var d,a=b("ajax/Ajax"),e=b("flow/data/processor");
function c(f,g){this._url=f;this._ajaxAdaptor=g||new a()}d=c.prototype;d.load=function(){var f=this;
return this._ajaxAdaptor.get(this._url).then(function(h){try{var g=h.response||h.responseText;
return JSON.parse(g)}catch(i){if(DEBUG){console.log("Failed to parse manifest data")
}}}).then(function(g){f._data=g;return e.parseData(g)})};return c});AC.define("flow/data/provider/Sync",["require","defer/Deferred","flow/data/processor"],function(b){var d,a=b("defer/Deferred"),e=b("flow/data/processor");
function c(f){this._data=f}d=c.prototype;d.load=function(){var f=new a();f.resolve(e.parseData(this._data));
return f.promise()};return c});AC.define("flow/Player",["require","defer/Deferred"],function(b){var d,a=b("defer/Deferred");
function c(f,e){this._flow=e;this._frameRate=30;this.element=f;this.paused=true;
this.loop=false}d=c.prototype;d._dispatchEvent=function(e){var f=document.createEvent("Events");
f.initEvent(e,true,false);f.data=this;this.element.dispatchEvent(f);return f};d._timeToFrame=function(e){var f;
f=Math.round(e/this.duration*this._flow.frameCount);f=f%(this._flow.frameCount+1);
return(f<0)?this._flow.frameCount+f:f};d._advanceToTimeGlobal=function(e){this._prevTime=this._prevTime||e;
this._currentTime+=((e-this._prevTime)/1000)*this.playbackRate;this._prevTime=e;
var f=this._timeToFrame(this._currentTime),g=false;if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){f=this._flow.frameCount;
this._currentTime=this.duration;g=true}else{if(this.playbackRate<0&&this._currentTime<0){f=0;
this._currentTime=0;g=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(f).then(function(){this._dispatchEvent("timeupdate");
if(g){this.paused=true;this._dispatchEvent("ended")}else{this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}}.bind(this))}else{return(new a()).reject()}};d._advanceToTimeLocal=function(e){if(!this.seeking){this.seeking=true;
this._dispatchEvent("seeking");this._currentTime=1*e;this._prevTime=null;window.cancelAnimationFrame(this._requestAnimationFrame);
this._flow.gotoFrame(this._timeToFrame(e)).then(function(){this.seeking=false;this._dispatchEvent("timeupdate");
this._dispatchEvent("seeked");this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}.bind(this))}if(DEBUG){console.log("advance to time "+e+" from "+this._currentTime)
}};d.load=function(){this._dispatchEvent("loadstart");return this._flow.init(this.element).then(this._dispatchEvent.bind(this,"canplaythrough"))
};d.play=function(){if(this.paused){this.paused=false;this._dispatchEvent("play");
this._prevTime=null;this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}return this};d.pause=function(){if(!this.paused){this.paused=true;window.cancelAnimationFrame(this._requestAnimationFrame);
this._dispatchEvent("pause")}return this};d.on=function(){this.element.addEventListener.apply(this.element,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(d,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:d._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(e){if(isFinite(e)){this._frameRate=e;this._dispatchEvent("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(e){if(isFinite(e)){this._playbackRate=1*e;
this._dispatchEvent("ratechange")}},enumerable:true},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:true}});return c});AC.define("flow/keyframe/Loader",["require","assetLoader/AssetLoader","defer/Deferred"],function(d){var e,a=d("assetLoader/AssetLoader"),c=d("defer/Deferred");
function b(f,i){var h,g=f.match(/#/g).length;this._keyframes={};f=f.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(i.frames){i.frames.forEach(function(k,j){if(k.type==="keyframe"){h="0000"+j;
h=h.substring(h.length-g);this._imageUrls.push(f.replace(/#+/g,h));this._keyframes[j]=k
}}.bind(this))}}e=b.prototype;e.load=function(){if(this._imageUrls.length>0){return new a(this._imageUrls).load()
}return(new c()).resolve()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(e,{keyframes:{get:function(){return this._keyframes},enumerable:true}});
return b});AC.define("flow/keyframe/Render",["require","flow/keyframe/Loader"],function(a){var b,d=a("flow/keyframe/Loader");
function c(f,e){this.flowData=f;this.flowData.imageUrlPattern=e}b=c.prototype;b._storeImages=function(e){var g=0,h;
if(e&&e.length>0){if(DEBUG){console.log("loaded keyframe diff images")}for(var f in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(f)){h=e[g];
this._loader._keyframes[f].image=h;g+=1}}}if(DEBUG){if(!e||e.length===0){console.log("no keyframe diff images to load")
}}};b.init=function(){if(DEBUG){console.log("loading keyframe diff images")}this._loader=new d(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};b.renderKeyframe=function(g,f,o){var e=g.getContext("2d"),i=this._loader.keyframes[f],j=i.image,m=i.x,l=i.y,n=i.width,k=i.height;
if(DEBUG){console.log("applying keyframe diff image: "+f);console.log("x:"+m+" y:"+l+" w:"+n+" h:"+k)
}if(o===true){if(DEBUG){console.log("drawing superKeyframe sub-rectangle")}e.drawImage(j,m,l,n,k,m,l,n,k)
}else{if(this.flowData.reversible){if(DEBUG){console.log("drawing superKeyframe full image")
}e.drawImage(j,0,0)}else{if(DEBUG){console.log("drawing keyframe full image")}e.drawImage(j,m,l,n,k)
}}};return c});AC.define("flow/compositor/decorator/Keyframe",["require","flow/keyframe/Render","defer/Deferred"],function(c){var d,b=c("flow/keyframe/Render"),a=c("defer/Deferred");
function e(f){this._compositor=f;this._flowDataProvider=this.mainCompositor._flowDataProvider
}d=e.prototype;d.init=function(f){this._keyframeDiffRender=new b(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};d.applyFrame=function(f){return this._compositor.applyFrame.apply(this._compositor,arguments)
};d.applyKeyframe=function(f,g){this._keyframeDiffRender.renderKeyframe(this.canvas,f,g)
};d.compositeFrames=function(f,h){if(!this._isKeyframeDiff(h-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var g=new a();if(DEBUG){console.groupCollapsed("Rendering keyframe diff image: "+(f-1))
}this.applyKeyframe(h-1);if(DEBUG){console.groupEnd()}g.resolve(f-1);return g.promise()
};d._isKeyframeDiff=function(f){return f in this._keyframeDiffRender._loader._keyframes
};d.calculateRenderCount=function(f,g){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(d,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(f){return this._compositor.canvas=f
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return e});AC.define("flow/compositor/decorator/Superframe",[],function(){var a;
function b(d,c){this._compositor=d;this._superframeInterval=c||4}a=b.prototype;
a._getClosestSuperframe=function(c){return Math.round(c/this._superframeInterval)*this._superframeInterval
};a.init=function(c){this._screenCanvas=c};a.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};a.calculateRenderCount=function(c,e){var d=this._getClosestSuperframe(c);if(Math.abs(d-e)>this._superframeInterval/2){c=d+((c>e)?-1:1)*this._superframeInterval;
return this.calculateRenderCount(c,e)+1}else{return Math.abs(d-e)+1}};a.compositeFrames=function(c,f){var g,d;
if(f<=0||f>=this.frameCount-2){this._compositor.compositeFrames(c,f)}if(c>this.frameCount-2){c=this.frameCount-2
}else{if(c<=0){c=1}}d=this._getClosestSuperframe(c);if(DEBUG){console.groupCollapsed("Rendering : "+c+"..."+f)
}if(this._compositor.calculateRenderCount(c,f)>this.calculateRenderCount(c,f)){if(DEBUG){console.groupCollapsed("Rendering (superframe) : "+d)
}g=this._compositor.compositeFrames(d,d).then(function e(){if(DEBUG){console.groupEnd()
}var h=d+((c>f)?-1:1)*this._superframeInterval;this._compositor.compositeFrames(d,h).then(function(){return this.compositeFrames(h,f)
}.bind(this))}.bind(this))}else{if(DEBUG){console.groupCollapsed("Rendering (final frames) : "+c+"..."+f)
}g=this._compositor.compositeFrames(c,f).then(function e(){if(DEBUG){console.groupEnd()
}}.bind(this))}g.then(function e(){if(DEBUG){console.groupEnd()}}.bind(this));return g
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(a,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(c){return this._compositor.canvas=c
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return b});AC.define("flow/compositor/decorator/SuperKeyframe",["require","defer/Deferred"],function(b){var c,a=b("defer/Deferred");
function d(e){this._compositor=e;this._frames=this.mainCompositor._flowDataProvider._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}c=d.prototype;c.init=function(e){return this._compositor.init.apply(this._compositor,arguments)
};c.applyFrame=function(e){return this._compositor.applyFrame.apply(this._compositor,arguments)
};c.applyKeyframe=function(e,f){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};c.compositeFrames=function(e,h){var i,g,f=new a();if(h<1||h>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(h-1)){i=Math.abs(e-h)===1?true:false;if(DEBUG){console.groupCollapsed("Drawing superKeyframe image: "+(h-1))
}this.applyKeyframe(h-1,i);if(DEBUG){console.groupEnd()}f.resolve(e-1);return f.promise()
}if(Math.abs(h-e)>this._superframeInterval){g=this._getShortestRender(e,h);if(this._isKeyframeDiff(g-1)||g<=0||g>=this.frameCount-2){return this._compositeFromSuperKeyframe(g,h)
}}if(DEBUG){console.log("SuperKeyframe compositor handing off to slave compositor: fromFrame:"+e+" toFrame:"+h)
}return this._compositor.compositeFrames.apply(this._compositor,[e,h])};c._getShortestRender=function(e,g){var i=this._compositor.calculateRenderCount,h=this._getClosestSuperKeyframe(g-1),f=i.apply(this._compositor,[h,g])+1,j=i.apply(this._compositor,[e,g]);
if(f<=j){return h}else{return e}};c._compositeFromSuperKeyframe=function(i,g){var e=this.canvas.getContext("2d"),f=(i<=0)?this.mainCompositor._images[0]:(i>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[i-1].image),h;
if(DEBUG){console.log("Drawing superKeyframe for composite base: superKeyframe "+(i-1))
}e.drawImage(f,0,0);return this._compositor.compositeFrames.call(this._compositor,i,g)
};c._getClosestSuperFrame=function(e){return Math.round(e/this._superframeInterval)*this._superframeInterval
};c._getClosestSuperKeyframe=function(f){var j,k,h,g,e=this._frames.length;if(f<e+1&&f>0){g=f-1;
while(g>=0){if(this._frames[g].type==="keyframe"){j=g+1;break}g-=1}g=f+1;while(g<=e-1){if(this._frames[g].type==="keyframe"){k=g+1;
break}g+=1}}j=j?j:0;k=k?k:this.frameCount;h=(f-j)<(k-f)?j:k;return h};c._isKeyframeDiff=function(e){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(c,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(e){return this._compositor.canvas=e
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return d});AC.define("flow/compositor/decorator/Cache",[],function(){var b;
function a(d,c){this._compositor=d;this._keyframeInterval=c||8;this._keyframes=[]
}b=a.prototype;b._getClosestKeyframe=function(c){var d=c%this._keyframeInterval,e=Math.floor(c/this._keyframeInterval)+((d>(this._keyframeInterval/2))?1:0);
return e};b._getFrameFromKeyframe=function(c){return c*this._keyframeInterval};
b._saveKeyframe=function(e){var c,d=Math.floor(e/this._keyframeInterval);if(e%this._keyframeInterval===0&&!this._keyframes[d]){if(DEBUG){console.log("saving keyframe "+e)
}c=document.createElement("canvas");c.width=this._compositor.canvas.width;c.height=this._compositor.canvas.height;
c.getContext("2d").drawImage(this._compositor.canvas,0,0);this._keyframes[d]=c}};
b.init=function(c){return this._compositor.init.apply(this._compositor,arguments)
};b.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};b.calculateRenderCount=function(c,d){c=this._getFrameFromKeyframe(this._getClosestKeyframe(d));
return this._compositor.calculateRenderCount(c,d)+1};b.compositeFrames=function(c,e){var f=this._getClosestKeyframe(e);
if(DEBUG){console.groupCollapsed("Rendering frames: "+c+"..."+e)}if(this._keyframes[f]&&(this._compositor.calculateRenderCount(c,e)>this.calculateRenderCount(c,e))){c=this._getFrameFromKeyframe(f);
if(DEBUG){console.log("applying prerendered keyframe: "+c)}this.applyFrame(this._keyframes[f]);
return this._compositor.compositeFrames(c,e).then(function d(){if(DEBUG){console.groupEnd()
}})}else{return this._compositor.compositeFrames(c,e).then(function d(){if(DEBUG){console.groupEnd()
}},null,this._saveKeyframe.bind(this))}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(b,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(c){return this._compositor.canvas=c
},enumerable:true}});return a});AC.define("stats/Benchmark",[],function(){function a(b){this.name=b
}a.prototype.start=function(){if(DEBUG){console.log("▼▼▼ start "+this.name+" benchmark");
this.startTime=new Date().getTime();console.time(this.name)}};a.prototype.end=function(){if(DEBUG){this.endTime=new Date().getTime();
console.log("▲▲▲ end "+this.name+" benchmark "+(this.endTime-this.startTime)/1000+" sec");
console.time(this.timeEnd)}};return a});AC.define("flow/compositor/decorator/Benchmark",["require","stats/Benchmark"],function(a){var b,d=a("stats/Benchmark");
function c(e){this._compositor=e}b=c.prototype;b.init=function(e){var f=new d("init");
f.start();return this._compositor.init.apply(this._compositor,arguments).then(f.end.bind(f))
};b.applyFrame=function(){var e=new d("applyFrame");e.start();this._compositor.applyFrame.apply(this._compositor,arguments);
e.end.bind(e)};b.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};b.compositeFrames=function(){var e=new d("renderFrames");e.start();return this._compositor.compositeFrames.apply(this._compositor,arguments).then(e.end.bind(e))
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(b,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(e){return this._compositor.canvas=e
},enumerable:true}});c.prototype=b;return c});AC.define("flow/Flow",["require","defer/Deferred","flow/compositor/decorator/Keyframe","flow/compositor/decorator/Superframe","flow/compositor/decorator/SuperKeyframe","flow/compositor/decorator/Cache","flow/compositor/decorator/Benchmark"],function(a){var c,f=a("defer/Deferred"),g=a("flow/compositor/decorator/Keyframe"),e=a("flow/compositor/decorator/Superframe"),d=a("flow/compositor/decorator/SuperKeyframe"),i=a("flow/compositor/decorator/Cache"),h=a("flow/compositor/decorator/Benchmark");
function b(j,k){this._compositor=j;this.options=k||{}}c=b.prototype;c.gotoFrame=function(j){if(this._rendering){return(new f()).resolve()
}else{if(this._currentFrame===j){return(new f()).resolve()}}this._rendering=true;
if(DEBUG){console.groupCollapsed("gotoFrame:"+j+" currentFrame:"+this._currentFrame)
}return this._compositor.compositeFrames(this._currentFrame,j).then(function(){this._rendering=false;
this._currentFrame=j;if(DEBUG){console.groupEnd()}}.bind(this))};c.init=function(k){var j;
if(k.nodeName==="CANVAS"){j=k}else{j=document.createElement("canvas");k.appendChild(j)
}return this._compositor.init(j).then(function(l){return f.all([this._compositor.createDiffRender(l).then(this._decorateCompositor.bind(this))])
}.bind(this))};c._decorateCompositor=function(){var j=this._compositor,l=this._compositor._diffRender.flowData,k=this._compositor.canvas;
if(l.superframeFrequency){j=new e(j,l.superframeFrequency)}if(l.version===3){j=new g(j)
}if(l.version===3&&l.superframeFrequency){j=new d(j)}if(this.options.keyframeCache){j=new i(j,this.options.keyframeCache)
}if(this.options.benchmark){j=new h(j)}if(j===this._compositor){return(new f()).resolve()
}else{this._compositor=j;return this._compositor.init(k)}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(c,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true}});return b});AC.define("flow/playerFactory",["require","flow/compositor/Sequence","flow/data/provider/Async","flow/data/provider/Sync","flow/Player","flow/Flow"],function(c){var b=c("flow/compositor/Sequence"),g=c("flow/data/provider/Async"),f=c("flow/data/provider/Sync"),a=c("flow/Player"),d=c("flow/Flow");
function e(l,n,k,m,j){var i,o,h;j=j||{};j={keyframeCache:(typeof j.keyframeCache==="undefined")?8:j.keyframeCache,benchmark:(typeof j.benchmark==="undefined")?false:j.benchmark,preload:(typeof j.preload==="undefined")?true:j.preload};
n=n||[l.getAttribute("data-start-frame")];if(l.getAttribute("data-end-frame")){n.push(l.getAttribute("data-end-frame"))
}k=k||l.getAttribute("data-image-url-pattern");h=(typeof m==="string")?new g(m):new f(m);
i=new b(n,k,h);o=new a(l,new d(i,j));if(j.preload){o.load()}return o}return e});
AC.define("iphone/shared/sequence/builder",["require","flow/playerFactory"],function(b){var d=b("flow/playerFactory");
var a=AC.Environment.Feature;function e(){return typeof Object.defineProperties==="function"&&a.canvasAvailable()
}function c(f){AC.Element.removeClassName(f,"play");AC.Element.addClassName(f,"ended")
}return function(i,g){g=g||{};g.flow=g.flow||{};if(!e()){c(i);return null}var f=document.createElement("canvas");
var h=d(f,g.flow.keyframes,g.flow.imageUrlPattern,g.flow.manifestUrl,g.flow.options);
AC.Element.addClassName(f,"media");i.appendChild(f);f.on("canplaythrough",function(){AC.Element.addClassName(i,"ready")
});f.on("play",function(){AC.Element.removeClassName(i,"ended");AC.Element.removeClassName(i,"pause");
AC.Element.addClassName(i,"play")});f.on("pause",function(){AC.Element.removeClassName(i,"play");
AC.Element.addClassName(i,"pause")});f.on("ended",c.bind(undefined,i));return h
}});window.DEBUG=false;AC.define("features/sequence/hero/builder",["require","iphone/shared/sequence/builder"],function(b){var a=b("iphone/shared/sequence/builder");
function c(h){var e="/105/media/us/iphone-5c/2013/features/hero/";var d="j";var g=[e+"hero_sequence_keyframe."+d+"pg",e+"hero_sequence_endframe."+d+"pg"];
var f=a(h,{flow:{keyframes:g,imageUrlPattern:e+"hero_sequence_###."+d+"pg",manifestUrl:e+"hero_sequence_manifest.json",options:{}}});
return f}return c});AC.define("iphone/shared/responsive/retinaPlus",["require"],function(b){var a=AC.Retina;
function c(h){var g,e,f,d=h.length;while(--d>-1){g=h[d].src;e=g.split("../../index.html");f=a.sharedInstance().bestSrc(e[e.length-1]);
e[e.length-1]=f;g=e.join("../../index.html");h[d].src=g}return true}return c});AC.define("features/bootstrap",["require","AC/Ambient","features/analytics/builder","iphone/shared/gallery/imageLinkPreload","iphone/shared/forceTridentRedraw/forceTridentRedraw","features/fullTakeoverColorPicker/builder","features/sequence/hero/builder","iphone/shared/responsive/retinaPlus"],function(c){var a=c("AC/Ambient");
var j=c("features/analytics/builder");var b=c("iphone/shared/gallery/imageLinkPreload");
var e=c("iphone/shared/forceTridentRedraw/forceTridentRedraw");var d=c("features/fullTakeoverColorPicker/builder");
d(AC.Element.select("#main .cases"));var g=c("features/sequence/hero/builder");
var f=AC.Element.select("#hero .hero-image");var h=g(f);var i=c("iphone/shared/responsive/retinaPlus");
if(h!==null){h.on("canplaythrough",function(){window.setTimeout(h.play.bind(h),1000)
})}i(AC.Element.selectAll("img",f));j(AC.Element.selectAll("[data-track-visitor-engagement]"),{decimals:1});
AC.onDOMReady(function(){var l,k,n;var m=["gallery-design"];for(l=0,k=m.length;
l<k;l+=1){n=m[l];if(AC.AutoGallery.galleries[n]){b(AC.Element.selectAll(".imageLink",AC.AutoGallery.galleries[n].__wrapper),AC.AutoGallery.galleries[n])
}}});AC.onDOMReady(function(){e(".flushrow.built-in-apps, .flushrow.apple-apps")
})});