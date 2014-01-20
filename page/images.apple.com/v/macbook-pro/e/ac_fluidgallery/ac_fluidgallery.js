var AC=window.AC||{};AC.FluidFigure=Class.create({initialize:function ac_initialize(r,q,p,m,l,n,k,s){this.__defaultOptions={resizeDelay:0.75,debug:false};
this.container=$(r);var o="jpg";this.imageSRC=p.replace("imagepath."+o,"");this.figureSections=m;
this._baseWidth=l;this._imageRatio=l/n;this.bottomPadding=50;if(typeof k!=="object"){k={}
}this.options=Object.extend(Object.clone(this.__defaultOptions),k);this._visible=s||false;
Event.observe(window,"resize",this.__didResizeWindow.bindAsEventListener(this));
this.___setupSlideshow(q);if(this.options.debug){var t=document.createElement("div");
t.addClassName("fluid-gallery-debug");this.container.insert(t)}},__disableArrowKeys:function ac___disableArrowKeys(b){if((b.keyCode===39||b.keyCode===37)&&b.preventDefault&&typeof b.preventDefault==="function"){b.preventDefault()
}},getViewportSize:function ac_getViewportSize(){var b=document.viewport.getDimensions();
return b},getFooterHeight:function ac_getFooterHeight(){if(!this.hasCaptions){return 0
}var d=0;for(var c=0;c<this.captions.length;c++){d=(d<this.captions[c].getHeight())?this.captions[c].getHeight():d
}return d},__getSlideDimensions:function ac___getSlideDimensions(){var f=this.slideshow.currentSection.content;
function e(b){var c=0,a,d;a=parseInt(f.getStyle("margin-"+b),10);c+=(a>0)?a:0;d=parseInt(f.getStyle("border-"+b+"-width"),10);
c+=(d>0)?d:0;return c}var h=e("top");var g=e("left");return{horizontal:g+e("right"),vertical:h+e("bottom"),top:h,left:g}
},boundingDimension:function ac_boundingDimension(c){var d=c.width/(c.height-this.getFooterHeight());
return(this._imageRatio>=d)?"x":"y"},setVisible:function ac_setVisible(){Event.observe(window,"keypress",this.__disableArrowKeys);
this._visible=true;this.slideshow.options.escapeToClose=false;this.slideshow.options.useKeyboardNav=true;
this.slideshow.options.alwaysUseKeyboardNav=true;this.__slideDimensions=this.__getSlideDimensions();
this.currentDimensions=this.getViewportSize();this.__resizeViewer(this.currentDimensions);
this.__resizeAssets()},setHidden:function ac_setHidden(){Event.stopObserving(window,"keypress",this.__disableArrowKeys);
this.slideshow.options.useKeyboardNav=false;this.slideshow.options.alwaysUseKeyboardNav=false;
this._visible=false},replaceRetina:function ac_replaceRetina(h){var f="jpg";var i="png";
var g="gif";var j=h.replace("."+f,"_2x."+f);j=j.replace("."+i,"_2x."+i);return j.replace("."+g,"_2x."+g)
},___setupSlideshow:function ac____setupSlideshow(d){this.slideshow=new AC.ViewMaster.SlideViewer($$("."+d.sectionClass),d.viewID,d.triggerClass,d.options);
if(AC.Detector.isIE()){this.slideshow.setDelegate({didShow:function c(a,f,b){if(a.triggerClassName==="fluid-slideshow-trigger"&&f){setTimeout(function(){document.body.className=document.body.className
},1)}}})}this.sections=$$("#"+d.viewID+" ."+d.sectionClass);this.galleryView=this.slideshow.view._view;
this.captions=$$("#"+d.viewID+" figcaption");this.hasCaptions=(this.captions.length>0)?true:false;
this.images=$$("#"+d.viewID+" img");this.mask=this.galleryView.up()},__didResizeWindow:function ac___didResizeWindow(b){if(!this._visible){return
}if(this.slideshow.options.useTouchEvents===true&&typeof window.ontouchstart!=="undefined"){this.slideshow.__maskWidth=this.slideshow.__mask.getWidth()
}this.currentDimensions=this.getViewportSize();this.__resizeViewer(this.currentDimensions,true);
this.__startResizeTimer()},__resizeViewer:function ac___resizeViewer(B,w){if(w&&(!this.container.hasClassName("hideaway"))){this.container.addClassName("hideaway")
}var e=this.boundingDimension(B);var s=this.ratioX;var t=this.ratioY;var C=this.ratioX;
var D=this.ratioY;var v=this.getFooterHeight()+this.bottomPadding;switch(e){case"x":s=B.width;
t=(B.width/this._imageRatio)+v;C=B.width;D=(B.width/this._imageRatio);break;case"y":s=(B.height-v)*this._imageRatio;
t=B.height;C=(B.height-v)*this._imageRatio;D=B.height-v;break;default:break}var i=(AC.Detector.isIE()&&!AC.Detector.isIE8())?this.sections.length+2:0;
var y={width:this.sections.length*Math.ceil(s+this.__slideDimensions.horizontal)+i+"px",height:this.sections.length*(t+this.__slideDimensions.vertical)+"px"};
var z={width:s+"px",height:t+"px"};var u={width:C+"px",height:D+"px"};var E=-1*this.__getSectionIndex(this.slideshow.currentSection.id)*(s+this.__slideDimensions.horizontal)-this.__slideDimensions.left;
try{this.mask.setStyle(z);for(var A=0;A<this.sections.length;A++){this.sections[A].setStyle(z);
this.images[A].setStyle(u)}}catch(x){return}if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this.galleryView.setVendorPrefixStyle("transition","none");
this.galleryView.setVendorPrefixStyle("transform","translate3d("+E+"px, 0, 0)")
}else{y.left=E+"px"}this.galleryView.setStyle(y);var F={marginTop:"-"+parseInt(this.container.getHeight(),10)/2+"px"};
this.container.setStyle(F)},__getSectionIndex:function ac___getSectionIndex(c){for(var d=this.slideshow.orderedSections.length-1;
d>=0;d--){if(this.slideshow.orderedSections[d]===c){return d}}return 0},__resizeAssets:function ac___resizeAssets(){if(!this._visible){return
}var n=this.getViewportSize();var k=this.boundingDimension(n);var j;this.__resizeViewer(n);
if(this.container.hasClassName("hideaway")){this.container.removeClassName("hideaway")
}for(var l=0;l<this.figureSections.length;l++){var h=0;for(var i=0;(i<this.figureSections[l].images.length)&&(!h);
i++){switch(k){case"x":if(this.figureSections[l].images[i].width>n.width){h=true;
j=this.figureSections[l].images[i].source}break;case"y":var m=n.height-this.getFooterHeight();
if(parseInt(this.figureSections[l].images[i].width/this._imageRatio,10)>m){h=true;
j=this.figureSections[l].images[i].source}break;default:break}}if(!h){j=this.figureSections[l].images[this.figureSections[l].images.length-1].source
}if(this.__useRetina()){j=this.replaceRetina(j)}if(this.options.debug){if(l===this.__getSectionIndex(this.slideshow.currentSection.id)){this.container.down(".fluid-gallery-debug").update(j)
}}this.slideshow.sectionWithId(this.figureSections[l].slideID).content.down(".fluid-image").src=this.imageSRC+j
}},__cancelResizeTimer:function ac___cancelResizeTimer(){if(typeof this.__resizeAssetsFlag!=="undefined"){clearTimeout(this.__resizeAssetsFlag);
delete this.__resizeAssetsFlag}},__useRetina:function ac___useRetina(){if((AC.Retina.sharedInstance().options.debug!==true)&&((AC.Retina.iOSHandheld()&&AC.Retina.sharedInstance().options.disableOniOSHandheld===true)||(AC.Retina.devicePixelRatio()<=1))){return false
}return true},__startResizeTimer:function ac___startResizeTimer(){this.__cancelResizeTimer();
if(typeof this.__boundResizeAssets==="undefined"){this.__boundResizeAssets=this.__resizeAssets.bind(this)
}this.__resizeAssetsFlag=setTimeout(this.__boundResizeAssets,(this.options.resizeDelay*1000))
}});