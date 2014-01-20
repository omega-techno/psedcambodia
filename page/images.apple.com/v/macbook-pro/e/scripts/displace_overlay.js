(function(A,B){B.Detector=B.Detector||{};B.Detector.hasCanvas=(function(){var b=document.createElement("canvas"),a=!!(b.getContext&&b.getContext("2d"));
return function(){return a}}());B.Detector.isIE6=function(a){var b=a||this.getAgent(),c=b.match(/msie\D*([\.\d]*)/i),d;
if(c&&c[1]){d=c[1]}return(+d<=6)};B.Detector.isIE9=function(a){var b=a||this.getAgent(),c=b.match(/msie\D*([\.\d]*)/i),d;
if(c&&c[1]){d=c[1]}return(+d>=9)};var F=(function(){if(B.Detector.isWebKit()){return"-webkit-"
}else{if(B.Detector.isFirefox()){return"-moz-"}else{if(B.Detector.isIE()){return""
}}}}()),u={threshold:0,timeInView:0.5,scrollEndDelay:0.5},x={shouldAnimateContentChange:true,shouldAnimateFadeIn:true,addSectionIdAsClassName:true,manageZ:true,silentTriggers:true,useHTML5Tags:true},z=function(){var c,d,h=[],e=0,i,b=new Date(),a=function(j){var k=document.createElement("canvas");
k.width=j.width;k.height=j.height;k.getContext("2d").drawImage(j,0,0);return k},f=function(j){var k=0;
return{callbackOnZero:j,increment:function(){k+=1},decrement:function(){k-=1;if(!k){if(this.callbackOnZero){this.callbackOnZero()
}}}}},g=function(k,j){if(!v.getController().getInteractionStatus()&&((new Date()-b)>500)){h[k]=a(this);
b=new Date();j.decrement();return false}else{A.setTimeout(g.bind(this,k,j),500)
}};if(B.Detector.hasCanvas()&&!B.Detector.isIE()){d=document.createElement("canvas")
}return{setImageData:function(j,k){var l=function(){var m;if(d&&typeof h[j]!=="object"){m=a(this)
}if(d){d=m||h[j];i=d.getContext("2d").getImageData(0,0,d.width,d.height);i.pixelRatio=i.width/d.width;
i.calculatedWidth=i.width/i.pixelRatio;i.calculatedHeight=i.height/i.pixelRatio
}if(typeof j==="number"&&typeof h[j]!=="object"){e=j;if(d){h[j]=m}else{h[j]=this
}}if(typeof k==="function"){k(i||c)}};if(typeof j==="number"&&typeof h[j]==="object"){e=j;
l.call(h[j])}else{c=new Image();c.onload=l;c.src=(typeof j!=="number")?j:h[j]}return this
},setSources:function(j){h=h.concat(j);return this},getImageData:function(m,j,l,k){if(!i){return h[e]
}if(m||j||l||k){i=d.getContext("2d").getImageData(m||0,j||0,l||d.width,k||d.height)
}return i},doPreload:function(l,j){var k=f(j);A.setTimeout(function(){h.each(function(m,o){var n=new Image();
if(typeof m!=="string"){return}k.increment();n.onload=function(){if(d&&!l){g.call(this,o,k)
}else{h[o]=this;k.decrement()}this.onload=null};n.src=!B.Detector.isIE()?m.split("#")[0]:m.split("#")[0]+"?"+(Math.floor(Math.random()*10000))
})},50);return this}}},D=function(){var a,b;return{attachView:function(c){a=c;return this
},updateWith:function(c){if(a&&b!==c){b=c;a.style.backgroundImage="url("+c+")"}return this
}}},L=function(b,d){var e,a=z(),c=b.getAttribute("data-src");if(B.Detector.iOSVersion()){c=c.replace(/.jpg/g,".png")
}c=c.replace(/https?:\/\/[^\/]+\//g,"../../index.html");a.setSources(c.split(",")).setImageData(0,function(h){var g=b.children[0],f=h.src;
if(B.Detector.hasCanvas()&&!B.Detector.isIE()){h=document.createElement("canvas")
}else{h=document.createElement("div")}h.className+="canvas";if(B.Detector.isIE9()){h.style.filter=""
}b.insertBefore(h,g.nextSibling);if(typeof d==="function"){d(h)}});return a},H=(function(b){var d=b,g,a,c,f=new Image(),e=function(){a.style.opacity="0";
c.style.opacity="0";A.setTimeout(function(){a.parentNode.removeChild(a);c.parentNode.removeChild(c);
a=undefined;c=undefined},B.Detector.isIE()?400:1000)};f.src="../../../images.apple.com/global/elements/zoom_view/zoom-view-image-loading.gif";
return{getLoadStatus:function(){if(!d){return true}else{return false}},registerLoadEvent:function(){d-=1;
if(!d){if(g){e();setTimeout(function(){g()},400)}}return this},showSpinners:function(h){a=document.createElement("div");
a.className="spinner ";a.appendChild(f);c=a.cloneNode(true);c.className+="right";
$$(".loupe-container .column.first")[0].appendChild(a);$$(".loupe-container .column.last")[0].appendChild(c);
if(h){g=h}return this}}}(3)),E=function(){var a=[],b=z();$$(".loupe-container .imageLink").each(function(c,d){a.push(c.href)
});b.setSources(a).doPreload(true,H.registerLoadEvent);E=b},J=(function(){if(B.Detector.isFirefox()){return function(b,c,a){b.style.MozTransform="translateX("+c+"px) translateY("+a+"px)"
}}else{if(B.Detector.isWebKit()){return function(b,c,a){b.style.webkitTransform="translateX("+c+"px) translateY("+a+"px) translateZ(0)"
}}else{if(B.Detector.isIE9()){return function(b,c,a){b.style.msTransform="translateX("+c+"px) translateY("+a+"px)"
}}else{if(B.Detector.isIE()){return function(b,c,a){b.style.marginTop=a+"px";b.style.marginLeft=c+"px"
}}}}}}()),G=(function(){if(B.Detector.hasCanvas()&&!B.Detector.isIE()){return function(b,c,a){J(b.container,c+b.initplacementX,a+b.initplacementY);
b.canvasImageViewCtx.putImageData(b.canvasView.getImageData(Math.round((c+b.offsetX+b.initplacementX)*b.speed),Math.round((a+b.offsetY+b.initplacementY)*b.speed),b.canvasImageView.width,b.canvasImageView.height),0,0)
}}else{return function(b,c,a){c=+c;a=+a;if(b&&b.canvasView){b.updateIEView.updateWith(b.canvasView.getImageData().src);
J(b.container,c+b.initplacementX,a+b.initplacementY);b.canvasImageView.style.backgroundPosition=-Math.round((c+b.offsetX+b.initplacementX)*b.speed)+"px "+-Math.round((a+b.offsetY+b.initplacementY)*b.speed)+"px"
}}}}()),K=(function(){var b,d,c,a=("ontouchstart" in window)?".tooltip.touch":".tooltip.click";
return{create:function(e){b=$$(a)[0];d=$$(a)[1];c=e;b.style.display="block";d.style.display="block";
return this},show:function(e){A.setTimeout(function(){b.style.opacity="1";d.style.opacity="1"
},10);if(e){A.setTimeout(this.hide,e)}return this},hide:function(){if(!b){return
}b.style.opacity="0";d.style.opacity="0";A.setTimeout(function(){if(!b){return}b.parentNode.removeChild(b);
d.parentNode.removeChild(d);b=undefined;d=undefined},B.Detector.isIE()?0:1000);
return this}}}()),w=function(a){if(B.Detector.isWebKit()){a.style.webkitAnimation="touchBobble .4s";
Event.observe(a,"webkitAnimationEnd",function(){a.style.webkitAnimation="";$(a).stopObserving("webkitAnimationEnd")
})}},C=function(b){var a=function(e){return(e===1)?1:-Math.pow(2,-10*e)+1},c=function(){K.create(b).show(2500);
b[0].canvasView.doPreload(false,H.registerLoadEvent);b[1].canvasView.doPreload(false,H.registerLoadEvent)
},d=new Effect.Tween(null,b[0].startAnimationX,0,{duration:0.5,transition:a,afterFinish:c},function(e){clearTimeout(b[0].animate);
b[0].animate=A.setTimeout(function(){G(b[0],e,0)},0);clearTimeout(b[1].animate);
b[1].animate=A.setTimeout(function(){G(b[1],-e,0)},0)})},I=function(d,a){var b=document.createElement("canvas"),c=b.getContext("2d");
b.width=d.width;b.height=d.height;c.drawImage(d,0,0);b.className+=a||"";d.parentNode.appendChild(b);
return b},y=function(r){var f,g,d,c,T=false,n=0,l=0,U=true,a={},q=false,h=false,k=B.Detector.iOSVersion(),b=function(M){if(M.target===f.parentNode.children[0]&&(!T||window.ontouchstart!=="undefined")){w(M.target);
w(f)}else{if(M.target===g.parentNode.children[0]&&(!T||window.ontouchstart!=="undefined")){w(M.target);
w(g)}}},V=function(M){if(M.target===f.parentNode.children[0]||M.target===g.parentNode.children[0]){if(!B.Detector.isFirefox()){M.target.parentNode.addClassName("grabbing")
}M.preventDefault();M.stopPropagation();d=M.targetTouches?M.targetTouches[0].pageY-n:M.pageY-n;
c=M.targetTouches?M.targetTouches[0].pageX-l:M.pageX-l;T=true}},j=function(M){var N,Q,O,P;
f.parentNode.removeClassName("grabbing");g.parentNode.removeClassName("grabbing");
T=false;P=M.srcElement||M.target;O=Element.extend(P).up(".loupe-gallery").down(".swapView").down(0).id.replace("MASKED-","");
if(!a.hasOwnProperty(O)){N={};N.prop3=B.Tracking.pageName()+" - loupe - interacted - "+O;
B.Tracking.trackClick(N,{},"o",N.prop3);a[O]=true}},R=function(M){if(n<M.boundY1){n=M.boundY1
}else{if(n>M.boundY2){n=M.boundY2}}if(l<M.boundX1){l=M.boundX1}else{if(l>M.boundX2){l=M.boundX2
}}return M},s=function(){if(U){K.hide();U=false}A.clearTimeout(r[0].animate);r[0].animate=A.setTimeout(function(){G(R(r[0]),l,n)
},0);A.clearTimeout(r[1].animate);r[1].animate=A.setTimeout(function(){G(R(r[1]),l,n)
},0)},m=(function(){if(k>=4||(!k&&typeof window.ontouchstart!=="undefined")){return function(M){if(T){M.stopPropagation();
l=M.targetTouches[0].pageX-c;n=M.targetTouches[0].pageY-d;s()}}}else{return function(M){if(T){M.stopPropagation();
l=M.pageX-c;n=M.pageY-d;s()}}}}()),e=function(){var M,Z,P,Q,N;if(k>=4||(!k&&typeof window.ontouchstart!=="undefined")){M="touchstart";
Z="touchend";P="touchmove";Q="touchstart"}else{if(!B.Detector.isMobile()){M="mousedown";
Z="mouseup";P="mousemove";Q="mouseover";N="mouseout";document.ondragstart=function(){return false
}}}var O=$$(".loupe-image");for(var Y=O.length-1;Y>=0;Y--){if(typeof window.ontouchstart==="undefined"){Event.observe(O[Y],N,j)
}Event.observe(O[Y],M,V);Event.observe(O[Y],Z,j);Event.observe(O[Y],P,m);Event.observe(O[Y],Q,b)
}},i=new B.ShowOnScroll($$(".loupe-container .leftview")[0],u),p=function(){if(!q){h=true;
return}e();i.stopObserving();i=null;C(r);p=function(){return false}},o=new B.ViewMaster.Viewer($$(".leftview"),"gallery-loupeViewLeft","loupeViewLeft",x),S=new B.ViewMaster.Viewer($$(".rightview"),"gallery-loupeViewRight","loupeViewRight",x).setDelegate({willAnimate:function(aa,P,ac,ad,M){var ab=ac.id.replace(/\D/g,""),N,O,ae=function(){A.setTimeout(function(){if(!i){r[0].canvasView.setImageData(ab-1,function(){G(r[0],l,n);
if(N){N.style.opacity="0";setTimeout(function(){N.parentNode.removeChild(N)},500)
}});r[1].canvasView.setImageData(ab-1,function(){G(r[1],l,n);if(O){O.style.opacity="0";
setTimeout(function(){O.parentNode.removeChild(O)},500)}})}else{r[0].canvasView.setImageData(ab-1);
r[1].canvasView.setImageData(ab-1)}},50)},Q=function(){var W=ac.id.replace("MASKED-","").replace("loupeViewRight","loupeViewLeft");
o.show(o.sectionWithId(W));aa._animation(aa.view,P,ac,ad,M,0.4);if(B.Detector.hasCanvas()&&!B.Detector.isIE()){N=I(f,"canvas-fade");
O=I(g,"canvas-fade")}ae()};if(!H.getLoadStatus()){p();H.showSpinners(Q.bind(this))
}else{Q()}}});i.setDelegate({visitorEngaged:p});return{getInteractionStatus:function(){return T
},configure:function(M){r=M;f=r[0].canvasImageView;g=r[1].canvasImageView;return this
},isReady:function(){q=true;if(h){p()}return this}}},v=(function(){var c=[],a=0,b;
return{configure:function(d,e){a=d;b=e()},addInstance:function(d){c.push(d);if(c.length===a){b.configure(c).isReady()
}},getController:function(){return b}}}()),t=function(b,a){var c={};c.canvasView=L(b,function(j){var e=b.getAttribute("data-initplacement")||"0,0",h=+b.getAttribute("data-scale-ratio"),d=b.getAttribute("data-boundingbox")||"0,0,0,0",i=205,f=205;
e=e.split(",");d=d.split(",");if(B.Detector.hasCanvas()&&!B.Detector.isIE()){c.canvasImageViewCtx=j.getContext("2d")
}else{c.updateIEView=D().attachView(j)}j.style.width=i+"px";j.style.height=f+"px";
j.width=i;j.height=f;c.canvasImageView=j;var g=b.getStyle(F+"transform")||window.getComputedStyle(b,null).msTransform;
c.startAnimationX=parseInt(g.split(",")[4],10);if(isNaN(c.startAnimationX)){c.startAnimationX=b.getStyle(F+"transform").split(",")[0].replace(/[^0-9\-]/g,"")
}c.speed=h;c.initplacementX=+e[0]||0;c.initplacementY=+e[1]||0;c.offsetX=85;c.offsetY=45;
c.boundX1=+d[0]||0;c.boundY1=+d[1]||0;c.boundX2=+d[2]||0;c.boundY2=+d[3]||0;c.container=b;
G(c,c.startAnimationX,0);c.container.style.visibility="visible";if(typeof a==="function"){a(c)
}})};Event.onDOMReady(function(){var b=false,a=function(){$$("section.retina")[0].removeClassName("fallback");
var e=$$(".loupe"),c=e.length,d;if(b){Event.stopObserving(window,"deviceorientation",a);
$$("section.retina")[0].removeClassName("degraded")}E();v.configure(c,y);for(d=0;
d<c;d+=1){t(e[d],v.addInstance)}};if(B.Detector.isMobile()||B.Detector.isiPad()){$$("section.retina")[0].addClassName("degraded");
b=true;Event.observe(window,"deviceorientation",a);return}if(B.Detector.isIE()&&B.Detector.isIE6()){return
}a()})}(window,AC||{}));