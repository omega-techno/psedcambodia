AC.ViewMaster.ZoomViewer=Class.create({defaultOptions:{ViewerType:"Viewer",ZoomViewerType:"Viewer",ZoomAnimationDuration:0.4,ZoomViewerPadding:0,ZoomViewerOptions:{},hideNavBarForMobile:true,zoomString:"-zoomed",centerZoomedImage:false,fitToAxis:"x",minimumWidth:200,minimumHeight:50,makeZoomViewAsWideAsAllSections:false,localText:{close:"Close",next:"Next",previous:"Previous"}},initialize:function(k,h,i,g,j){this.delegate={};
this.view=null;this.zoom={};this.options=null;this.isZoomed=false;this.triggerClass=i;
this.options=Object.extend(Object.clone(this.defaultOptions),g);this.zoom.options=this.options.ZoomViewerOptions;
this.zoom.obj=(typeof j==="object"&&j.length>0)?j.slice(0):false;this._isMobile=AC.Detector.isMobile();
this._isiOS=AC.Detector.isiPad()||this._isMobile;this._supportsThreeD=AC.Detector.supportsThreeD();
this._isCSSAvailableTransition=AC.Detector.isCSSAvailable("transition");this._screenSize=this.getScreenSize();
this._viewportSize=this.getViewportSize();if(this._isiOS){document.body.addClassName("isiOS");
this.meta={};this.meta.width=this.getMetaViewportProperty("width");if(this.meta.width=="device-width"){this.meta.width==(this._screenSize[0]<this._screenSize[1])?this._screenSize[0]:this._screenSize[1]
}if(this.meta.width=="device-height"){this.meta.width==(this._screenSize[0]>this._screenSize[1])?this._screenSize[0]:this._screenSize[1]
}this.meta["maximum-scale-default"]=this.getMetaViewportProperty("maximum-scale")||"1.6";
this.meta["minimum-scale-default"]=this.getMetaViewportProperty("minimum-scale")||".25"
}this.options.ZoomViewerPadding=this._parsePadding(this.options.ZoomViewerPadding);
this._boundDidResizeWindow=this._didResizeWindow.bindAsEventListener(this);Event.observe(window,"resize",this._boundDidResizeWindow);
if(this._isiOS){this._boundDidChangeOrientation=this._didChangeOrientation.bindAsEventListener(this);
Event.observe(window,"orientationchange",this._boundDidChangeOrientation)}this._boundZoomTriggerClicked=this._zoomTriggerClicked.bindAsEventListener(this);
Event.observe(document.body,"click",this._boundZoomTriggerClicked);if(typeof this.options.ViewerType==="string"&&this.options.ViewerType in AC.ViewMaster){this.view=new AC.ViewMaster[this.options.ViewerType](k,h,this.triggerClass,this.options);
this.view.setDelegate(this);var l=navigator.userAgent.toLocaleLowerCase();if((/msie 6/.test(l))||(AC.Detector.isWebKit()&&l.indexOf("version/index.html")!==-1&&parseFloat(l[l.indexOf("version/index.html")+8])<4)){document.body.addClassName("noZoomView");
return false}if(this.zoom.obj){this._createZoom()}this._setViewEvents()}else{return false
}this.documentHash=document.location.hash.slice(1).replace("-zoomed","");this.zoom.objects.each(function(a,b){if(a.id===this.documentHash){this.view.currentSection.id=a.id;
this.zoom.view.show(this.zoom.view.sectionWithId(this.view.currentSection.id+this.options.zoomString),true);
this.zoomInCurrentSection()}},this)},setDelegate:function(b){this.delegate=b;if("shouldAnimateContentChange" in this.delegate){this.shouldAnimateContentChange=this.delegate.shouldAnimateContentChange
}if("willAnimate" in this.delegate){this.willAnimate=this.delegate.willAnimate}if("didAppendContent" in this.delegate){this.didAppendContent=this.delegate.didAppendContent
}},getScreenSize:function(){if(this._isiOS){this._orientation=(window.orientation==0||window.orientation==180)?"portrait":"landscape";
return(this._orientation=="landscape")?[window.screen.height,window.screen.width]:[window.screen.width,window.screen.height]
}else{return[window.screen.width,window.screen.height]}},getViewportSize:function(){var c=document.viewport.getDimensions();
if(this._isiOS){if(this._isMobile&&this.options.hideNavBarForMobile==true){var d=(this._orientation=="portrait")?1.3:0.555;
c.height=c.width*d}}return[c.width,c.height]},sectionObjectWidthId:function(f){var d=false;
if(typeof this.zoom.objects=="undefined"){return false}for(var e=0;e<this.zoom.objects.length;
e++){if(this.zoom.objects[e].id===f){return this.zoom.objects[e]}}return d},convertCurrentWidthAndHeightToEms:function(){var b=parseFloat(this.zoom.currentSectionObject.element.getStyle("font-size"));
this.zoom.currentSectionObject.element.setStyle("width: "+this.currentImageDimensions[0]/b+"em;");
this.zoom.currentSectionObject.element.setStyle("height: "+this.currentImageDimensions[1]/b+"em;")
},sort:function(h,e,f){function g(b,c){var d=f?c:b;var a=f?b:c;d=(d[e]==undefined)?-1:isNaN(d[e])?d[e].toLowerCase():d[e];
a=(a[e]==undefined)?-1:isNaN(a[e])?a[e].toLowerCase():a[e];return((d<a)?-1:((d>a)?1:0))
}h.sort(g);return h},getMetaViewportProperty:function(f){if(!this.meta.tag){this.meta.tag=Element.getElementsBySelector(document,'meta[name="viewport"]')[0]
}if(typeof this.meta.tag=="undefined"){delete this.meta.tag}else{var d=this.meta.tag.getAttribute("content");
if(d){d=d.split(",");for(var e=0;e<d.length;e++){d[e]=d[e].split("=");if(d[e][0]==f){return parseFloat(d[e][1])
}}}}return null},setMetaViewportProperty:function(f,d){if(!this.meta.tag){this.meta.tag=Element.getElementsBySelector(document,'meta[name="viewport"]');
this.meta.tag=this.meta.tag[this.meta.tag.length-1]}if(typeof this.meta.tag=="undefined"){delete this.meta.tag
}else{var e=this.meta.tag.getAttribute("content");if(e){this.meta.tag.remove();
e=e.replace(new RegExp(f+"=(.)*,","i"),"");e=e.replace(new RegExp(","+f+"=(.)*(^,|$)","i"),"");
e+=(e=="")?"":",";e+=f+"="+d;this.meta[f]=d;this.meta.tag.setAttribute("content",e);
Element.insert(document.body,this.meta.tag);return true}}return false},zoomInCurrentSection:function(d){var c=this.sectionObjectWidthId(this.view.currentSection.id);
if(c!==false){this.zoomIn(c)}},zoomIn:function(b){if(this.isZoomed===true){return false
}this._willZoomIn(b);this._willAnimateZoomIn();this._didZoomIn()},zoomOut:function(){if(this.isZoomed===false){return false
}this._willZoomOut();this._willAnimateZoomOut();this._didZoomOut()},willShow:function(d,f,e){if("willShow" in this.delegate){return this.delegate.willShow(d,f,e)
}},didShow:function(d,f,e){if("didShow" in this.delegate){return this.delegate.didShow(d,f,e)
}},_willZoomIn:function(b){this.isZoomed=true;this.view._locked=true;this.zoom.view._locked=false;
Element.addClassName(document.documentElement,"ZoomViewActive");if(this._isiOS){document.body.setStyle("height: "+this._viewportSize[1]+"px; overflow: hidden;");
this.setMetaViewportProperty("maximum-scale",1);if(this._isMobile&&this.options.hideNavBarForMobile==true){this.zoom.container.setStyle("height: "+this._viewportSize[1]+"px;");
(function(){window.scrollTo(0,1)}).delay(0.01)}}if(this.zoom.currentSectionObject.id!==this.view.currentSection.id){this.zoom.view.options.shouldAnimateContentChangeDefault=this.zoom.view.options.shouldAnimateContentChange||true;
this.zoom.view.options.shouldAnimateContentChange=false;this.zoom._removeOldContent=true;
this.zoom.view.show(this.zoom.view.sectionWithId(b.id+this.options.zoomString),true);
(function(){this.zoom.view.options.shouldAnimateContentChange=this.zoom.view.options.shouldAnimateContentChangeDefault;
delete this.zoom.view.options.shouldAnimateContentChangeDefault}.bind(this)).delay(this.options.ZoomAnimationDuration)
}this.zoom.currentSectionObject=b;this._setImageDimensions(b);if("willZoomIn" in this.delegate){return this.delegate.willZoomIn(this.view,this.zoom.view)
}},_didZoomIn:function(){if("didZoomIn" in this.delegate){return this.delegate.didZoomIn(this.view,this.zoom.view)
}},_willZoomOut:function(){this.isZoomed=false;this.zoom.view._locked=true;this.view._locked=false;
this._viewportSize=this.getViewportSize();Element.removeClassName(document.documentElement,"ZoomViewActive");
if(this._isiOS){document.body.setStyle("height: auto; overflow: auto;")}if(this.view.currentSection.id!==this.zoom.currentSectionObject.id){this.view.options.shouldAnimateContentChangeDefault=this.view.options.shouldAnimateContentChange||true;
this.view.options.shouldAnimateContentChange=false;this.view.show(this.view.sectionWithId(this.zoom.currentSectionObject.id),true);
(function(){this.view.options.shouldAnimateContentChange=this.view.options.shouldAnimateContentChangeDefault;
delete this.view.options.shouldAnimateContentChangeDefault}.bind(this)).delay(this.options.ZoomAnimationDuration)
}if("willZoomOut" in this.delegate){return this.delegate.willZoomOut(this.view,this.zoom.view)
}},_didZoomOut:function(){if(this._isiOS){this.setMetaViewportProperty("maximum-scale",this.meta["maximum-scale-default"])
}if("didZoomOut" in this.delegate){return this.delegate.didZoomOut(this.view,this.zoom.view)
}},_didChangeOrientation:function(b){this._screenSize=this.getScreenSize();this._viewportSize=this.getViewportSize();
if(this.isZoomed===true){this._didResizeWindow(b);document.body.setStyle("height: "+this._viewportSize[1]+"px; overflow: hidden;");
if(this._isMobile&&this.options.hideNavBarForMobile==true){this.zoom.container.setStyle("height: "+this._viewportSize[1]+"px;");
(function(){window.scrollTo(0,1)}).delay(0.01)}}if("didChangeOrientation" in this.delegate){return this.delegate.didChangeOrientation(this.view,this.zoom.view)
}},_didResizeWindow:function(b){delete this._relativeViewportSize;this._viewportSize=this.getViewportSize();
if(!this.zoom.currentSectionObject){return false}this._setImageDimensions(this.zoom.currentSectionObject);
if(this.options.makeZoomViewAsWideAsAllSections){this._setViewDimensions()}if("didResizeWindow" in this.delegate){return this.delegate.didResizeWindow(this.view,this.zoom.view)
}},_zoomTriggerClicked:function(d){if((this.isZoomed===false)){var c;if(c=d.findElement("a."+this.triggerClass+this.options.zoomString)){this.zoom.currentSectionObject=this.sectionObjectWidthId(c.getAttribute("href").split("#")[1]);
this.zoomInCurrentSection()}else{if(c=d.findElement("a."+this.triggerClass+this.options.zoomString+"-current")){if(this.zoom.options.silentTriggers==true){d.stop()
}this.zoom.view.show(this.zoom.view.sectionWithId(this.view.currentSection.id+this.options.zoomString),true);
this.zoomInCurrentSection()}}}},_zoomWillShow:function(d){this.zoom.currentSectionObject=this.sectionObjectWidthId(d.memo[2].id.replace(this.options.zoomString,""));
this._didResizeWindow();if(!this._isiOS){var c=this.getViewportSize();if(c[0]>this._viewportSize[0]){this._viewportSize=c;
this._setImageDimensions(this.zoom.currentSectionObject);delete c}}if("zoomWillShow" in this.delegate){return this.delegate.zoomWillShow.apply(d.memo)
}},_zoomDidShow:function(b){if(this.zoom._removeOldContent===true){if(b.memo[1].content.parentNode!==null){b.memo[1].content.remove()
}delete this.zoom._removeOldContent}if("zoomDidShow" in this.delegate){return this.delegate.zoomDidShow.apply(b.memo)
}},_willAnimateZoomIn:function(){if("willAnimateZoomIn" in this.delegate){return this.delegate.willAnimateZoomIn(this.view,this.zoom.view,this._didZoomIn.bind(this))
}this._animateZoomIn()},_willAnimateZoomOut:function(){if("willAnimateZoomOut" in this.delegate){return this.delegate.willAnimateZoomOut(this.view,this.zoom.view,this._didZoomOut.bind(this))
}this._animateZoomOut()},_zoomedDelegate:{willShow:function(d,f,e){d.view.view().fire("zoom:willShow",arguments)
},didShow:function(d,f,e){d.view.view().fire("zoom:didShow",arguments)}},_setZoomDelegate:function(){this.zoom.view.setDelegate(this._zoomedDelegate);
this._boundZoomWillShow=this._zoomWillShow.bindAsEventListener(this);this.zoom.view.view.view().observe("zoom:willShow",this._boundZoomWillShow);
this._boundZoomDidShow=this._zoomDidShow.bindAsEventListener(this);this.zoom.view.view.view().observe("zoom:didShow",this._boundZoomDidShow)
},_parsePadding:function(c){if(typeof c=="number"){var d=[c,c,c,c]}else{if(typeof c[0]=="number"){if(c.length<4){if(c.length==1){var d=[parseFloat(c[0]),parseFloat(c[0]),parseFloat(c[0]),parseFloat(c[0])]
}else{if(c.length==2){var d=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[0]),parseFloat(c[1])]
}else{if(c.length==3){var d=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[1])]
}}}}else{var d=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[3])]
}}}return d||[0,0,0,0]},_createClose:function(){this.zoom.close=new Element("a",{"class":"ZoomViewClose",href:"#close"}).update(this.options.localText.close);
var b=function(a){a.stop();this.zoomOut()};this._boundClose=b.bindAsEventListener(this);
this.zoom.close.observe("click",this._boundClose);return this.zoom.close},_createNav:function(){this.zoom.nav={};
this.zoom.nav.container=new Element("ul",{"class":"ZoomViewNav"});this.zoom.nav.previous=new Element("a",{href:"#previous","class":"arrow left "+this.triggerClass+this.options.zoomString}).update("<span>"+this.options.localText.previous+"</span>");
this.zoom.nav.next=new Element("a",{href:"#next","class":"arrow right "+this.triggerClass+this.options.zoomString}).update("<span>"+this.options.localText.next+"</span>");
this.zoom.nav.container.insert(new Element("li").insert(this.zoom.nav.previous));
this.zoom.nav.container.insert(new Element("li").insert(this.zoom.nav.next));return this.zoom.nav.container
},_createDots:function(){this.zoom.dots=new Element("ul",{"class":"ZoomViewDots simple-nav"});
this.zoom.objects.each(this._createDot.bind(this));return this.zoom.dots},_createDot:function(c){var d=new Element("a",{href:"#"+c.id+this.options.zoomString,"class":this.triggerClass+this.options.zoomString});
this.zoom.dots.insert(new Element("li").insert(d))},_createZoom:function(){this.zoom.id=this.view.view.view().id+this.options.zoomString;
this.zoom.container=new Element("div",{id:this.zoom.id+"-container","class":"ZoomViewContainer",style:"display: none;"});
this.zoom.viewElement=new Element("div",{id:this.zoom.id,"class":"ZoomView"});this.zoom.objects=[];
this.zoom.sectionElements=[];this.zoom.obj.each(this._createZoomSection.bind(this));
this.zoom.container.insert(this.zoom.viewElement);this.zoom.container.insert(this._createClose());
this.zoom.container.insert(this._createNav());this.zoom.container.insert(this._createDots());
document.body.insert(this.zoom.container);switch(this.options.fitToAxis){case"x":this.zoom.container.addClassName("fixedToX");
break;case"y":this.zoom.container.addClassName("fixedToY");break;case true:this.zoom.container.addClassName("fixedToBoth");
break;default:break}if(this.options.makeZoomViewAsWideAsAllSections){this._setViewDimensions()
}this.zoom.currentSectionObject=this.sectionObjectWidthId(this.view.currentSection.id);
this.zoom.view=new AC.ViewMaster[this.options.ZoomViewerType](this.zoom.sectionElements,this.zoom.viewElement,this.triggerClass+this.options.zoomString,this.zoom.options);
this._setZoomDelegate();if(this.zoom.view.options.useKeyboardNav===true){var d=function(a){if(a.memo==="escape"){this.zoomOut()
}};var c=d.bindAsEventListener(this);this.zoom.viewElement.observe("AC.ViewMaster.Viewer:usedKeyboardNav",c)
}},_createZoomSection:function(d){if(this.view.sectionWithId(d.id)){var c=Object.clone(d);
c.images=this.sort(c.images,"width",true);c.wrapper=new Element("div",{"class":"ZoomViewSection "+c.id,id:c.id+this.options.zoomString});
c.element=new Element("div",{"class":"ZoomViewElement"});c.image=new Element("img",{"class":"ZoomViewImage"});
if(c.caption!==null&&typeof c.caption==="string"){c.caption=c.caption.replace(/<\/?p>/gi,"");
c.captionElement=new Element("p",{"class":"caption"}).update(c.caption)}c.element.insert(c.image);
if(typeof c.caption!=="undefined"){c.element.insert(c.caption)}c.wrapper.insert(c.element);
this.zoom.objects.push(c);this.zoom.sectionElements.push(c.wrapper);this.zoom.viewElement.insert(c.wrapper)
}},_getBestSizeImage:function(i,j){if(typeof j=="undefined"){j=this._viewportSize
}var h=i.images[i.images.length-1];var f=false;for(var g=0;g<i.images.length&&f==false;
g++){switch(this.options.fitToAxis){case"x":if(i.images[g].width<j[0]){if(g!==0){h=i.images[g-1]
}else{h=i.images[g]}f=true}break;case"y":if(i.images[g].height<j[1]){if(g!==0){h=i.images[g-1]
}else{h=i.images[g]}f=true}break;default:if(i.images[g].width<j[0]&&i.images[g].height<j[1]){if(g!==0){h=i.images[g-1]
}else{h=i.images[g]}f=true}break}}return h},_setViewEvents:function(){this._boundZoomIn=this.zoomInCurrentSection.bindAsEventListener(this);
this.view.view.view().observe("click",this._boundZoomIn)},_definePadding:function(b){if(typeof b.padding!=="undefined"){return this._parsePadding(b.padding)
}else{return this.options.ZoomViewerPadding}},_adjustForPadding:function(e,f){if(typeof f=="undefined"){var f=this._definePadding(this.zoom.currentSectionObject)
}var d=Object.clone(e);d[0]=d[0]-(f[1]+f[3]);d[1]=d[1]-(f[0]+f[2]);return d},_setImageDimensions:function(n,o,u){var p=this._definePadding(n);
if(typeof u=="undefined"){var u=this._adjustForPadding(this._viewportSize,p)}var q=n.currentImage;
n.currentImage=this._getBestSizeImage(n,u);if(q!==n.currentImage){var r=true}delete q;
switch(this.options.fitToAxis){case"x":var v=u[0];var m=Math.floor((u[0]*n.currentImage.height)/n.currentImage.width);
break;case"y":var v=Math.floor((u[1]*n.currentImage.width)/n.currentImage.height);
var m=u[1];break;case true:if(n.currentImage.width/u[0]>n.currentImage.height/u[1]){var v=u[0];
var m=Math.floor((u[0]*n.currentImage.height)/n.currentImage.width)}else{var v=Math.floor((u[1]*n.currentImage.width)/n.currentImage.height);
var m=u[1]}break;default:break}if(v>n.currentImage.width){u[0]=n.currentImage.width;
delete n.currentImage;return this._setImageDimensions(n,o,u)}if(m>n.currentImage.height){u[1]=n.currentImage.height;
delete n.currentImage;return this._setImageDimensions(n,o,u)}if(m<this.options.minimumHeight||v<this.options.minimumWidth){this.currentImageDimensions=[v,m];
return false}else{}if(r==true){this._loadImage(n)}if(typeof v=="number"&&typeof m=="number"){n.wrapper.setStyle("width: "+this._viewportSize[0]+"px");
n.wrapper.setStyle("height: "+this._viewportSize[1]+"px");n.element.setStyle("width: "+v+"px");
n.element.setStyle("height: "+m+"px");var x=(typeof n.center=="undefined")?this.options.centerZoomedImage:n.center;
var s=this._adjustForPadding(this._viewportSize,p);switch(x){case"horizontally":var t=(s[0]-v)/2+p[3];
var w=p[0];break;case"vertically":var t=p[3];var w=(s[1]-m)/2+p[0];break;case true:var t=(s[0]-v)/2+p[3];
var w=(s[1]-m)/2+p[0];break;default:var t=p[3];var w=p[0];break}delete s;if(t<p[3]){t=p[3]
}if(w<p[0]){w=p[0]}n.element.setStyle("padding-left: "+t+"px");n.element.setStyle("padding-top: "+w+"px");
this.currentImageDimensions=[v,m]}else{this.currentImageDimensions=[n.currentImage.width,n.currentImage.height]
}},_loadImage:function(f){f.currentImage.isLoading=true;var d=function(a){f.currentImage.isLoaded=true;
f.currentImage.isLoading=false;f.image.setAttribute("src",f.currentImage.src);f.wrapper.removeClassName("loading");
delete e};if(f.image.getAttribute("src")==null){f.wrapper.addClassName("loading")
}var e=new Image();e.onload=d;e.src=f.currentImage.src},_setViewDimensions:function(){this.zoom.viewElement.setStyle("width: "+this._viewportSize[0]*this.zoom.objects.length+"px")
},_animateZoomIn:function(){var d=this.view.currentSection.content.getDimensions();
var c=d.width/this.currentImageDimensions[0];if(typeof this.options.ZoomAnimationDuration==="number"&&this.options.ZoomAnimationDuration>0){if(this._isCSSAvailableTransition){this.zoom.container.setStyle("opacity: 0; display: block;");
this.zoom.container.setVendorPrefixStyle("transition",this.options.ZoomAnimationDuration+"s opacity ease-in");
if(this._supportsThreeD){this.zoom.viewElement.setVendorPrefixStyle("transform","scale3d("+c+","+c+",1)");
this.zoom.viewElement.setVendorPrefixStyle("transition",this.options.ZoomAnimationDuration+"s -vendor-transform ease-out");
(function(){this.zoom.container.setStyle("opacity: 1");this.zoom.viewElement.setVendorPrefixStyle("transform","scale3d(1,1,1)")
}.bind(this)).delay(0)}else{this.zoom.viewElement.setVendorPrefixStyle("transform","scale("+c+")");
this.zoom.viewElement.setVendorPrefixStyle("transition",this.options.ZoomAnimationDuration+"s -vendor-transform ease-out");
(function(){this.zoom.container.setStyle("opacity: 1");this.zoom.viewElement.setVendorPrefixStyle("transform","scale(1,1)")
}.bind(this)).delay(0)}}else{this.convertCurrentWidthAndHeightToEms(this.zoom.currentSectionObject.element);
this.zoom.container.setStyle("display: block;");new Effect.Opacity(this.zoom.container,{to:1,duration:this.options.ZoomAnimationDuration,afterFinish:function(a){}});
new Effect.Scale(this.zoom.viewElement,100,{scaleFromCenter:true,scaleFrom:c*100,duration:this.options.ZoomAnimationDuration})
}(function(){Element.addClassName(document.documentElement,"ZoomViewDidShow");this.zoom.container.style.display="block"
}.bind(this)).delay(this.options.ZoomAnimationDuration)}else{this.zoom.container.show();
Element.addClassName(document.documentElement,"ZoomViewDidShow")}},_animateZoomOut:function(){var g=this.view.currentSection.content.getDimensions();
var i=g.width/this.currentImageDimensions[0];Element.removeClassName(document.documentElement,"ZoomViewDidShow");
if(typeof this.options.ZoomAnimationDuration==="number"&&this.options.ZoomAnimationDuration>0){if(this._isCSSAvailableTransition){var h=function(a){this.zoom.container.setStyle("display: none;");
this.zoom.container.setVendorPrefixStyle("transition","none");this.zoom.viewElement.setVendorPrefixStyle("transition","none");
a.target.removeVendorEventListener("transitionEnd",f);h=function(){}};var f=h.bindAsEventListener(this);
h.bind(this).delay(this.options.ZoomAnimationDuration+0.01,{target:this.zoom.viewElement});
if(i!==1){this.zoom.viewElement.addVendorEventListener("transitionEnd",f)}else{this.zoom.container.addVendorEventListener("transitionEnd",f)
}this.zoom.container.setStyle("opacity: 0;");if(this._supportsThreeD){this.zoom.viewElement.setVendorPrefixStyle("transform","scale3d("+i+","+i+",1)")
}else{this.zoom.viewElement.setVendorPrefixStyle("transform","scale("+i+")")}}else{this.convertCurrentWidthAndHeightToEms(this.zoom.currentSectionObject.element);
var j=function(){this.zoom.container.hide()};new Effect.Opacity(this.zoom.container,{to:0,duration:this.options.ZoomAnimationDuration});
new Effect.Scale(this.zoom.viewElement,i*100,{scaleFromCenter:true,scaleFrom:100,duration:this.options.ZoomAnimationDuration,afterFinish:j.bind(this)})
}}else{this.zoom.container.hide()}}});