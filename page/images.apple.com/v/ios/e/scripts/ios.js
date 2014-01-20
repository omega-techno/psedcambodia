AC.define("animationSlider/AnimationSlider",["require","defer/Deferred"],function(a){function b(e,d){this._element=e,this._easingString=d,this._currentDistance=0
}var c=a("defer/Deferred");return b.version="0.1",b.prototype={currentDistance:function(){return this._currentDistance
},__setCurrentDistance:function(d){return this._currentDistance=d,this},easingString:function(){return this._easingString
},slide:function(){var d=new c();return d.resolve(),d.promise()},element:function(){return this._element
},activate:function(){return AC.Element.addClassName(this.element(),"slide"),this
}},b}),AC.define("animationSlider/Decorator",[],function(){function a(b){this._parent=b
}return a.prototype={currentDistance:function(){return this._parent.currentDistance()
},__setCurrentDistance:function(b){return this._parent.__setCurrentDistance(b)},easingString:function(){return this._parent.easingString()
},slide:function(c,b){return this._parent.slide(c,b)},element:function(){return this._parent.element()
},distance:function(){return this._parent.distance()},duration:function(){return this._parent.duration()
},activate:function(){return this._parent.activate()}},a}),AC.define("animationSlider/decorators/ThreeDTransform",["require","animationSlider/Decorator","defer/Deferred"],function(b){function c(g){this._parent=g,this._transformDuration=null
}var a=b("animationSlider/Decorator"),f=b("defer/Deferred"),e=AC.Element.setVendorPrefixStyle,d=c.prototype=new a();
return d.__applyTransformDurationIfNotSet=function(g){this._transformDuration!==g&&this.__applyTransformDuration(g),this._transformDuration=g
},d.__setupAfterSlideDeferred=function(g){var i=new f(),j=this.element(),h=function(){AC.Element.removeVendorPrefixEventListener(j,"transitionEnd",h),this.__setCurrentDistance(g),i.resolve()
}.bind(this);return AC.Element.addVendorPrefixEventListener(this.element(),"transitionEnd",h),i.promise()
},d.__applyTransformDuration=function(h){var g=this.element();e(g,"transition-duration",h+"ms"),e(g,"transition-property","transform"),e(g,"transition-timing-function",this.easingString())
},d.__applyTranslateValue=function(g){var h=this.element();AC.Environment.Feature.threeDTransformsAvailable()?e(h,"transform","translate3d("+g+"px, 0, 0)"):e(h,"transform","translateX("+g+"px)")
},d.slide=function(i,h){var g=this.currentDistance()+i;return this.__applyTransformDurationIfNotSet(h),this.__applyTranslateValue(g),this.__setupAfterSlideDeferred(g)
},d.activate=function(){return AC.Element.setStyle(this.element(),{position:"relative",zIndex:1010}),this._parent.activate()
},c}),AC.define("animationTimeout/AnimationTimeout",["require","defer/Deferred"],function(b){function c(f,g,e){this.duration=f,g&&(this._intervalFunction=g),e&&(this._cancelFunction=e),this._update=this._update.bind(this)
}var d,a=b("defer/Deferred");return d=c.prototype,d._intervalFunction=window.requestAnimationFrame.bind(window),d._cancelFunction=window.cancelAnimationFrame.bind(window),d._update=function(e){this._startTime=this._startTime||e,this._progress=(e-this._startTime)/this.duration,this._progress<1?(this._defer.progress(this._progress),this._requestID=this._intervalFunction(this._update)):(this._progress=1,this._defer.progress(1),this._defer.resolve(1))
},d.start=function(){return this._defer=new a(),this._startTime=0,this._requestID=this._intervalFunction(this._update),this._defer.promise()
},d.cancel=function(){this._cancelFunction(this._requestID),this._defer.reject()
},c}),AC.define("animationSlider/getEasingFunction",[],function(){function a(b){var c,d={ease:"easeInOutSine","ease-in":"easeOutCubic","ease-out":"easeOutCubic","ease-in-out":"easeInOutCubic",linear:"linear"};
if(b=d[b]||b,"string"==typeof b){if("function"!=typeof AC.EasingFunctions[b]||"ease"===b){throw new TypeError('"'+b+'" is not a valid easing type')
}c=AC.EasingFunctions[b]}return c}return a}),AC.define("animationSlider/decorators/CSSLeft",["require","animationTimeout/AnimationTimeout","animationSlider/Decorator","animationSlider/getEasingFunction"],function(d){function f(g){this._parent=g
}var b=d("animationTimeout/AnimationTimeout"),a=d("animationSlider/Decorator"),c=d("animationSlider/getEasingFunction"),e=f.prototype=new a();
return e.slide=function(m,k){var g=new b(k),i=this.element(),j=c(this.easingString()),h=this.currentDistance(),l=g.start();
return l=l.then(null,null,function(n){var o=j(n*k,h,m,k);AC.Element.setStyle(i,{left:o+"px"})
}),l.then(this.__setCurrentDistance.bind(this,h+m))},e.activate=function(){return AC.Element.setStyle(this.element(),{position:"relative",zIndex:2}),this._parent.activate()
},f}),AC.define("animationSlider/builder",["require","animationSlider/AnimationSlider","animationSlider/decorators/ThreeDTransform","animationSlider/decorators/CSSLeft"],function(a){function e(h,g){g=g||"linear";
var i=new b(h,g),f=AC.Environment.Feature.cssPropertyAvailable;return i=f("transform")&&f("transition")?new d(i):new c(i),i.activate(),i
}var b=a("animationSlider/AnimationSlider"),d=a("animationSlider/decorators/ThreeDTransform"),c=a("animationSlider/decorators/CSSLeft");
return e}),AC.define("screenSequence/ScreenSequence",["require","defer/Deferred"],function(b){var c=b("defer/Deferred"),a=AC.Class({__defaultOptions:{preload:!1,hidePosterframeOnPlay:!0,endframeTransitionDuration:0.4,requireCanPlayThroughToPlay:!0,posterframe:"posterframe"},initialize:function(d,e){this._options={},this._delegate={},this._container=AC.Element.getElementById(d),this._id=null,this._assetPath=null,this._sequence=null,this._posterframeElement=null,this._endstateElement=null,this._screenElement=null,this._canPlayThrough=!1,this._loading=!1,this._loaded=!1,this._hasPlayed=!1,this._playing=!1,this._autoplay=!1,this.synthesize(),this.setOptions(AC.Object.extend(AC.Object.clone(this.__defaultOptions),e||{})),this.setId(this.container().getAttribute("data-"+a.prefix)),this.setAssetPath(a.assetPath+this.id()+"/"),this.__enhance(),this.hideEndstate(),this.__addEventListeners(),this.options().preload===!0&&this.load()
},load:function(){if(this.playing()===!0||this.loaded()===!0){return new c().resolve()
}var d;return this.setLoading(!0),d="function"==typeof this.delegate().load?this.delegate().load(this):this.__load(),d.then(function(){this.setLoading(!1),this.setLoaded(!0)
}.bind(this)),this.__publish("loading"),d},__load:function(){var d=new c();return d.resolve(),d
},play:function(){return this.playing()===!0?!1:this.options().requireCanPlayThroughToPlay&&this.canPlayThrough()!==!0?(this.options().autoplay=!0,this.loading()||this.load(),void 0):(this.__publish("play"),this.options().hidePosterframeOnPlay===!0&&this.hidePosterframe(),this.hideEndstate(),"function"==typeof this.delegate().play?this.delegate().play(this):this.__play(),this.setPlaying(!0),void 0)
},__play:function(){},pause:function(){return this.playing()!==!0?!1:("function"==typeof this.delegate().pause?this.delegate().pause(this):this.__pause(),this.setPlaying(!1),this.__publish("paused"),void 0)
},__pause:function(){this.sequence().pause()},stop:function(){if(this.playing()!==!0&&this.loaded()===!0){return !1
}var d;d="function"==typeof this.delegate().stop?function(){this.delegate().stop(this)
}.bind(this):this.__stop.bind(this),this.options().autoplay=!1;var e=this.showEndstate();
e.then(d),this.__publish("stopped")},__stop:function(){this.loading()&&(this.setLoading(!1),this.hidePosterframe()),AC.Element.addClassName(this.container(),a.prefix+"-ended"),this.loaded()&&(this.sequence().currentTime=0)
},showPosterframe:function(){AC.Element.setStyle(this.posterframeElement(),{display:"block"})
},hidePosterframe:function(){AC.Element.setStyle(this.posterframeElement(),{display:"none"})
},showEndstate:function(){var g=new c(),e=this.endstateElement(),d=!1,f=function(){d||g.resolve(),d=!0
};return AC.Element.setVendorPrefixStyle(e,"transform","none"),AC.Element.setStyle(e,"opacity:0"),g.then(function(){AC.Element.removeVendorPrefixEventListener(e,"transitionEnd",f)
}),this.playing()&&(this.pause(),this.setHasPlayed(!0)),AC.Element.setVendorPrefixStyle(e,"transition","opacity "+this.options().endframeTransitionDuration+"s ease-out"),AC.Element.setStyle(e,"opacity:1; z-index:1002"),AC.Environment.Feature.cssPropertyAvailable("transition")?AC.Element.addVendorPrefixEventListener(e,"transitionEnd",f):f(),g
},hideEndstate:function(){var d=this.endstateElement();AC.Element.setVendorPrefixStyle(d,"transition","none"),AC.Element.setStyle(d,"opacity:0; z-index:1000")
},__enhance:function(){this.setScreenElement(document.createElement("div")),this.setEndstateElement(this.__createEndstate()),this.setPosterframeElement(this.__createPosterframe()),this.setSequence(this.__createSequence()),AC.Element.insert(this.endstateElement(),this.screenElement()),AC.Element.insert(this.posterframeElement(),this.screenElement()),AC.Element.insert(this.sequence().node,this.screenElement()),AC.Element.addClassName(this.screenElement(),"screen"),AC.Element.addClassName(this.screenElement(),a.prefix+"-screen"),AC.Element.removeClassName(this.endstateElement(),"screen"),AC.Element.addClassName(this.endstateElement(),a.prefix+"-endstate"),AC.Element.addClassName(this.endstateElement(),a.prefix+"-element"),AC.Element.addClassName(this.posterframeElement(),a.prefix+"-posterframe"),AC.Element.addClassName(this.posterframeElement(),a.prefix+"-element"),AC.Element.addClassName(this.sequence().node,a.prefix+"-sequence"),AC.Element.addClassName(this.sequence().node,a.prefix+"-element"),AC.Element.insert(this.screenElement(),this.container(),"first"),AC.Element.addClassName(this.container(),a.prefix+"-enhanced"),this.__publish("enhanced")
},__createEndstate:function(){var d=AC.Element.select(".endstate",this.container());
if(!AC.Element.isElement(d)){throw"Missing endstate node for ScreenSequence"}return d
},__createSequence:function(){var d={node:document.createElement("div")};return d
},__createPosterframe:function(f){var d=document.createElement("img"),e="jpg";return f=f||"",d.src=this.assetPath()+this.id()+"_"+this.options().posterframe+f+"."+e,d.setAttribute("data-hires","false"),d
},__publish:function(d){AC.NotificationCenter.publish(a.prefix+"-"+d,{target:this,data:{sequence:this,eventName:d}})
},canPlayThrough:function(){return this._canPlayThrough!==!0&&"function"==typeof this.delegate().canPlayThrough&&(this._canPlayThrough=this.delegate().canPlayThrough(this)),this._canPlayThrough
},setCanPlayThrough:function(d){return this._canPlayThrough=d,this._canPlayThrough&&this.__publish("canPlayThrough"),this._canPlayThrough
},setLoading:function(d){return this._loading=!!d,this._loading?AC.Element.addClassName(this.container(),a.prefix+"-loading"):AC.Element.removeClassName(this.container(),a.prefix+"-loading"),this._loading
},setPlaying:function(d){return this._playing=!!d,this._playing?(AC.Element.addClassName(this.container(),a.prefix+"-playing"),AC.Element.removeClassName(this.container(),a.prefix+"-ended")):AC.Element.removeClassName(this.container(),a.prefix+"-playing"),this._playing
},setId:function(d){return d=d.match(/([^#]+)/),d&&(this._id=d[1]),this._id},__onCanPlayThrough:function(){AC.Element.removeEventListener(this.sequence().node,"canplaythrough",this.__boundOnCanPlayThrough),"function"==typeof this.delegate().setCanPlayThrough?this.delegate().setCanPlayThrough(this):this.setCanPlayThrough(!0),this.options().autoplay===!0&&this.play()
},__onPlaying:function(){this.__publish("playing")},__onTimeupdate:function(){"function"==typeof this.delegate().onTimeUpdate&&this.delegate().onTimeUpdate(this)
},__onEnded:function(){var d;return this.setHasPlayed(!0),this.setPlaying(!1),AC.Element.addClassName(this.container(),a.prefix+"-ended"),d=this.showEndstate(),this.__publish("ended"),d
},__addEventListeners:function(){var d=this.sequence().node;void 0===this.__boundOnCanPlayThrough&&(this.__boundOnCanPlayThrough=AC.Function.bindAsEventListener(this.__onCanPlayThrough,this)),void 0===this.__boundOnPlaying&&(this.__boundOnPlaying=AC.Function.bindAsEventListener(this.__onPlaying,this)),void 0===this.__boundOnTimeupdate&&(this.__boundOnTimeupdate=AC.Function.bindAsEventListener(this.__onTimeupdate,this)),void 0===this.__boundOnEnded&&(this.__boundOnEnded=AC.Function.bindAsEventListener(this.__onEnded,this)),AC.Element.addEventListener(d,"canplaythrough",this.__boundOnCanPlayThrough),AC.Element.addEventListener(d,"playing",this.__boundOnPlaying),AC.Element.addEventListener(d,"timeupdate",this.__boundOnTimeupdate),AC.Element.addEventListener(d,"ended",this.__boundOnEnded)
},__removeEventListeners:function(){var d=this.sequence().node;AC.Element.removeEventListener(d,"canplaythrough",this.__boundOnCanPlayThrough),AC.Element.removeEventListener(d,"playing",this.__boundOnPlaying),AC.Element.removeEventListener(d,"timeupdate",this.__boundOnTimeupdate),AC.Element.removeEventListener(d,"ended",this.__boundOnEnded)
}});return a.canPlay=function(){return !0},a.prefix="screensequence",a.assetPath=window.ScreenSequenceAssetPath,a
}),AC.define("assetLoader/AssetLoader",["require","defer/Deferred"],function(c){function b(e,d){this._assetsToLoad=[].concat(e),this._type=d||"img"
}var a=c("defer/Deferred");return b.prototype={load:function(){return this._assetsLoaded=[],this._assetsCountLoaded=0,this._defer=new a(),this._failure=!1,this._assetsToLoad.forEach(this._loadAsset.bind(this)),this._defer.promise()
},_progress:function(d){this._defer.progress(this._assetsLoaded[d.target._id]=d.target),this._assetsCountLoaded+=1,this._assetsCountLoaded===this._assetsToLoad.length&&this._defer.resolve(this._assetsLoaded)
},_error:function(d){this._failure=!0,this._defer.reject(d.target)},_loadAsset:function(e,f){var d;
this._failure||(d=document.createElement(this._type),d._id=f,d.onload=this._progress.bind(this),d.onerror=this._error.bind(this),d.src=e)
}},b}),AC.define("flow/diff/Loader",["require","assetLoader/AssetLoader"],function(b){function d(g,e){var f,j,h=g.match(/#/g).length;
if(this.imagesUrls=[],!e){throw new Error("0 images provided")}for(f=1;e>=f;f++){j="0000"+f,j=j.substring(j.length-h),this.imagesUrls.push(g.replace(/#{2,}/g,j))
}}var c,a=b("assetLoader/AssetLoader");return c=d.prototype,c.load=function(){return new a(this.imagesUrls).load()
},d}),AC.define("flow/diff/Render",["require","flow/diff/Loader","defer/Deferred"],function(d){function a(g,f){this.flowData=g,this.flowData.imageUrlPattern=f
}var e,c=d("flow/diff/Loader"),b=d("defer/Deferred");return e=a.prototype,e._storeImages=function(f){return this.images=f,this._blocksPerFullDiff=f[0].width/this.flowData.blockSize*(f[0].height/this.flowData.blockSize),new b().resolve()
},e._applyDiffRange=function(h,o){for(var j,q,m=o.block,i=o.length,g=h.canvas.width/this.flowData.blockSize,k=Math.floor(m/this._blocksPerFullDiff),t=this.images[k].width,f=m%this._blocksPerFullDiff,s=t/this.flowData.blockSize,r=f%s*this.flowData.blockSize,p=Math.floor(f/(s||1))*this.flowData.blockSize,n=o.location%g*this.flowData.blockSize,l=Math.floor(o.location/g)*this.flowData.blockSize;
i;){j=Math.min(i*this.flowData.blockSize,h.canvas.width-n,t-r),q=j/this.flowData.blockSize,h.drawImage(this.images[k],r,p,j,this.flowData.blockSize,n,l,j,this.flowData.blockSize),i-=q,i&&((r+=j)>=t&&(r=0,p+=this.flowData.blockSize),(f+=q)>=this._blocksPerFullDiff&&(f=0,r=0,p=0,k+=1,k===this.flowData.imagesRequired-1&&(t=this.images[k].width)),(n+=j)>=h.canvas.width&&(n=0,l+=this.flowData.blockSize),m+=q)
}},e.init=function(){return new c(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load().then(this._storeImages.bind(this))
},e.renderDiff=function(f,h){var g=f.getContext("2d");h-=1,this.frames[h].forEach(function(i){this._applyDiffRange(g,i)
}.bind(this))},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(e,{frames:{get:function(){return this.flowData.frames
},set:function(f){this.flowData.frames=f},enumerable:!0}}),a)}),AC.define("flow/compositor/Sequence",["require","assetLoader/AssetLoader","flow/diff/Render","defer/Deferred"],function(c){function d(i,h,g){this._keyframes=i,this._imageUrlPattern=h,this._flowDataProvider=g
}var e,a=c("assetLoader/AssetLoader"),f=c("flow/diff/Render"),b=c("defer/Deferred");
return e=d.prototype,e._initDiffRender=function(g){this._images=g,this.canvas.height=g[0].height,this.canvas.width=g[0].width,this.applyFrame(g[0])
},e.init=function(g){return this.canvas=g||document.createElement("canvas"),new a(this._keyframes).load().then(this._initDiffRender.bind(this)).then(this._flowDataProvider.load.bind(this._flowDataProvider))
},e.createDiffRender=function(g){return this._diffRender=new f(g,this._imageUrlPattern),this._diffRender.init()
},e.applyFrame=function(h){var g=this.canvas.getContext("2d");g.drawImage(h,0,0)
},e.calculateRenderCount=function(g,h){var i=0;return Math.abs(h-g)>=h?(g=1,i=1):Math.abs(h-g)>=this.frameCount-h&&this._images[1]&&(g=this.frameCount-2,i=1),h>0&&h<this.frameCount-1?Math.abs(g-h)+i:i
},e.compositeFrames=function(g,i){var h=new b();i=this.frameCount<i?this.frameCount-1:0>i?0:i,g=this.frameCount-2<g?this.frameCount-2:0>g?0:g;
var j;if(Math.abs(i-g)>=i?(g=1,this.applyFrame(this._images[0])):Math.abs(i-g)>=this.frameCount-i&&this._images[1]&&(g=this.frameCount-2,this.applyFrame(this._images[1])),j=g>i?-1:i>g?1:0,i>0&&i<this.frameCount-1){for(;
g!==i;){h.progress(g),this._diffRender.renderDiff(this.canvas,g),g+=j,h.progress(g)
}}return h.resolve(g),h.promise()},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(e,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:!0},canvas:{get:function(){return this._canvas},set:function(g){return this._canvas=g
},enumerable:!0},mainCompositor:{get:function(){for(var g=this;g._compositor;){g=g._compositor
}return g},enumerable:!0}}),d)}),AC.define("ajax/Ajax",["require","defer/Deferred"],function(b){function d(){var f=!1;
try{f=new XMLHttpRequest()}catch(g){try{f=new ActiveXObject("Msxml2.XMLHTTP")}catch(g){try{f=new ActiveXObject("Microsoft.XMLHTTP")
}catch(g){f=!1}}}return f}function e(f){f&&(this.timeout=f)}var c,a=b("defer/Deferred");
return c=e.prototype,c.timeout=5000,c.xhrMethod=function(m,g,i,l){var k,h=d(),f=new a();
l=l||{},h.open(m,g,!1),Object.keys(l).forEach(function(n){h.setRequestHeader(n,l[n])
}),k=setTimeout(function(){h.abort(),f.reject()},this.timeout),h.onreadystatechange=function(){4===h.readyState&&(clearTimeout(k),h.status>=200&&h.status<300?f.resolve(h):f.reject(h))
};try{h.send(i)}catch(j){clearTimeout(k),h.abort()}return f.promise()},c.post=function(f,g,h){return this.xhrMethod("POST",f,g,h)
},c.get=function(f,g,h){return this.xhrMethod("GET",f,g,h)},e}),AC.define("flow/data/Manifest",[],function(){function a(){}return a
}),AC.define("flow/data/Block",[],function(){function a(b,c){this.location=b,this.length=c
}return a}),AC.define("flow/data/processor",["require","flow/data/Manifest","flow/data/Block"],function(b){var d,e=b("flow/data/Manifest"),a=b("flow/data/Block"),c={parseData:function(f){d=0;
var g=f.frames.map(this._parseFrame,this);return Object.create(e.prototype,{version:{value:f.version},framecount:{value:f.frameCount},blockSize:{value:f.blockSize},imagesRequired:{value:f.imagesRequired},reversible:{value:f.reversible},superframeFrequency:{value:f.superframeFrequency},frames:{value:g}})
},_valueForCharAt:function(h,f){var g=h.charCodeAt(f);if(g>64&&91>g){return g-65
}if(g>96&&123>g){return g-71}if(g>47&&58>g){return g+4}if(43===g){return 62}if(47===g){return 63
}throw"Invalid Bas64 character: "+h.charAt(f)},_createNumberFromBase64Range:function(j,f,i){for(var g,h=0;
i--;){g=this._valueForCharAt(j,f++),h+=g<<6*i}return h},_parseFrame:function(g){var h,j,f,k=[],g=g.value||g;
for(h=0;h<g.length;h+=5){f=this._createNumberFromBase64Range(g,h,3),j=this._createNumberFromBase64Range(g,h+3,2),k.push(Object.create(a.prototype,{location:{value:f,enumerable:!0},length:{value:j,enumerable:!0},block:{value:(d+=j)-j,enumerable:!0}}))
}return k}};return c}),AC.define("flow/data/provider/Async",["require","ajax/Ajax","flow/data/processor"],function(b){function d(f,g){this._url=f,this._ajaxAdaptor=g||new a()
}var c,a=b("ajax/Ajax"),e=b("flow/data/processor");return c=d.prototype,c.load=function(){var f=this;
return this._ajaxAdaptor.get(this._url).then(function(h){try{var g=h.response||h.responseText;
return JSON.parse(g)}catch(i){}}).then(function(g){return f._data=g,e.parseData(g)
})},d}),AC.define("flow/data/provider/Sync",["require","defer/Deferred","flow/data/processor"],function(b){function d(f){this._data=f
}var c,a=b("defer/Deferred"),e=b("flow/data/processor");return c=d.prototype,c.load=function(){var f=new a();
return f.resolve(e.parseData(this._data)),f.promise()},d}),AC.define("flow/Player",["require","defer/Deferred"],function(b){function d(f,e){this._flow=e,this._frameRate=30,this.element=f,this.paused=!0,this.loop=!1
}var c,a=b("defer/Deferred");return c=d.prototype,c._dispatchEvent=function(e){var f=document.createEvent("Events");
return f.initEvent(e,!0,!1),f.data=this,this.element.dispatchEvent(f),f},c._timeToFrame=function(e){var f;
return f=Math.round(e/this.duration*this._flow.frameCount),f%=this._flow.frameCount+1,0>f?this._flow.frameCount+f:f
},c._advanceToTimeGlobal=function(e){this._prevTime=this._prevTime||e,this._currentTime+=(e-this._prevTime)/1000*this.playbackRate,this._prevTime=e;
var f=this._timeToFrame(this._currentTime),g=!1;return this.loop?this._currentTime=(this.duration+this._currentTime)%this.duration:this.playbackRate>0&&this._currentTime>this.duration?(f=this._flow.frameCount,this._currentTime=this.duration,g=!0):this.playbackRate<0&&this._currentTime<0&&(f=0,this._currentTime=0,g=!0),this.paused||this.seeking?new a().reject():this._flow.gotoFrame(f).then(function(){this._dispatchEvent("timeupdate"),g?(this.paused=!0,this._dispatchEvent("ended")):this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}.bind(this))},c._advanceToTimeLocal=function(e){this.seeking||(this.seeking=!0,this._dispatchEvent("seeking"),this._currentTime=1*e,this._prevTime=null,window.cancelAnimationFrame(this._requestAnimationFrame),this._flow.gotoFrame(this._timeToFrame(e)).then(function(){this.seeking=!1,this._dispatchEvent("timeupdate"),this._dispatchEvent("seeked"),this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))
}.bind(this)))},c.load=function(){return this._dispatchEvent("loadstart"),this._flow.init(this.element).then(this._dispatchEvent.bind(this,"canplaythrough"))
},c.play=function(){return this.paused&&(this.paused=!1,this._dispatchEvent("play"),this._prevTime=null,this._requestAnimationFrame=window.requestAnimationFrame(this._advanceToTimeGlobal.bind(this))),this
},c.pause=function(){return this.paused||(this.paused=!0,window.cancelAnimationFrame(this._requestAnimationFrame),this._dispatchEvent("pause")),this
},c.on=function(){this.element.addEventListener.apply(this.element,arguments)},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(c,{_currentTime:{value:0,enumerable:!1,writable:!0},_playbackRate:{value:1,enumerable:!1,writable:!0},currentTime:{get:function(){return 1*this._currentTime
},set:c._advanceToTimeLocal,enumerable:!0},frameRate:{get:function(){return this._frameRate
},set:function(e){isFinite(e)&&(this._frameRate=e,this._dispatchEvent("durationchange"))
},enumerable:!0},playbackRate:{get:function(){return 1*this._playbackRate},set:function(e){isFinite(e)&&(this._playbackRate=1*e,this._dispatchEvent("ratechange"))
},enumerable:!0},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:!0}}),d)}),AC.define("flow/keyframe/Loader",["require","assetLoader/AssetLoader","defer/Deferred"],function(d){function b(f,i){var h,g=f.match(/#/g).length;
this._keyframes={},f=f.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3"),this._imageUrls=[],i.frames&&i.frames.forEach(function(k,j){"keyframe"===k.type&&(h="0000"+j,h=h.substring(h.length-g),this._imageUrls.push(f.replace(/#+/g,h)),this._keyframes[j]=k)
}.bind(this))}var e,a=d("assetLoader/AssetLoader"),c=d("defer/Deferred");return e=b.prototype,e.load=function(){return this._imageUrls.length>0?new a(this._imageUrls).load():new c().resolve()
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(e,{keyframes:{get:function(){return this._keyframes
},enumerable:!0}}),b)}),AC.define("flow/keyframe/Render",["require","flow/keyframe/Loader"],function(a){function c(f,e){this.flowData=f,this.flowData.imageUrlPattern=e
}var b,d=a("flow/keyframe/Loader");return b=c.prototype,b._storeImages=function(e){var h,g=0;
if(e&&e.length>0){for(var f in this._loader._keyframes){this._loader._keyframes.hasOwnProperty(f)&&(h=e[g],this._loader._keyframes[f].image=h,g+=1)
}}},b.init=function(){return this._loader=new d(this.flowData.imageUrlPattern,this.flowData),this._loader.load().then(this._storeImages.bind(this))
},b.renderKeyframe=function(g,f,o){var e=g.getContext("2d"),i=this._loader.keyframes[f],j=i.image,m=i.x,l=i.y,n=i.width,k=i.height;
o===!0?e.drawImage(j,m,l,n,k,m,l,n,k):this.flowData.reversible?e.drawImage(j,0,0):e.drawImage(j,m,l,n,k)
},c}),AC.define("flow/compositor/decorator/Keyframe",["require","flow/keyframe/Render","defer/Deferred"],function(c){function e(f){this._compositor=f,this._flowDataProvider=this.mainCompositor._flowDataProvider
}var d,b=c("flow/keyframe/Render"),a=c("defer/Deferred");return d=e.prototype,d.init=function(){return this._keyframeDiffRender=new b(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern),this._keyframeDiffRender.init()
},d.applyFrame=function(){return this._compositor.applyFrame.apply(this._compositor,arguments)
},d.applyKeyframe=function(f,g){this._keyframeDiffRender.renderKeyframe(this.canvas,f,g)
},d.compositeFrames=function(f,h){if(!this._isKeyframeDiff(h-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var g=new a();return this.applyKeyframe(h-1),g.resolve(f-1),g.promise()},d._isKeyframeDiff=function(f){return f in this._keyframeDiffRender._loader._keyframes
},d.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(d,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0},canvas:{get:function(){return this._compositor.canvas},set:function(f){return this._compositor.canvas=f
},enumerable:!0},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:!0}}),e)}),AC.define("flow/compositor/decorator/Superframe",[],function(){function b(d,c){this._compositor=d,this._superframeInterval=c||4
}var a;return a=b.prototype,a._getClosestSuperframe=function(c){return Math.round(c/this._superframeInterval)*this._superframeInterval
},a.init=function(c){this._screenCanvas=c},a.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
},a.calculateRenderCount=function(c,e){var d=this._getClosestSuperframe(c);return Math.abs(d-e)>this._superframeInterval/2?(c=d+(c>e?-1:1)*this._superframeInterval,this.calculateRenderCount(c,e)+1):Math.abs(d-e)+1
},a.compositeFrames=function(c,e){var f,d;return(0>=e||e>=this.frameCount-2)&&this._compositor.compositeFrames(c,e),c>this.frameCount-2?c=this.frameCount-2:0>=c&&(c=1),d=this._getClosestSuperframe(c),f=this._compositor.calculateRenderCount(c,e)>this.calculateRenderCount(c,e)?this._compositor.compositeFrames(d,d).then(function(){var g=d+(c>e?-1:1)*this._superframeInterval;
this._compositor.compositeFrames(d,g).then(function(){return this.compositeFrames(g,e)
}.bind(this))}.bind(this)):this._compositor.compositeFrames(c,e).then(function(){}.bind(this)),f.then(function(){}.bind(this)),f
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(a,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0},canvas:{get:function(){return this._compositor.canvas},set:function(c){return this._compositor.canvas=c
},enumerable:!0},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:!0}}),b)}),AC.define("flow/compositor/decorator/SuperKeyframe",["require","defer/Deferred"],function(b){function d(e){this._compositor=e,this._frames=this.mainCompositor._flowDataProvider._data.frames,this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}var c,a=b("defer/Deferred");return c=d.prototype,c.init=function(){return this._compositor.init.apply(this._compositor,arguments)
},c.applyFrame=function(){return this._compositor.applyFrame.apply(this._compositor,arguments)
},c.applyKeyframe=function(){this._compositor.applyKeyframe.apply(this._compositor,arguments)
},c.compositeFrames=function(e,h){var i,g,f=new a();return 1>h||h>this.frameCount-2?this._compositor.compositeFrames.apply(this._compositor,arguments):this._isKeyframeDiff(h-1)?(i=1===Math.abs(e-h)?!0:!1,this.applyKeyframe(h-1,i),f.resolve(e-1),f.promise()):Math.abs(h-e)>this._superframeInterval&&(g=this._getShortestRender(e,h),this._isKeyframeDiff(g-1)||0>=g||g>=this.frameCount-2)?this._compositeFromSuperKeyframe(g,h):this._compositor.compositeFrames.apply(this._compositor,[e,h])
},c._getShortestRender=function(e,g){var i=this._compositor.calculateRenderCount,h=this._getClosestSuperKeyframe(g-1),f=i.apply(this._compositor,[h,g])+1,j=i.apply(this._compositor,[e,g]);
return j>=f?h:e},c._compositeFromSuperKeyframe=function(h,g){var e=this.canvas.getContext("2d"),f=0>=h?this.mainCompositor._images[0]:h>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[h-1].image;
return e.drawImage(f,0,0),this._compositor.compositeFrames.call(this._compositor,h,g)
},c._getClosestSuperFrame=function(e){return Math.round(e/this._superframeInterval)*this._superframeInterval
},c._getClosestSuperKeyframe=function(f){var j,k,h,g,e=this._frames.length;if(e+1>f&&f>0){for(g=f-1;
g>=0;){if("keyframe"===this._frames[g].type){j=g+1;break}g-=1}for(g=f+1;e-1>=g;
){if("keyframe"===this._frames[g].type){k=g+1;break}g+=1}}return j=j?j:0,k=k?k:this.frameCount,h=k-f>f-j?j:k
},c._isKeyframeDiff=function(){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(c,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0},canvas:{get:function(){return this._compositor.canvas},set:function(e){return this._compositor.canvas=e
},enumerable:!0},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:!0}}),d)}),AC.define("flow/compositor/decorator/Cache",[],function(){function a(d,c){this._compositor=d,this._keyframeInterval=c||8,this._keyframes=[]
}var b;return b=a.prototype,b._getClosestKeyframe=function(c){var d=c%this._keyframeInterval,e=Math.floor(c/this._keyframeInterval)+(d>this._keyframeInterval/2?1:0);
return e},b._getFrameFromKeyframe=function(c){return c*this._keyframeInterval},b._saveKeyframe=function(e){var c,d=Math.floor(e/this._keyframeInterval);
0!==e%this._keyframeInterval||this._keyframes[d]||(c=document.createElement("canvas"),c.width=this._compositor.canvas.width,c.height=this._compositor.canvas.height,c.getContext("2d").drawImage(this._compositor.canvas,0,0),this._keyframes[d]=c)
},b.init=function(){return this._compositor.init.apply(this._compositor,arguments)
},b.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
},b.calculateRenderCount=function(c,d){return c=this._getFrameFromKeyframe(this._getClosestKeyframe(d)),this._compositor.calculateRenderCount(c,d)+1
},b.compositeFrames=function(c,d){var e=this._getClosestKeyframe(d);return this._keyframes[e]&&this._compositor.calculateRenderCount(c,d)>this.calculateRenderCount(c,d)?(c=this._getFrameFromKeyframe(e),this.applyFrame(this._keyframes[e]),this._compositor.compositeFrames(c,d).then(function(){})):this._compositor.compositeFrames(c,d).then(function(){},null,this._saveKeyframe.bind(this))
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(b,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0},canvas:{get:function(){return this._compositor.canvas},set:function(c){return this._compositor.canvas=c
},enumerable:!0}}),a)}),AC.define("stats/Benchmark",[],function(){function a(b){this.name=b
}return a.prototype.start=function(){},a.prototype.end=function(){},a}),AC.define("flow/compositor/decorator/Benchmark",["require","stats/Benchmark"],function(a){function d(e){this._compositor=e
}var b,c=a("stats/Benchmark");return b=d.prototype,b.init=function(){var e=new c("init");
return e.start(),this._compositor.init.apply(this._compositor,arguments).then(e.end.bind(e))
},b.applyFrame=function(){var e=new c("applyFrame");e.start(),this._compositor.applyFrame.apply(this._compositor,arguments),e.end.bind(e)
},b.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
},b.compositeFrames=function(){var e=new c("renderFrames");return e.start(),this._compositor.compositeFrames.apply(this._compositor,arguments).then(e.end.bind(e))
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(b,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0},canvas:{get:function(){return this._compositor.canvas},set:function(e){return this._compositor.canvas=e
},enumerable:!0}}),d.prototype=b,d)}),AC.define("flow/Flow",["require","defer/Deferred","flow/compositor/decorator/Keyframe","flow/compositor/decorator/Superframe","flow/compositor/decorator/SuperKeyframe","flow/compositor/decorator/Cache","flow/compositor/decorator/Benchmark"],function(a){function b(j,k){this._compositor=j,this.options=k||{}
}var c,f=a("defer/Deferred"),g=a("flow/compositor/decorator/Keyframe"),e=a("flow/compositor/decorator/Superframe"),d=a("flow/compositor/decorator/SuperKeyframe"),i=a("flow/compositor/decorator/Cache"),h=a("flow/compositor/decorator/Benchmark");
return c=b.prototype,c.gotoFrame=function(j){return this._rendering?new f().resolve():this._currentFrame===j?new f().resolve():(this._rendering=!0,this._compositor.compositeFrames(this._currentFrame,j).then(function(){this._rendering=!1,this._currentFrame=j
}.bind(this)))},c.init=function(k){var j;return"CANVAS"===k.nodeName?j=k:(j=document.createElement("canvas"),k.appendChild(j)),this._compositor.init(j).then(function(l){return f.all([this._compositor.createDiffRender(l).then(this._decorateCompositor.bind(this))])
}.bind(this))},c._decorateCompositor=function(){var j=this._compositor,l=this._compositor._diffRender.flowData,k=this._compositor.canvas;
return l.superframeFrequency&&(j=new e(j,l.superframeFrequency)),3===l.version&&(j=new g(j)),3===l.version&&l.superframeFrequency&&(j=new d(j)),this.options.keyframeCache&&(j=new i(j,this.options.keyframeCache)),this.options.benchmark&&(j=new h(j)),j===this._compositor?new f().resolve():(this._compositor=j,this._compositor.init(k))
},"function"!=typeof Object.defineProperties?function(){}:(Object.defineProperties(c,{_currentFrame:{value:0,enumerable:!1,writable:!0},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:!0}}),b)}),AC.define("flow/playerFactory",["require","flow/compositor/Sequence","flow/data/provider/Async","flow/data/provider/Sync","flow/Player","flow/Flow"],function(c){function e(l,n,k,m,j){var i,o,h;
return j=j||{},j={keyframeCache:"undefined"==typeof j.keyframeCache?8:j.keyframeCache,benchmark:"undefined"==typeof j.benchmark?!1:j.benchmark,preload:"undefined"==typeof j.preload?!0:j.preload},n=n||[l.getAttribute("data-start-frame")],l.getAttribute("data-end-frame")&&n.push(l.getAttribute("data-end-frame")),k=k||l.getAttribute("data-image-url-pattern"),h="string"==typeof m?new g(m):new f(m),i=new b(n,k,h),o=new a(l,new d(i,j)),j.preload&&o.load(),o
}var b=c("flow/compositor/Sequence"),g=c("flow/data/provider/Async"),f=c("flow/data/provider/Sync"),a=c("flow/Player"),d=c("flow/Flow");
return e}),AC.define("screenSequence/sequences/Flow",["require","screenSequence/ScreenSequence","flow/playerFactory"],function(b){var a=b("screenSequence/ScreenSequence"),c=b("flow/playerFactory"),d=AC.Class(a,{__defaultOptions:{preload:!1,hidePosterframeOnPlay:!0,endframeTransitionDuration:0.4,requireCanPlayThroughToPlay:!0,posterframe:"posterframe",loop:!1,autoplay:!1,frameRate:24,prefer2x:!1,extension:"jpg"},initialize:function($super,e,g){var f;
e=AC.Element.getElementById(e),g=g||{},f=e.getAttribute("data-"+a.prefix),f.match(/#.*frameRate.*/)&&(g.frameRate=parseInt(f.match(/frameRate([\d]+)/)[1],10)),f.match(/#.*extension:.*/)&&(g.extension=f.match(/extension:([a-zA-Z]{3})/)[1]),$super(e,g)
},__load:function(){return this.sequence().load()},__play:function(){this.canPlayThrough()?(this.sequence().play(),this.__onPlaying()):this.load().then(function(){this.sequence().play(),this.__onPlaying()
}.bind(this))},__onEnded:function($super){return $super().then(function(){this.sequence().currentTime=0
}.bind(this))},__enhance:function($super){AC.Element.addClassName(this.container(),a.prefix+"-flow"),this.__shouldUse2x()&&AC.Element.addClassName(this.container(),a.prefix+"-flow-hires"),$super()
},__createSequence:function(){var l="json",m=AC.Object.clone(this.options()),k=this.__shouldUse2x()===!0?"_2x":"";
m.preload=!1,m.keyframeCache=!1;var e=this.assetPath()+this.id(),j=e+k+"_###."+this.options().extension,f=e.replace(/^https?:\/\/[^\/]+\//i,"../index.html")+k+"_manifest."+l,i=[e+k+"_keyframe."+this.options().extension,e+k+"_endframe."+this.options().extension],g=document.createElement("canvas"),h=c(g,i,j,f,m);
return h.frameRate=this.options().frameRate,h.node=g,h},__shouldUse2x:function(){return this.options().prefer2x===!0&&AC.Retina.sharedInstance().shouldReplace("img-tag")
},__createPosterframe:function(){var e=document.createElement("img"),g=this.__shouldUse2x()===!0?"_2x":"",f="lastframe"===this.options().posterframe?"_endframe":"_keyframe";
return e.src=this.assetPath()+this.id()+g+f+"."+this.options().extension,e.setAttribute("data-hires","false"),AC.Element.addClassName(e,a.prefix+"-flow-keyframe"),e
}});return d.canPlay=function(){return"function"==typeof Object.defineProperties&&AC.Environment.Feature.canvasAvailable()
},d}),AC.define("screenSequence/sequences/Video",["require","defer/Deferred","screenSequence/ScreenSequence"],function(c){var d=c("defer/Deferred"),a=c("screenSequence/ScreenSequence"),b=AC.Class(a,{__defaultOptions:{preload:!1,hidePosterframeOnPlay:!1,endframeTransitionDuration:0.4,requireCanPlayThroughToPlay:!0,posterframe:"posterframe",prefer2x:!1,addPosterFrameToScreen:!0,useiPhoneVideoOnHandheld:!0},initialize:function($super,f,e){$super(f,e),this.__stoppedBeforeCouldLoad=!1,this.options().addPosterFrameToScreen===!0&&this.__addPosterFrameToScreen()
},play:function($super){return this.playing()===!0?!1:(this.__stoppedBeforeCouldLoad&&AC.Environment.Feature.isTablet()&&(this.__removeEventListeners(),AC.Element.remove(this.sequence().node),this.setSequence(this.__createSequence()),AC.Element.insert(this.sequence().node,this.screenElement()),this.__addEventListeners(),this.__stoppedBeforeCouldLoad=!1),$super(),void 0)
},stop:function($super){this.loading()&&(this.setLoading(!1),this.__stoppedBeforeCouldLoad=!0),this.__playOnTimeUpdateListener&&AC.Element.removeEventListener(this.sequence(),"timeupdate",this.__playOnTimeUpdateListener,!1),$super()
},__load:function(){return this.playing()===!0?!1:(this.__loadingPromise=new d(),this.sequence().load(),this.__loadingPromise)
},__playOnTimeUpdate:function(){this.sequence().currentTime>0&&(this.hidePosterframe(),AC.Element.removeEventListener(this.sequence(),"timeupdate",this.__playOnTimeUpdateListener,!1))
},__play:function(){var e=this.sequence();this.__playOnTimeUpdateListener=this.__playOnTimeUpdate.bind(this),AC.Element.addEventListener(e,"timeupdate",this.__playOnTimeUpdateListener,!1),e.play()
},__enhance:function($super){AC.Element.addClassName(this.container(),a.prefix+"-video"),$super()
},__createSequence:function(){var i,j=document.createElement("video"),h=this.assetPath()+this.id(),f=this.container().getAttribute("data-"+a.prefix),g="100%",e="100%";
return j.setAttribute("preload","none"),j.setAttribute("poster",this.posterframeElement().src),this.options().useiPhoneVideoOnHandheld===!0&&AC.Environment.Feature.isHandheld()?h+="_iphone":!this.options().prefer2x||"IE"===AC.Environment.Browser.name||"iOS"===AC.Environment.Browser.os&&window.devicePixelRatio<1.5||(h+="_2x"),h+="."+b.format,f.match(/#.*width:[0-9]+.*/i)&&(g=window.parseInt(f.match(/#.*width:([0-9]+).*/i)[1],10)),f.match(/#.*height:[0-9]+.*/i)&&(e=window.parseInt(f.match(/#.*height:([0-9]+).*/i)[1],10)),i="width:"+g+";height:"+e+";",j.setAttribute("style",i),j.setAttribute("src",h),j.node=j,j
},__createPosterframe:function($super,f){var e;return"string"!=typeof f&&this.options().prefer2x&&"IE"!==AC.Environment.Browser.name&&(f="_2x"),e=$super(f)
},__addPosterFrameToScreen:function(){AC.Element.setStyle(this.screenElement(),"background:url("+this.posterframeElement().getAttribute("src")+") no-repeat 0 0")
},__onCanPlayThrough:function($super){void 0!==this.__loadingPromise&&this.__loadingPromise.resolve(),$super()
},__onPlaying:function($super){this.playing()&&$super()}});return b.canPlay=function(){if("boolean"==typeof b.__canPlay){return b.__canPlay
}var e=document.createElement("video");return b.__canPlay="function"==typeof e.canPlayType?"probably"===e.canPlayType(b.videoCodec):!1,b.__canPlay
},b.videoCodec='video/mp4; codecs="mp4a.40.5"',b.format="mp4",b}),AC.define("screenSequence/loader",[],function(){var a=AC.Class({initialize:function(){this._sequences=[],this._currentSequence=null,this._deferredQueue=new AC.DeferredQueue({asynchronous:!1}),this.synthesize()
},loadSequences:function(){this.deferredQueue().start()},loadSequence:function(c){var b=c.load();
return this.setCurrentSequence(c),b&&"function"==typeof b.then?b.then(this.deferredQueue().didFinish):this.deferredQueue().didFinish(),b
},add:function(d){var b=this.loadSequence.bind(this),c=function(){b(d)};d.__loadAction=c,this.deferredQueue().add(c)
}});return a.sharedInstance()}),AC.define("screenSequence/UXController",["require","screenSequence/ScreenSequence"],function(c){var a=c("screenSequence/ScreenSequence"),b=AC.Class({__defaultOptions:{ambient:!1,clickToPlay:!0,clickToReplay:!1,playOutOfView:!1,timeInView:0.1},initialize:function(e,d){this._options={},this._sequence=e,this._trigger=null,this._showOnScroll=null,this._initialEngage=!1,this._disabled=!1,this.synthesize(),this.setOptions(AC.Object.extend(AC.Object.clone(this.__defaultOptions),d||{})),this.__augmentSequence(),this.__bindShowOnScroll(),this.__addListeners(this.sequence())
},enable:function(){AC.Element.removeClassName(this.sequence().container(),a.prefix+"-disabled"),this.setDisabled(!1)
},disable:function(){AC.Element.addClassName(this.sequence().container(),a.prefix+"-disabled"),this.setDisabled(!0)
},__augmentSequence:function(){var d,e=this.sequence();return(this.options().clickToPlay||this.options().clickToReplay)&&(d=this.__replaceContainer(e.container()),e.setContainer(d),AC.Element.addEventListener(e.container(),"click",function(f){return f.preventDefault(),e.playing()&&this.options().preventPause?!1:(this.sequence().__publish("willPlay"),e.playing()&&!this.disabled()?e.stop():(this.__ensureInView(),e.play()),void 0)
}.bind(this),!1),this.options().ambient&&this.disable()),this.options().clickToPlay&&this.__createSpinner(),e
},__createSpinner:function(){var d=document.createElement("div");d.setAttribute("class",a.prefix+"-spinner"),d.setAttribute("data-hires","false"),AC.Element.insert(d,this.sequence().screenElement())
},__ensureInView:function(){var d=this.showOnScroll().options().threshold;this.showOnScroll().options().threshold=0.9,this.showOnScroll().isEnoughInView()||this.__scrollIntoView(this.sequence().container()),this.showOnScroll().options().threshold=d
},__scrollIntoView:function(d){var e=AC.Element.getBoundingBox(d).top;(0>e||e>0.75*document.viewport.getHeight())&&new Effect.ScrollTo(d,{duration:0.3})
},__scrolledOutOfView:function(){this.showOnScroll().options().threshold=0.9},__setTrigger:function(){var d=this.sequence().container(),e=AC.Element.select("."+a.prefix+"-trigger",d);
return e||d||null},__replaceContainer:function(e){var d=document.createElement("a"),f=e.childNodes;
return d=this.__copyAttributes(e,d),AC.Element.addClassName(d,"block"),AC.Array.toArray(f).forEach(function(g){AC.Element.insert(g,d,"last")
}),e=e.parentNode.replaceChild(d,e),d},__copyAttributes:function(g,d){var f,e=g.attributes;
if(e.length>0){for(f=0;f<e.length;f+=1){d.setAttribute(e[f].name,e[f].value)}}return d
},__bindShowOnScroll:function(){var e=this.sequence(),d=new AC.ShowOnScroll(e.container(),{threshold:0.65,timeInView:this.options().timeInView});
this.setShowOnScroll(d),(this.options().ambient||!this.options().playOutOfView)&&d.setDelegate({visitorEngaged:function(){this.initialEngage()!==!0&&(this.options().ambient&&(e.play(),this.options().playOutOfView&&d.stopObserving()),this.setInitialEngage(!0),this.sequence().__publish("visitorEngaged"))
}.bind(this),scrolledOutOfView:function(){!e.playing()&&!e.loading()||this.options().playOutOfView||(e.stop(),this.enable())
}.bind(this)})},__addListeners:function(d){"function"!=typeof this.__boundNotificationCallback&&(this.__boundNotificationCallback=this.__notificationCallback.bind(this)),AC.NotificationCenter.subscribe(a.prefix+"-play",this.__boundNotificationCallback,d),AC.NotificationCenter.subscribe(a.prefix+"-ended",this.__boundNotificationCallback,d)
},__notificationCallback:function(d){this.options().clickToReplay&&("play"===d.eventName&&this.options().clickToPlay!==!0&&this.disable(),"ended"===d.eventName&&this.enable())
}});return b}),AC.define("screenSequence/analyticsTracker",["require","screenSequence/ScreenSequence"],function(c){var a=c("screenSequence/ScreenSequence"),b=AC.Class({initialize:function(d){this._sequence=d,this._ambient=null,this._containerId=null,this._dataAnalyticsName=null,this._visitorEngaged=!1,this._canPlayThrough=!1,this.synthesize(),this.setContainerId(this.sequence().container().id),this.setDataAnalyticsName(this.sequence().container().getAttribute("data-analytics-name")),this.__ambientEvents=["visitorEngaged","play","didPlay","stop"],this.__screenSequenceEvents=["playing","ended","stopped"],this.__initAmbient(),this.__addListeners()
},__setAmbientName:function(){return this.dataAnalyticsName()||this.containerId()
},__initAmbient:function(){var d,g,f=this.__getEventsFromDataAttribute();f="false"===f?!1:f,f===!1?d=!1:(g=f||this.__ambientEvents,d=new AC.Ambient.AnalyticsController(g));
var e={analytics:d,showOnScrollOptions:{threshold:0.65,timeInView:0.1}};this.setAmbient(new AC.Ambient.Scroll(this.sequence().screenElement(),e)),this.ambient().setName(this.__setAmbientName()),this.ambient().setDelegate({stop:AC.Function.emptyFunction})
},__getEventsFromDataAttribute:function(){var d=this.sequence().container().getAttribute("data-analytics");
return d?"false"===d?d:d.split(","):!1},__addListeners:function(){"function"!=typeof this.__boundNotificationCallback&&(this.__boundNotificationCallback=this.__notificationCallback.bind(this)),this.__screenSequenceEvents.forEach(function(d){AC.NotificationCenter.subscribe(a.prefix+"-"+d,this.__boundNotificationCallback,this.sequence())
}.bind(this)),AC.NotificationCenter.subscribe(this.ambient().options().classNamePrefix+"visitorEngaged",this.__boundNotificationCallback,this.ambient())
},__notificationCallback:function(d){"playing"===d.eventName&&this.__publishToAmbient("play"),"ended"===d.eventName&&this.__publishToAmbient("didPlay"),"stopped"===d.eventName&&this.__publishToAmbient("stop",{cancelled:function(f){var e={prop13:"v@c: "+AC.Tracking.pageName()+" - "+f.ambientContent.name(),prop47:"v@c - "+Math.round(100*this.sequence().sequence().currentTime)/100+"s"};
AC.Tracking.trackClick(e,f.ambientContent,"o",e.prop13)}.bind(this)})},__publishToAmbient:function(d,g){var h,e=this.ambient().options().classNamePrefix+d,f={ambientContent:this.ambient(),notificationName:e};
if(g){for(h in g){f[h]=g[h]}}AC.NotificationCenter.publish(e,{target:this.ambient(),data:f})
}});return b}),AC.define("screenSequence/director",["require","screenSequence/ScreenSequence","screenSequence/sequences/Flow","screenSequence/sequences/Video","screenSequence/loader","screenSequence/UXController","screenSequence/analyticsTracker"],function(f){var b=f("screenSequence/ScreenSequence"),h=f("screenSequence/sequences/Flow"),e=f("screenSequence/sequences/Video"),c=f("screenSequence/loader"),d=f("screenSequence/UXController"),a=f("screenSequence/analyticsTracker"),g=AC.Class({initialize:function(){this._sequences=[],this._currentSequence=null,this.synthesize(),AC.onDOMReady(this.__createSequencesFromDOM.bind(this)),AC.Element.addEventListener(window,"load",function(){window.setTimeout(function(){c.loadSequences()
},20)})},sequenceForContainer:function(j){var i=null;return this.sequences().some(function(k){return k.container()===j?(i=k,!0):void 0
}.bind(this)),i},createSequence:function(m){var n,k={},l=this.__getDeviceOptions(m),j=this.__chooseConstructor(m,l),i=m.getAttribute("data-"+b.prefix);
return null!==j?(j===e&&(k.prefer2x=!!i.match(/#.*2xvideo.*/i)),j===h&&(k.prefer2x=!!i.match(/#.*2xflow.*/i)),i.match(/#.*posterframe:([^,]+).*/i)&&(k.posterframe=i.match(/#.*posterframe:([^,]+).*/i)[1]),n=new j(m,k),this.register(n),n):void 0
},createUXController:function(n){var m,j={},i=this.__getDataAttribute(n.container()),k=!this.__isNotClickToPlay(n.container(),this.__getDeviceOptions(n.container())),l=this.__getDataAttributeAsObject(i).timeinview;
return j.ambient=!!i.match(/#.*ambient.*/i)&&!k,j.clickToPlay=k,j.clickToReplay=!!i.match(/#.*clicktoreplay.*/i),j.playOutOfView=!!i.match(/#.*playoutofview.*/i),j.preventPause=!!i.match(/#.*preventpause.*/i)&&k,"undefined"!=typeof l&&(j.timeInView=l),m=new d(n,j),j.ambient&&c.add(n),m
},register:function(i){this.__addListeners(i),this.__noAnalytics(i)||new a(i),this.sequences().push(i)
},__noAnalytics:function(i){return !!i.container().getAttribute("data-"+b.prefix).match(/#.*analytics:false.*/i)
},__enhanceable:function(){return !e.canPlay()&&!h.canPlay()||"iOS"===AC.Environment.Browser.os&&parseInt(AC.Environment.Browser.osVersion,10)<6||AC.Environment.Feature.isHandheld()&&window.devicePixelRatio<2?!1:!0
},__isNotClickToPlay:function(l,k){var i=this.__getDataAttribute(l),j=!!i.match(/[#|,]clicktoplay.*/i);
return this.__getCurrentDeviceOverrides(k).hasOwnProperty("clicktoplay")?!1:!j},__getDataAttributeAsObject:function(q){var k,o,p,j,r={},n=q.split("#")[1],l=n.split(","),m=l.length;
for(k=0;m>k;k++){o=l[k].split("="),p=o[0],j=o[1]||!0,r[p]=j}return r},__isNotExcluded:function(l){var j=l.getAttribute("data-"+b.prefix),k=!!j.match(/#.*exclude:iphone.*/i),i=!!j.match(/#.*exclude:ipadNonRetina.*/i);
return k&&AC.Environment.Feature.isHandheld()?!1:i&&AC.Environment.Feature.isTablet()&&!AC.Environment.Feature.isRetina()?!1:!0
},__createSequencesFromDOM:function(){var i=this;return this.__enhanceable()?(AC.Element.selectAll("[data-"+b.prefix+"]").forEach(function(j){if(i.__isNotExcluded(j)){var k=i.createSequence(j);
k&&i.createUXController(k)}}),void 0):!1},__chooseConstructor:function(l,k){var j,i=this.__getDataAttribute(l);
if(("OS X"===AC.Environment.Browser.os&&AC.Environment.Browser.osVersion.match("10.7")&&"Safari"===AC.Environment.Browser.name&&AC.Environment.Browser.version<6||"OS X"===AC.Environment.Browser.os&&AC.Environment.Browser.osVersion.match("10.6")&&"Safari"===AC.Environment.Browser.name&&AC.Environment.Browser.version<6)&&h.canPlay()){return h
}if(i.match(/.*format:.*/)){if(j=i.match(/format:([^,]+)/),j=j[1],"flow"===j&&h.canPlay()){return h
}if("video"===j&&e.canPlay()){return e}}return h.canPlay()&&("Firefox"===AC.Environment.Browser.name||this.__isNotClickToPlay(l,k)&&"iOS"===AC.Environment.Browser.os)?h:e.canPlay()?e:null
},__getDeviceOptions:function(q){var l,r,p,o,k,s,m,v=["iphone","ipadRetina","ipadNonRetina","desktop"],u=this.__getSequenceProperties(q),t=v.length,n=u.options.length,w={};
for(p=0;t>p;p++){for(l=v[p],k=new RegExp(".*"+l+".*"),s=new RegExp(l+":([^,]+)"),o=0;
n>o;o++){r=u.options[o],r.match(k)&&(m=r.match(s),m&&(m=m[1],w[l]=w[l]||{},w[l][m]=!0))
}}return w},__getDataAttribute:function(i){return i.getAttribute("data-"+b.prefix)
},__getCurrentDeviceOverrides:function(i){return AC.Environment.Feature.isHandheld()&&"iOS"===AC.Environment.Browser.os&&i.hasOwnProperty("iphone")?i.iphone:{}
},__getSequenceProperties:function(m){var l=this.__getDataAttribute(m),j=l.slice(0,l.length).split(","),i=j[0].split("#"),k=i[0];
return j[0]=i[1],{name:k,options:j}},__addListeners:function(i){"function"!=typeof this.__boundNotificationCallback&&(this.__boundNotificationCallback=this.__notificationCallback.bind(this)),AC.NotificationCenter.subscribe(b.prefix+"-willPlay",this.__boundNotificationCallback,i),AC.NotificationCenter.subscribe(b.prefix+"-play",this.__boundNotificationCallback,i),AC.NotificationCenter.subscribe(b.prefix+"-loading",this.__boundNotificationCallback,i),AC.NotificationCenter.subscribe(b.prefix+"-ended",this.__boundNotificationCallback,i),AC.NotificationCenter.subscribe(b.prefix+"-stopped",this.__boundNotificationCallback,i)
},__notificationCallback:function(i){if("willPlay"===i.eventName){if(this.currentSequence()===i.sequence){return
}this.currentSequence()&&this.currentSequence()!==i.sequence&&this.currentSequence().stop(),this.setCurrentSequence(i.sequence)
}"play"===i.eventName&&(this.currentSequence()&&this.currentSequence()!==i.sequence&&this.currentSequence().stop(),this.setCurrentSequence(i.sequence)),"ended"!==i.eventName&&"stopped"!==i.eventName||this.currentSequence()!==i.sequence||this.setCurrentSequence(null)
}});return g.sharedInstance()});