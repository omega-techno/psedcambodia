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
}new c(b,g)})})});AC.Ambient=AC.Class({__defaultOptions:{classNamePrefix:"ac-ambient-",delayBeforePlay:true,delayBeforeDidPlay:0,didPlayOnAnimationEnd:false,didPlayOnTransitionEnd:false,analytics:false},initialize:function ac_initialize(d,f,e){this._options=this.__mergeOptions(f);
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
return AC.Ambient});AC.define("ipad/shared/batteryclock/BatteryClock",[],function(){var c=function(){var b=document.createElement("canvas");
var a=!!(b.getContext&&b.getContext("2d"));c=function(){return a};return a};var d=function(){var a=(typeof document.body.style.webkitTransform==="string"||typeof document.body.style.MozTransform==="string"||typeof document.body.style.msTransform==="string"||typeof document.body.style.OTransform==="string"||typeof document.body.style.transform==="string");
d=function(){return a};return a};AC.BatteryClock=Class.create({__defaultOptions:{duration:4,radius:62.5,angleHours:300,angleMinutes:3600,initialHours:0,initialMinutes:0,backgroundAngleHours:0,animationTimingFunction:function(i,j,a,b){i/=b/2;
if(i<1){return a/2*i*i+j}i-=1;return -a/2*(i*(i-2)-1)+j},fillStyle:"#000",animatedFillStyle:"#88ec6e"},initialize:function(h,a,g){if(!c()||!d()||AC.Environment.Feature.touchAvailable()||AC.Environment.Browser.name==="Safari"){return false
}if(typeof g!=="object"){g={}}this._options=Object.extend(Object.clone(this.__defaultOptions),g);
this._hasAnimated=false;this._elements={};this._elements.container=$(h);this._canvas=document.createElement("canvas");
this._canvas.width=this._options.radius*2;this._canvas.height=this._options.radius*2;
this._elements.container.appendChild(this._canvas);this._context=this._canvas.getContext("2d");
this._elements.min_hand=$("clock-hand-minute");this._elements.hour_hand=$("clock-hand-hour");
this._elements.container.addClassName("enhanced");this.draw(0,true);var b=(AC.Environment.Browser.name==="Safari Mobile"&&AC.Environment.Feature.isRetina())?2.8:1;
this._showOnScroll=new AC.ShowOnScroll($(a),{timeInView:b});this._showOnScroll.setDelegate(this);
Object.synthesize(this)},__addImage:function(a){var b=new Element("img");b.src=a;
this._elements.container.appendChild(b);return b},draw:function(r,o){this.duration=this._options.duration*1000;
this.initialHours=this._options.initialHours;this.initialMinutes=this._options.initialMinutes;
this.currentAnimationTime=0;var a=(AC.Environment.Browser.name==="IE")?"":" translateZ(0)";
var q=0;var t=0;var s=0;var v={x:this._canvas.width/2,y:this._canvas.height/2};
var b=0;var u=1.57;var n=0;var p;this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
this.currentAnimationTime=(this.startTime)?new Date().getTime()-this.startTime:0;
t=this._options.animationTimingFunction(this.currentAnimationTime,this.initialHours,this._options.angleHours,this.duration);
s=this._options.animationTimingFunction(this.currentAnimationTime,this.initialMinutes,this._options.angleMinutes,this.duration);
q=(t*Math.PI/180);b=(this._options.backgroundAngleHours*Math.PI/180);p=(this._options.initialHours*Math.PI/180);
this._elements.hour_hand.setVendorPrefixStyle("transform","rotate("+t+"deg)"+a);
this._elements.min_hand.setVendorPrefixStyle("transform","rotate("+s+"deg)"+a);
this._context.beginPath();this._context.fillStyle=this._options.animatedFillStyle;
this._context.arc(v.x,v.y,this._options.radius-n,-u,q-1.57,false);this._context.lineTo(v.x,v.y);
this._context.closePath();this._context.fill();if(this.currentAnimationTime<this.duration&&o!==true){requestAnimationFrame(this.draw.bind(this))
}else{if(this.currentAnimationTime>=this.duration&&o!==true){AC.NotificationCenter.publish("clock-animation-complete",{target:this,data:{}},false)
}}},animate:function(){this.startTime=new Date().getTime();this.draw();this._hasAnimated=true
},visitorEngaged:function(){if(!this._hasAnimated){this.animate()}}});return AC.BatteryClock
});AC.define("ipad/shared/ac_autogallery/Types/cases",[],function(){var f=AC.Element;
var d=AC.AutoGallery;var e=function(b){var i={},a,j;for(a=0,j=b.length;a<j;a+=1){if(b[a].name.indexOf("data-")===0){var c=b[a].name;
i[c]=b[a].value}}return i};d.addType("cases",{},function(){},"image-fadein",{delegate:{_links:[],_deviceLinks:[],_caseLinks:[],getDefaultDeviceColor:function(){var i,j;
var b=this.viewer.view.view().getAttribute("data-autogallery-cases-default-device-color")||"";
var c=this._deviceLinks[0].getAttribute("data-color")||"";var a="";for(i=0,j=this.viewer.orderedSections.length;
i<j;i+=1){if(!this.viewer.orderedSections[i].match("-default")){a=this.viewer.orderedSections[i].split("-")[2];
break}}return(b!=="")?b:(c!=="")?c:a},getDefaultCaseColor:function(){var i,j;var b=this.viewer.view.view().getAttribute("data-autogallery-cases-default-case-color")||"";
var c=this._caseLinks[0].getAttribute("data-color")||"";var a="";for(i=0,j=this.viewer.orderedSections.length;
i<j;i+=1){if(!this.viewer.orderedSections[i].match("-default")){a=this.viewer.orderedSections[i].split("-")[3];
break}}return(b!=="")?b:(c!=="")?c:a},getCurrentDeviceColorFromId:function(a){var b=a.split("-");
if(b[2]&&b[2]!=="default"){return b[2]}return this.getDefaultDeviceColor()},getCurrentCaseColorFromId:function(a){var b=a.split("-");
if(b[3]&&b[3]!=="default"){return b[3]}return this.getDefaultCaseColor()},activateLinksForSectionId:function(b){var c,i;
var j=this.getCurrentDeviceColorFromId(b);var a=this.getCurrentCaseColorFromId(b);
for(c=0,i=this._deviceLinks.length;c<i;c+=1){if(j===this._deviceLinks[c].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._deviceLinks[c].className+=" active"
}else{this._deviceLinks[c].className=this._deviceLinks[c].className.replace(/active/g,"").replace(/  /g," ")
}}for(c=0,i=this._caseLinks.length;c<i;c+=1){if(a===this._caseLinks[c].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._caseLinks[c].className+=" active"
}else{this._caseLinks[c].className=this._caseLinks[c].className.replace(/active/g,"").replace(/  /g," ")
}}},setLinksHrefValuesForSectionId:function(b){var c,i;var j=this.getCurrentDeviceColorFromId(b);
var a=this.getCurrentCaseColorFromId(b);for(c=0,i=this._deviceLinks.length;c<i;
c+=1){this._deviceLinks[c].setAttribute("href","#"+this.viewer.triggerClassName+"-"+this._deviceLinks[c].getAttribute("data-color")+"-"+a)
}for(c=0,i=this._caseLinks.length;c<i;c+=1){this._caseLinks[c].setAttribute("href","#"+this.viewer.triggerClassName+"-"+j+"-"+this._caseLinks[c].getAttribute("data-color"))
}},copySectionDataAttributesToRemoteContent:function(a){var b,c,i,n,m,l;b=f.select("img",a.content)||a.content;
c=a.triggers();for(i=0,n=c.length;i<n;i+=1){m=e(c[i].attributes);for(l in m){b.setAttribute(l,m[l])
}}},willShow:function(a,b,c){if(c&&c.id){this.activateLinksForSectionId(c.id)}},didAppendContent:function(a,b){var c=a.currentSection.triggers(),i,m,n,l;
for(i=0,m=c.length;i<m;i+=1){if(c[i].getAttribute("data-screen-src")){n=c[i].getAttribute("data-screen-src");
break}}if(n){l=new Image();l.src=n;l.className="screen";b.appendChild(l)}},didShow:function(b,i,k){var c,l,a;
this.viewer=b;if(!this._didShowInitial){a=this.viewer.view.view().up(".autogallery");
if(a){this._deviceLinks=f.selectAll(".color-nav-devices a",a);this._caseLinks=f.selectAll(".color-nav-cases a",a);
this._links=this._deviceLinks.concat(this._caseLinks)}for(c=0,l=this._links.length;
c<l;c+=1){f.addClassName(this._links[c],this.viewer.triggerClassName)}}if(k&&k.id){this.copySectionDataAttributesToRemoteContent(k);
this.setLinksHrefValuesForSectionId(k.id);if(!this._didShowInitial&&this.viewer.currentSection&&this.viewer.currentSection.id.indexOf("-default")<0){this.activateLinksForSectionId(k.id);
this.viewer.view.view().style.height=AC.Element.getBoundingBox(k.content).height+"px";
this.didAppendContent(this.viewer,k.content)}}this._didShowInitial=true}}})});AC.define("ipad/shared/parallax/parallax",["require"],function(b){if(!(AC.Environment.Browser.name==="IE"&&AC.Environment.Browser.version<9)&&!AC.Environment.Feature.isRetina()){AC.Element.selectAll(".parallax").forEach(function(f){var e={distance:500};
if(f.getAttribute("data-parallax-offset")){e.offsetTop=parseInt(f.getAttribute("data-parallax-offset"),10)
}if(f.getAttribute("data-parallax-distance")){e.distance=parseInt(f.getAttribute("data-parallax-distance"),10)
}if(!AC.Environment.Feature.touchAvailable()){var a=new AC.Ambient.TrackElement(f,AC.Element.select("img",f),e)
}})}});AC.define("features/bootstrap",["require","ipad/shared/section_engagement/track_section_engagement","AC/Ambient","ipad/shared/batteryclock/BatteryClock","ipad/shared/ac_autogallery/Types/cases","ipad/shared/parallax/parallax"],function(g){g("ipad/shared/section_engagement/track_section_engagement");
var h=g("AC/Ambient");var f=g("ipad/shared/batteryclock/BatteryClock");var j=g("ipad/shared/ac_autogallery/Types/cases");
var i=g("ipad/shared/parallax/parallax");AC.onDOMReady(function(){var a=new f("clock-wrapper",$("clock-wrapper"))
})});