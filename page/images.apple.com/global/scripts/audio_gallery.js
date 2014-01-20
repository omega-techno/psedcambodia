AC.ViewMaster.AudioSection=Class.create();Object.extend(AC.ViewMaster.AudioSection.prototype,AC.ViewMaster.Section.prototype);
if(Event.Listener){Object.extend(AC.ViewMaster.AudioSection.prototype,Event.Listener)
}Object.extend(AC.ViewMaster.AudioSection.prototype,{mediaType:function(){var a=this.movieLink.getAttribute("href",2).split("."),b;
if(a.length===2){b=a[1]}else{b="quicktime"}return this.movieLink?"audio/"+b:"text/html"
},_superInitialize:AC.ViewMaster.Section.prototype.initialize,initialize:function(a,b){this._superInitialize(a,b);
if(Event.Listener){this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,this.viewMasterDidShowNotificationCallback.bind(this))
}},viewMasterDidShowNotificationCallback:function(b){var c=b.event_data.data,a=c.incomingView;
if(a===this&&(a===this.viewMaster.currentSection)){if(this._movieController&&((this._movieController.isPlaying&&!this._movieController.isPlaying())||(this._movieController.playing&&!this._movieController.playing()))){if(this._movieController.movie){this._movieController.Play()
}else{Event.observe(document.getElementsByTagName("body")[0],"QuickTime:didAttach",this.controllerDidAttach.bind(this))
}}}},controllerDidAttach:function(b){var a=b.memo.controller;if(a===this._movieController&&!this._movieController.isPlaying()){this._movieController.Play()
}},newMovieController:function(){if(this.isACMediaAvailable()){return this._movieControls||new Media.CircularController(this.controllerPanel)
}else{return new AC.QuickTime.CircularController(null,{state:AC.QuickTime.States.Polling})
}},defaultMovieWidth:function(){return 1},defaultMovieHeight:function(){return 1
},isValidQTAvailable:function(){if(typeof AC.Detector._isValidQTAvailable==="undefined"){var a=(typeof AC.QuickTime!=="undefined"&&typeof AC.QuickTime.minVersion==="function")?AC.QuickTime.minVersion():(typeof Media!=="undefined")?Media.MIN_QUICKTIME_VERSION:false;
AC.Detector._isValidQTAvailable=(a!==false)?AC.Detector.isValidQTAvailable(a):false
}return AC.Detector._isValidQTAvailable},defaultOptions:function(){return{width:this.defaultMovieWidth(),height:this.defaultMovieHeight(),controller:false,autostart:true,cache:true,bgcolor:"white",aggressiveCleanup:false,audio:true}
},_super_playMovie:AC.ViewMaster.Section.prototype._playMovie,_playMovie:function(){if(AC.Detector.isIEStrict()&&!this.isValidQTAvailable()){if(this.movieLink&&this.moviePanel){this.moviePanel.innerHTML="";
if(this.posterLink&&this.posterLink.href){var a=this.posterLink.href}this.moviePanel.appendChild(this._audioElement);
this.movie=AC.HTMLPlusTimeSlideshow.create(this._audioElement,null,{autoplay:true,controller:this._movieController,listenForViewMasterWillShowNotification:false})
}}else{this._super_playMovie()}},firstControllerTrigger:function(){var a=this.triggers(),b,c;
if(!a){return null}for(b=0;(c=a[b]);b++){if(c.hasClassName("controller")){return c
}}return null},_super_loadMovie:AC.ViewMaster.Section.prototype._loadMovie,_loadMovie:function(){this._super_loadMovie();
if(AC.Detector.isIEStrict()&&!this.isValidQTAvailable()){this._audioElement=document.createElement("t:AUDIO");
this._audioElement.setAttribute("begin","indefinite");var a=this.movieLink.getAttribute("href",2).split(".");
if(a.length===2){a=a[0]+".mp3"}this._audioElement.setAttribute("src",a)}},_superWillClose:AC.ViewMaster.Section.prototype.willClose,willClose:function(){if(this.currentTriggerControllerElement){this.currentTriggerControllerElement.style.visibility="visible";
this.controllerPanel.style.visibility="hidden"}return this._superWillClose()},_superWillShow:AC.ViewMaster.Section.prototype.willShow,willShow:function(){this._superWillShow();
if(this.hasShown&&!this.moviePanel){this.movieLink=this.content.getElementsByClassName("audioLink")[0];
this.posterLink=this.content.getElementsByClassName("posterLink")[0];if(this.movieLink){this._loadMovie()
}}return this.content},_superDidShow:AC.ViewMaster.Section.prototype.didShow,didShow:function(){var b;
b=this._superDidShow();if(!this.isMobile){var c=this.viewMaster.currentTrigger(),e=c?c.parentNode:null,a,d=this.controllerPanel;
this.currentTriggerControllerElement=this.firstControllerTrigger();this.currentTriggerControllerElement.parentNode.appendChild(this.controllerPanel);
a=Element.positionedOffset(this.currentTriggerControllerElement);d.style.left=(a.left)+"px";
d.style.top=(a.top)+"px";d.style.width=this.currentTriggerControllerElement.clientWidth+"px";
d.style.height=this.currentTriggerControllerElement.clientHeight+"px";d.style.position="absolute";
d.style.visibility="visible";this.currentTriggerControllerElement.style.visibility="hidden"
}},_closeController:function(){if(this.isACMediaAvailable()){if(this._movieController&&this.hasMovie()&&!this.isMobile){this._movieController.stop();
if(AC.Detector.isIEStrict()){this.controllerPanel.hide()}this.controllerPanel.addClassName("inactive")
}}else{if(this._movieController&&this._movieController.movie&&this.hasMovie()&&!this.isMobile){this._movieController.Stop();
this._movieController.detachFromMovie();this.controllerPanel.addClassName("inactive");
this._movieController.replay=this.replayMovie.bind(this);this.controllerPanel.observe("click",this._movieController.replay)
}}},_closeMovie:function(){if((!AC.Detector.isIEStrict()||this.isValidQTAvailable())&&this.movie&&this.moviePanel){this.movie.remove();
this.movie=null;this.moviePanel.innerHTML="";if(this._movieControls){this._movieControls.reset()
}}},stopMovieWithNoEndState:function(){}});AC.ViewMaster.AudioGallery=Class.create();
if(Event.Listener){Object.extend(AC.ViewMaster.AudioGallery.prototype,Event.Listener)
}Object.extend(AC.ViewMaster.AudioGallery.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.ViewMaster.AudioGallery.prototype,{viewMasterId:"AudioGallery",_superInitialize:AC.ViewMaster.Viewer.prototype.initialize,initialize:function(d,a,e,c,b){if(!a){a=document.createElement("div");
document.body.appendChild(a)}a.style.left="0px";a.style.top="0px";a.style.width="1px";
a.style.height="1px";a.style.position="fixed";if(!b){b={}}if(b.shouldAnimateContentChange==null){b.shouldAnimateContentChange=false
}b.silentTriggers=true;this._superInitialize(d,a,e,b);if(Event.Listener){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.viewMasterWillShowNotificationCallback.bind(this))
}this.slideshow=new AC.ViewMaster.Slideshow(this,c,b)},createSectionForContent:function(a){return new AC.ViewMaster.AudioSection(a,this)
},viewMasterWillShowNotificationCallback:function(c){var d=c.event_data.data,b=d.sender,a=d.incomingView;
if(b&&b.viewMasterId!="AudioGallery"&&this.currentSection){if(a){if(!a.content.down(this.currentSection.content)||!a.content.down(this.currentSection.movieLink)){this.show(null,true)
}}}},_superTriggerClicked:AC.ViewMaster.Viewer.prototype.triggerClicked,triggerClicked:function(a,b){if(!AC.Detector.isMobile()){this._superTriggerClicked(a,b)
}}});
