Object.defineProperties=Object.defineProperties||function(){};(function(){var d=0;
var f=["ms","moz","webkit","o"];for(var e=0;e<f.length&&!window.requestAnimationFrame;
++e){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(a,i){var j=new Date().getTime();
var c=Math.max(0,16-(j-d));var b=window.setTimeout(function(){a(j+c)},c);d=j+c;
return b}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(a){clearTimeout(a)
}}}());(function(l,h){var j="",k,i,m;if(l.addEventListener){k="addEventListener"
}else{k="attachEvent";j="on"}m="onwheel" in h.createElement("div")?"wheel":h.onmousewheel!==undefined?"mousewheel":"DOMMouseScroll";
l.addWheelListener=function(b,a,c){n(b,m,a,c);if(m=="DOMMouseScroll"){n(b,"MozMousePixelScroll",a,c)
}};function n(b,c,a,d){b[k](j+c,m=="wheel"?a:function(f){!f&&(f=l.event);var e={originalEvent:f,target:f.target||f.srcElement,type:"wheel",deltaMode:f.type=="MozMousePixelScroll"?0:1,deltaX:0,delatZ:0,preventDefault:function(){f.preventDefault?f.preventDefault():f.returnValue=false
}};if(m=="mousewheel"){e.deltaY=-1/40*f.wheelDelta;f.wheelDeltaX&&(e.deltaX=-1/40*f.wheelDeltaX)
}else{e.deltaY=f.detail}return a(e)},d||false)}})(window,document);
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(t){if(!("HTMLElement" in t)&&!("Element" in t)){return
}var C="classList",x="prototype",p=(t.HTMLElement||t.Element)[x],B=Object,r=String[x].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},A=Array[x].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++){if(b in this&&this[b]===a){return b
}}return -1},o=function(b,a){this.name=b;this.code=DOMException[b];this.message=a
},w=function(a,b){if(b===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(b)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")
}return A.call(a,b)},z=function(a){var b=r.call(a.className),c=b?b.split(/\s+/):[],d=0,e=c.length;
for(;d<e;d++){this.push(c[d])}this._updateClassName=function(){a.className=this.toString()
}},y=z[x]=[],u=function(){return new z(this)};o[x]=Error[x];y.item=function(a){return this[a]||null
};y.contains=function(a){a+="";return w(this,a)!==-1};y.add=function(){var a=arguments,b=0,d=a.length,c,e=false;
do{c=a[b]+"";if(w(this,c)===-1){this.push(c);e=true}}while(++b<d);if(e){this._updateClassName()
}};y.remove=function(){var a=arguments,b=0,e=a.length,c,f=false;do{c=a[b]+"";var d=w(this,c);
if(d!==-1){this.splice(d,1);f=true}}while(++b<e);if(f){this._updateClassName()}};
y.toggle=function(c,b){c+="";var d=this.contains(c),a=d?b!==true&&"remove":b!==false&&"add";
if(a){this[a](c)}return !d};y.toString=function(){return this.join(" ")};if(B.defineProperty){var q={get:u,enumerable:true,configurable:true};
try{B.defineProperty(p,C,q)}catch(v){if(v.number===-2146823252){q.enumerable=false;
B.defineProperty(p,C,q)}}}else{if(B[x].__defineGetter__){p.__defineGetter__(C,u)
}}}(self))}var _={defaults:function(h,e){var f={};e=e||{};for(var g in h){if(h.hasOwnProperty(g)){f[g]=(e[g]!=null)?e[g]:h[g]
}}return f}};AC.define("overview/shared/lib/utils",function(){});AC.define("overview/shared/event/Emitter",["require"],function(e){function f(){this._events=[]
}var d=f.prototype;d.on=function(b,a){var c=this._events;if(!c[b]){c[b]=[]}c[b].push(a)
};d.trigger=function(c,b){var h=this._events;var a=c.split(":")[0];b=b||{};b.type=c;
b.index=parseInt(c.split(":")[1],10);if(h[a]){h[a].forEach(function(g){g.call(this,b)
}.bind(this))}if(h[c]&&c.split(":").length>1){h[c].forEach(function(g){g.call(this,b)
}.bind(this))}};return f});AC.define("overview/shared/lib/analytics",["require"],function(e){function f(){this._trackingQueue=[];
this._interactionType=null;this._interactionStart=null}var d=f.prototype;d.flush=function(){var a;
while(a=this._trackingQueue.shift()){this.trackProps(a)}};d.initInteraction=function(a){this._interactionType=a;
this._interactionStart=+new Date()};d.queueInteraction=function(b,k,n){var l=+new Date();
var a=((l-this._interactionStart)/1000).toFixed(1);var m=this.getTrackingString(k,n);
var c={prop1:b,prop2:m,prop35:a};this._trackingQueue.push(c)};d.getTrackingString=function(a,b){return AC.Tracking.pageName()+" - "+a.toLowerCase()+" - section "+b
};d.trackProps=function(b){if(typeof b.prop2!=="string"){return}var a=this._currentSection;
if(a){b.prop3=this.getTrackingString(a.name,a.index)}AC.Tracking.trackClick(b,window,"o",b.prop3)
};d.setCurrentSection=function(a){this._currentSection=a};d.trackLink=function(a,b,c){if(arguments.length<3){return
}window.setTimeout(function(){AC.Tracking.trackClick({prop1:a,prop3:AC.Tracking.pageName()+" - "+b.toString().toLowerCase()+" - section "+c},this,"o",AC.Tracking.pageName()+" - "+b.toLowerCase()+" - section "+c)
},1000)};return f});AC.define("overview/shared/app/Core",["require","overview/shared/lib/utils","overview/shared/event/Emitter","overview/shared/lib/analytics"],function(f){f("overview/shared/lib/utils");
var h=f("overview/shared/event/Emitter");var g=f("overview/shared/lib/analytics");
function e(){this.analyzer=new g();h.call(this)}e.prototype=new h();e.prototype.addTimelineEvents=function(a){a.filter(function(b){return(!isNaN(b.pause))
}).forEach(function(b,c){if(b.events){b.events.forEach(function(d){this.sectionController.on(d.type+":"+c,d.action)
},this)}},this)},e.prototype.createFadeCurtain=function(){var a=document.createElement("div");
a.id="curtain";document.getElementById("wrapper").appendChild(a)};e.prototype.convertSectionsToClips=function(a){var b={};
b.clips=[];b.events={pauses:[]};a.forEach(function(c){if(!isNaN(c.pause)){b.events.pauses.push(c.pause)
}b.events.pauses.sort(function(d,j){return(d>j)?1:-1});b.clips=b.clips.concat(c.clips.map(function(d){return{start:c.time+d.start,end:c.time+d.end,media:d.media,pauses:d.pauses}
}))});return b};e.prototype.resizeFluidAreas=function(){var a=this.resizeContainers();
this.resizePlaceholders(a)};e.prototype.enterAnalytics=function(){this.analyzer.initInteraction();
this.analyzer.setCurrentSection(app.sectionController.currentSection);clearTimeout(this._analyzerTimeout);
this._analyzerTimeout=window.setTimeout(function(){this.analyzer.flush()}.bind(this),1000)
};e.prototype.exitAnalytics=function(b){clearTimeout(this._analyzerTimeout);var d=app.sectionController._pauseTimeline[b.from];
var c=app.sectionController.getSectionFromPausePoint(d).name;var a=app.uiController._lastInteractionType;
this.analyzer.queueInteraction(a,c,b.from)};e.prototype.setupFocusEvents=function(){var a=this.sectionController._pauses[0];
this.sectionController.on("pauseenter",function(c){var b=c.section||a;var l=document.querySelector(b.labelSelector);
var d=l.querySelector(".title");var k=l.querySelector(".button");d.tabIndex=-1;
if(k){k.tabIndex=0}d.focus()}.bind(this));this.sectionController.on("pauseexit",function(c){var b=c.section||a;
var j=document.querySelector(b.labelSelector);var d=j.querySelector(".button");
if(d){d.tabIndex=-1}})};e.prototype.addNextCarets=function(){var a=document.querySelector("#hero .caret");
if(!a){return}var b=[document.querySelector("#hero"),document.querySelector("#comingsoon"),document.querySelector("#measurements")];
var c=document.querySelectorAll("section",this.panelcontainer);c=Array.prototype.slice.call(c);
c=c.filter(function(d){return b.indexOf(d)===-1});c.forEach(function(o){var d=a.cloneNode(true);
var n=o.querySelector(".copy");var r=d.querySelector(".cta");var q=d.querySelector(".button");
var p=function(i){if(i.type==="click"||i.type==="keydown"&&i.keyCode===13){this.sectionController.next()
}}.bind(this);q.id="";q.tabIndex=-1;q.classList.add("next");r.innerHTML=r.getAttribute("data-next");
d.addEventListener("click",p);d.addEventListener("keydown",p);n.appendChild(d)}.bind(this))
};return e});AC.define("overview/shared/controller/Clip",["require","overview/shared/event/Emitter"],function(e){var g=e("overview/shared/event/Emitter");
function f(a,b){g.call(this);this._mediaTimer=b;this._clips=[].concat(a);this._update=this._update.bind(this);
this._prevTime=this._mediaTimer.currentTime;this._duration=0;this._clips.forEach(function(c){c.media.el.classList.add("clip");
if(!c.end){c.end=c.start+c.media.duration;if(c.pauses){c.pauses.forEach(function(d){c.end+=d.to-d.from
})}}this._duration=Math.max(this._duration,c.end)},this)}var h=f.prototype=new g();
h.constructor=f;h._getActiveClips=function(a){return this._clips.filter(function(b){return(b.media!==this._mediaTimer&&b.start<=a&&a<=b.end)
},this)},h._timeToClipTime=function(a){var b=0;if(a.pauses){a.pauses.forEach(function(c){if(this._mediaTimer.currentTime>=c.from&&this._mediaTimer.currentTime>=c.to){b+=c.to-c.from
}else{if(this._mediaTimer.currentTime>=c.from&&this._mediaTimer.currentTime<c.to){b+=this._mediaTimer.currentTime-c.from
}}}.bind(this))}return this._mediaTimer.currentTime-a.start-b};h._processTransitoryClips=function(d,c){var b=this._getActiveClips(d),a=this._getActiveClips(c);
b=b.filter(function(j){return(a.indexOf(j)===-1)});b.forEach(function(j){if(j.media.el){j.media.el.classList.remove("visible")
}j.media.currentTime=this._timeToClipTime(j)},this);a.forEach(function(j){if(j.media.el){j.media.el.classList.add("visible")
}j.media.currentTime=this._timeToClipTime(j)},this)};h._update=function(d,a){var b,c;
if(this.currentTime<0){this.trigger("start");this.pause();this._mediaTimer.currentTime=0
}this.trigger("timeupdate");if(this._mediaTimer.update){this._mediaTimer.update()
}if(this.currentTime>=this._duration||a){this.pause();this.trigger("ended");this._mediaTimer.currentTime=this._duration
}this._processTransitoryClips(this._prevTime,this.currentTime);if(!this.paused){this._animationID=window.requestAnimationFrame(this._update)
}this._prevTime=this.currentTime};h.play=function(){var a=true;if(this.paused){if(this.currentTime<0.5&&this.playbackRate<0){this.currentTime=0;
this.trigger("play");return}else{if(this.currentTime>this.duration-0.5&&this.playbackRate>0){this.currentTime=this.duration;
this.trigger("play");return}}a=this._mediaTimer.play();this.trigger("play");this._animationID=window.requestAnimationFrame(this._update)
}return a};h.pause=function(){if(!this.paused){this._mediaTimer.pause();this.trigger("pause");
window.cancelAnimationFrame(this._animationID)}return this};Object.defineProperties(f.prototype,{currentTime:{enumerable:true,configurable:false,get:function(){return this._mediaTimer.currentTime
},set:function(a){this._mediaTimer.currentTime=a;this._update()}},playbackRate:{get:function(){return this._mediaTimer.playbackRate
},set:function(a){this._mediaTimer.playbackRate=a}},paused:{get:function(){return this._mediaTimer.paused
},set:function(){}},duration:{get:function(){return this._duration},set:function(){}}});
return f});AC.define("flow/diff/Loader",["require","assetLoader/AssetLoader"],function(e){var h,f=e("assetLoader/AssetLoader");
function g(c,i){var d,a,b=c.match(/#/g).length;this.imagesUrls=[];if(!i){throw new Error("0 images provided")
}for(d=1;d<=i;d++){a="0000"+d;a=a.substring(a.length-b);this.imagesUrls.push(c.replace(/#{2,}/g,a))
}}h=g.prototype;h.load=function(){return new f(this.imagesUrls).load()};return g
});AC.define("flow/diff/Render",["require","flow/diff/Loader","defer/Deferred"],function(i){var h,j=i("flow/diff/Loader"),f=i("defer/Deferred");
function g(a,b){this.flowData=a;this.flowData.imageUrlPattern=b}h=g.prototype;h._storeImages=function(a){if(DEBUG){console.log("loaded images")
}this.images=a;this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new f()).resolve()};h._applyDiffRange=function(A,d){var v=d.block,z=d.length,B=A.canvas.width/this.flowData.blockSize,x=Math.floor(v/this._blocksPerFullDiff),D=this.images[x].width,C=v%this._blocksPerFullDiff,E=D/this.flowData.blockSize,a=(C%E)*this.flowData.blockSize,b=Math.floor(C/(E||1))*this.flowData.blockSize,e=(d.location%B)*this.flowData.blockSize,w=Math.floor(d.location/B)*this.flowData.blockSize,y,c;
while(z){y=Math.min((z*this.flowData.blockSize),A.canvas.width-e,D-a);c=y/this.flowData.blockSize;
if(DEBUG){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:x,block:v,x:a,y:b})
}}A.drawImage(this.images[x],a,b,y,this.flowData.blockSize,e,w,y,this.flowData.blockSize);
z-=c;if(z){if((a+=y)>=D){a=0;b+=this.flowData.blockSize}if((C+=c)>=this._blocksPerFullDiff){C=0;
a=0;b=0;x+=1;if(x===this.flowData.imagesRequired-1){D=this.images[x].width}}if((e+=y)>=A.canvas.width){e=0;
w+=this.flowData.blockSize}v+=c}}};h.init=function(){if(DEBUG){console.log("load images")
}return new j(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load().then(this._storeImages.bind(this))
};h.renderDiff=function(d,a){var c=d.getContext("2d");a-=1;if(DEBUG){this._frameToRender=a;
console.log("applying diff frame : "+(a+1))}this.frames[a].forEach(function b(e){this._applyDiffRange(c,e)
}.bind(this))};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(h,{frames:{get:function(){return this.flowData.frames},set:function(a){this.flowData.frames=a
},enumerable:true}});return g});AC.define("flow/compositor/Sequence",["require","assetLoader/AssetLoader","flow/diff/Render","defer/Deferred"],function(l){var j,h=l("assetLoader/AssetLoader"),i=l("flow/diff/Render"),g=l("defer/Deferred");
function k(a,b,c){this._keyframes=a;this._imageUrlPattern=b;this._flowDataProvider=c
}j=k.prototype;j._initDiffRender=function(a){this._images=a;this.canvas.height=a[0].height;
this.canvas.width=a[0].width;this.applyFrame(a[0])};j.init=function(a){this.canvas=a||document.createElement("canvas");
return new h(this._keyframes).load().then(this._initDiffRender.bind(this)).then(this._flowDataProvider.load.bind(this._flowDataProvider))
};j.createDiffRender=function(a){this._diffRender=new i(a,this._imageUrlPattern);
return this._diffRender.init()};j.applyFrame=function(a){var b=this.canvas.getContext("2d");
b.drawImage(a,0,0)};j.calculateRenderCount=function(c,b){var a=0;if(Math.abs(b-c)>=b){c=1;
a=1}else{if(Math.abs(b-c)>=(this.frameCount-b)&&this._images[1]){c=this.frameCount-2;
a=1}}if(b>0&&b<this.frameCount-1){return Math.abs(c-b)+a}else{return a}};j.compositeFrames=function(d,b){var c=new g();
b=(this.frameCount<b)?this.frameCount-1:(b<0)?0:b;d=(this.frameCount-2<d)?this.frameCount-2:(d<0)?0:d;
var a;if(DEBUG){console.groupCollapsed("Rendering diff frames: "+d+"..."+b)}if(Math.abs(b-d)>=b){d=1;
if(DEBUG){console.log("applying start keyframe")}this.applyFrame(this._images[0])
}else{if(Math.abs(b-d)>=(this.frameCount-b)&&this._images[1]){d=this.frameCount-2;
if(DEBUG){console.log("applying end keyframe")}this.applyFrame(this._images[1])
}}a=(d>b)?-1:(d<b)?1:0;if(b>0&&b<this.frameCount-1){while(d!==b){c.progress(d);
this._diffRender.renderDiff(this.canvas,d);d+=a;c.progress(d)}}if(DEBUG){console.groupEnd()
}c.resolve(d);return c.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(j,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(a){return this._canvas=a
},enumerable:true},mainCompositor:{get:function(){var a=this;while(a._compositor){a=a._compositor
}return a},enumerable:true}});return k});AC.define("flow/data/Manifest",[],function(){function b(){}return b
});AC.define("flow/data/Block",[],function(){function b(a,d){this.location=a;this.length=d
}return b});AC.define("flow/data/processor",["require","flow/data/Manifest","flow/data/Block"],function(f){var h=f("flow/data/Manifest"),g=f("flow/data/Block"),i;
var j={parseData:function(b){i=0;var a=b.frames.map(this._parseFrame,this);return Object.create(h.prototype,{version:{value:b.version},framecount:{value:b.frameCount},blockSize:{value:b.blockSize},imagesRequired:{value:b.imagesRequired},reversible:{value:b.reversible},superframeFrequency:{value:b.superframeFrequency},frames:{value:a}})
},_valueForCharAt:function(a,c){var b=a.charCodeAt(c);if(b>64&&b<91){return b-65
}if(b>96&&b<123){return b-71}if(b>47&&b<58){return b+4}if(b===43){return 62}if(b===47){return 63
}throw"Invalid Bas64 character: "+a.charAt(c)},_createNumberFromBase64Range:function(a,e,b){var c=0,d;
while(b--){d=this._valueForCharAt(a,e++);c+=(d<<b*6)}return c},_parseFrame:function(d){var c,a=[],d=d.value||d,b,e;
for(c=0;c<d.length;c+=5){e=this._createNumberFromBase64Range(d,c,3);b=this._createNumberFromBase64Range(d,c+3,2);
a.push(Object.create(g.prototype,{location:{value:e,enumerable:true},length:{value:b,enumerable:true},block:{value:(i+=b)-b,enumerable:true}}))
}return a}};return j});AC.define("flow/data/provider/Async",["require","ajax/Ajax","flow/data/processor"],function(f){var i,g=f("ajax/Ajax"),h=f("flow/data/processor");
function j(b,a){this._url=b;this._ajaxAdaptor=a||new g()}i=j.prototype;i.load=function(){var a=this;
return this._ajaxAdaptor.get(this._url).then(function(c){try{var d=c.response||c.responseText;
return JSON.parse(d)}catch(b){if(DEBUG){console.log("Failed to parse manifest data")
}}}).then(function(b){a._data=b;return h.parseData(b)})};return j});AC.define("flow/data/provider/Sync",["require","defer/Deferred","flow/data/processor"],function(f){var i,g=f("defer/Deferred"),h=f("flow/data/processor");
function j(a){this._data=a}i=j.prototype;i.load=function(){var a=new g();a.resolve(h.parseData(this._data));
return a.promise()};return j});AC.define("flow/Player",["require","defer/Deferred"],function(e){var g,f=e("defer/Deferred");
function h(a,b){this._flow=b;this._frameRate=30;this.element=a;this.paused=true;
this.loop=false}g=h.prototype;g._dispatchEvent=function(b){var a=document.createEvent("Events");
a.initEvent(b,true,false);a.data=this;this.element.dispatchEvent(a);return a};g._timeToFrame=function(b){var a;
a=Math.round(b/this.duration*this._flow.frameCount);a=a%(this._flow.frameCount+1);
return(a<0)?this._flow.frameCount+a:a};g._advanceToTimeGlobal=function(c){this._prevTime=this._prevTime||c;
this._currentTime+=((c-this._prevTime)/1000)*this.playbackRate;this._prevTime=c;
var b=this._timeToFrame(this._currentTime),a=false;if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){b=this._flow.frameCount;
this._currentTime=this.duration;a=true}else{if(this.playbackRate<0&&this._currentTime<0){b=0;
this._currentTime=0;a=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(b).then(function(){this._dispatchEvent("timeupdate");
if(a){this.paused=true;this._dispatchEvent("ended")}else{this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}}.bind(this))}else{return(new f()).reject()}};g._advanceToTimeLocal=function(a){if(!this.seeking){this.seeking=true;
this._dispatchEvent("seeking");this._currentTime=1*a;this._prevTime=null;window.cancelAnimationFrame(this._requestAnimationFrame);
this._flow.gotoFrame(this._timeToFrame(a)).then(function(){this.seeking=false;this._dispatchEvent("timeupdate");
this._dispatchEvent("seeked");this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}.bind(this))}if(DEBUG){console.log("advance to time "+a+" from "+this._currentTime)
}};g.load=function(){this._dispatchEvent("loadstart");return this._flow.init(this.element).then(this._dispatchEvent.bind(this,"canplaythrough"))
};g.play=function(){if(this.paused){this.paused=false;this._dispatchEvent("play");
this._prevTime=null;this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}return this};g.pause=function(){if(!this.paused){this.paused=true;window.cancelAnimationFrame(this._requestAnimationFrame);
this._dispatchEvent("pause")}return this};g.on=function(){this.element.addEventListener.apply(this.element,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(g,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:g._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(a){if(isFinite(a)){this._frameRate=a;this._dispatchEvent("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(a){if(isFinite(a)){this._playbackRate=1*a;
this._dispatchEvent("ratechange")}},enumerable:true},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:true}});return h});AC.define("flow/keyframe/Loader",["require","assetLoader/AssetLoader","defer/Deferred"],function(i){var h,g=i("assetLoader/AssetLoader"),j=i("defer/Deferred");
function f(d,a){var b,c=d.match(/#/g).length;this._keyframes={};d=d.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(a.frames){a.frames.forEach(function(e,l){if(e.type==="keyframe"){b="0000"+l;
b=b.substring(b.length-c);this._imageUrls.push(d.replace(/#+/g,b));this._keyframes[l]=e
}}.bind(this))}}h=f.prototype;h.load=function(){if(this._imageUrls.length>0){return new g(this._imageUrls).load()
}return(new j()).resolve()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(h,{keyframes:{get:function(){return this._keyframes},enumerable:true}});
return f});AC.define("flow/keyframe/Render",["require","flow/keyframe/Loader"],function(f){var e,g=f("flow/keyframe/Loader");
function h(a,b){this.flowData=a;this.flowData.imageUrlPattern=b}e=h.prototype;e._storeImages=function(d){var b=0,a;
if(d&&d.length>0){if(DEBUG){console.log("loaded keyframe diff images")}for(var c in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(c)){a=d[b];
this._loader._keyframes[c].image=a;b+=1}}}if(DEBUG){if(!d||d.length===0){console.log("no keyframe diff images to load")
}}};e.init=function(){if(DEBUG){console.log("loading keyframe diff images")}this._loader=new g(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};e.renderKeyframe=function(t,u,a){var v=t.getContext("2d"),r=this._loader.keyframes[u],q=r.image,c=r.x,d=r.y,b=r.width,p=r.height;
if(DEBUG){console.log("applying keyframe diff image: "+u);console.log("x:"+c+" y:"+d+" w:"+b+" h:"+p)
}if(a===true){if(DEBUG){console.log("drawing superKeyframe sub-rectangle")}v.drawImage(q,c,d,b,p,c,d,b,p)
}else{if(this.flowData.reversible){if(DEBUG){console.log("drawing superKeyframe full image")
}v.drawImage(q,0,0)}else{if(DEBUG){console.log("drawing keyframe full image")}v.drawImage(q,c,d,b,p)
}}};return h});AC.define("flow/compositor/decorator/Keyframe",["require","flow/keyframe/Render","defer/Deferred"],function(j){var i,f=j("flow/keyframe/Render"),g=j("defer/Deferred");
function h(a){this._compositor=a;this._flowDataProvider=this.mainCompositor._flowDataProvider
}i=h.prototype;i.init=function(a){this._keyframeDiffRender=new f(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};i.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};i.applyKeyframe=function(b,a){this._keyframeDiffRender.renderKeyframe(this.canvas,b,a)
};i.compositeFrames=function(c,a){if(!this._isKeyframeDiff(a-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var b=new g();if(DEBUG){console.groupCollapsed("Rendering keyframe diff image: "+(c-1))
}this.applyKeyframe(a-1);if(DEBUG){console.groupEnd()}b.resolve(c-1);return b.promise()
};i._isKeyframeDiff=function(a){return a in this._keyframeDiffRender._loader._keyframes
};i.calculateRenderCount=function(b,a){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(i,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return h});AC.define("flow/compositor/decorator/Superframe",[],function(){var d;
function c(a,b){this._compositor=a;this._superframeInterval=b||4}d=c.prototype;
d._getClosestSuperframe=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};d.init=function(a){this._screenCanvas=a};d.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};d.calculateRenderCount=function(f,a){var b=this._getClosestSuperframe(f);if(Math.abs(b-a)>this._superframeInterval/2){f=b+((f>a)?-1:1)*this._superframeInterval;
return this.calculateRenderCount(f,a)+1}else{return Math.abs(b-a)+1}};d.compositeFrames=function(j,b){var a,i;
if(b<=0||b>=this.frameCount-2){this._compositor.compositeFrames(j,b)}if(j>this.frameCount-2){j=this.frameCount-2
}else{if(j<=0){j=1}}i=this._getClosestSuperframe(j);if(DEBUG){console.groupCollapsed("Rendering : "+j+"..."+b)
}if(this._compositor.calculateRenderCount(j,b)>this.calculateRenderCount(j,b)){if(DEBUG){console.groupCollapsed("Rendering (superframe) : "+i)
}a=this._compositor.compositeFrames(i,i).then(function h(){if(DEBUG){console.groupEnd()
}var e=i+((j>b)?-1:1)*this._superframeInterval;this._compositor.compositeFrames(i,e).then(function(){return this.compositeFrames(e,b)
}.bind(this))}.bind(this))}else{if(DEBUG){console.groupCollapsed("Rendering (final frames) : "+j+"..."+b)
}a=this._compositor.compositeFrames(j,b).then(function h(){if(DEBUG){console.groupEnd()
}}.bind(this))}a.then(function h(){if(DEBUG){console.groupEnd()}}.bind(this));return a
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(d,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return c});AC.define("flow/compositor/decorator/SuperKeyframe",["require","defer/Deferred"],function(e){var h,f=e("defer/Deferred");
function g(a){this._compositor=a;this._frames=this.mainCompositor._flowDataProvider._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}h=g.prototype;h.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};h.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};h.applyKeyframe=function(b,a){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};h.compositeFrames=function(j,b){var a,c,d=new f();if(b<1||b>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(b-1)){a=Math.abs(j-b)===1?true:false;if(DEBUG){console.groupCollapsed("Drawing superKeyframe image: "+(b-1))
}this.applyKeyframe(b-1,a);if(DEBUG){console.groupEnd()}d.resolve(j-1);return d.promise()
}if(Math.abs(b-j)>this._superframeInterval){c=this._getShortestRender(j,b);if(this._isKeyframeDiff(c-1)||c<=0||c>=this.frameCount-2){return this._compositeFromSuperKeyframe(c,b)
}}if(DEBUG){console.log("SuperKeyframe compositor handing off to slave compositor: fromFrame:"+j+" toFrame:"+b)
}return this._compositor.compositeFrames.apply(this._compositor,[j,b])};h._getShortestRender=function(l,d){var b=this._compositor.calculateRenderCount,c=this._getClosestSuperKeyframe(d-1),k=b.apply(this._compositor,[c,d])+1,a=b.apply(this._compositor,[l,d]);
if(k<=a){return c}else{return l}};h._compositeFromSuperKeyframe=function(a,c){var j=this.canvas.getContext("2d"),d=(a<=0)?this.mainCompositor._images[0]:(a>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[a-1].image),b;
if(DEBUG){console.log("Drawing superKeyframe for composite base: superKeyframe "+(a-1))
}j.drawImage(d,0,0);return this._compositor.compositeFrames.call(this._compositor,a,c)
};h._getClosestSuperFrame=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};h._getClosestSuperKeyframe=function(i){var b,a,c,d,l=this._frames.length;if(i<l+1&&i>0){d=i-1;
while(d>=0){if(this._frames[d].type==="keyframe"){b=d+1;break}d-=1}d=i+1;while(d<=l-1){if(this._frames[d].type==="keyframe"){a=d+1;
break}d+=1}}b=b?b:0;a=a?a:this.frameCount;c=(i-b)<(a-i)?b:a;return c};h._isKeyframeDiff=function(a){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(h,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});return g});AC.define("flow/compositor/decorator/Cache",[],function(){var c;
function d(a,b){this._compositor=a;this._keyframeInterval=b||8;this._keyframes=[]
}c=d.prototype;c._getClosestKeyframe=function(f){var b=f%this._keyframeInterval,a=Math.floor(f/this._keyframeInterval)+((b>(this._keyframeInterval/2))?1:0);
return a};c._getFrameFromKeyframe=function(a){return a*this._keyframeInterval};
c._saveKeyframe=function(a){var f,b=Math.floor(a/this._keyframeInterval);if(a%this._keyframeInterval===0&&!this._keyframes[b]){if(DEBUG){console.log("saving keyframe "+a)
}f=document.createElement("canvas");f.width=this._compositor.canvas.width;f.height=this._compositor.canvas.height;
f.getContext("2d").drawImage(this._compositor.canvas,0,0);this._keyframes[b]=f}};
c.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};c.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};c.calculateRenderCount=function(b,a){b=this._getFrameFromKeyframe(this._getClosestKeyframe(a));
return this._compositor.calculateRenderCount(b,a)+1};c.compositeFrames=function(h,b){var a=this._getClosestKeyframe(b);
if(DEBUG){console.groupCollapsed("Rendering frames: "+h+"..."+b)}if(this._keyframes[a]&&(this._compositor.calculateRenderCount(h,b)>this.calculateRenderCount(h,b))){h=this._getFrameFromKeyframe(a);
if(DEBUG){console.log("applying prerendered keyframe: "+h)}this.applyFrame(this._keyframes[a]);
return this._compositor.compositeFrames(h,b).then(function g(){if(DEBUG){console.groupEnd()
}})}else{return this._compositor.compositeFrames(h,b).then(function g(){if(DEBUG){console.groupEnd()
}},null,this._saveKeyframe.bind(this))}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(c,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});return d});AC.define("stats/Benchmark",[],function(){function b(a){this.name=a
}b.prototype.start=function(){if(DEBUG){console.log("▼▼▼ start "+this.name+" benchmark");
this.startTime=new Date().getTime();console.time(this.name)}};b.prototype.end=function(){if(DEBUG){this.endTime=new Date().getTime();
console.log("▲▲▲ end "+this.name+" benchmark "+(this.endTime-this.startTime)/1000+" sec");
console.time(this.timeEnd)}};return b});AC.define("flow/compositor/decorator/Benchmark",["require","stats/Benchmark"],function(f){var e,g=f("stats/Benchmark");
function h(a){this._compositor=a}e=h.prototype;e.init=function(b){var a=new g("init");
a.start();return this._compositor.init.apply(this._compositor,arguments).then(a.end.bind(a))
};e.applyFrame=function(){var a=new g("applyFrame");a.start();this._compositor.applyFrame.apply(this._compositor,arguments);
a.end.bind(a)};e.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};e.compositeFrames=function(){var a=new g("renderFrames");a.start();return this._compositor.compositeFrames.apply(this._compositor,arguments).then(a.end.bind(a))
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(e,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});h.prototype=e;return h});AC.define("flow/Flow",["require","defer/Deferred","flow/compositor/decorator/Keyframe","flow/compositor/decorator/Superframe","flow/compositor/decorator/SuperKeyframe","flow/compositor/decorator/Cache","flow/compositor/decorator/Benchmark"],function(r){var p,m=r("defer/Deferred"),l=r("flow/compositor/decorator/Keyframe"),n=r("flow/compositor/decorator/Superframe"),o=r("flow/compositor/decorator/SuperKeyframe"),j=r("flow/compositor/decorator/Cache"),k=r("flow/compositor/decorator/Benchmark");
function q(b,a){this._compositor=b;this.options=a||{}}p=q.prototype;p.gotoFrame=function(a){if(this._rendering){return(new m()).resolve()
}else{if(this._currentFrame===a){return(new m()).resolve()}}this._rendering=true;
if(DEBUG){console.groupCollapsed("gotoFrame:"+a+" currentFrame:"+this._currentFrame)
}return this._compositor.compositeFrames(this._currentFrame,a).then(function(){this._rendering=false;
this._currentFrame=a;if(DEBUG){console.groupEnd()}}.bind(this))};p.init=function(a){var b;
if(a.nodeName==="CANVAS"){b=a}else{b=document.createElement("canvas");a.appendChild(b)
}return this._compositor.init(b).then(function(c){return m.all([this._compositor.createDiffRender(c).then(this._decorateCompositor.bind(this))])
}.bind(this))};p._decorateCompositor=function(){var c=this._compositor,a=this._compositor._diffRender.flowData,b=this._compositor.canvas;
if(a.superframeFrequency){c=new n(c,a.superframeFrequency)}if(a.version===3){c=new l(c)
}if(a.version===3&&a.superframeFrequency){c=new o(c)}if(this.options.keyframeCache){c=new j(c,this.options.keyframeCache)
}if(this.options.benchmark){c=new k(c)}if(c===this._compositor){return(new m()).resolve()
}else{this._compositor=c;return this._compositor.init(b)}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(p,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true}});return q});AC.define("flow/playerFactory",["require","flow/compositor/Sequence","flow/data/provider/Async","flow/data/provider/Sync","flow/Player","flow/Flow"],function(n){var h=n("flow/compositor/Sequence"),j=n("flow/data/provider/Async"),k=n("flow/data/provider/Sync"),i=n("flow/Player"),m=n("flow/Flow");
function l(b,p,c,a,d){var e,g,f;d=d||{};d={keyframeCache:(typeof d.keyframeCache==="undefined")?8:d.keyframeCache,benchmark:(typeof d.benchmark==="undefined")?false:d.benchmark,preload:(typeof d.preload==="undefined")?true:d.preload};
p=p||[b.getAttribute("data-start-frame")];if(b.getAttribute("data-end-frame")){p.push(b.getAttribute("data-end-frame"))
}c=c||b.getAttribute("data-image-url-pattern");f=(typeof a==="string")?new j(a):new k(a);
e=new h(p,c,f);g=new i(b,new m(e,d));if(d.preload){g.load()}return g}return l});
AC.define("overview/shared/MediaTimer",[],function(){function c(){this._currentTimeMS=0;
this._playbackRate=1;this.playing=false;this._paused=true;this._resetStartTime()
}var d=c.prototype;d._updateCurrentTime=function(){var a,b=+new Date();if(this.paused){a=0
}else{a=(b-this._startTime)}this._currentTimeMS+=(a*this._playbackRate);this._startTime=b
};d._resetStartTime=function(){this._startTime=+new Date()},d.play=function(){this._resetStartTime();
this.playing=true;this._paused=false;return this};d.pause=function(){this._updateCurrentTime();
this.playing=false;this._paused=true;return this};Object.defineProperties(d,{currentTime:{get:function(){this._updateCurrentTime();
return this._currentTimeMS/1000},set:function(a){this._resetStartTime();this._currentTimeMS=a*1000
}},playbackRate:{get:function(){return this._playbackRate},set:function(a){this._resetStartTime();
this._playbackRate=a}},paused:{get:function(){return this._paused},set:function(){}}});
return c});AC.define("overview/shared/media/TimedVideo",["require","overview/shared/MediaTimer","defer/Deferred"],function(j){var h=j("overview/shared/MediaTimer"),f=j("defer/Deferred");
function g(a,d,b){this._deferred=new f();this._paused=true;this._playbackRate=1;
this._backwardsTimer=new h();this._video=document.createElement("video");if(b){this._video.poster=b
}var c=function(e){this._video.removeEventListener("error",c);this._video.parentNode.removeChild(this._video);
this._deferred.reject(e)}.bind(this);this._video.addEventListener("error",c);this._video.addEventListener("canplay",function(e){this._video.removeEventListener("error",c);
this.canplay=true;this._deferred.resolve(e)}.bind(this));this._video.src=d;a.appendChild(this._video)
}var i=g.prototype;i.promise=function(){return this._deferred.promise()};i.update=function(){if(this.playbackRate<0){this._video.currentTime=this._backwardsTimer.currentTime
}};i.play=function(){if(this.paused){if(this.playbackRate>=0){this._video.playbackRate=this.playbackRate;
this._video.play()}else{this._backwardsTimer.playbackRate=this.playbackRate;this._backwardsTimer.play()
}this._paused=false}return true};i.pause=function(){if(!this.paused){this._video.pause();
this._backwardsTimer.pause();this.currentTime=this.currentTime;this._paused=true
}};Object.defineProperties(i,{currentTime:{get:function(){if(!this.paused&&this.playbackRate>=0){return this._video.currentTime
}else{return this._backwardsTimer.currentTime}},set:function(a){this._video.currentTime=a;
this._backwardsTimer.currentTime=a}},playbackRate:{get:function(){return this._playbackRate
},set:function(a){this._playbackRate=a}},paused:{get:function(){return this._paused
},set:function(){}}});return g});AC.define("overview/shared/media/BiVideo",["require","defer/Deferred","overview/shared/MediaTimer"],function(f){var g=f("defer/Deferred"),h=f("overview/shared/MediaTimer");
function i(E,y,x,c,A){var C=new g(),B=new g(),G,z,F=0,d,D;A=A||0;this._paused=true;
this._playbackRate=1;this._mediaTimer=new h();this._forwardsVideo=document.createElement("video");
if(c){this._forwardsVideo.poster=c}if(x){this._backwardsVideo=document.createElement("video")
}this._canPlayBackwards=false;this._canPlayForwards=false;var a=function(k){D=+new Date();
document.removeEventListener("touchstart",a);this._forwardsVideo.addEventListener("canplaythrough",function(){document.addEventListener("touchstart",e)
});this._forwardsVideo.load();window.app.uiController.next();k.preventDefault()
}.bind(this);var e=function(l){document.removeEventListener("touchstart",e);var k=setInterval(function(){var n;
try{n=this._forwardsVideo.seekable.end(0)}catch(m){}if(n===this._forwardsVideo.duration&&this.paused){clearInterval(k);
this._forwardsVideo.addEventListener("seeked",function(o){this._forwardsVideo.style.opacity=1
}.bind(this));this._forwardsVideo.currentTime=A||this.currentTime;this._canPlayForwards=true;
app.uiController.enableInput()}}.bind(this),100);l.preventDefault()}.bind(this);
var w=function(k){this._forwardsVideo.removeEventListener("progress",w);C.resolve(k)
}.bind(this);var b=function(k){this._backwardsVideo.removeEventListener("progress",b);
B.resolve(k)}.bind(this);this._forwardsVideo.style.height="100%";this._forwardsVideo.style.width="100%";
this._forwardsVideo.style.opacity=0;this._forwardsVideo.controls=false;if(x){this._backwardsVideo.style.height="100%";
this._backwardsVideo.style.width="100%";this._backwardsVideo.style.opacity=0;this._backwardsVideo.controls=false;
this._backwardsVideo.addEventListener("progress",b);this._backwardsVideo.src=x;
E.appendChild(this._backwardsVideo)}else{B=true}this._forwardsVideo.addEventListener("progress",w);
this._forwardsVideo.src=y;E.appendChild(this._forwardsVideo);this._promise=g.join(C,B).then(function(){document.addEventListener("touchstart",a)
}.bind(this))}var j=i.prototype;j.promise=function(){return this._promise};j.play=function(){var a=false;
if(this.paused){if(this.playbackRate>=0){if(this._canPlayForwards){this._forwardsVideo.play();
this._forwardsVideo.style.opacity="1";if(this._backwardsVideo){this._backwardsVideo.style.opacity="0"
}this._paused=false;a=true}else{this._mediaTimer.play();this._paused=false;a=true
}}else{if(this._canPlayBackwards){this._backwardsVideo.currentTime=this._backwardsVideo.duration-this._mediaTimer.currentTime;
this._backwardsVideo.play();setTimeout(function(){this._forwardsVideo.style.opacity="0";
this._backwardsVideo.style.opacity="1"}.bind(this),300);this._paused=false;a=true
}else{if(this._backwardsVideo){this._backwardsVideo.play();this._backwardsVideo.pause();
if(this._backwardsVideo.buffered.end(0)===this._backwardsVideo.duration){this._canPlayBackwards=true;
this._backwardsVideo.currentTime=this._backwardsVideo.duration-this._mediaTimer.currentTime
}}}}}return a};j.pause=function(){if(this._playbackRate>=0){if(this._canPlayForwards){this._forwardsVideo.pause();
this._mediaTimer.currentTime=this._forwardsVideo.currentTime;if(this._canPlayBackwards){this._backwardsVideo.currentTime=this._backwardsVideo.duration-this._mediaTimer.currentTime
}}}else{if(this._canPlayBackwards){this._backwardsVideo.pause();this._mediaTimer.currentTime=this._backwardsVideo.duration-this._backwardsVideo.currentTime;
this._forwardsVideo.currentTime=this._mediaTimer.currentTime}}this._mediaTimer.pause();
this._paused=true};Object.defineProperties(j,{currentTime:{get:function(){if(this._playbackRate>=0&&this._canPlayForwards){return this._forwardsVideo.currentTime
}else{if(this._playbackRate<0&&this._canPlayBackwards){return this._backwardsVideo.duration-this._backwardsVideo.currentTime
}else{return this._mediaTimer.currentTime}}},set:function(a){if(this._paused){this._mediaTimer.currentTime=a;
try{this._forwardsVideo.currentTime=a;this._forwardsVideo.play();this._forwardsVideo.pause()
}catch(b){}if(this._backwardsVideo){try{this._backwardsVideo.currentTime=this._backwardsVideo.duration-a
}catch(b){}}}}},playbackRate:{get:function(){return this._playbackRate},set:function(a){if(this._paused){var b=this.currentTime;
this._playbackRate=a;this.currentTime=b}}},paused:{get:function(){return this._paused
},set:function(){}}});return i});AC.define("overview/shared/ClipContainer",["require","overview/shared/controller/Clip","flow/playerFactory","overview/shared/media/TimedVideo","overview/shared/media/BiVideo","overview/shared/MediaTimer","defer/Deferred","assetLoader/AssetLoader"],function(t){var u=t("overview/shared/controller/Clip"),p=t("flow/playerFactory"),q=t("overview/shared/media/TimedVideo"),n=t("overview/shared/media/BiVideo"),m=t("overview/shared/MediaTimer"),r=t("defer/Deferred"),o=t("assetLoader/AssetLoader");
function k(a){var c=document.getElementById("stillcontainer");var b;for(var d in a){if(!c.querySelector(".still_"+d)){b=document.createElement("img");
b.src=a[d];b.alt="";b.className="still still_"+d;c.appendChild(b)}}}function l(a,b,c){this.containerElement=a;
this.config=b;this.clips=c}l.prototype.constructor=l;l.prototype.initFlow=function(g){var i=new r();
var h;var j="json";var b="jpg";var d=[g.flowKeyFrame,g.flowEndFrame];var f=g.diffDir;
var a=g.flowPattern||"flow_###.";var x=f+a+b;var e=g.manifestFileName||"flow_manifest.";
var c=/^https?:\/\/[^\/]+\//i;var y=g.manifest.replace(c,"../index.html")+e+j;if(g.stills){k(g.stills,g.stillsDir)
}h=p(this.containerElement,d,x,y,{superframes:false,keyframeCache:false,benchmark:false});
h.frameRate=g.fps;h.loop=false;h.on("canplaythrough",function(v){i.resolve(v)});
this.mediaElement=h;return i.promise()};l.prototype.initVideo=function(a){if(a.stills){k(a.stills)
}this.mediaElement=new q(this.containerElement,a.file,a.poster);return this.mediaElement.promise()
};l.prototype.initBiVideo=function(a){if(a.stills){k(a.stills)}this.mediaElement=new n(this.containerElement,a.file,a.backwards,a.poster,a.startTime);
return this.mediaElement.promise()};l.prototype.loadExperience=function(a){switch(a.type){case"bivideo":return this.initBiVideo(a);
case"video":return this.initVideo(a);case"flow":return this.initFlow(a);return new r().reject()
}};l.prototype.load=function(){var b=new r(),a=this.config;this.loadExperience(a[0]).then(function(){b.resolve()
},function(){this.loadExperience(a[1]).then(function(){b.resolve()})}.bind(this));
return b.promise().then(function(){this.clipController=new u(this.clips,this.mediaElement)
}.bind(this))};l.prototype.play=function(){this.clipController.play()};return l
});
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
AC.define("overview/shared/vendor/KeySpline",["require"],function(d){function c(a,n,b,p){this.get=function(e){if(a==n&&b==p){return e
}return t(o(e),n,p)};function q(e,f){return 1-3*f+3*e}function r(e,f){return 3*f-6*e
}function u(e){return 3*e}function t(f,e,g){return((q(e,g)*f+r(e,g))*f+u(e))*f}function m(f,e,g){return 3*q(e,g)*f*f+2*r(e,g)*f+u(e)
}function o(g){var i=g;for(var h=0;h<4;++h){var f=m(i,a,b);if(f===0){return i}var e=t(i,a,b)-g;
i-=e/f}return i}}return c});AC.define("overview/shared/clip/Tween",["require","overview/shared/vendor/KeySpline"],function(m){var k=m("overview/shared/vendor/KeySpline");
var n=["transform","webkitTransform","MozTransform","msTransform","oTransform"];
var l=AC.EasingFunctions;var p=["#measurements .width .line"];var i;(function o(){var a=document.createElement("div");
n.some(function(b){if(b in a.style){i=b;return true}})}());function j(d,a,b){var c=document.querySelector(d);
if(c&&c.nodeType&&c.nodeType===1){this._el=c}else{this._el=d}this.duration=a;this.props=b||[];
this.props.forEach(function(f){var e;if(f.easing==="keyspline"){e=f.keyspline;f.keyspline=new k(e[0],e[1],e[2],e[3])
}});this.beginning=0}j.prototype={tween:function(a){var b=this.duration,c=this.el,d=i;
if(this.props.length<1){return}this.props.forEach(function(f){var h,e=f.units,w=f.axis,x=f.property,g,v,y;
if(f.keyspline){h=f.keyspline.get(a/b)*(f.to-f.from)}else{h=l[f.easing||"linear"](a,f.from,(f.to-f.from),b)
}if(x==="translate"){v=d;if(w==="x"){y="translate3d("+h+e+", 0, 0)"}else{if(w==="y"){y="translate3d(0, "+h+e+", 0)"
}else{if(w==="z"){y="translate3d(0, 0, "+h+e+")"}}}}else{if(x==="translate2d"){v=d;
y="translate"+w.toUpperCase()+"("+h+e+")"}else{if(x==="scale"){v=d;if(w==="x"){y="scaleX("+h+")"
}else{if(w==="y"){y="scaleY("+h+")"}else{if(w==="z"){y="scaleZ("+h+")"}else{y="scale("+h+")"
}}}}else{v=x;y=h+(f.units||"")}}}c.style[v]=y})}};Object.defineProperties(j.prototype,{currentTime:{enumerable:true,configurable:false,get:function(){return this._currentTime
},set:function(a){this._currentTime=Math.max(0,Math.min(a,this.duration));this.tween(this._currentTime)
}},el:{enumerable:true,configurable:false,get:function(){if(this._el&&this._el.nodeType&&this._el.nodeType===1){return this._el
}else{if(!document.querySelector(this._el)){}return this._el=document.querySelector(this._el)
}}}});return j});AC.define("overview/shared/controller/Section",["require","overview/shared/MediaTimer","overview/shared/event/Emitter","overview/shared/clip/Tween"],function(p){var l=p("overview/shared/MediaTimer"),j=p("overview/shared/event/Emitter"),k=p("overview/shared/clip/Tween");
var n=500;var q=AC.Environment.Browser.name==="IE";var m=AC.Environment.Feature.cssPropertyAvailable("transition");
function r(c,b,a){j.call(this);if(!b||!b){throw new Error("SectionController: timeline is missing or incomplete.")
}this._clipController=c;this._pauseTimeline=b;this._sections=a;this._currentSectionIndex=0;
this._currentPauseIndex=0;this._seekable=false;this._update=this._update.bind(this);
this._pauses=this._sections.filter(function(d){return"pause" in d});this.fadeOutAnim=new k("#curtain",0.5,[{property:"opacity",from:0,to:1}]);
this.fadeInAnim=new k("#curtain",0.5,[{property:"opacity",from:1,to:0}]);this._curtain=document.getElementById("curtain");
this.on("pauseenter:0",function(){this._seekable=true}.bind(this));this._clipController.on("timeupdate",this._update);
this._clipController.on("ended",function(){this._currentPauseIndex=this._pauseTimeline.length-1;
this._enableSections(null,true)}.bind(this));this._clipController.on("play",this._derivePauseIndex.bind(this))
}var o=r.prototype=new j();o.constructor=r;o._update=function(a){var f=this.currentTime;
var b=this._clipController.playbackRate>0;var e=!b;var g=!this.paused||f===0||f===this.duration;
var d=b&&f>=this._pauseTimeline[this._currentPauseIndex+1];var c=e&&f<=this._pauseTimeline[this._currentPauseIndex-1];
var h=g&&(d||c);if(h){this._clipController.pause();this._currentPauseIndex+=(b)?1:-1;
f=this._pauseTimeline[this._currentPauseIndex];this._clipController.currentTime=f
}this._enableSections(f);if(h){this.trigger("pauseenter:"+this._currentPauseIndex,{from:this._currentPauseIndex+((b)?-1:1),to:this._currentPauseIndex,section:this._pauses[this._currentPauseIndex]});
this._frontCurrentPauseSection()}};o._derivePauseIndex=function(a){var b=0;while(this._pauseTimeline[b]<a){this._currentPauseIndex=b++
}return this._currentPauseIndex};o._deriveSectionIndex=function(a){var c,b;if(a===this.duration){return this._sections.length-1
}if(a===0){return 0}if(this._clipController.playbackRate>0){c=0;while(c<this._sections.length&&this._sections[c].time<a){b=++c
}}else{c=this._sections.length-1;while(c>-1&&this._sections[c].time>a){b=--c}}return b
};o._enableSections=function(d,a){var d=d||this.currentTime;var c=a?(this._sections.length-1):this._deriveSectionIndex(d);
var b=document.querySelectorAll("#panelcontainer > section");if(this._prevSectionIndex===c){return
}this._currentSectionIndex=c;[].forEach.call(b,function(e,h){var f=c===h;var g=c>=h-1&&c<=h+1;
e.classList[g?"add":"remove"]("show")});this._prevSectionIndex=c};o._frontCurrentPauseSection=function(){var a=document.querySelectorAll("#panelcontainer > section");
var b=this._pauses[this._currentPauseIndex];var c=document.querySelector(b.labelSelector);
[].forEach.call(a,function(d){d.classList.remove("front")});c.classList.add("front")
};o._fadeOut=function(){if(m){this._curtain.classList.add("fadeOut")}else{this._runTimeFade(true)
}};o._fadeIn=function(){if(m){this._curtain.classList.remove("fadeOut")}else{this._runTimeFade(false)
}};o._runTimeFade=function(b){var e,c,f;var h=b?this.fadeOutAnim:this.fadeInAnim;
var d=this._curtain;var g=h.duration;d.style.zIndex=10000;function a(i){if(!e){e=i
}c=(i-e)/1000;f=(c/g)*g;h.tween(f);if(c<g){window.requestAnimationFrame(a)}else{if(!b){d.style.zIndex=30
}}}window.requestAnimationFrame(a)};o._makeJump=function(b,a,c){return function(){var d=this._pauseTimeline.indexOf(b);
this._clipController.pause();this.trigger("seek",c);setTimeout(function(){this._fadeIn();
this._currentPauseIndex=d;this.currentTime=b;this._enableSections(b);this.trigger("pauseenter:"+d,{from:this._currentPauseIndex,to:d,section:this._pauses[d]});
this._frontCurrentPauseSection();this._seekable=true;if(typeof a==="function"){cb.call()
}}.bind(this),n)}.bind(this)};o._makeEndJump=function(c,a,d,b){return function(){var f=this._pauseTimeline.indexOf(c);
var e=this._clipController._mediaTimer._video;b=document.getElementById("wrapper");
b.style.position="absolute";b.style.top="0px";this._clipController.pause();if(q){e.play();
e.pause();e.play();e.pause()}setTimeout(function(){b.style.position="relative";
this.trigger("seek",d);this._currentPauseIndex=f;this.currentTime=c;this._enableSections();
if(f!==-1){this.trigger("pauseenter:"+f,{from:this._currentPauseIndex,to:f,section:this._pauses[f]})
}this._seekable=true;document.documentElement.classList.add("overflow");this._fadeIn();
this._frontCurrentPauseSection()}.bind(this),n)}.bind(this)};o.seek=function(g,x){var a=this._pauseTimeline.indexOf(g);
var i=(g>this.currentTime)?1:-1;var w=Math.abs(this._currentPauseIndex-a)==1;var c=this._currentPauseIndex==this._pauseTimeline.length-1;
var b=this.currentTime===this.duration;var h=c||b;var y=h?this._pauseTimeline.length-1:this._currentPauseIndex;
var e={from:y,to:a};var f=this[h?"_makeEndJump":"_makeJump"].call(this,g,x,e);var d;
if(this._currentPauseIndex==a){return}if(!this._seekable){return}document.getElementById("curtain").style.display="block";
if(document.body.scrollTop>0){document.body.scrollTop=0}this.trigger("pauseexit:"+y,{from:y,to:a});
if(!h&&this._clipController.paused){this._clipController.playbackRate=i;d=this._clipController.play()
}if(h||!w||!d){this._fadeOut();this._seekable=false;window.setTimeout(f,n)}};o._triggerPauseExit=function(){var a=this._currentPauseIndex;
var b=this._clipController.playbackRate>0?a+1:a-1;if(this._currentPauseIndex>0||this._clipController.playbackRate>0){this.trigger("pauseexit:"+a,{from:a,to:b})
}};o.next=function(){var a=this._pauseTimeline[this._currentPauseIndex+1];if(this._currentPauseIndex<this._pauseTimeline.length-1){this.seek(a)
}};o.previous=function(){var a=this._pauseTimeline[this._currentPauseIndex-1];if(this._currentPauseIndex>0){this.seek(a)
}};o.getSectionFromPausePoint=function(c){var a=app.sectionController._sections;
for(var b in a){if(a[b].pause===c){return a[b]}}};Object.defineProperties(r.prototype,{currentSection:{enumerable:true,configurable:false,get:function(){return this._sections[this._currentSectionIndex]
}},currentTime:{enumerable:true,configurable:false,get:function(){return this._clipController.currentTime
},set:function(a){this._clipController.currentTime=a}},paused:{get:function(){return this._clipController.paused
},set:function(){}},duration:{get:function(){return this._clipController.duration
},set:function(){}}});return r});AC.define("overview/shared/controller/Ui",[],function(){var g=false;
var h=0.2;var f=250;function e(a){if(!a){throw new Error("UIController: sectionController required for instantiation.")
}this._sectionController=a;this._pauseTimeline=a._pauseTimeline;this._takeoverThreshold=h;
this._bufferDistance=0;this._inputControllers=[];this._lastInteractionType=null;
this._acceptingInput=true;this._sectionController.on("pauseenter",function(){window.setTimeout(function(){this._acceptingInput=true
}.bind(this),f)}.bind(this));this.update=this.update.bind(this)}e.prototype={getPauseDiff:function(){var b=Infinity,a=this._sectionController.currentTime;
this._pauseTimeline.forEach(function(c){b=Math.min(b,Math.abs(a-c))});return b},update:function(a){var b=a>0?1:-1;
if(!this._sectionController.paused){return}this._bufferDistance+=a;if(this.getPauseDiff()>this._takeoverThreshold){if(a>0){this._sectionController.next()
}else{this._sectionController.previous()}}else{if(this._sectionController.currentTime+a>0){this._sectionController.currentTime+=a
}else{this._sectionController.currentTime=0}}},next:function(){if(this._sectionController.paused&&this._acceptingInput){this._sectionController.next();
this._acceptingInput=false}},previous:function(){if(this._sectionController.paused&&this._acceptingInput){this._sectionController.previous();
this._acceptingInput=false}},add:function(a){if(this._inputControllers.indexOf(a)===-1){this._inputControllers.push(a)
}},disableInput:function(){this._inputControllers.forEach(function(a){a.disable()
})},enableInput:function(){this._inputControllers.forEach(function(a){a.enable()
})}};return e});AC.define("overview/shared/controller/Nav",["require"],function(d){function c(b,a){var f=this._getNavigatableSections(a);
this._sectionNav=document.getElementById("sectionNav");this._navContainer=this._sectionNav.querySelector(".list");
this._navRange=this._sectionNav.querySelector(".range");this._sectionController=b;
this._handleClick=this._handleClick.bind(this);this._handlePauseEnter=this._handlePauseEnter.bind(this);
this._handlePauseExit=this._handlePauseExit.bind(this);this._handleTouchMove=this._handleTouchMove.bind(this);
this._handleTouchEnd=this._handleTouchEnd.bind(this);this._handleTouchStart=this._handleTouchStart.bind(this);
this._handleMouseOver=this._handleMouseOver.bind(this);this._handleMouseOut=this._handleMouseOut.bind(this);
this._handleChange=this._handleChange.bind(this);this._handleKeyDown=this._handleKeyDown.bind(this);
this._buildNavigation(f);this._sectionController.on("pauseexit",this._handlePauseExit);
this._sectionController.on("pauseenter",this._handlePauseEnter);this._sectionNav.addEventListener("touchstart",this._handleTouchStart,true);
this._sectionNav.addEventListener("keydown",this._handleKeyDown);if(this._navRange){if(AC.Environment.Browser.name==="IE"){this._navRange.style.display="none"
}this._navRange.addEventListener("change",this._handleChange);this._navRange.addEventListener("focus",function(){var e=this._sectionNav.querySelector(".active");
if(e){this._highlightNavItem(e)}}.bind(this));this._navRange.addEventListener("blur",function(){var e=this._sectionNav.querySelector(".hover");
if(e){this._unhighlightNavItem(e)}}.bind(this))}}c.prototype={constructor:c,_getNavigatableSections:function(a){if(!this._navigatableSections){this._navigatableSections=a.filter(function(b){return !isNaN(b.pause)&&b.labelSelector
}).map(function(b,f){b.index=f;return b})}return this._navigatableSections},_handleKeyDown:function(b){b.stopPropagation();
var e,a;if(b.keyCode!==13){return}e=this._navContainer.querySelector(".hover");
if(e){a=parseFloat(e.getAttribute("data-seek-time"))}if(!isNaN(a)){this._sectionController.seek(a)
}},_handlePauseEnter:function(a){},_handleClick:function(b){var e=b.target||b.srcElement;
var a;while(!e.getAttribute("data-seek-time")){e=e.parentNode}a=parseFloat(e.getAttribute("data-seek-time"));
if(!isNaN(a)){this._sectionController.seek(a)}window.app.uiController._lastInteractionType="bubble-click"
},_handleChange:function(e){var j=this._navContainer.querySelector(".hover");var i=this._getNavigatableSections().length-1-this._navRange.value;
var a=this._navContainer.querySelector('[data-seek-index="'+i+'"]');var b=parseFloat(a.getAttribute("data-seek-time"));
if(j){this._unhighlightNavItem(j)}this._highlightNavItem(a);if(this._navRangeTimeout){clearTimeout(this._navRangeTimeout)
}this._navRangeTimeout=setTimeout(function(){window.app.uiController._lastInteractionType="bubble-click";
this._sectionController.seek(b)}.bind(this),2000)},_updateRange:function(a){if(!this._navRange){return
}this._navRange.value=this._getNavigatableSections().length-1-a},_handlePauseExit:function(g){var a=g.to;
var b=this._navContainer.querySelectorAll(".active");var h=this._navContainer.querySelector('[data-seek-index="'+a+'"]');
this._updateRange(a);[].forEach.call(b,function(e){e.classList.remove("active");
e.classList.remove("hover")});if(h){window.setTimeout(function(){h.classList.add("active")
}.bind(this),250)}},_buildNavigation:function(h){var a=document.createDocumentFragment();
var g=document.getElementById("panelcontainer");var b="touchstart" in window;h.forEach(function(e){var l;
var n=document.createElement("li");var m=g.querySelector(e.labelSelector);var f=m.getAttribute("data-section-label");
if(m){n.setAttribute("data-seek-index",e.index);n.setAttribute("data-seek-time",e.pause);
n.setAttribute("title",f);n.innerHTML+='<span class="label">'+f+"</span>";n.innerHTML+='<span class="dot" data-nav-item="true"><span class="inner" data-nav-item="true"></span></span>';
n.addEventListener((b)?"touchstart":"click",this._handleClick);l=n.querySelector(".dot");
l.addEventListener("mouseenter",this._handleMouseOver);l.addEventListener("mouseleave",this._handleMouseOut);
a.appendChild(n)}}.bind(this));this._navContainer.appendChild(a)},_handleMouseOver:function(a){var b=a.target||a.srcElement;
if(!b.classList.contains("dot")){return}var e=b.parentNode;this._highlightNavItem(e)
},_highlightNavItem:function(a){a.classList.add("hover")},_unhighlightNavItem:function(a){a.classList.remove("hover")
},_handleMouseOut:function(a){var b=a.target||a.srcElement;if(!b.classList.contains("dot")){return
}var e=b.parentNode;this._unhighlightNavItem(e)},_calcSection:function(a){this._lastSectionCalc=Math.round(((a-this._navRect.top)/this._navRect.height)*this._navCount);
return this._lastSectionCalc},_handleTouchStart:function(a){var e,b=a.target||a.srcElement;
this._navRect=document.getElementById("sectionNav").getBoundingClientRect();this._navCount=document.querySelectorAll("#sectionNav li").length;
this._updateHover(this._calcSection(a.pageY));document.body.addEventListener("touchend",this._handleTouchEnd);
document.body.addEventListener("touchmove",this._handleTouchMove);a.preventDefault();
return false},_updateHover:function(f){var b=document.getElementById("sectionNav");
[].slice.call(b.querySelectorAll("li.hover")).forEach(function(e){e.querySelector(".label").style.display="none";
e.classList.remove("hover")});var a=b.querySelector('li[data-seek-index="'+f+'"]');
if(a){a.querySelector(".label").style.display="block";a.classList.add("hover")}},_handleTouchMove:function(a){var b;
if(!this._throttled){this._throttled=true;b=this._calcSection(a.pageY);this._updateHover(b);
window.clearTimeout(this._throttledTimeout);this._throttledTimeout=window.setTimeout(function(){this._throttled=false
}.bind(this),50)}a.preventDefault();a.stopPropagation();return false},_handleTouchEnd:function(a){var b;
document.body.removeEventListener("touchend",this._handleTouchEnd);document.body.removeEventListener("touchmove",this._handleTouchMove);
b=document.getElementById("sectionNav").querySelector('li[data-seek-index="'+this._lastSectionCalc+'"]');
app.uiController._lastInteractionType="bubble-click";if(b){this._sectionController.seek(parseFloat(b.getAttribute("data-seek-time")));
b.classList.remove("hover")}a.preventDefault();a.stopPropagation();return false
}};return c});AC.define("overview/desktop/input/Touch",[],function(){function b(d,a){this._uiController=d;
this._uiController.add(this);this._pixelToMediaSpeedRatio=0.003;this._swipeThreshold=30;
this._onEnd=this._onEnd.bind(this);this._onMove=this._onMove.bind(this);this._moveBuffer=0;
this._touchStartOnPlaceholder=false;this._controlCenterBuffer=50;this._controlCenterTouch=false;
this.enabled=false;document.addEventListener("touchend",this._onEnd);document.addEventListener("touchmove",this._onMove)
}b.prototype={_onEnd:function(d){var a;if(this._controlCenterTouch){this._controlCenterTouch=false;
return}if(!this.enabled){return}this._active=false;window.clearTimeout(this._timeout);
this._uiController._lastInteractionType=(Math.abs(this._moveBuffer)>this._swipeThreshold)?"swipe":"image-click";
if(this._uiController._sectionController.paused){a=(this._moveBuffer>=0)?"next":"previous";
if(this._moveBuffer===0){this._uiController.update(0.01)}this._uiController[a].call(this._uiController)
}this._moveBuffer=0},_onMove:function(d){var a=d.target;if(d.pageY>(window.innerHeight-this._controlCenterBuffer)){this._controlCenterTouch=true
}if(!this.enabled||this._controlCenterTouch){return}if(this._uiController._sectionController.paused){if(!this._active){this._uiController.takeoverThreshold=0.4;
this._active=true;this._prev=d.pageY;return}this._delta=this._prev-d.pageY;this._moveBuffer+=this._delta;
this._touchStartOnPlaceholder=a&&!!a.getAttribute("data-placeholder");window.clearTimeout(this._timeout);
this._timeout=window.setTimeout(this._onEnd.bind(this),500);if(this._delta){this._uiController.update(this._delta*this._pixelToMediaSpeedRatio)
}this._prev=d.pageY}d.preventDefault()},disable:function(){this.enabled=false},enable:function(){this.enabled=true
}};return b});AC.define("overview/shared/ComparisonChart",["require"],function(c){function d(m){var o;
var l;var i;var a;var p;var b;var n;this._element=AC.Element.getElementById(m);
if(!this._element){return false}Element.cleanWhitespace(AC.Element.selectAll(".bars",this._element)[0]);
if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this._element,"can-animate")
}b=AC.Element.selectAll(".bars-container")[0];o=AC.Element.selectAll(".bars li",this._element);
l=o.length;for(n=0;n<o.length;n+=1){i=o[n].getAttribute("data-chart-value");a=o[n].getAttribute("data-chart-label");
p=o[n].getAttribute("data-chart-data");if((!i)||isNaN(parseFloat(i))){throw"Could not find a valid data-chart-value attribute on one of the bar elements."
}o[n].innerHTML='<span class="text-value">'+a+'<span class="data-value">'+p+'</span></span><span class="visual-value" role="presentation"></span>';
i=parseFloat(o[n].getAttribute("data-chart-value"));o[n].setAttribute("data-animate-height",i)
}}d.prototype={visitorEngaged:function(){var b=AC.Element.selectAll(".bars li",this._element);
var a;AC.Element.addClassName(this._element,"animate");for(a=0;a<b.length;a+=1){b[a].style.height=b[a].getAttribute("data-animate-height")+"%"
}},resetChart:function(){if(AC.Detector.isCSSAvailable("transition")){var b=AC.Element.selectAll(".bars li",this._element);
var a;AC.Element.removeClassName(this._element,"animate");for(a=0;a<b.length;a+=1){b[a].style.height=0+"%"
}}else{return}}};return d});AC.define("overview/shared/clip/Basic",[],function(){function b(a,f,g){var h=document.querySelector(a);
if(h&&h.nodeType&&h.nodeType===1){this._el=h}else{this._el=a}this.duration=f;this.beginning=0;
this._currentTime=0}b.prototype={};Object.defineProperties(b.prototype,{currentTime:{enumerable:true,configurable:false,get:function(){return this._currentTime
},set:function(a){this._currentTime=Math.max(0,Math.min(a,this.duration))}},el:{enumerable:true,configurable:false,get:function(){if(this._el&&this._el.nodeType&&this._el.nodeType===1){return this._el
}else{return this._el=document.querySelector(this._el)}}}});return b});AC.define("overview/desktop/timeline/timeline-ipad",["require","overview/shared/clip/Tween","overview/shared/ComparisonChart","overview/shared/clip/Basic"],function(g){var e=g("overview/shared/clip/Tween"),f=g("overview/shared/ComparisonChart");
var h=g("overview/shared/clip/Basic");return function(){var D,c,a,E,C;var G=new f("processor-chart"),v=new f("memory-chart"),b=new f("graphics-chart"),z=new f("storage-chart"),w=new f("fan-chart");
var A=document.getElementById("hero"),B=document.getElementById("measurements"),x=document.getElementById("comingsoon"),d=document.getElementById("navcontainer"),F=document.querySelector(".productnav-wrapper");
var y=false;return[{name:"home",pause:0,time:0,labelSelector:"#hero",events:[{type:"pauseenter",action:function(){A.querySelector(".caret").classList.add("show");
A.classList.remove("slide-out");d.classList.remove("slide-out");F.classList.remove("slide-out");
setTimeout(function(){d.style.zIndex=40000},1000)}},{type:"pauseexit",action:function(){A.classList.add("slide-out");
d.classList.add("slide-out");F.classList.add("slide-out");d.style.zIndex=10000;
app.uiController._lastInteractionType="image-click";G.resetChart();v.resetChart();
b.resetChart();z.resetChart()}}],clips:[]},{name:"intro",pause:1.13,time:1.13,labelSelector:"#change",clips:[{start:-1.95,media:new h("#change .hero",2.55)},{start:-2,media:new e("#change .copy",2.5,[{property:"opacity",from:1,to:1},{property:"translate",axis:"y",from:0,to:0,units:"px",easing:"linear"}])},{start:-0.5,end:53.5,media:new e("#sectionNav",0.5,[{property:"display",from:"none",to:"block"},{property:"opacity",from:0,to:1,easing:"easeInQuad"}])},{start:0.5,media:new e("#change .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px",easing:"linear"}])}]},{name:"computing",pause:4.2,time:4.2,labelSelector:"#power",events:[{type:"pauseenter",action:function(){document.querySelector(".still_3").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_3").classList.remove("crossFade")
}}],clips:[{start:-0.1,media:new h(".still_3",0.7)},{start:-0.6,end:0.5,media:new e("#power .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0.5,media:new e("#power .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"processor",pause:8.4,time:8.4,labelSelector:"#processor",events:[{type:"pauseenter",action:function(){document.querySelector(".still_4").classList.add("crossFade");
window.clearTimeout(D);setTimeout(function(){G.visitorEngaged()},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_4").classList.remove("crossFade");
D=window.setTimeout(function(){G.resetChart()},600)}}],clips:[{start:-0.1,end:0.6,media:new h(".still_4",0.7)},{start:-0.8,end:0.5,media:new e("#processor .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#processor .cores",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#processor .pcie",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#processor #processor-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#processor .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#processor .cores",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#processor .pcie",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#processor #processor-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"memory",pause:11.3,time:11.3,labelSelector:"#memory",events:[{type:"pauseenter",action:function(){document.querySelector(".still_5").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(c);setTimeout(function(){v.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_5").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){c=window.setTimeout(function(){v.resetChart()
},600)}}],clips:[{start:-0.1,end:0.6,media:new h(".still_5",0.7)},{start:-0.8,end:0.5,media:new e("#memory .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#memory .bandwidth",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#memory .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#memory #memory-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#memory .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#memory .bandwidth",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#memory .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#memory #memory-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"graphics",pause:15.7,time:15.7,labelSelector:"#graphics",events:[{type:"pauseenter",action:function(){document.querySelector(".still_6").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(a);setTimeout(function(){b.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_6").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){a=window.setTimeout(function(){b.resetChart()
},600)}}],clips:[{start:-0.1,end:0.6,media:new h(".still_6",0.7)},{start:-0.8,end:0.5,media:new e("#graphics .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#graphics .vram",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#graphics .teraflops",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#graphics #graphics-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#graphics .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#graphics .vram",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#graphics .teraflops",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#graphics #graphics-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"storage",pause:17.75,time:17.75,labelSelector:"#storage",events:[{type:"pauseenter",action:function(){document.querySelector(".still_7").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(E);setTimeout(function(){z.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_7").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){E=window.setTimeout(function(){z.resetChart()
},600)}}],clips:[{start:-0.1,end:0.6,media:new h(".still_7",0.7)},{start:-0.8,end:0.5,media:new e("#storage .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#storage .flash",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#storage .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#storage .capacity",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#storage #storage-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#storage .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#storage .flash",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#storage .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#storage .capacity",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#storage #storage-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"thermal core",pause:21.8,time:21.8,labelSelector:"#thermal",events:[{type:"pauseenter",action:function(){document.querySelector(".still_8").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_8").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0.6,media:new h(".still_8",0.7)},{start:-0.6,end:0.5,media:new e("#thermal .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0.5,media:new e("#thermal .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"fan",pause:29,time:29,labelSelector:"#fan",events:[{type:"pauseenter",action:function(){document.querySelector(".still_9").classList.add("crossFade");
window.clearTimeout(C);setTimeout(function(){w.visitorEngaged()},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_9").classList.remove("crossFade");
C=window.setTimeout(function(){w.resetChart()},600)}}],clips:[{start:-0.1,end:0.6,media:new h(".still_9",0.7)},{start:-0.6,end:0.5,media:new e("#fan .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#fan .acoustic",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#fan .dba",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#fan .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,end:1,media:new e("#fan .acoustic",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,end:1,media:new e("#fan .dba",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"expansion",pause:34.9,time:34.9,labelSelector:"#expansion",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}}],clips:[{start:-0.1,media:new h(".still_10",4.5)},{start:-1.5,end:0.5,media:new e("#expansion .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0.5,media:new e("#expansion .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"thunderbolt",pause:36,time:36,labelSelector:"#thunderbolt",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}}],clips:[{start:-0.8,end:0.5,media:new e("#thunderbolt .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#thunderbolt .speeds",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#thunderbolt .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#thunderbolt .daisychain",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#thunderbolt .displays",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#thunderbolt .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#thunderbolt .speeds",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#thunderbolt .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#thunderbolt .daisychain",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#thunderbolt .displays",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"io",pause:38.2,time:38.2,labelSelector:"#io",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_10").classList.remove("crossFade")
}}],clips:[{start:-1.4,end:0.5,media:new e("#io .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-1.2,end:0.7,media:new e("#io .hdmi",1,[{property:"opacity",from:0,to:1}])},{start:-1.2,end:0.7,media:new e("#io .gigabit",1,[{property:"opacity",from:0,to:1}])},{start:-1,end:0.9,media:new e("#io .thunderbolt",1,[{property:"opacity",from:0,to:1}])},{start:-1,end:0.9,media:new e("#io .usb",1,[{property:"opacity",from:0,to:1}])},{start:0.5,end:1.5,media:new e("#io .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.9,end:1.5,media:new e("#io .thunderbolt",0.5,[{property:"opacity",from:1,to:0}])},{start:0.9,end:1.5,media:new e("#io .usb",0.5,[{property:"opacity",from:1,to:0}])},{start:0.7,end:1.5,media:new e("#io .hdmi",0.5,[{property:"opacity",from:1,to:0}])},{start:0.7,end:1.5,media:new e("#io .gigabit",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"wireless",pause:40.46,time:40.46,labelSelector:"#wireless",events:[{type:"pauseenter",action:function(){document.querySelector(".still_13").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_13").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:3.3,media:new h(".still_13",3.4)},{start:-0.7,end:0.5,media:new e("#wireless .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.2,end:0.5,media:new e("#wireless .copy",0.2,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0.5,media:new e("#wireless .ac",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#wireless .bluetooth",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#wireless .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#wireless .ac",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#wireless .bluetooth",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"design",pause:42.43,time:42.43,labelSelector:"#design",events:[{type:"pauseenter",action:function(){document.querySelector(".still_14").classList.add("crossFade")
}},{type:"pauseenter",action:function(){B.classList.remove("show")}},{type:"pauseexit",action:function(i){if(i.to===13){B.classList.add("show")
}}}],clips:[{start:-0.1,end:1.9,media:new h(".still_14",2)},{start:-0.6,end:0.5,media:new e("#design .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0.5,media:new e("#design .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"assembly",pause:45.8,time:45.8,labelSelector:"#assembly",events:[{type:"pauseenter",action:function(){document.querySelector(".still_14").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_14").classList.remove("crossFade")
}}],clips:[{start:-0.8,end:0.5,media:new e("#assembly .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0.5,media:new e("#assembly .first",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0.5,media:new e("#assembly .second",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#assembly .third",0.5,[{property:"opacity",from:0,to:1}])},{start:0.5,media:new e("#assembly .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,media:new e("#assembly .first",0.5,[{property:"opacity",from:1,to:0}])},{start:0.5,media:new e("#assembly .second",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#assembly .third",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"learn more",pause:48.3,time:48.3,labelSelector:"#comingsoon",events:[{type:"pauseenter",action:function(){}},{type:"pauseexit",action:function(){}},{type:"pauseenter",action:function(){document.querySelector(".still_15").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_15").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0.5,media:new h(".still_15",0.6)},{start:-1.3,end:0.5,media:new e("#comingsoon .copy",1.3,[{property:"opacity",from:0,to:1,easing:"easeInQuad"}])}]}]
}});AC.define("overview/desktop/app/iPad",["require","overview/shared/app/Core","overview/shared/ClipContainer","overview/shared/controller/Section","overview/shared/controller/Ui","overview/shared/controller/Nav","overview/desktop/input/Touch","defer/Deferred","assetLoader/AssetLoader","overview/desktop/timeline/timeline-ipad"],function(x){var r=x("overview/shared/app/Core"),m=x("overview/shared/ClipContainer"),y=x("overview/shared/controller/Section"),t=x("overview/shared/controller/Ui"),p=x("overview/shared/controller/Nav"),o=x("overview/desktop/input/Touch"),q=x("defer/Deferred"),n=x("assetLoader/AssetLoader");
var u=x("overview/desktop/timeline/timeline-ipad");var v=null;function w(a){r.call(this);
u=u();this.introcontainer=document.getElementById("introcontainer");this.videocontainer=document.getElementById("videocontainer");
this.stillcontainer=document.getElementById("stillcontainer");this.panelcontainer=document.getElementById("panelcontainer");
this.touch="ontouchstart" in window;this.timeline=this.convertSectionsToClips(u);
this.mainContainer=new m(this.videocontainer,a.main,this.timeline.clips);this.curtain=this.createFadeCurtain();
this._lastTime=0;this.preventTouchDefault=this.preventTouchDefault.bind(this);document.addEventListener("touchstart",this.preventTouchDefault);
var b=document.getElementById("globalheader");var c=AC.Element.select(".productnav-wrapper");
b.addEventListener("touchstart",function(d){d.stopPropagation()});b.addEventListener("touchend",function(d){d.stopPropagation()
});c.addEventListener("touchstart",function(d){d.stopPropagation()});c.addEventListener("touchend",function(d){d.stopPropagation()
});document.getElementById("navcontainer").style.zIndex=40000;this.loadIntro(a.intro[0]).then(function(){this.mainContainer.load().then(this.initMain.bind(this))
}.bind(this));window.app=this}w.prototype=new r();w.prototype.constructor=w;w.prototype.initAssetLoader=function(c){var a=c.assets.map(function(d){return d.url
});var b;if(c.assets){b=new n(a);return b.load().then(function(d){d.forEach(function(g,h){var f=c.assets[h].container;
var e=document.querySelector(f);g.setAttribute("class",c.assets[h].className);e.appendChild(g)
})})}else{return new q().resolve()}};w.prototype.loadIntro=function(e){var a=new q();
var c=document.getElementById("hero").querySelector(".caret");var d=function(){c.removeEventListener("webkitTransitionEnd",d);
a.resolve();c.classList.add("no-delay")};c.addEventListener("webkitTransitionEnd",d);
var b=this.initAssetLoader(e);b.then(function(){this.resizeFluidAreas();c.classList.add("show");
document.body.classList.remove("intro-hidden")}.bind(this));return a.promise()};
w.prototype.resizeContainers=function(){var f=window.innerHeight;var c=window.innerWidth;
var k,i,h,g;var l=this.videocontainer;var e=this.introcontainer;var a=this.stillcontainer;
var b=this.panelcontainer;var j=768===screen.width&&1024===screen.height&&"number"===typeof window.orientation;
var d=j&&(0===window.orientation||180===window.orientation);k=f*((d)?0.9:1);if(!j){b.style.height=k+"px"
}a.style.height=k+"px";l.style.height=k+"px";b.style.height=k+"px";window.scrollTo(0,0);
return k};w.prototype.resizePlaceholders=function(a){var b=document.querySelectorAll(".placeholder-container");
var c=768===screen.width&&1024===screen.height&&"number"===typeof window.orientation;
[].forEach.call(b,function(S){var k=S.querySelector(".placeholder-inner");var j=S.querySelectorAll(".callout");
var e=parseFloat(S.getAttribute("data-min-top"));var K=496;var Q=e/K;var g=parseFloat(S.getAttribute("data-height-ratio"));
var d=parseFloat(S.getAttribute("data-width-ratio"));var R=S.getAttribute("data-width-ratio-narrow");
var J=0.0013;var M;var P;var i;var N=0;var O;var L;var h;var f;var l=185;if(R){R=parseFloat(R)
}if(isNaN(Q)||isNaN(g)||isNaN(d)){return}if(a<K){i=e}else{i=a*Q}M=(a*g);P=a*((c&&R)?R:d);
if(S.classList.contains("hero")){Q=(e/(a+l));i=a*Q;S.style.top=i+"px"}if(S.classList.contains("static-top")){S.style.top=e+"px"
}else{S.style.top=i+"px"}k.style.width=P+"px";k.style.height=M+"px";[].forEach.call(j,function(z){if(!S.classList.contains("true-center")){if(a<K){O=0
}else{O=(a*Q)*(a*J)}L=(a*g)-(O+O*0.3);z.style.top=O+"px";z.style.height=L+"px"}else{z.style.top="0px";
z.style.height=M+"px"}})})};w.prototype.setupEnd=function(){var b=app.sectionController._pauseTimeline.length-1;
var c=function(){app.uiController._lastInteractionType="image-click";this.sectionController.seek(0)
};var d=document.querySelector(".footer-wrapper");var e=document.querySelector(".sosumi");
var a=function(){this.uiController.disableInput();document.documentElement.classList.remove("overflow");
document.removeEventListener("touchstart",this.preventTouchDefault);d.classList.add("show");
e.classList.add("show");setTimeout(function(){document.getElementById("curtain").style.display="none"
},1000)}.bind(this);this.sectionController.on("pauseenter:"+b,a);this.mainContainer.clipController.on("ended",a);
this.sectionController.on("pauseexit:"+b,function(){d.classList.remove("show");
e.classList.remove("show")});this.sectionController.on("seek",function(f){if(f.from===b){this.uiController.enableInput();
document.addEventListener("touchstart",this.preventTouchDefault);this.videocontainer.classList.remove("transition");
this.stillcontainer.classList.remove("transition")}}.bind(this))};w.prototype.setupResizeEvents=function(){var c=this.resizeFluidAreas.bind(this);
var d="onorientationchange" in window;var a=d?"orientationchange":"resize";var b=d?1000:0;
window.addEventListener("orientationchange",c)};w.prototype.setupVideoCrossover=function(){var a;
var b=function(){clearTimeout(a);this.videocontainer.style.display="block";this.introcontainer.style.display="none"
};app.sectionController.on("pauseexit:0",b.bind(this));a=setTimeout(b.bind(this),1300)
};w.prototype.setupCaret=function(){var a=document.getElementById("hero").querySelector(".caret .button");
a.addEventListener("click",this.sectionController.seek.bind(this.sectionController,2))
};w.prototype.preventTouchDefault=function(a){a.preventDefault()};w.prototype.pollForAwakeFromSleep=function(){var b=new Date().getTime();
var a=function(){var c=new Date().getTime();if(c-b>1000){this.trigger("awakeFromSleep")
}b=c;setTimeout(a,500)}.bind(this);a()};w.prototype.resyncVideo=function(){var a=this.mainContainer;
if(a&&a.clipController&&!a.clipController.paused&&a.clipController._mediaTimer._forwardsVideo.paused){a.clipController.pause();
a.clipController.play()}};w.prototype.addDuplicateProductNav=function(){var b=document.querySelector(".productnav-wrapper");
var a=b.cloneNode(true);var c=AC.Element.select(".productnav",a);var d=document.querySelector("#panelcontainer #hero");
a.id="productnav-wrapper-clone";c.id="productnav-clone";d.appendChild(a)};w.prototype.pushThrough=function(){var c=this.mainContainer.clipController;
var a=c.currentTime;var b=c._mediaTimer._forwardsVideo;if(a===this._lastTime&&!c.paused&&!b.paused){c.pause();
c.play()}this._lastTime=a};w.prototype.initMain=function(a,b){var d=true;if(this.initialized){return
}this.sectionController=new y(this.mainContainer.clipController,this.timeline.events.pauses,u);
this.uiController=new t(this.sectionController);this.navController=new p(this.sectionController,u);
this.touchInputController=new o(this.uiController);this.setupEnd();this.addTimelineEvents(u);
this.setupResizeEvents();this.setupCaret();this.setupVideoCrossover();this.resizeFluidAreas();
this.pollForAwakeFromSleep();this.setupFocusEvents();this.sectionController.on("pauseenter",this.enterAnalytics.bind(this));
this.sectionController.on("pauseexit",this.exitAnalytics.bind(this));window.addEventListener("beforeunload",function(){this.analyzer.flush()
}.bind(this));this.sectionController.trigger("pauseenter:0");this.sectionController.on("pauseenter",function(e){app.mainContainer.clipController.currentTime=this.sectionController._pauseTimeline[e.index]+0.2
}.bind(this));this.sectionController.on("pauseexit",function(){var e=document.getElementById("sp-searchtext");
if(e){e.blur()}});var c=document.querySelector("#assembly .video");if(c){c.addEventListener("touchstart",function(e){var f=e.target.href||e.target.parentNode.href;
if(f){window.location=f}})}this.mainContainer.clipController.on("timeupdate",this.pushThrough.bind(this));
this.on("awakeFromSleep",this.resyncVideo.bind(this));this.sectionController._update();
if(d){window.app=this}this.initialized=true};return w});AC.define("overview/desktop/settings-ipad",[],function(){var b="mp4";
return{intro:[{type:"loadassets",assets:[{url:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/hero.jpg",container:"#hero .hero-container",className:"hero"},{url:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_0404.jpg",container:"#change .hero-container",className:"hero"}]}],main:[{type:"bivideo",file:window.assetPath+"videos/macpro_main_ipad."+b,startTime:2,stills:{3:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_0708.jpg",4:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_1112.jpg",5:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_1416.jpg",6:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_1820.jpg",7:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_2024.jpg",8:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_2428.jpg",9:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_3202.jpg",10:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_3806.jpg",13:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_4314.jpg",14:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_4518.jpg",15:"http://images.apple.com/v/mac-pro/home/b/images/stills/ipad/macpro_ipad_5125.jpg"}}]}
});AC.define("overview/desktop/timeline/intro",["require","overview/shared/clip/Tween","overview/shared/clip/Basic"],function(f){var e=f("overview/shared/clip/Tween"),d=f("overview/shared/clip/Basic");
return function(){return[{start:0,end:3,media:new d("#hero",1)},{start:1.7,end:3,media:new e("#hero .title",0.6,[{property:"opacity",from:0,to:1,easing:"easeInQuad"},{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:2,end:3,media:new e("#hero .subtitle",0.6,[{property:"opacity",from:0,to:1,easing:"easeInQuad"},{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:2.9,end:3,media:new e("#hero .comingmessage",0.1,[{property:"opacity",from:0,to:1,easing:"easeInQuad"},{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:2.7,end:3,media:new e("#globalheader",0.3,[{property:"opacity",from:0,to:1,easing:"easeInQuad"},{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:2.7,end:3,media:new e(".productnav",0.3,[{property:"opacity",from:0,to:1,easing:"easeInQuad"},{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:2.9,end:3,media:new d("#hero .caret",0.5)},{start:2.9,end:3,media:new e(".still_1",0.1,[{property:"opacity",from:0,to:1,easing:"linear"}])}]
}});AC.define("overview/desktop/timeline/timeline",["require","overview/shared/clip/Tween","overview/shared/ComparisonChart","overview/shared/clip/Basic"],function(g){var e=g("overview/shared/clip/Tween"),f=g("overview/shared/ComparisonChart");
var h=g("overview/shared/clip/Basic");return function(){var B,d,b,C,A;var a=new f("processor-chart"),t=new f("memory-chart"),c=new f("graphics-chart"),x=new f("storage-chart"),u=new f("fan-chart");
var y=document.getElementById("hero"),z=document.getElementById("measurements"),v=document.getElementById("comingsoon");
var w=false;return[{name:"home",pause:0,time:0,labelSelector:"#hero",events:[{type:"pauseenter",action:function(){document.querySelector(".still_1").classList.add("crossFade");
y.querySelector(".caret").classList.add("show")}},{type:"pauseexit",action:function(){window.setTimeout(function(){y.querySelector(".caret").classList.remove("show")
},500);a.resetChart();t.resetChart();c.resetChart();x.resetChart()}}],clips:[{start:0,end:0.2,media:new e(".still_1",0.2,[{property:"opacity",from:1,to:0,easing:"easeInQuad"}])},{start:0,end:0.35,media:new e("#hero .title",0.35,[{property:"opacity",from:1,to:1,easing:"easeInQuad"}])},{start:0.35,end:0.65,media:new e("#hero .title",0.3,[{property:"opacity",from:1,to:0,easing:"easeOutQuad"}])},{start:0,end:0.09,media:new e("#hero .title",0.09,[{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:0.09,end:0.75,media:new e("#hero .title",0.66,[{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.25,media:new e("#hero .subtitle",0.25,[{property:"opacity",from:1,to:1,easing:"easeInQuad"}])},{start:0,end:0.25,media:new e("#hero .subtitle",0.25,[{property:"opacity",from:1,to:1,easing:"linear"}])},{start:0.15,end:0.45,media:new e("#hero .subtitle",0.3,[{property:"opacity",from:1,to:0,easing:"easeInQuad"}])},{start:0,end:0.09,media:new e("#hero .subtitle",0.09,[{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:0.09,end:0.75,media:new e("#hero .subtitle",0.66,[{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.25,media:new e("#hero .comingmessage",0.25,[{property:"opacity",from:1,to:1,easing:"easeInQuad"}])},{start:0,end:0.25,media:new e("#hero .comingmessage",0.25,[{property:"opacity",from:1,to:1,easing:"linear"}])},{start:0.15,end:0.25,media:new e("#hero .comingmessage",0.1,[{property:"opacity",from:1,to:0,easing:"easeInQuad"}])},{start:0,end:0.09,media:new e("#hero .comingmessage",0.09,[{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:0.09,end:0.75,media:new e("#hero .comingmessage",0.66,[{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new h("#hero .caret",0.5,[])},{start:0,end:0.25,media:new e("#globalheader",0.25,[{property:"opacity",from:1,to:1,easing:"easeInQuad"}])},{start:0,end:0.25,media:new e(".productnav",0.25,[{property:"opacity",from:1,to:1,easing:"linear"},{property:"translate",axis:"y",from:0,to:0,easing:"linear"},])},{start:0.25,end:0.75,media:new e("#globalheader",0.5,[{property:"opacity",from:1,to:0,easing:"easeInQuad"}])},{start:0,end:0.09,media:new e("#globalheader",0.09,[{property:"opacity",from:1,to:1,easing:"linear"}])},{start:0,end:0.1,media:new e("#globalheader",0.09,[{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:0.1,end:0.75,media:new e("#globalheader",0.66,[{property:"translate",axis:"y",from:0,to:-68,units:"px"}])},{start:0,end:0.1,media:new e(".productnav",0.09,[{property:"translate",axis:"y",from:0,to:0,units:"px"}])},{start:0.1,end:0.75,media:new e(".productnav",0.66,[{property:"translate",axis:"y",from:0,to:-72,units:"px"},{property:"opacity",from:1,to:1,units:"px"},])},{start:0.75,end:47.73,media:new e(".productnav",46.98,[{property:"opacity",from:1,to:1,units:"px"},])}]},{name:"intro",pause:1,time:1,labelSelector:"#change",events:[{type:"pauseenter",action:function(){document.querySelector(".still_2").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_2").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0.1,media:new h(".still_2",0.2)},{start:-0.5,end:0,media:new e("#change .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px",easing:"linear"}])},{start:-0.5,end:47.03,media:new e("#sectionNav",0.5,[{property:"display",from:"none",to:"block"},{property:"opacity",from:0,to:1,easing:"easeInQuad"}])},{start:0,end:0.5,media:new e("#change .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px",easing:"linear"}])}]},{name:"computing",pause:4,time:4,labelSelector:"#power",events:[{type:"pauseenter",action:function(){document.querySelector(".still_3").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_3").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0.1,media:new h(".still_3",0.2)},{start:-0.5,end:0,media:new e("#power .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0,end:0.5,media:new e("#power .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"processor",pause:9,time:9,labelSelector:"#processor",events:[{type:"pauseenter",action:function(){document.querySelector(".still_4").classList.add("crossFade");
window.clearTimeout(B);setTimeout(function(){a.visitorEngaged()},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_4").classList.remove("crossFade");
B=window.setTimeout(function(){a.resetChart()},600)}}],clips:[{start:-0.1,end:0.1,media:new h(".still_4",0.2)},{start:-0.8,end:-0.3,media:new e("#processor .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.3,end:0,media:new e("#processor .copy",0.3,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#processor .cores",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#processor .pcie",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#processor #processor-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#processor .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#processor .cores",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#processor .pcie",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#processor #processor-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"memory",pause:11,time:11,labelSelector:"#memory",events:[{type:"pauseenter",action:function(){document.querySelector(".still_5").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(d);setTimeout(function(){t.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_5").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){d=window.setTimeout(function(){t.resetChart()
},600)}}],clips:[{start:-0.1,end:0.1,media:new h(".still_5",0.2)},{start:-0.8,end:-0.3,media:new e("#memory .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.3,end:0,media:new e("#memory .copy",0.3,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#memory .bandwidth",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#memory .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#memory #memory-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#memory .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#memory .bandwidth",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#memory .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#memory #memory-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"graphics",pause:15,time:15,labelSelector:"#graphics",events:[{type:"pauseenter",action:function(){document.querySelector(".still_6").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(b);setTimeout(function(){c.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_6").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){b=window.setTimeout(function(){c.resetChart()
},600)}}],clips:[{start:-0.1,end:0.1,media:new h(".still_6",0.2)},{start:-0.8,end:-0.3,media:new e("#graphics .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.3,end:0,media:new e("#graphics .copy",0.3,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#graphics .vram",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#graphics .teraflops",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#graphics #graphics-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#graphics .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#graphics .vram",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#graphics .teraflops",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#graphics #graphics-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"storage",pause:17,time:17,labelSelector:"#storage",events:[{type:"pauseenter",action:function(){document.querySelector(".still_7").classList.add("crossFade")
}},{type:"pauseenter",action:function(){window.clearTimeout(C);setTimeout(function(){x.visitorEngaged()
},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_7").classList.remove("crossFade")
}},{type:"pauseexit",action:function(){C=window.setTimeout(function(){x.resetChart()
},600)}}],clips:[{start:-0.1,end:0.1,media:new h(".still_7",0.2)},{start:-0.8,end:-0.3,media:new e("#storage .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.3,end:0,media:new e("#storage .copy",0.3,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#storage .flash",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#storage .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#storage .capacity",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#storage #storage-chart",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#storage .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#storage .flash",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#storage .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#storage .capacity",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#storage #storage-chart",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"thermal core",pause:21,time:21,labelSelector:"#thermal",events:[{type:"pauseenter",action:function(){document.querySelector(".still_8").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_8").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0.1,media:new h(".still_8",0.2)},{start:-0.5,end:0,media:new e("#thermal .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0,end:0.5,media:new e("#thermal .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"fan",pause:28,time:28,labelSelector:"#fan",events:[{type:"pauseenter",action:function(){document.querySelector(".still_9").classList.add("crossFade");
window.clearTimeout(A);setTimeout(function(){u.visitorEngaged()},0)}},{type:"pauseexit",action:function(){document.querySelector(".still_9").classList.remove("crossFade");
A=window.setTimeout(function(){u.resetChart()},600)}}],clips:[{start:-0.1,end:0.1,media:new h(".still_9",0.2)},{start:-0.5,end:0,media:new e("#fan .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.5,end:0,media:new e("#fan .acoustic",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#fan .dba",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#fan .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#fan .acoustic",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#fan .dba",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"expansion",pause:34,time:34,labelSelector:"#expansion",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}}],clips:[{start:-0.1,end:3.2,media:new h(".still_10",3.3)},{start:-1.5,end:-1,media:new e("#expansion .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-1,end:0,media:new e("#expansion .copy",0.5,[{property:"opacity",from:1,to:1}])},{start:0,end:0.5,media:new e("#expansion .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"thunderbolt",pause:35,time:35,labelSelector:"#thunderbolt",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}}],clips:[{start:-0.9,end:-0.4,media:new e("#thunderbolt .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.4,end:0,media:new e("#thunderbolt .copy",0.4,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#thunderbolt .speeds",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#thunderbolt .improvement",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#thunderbolt .daisychain",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#thunderbolt .displays",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.4,media:new e("#thunderbolt .copy",0.4,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.4,media:new e("#thunderbolt .speeds",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.4,media:new e("#thunderbolt .improvement",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.4,media:new e("#thunderbolt .daisychain",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.4,media:new e("#thunderbolt .displays",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"io",pause:36,time:36,labelSelector:"#io",events:[{type:"pauseenter",action:function(){document.querySelector(".still_10").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_10").classList.remove("crossFade")
}}],clips:[{start:-0.9,end:-0.4,media:new e("#io .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.4,end:0,media:new e("#io .copy",0.4,[{property:"opacity",from:1,to:1}])},{start:-0.6,end:-0.2,media:new e("#io .hdmi",0.4,[{property:"opacity",from:0,to:1}])},{start:-0.2,end:0,media:new e("#io .hdmi",0.2,[{property:"opacity",from:1,to:1}])},{start:-0.6,end:-0.2,media:new e("#io .gigabit",0.4,[{property:"opacity",from:0,to:1}])},{start:-0.2,end:0,media:new e("#io .gigabit",0.2,[{property:"opacity",from:1,to:1}])},{start:-0.3,end:0,media:new e("#io .thunderbolt",0.3,[{property:"opacity",from:0,to:1}])},{start:-0.3,end:0,media:new e("#io .usb",0.3,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#io .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0.5,end:0.9,media:new h("#io .copy",0.4)},{start:0,end:0.4,media:new e("#io .thunderbolt",0.4,[{property:"opacity",from:1,to:1}])},{start:0.4,end:0.9,media:new e("#io .thunderbolt",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.4,media:new e("#io .usb",0.4,[{property:"opacity",from:1,to:1}])},{start:0.4,end:0.9,media:new e("#io .usb",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.2,media:new e("#io .hdmi",0.2,[{property:"opacity",from:1,to:1}])},{start:0.2,end:0.7,media:new e("#io .hdmi",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.2,media:new e("#io .gigabit",0.2,[{property:"opacity",from:1,to:1}])},{start:0.2,end:0.7,media:new e("#io .gigabit",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"wireless",pause:39,time:39,labelSelector:"#wireless",events:[{type:"pauseenter",action:function(){document.querySelector(".still_13").classList.add("crossFade")
}},{type:"pauseenter",action:function(i){document.getElementById("design").classList.add("show")
}},{type:"pauseexit",action:function(){document.querySelector(".still_13").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:3.3,media:new h(".still_13",3.4)},{start:-0.7,end:-0.2,media:new e("#wireless .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.2,end:0,media:new e("#wireless .copy",0.2,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#wireless .ac",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#wireless .bluetooth",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#wireless .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#wireless .ac",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#wireless .bluetooth",0.5,[{property:"opacity",from:1,to:0}])}]},{time:40,events:[{type:"pauseenter",action:function(i){}}],clips:[]},{name:"design",pause:42,time:42,labelSelector:"#design",events:[{type:"pauseenter",action:function(){document.querySelector(".still_14").classList.add("crossFade")
}},{type:"pauseenter",action:function(){z.classList.remove("show")}},{type:"pauseexit",action:function(i){if(i.to===13){z.classList.add("show")
}}}],clips:[{start:-0.1,end:1.4,media:new h(".still_14",1.5)},{start:-0.5,end:0,media:new e("#design .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:0,end:0.5,media:new e("#design .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])}]},{name:"assembly",pause:44,time:44,labelSelector:"#assembly",events:[{type:"pauseexit",action:function(){document.querySelector(".still_14").classList.remove("crossFade")
}}],clips:[{start:-0.8,end:-0.3,media:new e("#assembly .copy",0.5,[{property:"opacity",from:0,to:1},{property:"translate",axis:"y",from:20,to:0,units:"px"}])},{start:-0.3,end:0,media:new e("#assembly .copy",0.3,[{property:"opacity",from:1,to:1}])},{start:-0.5,end:0,media:new e("#assembly .first",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#assembly .second",0.5,[{property:"opacity",from:0,to:1}])},{start:-0.5,end:0,media:new e("#assembly .third",0.5,[{property:"opacity",from:0,to:1}])},{start:0,end:0.5,media:new e("#assembly .copy",0.5,[{property:"opacity",from:1,to:0},{property:"translate",axis:"y",from:0,to:-20,units:"px"}])},{start:0,end:0.5,media:new e("#assembly .first",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#assembly .second",0.5,[{property:"opacity",from:1,to:0}])},{start:0,end:0.5,media:new e("#assembly .third",0.5,[{property:"opacity",from:1,to:0}])}]},{name:"learn more",pause:46,time:46,labelSelector:"#comingsoon",events:[{type:"pauseenter",action:function(){}},{type:"pauseexit",action:function(){}},{type:"pauseenter",action:function(){document.querySelector(".still_15").classList.add("crossFade")
}},{type:"pauseexit",action:function(){document.querySelector(".still_15").classList.remove("crossFade")
}}],clips:[{start:-0.1,end:0,media:new e(".still_15",0.1,[{property:"opacity",from:1,to:1}])},{start:-1.3,end:0,media:new e("#comingsoon .copy",1.3,[{property:"opacity",from:0,to:1,easing:"easeInQuad"}])},{start:-0.3,end:0,media:new e("#comingsoon .copy",0.3,[{property:"opacity",from:1,to:1}])}]}]
}});AC.define("overview/desktop/input/Wheel",[],function(){var d=AC.Environment.Browser.name==="Firefox";
var f=(d)?0.02:0.01;function e(a,b){this.uiController=a;this.uiController.add(this);
this.enabled=true;this.max=0;this.pixelToMediaSpeedRatio=f;this.onWheel=this.onWheel.bind(this);
if(!("addWheelListener" in window)){throw new Error("WheelInputController: window.addWheelListener polyfill missing.")
}window.addWheelListener(document,this.onWheel)}e.prototype={onWheel:function(b){var a;
if(this.enabled){b.preventDefault();a=b.deltaY;if(d){a=this._normalize(a)}a*=this.pixelToMediaSpeedRatio;
this.uiController.update(a);this.uiController._lastInteractionType="scroll"}},enable:function(){this.enabled=true
},disable:function(){this.enabled=false},_normalize:function(a){var b=this._max||0.2;
if(a>b){b=a}else{if(a<-b){b=-a}}this._max=b;clearTimeout(this._normalizeTimeout);
this._normalizeTimeout=setTimeout(function(){this._max=null}.bind(this),100);return a/b
}};return e});AC.define("overview/desktop/input/Keyboard",["require"],function(e){var d=true;
function f(a){this.uiController=a;this.uiController.add(this);this.enabled=true;
this.onKeyDown=this.onKeyDown.bind(this);document.addEventListener("keydown",this.onKeyDown)
}f.prototype={keyMapping:{"37":"previous","38":"previous","39":"next","40":"next","32":"next"},onKeyDown:function(a){var b,c=a.keyCode;
if(!this.enabled){return}if(c in this.keyMapping){b=this.keyMapping[a.keyCode];
this.uiController._lastInteractionType="scroll";this.uiController[b].call(this.uiController)
}},enable:function(){this.enabled=true},disable:function(){this.enabled=false}};
return f});AC.define("overview/desktop/input/Click",["require"],function(c){function d(a){this.uiController=a;
this.uiController.add(this);this.enabled=true;this.onClick=this.onClick.bind(this);
document.addEventListener("click",this.onClick,true)}d.prototype={onClick:function(b){var e=(b&&b.target)||(b&&b.srcElement);
var h=e&&e.getAttribute&&e.getAttribute("data-nav-item");var a=e&&e.getAttribute("data-placeholder");
window.clearTimeout(this._timeout);if(a&&!h){this.uiController._lastInteractionType="image-click";
this.uiController.next()}},disable:function(){this.enabled=false},enable:function(){this.enabled=true
}};return d});AC.define("performance/desktop/HeightMargin",["require"],function(e){function f(a,b,c){this._target=a;
this._sample=b;this._margins=c.map(this._parseMargin);AC.Element.addEventListener(window,"resize",this._handleResize.bind(this));
this.resize()}var d=f.prototype;d.resize=function(){var b=this._sample.getBoundingClientRect();
var c=b.bottom-b.top;var a=this._margins.map(function(h){return this._marginFromHeight(h,c)
}.bind(this));AC.Element.setStyle(this._target,{margin:a.join(" ")})};d._parseMargin=function(a){return parseInt(a,10)
};d._handleResize=function(a){this.resize()};d._marginFromHeight=function(a,c){var b=(a/100)*c;
return b+"px"};return f});AC.define("overview/desktop/app/Desktop",["require","overview/shared/app/Core","overview/desktop/timeline/intro","overview/desktop/timeline/timeline","overview/shared/ClipContainer","overview/shared/controller/Section","overview/shared/controller/Ui","overview/shared/controller/Nav","overview/desktop/input/Wheel","overview/desktop/input/Keyboard","overview/desktop/input/Click","overview/shared/clip/Tween","overview/shared/ComparisonChart","performance/desktop/HeightMargin"],function(F){function w(c,a){var b=c.parentNode;
var d=null;while(b.parentNode){if(b.classList&&b.classList.contains(a)){d=b;break
}b=b.parentNode}return d}var B=AC.Environment.Browser.name==="IE";var L=F("overview/shared/app/Core");
var y=F("overview/desktop/timeline/intro");var E=F("overview/desktop/timeline/timeline");
var C=F("overview/shared/ClipContainer"),H=F("overview/shared/controller/Section"),K=F("overview/shared/controller/Ui"),A=F("overview/shared/controller/Nav"),v=F("overview/desktop/input/Wheel"),G=F("overview/desktop/input/Keyboard"),u=F("overview/desktop/input/Click"),J=F("overview/shared/clip/Tween"),I=F("overview/shared/ComparisonChart");
var D=F("performance/desktop/HeightMargin");var x=[{selector:"processor-chart",pausePoint:10},{selector:"memory-chart",pausePoint:13},{selector:"graphics-chart",pausePoint:17},{selector:"storage-chart",pausePoint:19}];
var M=null;function z(a){L.call(this);this.introcontainer=document.getElementById("introcontainer");
this.videocontainer=document.getElementById("videocontainer");this.stillcontainer=document.getElementById("stillcontainer");
this.panelcontainer=document.getElementById("panelcontainer");E=E();y=y();this.touch="ontouchstart" in window;
this.timeline=this.convertSectionsToClips(E);this.introContainer=new C(this.introcontainer,a.intro,y);
this.mainContainer=new C(this.videocontainer,a.main,this.timeline.clips);this.curtain=this.createFadeCurtain();
this.preventTouchDefault=this.preventTouchDefault.bind(this);document.addEventListener("touchstart",this.preventTouchDefault);
this.revertToStaticDelay=10000;this.revertToStatic=this.revertToStatic.bind(this);
this.revertToStaticTimeout=window.setTimeout(this.revertToStatic,this.revertToStaticDelay);
this.dynamic=true;this.introContainer.load().then(function(){window.clearTimeout(this.revertToStaticTimeout);
this.initializeInitialStill();this.resizeFluidAreas();var b=document.querySelector("#hero .placeholder-container.heading");
this.heightMargin=new D(b,b,["9.5%",0,0,0]);if(this.introContainer.clipController&&this.introContainer.clipController._mediaTimer&&this.introContainer.clipController._mediaTimer._video){this.introContainer.clipController._mediaTimer._video.addEventListener("ended",function(){if(this.introContainer.clipController.currentTime<this.introContainer.clipController.duration){this.introContainer.clipController._update(null,true)
}}.bind(this))}this.introContainer.clipController.on("ended",function(){this.cleanUpInitialStill();
this.mainContainer.load().then(this.initMain.bind(this))}.bind(this));this.introContainer.play()
}.bind(this));window.app=this}z.prototype=new L();z.prototype.constructor=z;z.prototype.revertToStatic=function(){var b=document.documentElement;
var c=document.body;var a=document.getElementById("wrapper");this.dynamic=false;
if(this.uiController){this.uiController.disableInput()}b.classList.remove("enabled");
b.classList.remove("overflow");c.id="static";this.setupStaticCharts()};z.prototype.resizeFluidAreas=function(a,b){var c;
this.resizeContainers();this.resizeCanvas();c=this.getVideoHeight();this.resizePlaceholders(c);
this.resizeCallouts(c);this.resizeBottomContainers();if(this.heightMargin){this.heightMargin.resize()
}if(this.resizeDebounceTimeout){clearTimeout(this.resizeDebounceTimeout)}if(!b){this.resizeDebounceTimeout=setTimeout(this.resizeFluidAreas.bind(this,null,true),250)
}};z.prototype.getVideoHeight=function(){var a=videocontainer.querySelector("*")||introcontainer.querySelector("*");
var b=a.getBoundingClientRect();var c=b.height;return c};z.prototype.resizeContainers=function(){var j=window.innerHeight;
var g=window.innerWidth;var d=this.videocontainer;var i=this.introcontainer;var e=this.stillcontainer;
var f=this.panelcontainer;var h=d.querySelector("*")||i.querySelector("*");var c,a,k;
if(!h){return false}if(j<583){k="495px"}else{if(j<750){var b=750-((Math.abs(j-750)*1.52));
k=b+"px"}else{k="100%"}}e.style.height=k;i.style.height=k;d.style.height=k};z.prototype.resizeCanvas=function(){var a;
var b=this.videocontainer.querySelector("canvas")||this.introcontainer.querySelector("canvas");
if(b){a=videocontainer.getBoundingClientRect().height;b.style.width=a*(b.width/b.height)+"px"
}};z.prototype.resizeBottomContainers=function(){var a=this.panelcontainer.querySelectorAll(".bottom-container");
[].forEach.call(a,function(d){var b=d.querySelector(".copy");var c;if(b!==null){c=Math.round(b.getBoundingClientRect().height);
d.style.minHeight=c+"px"}})};z.prototype.resizeCallouts=function(b){var a=this.panelcontainer.querySelectorAll(".callout");
[].forEach.call(a,function(q){var n=0;var e=496;var O=0.0013;var l=q.querySelector(".bars-container");
var d=q.querySelector(".mid");var m=w(q,"placeholder-container");var f=q.querySelector(".label");
var c=Math.round(d.getBoundingClientRect().height);var t=parseFloat(m.getAttribute("data-height-ratio"));
var r=parseFloat(m.getAttribute("data-min-top"));var p=parseFloat(m.getAttribute("data-top"));
var k=r/e;var h=b*t;var i,g,j;if(l!==null){j=f.height;l.style.height=c-j+"px"}if(!m.classList.contains("true-center")){if(window.innerHeight<750){var o=50-((Math.abs(window.innerHeight-750)*0.29));
if(o<0){o=0}i=o}else{i=(b*k)*(b*O)}if(i<p){i=p}g=(b*t)-(i+i*0.3);q.style.top=i+"px";
q.style.height=g+"px"}else{q.style.top="0px";q.style.height=h+"px"}})};z.prototype.resizePlaceholders=function(b){var a=this.panelcontainer.querySelectorAll(".placeholder-container");
[].forEach.call(a,function(m){var f=496;var O=0.0013;var e=185;var t=m.querySelector(".placeholder-inner");
var p=parseFloat(m.getAttribute("data-min-top"));var h=parseFloat(m.getAttribute("data-top"));
var k=p/f;var q=parseFloat(m.getAttribute("data-height-ratio"));var o=parseFloat(m.getAttribute("data-width-ratio"));
var n=m.getAttribute("data-width-ratio-narrow");var j,l,r,i,g,d,c;if(n){n=parseFloat(n)
}if(isNaN(k)||isNaN(q)||isNaN(o)){return}if(b<f){r=p}else{r=b*k}j=b*q;l=b*o;if(m.classList.contains("hero")){k=(p/(b+e));
r=b*k;m.style.top=r+"px"}if(r<h){r=h}if(m.classList.contains("static-top")){m.style.top=p+"px"
}else{m.style.top=r+"px"}t.style.width=l+"px";t.style.height=j+"px"})};z.prototype.getMidVideoY=function(){var c,a;
var b=Math.round(document.getElementById("change").querySelector(".copy").getBoundingClientRect().height);
return(document.documentElement.clientHeight-b)*0.07};z.prototype.applyDynamicTranslation=function(c){var a=this.getMidVideoY();
var b=AC.Environment.Feature.cssPropertyAvailable("transition");if(b||c){AC.Element.setVendorPrefixStyle(this.videocontainer,"transform","translate3d(0,"+a+"px,0)");
AC.Element.setVendorPrefixStyle(this.stillcontainer,"transform","translate3d(0,"+a+"px,0)")
}else{this.applyRuntimeTween(a)}};z.prototype.getTranslateValues=function(b,c){var g=this.mainContainer.clipController.playbackRate;
var d=185;var f,a,e;if(b===0&&c===1){e={from:d,to:this.getMidVideoY()}}else{if(b===1&&c===0){e={from:this.getMidVideoY(),to:d}
}else{if(b===1&&c===2){e={from:this.getMidVideoY(),to:0}}else{if(b===2&&c===1){e={from:0,to:this.getMidVideoY()}
}}}}return e};z.prototype.applyRuntimeTween=function(c){var f=new J("#videocontainer",1.5,[{property:"translate2d",axis:"y",from:c.from,to:c.to,units:"px"}]);
var e=new J("#stillcontainer",1.5,[{property:"translate2d",axis:"y",from:c.from,to:c.to,units:"px"}]);
var g=f.duration;var b=null;var b,d,g;function a(i){var h=(d/g)*g;if(!b){b=i}d=(i-b)/1000;
f.tween(h);e.tween(h);if(d<g){requestAnimationFrame(a)}}window.requestAnimationFrame(a)
};z.prototype.setupMoveableSeekable=function(){function b(k){k.classList.add("transition")
}function a(k){k.classList.remove("transition")}function h(k){k.classList.add("lowered")
}function d(k){k.classList.remove("lowered")}function j(k){AC.Element.setVendorPrefixStyle(k,"transform","")
}var e=this.videocontainer;var f=this.stillcontainer;var i=this.introcontainer;
var g=[e,f,i];var c=AC.Environment.Feature.cssPropertyAvailable("transition");this.sectionController.on("seek",function(k){if(k.to===0){if(k.from!==1||k.from!==2){g.forEach(j)
}g.forEach(a);g.forEach(h)}else{if(k.to===1&&k.from!==2){g.forEach(h);setTimeout(function(){g.forEach(b)
},10);this.applyDynamicTranslation(true)}else{g.forEach(a);g.forEach(d);g.forEach(j)
}}}.bind(this));this.sectionController.on("pauseexit:0",function(){var l=app.mainContainer.clipController._mediaTimer._forwardsVideo;
var k=this.touch;var m=function(){this.applyDynamicTranslation();g.forEach(b)}.bind(this);
if(c){m()}else{this.applyRuntimeTween(this.getTranslateValues(0,1))}}.bind(this));
this.sectionController.on("pauseexit:1",function(k){if(k.to===2){if(c){g.forEach(d);
g.forEach(j)}else{this.applyRuntimeTween(this.getTranslateValues(1,2))}}else{if(k.to===0){if(c){g.forEach(j)
}else{this.applyRuntimeTween(this.getTranslateValues(1,0))}}}}.bind(this));this.sectionController.on("pauseenter:1",function(k){e.classList.remove("delayed-transition");
e.classList.add("transition")});this.sectionController.on("pauseexit:2",function(k){if(k.to===1){if(c){g.forEach(h);
e.classList.add("delayed-transition");this.applyDynamicTranslation()}else{window.setTimeout(function(){this.applyRuntimeTween(this.getTranslateValues(2,1))
}.bind(this),1000)}}else{g.forEach(a)}}.bind(this))};z.prototype.setupEnd=function(){var e=app.sectionController._pauseTimeline.length-1;
var f=this.sectionController.seek.bind(this.sectionController,0);var a=document.querySelector(".footer-wrapper");
var b=document.querySelector(".sosumi");var c=document.querySelector(".productnav");
var d=function(){this.uiController.disableInput();document.documentElement.classList.remove("overflow");
a.classList.add("show");b.classList.add("show")}.bind(this);this.sectionController.on("pauseenter:"+e,d);
this.mainContainer.clipController.on("ended",d);this.sectionController.on("pauseexit:"+e,function(){a.classList.remove("show");
b.classList.remove("show")});this.sectionController.on("seek",function(g){if(g.to>0){c.classList.add("enabled")
}if(g.from===e){this.uiController.enableInput();this.videocontainer.classList.remove("transition");
this.stillcontainer.classList.remove("transition")}}.bind(this))};z.prototype.setupResizeEvents=function(){var b=this.applyDynamicTranslation.bind(this);
var a=this.resizeFluidAreas.bind(this);this.sectionController.on("pauseenter:1",function(){window.addEventListener("resize",b)
}.bind(this));this.sectionController.on("pauseexit:1",function(){window.removeEventListener("resize",b)
}.bind(this));window.addEventListener("resize",a)};z.prototype.setupVideoCrossover=function(){var b;
var a=function(){clearTimeout(b);this.videocontainer.style.display="block";this.introcontainer.style.display="none"
};app.sectionController.on("pauseexit:0",a.bind(this));b=setTimeout(a.bind(this),1200)
};z.prototype.setupCaret=function(){var a=document.getElementById("hero").querySelector(".caret .button");
a.addEventListener("click",this.sectionController.seek.bind(this.sectionController,2));
a.addEventListener("keydown",function(b){if(b.keyCode===13){this.sectionController.seek(2)
}}.bind(this))};z.prototype.preventTouchDefault=function(a){a.preventDefault()};
z.prototype.setupStaticCharts=function(){var a="can-animate";x.forEach(function(b){var c=new I(b.selector);
c.visitorEngaged()})};z.prototype.setupForceCurrentTime=function(){this.sectionController.on("pauseenter",function(b){var c=(b.index!=null)?b.index:b.to;
var a=this._pauseTimeline[c];setTimeout(function(){var d=app.mainContainer.clipController;
app.mainContainer.clipController.currentTime=a},200)}.bind(this.sectionController))
};z.prototype.initializeInitialStill=function(){this.stillcontainer.querySelector(".still_1").classList.add("initial")
};z.prototype.cleanUpInitialStill=function(){this.stillcontainer.querySelector(".still_1").classList.remove("initial")
};z.prototype.initMain=function(c,a){if(this.initialized){return}this.sectionController=new H(this.mainContainer.clipController,this.timeline.events.pauses,E);
this.uiController=new K(this.sectionController);if(this.dynamic){this.navController=new A(this.sectionController,E);
this.wheelInputController=new v(this.uiController);this.keyboardInputController=new G(this.uiController);
this.clickInputController=new u(this.uiController)}this.setupEnd();this.addTimelineEvents(E);
this.setupMoveableSeekable();this.setupResizeEvents();this.setupCaret();this.setupVideoCrossover();
this.addNextCarets();this.setupFocusEvents();this.sectionController.on("pauseenter",this.enterAnalytics.bind(this));
this.sectionController.on("pauseexit",this.exitAnalytics.bind(this));window.addEventListener("beforeunload",function(){this.analyzer.flush()
}.bind(this));this.mainContainer.clipController.currentTime=0;this.sectionController.trigger("pauseenter:0");
this.sectionController._update();if(B){this.setupForceCurrentTime();this.setupStaticCharts()
}this.sectionController.on("pauseexit",function(d){if(d.from===0){document.querySelector(".productnav").classList.add("enabled")
}else{if(d.to===0){document.querySelector(".productnav").classList.remove("enabled")
}}});var b=document.getElementById("sp-searchtext");if(b){b.addEventListener("focus",function(d){app.uiController.disableInput()
});b.addEventListener("blur",function(d){app.uiController.enableInput()})}this.sectionController.on("pauseexit",this.resizeFluidAreas.bind(this));
this.sectionController.on("pauseenter",this.resizeFluidAreas.bind(this));this.sectionController.on("seek",this.resizeFluidAreas.bind(this));
this.initialized=true};return z});AC.define("overview/desktop/settings-desktop",[],function(){var c="mp4";
var d="jpg";return{intro:[{type:"video",file:window.assetPath+"videos/macpro_intro_desktop."+c,stills:{1:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00090.jpg"}},{type:"flow",manifestFileName:"macpro_intro_flow_manifest.",flowPattern:"macpro_intro_flow_###.",manifest:window.assetPath+"flow/desktop/intro2/",diffDir:window.assetPath+"flow/desktop/intro2/",flowKeyFrame:window.assetPath+"flow/desktop/intro/macpro_intro_flow_keyframe."+d,flowEndFrame:window.assetPath+"flow/desktop/intro/macpro_intro_flow_endframe."+d,fps:30}],main:[{type:"video",file:window.assetPath+"videos/macpro_main_desktop."+c,stills:{1:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00090.jpg",2:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00120.jpg",3:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00210.jpg",4:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00330.jpg",5:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00420.jpg",6:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00540.jpg",7:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00600.jpg",8:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00720.jpg",9:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00930.jpg",10:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01110.jpg",13:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01260.jpg",14:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01320.jpg",15:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01500.jpg"}},{type:"flow",manifestFileName:"macpro_main_flow_manifest.",flowPattern:"macpro_main_flow_###.",manifest:window.assetPath+"flow/desktop/main2/",diffDir:window.assetPath+"flow/desktop/main2/",fps:30,flowKeyFrame:window.assetPath+"flow/desktop/main/macpro_main_flow_keyframe."+d,flowEndFrame:window.assetPath+"flow/desktop/main/macpro_main_flow_endframe."+d,stills:{1:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00090.jpg",2:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00120.jpg",3:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00210.jpg",4:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00330.jpg",5:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00420.jpg",6:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00540.jpg",7:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00600.jpg",8:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00720.jpg",9:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_00930.jpg",10:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01110.jpg",13:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01260.jpg",14:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01320.jpg",15:"http://images.apple.com/v/mac-pro/home/b/images/stills/desktop/macpro_01500.jpg"}}]}
});AC.define("overview/desktop/app/Loader",["require","overview/desktop/app/iPad","overview/desktop/settings-ipad","overview/desktop/app/Desktop","overview/desktop/settings-desktop","overview/shared/ComparisonChart"],function(p){function o(a){return a.match(/AppleWebKit/i)
}function v(a){return o(a)&&a.match(/iPad/i)}function t(a){return a.match(/iPhone/i)
}function q(a){return a.match(/iPod/i)}function l(a){return o(a)&&a.match(/Mobile/i)&&!v(a)
}function m(a){return l(a)||v(a)?parseFloat(a.match(/os ([\d_]*)/i)[1].replace("_",".")):0
}var w=navigator.userAgent;var n=AC.Environment.Feature.canvasAvailable();var r=n&&!w.match(/Android/i);
var u={dynamic:function(){var f=navigator.userAgent;var e=f.match(/AppleWebKit/i);
var b=e&&f.match(/iPad/i)&&m(f)>5.9;var g=document.documentElement;if(b){var c=p("overview/desktop/app/iPad");
var a=p("overview/desktop/settings-ipad");document.body.id="ipad";document.body.classList.add("intro-hidden");
document.querySelector("#wrapper").classList.add("enabled");window.app=new c(a)
}else{var d=p("overview/desktop/app/Desktop");var a=p("overview/desktop/settings-desktop");
document.body.id="desktop";document.body.style.display="block";window.app=new d(a)
}g.classList.add("enabled");g.classList.add("overflow")},fallback:function(){var b=p("overview/shared/ComparisonChart");
var a=new b("processor-chart");var e=new b("memory-chart");var c=new b("graphics-chart");
var d=new b("storage-chart");document.body.style.display="block";a.visitorEngaged();
e.visitorEngaged();c.visitorEngaged();d.visitorEngaged()}};return{load:function(){u[r?"dynamic":"fallback"].call(this)
}}});AC.define("overview/shared/EndLinkTracker",["require"],function(h){var g="ontouchstart" in window?"touchstart":"mousedown";
var i=AC.Element.select(".cta.performance");var j=AC.Element.select(".cta.tech-specs");
var k=AC.Element.addEventListener;function l(a){return function(b){var d={};var c=AC.Event.target(b);
d.prop3=(a+"@"+AC.Tracking.pageName()).toLowerCase();AC.Tracking.trackClick(d,this,"o",d.prop3)
}}return{track:function(){s.useForcedLinkTracking=true;k(i,g,l("performance"));
k(j,g,l("tech specs"))}}});AC.define("overview/desktop/main",["require","overview/desktop/app/Loader","overview/shared/EndLinkTracker"],function(e){window.DEBUG=false;
var f=e("overview/desktop/app/Loader");var d=e("overview/shared/EndLinkTracker");
d.track();f.load()});