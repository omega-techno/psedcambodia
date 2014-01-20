AC.define("iphone/shared/ac_autogallery/Types/cases",[],function(){var f=AC.Element;
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
this.didAppendContent(this.viewer,k.content)}}this._didShowInitial=true}}})});AC.define("iphone/shared/assetLoader/AssetLoader",["require","defer/Deferred"],function(f){var d=f("defer/Deferred");
function e(a,b){this._assetsToLoad=[].concat(a);this._type=b||"img"}e.prototype={load:function(){this._assetsLoaded=[];
this._assetsCountLoaded=0;this._defer=new d();this._failure=false;this._assetsToLoad.forEach(this._loadAsset.bind(this));
return this._defer.promise()},_progress:function(a,b){this._defer.progress(this._assetsLoaded[a]=b);
this._assetsCountLoaded+=1;if(this._assetsCountLoaded===this._assetsToLoad.length){this._defer.resolve(this._assetsLoaded)
}},_error:function(a){this._failure=true;this._defer.reject(a.target)},_loadAsset:function(b,a){var c;
if(!this._failure){c=document.createElement(this._type);c.onload=this._progress.bind(this,a,c);
c.onerror=this._error.bind(this);c.src=b}}};return e});AC.define("iphone/shared/gallery/imageLinkPreload",["require","iphone/shared/assetLoader/AssetLoader"],function(c){var d=c("iphone/shared/assetLoader/AssetLoader");
return function(a,b){if(b===undefined){return}var g=[];a.forEach(function(l){var e=l.getAttribute("href");
var f="g";var m=new RegExp("\\.("+["pn"+f,f+"if","jp"+f,"jpe"+f].join("|")+")\\#");
if(m.test(e)){g.push(l.getAttribute("href"))}});var h=new d(g);h.load()}});(function(){var C={_showOnScrolls:[],__onScroll:function v(a){this._showOnScrolls.forEach(function(b){b.__onScroll(a)
})},add:function A(a,b){this._showOnScrolls.push(a);if(!this.__boundOnScroll){this.__boundOnScroll=this.__onScroll.bind(this);
AC.Element.addEventListener(b,"scroll",this.__boundOnScroll)}}};AC.ShowOnScroll=AC.Class();
AC.ShowOnScroll.prototype={__defaultOptions:{threshold:0.5,timeInView:1,scrollEndDelay:0.4},initialize:function E(a,b){if(typeof b!=="object"){b={}
}this._options=AC.Object.extend(AC.Object.clone(this.__defaultOptions),b);if(AC.Environment.Browser.os==="iOS"){this._options.scrollEndDelay=0
}this._element=AC.Element.getElementById(a);this._delegate={};this._scrollTarget=b.scrollTarget||window;
if(!this._element){throw"AC.ShowOnScroll: Invalid target element - expected Element or (string) element ID"
}if(b.shouldObserve!==false){this.startObserving()}AC.Object.synthesize(this)},startObserving:function s(){if(typeof this.__boundOnScroll==="undefined"){this.__boundOnScroll=AC.Function.bindAsEventListener(this.__onScroll,this)
}if(typeof this.__boundRefreshMetrics==="undefined"){this.__boundRefreshMetrics=AC.Function.bindAsEventListener(this.refreshMetrics,this)
}if(typeof this.__boundWindowLoad==="undefined"){this.__boundWindowLoad=AC.Function.bindAsEventListener(this.__onWindowLoad,this)
}if(this._isObserving!==true){C.add(this,this._scrollTarget);AC.Element.addEventListener(window,"load",this.__boundWindowLoad);
AC.Element.addEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.addEventListener(window,"orientationchange",this.__boundRefreshMetrics);
this._isObserving=true}},stopObserving:function z(){if(this._isObserving===true){AC.Element.removeEventListener(this._scrollTarget,"scroll",this.__boundOnScroll);
AC.Element.removeEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.removeEventListener(window,"orientationchange",this.__boundRefreshMetrics);
this._isObserving=false}},setDelegate:function t(a){if(typeof a==="object"){this._delegate=a
}},refreshMetrics:function x(){delete this._viewportMetrics;delete this._elementMetrics;
this._viewportMetrics=this.viewportMetrics();this._elementMetrics=this.elementMetrics()
},isInView:function u(a){if(typeof a==="undefined"){a=this.pixelsInView()}return(a>0)
},isEnoughInView:function D(a){if(typeof a==="undefined"){a=this.percentInView()
}return(a===0)?false:(a>=this._options.threshold)},viewportMetrics:function q(){if(typeof this._viewportMetrics==="undefined"){this._viewportMetrics={};
this._viewportMetrics.height=window.innerHeight||document.documentElement.clientHeight;
AC.Object.synthesize(this)}return this._viewportMetrics},elementMetrics:function w(){if(typeof this._elementMetrics==="undefined"){this._elementMetrics={};
this._elementMetrics.height=this._element.offsetHeight;this._elementMetrics.offsetY=AC.Element.cumulativeOffset(this._element).top;
AC.Object.synthesize(this)}return this._elementMetrics},pixelsInView:function y(){var b;
var a=this.viewportMetrics();var c=this.elementMetrics();var d=this.elementViewportOffsetY();
if(d>=0){b=a.height-d;if(b>c.height){b=c.height}}else{b=c.height+d}if(b<0){b=0}return(this._pixelsInView=b)
},percentInView:function F(b){var a=this.viewportMetrics();var c=this.elementMetrics();
if(typeof b!=="number"){b=this.pixelsInView()}this._percentInView=(b===0)?0:(b/c.height);
return this._percentInView},percentTravelled:function r(c){var b=this.viewportMetrics();
var d=this.elementMetrics();var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
var a=b.height+d.height;this._percentTravelled=1-(((d.height+d.offsetY)-e)/a);return this._percentTravelled
},elementViewportOffsetY:function B(){var a=this.elementMetrics();var b=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
return a.offsetY-b}}}());AC.Object.extend(AC.ShowOnScroll.prototype,{__onScroll:function ac___onScroll(){var i=this._percentInView;
var j=(typeof i==="undefined");var h=this.pixelsInView();var f=this.percentInView(h);
var g=this.percentTravelled(h);if(this.isInView(h)&&(i===0||j)){if(typeof this._delegate.scrolledIntoView==="function"){this._delegate.scrolledIntoView(this._element)
}}if((f===0&&i>0)&&!j){if(typeof this._delegate.scrolledOutOfView==="function"){this._delegate.scrolledOutOfView(this._element)
}}if(f===1&&(i<1||j)){if(typeof this._delegate.scrolledIntoViewCompletely==="function"){this._delegate.scrolledIntoViewCompletely(this._element,h)
}}if((f<1&&i===1)&&!j){if(typeof this._delegate.scrolledOutOfViewCompletely==="function"){this._delegate.scrolledOutOfViewCompletely(this._element,h,g)
}}if(this.__hasChangedInViewPastThresholdStatus(i,f)){if(this.isEnoughInView(f)){this.__scrolledIntoViewPastThreshold()
}else{if(!j){this.__scrolledOutOfViewPastThreshold()}}}if(this.isInView(h)){if(typeof this._delegate.scrolledWhileInView==="function"){this._delegate.scrolledWhileInView(this._element,h,g)
}}if(!j){this.__resetOnScrollEndTimer()}},__onWindowLoad:function ac___onWindowLoad(){var b=this;
window.setTimeout(function(){b.__onScroll.call(b)},500)},__onScrollEnd:function ac___onScrollEnd(){delete this.__onScrollEndTimer;
this.refreshMetrics();if(typeof this._delegate.scrollEnd==="function"){this._delegate.scrollEnd(this._element,this._pixelsInView,this._percentTravelled)
}},__scrolledIntoViewPastThreshold:function ac___scrolledIntoViewPastThreshold(){this.__startTimeInViewTimer();
if(typeof this._delegate.scrolledIntoViewPastThreshold==="function"){this._delegate.scrolledIntoViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}},__scrolledOutOfViewPastThreshold:function ac___scrolledOutOfViewPastThreshold(){this.__cancelTimeInViewTimer();
if(typeof this._delegate.scrolledOutOfViewPastThreshold==="function"){this._delegate.scrolledOutOfViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}},__visitorEngaged:function ac___visitorEngaged(){if(typeof this._delegate.visitorEngaged==="function"){this._delegate.visitorEngaged(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)
}delete this.__timeInViewTimerId},__hasChangedInViewPastThresholdStatus:function ac___hasChangedInViewPastThresholdStatus(c,d){if(((this.isEnoughInView(d))&&(!this.isEnoughInView(c)))||((!this.isEnoughInView(d))&&(this.isEnoughInView(c)))||(typeof c==="undefined")){return true
}else{return false}},__cancelTimeInViewTimer:function ac___cancelTimeInViewTimer(){if(typeof this.__timeInViewTimerId!=="undefined"){window.clearTimeout(this.__timeInViewTimerId);
delete this.__timeInViewTimerId}},__startTimeInViewTimer:function ac___startTimeInViewTimer(){this.__visitorEngaged()
},__resetOnScrollEndTimer:function ac___resetOnScrollEndTimer(){this.__onScrollEnd()
}});AC.ShowOnScroll.version="2.1";AC.define("iphone/lib/ac_showonscroll/ac_showonscroll",function(){});
AC.define("AC/ShowOnScroll",["require","iphone/lib/ac_showonscroll/ac_showonscroll"],function(b){b("iphone/lib/ac_showonscroll/ac_showonscroll");
return AC.ShowOnScroll});AC.define("iphone/shared/analytics/SectionEngagement",["require","AC/ShowOnScroll"],function(f){var h=f("AC/ShowOnScroll");
var i=AC.Tracking;var g=AC.Object;function j(a,b){this._element=a;this._options=b||{}
}j.prototype={__defaultOptions:{onlyTrackOnce:true,id:"",minimumDuration:1,debug:false,decimals:0,pixelOffset:50},determineThreshold:function(){var a;
var b=this._element.offsetHeight;return this._options.pixelOffset/b},scrolledWhileInView:function(){if(document.viewport.getHeight()+window.scrollY>=Element.getHeight(document.body)){this.scrolledOutOfViewPastThreshold()
}},scrolledIntoViewPastThreshold:function(){this.__startTime=new Date().getTime()
},scrolledOutOfViewPastThreshold:function(){var b=Math.pow(10,this._options.decimals);
var c={prop34:(i.pageName()+" - "+this._options.id+" - section engaged"),prop35:(Math.round((new Date().getTime()-this.__startTime)/(1000/b))/b)};
if(c.prop35>=this._options.minimumDuration){if(this._options.onlyTrackOnce===true&&this.__hasTracked===true){return
}i.trackClick(c,this,"o",c.prop34);this.__hasTracked=true;if(this._options.debug){try{console.log(c.prop34+": "+c.prop35+"s")
}catch(a){}}}},activate:function(){if(typeof this.__defaultOptions!=="object"){this.__defaultOptions={}
}this._options=g.extend(g.clone(this.__defaultOptions),this._options);if(this._options.debug===true){this._element.setStyle("outline:5px rgba(255,255,0,.5) dotted")
}this._showOnScroll=new h(this._element,{threshold:this.determineThreshold()});
this._showOnScroll.setDelegate(this)}};return j});AC.define("features/analytics/builder",["require","iphone/shared/analytics/SectionEngagement"],function(d){var c=d("iphone/shared/analytics/SectionEngagement");
return function(a,b){b=b||{};a.forEach(function(h){b.id=h.getAttribute("data-track-visitor-engagement");
var g=new c(h,b);g.activate()})}});AC.define("features/modules/hero",["require"],function(d){function c(u,v,s){var x=function(){var e=window,f="inner";
if(!("innerHeight" in window)){f="client";e=document.documentElement||document.body
}return e[f+"Height"]};var r=AC.Element;var q=r.select(u);var t=r.select(v);var w=r.select(".flushrow.hero");
var o=Math.floor(w.offsetTop-w.scrollTop);var b=x()-o;w.style.height=Math.max(b,780)+"px";
var a=function(){var g=x();var e=-(g*0.15);var f=(g*0.2);return{stage:q,actor:t,from:e,to:f}
};var p=function(e){var f=e||x()-o;w.style.height=Math.min(Math.max(f,780),1400)+"px"
};return{getPosition:a,setHeight:p}}return c});AC.define("features/modules/interstitials",["require"],function(e){var f=function(){var a=window,b="inner";
if(!("innerHeight" in window)){b="client";a=document.documentElement||document.body
}return a[b+"Height"]};function d(u,v,r){var q=AC.Element;var a=AC.Environment.Feature.isCSSAvailable("transition");
var w=q.selectAll(u);var t=q.selectAll(v);var c,i;if(a&&!r){var s=w.length;while(--s>-1){q.removeClassName(w[s],"vcenter")
}}setTimeout(function(){var g=w.length;while(--g>-1){q.addClassName(w[g],"show")
}},500);var x=function(m,l,n){var k=l.scrollHeight-c;var j=k*0.5;var g,h;if(n){g=-j+(i*0.5);
h=-j+(i*-0.5)}else{g=-(j+(i*0.5));h=-(j+(i*-0.5))}return{stage:m,actor:l,from:g,to:h}
};var b=function(h){var j=h||Math.min(1300,f());c=Math.round(j*1.1);i=Math.round(j*0.3);
var k=[];var g=w.length;while(--g>-1){w[g].style.height=c+"px";k[k.length]=x(w[g],t[g],q.hasClassName(w[g],"scrollup"))
}return k};return{getPositions:b}}return d});
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
AC.define("animationSequencer/vendor/KeySpline",[],function(){function b(a,n,l,p){this.get=function(c){if(a===n&&l===p){return c
}return s(o(c),n,p)};function q(d,c){return 1-3*c+3*d}function r(d,c){return 3*c-6*d
}function t(c){return 3*c}function s(e,d,c){return((q(d,c)*e+r(d,c))*e+t(d))*e}function m(e,d,c){return 3*q(d,c)*e*e+2*r(d,c)*e+t(d)
}function o(f){var c=f;for(var g=0;g<4;++g){var e=m(c,a,l);if(e===0){return c}var d=s(c,a,l)-f;
c-=d/e}return c}}return b});AC.define("animationSequencer/vendor/EasingFunctions",[],function(){var O={linear:function T(a,c,b,d){return b*a/d+c
},easeInQuad:function aa(a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function ak(a,c,b,d){return -b*(a/=d)*(a-2)+c
},easeInOutQuad:function M(a,c,b,d){if((a/=d/2)<1){return b/2*a*a+c}return -b/2*((--a)*(a-2)-1)+c
},easeInCubic:function U(a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function af(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c
},easeInOutCubic:function ag(a,c,b,d){if((a/=d/2)<1){return b/2*a*a*a+c}return b/2*((a-=2)*a*a+2)+c
},easeInQuart:function ae(a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function L(a,c,b,d){return -b*((a=a/d-1)*a*a*a-1)+c
},easeInOutQuart:function Q(a,c,b,d){if((a/=d/2)<1){return b/2*a*a*a*a+c}return -b/2*((a-=2)*a*a*a-2)+c
},easeInQuint:function ab(a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function al(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c
},easeInOutQuint:function N(a,c,b,d){if((a/=d/2)<1){return b/2*a*a*a*a*a+c}return b/2*((a-=2)*a*a*a*a+2)+c
},easeInSine:function X(a,c,b,d){return -b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function ai(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c
},easeInOutSine:function I(a,c,b,d){return -b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function aj(a,c,b,d){return(a===0)?c:b*Math.pow(2,10*(a/d-1))+c
},easeOutExpo:function W(a,c,b,d){return(a===d)?c+b:b*(-Math.pow(2,-10*a/d)+1)+c
},easeInOutExpo:function Y(a,c,b,d){if(a===0){return c}if(a===d){return c+b}if((a/=d/2)<1){return b/2*Math.pow(2,10*(a-1))+c
}return b/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function V(a,c,b,d){return -b*(Math.sqrt(1-(a/=d)*a)-1)+c
},easeOutCirc:function ah(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function H(a,c,b,d){if((a/=d/2)<1){return -b/2*(Math.sqrt(1-a*a)-1)+c
}return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function J(b,g,d,a){var e=1.70158;
var c=0;var f=d;if(b===0){return g}if((b/=a)===1){return g+d}if(!c){c=a*0.3}if(f<Math.abs(d)){f=d;
e=c/4}else{e=c/(2*Math.PI)*Math.asin(d/f)}return -(f*Math.pow(2,10*(b-=1))*Math.sin((b*a-e)*(2*Math.PI)/c))+g
},easeOutElastic:function K(b,g,d,a){var e=1.70158;var c=0;var f=d;if(b===0){return g
}if((b/=a)===1){return g+d}if(!c){c=a*0.3}if(f<Math.abs(d)){f=d;e=c/4}else{e=c/(2*Math.PI)*Math.asin(d/f)
}return f*Math.pow(2,-10*b)*Math.sin((b*a-e)*(2*Math.PI)/c)+d+g},easeInOutElastic:function G(b,g,d,a){var e=1.70158;
var c=0;var f=d;if(b===0){return g}if((b/=a/2)===2){return g+d}if(!c){c=a*(0.3*1.5)
}if(f<Math.abs(d)){f=d;e=c/4}else{e=c/(2*Math.PI)*Math.asin(d/f)}if(b<1){return -0.5*(f*Math.pow(2,10*(b-=1))*Math.sin((b*a-e)*(2*Math.PI)/c))+g
}return f*Math.pow(2,-10*(b-=1))*Math.sin((b*a-e)*(2*Math.PI)/c)*0.5+d+g},easeInBack:function P(b,e,c,a,d){if(d===undefined){d=1.70158
}return c*(b/=a)*b*((d+1)*b-d)+e},easeOutBack:function ac(b,e,c,a,d){if(d===undefined){d=1.70158
}return c*((b=b/a-1)*b*((d+1)*b+d)+1)+e},easeInOutBack:function S(b,e,c,a,d){if(d===undefined){d=1.70158
}if((b/=a/2)<1){return c/2*(b*b*(((d*=(1.525))+1)*b-d))+e}return c/2*((b-=2)*b*(((d*=(1.525))+1)*b+d)+2)+e
},easeInBounce:function R(a,c,b,d){return b-O.easeOutBounce(d-a,0,b,d)+c},easeOutBounce:function ad(a,c,b,d){if((a/=d)<(1/2.75)){return b*(7.5625*a*a)+c
}else{if(a<(2/2.75)){return b*(7.5625*(a-=(1.5/2.75))*a+0.75)+c}else{if(a<(2.5/2.75)){return b*(7.5625*(a-=(2.25/2.75))*a+0.9375)+c
}else{return b*(7.5625*(a-=(2.625/2.75))*a+0.984375)+c}}}},easeInOutBounce:function Z(a,c,b,d){if(a<d/2){return O.easeInBounce(a*2,0,b,d)*0.5+c
}return O.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c}};return O});AC.define("eventEmitter/EventEmitter",[],function(){var i=function(a){this.context=a
};var j=i.prototype;var f=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var g=function(e,c){var b=e[0];var a=e[1];var d=e[2];if(typeof b==="object"){for(var l in b){c.call(this,l,b[l],d)
}}if(typeof b==="string"){b=b.split(" ");b.forEach(function(k){c.call(this,k,a,d)
},this)}};var h=function(b,a){var e;var d;var c;e=f.call(this)[b];if(!e){return
}for(d=0,c=e.length;d<c;d++){if(a(e[d],d)){break}}};j.on=function(){var a=f.call(this);
g.call(this,arguments,function(c,b,d){a[c]=a[c]||(a[c]=[]);a[c].push({callback:b,context:d})
});return this};j.once=function(){g.call(this,arguments,function(c,a,d){var b=function(e){a.call(d||this,e);
this.off(c,b)};this.on(c,b,this)});return this};j.off=function(b,a){var c=f.call(this);
if(arguments.length===0){c={};return this}if(arguments.length===1&&c[b]){c[b]=[];
return this}var d=-1;h.call(this,b,function(e,l){d=l;if(e.callback===a){return true
}});if(d===-1){return}c[b].splice(d,1);return this};j.trigger=function(b,a){b=b.split(" ");
b.forEach(function(c){h.call(this,c,function(d){d.callback.call(d.context||this.context||this,a)
}.bind(this))},this);return this};return i});AC.define("animationSequencer/clip/BaseClip",["require","animationSequencer/vendor/KeySpline","animationSequencer/vendor/EasingFunctions","eventEmitter/EventEmitter"],function(p){var k=p("animationSequencer/vendor/KeySpline");
var m=p("animationSequencer/vendor/EasingFunctions");var i="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var j="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var n=p("eventEmitter/EventEmitter");function l(a,b){this.options=b||{};this._duration=a;
this._currentTime=0;this._easingFunction=this._createEasing(this.options.easing||l.DEFAULT_EASING)
}l.DEFAULT_EASING="linear";var o=l.prototype=new n();o._createEasing=function(b){var a;
if(typeof b==="string"){a=this._createPredefinedEasing(b)}else{if(Array.isArray(b)){a=this._createBezierEasing(b)
}else{if(typeof b==="function"){a=b}else{throw new TypeError(i+b)}}}return a};o._createBezierEasing=function(d){var b;
var a=d;var c=d.every(function(e){return(typeof e==="number")});if(d.length!==4||!c){throw new TypeError(j+d)
}b=new k(a[0],a[1],a[2],a[3]);return function(e,f,g,h){return b.get(e/h)*g}};o._createPredefinedEasing=function(a){var b=m[a];
var c="";if(!b){c+='Easing function "'+b;c+='" not recognized among the following: ';
c+=Object.keys(m).join(", ");throw new Error(c)}return b};o._getInterpolatedValue=function(d,a,b,c){return this._easingFunction(d,a,b,c)
};o.getDuration=function(){return this._duration};o.getCurrentTime=function(){return this._currentTime
};o.setCurrentTime=function(a){this._currentTime=a};return l});AC.define("animationSequencer/clip/TweenClip",["require","animationSequencer/clip/BaseClip"],function(e){var g=e("animationSequencer/clip/BaseClip");
function f(a,b,c){g.call(this,a,c);this.props=b||[];this._initializePropEasing();
this._lastComputedTime=0;this._easingDirection=1}f.create=function(a){return new f(a.selector,a.duration,a.props)
};f.validate=function(a){return(typeof a.selector==="string")&&Array.isArray(a.props)
};f.DEFAULT_EASING="linear";var h=f.prototype=new g();h._initializePropEasing=function(){this.props.forEach(function(a){a.easing=this._createEasing(a.easing||g.DEFAULT_EASING)
}.bind(this))};h.setEasingDirection=function(a){this._easingDirection=a};h.tween=function(a){shouldReverseEase=(this._easingDirection===-1);
if(this.options.reverseEase!==true){shouldReverseEase=false}var b=this.getDuration(),c={};
if(this.props.length<1){return}this.props.forEach(function(t){var d,o,p;var s=t.units;
var q=t.axis;var r=t.property;if(shouldReverseEase){d=t.easing(this.getDuration()-a,t.to,-(t.to-t.from),b)
}else{d=t.easing(a,t.from,(t.to-t.from),b)}c[r]=d}.bind(this));this.trigger("tween_update",c)
};h.getCurrentTime=function(){return this._currentTime};h.setCurrentTime=function(a){if(a<0){a=0
}if(a>this.getDuration()){a=this.getDuration()}if(a<0||a>this.getDuration()){return
}this._currentTime=a;this.tween(this._currentTime)};return f});AC.define("iphone/shared/parallax/player/ShowOnScroll",["require","AC/ShowOnScroll"],function(e){var f=e("AC/ShowOnScroll");
function d(a,b){this._clipsData=a;this._scrollTarget=b;this._showOnScrolls=[];this._isTicking=false
}d.prototype={__createShowOnScroll:function(b){var a=new f(b.element,{scrollTarget:this._scrollTarget});
a.setDelegate({scrolledWhileInView:this.__scrolledWhileInView.bind(this,b.clip)});
this._showOnScrolls.push(a);a.__onScroll()},__scrolledWhileInView:function(a,c,b,h){this.__update(a,h)
},__update:function(b,c){var a=b.getDuration()*c;b.setCurrentTime(a)},activate:function(){this._clipsData.forEach(this.__createShowOnScroll.bind(this))
},deactivate:function(){this._showOnScrolls.forEach(function(a){a.stopObserving()
})}};return d});AC.define("iphone/shared/parallax/renderer/Transition3D",["require"],function(c){function d(a,b,f){this._element=a;
this._tween=b;this._lastDrawY;b.props.forEach(function(e){this["_"+e.property]=e.from
}.bind(this));this._isTransitioning=false;this._transitionEndTimeout;this._transitionDuration=f||100;
this.__bindTransition()}d.prototype={__onTransitionEnd:function(){window.clearTimeout(this._transitionEndTimeout);
this._isTransitioning=false},__bindTransition:function(){var a=this._element;AC.Element.setVendorPrefixStyle(a,"transition","-webkit-transform "+this._transitionDuration+"ms linear");
AC.Element.addVendorPrefixEventListener(a,"transitionEnd",this.__onTransitionEnd.bind(this))
},__translate:function(f,a){var b=this._element;this._isTransitioning=true;AC.Element.setVendorPrefixStyle(b,"transform","translate3d("+f+"px, "+a+"px, 0)");
this._x=f;this._y=a;this._transitionEndTimeout=window.setTimeout(this.__onTransitionEnd.bind(this),this._transitionDuration)
},__draw:function(m){var b;var k;var j;var n=m.x||0;var a=m.y||0;var l=this._element;
k=Math.abs(this._y-a);j=Math.abs(this._x-n);b=Math.sqrt(k*k+j*j);if(this._isTransitioning===true){return
}this.__translate(n,a)},activate:function(){this._boundDraw=this.__draw.bind(this);
this._tween.on("tween_update",this._boundDraw)},deactivate:function(){this._tween.off("tween_update",this._boundDraw);
this._boundDraw=null}};return d});AC.define("iphone/shared/parallax/renderer/Translate3D",["require"],function(d){function c(a,b){this._element=a;
this._tween=b;this._lastDrawY;b.props.forEach(function(f){this["_"+f.property]=f.from
}.bind(this));this._isTicking=false}c.prototype={__translate:function(j,a){var b=this._element;
var h=Math.round(j*10)/10;var i=Math.round(a*10)/10;if(h===this._x&&i===this._y){return
}if(this._isTicking===false){window.requestAnimationFrame(function(){AC.Element.setVendorPrefixStyle(b,"transform","translate3d("+h+"px, "+i+"px, 0)");
this._x=h;this._y=i;this._isTicking=false}.bind(this))}this._isTicking=true},__draw:function(m){var b;
var k;var j;var n=m.x||0;var a=m.y||0;var l=this._element;this.__translate(n,a)
},activate:function(){this._boundDraw=this.__draw.bind(this);this._tween.on("tween_update",this._boundDraw)
},deactivate:function(){this._tween.off("tween_update",this._boundDraw);this._boundDraw=null
}};return c});AC.define("features/parallax/builder",["require","animationSequencer/clip/TweenClip","iphone/shared/parallax/player/ShowOnScroll","iphone/shared/parallax/renderer/Transition3D","iphone/shared/parallax/renderer/Translate3D"],function(l){var h=l("animationSequencer/clip/TweenClip");
var g=l("iphone/shared/parallax/player/ShowOnScroll");var i=l("iphone/shared/parallax/renderer/Transition3D");
var j=l("iphone/shared/parallax/renderer/Translate3D");function k(a,d){var c=[];
var e=[];var b=j;if("ontouchstart" in window){b=i}a.forEach(function(q){var p=new h(1,[{property:"y",from:q.from,to:q.to}]);
var r=new b(q.actor,p);r.activate();e.push(r);c.push({clip:p,element:q.stage})});
var f=new g(c,d);f.activate();return{player:f,renderers:e}}return k});AC.define("iphone/shared/forceTridentRedraw/forceTridentRedraw",["require"],function(e){var g=(AC.Environment.Browser.name==="IE"&&AC.Environment.Browser.version<=8);
var h=/\#.+/.test(document.location.hash);var f=(!g||!h)?function(){}:function(a){AC.Element.selectAll(a).forEach(function(b){AC.Element.setStyle(b,{overflow:"visible"});
setTimeout(function(){AC.Element.setStyle(b,{overflow:"hidden"});setTimeout(function(){AC.Element.setStyle(b,{overflow:""})
},125)},125)})};return f});AC.define("features/bootstrap",["require","iphone/shared/ac_autogallery/Types/cases","iphone/shared/gallery/imageLinkPreload","features/analytics/builder","features/modules/hero","features/modules/interstitials","features/parallax/builder","iphone/shared/forceTridentRedraw/forceTridentRedraw"],function(A){var s=function(b,i,e){var c,g,d;
var f=null;var h=0;e||(e={});var a=function(){h=e.leading===false?0:new Date;f=null;
d=b.apply(c,g)};return function(){var k=new Date;if(!h&&e.leading===false){h=k}var j=i-(k-h);
c=this;g=arguments;if(j<=0){clearTimeout(f);f=null;h=k;d=b.apply(c,g)}else{if(!f&&e.trailing!==false){f=setTimeout(a,j)
}}return d}};var z=!!("ontouchstart" in window)||!!("onmsgesturechange" in window);
var w=AC.Element;var p=A("iphone/shared/ac_autogallery/Types/cases");var C=A("iphone/shared/gallery/imageLinkPreload");
var r=A("features/analytics/builder");var v=A("features/modules/hero");var x=v(".flushrow.hero",".hero figure.hero .image",z);
var B=A("features/modules/interstitials");var u=B(".interstitial.parallax",".interstitial.parallax .image",z);
var t=A("features/parallax/builder");var q={};var y=A("iphone/shared/forceTridentRedraw/forceTridentRedraw");
function D(a){x.setHeight();var b=u.getPositions();if(q&&q.renderers){q.renderers.forEach(function(c){c.deactivate()
})}q=t(b,document)}AC.onDOMReady(function(){var c,d,a;var b=["gallery-cases"];for(c=0,d=b.length;
c<d;c+=1){a=b[c];if(AC.AutoGallery.galleries[a]){C(AC.Element.selectAll(".imageLink",AC.AutoGallery.galleries[a].__wrapper),AC.AutoGallery.galleries[a])
}}});w.addEventListener(window,"load",function(){window.setTimeout(function(){r(AC.Element.selectAll("[data-track-visitor-engagement]"),{decimals:1})
},100);if(z){x.setHeight(1238);u.getPositions(1238)}else{D(null);var a=s(D,1000);
w.addEventListener(window,"resize",a,false)}});AC.onDOMReady(function(){y(".flushrow.software, .flushrow.software .interstitial")
});return{}});