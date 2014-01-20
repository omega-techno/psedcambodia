var AC=window.AC||{};AC.AutoGallery={initialize:function ac_initialize(){this.setupGalleries()
},setupGalleries:function ac_setupGalleries(){AC.Element.selectAll("."+this.classNames.autoInstantiation).forEach(function(b){this.__setUpGallery(b)
},this)},classNames:{autoInstantiation:"autogallery",wrapper:"gallery",view:"gallery-view",content:"gallery-content"},__specialSwapViewTriggers:["next","previous","SwapViewFirstSection","SwapViewPreviousSelection"],galleries:{},slideshows:{},_classPrefix:"autogallery-",setClassPrefix:function ac_setClassPrefix(b){if(typeof b==="string"){this._classPrefix=b
}return this._classPrefix},__setUpGallery:function ac___setUpGallery(i){var k;var j;
var h=AC.Element.select("."+this.classNames.view,i);if(this.galleries.hasOwnProperty(h.id)){return
}var l=this.Types.Registries.gallery.match(i);var g=l.properties();if(this.__galleryViewIsValid(h)){k=AC.Element.selectAll("."+this.classNames.content,i);
k=k.concat(AC.Element.selectAll("a."+h.id,i));k=this.__parseContent(k,i);if(k.length<2){AC.log("Gallery “"+h.id+"” not instantiated because there were fewer than 2 content sections defined.");
return}j=l.context("viewer")||AC.ViewMaster.Viewer;this.galleries[h.id]=new j(k,h.id,h.id,g);
this.__addGetterToInstance(this.galleries[h.id],"autoGalleryType",l);this.__addGetterToInstance(this.galleries[h.id],"autoGalleryWrapper",i);
this.__setUpDelegate(h,l.context("delegate"));this.__setUpOnInit(this.galleries[h.id]);
this.__setUpSlideshow(h,i)}},__galleryViewIsValid:function ac___galleryViewIsValid(b){if(!Object.isElement(b)){throw"View element not found for gallery."
}if(typeof b.id!=="string"||b.id===""){throw"Valid ID not found on view for gallery."
}if(typeof this.galleries[b.id]!=="undefined"){throw'View ID "'+b.id+'" is not unique.'
}return true},__setUpDelegate:function ac___setUpDelegate(d,c){if(c){this.galleries[d.id].setDelegate(c)
}},__setUpOnInit:function ac___setUpOnInit(e){var d=e.autoGalleryType();var f=d.context("onInit");
if(typeof f==="function"){f(e)}},__setUpSlideshow:function ac___setUpSlideshow(e,f){var d;
if(f.className.match("(^|\\s)"+this._classPrefix+"slideshow(-|\\s|$)")){d=this.Types.Registries.slideshow.match(f);
this.slideshows[e.id]=new AC.ViewMaster.Slideshow(this.galleries[e.id],this._classPrefix+"slideshow-trigger",d.properties());
this.__addGetterToInstance(this.slideshows[e.id],"autoGalleryType",d);this.__addGetterToInstance(this.slideshows[e.id],"autoGalleryWrapper",f);
this.__setUpOnInit(this.slideshows[e.id])}},__addGetterToInstance:function ac___addGetterToInstance(e,d,f){e[d]=function(){return f
}},addType:function ac_addType(l,g,i,h,k){var j=this.Types.Registries.gallery.addComponent(l,g,i,h,k);
j.getOptions=function(){try{AC.log("AC.AutoGallery: getOptions() on Type is deprecated. Use properties() instead.")
}catch(a){}return this.properties()};return j},addSlideshowType:function ac_addSlideshowType(l,g,i,h,k){var j=this.Types.Registries.slideshow.addComponent(l,g,i,h,k);
j.getOptions=function(){try{AC.log("AC.AutoGallery: getOptions() on Type is deprecated. Use properties() instead.")
}catch(a){}return this.properties()};return j},lookupType:function ac_lookupType(d,e){var f;
if(typeof d!=="string"){throw"Type name required to get options for Type."}e=e||"gallery";
if(typeof AC.AutoGallery.Types.Registries[e]==="undefined"){throw"AC.AutoGallery Registry ‘"+e+"’ does not exist."
}f=AC.AutoGallery.Types.Registries[e].lookup(d);return f},options:function ac_options(d,e){var f=this.lookupType(d,e);
if(f){return f.properties()}throw"Type ‘"+d+"’ not found in ‘"+e+"’ Type Registry."
},slideshowOptions:function ac_slideshowOptions(b){return this.options(b,"slideshow")
},__getWrapperForContent:function ac___getWrapperForContent(e){var f;var d=e.parentNode;
while(typeof f==="undefined"){if(AC.Element.hasClassName(d,this.classNames.autoInstantiation)||AC.Element.hasClassName(d,this.classNames.wrapper)){f=d
}d=d.parentNode;if(d===document.body){f=null}}return f},__parseContent:function ac___parseContent(k,i){var j;
var h;var g=[];var l=[];for(h=0;h<k.length;h++){if(this.__getWrapperForContent(k[h])===i){if(AC.Element.hasClassName(k[h],this.classNames.content)){j=k[h].getAttribute("id")
}else{j=k[h].getAttribute("href");if(!!j.match("#")){j=j.split("#")[1]}else{throw"ID for trigger was not found in HREF."
}}if(typeof j==="string"&&j!==""){if(!this.__specialSwapViewTriggers.include(j)){if(!l.include(j)){l.push(j);
g.push(k[h])}}}else{throw"ID for section was not valid."}}}return g},logTypes:function ac_logTypes(){var h=0;
var f;var e;try{AC.log("----------------------------------");AC.log("	Gallery Types");
AC.log("----------------------------------");for(f in this.galleries){if(this.galleries.hasOwnProperty(f)){h++;
AC.log(h+". "+f+": "+this.galleries[f].autoGalleryType().name())}}if(h===0){AC.log("(none)")
}AC.log("");h=0;AC.log("----------------------------------");AC.log("	Slideshow Types");
AC.log("----------------------------------");for(e in this.slideshows){if(this.slideshows.hasOwnProperty(e)){h++;
AC.log(h+". "+e+": "+this.slideshows[e].autoGalleryType().name())}}if(h===0){AC.log("(none)")
}AC.log("")}catch(g){}}};AC.Object.synthesize(AC.AutoGallery);AC.namespace("AC.AutoGallery.Types");
AC.namespace("AC.AutoGallery.Types.Registries");AC.AutoGallery.Types.Registries.gallery=new AC.Registry(AC.AutoGallery.classPrefix(),{contextInherits:["viewer","delegate"],matchCatchAll:true});
AC.AutoGallery.Types.Registries.slideshow=new AC.Registry(AC.AutoGallery.classPrefix()+"slideshow-",{matchCatchAll:true});
AC.AutoGallery.Types.Registries.gallery.addType=function(g,j,i,h,f){AC.log("AC.AutoGallery.Types.Registries.gallery.addType() is deprecated. Use AC.AutoGallery.addType() instead.");
AC.AutoGallery.addType(g,j,i,h,f)};AC.AutoGallery.Types.Registries.slideshow.addType=function(g,j,i,h,f){AC.log("AC.AutoGallery.Types.Registries.slideshow.addType() is deprecated. Use AC.AutoGallery.addSlideshowType() instead.");
AC.AutoGallery.addSlideshowType(g,j,i,h,f)};AC.AutoGallery.EventResponder=AC.Class({initialize:function ac_initialize(){this._className=AC.AutoGallery.classNames.content;
AC.Object.synthesize(this);this.__boundWillShow=this.__willShow.bindAsEventListener(this);
this.__boundDidShow=this.__didShow.bindAsEventListener(this);if(typeof Event.Listener!=="undefined"){Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",true,this.__boundWillShow);
Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",true,this.__boundDidShow)
}else{throw"EventMixins required for AC.AutoGallery"}},__isAutoGallery:function ac___isAutoGallery(d){var c=d.view.view().id;
return(typeof AC.AutoGallery.galleries[c]!=="undefined")&&(AC.AutoGallery.galleries[c]===d)
},__willShow:function ac___willShow(f){var e=f.event_data.data.sender;var g=f.event_data.data.incomingView;
var h=f.event_data.data.outgoingView;if(!this.__isAutoGallery(e)){return}},__didShow:function ac___didShow(f){var e=f.event_data.data.sender;
var g=f.event_data.data.incomingView;var h=f.event_data.data.outgoingView;if(!this.__isAutoGallery(e)){return
}}});AC.AutoGallery.addType("_base",{manageZ:true,addGalleryContentClassName:true,heightFromFirstSection:true,silentTriggers:true,imageLinkAutoCaptions:true,addSectionIdAsClassName:true,useHTML5Tags:true});
AC.AutoGallery.addType("image",{useKeyboardNav:true,discontinuousPreviousNext:true});
AC.AutoGallery.addType("image-fadein",{shouldAnimateFadeIn:true},AC.Function.emptyFunction,"image");
AC.AutoGallery.addType("slide",{useKeyboardNav:true,discontinuousPreviousNext:true,useTouchEvents:true},function(j,h){var f;
var i;var g=AC.Element.select("."+AC.AutoGallery.classNames.view,j);if(Object.isElement(g)){f=g.offsetWidth;
i=j.offsetWidth;if(f>=(i*2)){return true}}return false},"_base",{viewer:AC.ViewMaster.SlideViewer});
AC.AutoGallery.addType("video",{manageZ:1010,showFirstOnStopMovie:true,ensureInView:true,escapeToClose:true},function(j,i){var h;
var f;var g=AC.Element.select("."+AC.AutoGallery.classNames.view,j);if(Object.isElement(g)){h=g.getAttribute("id");
if(typeof h==="string"&&AC.Element.select("a."+h,g)){return true}}return false});
AC.AutoGallery.addSlideshowType("_base",{autoplay:true,stopOnUserInteraction:true});
AC.AutoGallery.addSlideshowType("standard",{discontinuousPreviousNext:false,stopAfterReturnToSection:false});
AC.AutoGallery.addSlideshowType("hero",{autoplay:2000,delay:7000,stopAfterReturnToSection:0,discontinuousPreviousNext:false});
AC.AutoGallery.addSlideshowType("showonscroll",{},AC.Function.emptyFunction,"standard",{onInit:function ac_onInit(f){var h=f.autoGalleryType();
var e=f.contentController.view.view();var g=h.context("setupShowOnScroll")(f,e)
},setupShowOnScroll:function ac_setupShowOnScroll(h,m){if(typeof AC.ShowOnScroll==="undefined"){throw"AC.ShowOnScroll must be included on this page for showonscroll type slideshows."
}var n=h.autoGalleryType().properties();var k=new AC.ShowOnScroll(m,n);var l={scrolledIntoViewPastThreshold:function i(a){h.start()
},scrolledOutOfViewPastThreshold:function j(a){h.stop()}};k.setDelegate(l);h.showOnScroll=function(){return k
};window.setTimeout(function(){l.scrolledOutOfViewPastThreshold(m)},10)}});AC.AutoGallery.addSlideshowType("showonscroll-wrapper",{},AC.Function.emptyFunction,"showonscroll",{onInit:function ac_onInit(f){var h=f.autoGalleryType();
var e=f.autoGalleryWrapper();var g=h.context("setupShowOnScroll")(f,e)}});Event.onDOMReady(function(){if(typeof AC.ViewMaster.Tracker==="function"){if(typeof window.tracker==="undefined"){window.tracker=new AC.ViewMaster.Tracker("click")
}}else{throw"/global/scripts/view_master_tracker.js needs to be included on this page."
}AC.AutoGallery.initialize()});AC.AutoGallery.version="1.1";