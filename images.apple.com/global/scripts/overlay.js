if(typeof(AC)=="undefined"){AC={}}AC.OverlayInit=function(b){for(var a=0;a<b.length;
a++){Event.observe(b[a],"beforePop",function(c){var d=this.overlays.without(this.thisOverlay);
d.each(function(e){e.close()})}.bind({thisOverlay:b[a],overlays:b}))}};AC.Overlay=Class.create();
Object.extend(AC.Overlay.prototype,Event.Listener);Object.extend(AC.Overlay.prototype,Event.Publisher);
Object.extend(AC.Overlay.prototype,{controller:null,closeBtn:null,overlay:null,overlayShadow:null,overlayId:"",overlayClasses:"",overlayContents:"",overlayShadowId:"",overlayShadowClasses:"",overlayShadowSrc:"",order:0,initialize:function(a,c){this.items=a;
if(this.items.length>0){this.createOverlay();this.setDefaults();this.setItemAttributes()
}this.options=c||{};if(location.hash){var b=location.hash.substring(location.hash.indexOf("#")+1,location.hash.length);
if(b=="demo"){this.showDemo()}}},createOverlay:function(){this.closeBtn=Builder.node("a",{href:"#close","class":"close"},"Close");
Event.observe(this.closeBtn,"click",this.close.bindAsEventListener(this),false);
this.buildContents();this.overlay=Builder.node("div",{id:this.overlayId,"class":"overlay "+this.overlayClasses},this.overlayContents);
this.overlayshadow=Builder.node("div",{id:this.overlayShadowId,"class":"overlayshadow "+this.overlayShadowClasses},[Builder.node("img",{src:this.overlayShadowSrc,alt:"",border:0})]);
document.body.appendChild(this.overlayshadow);document.body.appendChild(this.overlay)
},buildContents:function(){},setDefaults:function(){this.defaultWidth=this.overlay.offsetWidth;
this.padleft=parseInt(Element.getStyle(this.overlay,"marginLeft").replace(/px/i,""));
this.padright=parseInt(Element.getStyle(this.overlay,"marginRight").replace(/px/i,""));
this.defaultHeight=this.overlay.offsetHeight;this.padtop=parseInt(Element.getStyle(this.overlay,"marginTop").replace(/px/,""));
this.padbottom=parseInt(Element.getStyle(this.overlay,"marginBottom").replace(/px/,""))
},setItemAttributes:function(){},showDemo:function(){for(var b=0;b<this.items.length;
b++){var c=this.items[b];if(c.movieUrl){var a=b}}this.width=50;this.left=this.windowSize().x+(this.windowSize().width/2);
this.height=50;this.top=this.windowSize().y+(this.windowSize().height/2);if(typeof(a)=="number"){this.prepPop(null,this.items[a],a)
}},setEvent:function(b,a){Event.observe(b,"click",this.onClick.bindAsEventListener(this,b,a),false)
},onClick:function(a,c,b){this.setDimensions(a,c,b);this.fixiPhoneDimensions();
Event.stop(a);if(c.trackClick){c.trackClick()}var d={item:c,i:b};this.dispatchEvent("beforePop",d);
this.prepPop(a,c,b)},setDimensions:function(a,c,b){this.width=(c.offsetWidth>80)?80:c.offsetWidth;
this.left=a.pageX||a.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);
this.left-=this.width/2;this.left=this.left||document.body.getDimensions().width/2;
this.height=c.offsetHeight;this.top=a.pageY||a.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
this.top-=this.height/2},fixiPhoneDimensions:function(){if(AC.Detector.isiPhone()){this.left=3;
this.top=200}},windowSize:function(){var c=document.clientWidth||(document.documentElement.clientWidth||document.body.clientWidth);
var b=document.clientHeight||(document.documentElement.clientHeight||document.body.clientHeight);
var a=window.pageXOffset||(window.document.documentElement.scrollLeft||window.document.body.scrollLeft);
var d=window.pageYOffset||(window.document.documentElement.scrollTop||window.document.body.scrollTop);
if(AC.Detector.isiPhone()){c=parseInt(980);b=parseInt(1212)}return{width:c,height:b,x:a,y:d}
},setPopPosition:function(){var b,a=null;b=this.windowSize().x+(this.windowSize().width-this.defaultWidth-this.padleft-this.padright)/2;
if(this.windowSize().width<this.defaultWidth+this.padleft+this.padright){b=this.windowSize().x-(this.padtop-this.closeBtn.offsetWidth)
}a=this.windowSize().y+(this.windowSize().height-this.defaultHeight-this.padtop-this.padbottom)/2;
if(this.windowSize().height<this.defaultHeight+this.padtop+this.padbottom){a=this.windowSize().y-(this.padtop-this.closeBtn.offsetHeight)
}return{left:b,top:a}},prepPop:function(){},beforePop:function(){Element.addClassName(this.overlay,"isanim");
Element.addClassName(this.overlayshadow,"isanim")},pop:function(c,f,a,e,d,b){this.overlay.style.width=this.width+"px";
this.overlayshadow.style.width=this.width+"px";this.overlay.style.height=this.height+"px";
this.overlayshadow.style.height=this.height+"px";this.overlay.style.left=this.left-this.padleft+"px";
this.overlayshadow.style.left=this.left+"px";this.overlay.style.top=this.top-this.padtop+"px";
this.overlayshadow.style.top=this.top+"px";Element.setOpacity(this.overlay,0);Element.setOpacity(this.overlayshadow,0);
if(!AC.Detector.isiPhone()){new Effect.Parallel([new Effect.MoveBy(this.overlay,f-this.top+this.padtop,e-this.left+this.padleft,{sync:true}),new Effect.MoveBy(this.overlayshadow,f-this.top,e-this.left,{sync:true}),new Effect.Scale(this.overlay,(c/this.width)*100,{sync:true,scaleY:false,scaleContent:false}),new Effect.Scale(this.overlayshadow,((c+this.padleft+this.padleft)/this.width)*100,{sync:true,scaleY:false,scaleContent:false}),new Effect.Scale(this.overlay,(a/this.height)*100,{sync:true,scaleX:false,scaleContent:false}),new Effect.Scale(this.overlayshadow,((a+this.padtop+this.padbottom)/this.height)*100,{sync:true,scaleX:false,scaleContent:false}),new Effect.Appear(this.overlay,{sync:true}),new Effect.Appear(this.overlayshadow,{sync:true})],{duration:0.3,beforeStart:this.beforePop.bind(this),afterFinish:this.afterPop.bind(this,d,b)})
}else{this.beforePop();this.afterPop(d,b)}},afterPop:function(b,a){this.setPoppedClass();
var c={item:b,i:a};this.dispatchEvent("afterPop",c);this.resetOverlay()},beforeClose:function(){this.setIsanimClass();
this.dispatchEvent("beforeClose",this)},resetOverlay:function(){this.overlay.style.width="";
this.overlayshadow.style.width="";this.overlay.style.height="";this.overlayshadow.style.height="";
Element.setOpacity(this.overlay,"");Element.setOpacity(this.overlayshadow,"")},setPoppedClass:function(){Element.removeClassName(this.overlay,"isanim");
Element.removeClassName(this.overlayshadow,"isanim");Element.addClassName(this.overlay,"popped");
Element.addClassName(this.overlayshadow,"popped")},setIsanimClass:function(){Element.addClassName(this.overlay,"isanim");
Element.addClassName(this.overlayshadow,"isanim");Element.removeClassName(this.overlay,"popped");
Element.removeClassName(this.overlayshadow,"popped")},close:function(b){if(b){Event.stop(b)
}var c=this.defaultWidth;var e=this.overlay.offsetLeft;var a=this.defaultHeight;
var d=this.overlay.offsetTop;if(e>0&&d>0){if(!AC.Detector.isiPhone()){new Effect.Parallel([new Effect.MoveBy(this.overlay,this.top-this.padtop-d,this.left-this.padleft-e,{sync:true}),new Effect.MoveBy(this.overlayshadow,this.top-d,this.left-e,{sync:true}),new Effect.Scale(this.overlay,(this.width/c)*100,{sync:true,scaleY:false,scaleContent:false}),new Effect.Scale(this.overlayshadow,(this.width/(c+this.padleft+this.padleft))*100,{sync:true,scaleY:false,scaleContent:false}),new Effect.Scale(this.overlay,(this.height/a)*100,{sync:true,scaleX:false,scaleContent:false}),new Effect.Scale(this.overlayshadow,(this.height/(a+this.padtop+this.padbottom))*100,{sync:true,scaleX:false,scaleContent:false}),new Effect.Fade(this.overlay,{sync:true}),new Effect.Fade(this.overlayshadow,{sync:true})],{duration:0.3,beforeStart:this.beforeClose.bind(this),afterFinish:this.afterClose.bind(this)})
}else{this.beforeClose();this.afterClose()}}},afterClose:function(){Element.removeClassName(this.overlay,"isanim");
Element.removeClassName(this.overlayshadow,"isanim");this.overlay.style.width="";
this.overlayshadow.style.width="";this.overlay.style.height="";this.overlayshadow.style.height="";
this.overlay.style.left="";this.overlayshadow.style.left="";this.overlay.style.top="";
this.overlayshadow.style.top="";this.overlay.style.display="";this.overlayshadow.style.display="";
this.dispatchEvent("afterClose",this);if(AC.Detector.isWebKit()){this.fixSafarisScrollBars()
}},fixSafarisScrollBars:function(){scrollTo=1;window.scroll(this.windowSize().x+scrollTo,this.windowSize().y+scrollTo);
scrollTo=-scrollTo;window.scroll(this.windowSize().x+scrollTo,this.windowSize().y+scrollTo)
}});AC.SingleImageOverlay=Class.create();Object.extend(AC.SingleImageOverlay.prototype,AC.Overlay.prototype);
Object.extend(AC.SingleImageOverlay.prototype,{overlayId:"ACOverlaySingleImage",overlayShadowId:"ACOverlaySingleImageShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_shadow20070807.png",buildContents:function(){this.overlayimg=Builder.node("img",{"class":"overlayimg",border:0});
this.overlaynav=Builder.node("div",{"class":"overlaynav"});this.overlayContents=[this.closeBtn,this.overlayimg]
},setItemAttributes:function(){for(var a=0;a<this.items.length;a++){var b=this.items[a];
b.img=new Image();b.img.src=b.href;b.img.alt=(Element.down(b,"img"))?Element.down(b,"img").alt:b.innerHTML;
b.img.alt=b.img.alt.replace(/: click to enlarge/i,"");b.img.shortsrc=b.img.src.substring(b.img.src.lastIndexOf("../../index.html")+1,b.img.src.length);
b.trackClick=function(){AC.Tracking.trackClick({prop1:""},this.img.src,"o",AC.Tracking.pageName()+" - "+b.img.alt+" - "+this.img.shortsrc)
};this.setEvent(b,a)}},prepPop:function(a,c,b){this.overlayimg.src=c.img.src;this.overlayimg.alt=c.img.alt;
this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
}});AC.ImageOverlay=Class.create();Object.extend(AC.ImageOverlay.prototype,AC.SingleImageOverlay.prototype);
Object.extend(AC.ImageOverlay.prototype,{overlayId:"ACOverlayImage",overlayShadowId:"ACOverlayImageShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_shadow20070807.png",buildContents:function(){this.overlayimg=Builder.node("img",{"class":"overlayimg",border:0});
this.overlaynav=Builder.node("div",{"class":"overlaynav"});this.overlayContents=[this.closeBtn,this.overlayimg,this.overlaynav]
},setItemAttributes:function(){for(var a=0;a<this.items.length;a++){var b=this.items[a];
b.img=new Image();b.img.src=b.href;b.img.alt=(Element.down(b,"img"))?Element.down(b,"img").alt:b.innerHTML;
b.img.alt=b.img.alt.replace(/: click to enlarge/i,"");b.nav=this.getNav(b);b.img.shortsrc=b.img.src.substring(b.img.src.lastIndexOf("../../index.html")+1,b.img.src.length);
b.trackClick=function(){AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - "+this.img.shortsrc},this.img.src,"o",AC.Tracking.pageName()+" - "+b.img.alt+" - "+this.img.shortsrc)
};this.setEvent(b,a)}},getNav:function(d){var g=Element.up(d,"ul");var f=g.getElementsByClassName("overlaythumb");
var b=[];for(var c=0;c<f.length;c++){var a=f[c].cloneNode(true);if(d==f[c]){Element.addClassName(a,"active")
}b.push(Builder.node("li",a))}var e=Builder.node("ul",{"class":"w"+f.length},b);
return e},setNav:function(d,c){this.overlaynav=$(this.overlaynav);this.overlaynav.innerHTML="";
this.overlaynav.innerHTML=Builder.node("div",d.nav).innerHTML;var a=this.overlaynav.getElementsByClassName("overlaythumb");
for(var b=0;b<a.length;b++){Event.observe(a[b],"click",this.swapImage.bindAsEventListener(this,a[b],b,c))
}},swapImage:function(a,g,d,f){Event.stop(a);var c=this.overlaynav.getElementsByClassName("overlaythumb");
for(var b=0;b<c.length;b++){if(c[b].href==g.href){var e=c[b];Element.addClassName(e,"active")
}else{Element.removeClassName(c[b],"active")}}this.overlayimg.src=e.href;this.overlayimg.alt=(Element.down(e))?Element.down(e).alt.replace(/: click to enlarge/i,""):e.innerHTML;
e.shorthref=e.href.substring(e.href.lastIndexOf("../../index.html")+1,e.href.length);AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - "+e.shorthref},e.href,"o",AC.Tracking.pageName()+" - "+this.overlayimg.alt+" - "+e.shorthref)
},prepPop:function(a,c,b){this.overlayimg.src=c.img.src;this.overlayimg.alt=c.img.alt;
this.setNav(c,b);this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
}});AC.MovieOverlay=Class.create();Object.extend(AC.MovieOverlay.prototype,AC.Overlay.prototype);
Object.extend(AC.MovieOverlay.prototype,{movieController:false,overlayId:"ACOverlayMovie",overlayShadowId:"ACOverlayMovieShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_movieshadow20070807.png",buildContents:function(){this.displayPanel=Builder.node("div",{"class":"overlaymovie"});
this.controllerPanel=Builder.node("div",{"class":"overlaycontroller"});this.descriptionPanel=Builder.node("div",{"class":"overlaydescription"});
this.overlayContents=[this.closeBtn,this.descriptionPanel,this.displayPanel,this.controllerPanel]
},track:function(b,c){if(c=="Start"){this.order++}var a=AC.Tracking.pageName()+" - ";
a+=(b.title)?b.title:b.movieUrl.match(/([^\/]+)\.\S\S\S$/)[1];if(c=="Start"){AC.Tracking.trackClick({pageName:"V@S: "+a,prop13:"V@S: "+a},this,"o","V@S: "+a)
}else{if(c=="End"){AC.Tracking.trackClick({prop13:"V@E: "+a},this,"o","V@E: "+a)
}}},setItemAttributes:function(){for(var b=0;b<this.items.length;b++){var c=this.items[b];
c.movieLink=Element.down(c,"a.overlaymovielink");c.movieUrl=c.movieLink.href;c.title=(Element.down(c,"img"))?Element.down(c,"img").alt:c.innerHTML.stripTags();
c.description=Element.down(c,".overlaydescription");var a=Element.down(c,".overlayposter");
c.posterFrameUrl=a.innerHTML.match(/src="(.*)"/)[1];this.setEvent(c,b)}this.listenForEvent(this,"beforePop",false,function(d){this.handleBeforePop(d)
}.bindAsEventListener(this));this.listenForEvent(this,"afterPop",false,function(d){this.handleAfterPop(d)
}.bindAsEventListener(this));this.listenForEvent(this,"beforeClose",false,function(d){this.handleBeforeClose(d)
}.bindAsEventListener(this))},handleBeforePop:function(a){if(this.controllerPanel&&!this.controllerPanel.innerHTML==""){this.beforeClose();
this.afterClose()}},handleAfterPop:function(a){var c=a.event_data.data.item;var b=a.event_data.data.i;
this.packageMovie(c,b);this.descriptionPanel.innerHTML=c.description.innerHTML},handleBeforeClose:function(a){if(this.movieController){this.movieController.Stop();
this.movieController.detachFromMovie();this.movieController=false}this.displayPanel.style.display="none";
this.displayPanel.innerHTML="";this.displayPanel.style.display="";this.controllerPanel.innerHTML="";
this.descriptionPanel.innerHTML=""},prepPop:function(a,c,b){this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
},packageMovie:function(e,d){var c=false;var f=(this.options.moviewidth)?this.options.moviewidth:640;
var b=(this.options.movieheight)?this.options.movieheight:360;this.currentItem=e;
if(AC.Detector.isiPhone()){c=true}if(AC.Detector.isOpera()){c=true;b+=16}if(AC.Detector.isQTInstalled()){var a=AC.Quicktime.packageMovie("overlaymovie",e.movieUrl,{width:f,height:b,posterFrame:e.posterFrameUrl,controller:c,showlogo:false,background:"#ffffff",cache:true});
this.displayPanel.appendChild(a);if(!c){this.movieController=new AC.QuicktimeController();
this.movieController.setDelegate(this);this.movieController.render(this.controllerPanel);
this.movieController.attachToMovie(a)}}this.track(e,"Start");var a=null}});AC.VrOverlay=Class.create();
Object.extend(AC.VrOverlay.prototype,AC.MovieOverlay.prototype);Object.extend(AC.VrOverlay.prototype,{movieController:false,overlayId:"ACOverlayVr",overlayShadowId:"ACOverlayVrShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_shadow_vr20080109.png",buildContents:function(){this.displayPanel=Builder.node("div",{"class":"overlaymovie"});
this.overlayContents=[this.closeBtn,this.displayPanel]},setItemAttributes:function(){for(var b=0;
b<this.items.length;b++){var c=this.items[b];c.movieLink=(c.href)?c:Element.down(c,"a");
c.movieUrl=c.movieLink.href;c.title=(Element.down(c,"img"))?Element.down(c,"img").alt:c.innerHTML.stripTags();
var a=Element.down(c,".overlayiphonealt");c.iphoneAlt=a.innerHTML.match(/href="(.*)"/)[1];
this.setEvent(c,b)}this.listenForEvent(this,"beforePop",false,function(d){this.handleBeforePop(d)
}.bindAsEventListener(this));this.listenForEvent(this,"afterPop",false,function(d){this.handleAfterPop(d)
}.bindAsEventListener(this));this.listenForEvent(this,"beforeClose",false,function(d){this.handleBeforeClose(d)
}.bindAsEventListener(this))},handleBeforePop:function(a){if(this.displayPanel&&!this.displayPanel.innerHTML==""){this.beforeClose();
this.afterClose()}if(AC.Detector.isMobile()||AC.Detector.isiPad()){this.iphoneAlt(a.event_data.data.item)
}},prepPop:function(a,c,b){if(AC.Detector.isMobile()||AC.Detector.isiPad()){return
}this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
},iphoneAlt:function(a){var b=a.movieUrl.substring(a.movieUrl.lastIndexOf("../../index.html")+1,a.movieUrl.length);
document.location=a.iphoneAlt+"?movie="+b},handleAfterPop:function(a){var c=a.event_data.data.item;
var b=a.event_data.data.i;this.packageMovie(c,b)},handleBeforeClose:function(a){if(this.movieController){this.movieController.Stop();
this.movieController.detachFromMovie();this.movieController=false}this.displayPanel.style.display="none";
this.displayPanel.innerHTML="";this.displayPanel.style.display=""},packageMovie:function(d,c){if(AC.Detector.isMobile()||AC.Detector.isiPad()){return
}var e=(this.options.moviewidth)?this.options.moviewidth:512;var b=(this.options.movieheight)?this.options.movieheight:552;
this.currentItem=d;if(AC.Detector.isQTInstalled()){var a=AC.Quicktime.packageMovie("overlaymovie",d.movieUrl,{width:e,height:b,controller:false,showlogo:false,background:"#ffffff",cache:true});
this.displayPanel.appendChild(a);this.movieController=new AC.QuicktimeController(a,{delegate:this})
}this.track(d,"Start");var a=null},didAttach:function(a){a.monitorMovie()},didEnd:function(a){this.track(this.currentItem,"End")
}});AC.MovieGalleryOverlay=Class.create();Object.extend(AC.MovieGalleryOverlay.prototype,AC.MovieOverlay.prototype);
Object.extend(AC.MovieGalleryOverlay.prototype,{overlayId:"ACOverlayMovieGallery",overlayClasses:"tour",overlayShadowId:"ACOverlayMovieGalleryShadow",overlayShadowClasses:"tourshadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_movieshadow_nav20070807.png",movieLinks:function(c,b){if(AC.Detector.isOpera()){this.previous=true;
this.next=true}else{if(!this.next&&!this.previous){this.previous=Builder.node("a",{"class":"previous"},"Previous");
this.next=Builder.node("a",{"class":"next"},"Next");var a=Builder.node("div",{"class":"links"},[this.previous,this.next]);
this.controllerPanel.parentNode.appendChild(a)}this.setMovieLinks(b)}},setMovieUrl:function(c,b,a){if(a){Event.stop(a)
}this.descriptionPanel.innerHTML=c.description.innerHTML;this.setMovieLinks(b);
this.currentItem=c;if(!AC.Detector.isMobile()&&!AC.Detector.isiPad()){if(this.movieController){this.movieController.SetURL(c.movieUrl)
}this.track(c,"Start")}else{this.displayPanel.innerHTML="";this.packageMovie(c,b)
}},setMovieLinks:function(c){var a=function(g,f,e){g.innerHTML=f.title;g.href=f.movieUrl;
g.observe("click",this.setMovieUrl.bind(this,f,e))}.bind(this);var b=(c==0)?this.items.length-1:c-1;
a(this.previous,this.items[b],b);var d=(c==this.items.length-1)?0:c+1;a(this.next,this.items[d],d)
},handleAfterPop:function(a){var c=a.event_data.data.item;var b=a.event_data.data.i;
this.packageMovie(c,b);this.descriptionPanel.innerHTML=c.description.innerHTML;
this.movieLinks(c,b)}});AC.AudioOverlay=Class.create();Object.extend(AC.AudioOverlay.prototype,AC.MovieOverlay.prototype);
Object.extend(AC.AudioOverlay.prototype,{audioController:false,overlayId:"ACOverlayAudio",overlayShadowId:"ACOverlayAudioShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_movieshadow20070807.png",buildContents:function(){this.overlayimg=Builder.node("img",{"class":"overlayimg",border:0});
this.descriptionPanel=Builder.node("div",{"class":"overlaydescription"});this.overlayContents=[this.closeBtn,this.descriptionPanel,this.overlayimg]
},setItemAttributes:function(){for(var a=0;a<this.items.length;a++){var b=this.items[a];
b.img=new Image();b.img.src=Element.down(b,"a.overlayimagelink").href;b.img.alt=(Element.down(b,"img"))?Element.down(b,"img").alt:b.innerHTML;
b.img.alt=b.img.alt.replace(/: listen/i,"");b.description=Element.down(b,".overlaydescription");
b.img.shortsrc=b.img.src.substring(b.img.src.lastIndexOf("../../index.html")+1,b.img.src.length);
b.trackClick=function(){AC.Tracking.trackClick({prop1:""},this.img.src,"o",AC.Tracking.pageName()+" - "+b.img.alt+" - "+this.img.shortsrc)
};this.setEvent(b,a)}this.listenForEvent(this,"beforePop",false,function(c){this.handleBeforePop(c)
}.bindAsEventListener(this));this.listenForEvent(this,"afterPop",false,function(c){this.handleAfterPop(c)
}.bindAsEventListener(this));this.listenForEvent(this,"beforeClose",false,function(c){this.handleBeforeClose(c)
}.bindAsEventListener(this))},setNav:function(b,a){this.descriptionPanel.innerHTML=b.description.innerHTML
},fixAudioLinks:function(){var f=195;var c=16;var b=this.descriptionPanel.getElementsByClassName("overlayaudiolink");
if(b.length>0){this.audioController=[]}for(var d=0;d<b.length;d++){var e=b[d];e.movieUrl=e.href;
var a=AC.Quicktime.packageMovie("overlayaudiomovie"+1,e.movieUrl,{width:f,height:c,controller:true,autoplay:false,showlogo:false,cache:true});
Element.up(b[d],"li").appendChild(a);this.audioController[d]=new AC.QuicktimeController(a,{delegate:this});
Event.observe(b[d],"click",function(g,h){Event.stop(g);this.currentItem=h;if(this.audioController[d]){if(!this.audioController[d].isPlaying()){this.audioController[d].Play();
this.track(h,"Start")}}}.bindAsEventListener(this,b[d],d));var a=null}},prepPop:function(a,c,b){this.overlayimg.src=c.img.src;
this.overlayimg.alt=c.img.alt;this.setNav(c,b);this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
},handleAfterPop:function(a){var c=a.event_data.data.item;var b=a.event_data.data.i;
this.fixAudioLinks()},handleBeforeClose:function(a){if(this.audioController&&this.audioController.length>0){for(var b=0;
b<this.audioController.length;b++){if(this.audioController[b].isPlaying()){this.audioController[b].Stop()
}this.audioController[b].detachFromMovie();this.audioController[b]=false}this.audioController=false
}this.descriptionPanel.style.display="none";this.descriptionPanel.innerHTML="";
this.descriptionPanel.style.display=""}});AC.AudioVrGalleryOverlay=Class.create();
Object.extend(AC.AudioVrGalleryOverlay.prototype,AC.AudioOverlay.prototype);Object.extend(AC.AudioVrGalleryOverlay.prototype,AC.MovieGalleryOverlay.prototype);
Object.extend(AC.AudioVrGalleryOverlay.prototype,{overlayId:"ACOverlayAudioVrGallery",overlayShadowId:"ACOverlayAudioVrGalleryShadow",buildContents:function(){this.overlaynav=Builder.node("div",{"class":"overlaynav"});
this.displayPanel=Builder.node("div",{"class":"overlaymovie"});this.descriptionPanel=Builder.node("div",{"class":"overlaydescription"});
this.overlayContents=[this.closeBtn,this.descriptionPanel,this.displayPanel,this.overlaynav]
},movieLinks:function(c,b){if(AC.Detector.isOpera()){this.previous=true;this.next=true
}else{if(!this.next&&!this.previous){this.previous=Builder.node("a",{"class":"previous"},"Previous");
this.next=Builder.node("a",{"class":"next"},"Next");var a=Builder.node("div",{"class":"links"},[this.previous,this.next]);
this.overlaynav.appendChild(a)}this.setMovieLinks(b)}},setMovieLinks:function(c){var b=function(k,h){if(this.audioController&&this.audioController.length>0){for(var g=0;
g<this.audioController.length;g++){if(this.audioController[g].isPlaying()){this.audioController[g].Stop()
}this.audioController[g].detachFromMovie();this.audioController[g]=false}this.audioController=false
}if(this.movieController){this.movieController.SetURL(k.movieUrl)}else{if(AC.Detector.isiPhone()){this.displayPanel.innerHTML="";
this.displayPanel.appendChild(Builder.node("img",{src:k.posterFrame,alt:"",border:""}))
}}this.descriptionPanel.innerHTML=k.description.innerHTML;this.movieLinks(k,h);
this.fixAudioLinks();return false};var a=(c==0)?this.items.length-1:c-1;var f=this.items[a];
this.previous.innerHTML=f.title;this.previous.href=f.movieUrl;this.previous.onclick=b.bind(this,f,a);
var e=(c==this.items.length-1)?0:c+1;var d=this.items[e];this.next.innerHTML=d.title;
this.next.href=d.movieUrl;this.next.onclick=b.bind(this,d,e)},fixAudioLinks:function(){var f=142;
var c=60;var b=$(this.descriptionPanel).getElementsByClassName("overlayaudiolink");
if(b.length>0){this.audioController=[]}for(var d=0;d<b.length;d++){var e=b[d];e.movieUrl=e.href;
var a=AC.Quicktime.packageMovie("overlayaudiomovie"+1,e.movieUrl,{width:f,height:c,controller:false,autoplay:false,showlogo:false,cache:true});
Element.up(b[d],"li").appendChild(a);this.audioController[d]=new AC.QuicktimeController(a,{delegate:this});
Event.observe(b[d],"click",function(g,h){Event.stop(g);this.currentItem=h;if(this.audioController[d]){if(!this.audioController[d].isPlaying()){this.audioController[d].Play();
this.track(h,"Start")}}}.bindAsEventListener(this,b[d],d));var a=null}},packageMovie:function(d,c){if(AC.Detector.isiPhone()){this.displayPanel.appendChild(Builder.node("img",{src:d.posterFrame,alt:"",border:""}))
}else{if(AC.Detector.isQTInstalled()){var e=640;var b=416;var a=AC.Quicktime.packageMovie("overlayvrmovie",d.movieUrl,{width:e,height:b,controller:true,showlogo:false,background:"#ffffff",cache:true});
this.displayPanel.appendChild(a);this.movieController=new AC.QuicktimeController();
this.movieController.attachToMovie(a)}var a=null}},handleAfterPop:function(a){var c=a.event_data.data.item;
var b=a.event_data.data.i;this.packageMovie(c,b);this.descriptionPanel.innerHTML=c.description.innerHTML;
this.movieLinks(c,b);this.fixAudioLinks()},handleBeforeClose:function(a){if(this.audioController&&this.audioController.length>0){for(var b=0;
b<this.audioController.length;b++){if(this.audioController[b].isPlaying()){this.audioController[b].Stop()
}this.audioController[b].detachFromMovie();this.audioController[b]=false}this.audioController=false
}if(this.movieController){this.movieController.Stop();this.movieController.detachFromMovie();
this.movieController=false}this.displayPanel.style.display="none";this.displayPanel.innerHTML="";
this.displayPanel.style.display="";this.descriptionPanel.innerHTML=""}});AC.HTMLOverlay=Class.create();
Object.extend(AC.HTMLOverlay.prototype,AC.Overlay.prototype);Object.extend(AC.HTMLOverlay.prototype,{overlayId:"ACOverlayHTML",overlayShadowId:"ACOverlayHTMLShadow",overlayShadowSrc:"http://images.apple.com/global/elements/overlay/overlay_movieshadow20070807.png",buildContents:function(){this.descriptionPanel=Builder.node("div",{"class":"overlaydescription"});
this.overlayContents=[this.closeBtn,this.descriptionPanel]},setItemAttributes:function(){for(var a=0;
a<this.items.length;a++){var b=this.items[a];b.htmlLink=Element.down(b,"a.overlayhtmllink");
b.description=Element.down(b,".overlaydescription");this.setEvent(b,a)}this.listenForEvent(this,"afterPop",false,function(c){this.handleAfterPop(c)
}.bindAsEventListener(this));this.listenForEvent(this,"beforeClose",false,function(c){this.handleBeforeClose(c)
}.bindAsEventListener(this))},handleAfterPop:function(a){var c=a.event_data.data.item;
var b=a.event_data.data.i;this.descriptionPanel.innerHTML=c.description.innerHTML
},handleBeforeClose:function(a){this.descriptionPanel.innerHTML=""},prepPop:function(a,c,b){this.pop(this.defaultWidth,this.setPopPosition().top,this.defaultHeight,this.setPopPosition().left,c,b)
}});
