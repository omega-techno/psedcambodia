(function(y,z){z.Detector=z.Detector||{};z.Detector.hasCanvas=(function(){var b=document.createElement("canvas"),a=!!(b.getContext&&b.getContext("2d"));
return function(){return a}}());z.Detector.isIE6=function(a){var b=a||this.getAgent(),c=b.match(/msie\D*([\.\d]*)/i),d;
if(c&&c[1]){d=c[1]}return(+d<=6)};z.Detector.isIE9=function(a){var b=a||this.getAgent(),c=b.match(/msie\D*([\.\d]*)/i),d;
if(c&&c[1]){d=c[1]}return(+d>=9)};var C=(function(){if(z.Detector.isWebKit()){return"-webkit-"
}else{if(z.Detector.isFirefox()){return"-moz-"}else{if(z.Detector.isIE()){return""
}}}}()),u={threshold:0,timeInView:0.5,scrollEndDelay:0.5},w={shouldAnimateContentChange:true,shouldAnimateFadeIn:true,addSectionIdAsClassName:true,manageZ:true,silentTriggers:true,useHTML5Tags:true},x=function(){var c,d,h=[],e=0,i,b=new Date(),a=function(j){var k=document.createElement("canvas");
k.width=j.width;k.height=j.height;k.getContext("2d").drawImage(j,0,0);return k},f=function(j){var k=0;
return{callbackOnZero:j,increment:function(){k+=1},decrement:function(){k-=1;if(!k){if(this.callbackOnZero){this.callbackOnZero()
}}}}},g=function(k,j){if(!t.getController().getInteractionStatus()&&((new Date()-b)>500)){h[k]=a(this);
b=new Date();j.decrement();return false}else{y.setTimeout(g.bind(this,k,j),500)
}};if(z.Detector.hasCanvas()&&!z.Detector.isIE()){d=document.createElement("canvas")
}return{setImageData:function(j,k){var l=function(){var m;if(d&&typeof h[j]!=="object"){m=a(this)
}if(d){d=m||h[j];i=d.getContext("2d").getImageData(0,0,d.width,d.height);i.pixelRatio=i.width/d.width;
i.calculatedWidth=i.width/i.pixelRatio;i.calculatedHeight=i.height/i.pixelRatio
}if(typeof j==="number"&&typeof h[j]!=="object"){e=j;if(d){h[j]=m}else{h[j]=this
}}if(typeof k==="function"){k(i||c)}};if(typeof j==="number"&&typeof h[j]==="object"){e=j;
l.call(h[j])}else{c=new Image();c.onload=l;c.src=(typeof j!=="number")?j:h[j]}return this
},setSources:function(j){h=h.concat(j);return this},getImageData:function(m,j,l,k){if(!i){return h[e]
}if(m||j||l||k){i=d.getContext("2d").getImageData(m||0,j||0,l||d.width,k||d.height)
}return i},doPreload:function(l,j){var k=f(j);y.setTimeout(function(){h.each(function(m,o){var n=new Image();
if(typeof m!=="string"){return}k.increment();n.onload=function(){if(d&&!l){g.call(this,o,k)
}else{h[o]=this;k.decrement()}this.onload=null};n.src=!z.Detector.isIE()?m.split("#")[0]:m.split("#")[0]+"?"+(Math.floor(Math.random()*10000))
})},50);return this}}},B=function(){var a,b;return{attachView:function(c){a=c;return this
},updateWith:function(c){if(a&&b!==c){b=c;a.style.backgroundImage="url("+c+")"}return this
}}},J=function(b,d){var e,a=x(),c=b.getAttribute("data-src");c=c.replace(/https?:\/\/[^\/]+\//g,"../index.html");
a.setSources(c.split(",")).setImageData(0,function(f){var h=b.children[0],g=f.src;
if(z.Detector.hasCanvas()&&!z.Detector.isIE()){f=document.createElement("canvas")
}else{f=document.createElement("div")}f.className+="canvas";if(z.Detector.isIE9()){f.style.filter=""
}b.insertBefore(f,h.nextSibling);if(typeof d==="function"){d(f)}});return a},F=(function(d){var e=d,c,a,b=new Image(),f=function(){a.style.opacity="0";
y.setTimeout(function(){a.parentNode.removeChild(a);a=undefined},z.Detector.isIE()?400:1000)
};b.src="../../images.apple.com/global/elements/zoom_view/zoom-view-image-loading.gif";return{getLoadStatus:function(){if(!e){return true
}else{return false}},registerLoadEvent:function(){e-=1;if(!e){if(c){f();setTimeout(function(){c()
},400)}}return this},showSpinners:function(g){a=document.createElement("div");a.className="spinner ";
a.appendChild(b);$$(".loupe-container .loupe-figure")[0].appendChild(a);if(g){c=g
}return this}}}(2)),H=(function(){if(z.Detector.isFirefox()){return function(b,c,a){b.style.MozTransform="translateX("+c+"px) translateY("+a+"px)"
}}else{if(z.Detector.isWebKit()){return function(b,c,a){b.style.webkitTransform="translateX("+c+"px) translateY("+a+"px) translateZ(0)"
}}else{if(z.Detector.isIE9()){return function(b,c,a){b.style.msTransform="translateX("+c+"px) translateY("+a+"px)"
}}else{if(z.Detector.isIE()){return function(b,c,a){b.style.marginTop=a+"px";b.style.marginLeft=c+"px"
}}}}}}()),E=(function(){if(z.Detector.hasCanvas()&&!z.Detector.isIE()){return function(b,c,a){H(b.container,c+b.initplacementX,a+b.initplacementY);
b.canvasImageViewCtx.putImageData(b.canvasView.getImageData(Math.round((c+b.offsetX+b.initplacementX)*b.speed),Math.round((a+b.offsetY+b.initplacementY)*b.speed),b.canvasImageView.width,b.canvasImageView.height),0,0)
}}else{return function(b,c,a){c=+c;a=+a;if(b&&b.canvasView){b.updateIEView.updateWith(b.canvasView.getImageData().src);
H(b.container,c+b.initplacementX,a+b.initplacementY);b.canvasImageView.style.backgroundPosition=-Math.round((c+b.offsetX+b.initplacementX)*b.speed)+"px "+-Math.round((a+b.offsetY+b.initplacementY)*b.speed)+"px"
}}}}()),I=(function(){var b,c,a=("ontouchstart" in window)?".tooltip.touch":".tooltip.click";
return{create:function(d){b=$$(a)[0];c=d;b.style.display="block";return this},show:function(d){y.setTimeout(function(){b.style.opacity="1"
},10);if(d){y.setTimeout(this.hide,d)}return this},hide:function(){if(!b){return
}b.style.opacity="0";y.setTimeout(function(){if(!b){return}b.parentNode.removeChild(b);
b=undefined},z.Detector.isIE()?0:1000);return this}}}()),v=function(a){if(z.Detector.isWebKit()){a.style.webkitAnimation="touchBobble .4s";
Event.observe(a,"webkitAnimationEnd",function(){a.style.webkitAnimation="";$(a).stopObserving("webkitAnimationEnd")
})}},A=function(b){var a=function(e){return(e===1)?1:-Math.pow(2,-10*e)+1};var c=function(){I.create(b).show(2500);
b[0].canvasView.doPreload(false,F.registerLoadEvent);Event.fire(b[0].container,"loupe:animateInEnd",{})
};var d=new Effect.Tween(null,b[0].startAnimationX,0,{duration:0.5,transition:a,afterFinish:c},function(e){clearTimeout(b[0].animate);
b[0].animate=y.setTimeout(function(){E(b[0],e,0)},0)})},G=function(d,a){var b=document.createElement("canvas"),c=b.getContext("2d");
b.width=d.width;b.height=d.height;c.drawImage(d,0,0);b.className+=a||"";d.parentNode.appendChild(b);
return b},D=function(p){var g,c,b,O=false,n=0,l=0,P=true,j=true,r=false,f=false,k=z.Detector.iOSVersion(),a=function(K){if(K.target===g.parentNode.children[0]&&(!O||window.ontouchstart!=="undefined")){v(K.target);
v(g)}},d=function(K){if(K.target===g.parentNode.children[0]){if(!z.Detector.isFirefox()){K.target.parentNode.addClassName("grabbing")
}K.preventDefault();K.stopPropagation();c=K.targetTouches?K.targetTouches[0].pageY-n:K.pageY-n;
b=K.targetTouches?K.targetTouches[0].pageX-l:K.pageX-l;O=true}},h=function(K){var L,M;
g.parentNode.removeClassName("grabbing");O=false;if(j){L={};L.prop3=z.Tracking.pageName()+" - loupe - interacted";
z.Tracking.trackClick(L,{},"o",L.prop3);j=false}},q=function(K){if(n<K.boundY1){n=K.boundY1
}else{if(n>K.boundY2){n=K.boundY2}}if(l<K.boundX1){l=K.boundX1}else{if(l>K.boundX2){l=K.boundX2
}}return K},N=function(){if(P){I.hide();P=false}y.clearTimeout(p[0].animate);p[0].animate=y.setTimeout(function(){E(q(p[0]),l,n)
},0)},m=(function(){if(k>=4||(!k&&typeof window.ontouchstart!=="undefined")){return function(K){if(O){K.stopPropagation();
l=K.targetTouches[0].pageX-b;n=K.targetTouches[0].pageY-c;N()}}}else{return function(K){if(O){K.stopPropagation();
l=K.pageX-b;n=K.pageY-c;N()}}}}()),e=function(){var L,K,V,W,M;if(k>=4||(!k&&typeof window.ontouchstart!=="undefined")){L="touchstart";
K="touchend";V="touchmove";W="touchstart"}else{if(!z.Detector.isMobile()){L="mousedown";
K="mouseup";M="mouseout";V="mousemove";W="mouseover";document.ondragstart=function(){return false
}}}var U=$$(".loupe-image");for(var X=U.length-1;X>=0;X--){if(typeof window.ontouchstart==="undefined"){Event.observe(U[X],M,h)
}Event.observe(U[X],L,d);Event.observe(U[X],K,h);Event.observe(U[X],V,m);Event.observe(U[X],W,a)
}},i=new z.ShowOnScroll($$(".loupe-container .gallery-content")[0],u),o=function(){if(!r){f=true;
return}e();i.stopObserving();i=null;A(p);o=function(){return false}};i.setDelegate({visitorEngaged:o});
return{getInteractionStatus:function(){return O},configure:function(K){p=K;g=p[0].canvasImageView;
return this},isReady:function(){r=true;if(f){o()}return this}}},t=(function(){var c=[],a=0,b;
return{configure:function(d,e){a=d;b=e()},addInstance:function(d){c.push(d);if(c.length===a){b.configure(c).isReady()
}},getController:function(){return b}}}()),s=function(b,a){var c={};c.displacementMap=x().setImageData(b.getAttribute("data-displacementmap").replace(/https?:\/\/[^\/]+\//g,"../index.html"),function(d){c.canvasView=J(b,function(k){var f=b.getAttribute("data-initplacement")||"0,0",i=+b.getAttribute("data-scale-ratio"),e=b.getAttribute("data-boundingbox")||"0,0,0,0",j=d.calculatedWidth||d.width,g=d.calculatedHeight||d.height;
f=f.split(",");e=e.split(",");if(z.Detector.hasCanvas()&&!z.Detector.isIE()){c.canvasImageViewCtx=k.getContext("2d")
}else{c.updateIEView=B().attachView(k)}k.style.width=j+"px";k.style.height=g+"px";
k.width=j;k.height=g;c.canvasImageView=k;var h=b.getStyle(C+"transform")||window.getComputedStyle(b,null).msTransform;
c.startAnimationX=parseInt(h.split(",")[4],10);if(isNaN(c.startAnimationX)){c.startAnimationX=h.split(",")[0].replace(/[^0-9\-]/g,"")
}c.speed=i;c.initplacementX=+f[0]||0;c.initplacementY=+f[1]||0;c.offsetX=80;c.offsetY=120;
c.boundX1=+e[0]||0;c.boundY1=+e[1]||0;c.boundX2=+e[2]||0;c.boundY2=+e[3]||0;c.container=b;
E(c,c.startAnimationX,0);c.container.style.visibility="visible";if(typeof a==="function"){a(c)
}})})};Event.onDOMReady(function(){var b=false,a=function(){var e=$$(".loupe"),c=e.length,d;
if(b){Event.stopObserving(window,"deviceorientation",a);$$(".loupe-container")[0].removeClassName("degraded")
}t.configure(c,D);for(d=0;d<c;d+=1){s(e[d],t.addInstance);$$(".loupe-container")[0].addClassName("active")
}};if(z.Detector.isMobile()||z.Detector.isiPad()){$$(".loupe-container")[0].addClassName("degraded");
b=true;Event.observe(window,"deviceorientation",a);return}if(z.Detector.isIE()&&z.Detector.isIE6()){return
}a()})}(window,AC||{}));