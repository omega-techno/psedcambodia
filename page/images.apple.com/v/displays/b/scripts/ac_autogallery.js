if(typeof AC==="undefined"){var AC={}}AC.AutoGallery={};AC.AutoGallery={views:{},slideshows:{},defaultOptions:{silentTriggers:true,showFirstOnStopMovie:true,stickyHeight:true,imageLinkAutoCaptions:true,imageLinkClasses:true,useHTML5Tags:true},defaultSlideshowOptions:{autoplay:2000,delay:7000,stopAfterReturnToSection:0,discontinuousPreviousNext:false,stopOnContentTriggerClick:true},initializeAutoGalleries:function(){if(typeof this.options==="undefined"){this.options={}
}if(typeof this.slideshowOptions==="undefined"){this.slideshowOptions={}}this.options=Object.extend(this.defaultOptions,this.options);
this.slideshowOptions=Object.extend(this.defaultSlideshowOptions,this.slideshowOptions);
var c,a,h,e,g,d,b,k,f=$$(".gallery");for(c=f.length-1;c>=0;c--){if(!f[c].hasClassName("noautogallery")){k=Object.clone(this.options);
k.toEnsureInView=k.ensureInView||false;k.ensureInView=false;h=f[c].down(".gallery-view");
e=this.getContent(f[c].select("a."+h.id));for(var a=e.length-1;a>=0;a--){if(e[a].href.search("#next")>0||e[a].href.search("#previous")>0){e=e.without(e[a])
}}if(g=f[c].down("a."+h.id+'[href^="#"]')){if((d=f[c].down(".gallery-content"))||(d=f[c].down("figure"))){e.shift();
e.unshift(d);k.initialId=e.id}else{k.initialId=g.href.replace(/.*#/,"")}k=this.setOption(k,"useKeyboardNav",true);
k=this.setOption(k,"discontinuousPreviousNext",true)}else{e.unshift(h.down(".gallery-content"));
k.toEnsureInView=true}this.stick(e,h);if(f[c].hasClassName("slide-gallery")){k=this.setOption(k,"slideGallery",true);
k=this.setOption(k,"useTouchEvents",true);this.views[h.id]=new AC.ViewMaster.SlideViewer(e,h,h.id,k)
}else{this.views[h.id]=new AC.ViewMaster.Viewer(e,h,h.id,k)}this.views[h.id].setDelegate(AC.AutoGallery);
if(f[c].hasClassName("slideshow")){this.slideshows[h.id]=new AC.ViewMaster.Slideshow(this.views[h.id],"ac-autogallery-slideshow-trigger",this.slideshowOptions);
this.views[h.id].options.toEnsureInView=false}}}for(h in this.views){if(this.views[h].options.toEnsureInView){this.views[h].options.ensureInView=true
}if(b=document.location.hash.toString().replace(/^#/,"")){if(this.views[h].orderedSections.indexOf(b)!==-1){this.views[h].show(this.views[h].sectionWithId(b))
}}}},getContent:function(b){var e,a,c=[],d=[];for(a=0;a<b.length;a++){e=b[a].getAttribute("href").split("#")[1];
if(e!=="next"&&e!=="previous"&&e!=="SwapViewPreviousSelection"&&e!=="SwapViewFirstSection"){if(d.indexOf(e)===-1){d.push(e);
c.push(b[a])}}}return c},setOption:function(a,b,c){if(!a||!b||!c){return null}if(!(b in this.options)){a[b]=c
}return a},stick:function(f,c){var b,a,g,d,e=0;if(f[0].tagName.toLowerCase()!="a"){b=f[0]
}if(!b){b=c}if(b&&(a=b.getHeight())){c.style.height=a+"px";if((g=c.up(".slide-gallery"))&&(e=g.getWidth())){if(c.getWidth()<=e){c.style.width=(e*f.length)+"px"
}g.style.width=e+"px";g.style.height=a+"px"}}},bringGalleryTo:function(f,c,b,g){var a,d,e;
if(f){if(a=f.up(".gallery")){a.style.zIndex=g}if(e=a.up(".section")){e.style.zIndex=g;
if(d=e.next(".section")){d.style.zIndex=1}}if(c&&c.content){c.content.style.zIndex=g
}if(b&&b.content){b.content.style.zIndex=g}}},willShow:function(b,c,a){var d=b.view.view();
if((a.hasMovie()||a.content.down("a.movieLink"))&&b.options.showFirstOnStopMovie){for(b in this.views){if(this.views[b].currentSection.hasMovie()||this.views[b].currentSection.content.down("a.movieLink")){this.views[b].showFirst()
}}}if((a.hasMovie()||a.content.down("a.movieLink"))||(c&&(c.hasMovie()||c.content.down("a.movieLink")))){this.bringGalleryTo(d,c,a,a.content.getAttribute("data-z")||"10")
}if(c&&c.caption&&b.options.slideGallery){c.caption.setOpacity("0")}},didShow:function(d,e,c){var g=d.view.view(),b,a,f,h;
if(e&&e.hasMovie()){this.bringGalleryTo(g,e,c,"1")}if(c&&c.caption&&d.options.slideGallery){c.caption.setOpacity("1")
}}};Event.onDOMReady(AC.AutoGallery.initializeAutoGalleries.bind(AC.AutoGallery));