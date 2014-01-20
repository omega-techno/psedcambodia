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
a("iphone/lib/ac_ambient/ac_ambient");return AC.Ambient});AC.define("iphone/shared/element/threeDTransformsAvailable",["require"],function(b){var a=AC.Environment;
return function(){var c=document.createElement("style");c.id="supportsThreeDStyle";
return a.Feature.threeDTransformsAvailable()||c.style.MozTransform!==undefined}
});AC.define("camera/bootstrap",["require","AC/Ambient","iphone/shared/element/threeDTransformsAvailable"],function(b){var d=AC.Element;
var a=AC.Environment;var f=b("AC/Ambient");var e=b("iphone/shared/element/threeDTransformsAvailable");
var c=new f.Scroll(d.select(".larger .chart"),{playOnVisitorEngaged:true,showOnScrollOptions:{threshold:1}});
c.setDelegate({canPlay:function(){return(e())}});return{}});