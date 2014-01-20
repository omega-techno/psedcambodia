AC.Ambient=AC.Class({__defaultOptions:{classNamePrefix:"ac-ambient-",delayBeforePlay:true,delayBeforeDidPlay:0,didPlayOnAnimationEnd:false,didPlayOnTransitionEnd:false,analytics:false},initialize:function ac_initialize(d,f,e){this._options=this.__mergeOptions(f);
this._container=AC.Element.getElementById(d);this._controller=e||null;this._delegate={};
this._name=null;this._canPlay=null;this._playInitiated=false;this._visitorWasEngaged=false;
if(!AC.Element.isElement(this._container)){throw"Ambient container is not a valid Element."
}this.synthesize();this.didPlay=this.didPlay.bind(this);if(this.options().didPlayOnAnimationEnd||this.options().didPlayOnTransitionEnd){this.__mixin("CSSEventResponding")
}},setDelegate:function ac_setDelegate(b){if(this.__hasSetDelegate===true){throw"Cannot set delegate twice on the same instance of AC.Ambient."
}if(typeof b==="object"){this._delegate=b;this.__hasSetDelegate=true;if(this.canPlay()){this.__addClassName("canplay")
}}return this},name:function ac_name(){var b;if(typeof this._name!=="string"){if(b=this.container().getAttribute("data-analytics-name")){this._name=b
}else{if((b=this.container().id)!==""){this._name=b}}}if(typeof this._name!=="string"){this.play=AC.Function.emptyFunction;
throw"AC.Ambient: name is undefined."}return this._name},setName:function ac_setName(b){if(typeof b==="string"){this._name=b
}return this._name},canPlay:function ac_canPlay(){if(typeof this._canPlay!=="boolean"){this.__canPlay();
if(typeof this._canPlay!=="boolean"){this.setCanPlay(true)}}return this._canPlay
},__canPlay:function ac___canPlay(){var b=this.__runDelegate("canPlay");if(typeof b==="boolean"){this.setCanPlay(b)
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
}},__addClassName:function ac___addClassName(b){if(typeof this.options().classNamePrefix==="string"){AC.Element.addClassName(this.container(),this.options().classNamePrefix+b)
}},__removeClassName:function ac___removeClassName(b){if(typeof this.options().classNamePrefix==="string"){AC.Element.removeClassName(this.container(),this.options().classNamePrefix+b)
}},__mixin:function ac___mixin(f,j){var h;var g;var i;if(AC.Ambient.Mixins.hasOwnProperty(f)){if(typeof AC.Ambient.Mixins[f].parent==="string"){this.__mixin(AC.Ambient.Mixins[f].parent)
}h=AC.Object.clone(AC.Ambient.Mixins[f]);delete h.parent;if(typeof h.__setupMixin==="function"){g=h.__setupMixin.bind(this);
delete h.__setupMixin}for(i in h){if(h.hasOwnProperty(i)&&(typeof this[i]==="undefined"||j===true)){this[i]=h[i]
}}if(typeof g==="function"){g(this)}this.synthesize()}},__mergeOptions:function ac___mergeOptions(d){var f;
var e;if(typeof this.__defaultOptions==="object"){e=AC.Object.clone(this.__defaultOptions)
}else{e={}}if(typeof d!=="object"){d={}}if(this.__extends){e=this.__mergeOptions.call(this.__extends.prototype,e)
}f=AC.Object.extend(e,d);return f},__runDelegate:function ac___runDelegate(c){var d=this.options().classNamePrefix+c;
this.__setupAnalytics();AC.NotificationCenter.publish(d,{target:this,data:{ambientContent:this,notificationName:c}},true);
if(typeof this.delegate()[c]==="function"){return this.delegate()[c](this)}},__setupAnalytics:function ac___setupAnalytics(){if(this.__hasSetupAnalytics){return
}this.__analyticsOverrideCheck();if(this.options().analytics===true){this.options().analytics=new AC.Ambient.AnalyticsController()
}if(this.options().analytics&&typeof this.options().analytics.subscribe==="function"){this.options().analytics.subscribe(this)
}this.__hasSetupAnalytics=true},__analyticsOverrideCheck:function ac___analyticsOverrideCheck(){var b=this.container().getAttribute("data-analytics");
if(b){if(b==="true"){this.options().analytics=true}else{if(b!=="false"){b=b.replace(/(\s|\"|\')/g,"").split(",");
this.options().analytics=new AC.Ambient.AnalyticsController(b)}}}}});AC.Ambient.AnalyticsInterpreterRegistry=AC.Class({initialize:function ac_initialize(){this.synthesize()
},interpret:function ac_interpret(d){var c=d.notificationName.replace(d.ambientContent.options().classNamePrefix,"");
if(typeof this.interpreters[c]!=="function"){return false}return this.interpreters[c](d)
},interpreters:{visitorEngaged:function ac_visitorEngaged(b){return"visitorEngaged"
},play:function ac_play(b){if(b.ambientContent.playInitiated()!==true){b.ambientContent.setPlayInitiated(true);
return"play"}else{return"replay"}},didPlay:function ac_didPlay(b){return"ended"
},stop:function ac_stop(b){if(b.ambientContent.playInitiated()===true){return"cancelled"
}return false},willPlay:function ac_willPlay(b){return"willPlay"},canPlay:function ac_canPlay(b){return"canPlay"
}}});AC.Ambient.AnalyticsController=AC.Class({__defaultPlugins:["sCode"],initialize:function ac_initialize(c,d){this._plugins=Array.isArray(d)?d:this.__defaultPlugins;
this._notificationsToTrack=[];this._interpreter=AC.Ambient.AnalyticsInterpreterRegistry.sharedInstance();
this.synthesize();if(!Array.isArray(c)){throw new TypeError("AC.Ambient.AnalyticsController: First parameter expects typeof array")
}this.setNotificationsToTrack(c);this.setPlugins(this.plugins().filter(this.__validatePlugin))
},subscribe:function ac_subscribe(c){if(typeof this.__boundTrack==="undefined"){this.__boundTrack=this.track.bind(this)
}var d=this.__boundTrack;this.notificationsToTrack().forEach(function(a){AC.NotificationCenter.subscribe(c.options().classNamePrefix+a,d,c)
})},getInterpretation:function ac_getInterpretation(b){return this.interpreter().interpret(b)
},unsubscribe:function ac_unsubscribe(c){if(typeof this.__boundTrack==="undefined"){this.__boundTrack=this.track.bind(this)
}var d=this.__boundTrack;this.notificationsToTrack().forEach(function(a){AC.NotificationCenter.unsubscribe(c.options().classNamePrefix+a,d,c)
})},track:function ac_track(d){var c=this.getInterpretation(d);this.plugins().forEach(function(a){if(c!==false){AC.Ambient.AnalyticsController.Plugins[a].track(d,c)
}})},__validatePlugin:function ac___validatePlugin(b){return(typeof AC.Ambient.AnalyticsController.Plugins[b]==="object"&&typeof AC.Ambient.AnalyticsController.Plugins[b].track==="function")
}});AC.Ambient.Controller=AC.Class({__defaultOptions:{autoplay:true,delay:0.2,asynchronous:true},initialize:function ac_initialize(b){this._options=AC.Object.extend(AC.Object.clone(this.__defaultOptions),b||{});
this._deferredQueue=new AC.DeferredQueue(this._options);this.synthesize();this.add=this.deferredQueue().add.bind(this.deferredQueue());
this.remove=this.deferredQueue().remove.bind(this.deferredQueue());this.didFinish=this.deferredQueue().didFinish.bind(this.deferredQueue())
}});AC.Ambient.Scroll=AC.Class(AC.Ambient,{__extends:AC.Ambient,__defaultOptions:{cleanupShowOnScrollAfterPlay:true,playOnVisitorEngaged:false},initialize:function ac_initialize($super,d,f,e){$super(d,f,e);
this.__mixin("Scroll")},didPlay:function ac_didPlay($super){$super();if(this.options().cleanupShowOnScrollAfterPlay===true&&typeof this.showOnScroll()!=="undefined"){this.showOnScroll().stopObserving()
}return this}});AC.Ambient.TrackScrolling=AC.Class(AC.Ambient,{__extends:AC.Ambient,__defaultOptions:{delayBeforeDidPlay:0.5,offsetTop:0,offsetBottom:0,distance:0},initialize:function ac_initialize($super,d,c){$super(d,c);
this._containerHeight=null;this._currentOffset=0;this.synthesize();this.__startingPercentage=null;
this.setContainerHeight(parseInt(AC.Element.getStyle(this.container(),"height"),10));
this.__mixin("Scroll")},scrolledWhileInView:function ac_scrolledWhileInView(d,f,e){this.___percentTravelled=e;
if(this.__isDrawing!==true){this.play()}AC.Ambient.Mixins.Scroll.scrolledWhileInView.apply(this,arguments)
},canPlay:function ac_canPlay(){if(typeof this.__canPlay==="undefined"){this.__canPlay=this.__runDelegate("canPlay");
if(typeof this.__canPlay!=="boolean"){this.__canPlay=AC.Environment.Feature.isDesktop()
}}return this.__canPlay},play:function ac_play(){if(typeof this.__boundPlay!=="function"){this.__boundPlay=this.play.bind(this)
}if(!this.canPlay()||!this.options().distance){return false}if(!this.___percentTravelled){this.__isDrawing=false;
this.__delayBeforeDidPlay()}else{this.__isDrawing=true;this.setCurrentOffset(((1-this.___percentTravelled)*(this.options().distance)*-1)+this.options().offsetTop);
this.__play();delete this.___percentTravelled;window.requestAnimationFrame(this.__boundPlay)
}},__play:function ac___play(){this.__runDelegate("play")}});AC.Ambient.TrackBackground=AC.Class(AC.Ambient.TrackScrolling,{__extends:AC.Ambient.TrackScrolling,initialize:function ac_initialize($super,d,c){$super(d,c);
this.__backgroundPositionX=AC.Element.getStyle(this.container(),"backgroundPosition");
if(this.__backgroundPositionX){this.__backgroundPositionX=this.__backgroundPositionX.split(" ")[0]
}this.__retrieveImageHeightFromElement(this.container())},__play:function ac___play($super){$super();
if(this.__backgroundPositionX){AC.Element.setStyle(this.container(),"backgroundPosition:"+this.__backgroundPositionX+" "+this.currentOffset()+"px")
}else{AC.Element.setStyle(this.container(),"backgroundPositionY:"+this.currentOffset()+"px")
}},__retrieveImageHeightFromElement:function ac___retrieveImageHeightFromElement(f){var g=AC.Element.getStyle(f,"backgroundImage").replace("url(","").replace(")","").replace(/\"/g,"").replace(/\'/g,"");
var h=new Image();var e=this;h.onload=function(){var a=h.height-e.containerHeight()+e.options().offsetTop+e.options().offsetBottom;
e.options().distance=Math.max(0,a)};h.src=g}});AC.Ambient.TrackElement=AC.Class(AC.Ambient.TrackScrolling,{__extends:AC.Ambient.TrackScrolling,initialize:function ac_initialize($super,e,f,d){$super(e,d);
this._element=AC.Element.getElementById(f);this._useTransforms=AC.Environment.Feature.cssPropertyAvailable("transform");
this.synthesize();if(!this.useTransforms()){this.__setupDegradedAnimation(this.element())
}if(this.options().distance===0){this.options().distance=parseInt(AC.Element.getStyle(this.element(),"height"),10)-this.containerHeight()
}},__setupDegradedAnimation:function ac___setupDegradedAnimation(e){var f=AC.Element.getStyle(e,"position");
var g=AC.Element.getStyle(e,"zIndex");if(f!=="relative"&&f!=="absolute"){f="relative"
}if(g<1){g=this.element().getAttribute("data-manage-z")||1}try{console.log(f,g)
}catch(h){}AC.Element.setStyle(this.element(),{position:f,"z-index":g})},__play:function ac___play($super){$super();
if(this.useTransforms()){if(AC.Environment.Feature.threeDTransformsAvailable()){AC.Element.setVendorPrefixStyle(this.element(),"-webkit-transform","translate3d(0, "+this.currentOffset()+"px, 0)")
}else{AC.Element.setVendorPrefixStyle(this.element(),"-webkit-transform","translate(0, "+this.currentOffset()+"px)")
}}else{AC.Element.setStyle(this.element(),"top:"+this.currentOffset()+"px")}}});
AC.namespace("AC.Ambient.Mixins");AC.Ambient.Mixins.CSSEventResponding={__setupMixin:function ac___setupMixin(){var b=this.__canPlay.bind(this);
this.options().didPlayOnAnimationEnd=this.__validateCSSEventOption(this.options().didPlayOnAnimationEnd);
this.options().didPlayOnTransitionEnd=this.__validateCSSEventOption(this.options().didPlayOnTransitionEnd);
if(isNaN(this.options().didPlayOnAnimationEnd)){throw"Incorrect value for option: didPlayOnAnimationEnd"
}if(isNaN(this.options().didPlayOnTransitionEnd)){throw"Incorrect value for option: didPlayOnTransitionEnd"
}this.__resetCSSEventCount();this.__setUpCSSEventListeners();this.__canPlay=function(){b();
if(typeof this._canPlay!=="boolean"){if((this.options().didPlayOnAnimationEnd&&!AC.Environment.Feature.cssPropertyAvailable("animation"))||(this.options().didPlayOnTransitionEnd&&!AC.Environment.Feature.cssPropertyAvailable("transition"))){this.setCanPlay(false)
}}}},__resetCSSEventCount:function ac___resetCSSEventCount(b){this.__animationEndEvents=0;
this.__transitionEndEvents=0;this.__totalCSSEvents=0;this.__totalCSSEvents+=this.options().didPlayOnAnimationEnd;
this.__totalCSSEvents+=this.options().didPlayOnTransitionEnd},__validateCSSEventOption:function ac___validateCSSEventOption(b){if(b===true){return 1
}else{if(b===false){return 0}}return parseInt(b,10)},__respondToCSSEvent:function ac___respondToCSSEvent(e){var d;
var f;if(e.type.match(/animation/i)){this.__animationEndEvents+=1;if(this.options().didPlayOnAnimationEnd<this.__animationEndEvents){AC.log(this.name()+": more animationEnd events fired than expected.")
}}else{this.__transitionEndEvents+=1;if(this.options().didPlayOnTransitionEnd<this.__transitionEndEvents){AC.log(this.name()+": Warning! more transitionEnd events fired than expected.")
}}if((this.__animationEndEvents+this.__transitionEndEvents)===this.__totalCSSEvents){if(e.type.match(/animation/i)){if(this.options().didPlayOnAnimationEnd>this.__animationEndEvents){AC.log(this.name()+": fewer animationEnd events fired than expected.")
}}else{if(this.options().didPlayOnTransitionEnd>this.__transitionEndEvents){AC.log(this.name()+": fewer transitionEnd events fired than expected.")
}}this.didPlay()}},__setUpCSSEventListeners:function ac___setUpCSSEventListeners(){this.__boundRespondToCSSEvent=AC.Function.bindAsEventListener(this.__respondToCSSEvent,this);
if(this.options().didPlayOnAnimationEnd>0){AC.Element.addVendorPrefixEventListener(this.container(),"animationEnd",this.__boundRespondToCSSEvent)
}if(this.options().didPlayOnTransitionEnd>0){AC.Element.addVendorPrefixEventListener(this.container(),"transitionEnd",this.__boundRespondToCSSEvent)
}}};AC.Ambient.Mixins.Scroll={__setupMixin:function ac___setupMixin(){this.__createShowOnScroll()
},__createShowOnScroll:function ac___createShowOnScroll(){if(typeof AC.ShowOnScroll==="undefined"){throw"AC.ShowOnScroll not included on page."
}this._showOnScroll=new AC.ShowOnScroll(this.container(),this.options().showOnScrollOptions);
this._showOnScroll.setDelegate(this)},scrolledIntoView:function ac_scrolledIntoView(b){this.__runDelegate("scrolledIntoView")
},scrolledOutOfView:function ac_scrolledOutOfView(b){this.__runDelegate("scrolledOutOfView")
},scrolledIntoViewCompletely:function ac_scrolledIntoViewCompletely(d,c){this.__runDelegate("scrolledIntoViewCompletely")
},scrolledOutOfViewCompletely:function ac_scrolledOutOfViewCompletely(d,c){this.__runDelegate("scrolledOutOfViewCompletely")
},scrolledIntoViewPastThreshold:function ac_scrolledIntoViewPastThreshold(e,g,h,f){this.__runDelegate("scrolledIntoViewPastThreshold")
},scrolledOutOfViewPastThreshold:function ac_scrolledOutOfViewPastThreshold(e,g,h,f){this.__runDelegate("scrolledOutOfViewPastThreshold")
},visitorEngaged:function ac_visitorEngaged(e,g,h,f){this.__runDelegate("visitorEngaged");
if(this.options().playOnVisitorEngaged===true){this.play()}},scrolledWhileInView:function ac_scrolledWhileInView(e,f,d){this.__runDelegate("onScroll")
}};AC.namespace("AC.Ambient.AnalyticsController.Plugins");AC.Ambient.AnalyticsController.Plugins.sCode={track:function ac_track(e,h){var g=e.ambientContent;
var f;if(!AC.Tracking||!(typeof AC.Tracking.pageName==="function"&&typeof AC.Tracking.pageName()==="string")){throw"AC.Tracking not correctly initialized on page."
}if(typeof AC.Tracking.trackClick!=="function"){throw"apple_core.js required for anayltics tracking using s_code."
}if(typeof this[h]==="function"){f=this[h](e);if(f!==false){this.submit(g,f)}}},submit:function ac_submit(f,d){if(typeof d==="object"){AC.Tracking.trackClick(d,f,"o",d.prop13)
}if(typeof d==="string"){var e={prop13:(d+": "+AC.Tracking.pageName()+" - "+f.name())};
AC.Tracking.trackClick(e,f,"o",e.prop13)}},visitorEngaged:function ac_visitorEngaged(b){if(typeof b.visitorEngaged==="function"){b.visitorEngaged(b);
return false}if(!b.ambientContent.visitorWasEngaged()){b.ambientContent.setVisitorWasEngaged(true);
return"visitorEngaged"}return false},play:function ac_play(b){if(typeof b.play==="function"){b.play(b);
return false}return"v@s"},replay:function ac_replay(b){if(typeof b.replay==="function"){b.replay(b);
return false}return"v@r"},ended:function ac_ended(b){if(typeof b.ended==="function"){b.ended(b);
return false}return"v@e"},cancelled:function ac_cancelled(b){if(typeof b.cancelled==="function"){b.cancelled(b);
return false}if(!b.currentTime){throw new TypeError("AC.Ambient.AnalyticsController.Plugins.sCode: ‘cancelled’ function expects currentTime in event data")
}return"v@c - "+(Math.round(b.currentTime*100)/100)+"s"}};AC.Ambient.version="1.0";
AC.define("ipad/lib/ac_ambient/ac_ambient",function(){});AC.define("AC/Ambient",["require","ipad/lib/ac_ambient/ac_ambient"],function(b){b("ipad/lib/ac_ambient/ac_ambient");
return AC.Ambient});AC.define("app-store/HeroGallery",["require","AC/Ambient"],function(f){var g=f("AC/Ambient");
var h=AC.Retina.sharedInstance().shouldReplace("img-tag");var e=function(){this.__initClassname="init";
this.__buildClassname="build";this.__wrapper=AC.Element.getElementById("app-gallery-scroller");
this.__gallery=AC.Element.getElementById("app-gallery");this.__startApp=AC.Element.getElementById("avokiddo");
this.__gallCaptions=AC.Element.getElementById("captions");this.__gallTransition=AC.Element.getVendorPrefixStyle(this.__gallery,"transition");
this.__touchAvailable=AC.Environment.Feature.touchAvailable();this.__enhancedGallery=false;
this.__apps=AC.Element.selectAll(".app",this.__gallery);this.__initApps=AC.Element.selectAll("."+this.__initClassname,this.__gallery);
AC.Element.addClassName(this.__startApp,"start-app");this._ambient=new g(this.__gallery);
this._ambient.setDelegate(this);this._ambientCaptions=new g(this.__gallCaptions);
this._ambientCaptions.setDelegate(this);AC.Object.synthesize(this)};e.prototype={initGallery:function(){var a=new AC.ViewMaster.SlideViewer(AC.Element.selectAll(".app-gallery-content"),"app-gallery","app-gallery-trigger",{addSectionIdAsClassName:true,discontinuousPreviousNext:true,heightFromFirstSection:false,imageLinkAutoCaptions:true,initialId:"avokiddo",manageZ:true,silentTriggers:true,useHTML5Tags:true,useKeyboardNav:true,useTouchEvents:false});
this.__slideshow=new AC.ViewMaster.Slideshow(a,null,{autoplay:false,delay:3000});
a.setDelegate(this);if(!this.__touchAvailable){this.__apps.forEach(function(b){AC.Element.addEventListener(b,"mouseover",function(){if(!AC.Element.hasClassName(b,"active")){AC.Element.addClassName(b,"hover")
}});AC.Element.addEventListener(b,"mouseout",function(){if(!AC.Element.hasClassName(b,"active")){AC.Element.removeClassName(b,"hover")
}})})}},didShow:function(c,a,b){if(a){if(this.__enhancedGallery){this.toggleThumb(a)
}var d=AC.Element.select(".paddle-nav");AC.Element.removeClassName(d,"disabled")
}},toggleThumb:function(a){window.setTimeout(function(){var c=AC.Element.select(".thumb",a.content);
AC.Element.addClassName(c,"show");var b=AC.Element.select(".device",a.content);
AC.Element.addClassName(b,"hide")}.bind(this),10)},toggleDevice:function(a){var b=AC.Element.select(".thumb",a.content);
AC.Element.removeClassName(b,"show");var c=AC.Element.select(".device",a.content);
AC.Element.removeClassName(c,"hide")},willShow:function(r,b,c,v,a,j){if(this.__enhancedGallery){this.toggleDevice(c);
this.__apps.forEach(function(i){AC.Element.removeClassName(i,"move-left");AC.Element.removeClassName(i,"move-right");
AC.Element.removeClassName(i,"move-left-vert");AC.Element.removeClassName(i,"move-right-vert")
}.bind(this))}AC.Element.addClassName(c.content,"active");AC.Element.removeClassName(c.content,"hover");
var q=AC.Element.select(".screen",c.content);var s=q.getAttribute("data-src");var t="j";
if(!AC.Element.hasClassName(q,"loaded")){if(h){var u=s.replace("."+t+"pg","_2x."+t+"pg");
q.setAttribute("src",u);AC.Element.addClassName(q,"loaded")}else{q.setAttribute("src",s);
AC.Element.addClassName(q,"loaded")}}var d=c.content;this._spreadApps(d);if(r._currentTrigger){this.__slideshow.stop()
}},_spreadApps:function(c){function d(n,j){var i=[];while(n=n.nextSibling){if(!j||j(n)){i.push(n)
}}return i}function a(n,j){var i=[];while(n=n.previousSibling){if(!j||j(n)){i.push(n)
}}return i}function b(i){switch(i.nodeName.toUpperCase()){case"DIV":return true;
case"FIGURE":return true;default:return false}}var k=a(c,b);var l=d(c,b);if(this.__enhancedGallery){if(AC.Element.hasClassName(c,"vert")){k.forEach(function(i){AC.Element.addClassName(i,"move-left-vert")
}.bind(this));l.forEach(function(i){AC.Element.addClassName(i,"move-right-vert")
}.bind(this))}else{k.forEach(function(i){AC.Element.addClassName(i,"move-left")
}.bind(this));l.forEach(function(i){AC.Element.addClassName(i,"move-right")}.bind(this))
}}if(this.__touchAvailable){this.loadScreens(l,0,2);this.displaySlides(l,0,2)}else{this.loadScreens(l,0,7);
this.displaySlides(l,0,7)}},_animate:function(c,a,b){if(b==0){c.setVendorPrefixStyle("transition","none")
}else{c.setVendorPrefixStyle("transition",this.__gallTransition)}c.setAttribute("left",a);
if(AC.Detector.supportsThreeD()){c.setVendorPrefixStyle("transform","translate3d("+a+"px, 0, 0)")
}else{c.setVendorPrefixStyle("transform","translate("+a+"px, 0)")}},_animation:function(q,r,t,u,a,s){var c=q.view.view(),v=c.offsetLeft||0,d=this._offsetLeft(t)||0;
t.setOpacity(1);var b=this;if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this._animate(c,d,s);
var p=function(i){if(i.target==c&&i.propertyName.match(/transform$/i)){c.removeVendorEventListener("transitionEnd",p,false);
u()}};c.addVendorEventListener("transitionEnd",p,false)}else{return new Effect.Move(c,{x:d-v,y:0,duration:s,afterFinish:function(){u()
},queue:{scope:a}})}},_offsetLeft:function(b){if(this.__wrapperCenterPoint===undefined){this.__wrapperCenterPoint=(AC.Element.getBoundingBox(this.__wrapper).width/2)-224
}if(this.__enhancedGallery){var a=AC.Element.hasClassName(b,"vert")?266:289}else{var a=AC.Element.hasClassName(b,"vert")?-15:70
}return((b.offsetLeft+a)*-1)+this.__wrapperCenterPoint},willAnimate:function(a,l,b,c,d,k){this._animation(a,l,b,c,d,k)
},canPlay:function(){if(AC.Environment.Feature.cssPropertyAvailable("transform")&&AC.Environment.Browser.name!="IE"){AC.Element.addClassName(this.__gallery,"transforms");
AC.Element.addClassName(this.__gallCaptions,"transforms");this.__enhancedGallery=true
}return this.__touchAvailable||AC.Environment.Feature.isDesktop()},loadScreens:function(c,a,b){var d=c.slice(a,b);
var j="j";d.forEach(function(o){var i=AC.Element.select(".device",o);AC.Element.addClassName(i,"display");
var r=AC.Element.select(".screen",o);var p=r.getAttribute("data-src");if(!AC.Element.hasClassName(r,"loaded")){if(h){var q=p.replace("."+j+"pg","_2x."+j+"pg");
r.setAttribute("src",q);AC.Element.addClassName(r,"loaded")}else{r.setAttribute("src",p);
AC.Element.addClassName(r,"loaded")}}})},displaySlides:function(c,a,b){var d=c.slice(a,b);
d.forEach(function(j){AC.Element.addClassName(j,"display")})},play:function(){if(!this.__enhancedGallery){var a=AC.Element.select(".thumb",this.__startApp);
AC.Element.addClassName(a,"show")}this.__initApps.forEach(function(b){AC.Element.addClassName(b,"display")
}.bind(this));this.__initApps.forEach(function(b){AC.Element.removeClassName(b,this.__initClassname)
}.bind(this));window.setTimeout(function(){this.initGallery();if(this.__enhancedGallery){this.__initApps.forEach(function(b){AC.Element.removeClassName(b,this.__buildClassname)
}.bind(this))}}.bind(this),1440);if(this.__enhancedGallery){window.setTimeout(function(){this._spreadApps(this.__startApp)
}.bind(this),1440)}window.setTimeout(function(){var b=AC.Element.selectAll(".arrow",this.__gallery.parentNode);
b.forEach(function(c){AC.Element.addClassName(c,"active")})}.bind(this),1330);if(this.__enhancedGallery){window.setTimeout(function(){AC.Element.removeClassName(this.__gallery,this.__initClassname)
}.bind(this),2000)}window.setTimeout(function(){if(this.__touchAvailable){this.loadScreens(this.__apps,0,2);
this.displaySlides(this.__apps,0,2)}else{this.loadScreens(this.__apps,0,7);this.displaySlides(this.__apps,9,16)
}}.bind(this),2700)}};return e});AC.define("app-store/bootstrap",["require","app-store/HeroGallery"],function(d){var c=d("app-store/HeroGallery");
AC.onDOMReady(function(){var a=AC.Environment.Feature.touchAvailable();var b=new c();
if(AC.Environment.Browser.name=="IE"){window.setTimeout(b.ambient().play.bind(b.ambient()),0)
}else{window.setTimeout(b.ambient().play.bind(b.ambient()),250)}})});