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
return AC.ShowOnScroll});AC.define("iphone/shared/parallax/player/ShowOnScroll",["require","AC/ShowOnScroll"],function(a){var c=a("AC/ShowOnScroll");
function b(e,d){this._clipsData=e;this._scrollTarget=d;this._showOnScrolls=[];this._isTicking=false
}b.prototype={__createShowOnScroll:function(d){var e=new c(d.element,{scrollTarget:this._scrollTarget});
e.setDelegate({scrolledWhileInView:this.__scrolledWhileInView.bind(this,d.clip)});
this._showOnScrolls.push(e);e.__onScroll()},__scrolledWhileInView:function(g,e,f,d){this.__update(g,d)
},__update:function(e,d){var f=e.getDuration()*d;e.setCurrentTime(f)},activate:function(){this._clipsData.forEach(this.__createShowOnScroll.bind(this))
},deactivate:function(){this._showOnScrolls.forEach(function(d){d.stopObserving()
})}};return b});AC.define("iphone/shared/parallax/renderer/Transition3D",["require"],function(b){function a(e,d,c){this._element=e;
this._tween=d;this._lastDrawY;d.props.forEach(function(f){this["_"+f.property]=f.from
}.bind(this));this._isTransitioning=false;this._transitionEndTimeout;this._transitionDuration=c||100;
this.__bindTransition()}a.prototype={__onTransitionEnd:function(){window.clearTimeout(this._transitionEndTimeout);
this._isTransitioning=false},__bindTransition:function(){var c=this._element;AC.Element.setVendorPrefixStyle(c,"transition","-webkit-transform "+this._transitionDuration+"ms linear");
AC.Element.addVendorPrefixEventListener(c,"transitionEnd",this.__onTransitionEnd.bind(this))
},__translate:function(c,e){var d=this._element;this._isTransitioning=true;AC.Element.setVendorPrefixStyle(d,"transform","translate3d("+c+"px, "+e+"px, 0)");
this._x=c;this._y=e;this._transitionEndTimeout=window.setTimeout(this.__onTransitionEnd.bind(this),this._transitionDuration)
},__draw:function(d){var h;var f;var g;var c=d.x||0;var i=d.y||0;var e=this._element;
f=Math.abs(this._y-i);g=Math.abs(this._x-c);h=Math.sqrt(f*f+g*g);if(this._isTransitioning===true){return
}this.__translate(c,i)},activate:function(){this._boundDraw=this.__draw.bind(this);
this._tween.on("tween_update",this._boundDraw)},deactivate:function(){this._tween.off("tween_update",this._boundDraw);
this._boundDraw=null}};return a});AC.define("iphone/shared/parallax/renderer/Translate3D",["require"],function(a){function b(d,c){this._element=d;
this._tween=c;this._lastDrawY;c.props.forEach(function(e){this["_"+e.property]=e.from
}.bind(this));this._isTicking=false}b.prototype={__translate:function(c,g){var f=this._element;
var e=Math.round(c*10)/10;var d=Math.round(g*10)/10;if(e===this._x&&d===this._y){return
}if(this._isTicking===false){window.requestAnimationFrame(function(){AC.Element.setVendorPrefixStyle(f,"transform","translate3d("+e+"px, "+d+"px, 0)");
this._x=e;this._y=d;this._isTicking=false}.bind(this))}this._isTicking=true},__draw:function(d){var h;
var f;var g;var c=d.x||0;var i=d.y||0;var e=this._element;this.__translate(c,i)
},activate:function(){this._boundDraw=this.__draw.bind(this);this._tween.on("tween_update",this._boundDraw)
},deactivate:function(){this._tween.off("tween_update",this._boundDraw);this._boundDraw=null
}};return b});
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
AC.define("animationSequencer/vendor/KeySpline",[],function(){function a(k,h,j,f){this.get=function(l){if(k===h&&j===f){return l
}return c(g(l),h,f)};function e(l,m){return 1-3*m+3*l}function d(l,m){return 3*m-6*l
}function b(l){return 3*l}function c(n,l,m){return((e(l,m)*n+d(l,m))*n+b(l))*n}function i(n,l,m){return 3*e(l,m)*n*n+2*d(l,m)*n+b(l)
}function g(o){var m=o;for(var n=0;n<4;++n){var p=i(m,k,j);if(p===0){return m}var l=c(m,k,j)-o;
m-=l/p}return m}}return a});AC.define("animationSequencer/vendor/EasingFunctions",[],function(){var t={linear:function B(J,H,I,G){return I*J/G+H
},easeInQuad:function l(J,H,I,G){return I*(J/=G)*J+H},easeOutQuad:function b(J,H,I,G){return -I*(J/=G)*(J-2)+H
},easeInOutQuad:function u(J,H,I,G){if((J/=G/2)<1){return I/2*J*J+H}return -I/2*((--J)*(J-2)-1)+H
},easeInCubic:function q(J,H,I,G){return I*(J/=G)*J*J+H},easeOutCubic:function g(J,H,I,G){return I*((J=J/G-1)*J*J+1)+H
},easeInOutCubic:function f(J,H,I,G){if((J/=G/2)<1){return I/2*J*J*J+H}return I/2*((J-=2)*J*J+2)+H
},easeInQuart:function h(J,H,I,G){return I*(J/=G)*J*J*J+H},easeOutQuart:function F(J,H,I,G){return -I*((J=J/G-1)*J*J*J-1)+H
},easeInOutQuart:function D(J,H,I,G){if((J/=G/2)<1){return I/2*J*J*J*J+H}return -I/2*((J-=2)*J*J*J-2)+H
},easeInQuint:function k(J,H,I,G){return I*(J/=G)*J*J*J*J+H},easeOutQuint:function a(J,H,I,G){return I*((J=J/G-1)*J*J*J*J+1)+H
},easeInOutQuint:function E(J,H,I,G){if((J/=G/2)<1){return I/2*J*J*J*J*J+H}return I/2*((J-=2)*J*J*J*J+2)+H
},easeInSine:function o(J,H,I,G){return -I*Math.cos(J/G*(Math.PI/2))+I+H},easeOutSine:function d(J,H,I,G){return I*Math.sin(J/G*(Math.PI/2))+H
},easeInOutSine:function x(J,H,I,G){return -I/2*(Math.cos(Math.PI*J/G)-1)+H},easeInExpo:function c(J,H,I,G){return(J===0)?H:I*Math.pow(2,10*(J/G-1))+H
},easeOutExpo:function A(J,H,I,G){return(J===G)?H+I:I*(-Math.pow(2,-10*J/G)+1)+H
},easeInOutExpo:function n(J,H,I,G){if(J===0){return H}if(J===G){return H+I}if((J/=G/2)<1){return I/2*Math.pow(2,10*(J-1))+H
}return I/2*(-Math.pow(2,-10*--J)+2)+H},easeInCirc:function p(J,H,I,G){return -I*(Math.sqrt(1-(J/=G)*J)-1)+H
},easeOutCirc:function e(J,H,I,G){return I*Math.sqrt(1-(J=J/G-1)*J)+H},easeInOutCirc:function y(J,H,I,G){if((J/=G/2)<1){return -I/2*(Math.sqrt(1-J*J)-1)+H
}return I/2*(Math.sqrt(1-(J-=2)*J)+1)+H},easeInElastic:function w(K,M,I,L){var H=1.70158;
var J=0;var G=I;if(K===0){return M}if((K/=L)===1){return M+I}if(!J){J=L*0.3}if(G<Math.abs(I)){G=I;
H=J/4}else{H=J/(2*Math.PI)*Math.asin(I/G)}return -(G*Math.pow(2,10*(K-=1))*Math.sin((K*L-H)*(2*Math.PI)/J))+M
},easeOutElastic:function v(K,M,I,L){var H=1.70158;var J=0;var G=I;if(K===0){return M
}if((K/=L)===1){return M+I}if(!J){J=L*0.3}if(G<Math.abs(I)){G=I;H=J/4}else{H=J/(2*Math.PI)*Math.asin(I/G)
}return G*Math.pow(2,-10*K)*Math.sin((K*L-H)*(2*Math.PI)/J)+I+M},easeInOutElastic:function z(K,M,I,L){var H=1.70158;
var J=0;var G=I;if(K===0){return M}if((K/=L/2)===2){return M+I}if(!J){J=L*(0.3*1.5)
}if(G<Math.abs(I)){G=I;H=J/4}else{H=J/(2*Math.PI)*Math.asin(I/G)}if(K<1){return -0.5*(G*Math.pow(2,10*(K-=1))*Math.sin((K*L-H)*(2*Math.PI)/J))+M
}return G*Math.pow(2,-10*(K-=1))*Math.sin((K*L-H)*(2*Math.PI)/J)*0.5+I+M},easeInBack:function s(J,G,I,K,H){if(H===undefined){H=1.70158
}return I*(J/=K)*J*((H+1)*J-H)+G},easeOutBack:function j(J,G,I,K,H){if(H===undefined){H=1.70158
}return I*((J=J/K-1)*J*((H+1)*J+H)+1)+G},easeInOutBack:function C(J,G,I,K,H){if(H===undefined){H=1.70158
}if((J/=K/2)<1){return I/2*(J*J*(((H*=(1.525))+1)*J-H))+G}return I/2*((J-=2)*J*(((H*=(1.525))+1)*J+H)+2)+G
},easeInBounce:function r(J,H,I,G){return I-t.easeOutBounce(G-J,0,I,G)+H},easeOutBounce:function i(J,H,I,G){if((J/=G)<(1/2.75)){return I*(7.5625*J*J)+H
}else{if(J<(2/2.75)){return I*(7.5625*(J-=(1.5/2.75))*J+0.75)+H}else{if(J<(2.5/2.75)){return I*(7.5625*(J-=(2.25/2.75))*J+0.9375)+H
}else{return I*(7.5625*(J-=(2.625/2.75))*J+0.984375)+H}}}},easeInOutBounce:function m(J,H,I,G){if(J<G/2){return t.easeInBounce(J*2,0,I,G)*0.5+H
}return t.easeOutBounce(J*2-G,0,I,G)*0.5+I*0.5+H}};return t});AC.define("eventEmitter/EventEmitter",[],function(){var d=function(f){this.context=f
};var c=d.prototype;var b=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var a=function(g,i){var j=g[0];var k=g[1];var h=g[2];if(typeof j==="object"){for(var f in j){i.call(this,f,j[f],h)
}}if(typeof j==="string"){j=j.split(" ");j.forEach(function(l){i.call(this,l,k,h)
},this)}};var e=function(j,k){var f;var g;var h;f=b.call(this)[j];if(!f){return
}for(g=0,h=f.length;g<h;g++){if(k(f[g],g)){break}}};c.on=function(){var f=b.call(this);
a.call(this,arguments,function(h,i,g){f[h]=f[h]||(f[h]=[]);f[h].push({callback:i,context:g})
});return this};c.once=function(){a.call(this,arguments,function(g,i,f){var h=function(j){i.call(f||this,j);
this.off(g,h)};this.on(g,h,this)});return this};c.off=function(h,j){var g=b.call(this);
if(arguments.length===0){g={};return this}if(arguments.length===1&&g[h]){g[h]=[];
return this}var f=-1;e.call(this,h,function(k,i){f=i;if(k.callback===j){return true
}});if(f===-1){return}g[h].splice(f,1);return this};c.trigger=function(f,g){f=f.split(" ");
f.forEach(function(h){e.call(this,h,function(i){i.callback.call(i.context||this.context||this,g)
}.bind(this))},this);return this};return d});AC.define("animationSequencer/clip/BaseClip",["require","animationSequencer/vendor/KeySpline","animationSequencer/vendor/EasingFunctions","eventEmitter/EventEmitter"],function(c){var h=c("animationSequencer/vendor/KeySpline");
var f=c("animationSequencer/vendor/EasingFunctions");var b="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var a="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var e=c("eventEmitter/EventEmitter");function g(j,i){this.options=i||{};this._duration=j;
this._currentTime=0;this._easingFunction=this._createEasing(this.options.easing||g.DEFAULT_EASING)
}g.DEFAULT_EASING="linear";var d=g.prototype=new e();d._createEasing=function(i){var j;
if(typeof i==="string"){j=this._createPredefinedEasing(i)}else{if(Array.isArray(i)){j=this._createBezierEasing(i)
}else{if(typeof i==="function"){j=i}else{throw new TypeError(b+i)}}}return j};d._createBezierEasing=function(i){var k;
var l=i;var j=i.every(function(m){return(typeof m==="number")});if(i.length!==4||!j){throw new TypeError(a+i)
}k=new h(l[0],l[1],l[2],l[3]);return function(m,p,o,n){return k.get(m/n)*o}};d._createPredefinedEasing=function(k){var j=f[k];
var i="";if(!j){i+='Easing function "'+j;i+='" not recognized among the following: ';
i+=Object.keys(f).join(", ");throw new Error(i)}return j};d._getInterpolatedValue=function(i,l,k,j){return this._easingFunction(i,l,k,j)
};d.getDuration=function(){return this._duration};d.getCurrentTime=function(){return this._currentTime
};d.setCurrentTime=function(i){this._currentTime=i};return g});AC.define("animationSequencer/clip/TweenClip",["require","animationSequencer/clip/BaseClip"],function(b){var d=b("animationSequencer/clip/BaseClip");
function a(g,f,e){d.call(this,g,e);this.props=f||[];this._initializePropEasing();
this._lastComputedTime=0;this._easingDirection=1}a.create=function(e){return new a(e.selector,e.duration,e.props)
};a.validate=function(e){return(typeof e.selector==="string")&&Array.isArray(e.props)
};a.DEFAULT_EASING="linear";var c=a.prototype=new d();c._initializePropEasing=function(){this.props.forEach(function(e){e.easing=this._createEasing(e.easing||d.DEFAULT_EASING)
}.bind(this))};c.setEasingDirection=function(e){this._easingDirection=e};c.tween=function(g){shouldReverseEase=(this._easingDirection===-1);
if(this.options.reverseEase!==true){shouldReverseEase=false}var f=this.getDuration(),e={};
if(this.props.length<1){return}this.props.forEach(function(n){var m,l,k;var h=n.units;
var j=n.axis;var i=n.property;if(shouldReverseEase){m=n.easing(this.getDuration()-g,n.to,-(n.to-n.from),f)
}else{m=n.easing(g,n.from,(n.to-n.from),f)}e[i]=m}.bind(this));this.trigger("tween_update",e)
};c.getCurrentTime=function(){return this._currentTime};c.setCurrentTime=function(e){if(e<0){e=0
}if(e>this.getDuration()){e=this.getDuration()}if(e<0||e>this.getDuration()){return
}this._currentTime=e;this.tween(this._currentTime)};return a});AC.define("design/parallax/clips/materials",["require","animationSequencer/clip/TweenClip"],function(b){var a=b("animationSequencer/clip/TweenClip");
function c(e,g){var h=0.1;var d=new a(1,[{property:"x",from:477*h,to:-477*h,units:"px"},{property:"y",from:1059*h,to:-1059*h,units:"px"}]);
var f=new g(e,d);f.activate();return d}return c});AC.define("animationSequencer/clip/TimedClip",[],function(){function b(d,c){c=c||{};
this._clip=d;this._startDelay=c.startDelay||0;this._loop=c.loop||false;this._fill=c.fill||"both"
}b.FILL_MODES=["none","forwards","backwards","both"];var a=b.prototype;a._show=function(){if(this._isHidden){this._isHidden=false;
this._clip.show()}};a.setEasingDirection=function(c){return this._clip.setEasingDirection(c)
};a._applyFill=function(i){if(this.getFill()==="none"){return}var h=this.getDuration();
var f=i>h;var e=this.getFill();var d=f&&e==="forwards";var c=!f&&e==="backwards";
var g=e==="both"||d||c;if(g){this._clip.setCurrentTime((f)?h:0)}};a._hide=function(){if(!this._isHidden){this._isHidden=true;
this._clip.hide()}};a.isPaused=function(){return this._paused};a.getCurrentTime=function(){return this._currentTime
};a.setCurrentTime=function(d,c){if(d<0||d>this.getDuration()){this._clip.inEffect=false;
this._applyFill(d)}else{this._clip.inEffect=true;this._clip.setCurrentTime(d,c)
}};a.getDuration=function(){return this._clip.getDuration()};a.getStartDelay=function(){return this._startDelay
};a.setStartDelay=function(){if(!isNaN(delay)){this._startDelay=delay}};a.getLoop=function(){return this._loop
};a.setLoop=function(c){this._loop=!!c};a.getFill=function(){return this._fill};
a.setFill=function(d){var c=b.FILL_MODES;if(c.indexOf(d.toLowerCase())!==-1){this._fill=d
}};return b});AC.define("animationSequencer/clip/CompositeClip",["require","animationSequencer/clip/TimedClip"],function(a){var d=a("animationSequencer/clip/TimedClip");
function c(e){if(e&&e.length){this._clips=e.map(this._ensureTimedClip);this._duration=this._calcDuration()
}}var b=c.prototype;b.addClip=function(e){e=this._ensureTimedClip(e);this._clips.push(e);
this._duration=this._calcDuration()};b._calcDuration=function(e){e=e||this._clips;
var f=e.reduce(function(h,i){var g=i.getStartDelay()+i.getDuration();return(g>h)?g:h
},0);return f};b.setEasingDirection=function(e){this._clips.forEach(function(f){f.setEasingDirection(e)
})};b._ensureTimedClip=function(e){if(!(e instanceof d)){e=new d(e)}return e};b._getLocalTime=function(e,f){return f-e.getStartDelay()
};b._getEligibleClips=function(){return this._clips};b.getDuration=function(){return this._duration
};b.getCurrentTime=function(){return this._currentTime};b.setCurrentTime=function(g,f){var e=this._getEligibleClips();
if(!e||!e.length){return}e.forEach(function(h){var i=this._getLocalTime(h,g);h.setCurrentTime(i,f)
}.bind(this))};b.getPlaybackRate=function(){return this._playbackRate};b.setPlaybackRate=function(e){if(isNaN(e)){return
}this._playbackRate=e};return c});AC.define("design/parallax/clips/a6",["require","animationSequencer/clip/TweenClip","animationSequencer/clip/CompositeClip"],function(c){var a=c("animationSequencer/clip/TweenClip");
var d=c("animationSequencer/clip/CompositeClip");function b(e,l,j){var k=2;var h=new a(1,[{property:"x",from:-43.135*k,to:43.135*k},{property:"y",from:25.28*k,to:-25.28*k}]);
var g=new j(e,h);g.activate();var f=new a(1,[{property:"x",from:42.8955*k,to:-42.8955*k},{property:"y",from:-25.69*k,to:25.69*k}]);
var i=new j(l,f);i.activate();return new d([h,f])}return b});AC.define("design/parallax/clips/cases",["require","animationSequencer/clip/TweenClip","animationSequencer/clip/CompositeClip"],function(b){var a=b("animationSequencer/clip/TweenClip");
var d=b("animationSequencer/clip/CompositeClip");function c(e,l,j){var k=0.4;var h=new a(1,[{property:"x",from:231*k,to:-231*k},{property:"y",from:277*k,to:-277*k}]);
var g=new j(e,h);g.activate();var f=new a(1,[{property:"x",from:-208*k,to:208*k},{property:"y",from:-260*k,to:260*k}]);
var i=new j(l,f);i.activate();return new d([h,f])}return c});AC.define("design/parallax/clips/ios7",["require","animationSequencer/clip/TweenClip"],function(c){var b=c("animationSequencer/clip/TweenClip");
function a(e,g){var h=3;var d=new b(1,[{property:"x",from:-20.8288975*h,to:20.8288975*h},{property:"y",from:45.455*h,to:-45.455*h}]);
var f=new g(e,d);f.activate();return d}return a});AC.define("design/parallax/builder",["require","iphone/shared/parallax/player/ShowOnScroll","iphone/shared/parallax/renderer/Transition3D","iphone/shared/parallax/renderer/Translate3D","design/parallax/clips/materials","design/parallax/clips/a6","design/parallax/clips/cases","design/parallax/clips/ios7"],function(c){var b=c("iphone/shared/parallax/player/ShowOnScroll");
var e=c("iphone/shared/parallax/renderer/Transition3D");var d=c("iphone/shared/parallax/renderer/Translate3D");
function a(m){var g=d;if("ontouchstart" in window){g=e}var p=AC.Element.select("#materials-hero .row");
var q=c("design/parallax/clips/materials");var h=q(p,g);var f=AC.Element.select("#a6-hero");
var t=c("design/parallax/clips/a6");var n=t(AC.Element.select(".front",f),AC.Element.select(".back",f),g);
var l=AC.Element.select("#cases-hero");var j=c("design/parallax/clips/cases");var r=j(AC.Element.select(".front",l),AC.Element.select(".back",l),g);
var s=AC.Element.select("#ios7-hero");var i=c("design/parallax/clips/ios7");var k=i(AC.Element.select(".image",s),g);
var o=new b([{clip:h,element:p},{clip:n,element:f},{clip:r,element:l},{clip:k,element:s}],m);
o.activate()}return a});AC.define("AC/SwapView",["require"],function(a){return AC.ViewMaster.Viewer
});AC.define("design/gallery/cases/register",["require","AC/SwapView"],function(b){var e=b("AC/SwapView");
var d=AC.ViewMaster.SlideViewer;var a=AC.AutoGallery;function c(f,h,g){a.addType("cases",{useKeyboardNav:true,manageZ:false,continuous:false},function(){},"slide",{viewer:AC.ViewMaster.SlideViewer,delegate:{willAnimate:function(k,l,j,o){var m=k.view.view();
var i=h.indexOf(j);j.setOpacity(1);f.setCurrentTime(f.getCurrentTime());if(AC.Environment.Feature.threeDTransformsAvailable()){function n(p){AC.Element.removeVendorPrefixEventListener(m,"transitionEnd",n);
o()}AC.Element.addVendorPrefixEventListener(m,"transitionEnd",n);f.setCurrentTime(i)
}else{f.playTo(i).then(o)}},didShow:function(k,j,i){f.setCurrentTime(k.orderedSections.indexOf(i.id));
g.onGalleryShow(g)}}})}return c});AC.define("AC/SlideView",["require"],function(a){return AC.ViewMaster.SlideViewer
});AC.define("animationSequencer/Clock",[],function(){function b(){this._currentTimeMS=0;
this._playbackRate=1;this._paused=true;this._resetStartTime()}var a=b.prototype;
a._updateCurrentTime=function(){var d,c=Date.now();if(this._paused){d=0}else{d=(c-this._startTime)
}this._currentTimeMS+=(d*this._playbackRate);this._startTime=c};a._resetStartTime=function(){this._startTime=Date.now()
};a.play=function(){this._resetStartTime();this._paused=false;return this};a.pause=function(){this._updateCurrentTime();
this._paused=true;return this};a.isPaused=function(){return this._paused};a.getCurrentTime=function(){this._updateCurrentTime();
return this._currentTimeMS/1000};a.setCurrentTime=function(c){if(isNaN(c)){return
}this._resetStartTime();this._currentTimeMS=c*1000};a.getPlaybackRate=function(){return this._playbackRate
};a.setPlaybackRate=function(c){if(isNaN(c)){return}this._playbackRate=c};return b
});AC.define("animationSequencer/player/BasicPlayer",["require","eventEmitter/EventEmitter","animationSequencer/Clock"],function(b){var d=b("eventEmitter/EventEmitter");
var e=b("animationSequencer/Clock");function a(g,f){this.options=f||{};this._clip=g;
this._clock=this.options.clock||new e();this._paused=true;window.setTimeout(function(){this.trigger("canplay")
}.bind(this),0)}var c=a.prototype=new d();c.addEventListener=c.on;c.removeEventListener=c.off;
c.play=function(){this._paused=false;this._clock.play();this._update();this.trigger("play")
};c.pause=function(){this.setPaused(true);this._clock.pause();this.trigger("pause")
};c._updateCurrentTime=function(f){this._clock.setCurrentTime(f);this._lastTime=this._clip.setCurrentTime(f)
};c._update=function(){var i=this._clock.getCurrentTime();var j=this.getDuration();
var h=this._clock.getPlaybackRate();var g=h>0;var k=g&&i>=j;var f=!g&&i<=0;if(k||f){i=(k)?j:0;
this.pause();this._updateCurrentTime(i)}this.trigger("timeupdate",{previous:this._lastTime,time:i});
if(k){this.trigger("ended")}if(f){this.trigger("returned")}if(!this.isPaused()){this._updateCurrentTime(i);
window.requestAnimationFrame(this._update.bind(this))}};c._isValidTime=function(f){return(0<=f)&&(f<=this.getDuration())
};c.isPaused=function(){return this._paused};c.setPaused=function(f){this._paused=!!f
};c.getCurrentTime=function(){return this._clock.getCurrentTime()};c.setCurrentTime=function(f){if(this._isValidTime(f)){this.trigger("seeking",{time:f});
this._updateCurrentTime(f);this.trigger("seeked",{time:f})}};c.getPlaybackRate=function(){return this._clock.getPlaybackRate()
};c.setPlaybackRate=function(f){this._clock.setPlaybackRate(f);this.trigger("ratechange",{rate:f})
};c.getDuration=function(){return this._clip.getDuration()};return a});AC.define("design/gallery/cases/player/Player",["require","animationSequencer/player/BasicPlayer","defer/Deferred"],function(d){var a=d("animationSequencer/player/BasicPlayer");
var c=d("defer/Deferred");function b(){a.apply(this,arguments)}b.prototype=new a();
b.prototype.playTo=function(f){var e=f;var i=new c();var h=(f<this.getCurrentTime())?-1:1;
if(f>this.getDuration()){e=this.getDuration()}else{if(f<0){e=0}}var g=function(j){if((h<0&&(j.time<=e||j.time===0))||(h>0&&j.time>=e)){this.pause();
this.off("timeupdate",g);this.setCurrentTime(e);i.resolve()}}.bind(this);this.on("timeupdate",g);
if((h===-1&&this.getPlaybackRate()>0)||(h===1&&this.getPlaybackRate()<0)){this.setPlaybackRate(this.getPlaybackRate()*-1)
}this.play();return i.promise()};return b});AC.define("design/gallery/cases/renderer/Translate3D",["require"],function(a){function b(d,c){this._element=d;
this._tween=c;this._lastRender=0;this._tween.on("tween_update",this.render.bind(this))
}b.prototype.render=function(c){this._element.setVendorPrefixStyle("transform","translate3d("+c.x+"px, 0, 0)")
};return b});AC.define("design/gallery/cases/renderer/Left",["require"],function(a){function b(d,c){this._element=d;
this._tween=c;this._tween.on("tween_update",this.render.bind(this))}b.prototype.render=function(c){AC.Element.setStyle(this._element,{left:c.x+"px"})
};return b});AC.define("iphone/shared/element/threeDTransformsAvailable",["require"],function(b){var a=AC.Environment;
return function(){var c=document.createElement("style");c.id="supportsThreeDStyle";
return a.Feature.threeDTransformsAvailable()||c.style.MozTransform!==undefined}
});AC.define("design/gallery/cases/clip/builder",["require","animationSequencer/clip/TweenClip","animationSequencer/clip/TimedClip","animationSequencer/clip/CompositeClip","design/gallery/cases/renderer/Translate3D","design/gallery/cases/renderer/Left","iphone/shared/element/threeDTransformsAvailable"],function(d){var a=d("animationSequencer/clip/TweenClip");
var g=d("animationSequencer/clip/TimedClip");var f=d("animationSequencer/clip/CompositeClip");
var c=d("design/gallery/cases/renderer/Translate3D");var b=d("design/gallery/cases/renderer/Left");
var e=d("iphone/shared/element/threeDTransformsAvailable");return function(h,l){var i=[];
var j=399;var k=511;var m=c;var n=0;if(!e()){m=b}l.forEach(function(s,p){var r=n+j;
if(p===l.length-1){return}var o=new a(1,[{property:"x",from:-n,to:-r}],{reverseEase:true});
n=r;new m(h,o);o=new g(o,{startDelay:p,fill:p===0?"backwards":"forwards"});i.push(o);
var q=new a(1,[{property:"x",from:0,to:-k}],{reverseEase:true});new m(s,q);q=new g(q,{startDelay:p,fill:"both"});
i.push(q)});return new f(i)}});AC.define("design/gallery/cases/extendAnimation",["require","AC/SlideView","design/gallery/cases/player/Player","design/gallery/cases/clip/builder"],function(c){var e=c("AC/SlideView");
var b=c("design/gallery/cases/player/Player");var a=c("design/gallery/cases/clip/builder");
function d(g,i){var f=a(g,i);var h=new b(f);h.setPlaybackRate(1/0.4);return h}return d
});AC.define("design/gallery/cases/extendTouch",["require"],function(a){return function(i,b,k){var c=i.view.view();
var l=null;var e=window.innerWidth;var f=null;var j=false;var m=[];c.setVendorPrefixStyle("transition","none");
function h(){var n;while(m.length>0){if(j===true){break}n=m.shift();n()}}function g(){return i.orderedSections.indexOf(i.currentSection.id)
}b.playTo(g()+0.01);b.setCurrentTime(g());var d;i._locked=false;i.__touchTrackEvents=function(o){var q;
if(i._locked===true){return}j=true;var n;var p;if(o.touches.length===0){this.__touchEnd(o);
return}if(l===null){l=o.pageX;f=b.getCurrentTime()}q=l-o.pageX;n=q/e;p=f+n;b.pause();
b.setCurrentTime(p);window.clearTimeout(d);d=window.setTimeout(h,3000)};i.__touchEnd=function(o){var q,n=false,p;
if(o.difference){q=o.difference.current.x/2790;if(q>0.4||o.speed>=7){if(o.direction.x==="right"){n=this.getNextSection()
}else{if(o.direction.x==="left"){n=this.getPreviousSection()}}}}if(n!==false){p=i.orderedSections.indexOf(n.id);
i._locked=true;b.playTo(p).then(function(){i.previousSection=i.currentSection;i.currentSection=n;
window.requestAnimationFrame(function(){i._repaintTriggers(i.previousSection,i.currentSection)
});i._locked=false;if(i.delegate&&typeof i.delegate.didShow==="function"){i.delegate.didShow(i,i.previousSection,i.currentSection)
}m.push(function(){if(typeof(AC.ViewMaster.dispatchEvent)=="function"){AC.ViewMaster.dispatchEvent("ViewMasterDidShowNotification",{sender:i,outgoingView:i.previousSection,incomingView:i.currentSection,trigger:i._currentTrigger})
}})}.bind(this))}else{if(f!==null){i._locked=true;b.pause();b.playTo(f).then(function(){i._locked=false;
k.onGalleryShow()}.bind(this))}}l=null;f=null;j=false}}});AC.define("design/gallery/cases/observer/CasesLinks",["require"],function(a){function b(e,d,c){this._player=e;
this._element=d;this._defaultZ=c;this._lastZIndex=this._defaultZ}b.prototype={onPlayerSeeking:function(c){var d=this._element;
if(this._lastZIndex===1){return}AC.Element.setStyle(d,{zIndex:1});this._lastZIndex=1
},onGalleryShow:function(c){var e=this._defaultZ;var d=this._element;if(this._lastZIndex===e){return
}AC.Element.setStyle(d,{zIndex:e});this._lastZIndex=e}};return b});AC.define("design/gallery/cases/builder",["require","design/gallery/cases/register","design/gallery/cases/extendAnimation","design/gallery/cases/extendTouch","design/gallery/cases/observer/CasesLinks"],function(b){var e=b("design/gallery/cases/register");
var a=b("design/gallery/cases/extendAnimation");var c=b("design/gallery/cases/extendTouch");
var d=b("design/gallery/cases/observer/CasesLinks");function f(g){var g=AC.Element.select("#gallery-cases");
var i=AC.Element.selectAll(".gallery-content",g);var j=a(g,i);var h=new d(j,AC.Element.select(".cases .cases-links"),501);
j.on("seeking",h.onPlayerSeeking.bind(h));e(j,i,h);AC.onDOMReady(function(){var k=AC.AutoGallery.galleries["gallery-cases"];
if("ontouchstart" in window){c(k,j,h)}})}return f});AC.define("iphone/shared/assetLoader/AssetLoader",["require","defer/Deferred"],function(c){var b=c("defer/Deferred");
function a(e,d){this._assetsToLoad=[].concat(e);this._type=d||"img"}a.prototype={load:function(){this._assetsLoaded=[];
this._assetsCountLoaded=0;this._defer=new b();this._failure=false;this._assetsToLoad.forEach(this._loadAsset.bind(this));
return this._defer.promise()},_progress:function(e,d){this._defer.progress(this._assetsLoaded[e]=d);
this._assetsCountLoaded+=1;if(this._assetsCountLoaded===this._assetsToLoad.length){this._defer.resolve(this._assetsLoaded)
}},_error:function(d){this._failure=true;this._defer.reject(d.target)},_loadAsset:function(e,f){var d;
if(!this._failure){d=document.createElement(this._type);d.onload=this._progress.bind(this,f,d);
d.onerror=this._error.bind(this);d.src=e}}};return a});AC.define("iphone/shared/gallery/imageLinkPreload",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var a=b("iphone/shared/assetLoader/AssetLoader");
return function(f,e){if(e===undefined){return}var d=[];f.forEach(function(i){var k=i.getAttribute("href");
var j="g";var h=new RegExp("\\.("+["pn"+j,j+"if","jp"+j,"jpe"+j].join("|")+")\\#");
if(h.test(k)){d.push(i.getAttribute("href"))}});var c=new a(d);c.load()}});AC.Ambient=AC.Class({__defaultOptions:{classNamePrefix:"ac-ambient-",delayBeforePlay:true,delayBeforeDidPlay:0,didPlayOnAnimationEnd:false,didPlayOnTransitionEnd:false,analytics:false},initialize:function ac_initialize(b,c,a){this._options=this.__mergeOptions(c);
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
this._showOnScroll.setDelegate(this)}};return c});AC.define("design/analytics/builder",["require","iphone/shared/analytics/SectionEngagement"],function(a){var b=a("iphone/shared/analytics/SectionEngagement");
return function(d,c){c=c||{};d.forEach(function(e){c.id=e.getAttribute("data-track-visitor-engagement");
var f=new b(e,c);f.activate()})}});AC.define("iphone/shared/fullTakeoverColorPicker/Viewer",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var d=AC.Element;
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
}this.zoom=w;this.init=function(){t();v()}};return h});AC.define("iphone/shared/fullTakeoverColorPicker/builder",["require","iphone/shared/fullTakeoverColorPicker/DarkboxPicker"],function(a){var b=a("iphone/shared/fullTakeoverColorPicker/DarkboxPicker");
return function(c){var d=new b();AC.onDOMReady(function(){d.init();AC.Element.addEventListener(c,"click",function(e){d.zoom(AC.Event.target(e));
AC.Event.stop(e)})});return d}});AC.define("design/gallery/materials/register",["require","AC/SwapView"],function(b){var d=b("AC/SwapView");
var a=AC.AutoGallery;function c(){a.addType("materials",{shouldAnimateContentChange:false,silentTriggers:true},function(){},"image",{delegate:{_didShowInitial:false,willShow:function(i,f,e){var g=i.view.view().parentNode;
var h=f?f.id:"pink";AC.Element.removeClassName(g,h);AC.Element.addClassName(g,e.id);
if(!AC.Element.hasClassName(e.content,"image")){AC.Element.addClassName(e.content,"image")
}},didShow:function(g,f,e){this.willShow(g,f,e);this.didShow=AC.emptyFunction}}})
}return c});AC.define("iphone/shared/forceTridentRedraw/forceTridentRedraw",["require"],function(b){var d=(AC.Environment.Browser.name==="IE"&&AC.Environment.Browser.version<=8);
var c=/\#.+/.test(document.location.hash);var a=(!d||!c)?function(){}:function(e){AC.Element.selectAll(e).forEach(function(f){AC.Element.setStyle(f,{overflow:"visible"});
setTimeout(function(){AC.Element.setStyle(f,{overflow:"hidden"});setTimeout(function(){AC.Element.setStyle(f,{overflow:""})
},125)},125)})};return a});window.DEBUG=false;AC.define("design/bootstrap",["require","design/parallax/builder","design/gallery/cases/builder","iphone/shared/gallery/imageLinkPreload","AC/Ambient","design/analytics/builder","iphone/shared/fullTakeoverColorPicker/builder","design/gallery/materials/register","iphone/shared/forceTridentRedraw/forceTridentRedraw"],function(g){var o=g("design/parallax/builder");
var c=g("design/gallery/cases/builder");var e=g("iphone/shared/gallery/imageLinkPreload");
var d=g("AC/Ambient");var p=g("design/analytics/builder");var f;var b;var l=AC.Element.selectAll(".interstitial");
var k=g("iphone/shared/fullTakeoverColorPicker/builder");var n=g("design/gallery/materials/register");
var h=("ontouchstart" in window);if(h){AC.Element.addClassName(document.body,"touch")
}n();c();function j(){f=(document.documentElement.clientWidth||window.innerWidth||document.documentElement.offsetWidth);
b=(document.documentElement.clientHeight||window.innerHeight||document.documentElement.offsetHeight)
}function m(){l.forEach(function(q){q.style.height=b*1.1+"px"})}function a(q){j();
m()}AC.Element.addEventListener(window,"resize",a);a(null);k(AC.Element.select("#full-takeover-color-picker-link"));
if(h===false){o()}p(AC.Element.selectAll("[data-track-visitor-engagement]"),{decimals:1});
AC.onDOMReady(function(){e(AC.Element.selectAll("#materials-hero .imageLink"),AC.AutoGallery.galleries["gallery-materials"])
});var i=g("iphone/shared/forceTridentRedraw/forceTridentRedraw");AC.onDOMReady(function(){i(".flushrow.cases, .flushrow .interstitial")
})});