AC.define("flow/diff/Loader",["require","assetLoader/AssetLoader"],function(e){var h,f=e("assetLoader/AssetLoader");
function g(c,i){var d,a,b=c.match(/#/g).length;this.imagesUrls=[];if(!i){throw new Error("0 images provided")
}for(d=1;d<=i;d++){a="0000"+d;a=a.substring(a.length-b);this.imagesUrls.push(c.replace(/#{2,}/g,a))
}}h=g.prototype;h.load=function(){return new f(this.imagesUrls).load()};return g
});AC.define("flow/diff/Render",["require","flow/diff/Loader","defer/Deferred"],function(i){var h,j=i("flow/diff/Loader"),f=i("defer/Deferred");
function g(a,b){this.flowData=a;this.flowData.imageUrlPattern=b}h=g.prototype;h._storeImages=function(a){if(DEBUG){console.log("loaded images")
}this.images=a;this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new f()).resolve()};h._applyDiffRange=function(z,d){var u=d.block,y=d.length,A=z.canvas.width/this.flowData.blockSize,w=Math.floor(u/this._blocksPerFullDiff),C=this.images[w].width,B=u%this._blocksPerFullDiff,D=C/this.flowData.blockSize,a=(B%D)*this.flowData.blockSize,b=Math.floor(B/(D||1))*this.flowData.blockSize,e=(d.location%A)*this.flowData.blockSize,v=Math.floor(d.location/A)*this.flowData.blockSize,x,c;
while(y){x=Math.min((y*this.flowData.blockSize),z.canvas.width-e,C-a);c=x/this.flowData.blockSize;
if(DEBUG){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:w,block:u,x:a,y:b})
}}z.drawImage(this.images[w],a,b,x,this.flowData.blockSize,e,v,x,this.flowData.blockSize);
y-=c;if(y){if((a+=x)>=C){a=0;b+=this.flowData.blockSize}if((B+=c)>=this._blocksPerFullDiff){B=0;
a=0;b=0;w+=1;if(w===this.flowData.imagesRequired-1){C=this.images[w].width}}if((e+=x)>=z.canvas.width){e=0;
v+=this.flowData.blockSize}u+=c}}};h.init=function(){if(DEBUG){console.log("load images")
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
return this._loader.load().then(this._storeImages.bind(this))};e.renderKeyframe=function(s,t,a){var u=s.getContext("2d"),r=this._loader.keyframes[t],q=r.image,c=r.x,d=r.y,b=r.width,p=r.height;
if(DEBUG){console.log("applying keyframe diff image: "+t);console.log("x:"+c+" y:"+d+" w:"+b+" h:"+p)
}if(a===true){if(DEBUG){console.log("drawing superKeyframe sub-rectangle")}u.drawImage(q,c,d,b,p,c,d,b,p)
}else{if(this.flowData.reversible){if(DEBUG){console.log("drawing superKeyframe full image")
}u.drawImage(q,0,0)}else{if(DEBUG){console.log("drawing keyframe full image")}u.drawImage(q,c,d,b,p)
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
return AC.Ambient});AC.define("overview/AmbientFlow",["require","flow/playerFactory","AC/Ambient"],function(f){var h=f("flow/playerFactory");
var g=f("AC/Ambient");window.DEBUG=false;var e=function(c,a,b){this._element=AC.Element.getElementById(c);
this._flow=null;this._ambient=null;AC.Object.synthesize(this);this.setAmbient(this.__createAmbient(this.element()));
this.ambient().setDelegate(this);if(this.ambient().canPlay()){this.setFlow(this.__createFlow(this.element(),a,b))
}};e.prototype={__createFlow:function(n,c,d){var p="j";var b=[c+d+"_keyframe."+p+"pg",c+d+"_endframe."+p+"pg"];
var o=c+d+"_###."+p+"pg";var j=c+d+"_manifest.json";var a=h(n,b,o,j,{keyframeCache:false});
a.frameRate=24;a.loop=false;a.__canPlayThrough=false;a.on("canplaythrough",function(){a.__canPlayThrough=true
});return a},__createAmbient:function(b){var a=new g.Scroll(b,{playOnVisitorEngaged:true});
return a},canPlay:function(){return AC.Environment.Feature.canvasAvailable()&&!AC.Environment.Feature.touchAvailable()
},play:function(){var a=this.flow();if(a.__canPlayThrough){a.play()}else{a.on("canplaythrough",function(){a.play()
})}}};return e});AC.define("overview/bootstrap",["require","overview/AmbientFlow"],function(d){var c=d("overview/AmbientFlow");
AC.onDOMReady(function(){var a="/105/media/us/ipad-mini/2013/178b6825-6025-419f-8f0c-4e9a1c0bab04/index/smartcover_peek/";
var f="smartcover_peek";var b=new c("smartcover-peek",a,f)})});