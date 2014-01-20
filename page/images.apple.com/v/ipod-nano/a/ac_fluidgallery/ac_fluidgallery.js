var AC=window.AC||{};AC.FluidFigure=Class.create({initialize:function ac_initialize(c,d,e,h,i,g,j,b){this.__defaultOptions={resizeDelay:0.75,debug:false};this.container=$(c);var f="jpg";this.imageSRC=e.replace("imagepath."+f,"");this.figureSections=h;this.galleryImages=this.container.select(".fluid-image");this._baseWidth=i;this._imageRatio=i/g;this.bottomPadding=50;if(typeof j!=="object"){j={}}this.options=Object.extend(Object.clone(this.__defaultOptions),j);this._visible=b||false;Event.observe(window,"resize",this.__didResizeWindow.bindAsEventListener(this));this.___setupSlideshow(d);if(this.options.debug){var a=document.createElement("div");a.addClassName("fluid-gallery-debug");this.container.insert(a)}},__disableArrowKeys:function ac___disableArrowKeys(a){if((a.keyCode===39||a.keyCode===37)&&a.preventDefault&&typeof a.preventDefault==="function"){a.preventDefault()}},getViewportSize:function ac_getViewportSize(){var a=document.viewport.getDimensions();return a},getFooterHeight:function ac_getFooterHeight(){if(!this.hasCaptions){return 0}var a=0;for(var b=0;b<this.captions.length;b++){a=(a<this.captions[b].getHeight())?this.captions[b].getHeight():a}return a},__getSlideDimensions:function ac___getSlideDimensions(){var a=this.slideshow.currentSection.content;function b(g){var f=0,h,e;h=parseInt(a.getStyle("margin-"+g),10);f+=(h>0)?h:0;e=parseInt(a.getStyle("border-"+g+"-width"),10);f+=(e>0)?e:0;return f}var c=b("top");var d=b("left");return{horizontal:d+b("right"),vertical:c+b("bottom"),top:c,left:d}},boundingDimension:function ac_boundingDimension(b){var a=b.width/(b.height-this.getFooterHeight());return(this._imageRatio>=a)?"x":"y"},setVisible:function ac_setVisible(){Event.observe(window,"keypress",this.__disableArrowKeys);this._visible=true;this.slideshow.options.escapeToClose=false;this.slideshow.options.useKeyboardNav=true;this.slideshow.options.alwaysUseKeyboardNav=true;this.__slideDimensions=this.__getSlideDimensions();this.currentDimensions=this.getViewportSize();this.__resizeViewer(this.currentDimensions);this.__resizeAssets()},setHidden:function ac_setHidden(){Event.stopObserving(window,"keypress",this.__disableArrowKeys);this.slideshow.options.useKeyboardNav=false;this.slideshow.options.alwaysUseKeyboardNav=false;this._visible=false},replaceRetina:function ac_replaceRetina(e){if(e.indexOf("_2x")===-1){var b="jpg";var d="png";var a="gif";var c=e.replace("."+b,"_2x."+b);c=c.replace("."+d,"_2x."+d);return c.replace("."+a,"_2x."+a)}return e},___setupSlideshow:function ac____setupSlideshow(a){this.slideshow=new AC.ViewMaster.SlideViewer($$("."+a.sectionClass),a.viewID,a.triggerClass,a.options);if(AC.Detector.isIE()){this.slideshow.setDelegate({didShow:function b(e,c,d){if(e.triggerClassName==="fluid-slideshow-trigger"&&c){setTimeout(function(){document.body.className=document.body.className},1)}}})}this.sections=$$("#"+a.viewID+" ."+a.sectionClass);this.galleryView=this.slideshow.view._view;this.captions=$$("#"+a.viewID+" figcaption");this.hasCaptions=(this.captions.length>0)?true:false;this.images=$$("#"+a.viewID+" img");this.mask=this.galleryView.up()},__didResizeWindow:function ac___didResizeWindow(a){if(!this._visible){return}if(this.slideshow.options.useTouchEvents===true&&typeof window.ontouchstart!=="undefined"){this.slideshow.__maskWidth=this.slideshow.__mask.getWidth()}this.currentDimensions=this.getViewportSize();this.__resizeViewer(this.currentDimensions,true);this.__startResizeTimer()},__resizeViewer:function ac___resizeViewer(g,k){if(k&&(!this.container.hasClassName("hideaway"))){this.container.addClassName("hideaway")}var r=this.boundingDimension(g);var p=this.ratioX;var o=this.ratioY;var f=this.ratioX;var d=this.ratioY;var m=this.getFooterHeight()+this.bottomPadding;switch(r){case"x":p=g.width;o=(g.width/this._imageRatio)+m;f=g.width;d=(g.width/this._imageRatio);break;case"y":p=(g.height-m)*this._imageRatio;o=g.height;f=(g.height-m)*this._imageRatio;d=g.height-m;break;default:break}var q=(AC.Detector.isIE()&&!AC.Detector.isIE8())?this.sections.length+2:0;var i={width:this.sections.length*Math.ceil(p+this.__slideDimensions.horizontal)+q+"px",height:this.sections.length*(o+this.__slideDimensions.vertical)+"px"};var h={width:p+"px",height:o+"px"};var n={width:f+"px",height:d+"px"};var c=-1*this.__getSectionIndex(this.slideshow.currentSection.id)*(p+this.__slideDimensions.horizontal)-this.__slideDimensions.left;try{this.mask.setStyle(h);for(var l=0;l<this.sections.length;l++){this.sections[l].setStyle(h)}for(var b=0;b<this.galleryImages.length;b++){this.galleryImages[b].setStyle(n)}}catch(j){return}if(AC.Detector.isCSSAvailable("transition")&&AC.Detector.isCSSAvailable("transform")){this.galleryView.setVendorPrefixStyle("transition","none");this.galleryView.setVendorPrefixStyle("transform","translate3d("+c+"px, 0, 0)")}else{i.left=c+"px"}this.galleryView.setStyle(i);var a={marginTop:"-"+parseInt(this.container.getHeight(),10)/2+"px"};this.container.setStyle(a)},__getSectionIndex:function ac___getSectionIndex(b){for(var a=this.slideshow.orderedSections.length-1;a>=0;a--){if(this.slideshow.orderedSections[a]===b){return a}}return 0},__resizeAssets:function ac___resizeAssets(){if(!this._visible){return}var h=this.getViewportSize();var j=this.boundingDimension(h);var d;this.__resizeViewer(h);if(this.container.hasClassName("hideaway")){this.container.removeClassName("hideaway")}for(var g=0;g<this.figureSections.length;g++){var f=0;var i=this.slideshow.sectionWithId(this.figureSections[g].slideID).content.select("img");for(var b=0;(b<this.figureSections[g].images.length)&&(!f);b++){switch(j){case"x":if(this.figureSections[g].images[b].width>h.width){f=true;d=this.figureSections[g].images[b].source}break;case"y":var e=h.height-this.getFooterHeight();if(parseInt(this.figureSections[g].images[b].width/this._imageRatio,10)>e){f=true;d=this.figureSections[g].images[b].source}break;default:break}}if(!f){d=this.figureSections[g].images[this.figureSections[g].images.length-1].source}if(typeof(d)==="string"){d=[d]}for(var a=i.length-1;a>=0;a--){for(var k=d.length-1;k>=0;k--){var c=d[k].replace(/[0-9]*(?:.jpg|.png)/,"");if(i[a].src.indexOf(c)!==-1){if(this.__useRetina()){d[k]=this.replaceRetina(d[k])}if(this.options.debug){if(g===this.__getSectionIndex(this.slideshow.currentSection.id)){this.container.down(".fluid-gallery-debug").update(d[k])}}i[a].src=this.imageSRC+d[k]}}}}},__cancelResizeTimer:function ac___cancelResizeTimer(){if(typeof this.__resizeAssetsFlag!=="undefined"){clearTimeout(this.__resizeAssetsFlag);delete this.__resizeAssetsFlag}},__useRetina:function ac___useRetina(){if((AC.Retina.sharedInstance().options.debug!==true)&&((AC.Retina.iOSHandheld()&&AC.Retina.sharedInstance().options.disableOniOSHandheld===true)||(AC.Retina.devicePixelRatio()<=1))){return false}return true},__startResizeTimer:function ac___startResizeTimer(){this.__cancelResizeTimer();if(typeof this.__boundResizeAssets==="undefined"){this.__boundResizeAssets=this.__resizeAssets.bind(this)}this.__resizeAssetsFlag=setTimeout(this.__boundResizeAssets,(this.options.resizeDelay*1000))}});