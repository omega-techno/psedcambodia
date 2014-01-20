if(typeof AC==="undefined"){AC={}}AC.QuickTime={_createNullMovie:function(c,a){c=0;
a=0;var f=$(document.createElement("div")),b="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",e="http://qtinstall.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0",d="../../quicktime/download/index.html";
f.innerHTML='<object width="'+c+'" height="'+a+'" classid="'+b+'" codebase="'+e+'"><embed width="'+c+'" height="'+a+'" type="video/quicktime" pluginspage="'+d+'"></embed></object>';
return f},minVersion:function(){return"7"},packageMovie:function(c,a,b){if(!c||!a){throw new TypeError("Valid Name and File URL are required arguments.")
}var e=AC.QuickTime.minVersion(),d=null;if(b&&b.minVersion){e=b.minVersion}if(!AC.Detector.isMobile()&&!AC.Detector.isiPad()&&!AC.Detector.isValidQTAvailable(e)){d=$(document.createElement("a"));
d.addClassName("quicktime-download");d.setAttribute("href","../../quicktime/download/index.html");
d.innerHTML=b.downloadText||"QuickTime required. Free download";$$("body")[0].fire("QuickTime:noCompatibleQTAvailable",{controller:this,minVersion:e});
return d}if(AC.Detector.isIEStrict()){AC.QuickTime.createEventSource()}if(b&&!!b.factory){return b.factory.create.call(b.factory,c,a,b)
}else{return AC.QuickTime.Factory.Plugin.create(c,a,b)}},createEventSource:function(){var c="qt_event_source",b,a;
if(document.getElementById(c)){return}b=document.createElement("object");b.id=c;
b.setAttribute("clsid","CB927D12-4FF7-4a9e-A169-56E4B8A75598");a=document.getElementsByTagName("head")[0];
a.appendChild(b)}};AC.Quicktime=AC.QuickTime;AC.QuickTime.Factory={Combined:{create:function(c,a,b){var e=null,d=null;
e=AC.QuickTime.Factory.Plugin.create(c,a,b);if(AC.Detector.isIEStrict()){return e
}else{d=AC.QuickTime.Factory.Video.create(c,a,b);d.appendChild(e);return d}}},Plugin:{create:function(d,b,c){var e=this._createOuterObject(d,b,c),a=null;
if(!AC.Detector.isIEStrict()){a=this._createInnerObject(d,b,c);e.appendChild(a);
e.inner=a}else{e.style.behavior="url(#qt_event_source)";if(c.aggressiveCleanup!==false){Event.observe(window,"unload",function(){try{e.Stop()
}catch(f){}e.style.display="none";e=null})}}this._configure(a,e,c);this._addParameter(e,"saveembedtags",true);
this._addParameter(a,"saveembedtags",true);this._addParameter(e,"postdomevents",true);
this._addParameter(a,"postdomevents",true);e.setAttribute("classid","clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B");
return e},_configure:function(a,e,c){if(!c){return false}var d=null,b=null;for(d in c){if(c.hasOwnProperty(d)){b=d.toLowerCase();
switch(b){case ("type"):case ("src"):case ("data"):case ("classid"):case ("name"):case ("id"):case ("postdomevents"):case ("saveembedtags"):case ("factory"):case ("aggressiveCleanup"):break;
case ("class"):Element.addClassName(e,c[d]);break;case ("innerId"):if(a){a.setAttribute("id",c[d])
}break;case ("autoplay"):this._addParameter(e,"autostart",c[d]);this._addParameter(a,"autostart",c[d]);
break;case ("width"):case ("height"):e.setAttribute(b,c[d]);if(a){a.setAttribute(b,c[d])
}break;default:this._addParameter(e,b,c[d]);this._addParameter(a,b,c[d]);break}}}},_addParameter:function(b,a,c){if(!b){return
}var d=document.createElement("param");d.setAttribute("value",c);d.setAttribute("name",a);
b.appendChild(d);d=null},_createOuterObject:function(c,a,b){var e=document.createElement("object"),d="7,3,0,0";
if((AC.Detector.isMobile()||AC.Detector.isiPad())&&b.posterFrame){this._addParameter(e,"src",b.posterFrame);
this._addParameter(e,"href",a);this._addParameter(e,"target","myself")}else{this._addParameter(e,"src",a)
}e.setAttribute("id",c);if(null!==b&&(typeof b.codebase!=="undefined")&&""!==b.codebase){d=b.codeBase
}e.setAttribute("codebase","http://www.apple.com/qtactivex/qtplugin.cab#version="+d);
return e},_createInnerObject:function(d,b,c){var a=document.createElement("object");
a.setAttribute("type","video/quicktime");a.setAttribute("data",b);a.setAttribute("id",d+"Inner");
a.setAttribute("name",d);return a}},Video:{create:function(c,a,b){var d=document.createElement("video");
d.setAttribute("id",c);d.setAttribute("src",a);this._configure(d,b);return d},_configure:function(c,b){if(!b){return false
}var d=null,a=null;for(d in b){if(b.hasOwnProperty(d)){a=d.toLowerCase();switch(a){case ("type"):case ("src"):case ("data"):case ("classid"):case ("name"):case ("id"):case ("postdomevents"):case ("saveembedtags"):case ("factory"):case ("aggressiveCleanup"):case ("innerId"):case ("cache"):case ("wmode"):case ("aggressivecleanup"):case ("showlogo"):break;
case ("class"):Element.addClassName(c,b[d]);break;case ("controller"):if(b[d]){c.setAttribute("controls","controls")
}break;case ("autoplay"):case ("autostart"):if(b[d]){c.setAttribute("autoplay","autoplay")
}break;default:c.setAttribute(a,b[d]);break}}}}},Audio:{},Null:{}};AC.QuickTime.States={Polling:{isAvailable:function(a){return true
},toString:function(){return"Polling State"},detachFromMovie:Prototype.emptyFunction,reset:Prototype.emptyFunction,_monitor:function(){var b=this.isPlaying(),a=null;
if(!this._acknowledgedPlayable){a=this.GetPluginStatus();if("Playable"===a||"Complete"===a){this._didBecomePlayable()
}}else{if(!this.isJogging){if(b&&!this.playing){this._didStart()}else{if(!b&&this.playing){this._didStop()
}}}}this.updateController();if(this.movie!==null){this.movieWatcher=setTimeout(AC.Quicktime.States.Polling._monitor.bind(this),this._monitorDelay)
}},monitorMovie:function(){this.movieWatcher=setTimeout(AC.Quicktime.States.Polling._monitor.bind(this),this._monitorDelay)
}},Events:{eventNames:{plugin:{loadstart:"loadstart",progress:"qt_progress",loadedmetadata:"loadedmetadata",loadedfirstframe:"loadedfirstframe",load:"load",abort:"abort",error:"error",emptied:"emptied",stalled:"stalled",play:"qt_play",pause:"qt_pause",waiting:"waiting",seeking:"seeking",seeked:"seeked",timeupdate:"timeupdate",ended:"qt_ended",dataunavailable:"dataunavailable",canshowcurrentframe:"canshowcurrentframe",canplay:"canplay",canplaythrough:"qt_canplaythrough",ratechange:"ratechange",durationchange:"durationchange",volumechange:"volumechange"},video:{loadstart:"loadstart",progress:"progress",loadedmetadata:"loadedmetadata",loadedfirstframe:"loadedfirstframe",load:"load",abort:"abort",error:"error",emptied:"emptied",stalled:"stalled",play:"play",pause:"pause",waiting:"waiting",seeking:"seeking",seeked:"seeked",timeupdate:"timeupdate",ended:"ended",dataunavailable:"dataunavailable",canshowcurrentframe:"canshowcurrentframe",canplay:"canplay",canplaythrough:"canplaythrough",ratechange:"ratechange",durationchange:"durationchange",volumechange:"volumechange"}},isAvailable:function(a){return AC.Detector.isQTCompatible("7.3")
},toString:function(){return"DOM Event State"},detachFromMovie:function(){var a=AC.QuickTime.States.Events._eventNames(this.movie);
Event.stopObserving(this.movie,a.canplaythrough,this._didBecomePlayableCallback);
Event.stopObserving(this.movie,a.pause,this._didStopCallback);Event.stopObserving(this.movie,a.play,this._didStartCallback)
},_eventNames:function(a){var b=a.tagName.match(/video/i)?AC.QuickTime.States.Events.eventNames.video:AC.QuickTime.States.Events.eventNames.plugin;
return b},reset:Prototype.emptyFunction,_monitor:function(){var a=null,b;if(!this._acknowledgedPlayable){a=this.GetPluginStatus();
if("Playable"===a||"Complete"===a){this._didBecomePlayable();if(this.isPlaying()){this._didStart()
}b=AC.QuickTime.States.Events._eventNames(this.movie);this._didStartCallback=this._didStart.bind(this);
Event.observe(this.movie,b.play,this._didStartCallback)}}this.updateController();
if(this.movie!==null){this.movieWatcher=setTimeout(AC.Quicktime.States.Events._monitor.bind(this),this._monitorDelay)
}},monitorMovie:function(){if(!this._hasBegunMonitoring){var a=AC.QuickTime.States.Events._eventNames(this.movie);
this._didStopCallback=this._didStop.bind(this);Event.observe(this.movie,a.pause,this._didStopCallback);
Event.observe(this.movie,a.ended,this._didStopCallback)}this.movieWatcher=setTimeout(AC.Quicktime.States.Events._monitor.bind(this),this._monitorDelay)
}}};AC.QuickTime.Controller=Class.create();AC.QuicktimeController=AC.QuickTime.Controller;
AC.QuickTimeController=AC.QuickTime.Controller;AC.QuickTime.Controller.prototype={movie:null,options:null,movieAttacher:null,attachDelay:500,movieWatcher:null,normalMonitorDelay:480,longMonitorDelay:4800,_monitorDelay:480,_hasBegunMonitoring:false,currentTime:0,percentLoaded:0,maxBytesLoaded:0,movieSize:0,allowAttach:true,controllerPanel:null,currentControl:null,playControl:null,pauseControl:null,slider:null,track:null,playHead:null,loadedProgress:null,state:null,_closedCaptionsAvailable:false,_closedCaptionsEnabled:false,_closedCaptionTrackIndex:4,_acknowledgedPlayable:false,isJogging:false,hardPaused:false,duration:0,finished:false,playing:false,unloader:null,initialize:function(a,b){this._eventSource=$$("body")[0];
this.options=b||{};if(this.options.delegate){this.setDelegate(this.options.delegate)
}if(this.options.renderInto){this.render(this.options.renderInto)}this.attachToMovie(a,b)
},setDelegate:function(a){this.delegate=a},setState:function(b,a){if(typeof(b)!=="undefined"){this.state=b
}else{this.state=AC.Quicktime.States.Polling}},attachToMovie:function(a,b){if(!a||!this.allowAttach){return
}if(!$(a)){throw"Movie has to be appended to document prior to attaching to with a controller."
}if(this.movie){this.detachFromMovie()}this._trackTypes=[];this._trackNames=[];
this._chapterNames=[];clearInterval(this.movieAttacher);if(typeof b!=="undefined"){this.options=b
}if(!this.unloader){this.unloader=this.detachFromMovie.bind(this);Event.observe(window,"unload",this.unloader)
}this._startLoadingIndicator(a);this.movieAttacher=setInterval(this._attach.bind(this,a),this.attachDelay);
a=null},_attach:function(a){if(!this.allowAttach){return}var b;try{this.movie=this._responsiveMediaElement(a)
}catch(b){this.movie=null}if(this.movie){clearInterval(this.movieAttacher);this.setState(this.options.state);
this.movieIsVideo=!!this.movie.tagName.match(/video/i);if(this.delegate&&typeof this.delegate.didAttach==="function"){this.delegate.didAttach(this)
}this._eventSource.fire("QuickTime:didAttach",{controller:this});this.monitorMovie()
}a=null},_startLoadingIndicator:function(a){this._movieContainer=a.parentNode;Element.addClassName(this._movieContainer,"movie-loading");
if(this.controllerPanel){Element.addClassName(this.controllerPanel,"movie-loading")
}},_stopLoadingIndicator:function(){if(this._movieContainer){Element.removeClassName(this._movieContainer,"movie-loading");
this._movieContainer=null}if(this.controllerPanel){Element.removeClassName(this.controllerPanel,"movie-loading")
}},_responsiveMediaElement:function(a){try{if(!a){return null}else{if(a.play||a.Play){return a
}else{return this._responsiveMediaElement(a.down("video, object, embed"))}}}catch(b){if(a.GetPluginStatus()){return a
}else{return this._responsiveMediaElement(a.down("video, object, embed"))}return null
}},detachFromMovie:function(){this.allowAttach=false;if(this.state){this.state._monitor.call(this);
this.state.detachFromMovie.call(this)}clearInterval(this.movieAttacher);clearTimeout(this.movieWatcher);
this.movie=null;this.reset();this._trackTypes=null;this._trackNames=null;this._chapterNames=null;
Event.stopObserving(window,"unload",this.unloader);this.unloader=null;this.allowAttach=true;
if(this.delegate&&typeof this.delegate.didDetach==="function"){this.delegate.didDetach(this)
}this._eventSource.fire("QuickTime:didDetach",{controller:this})},monitorMovie:function(){if(!this.movie){throw new Error("Cannot begin monitoring until attached to a movie")
}this.state.monitorMovie.call(this);if(this.controllerPanel!==null&&!this._hasBegunMonitoring){this.slider=new Control.Slider(this.playHead,this.track,{onSlide:function(a){if(isNaN(a)){return
}this.trackProgress.style.width=this.slider.translateToPx(a);if(!this.isJogging){this._didStartJogging()
}this.SetTime(a*this.GetDuration())}.bind(this),onChange:function(a){if(isNaN(a)){return
}if(this.isJogging){this._didStopJogging()}this.trackProgress.style.width=this.slider.translateToPx(a)
}.bind(this)});this.slider.updateStyles=Prototype.emptyFunction}this._hasBegunMonitoring=true
},_didBecomePlayable:function(){this._stopLoadingIndicator();this.updateController();
if(this._acknowledgedPlayable){return}this._acknowledgedPlayable=true;this._checkForClosedCaptions();
if(this.options.onMoviePlayable&&typeof this.options.onMoviePlayable==="function"){this.options.onMoviePlayable()
}if(this.delegate&&typeof this.delegate.didBecomePlayable==="function"){this.delegate.didBecomePlayable(this)
}this._eventSource.fire("QuickTime:canplaythrough",{controller:this})},playedCount:0,_didStart:function(){if(this.wasJogging){this.wasJogging=false;
return}this.playing=true;if(this.controllerPanel){this.controllerPanel.replaceChild(this.pauseControl,this.currentControl);
this.currentControl=this.pauseControl}if(typeof this.options.onMovieStart==="function"){this.options.onMovieStart()
}if(0===this.playedCount){if(this.delegate&&typeof this.delegate.didBegin==="function"){this.delegate.didBegin(this)
}this._eventSource.fire("QuickTime:begin",{controller:this})}else{if(this.delegate&&typeof this.delegate.didStart==="function"){this.delegate.didStart(this)
}this._eventSource.fire("QuickTime:start",{controller:this})}this.playedCount+=1
},_didStop:function(){if(this.isJogging){return}this.playing=false;if(this.controllerPanel){this.controllerPanel.replaceChild(this.playControl,this.currentControl);
this.currentControl=this.playControl}if(typeof this.options.onMovieStop==="function"){this.options.onMovieStop()
}var b=this.GetTime(),a=this.GetDuration();if(b>=a){this._didPlayProgress(a,a);
if(this.options.onMovieFinished&&typeof this.options.onMovieFinished==="function"){this.options.onMovieFinished()
}if(this.delegate&&typeof this.delegate.didEnd==="function"){this.delegate.didEnd(this)
}this._eventSource.fire("QuickTime:end",{controller:this})}else{if(this.delegate&&typeof this.delegate.didStop==="function"){this.delegate.didStop(this)
}this._eventSource.fire("QuickTime:stop",{controller:this})}},reset:function(){if(this.state){this.state.reset.call(this)
}this.duration=0;this.movieSize=0;this.maxBytesLoaded=0;this.percentLoaded=0;this.movieIsVideo=false;
this._acknowledgedPlayable=false;this.playedCount=0;this._hasBegunMonitoring=false;
this._monitorDelay=this.normalMonitorDelay;this._trackCount=NaN;this._trackTypes=[];
this._trackNames=[];this._chapterCount=NaN;this._chapterNames=[];this.setClosedCaptionsEnabled(false);
this._setClosedCaptionsAvailable(false);delete this.timeScale;if(this.slider){this.slider.setValue(0);
this.slider.trackLength=this.slider.maximumOffset()-this.slider.minimumOffset()
}this._stopLoadingIndicator();if(this.loadedProgress){this.loadedProgress.style.width="0px"
}},render:function(a){if(typeof a!=="undefined"&&!$(a)){throw new Error("Specified container ID, '"+a+"' not found in DOM")
}this.controllerPanel=$(document.createElement("div"));Element.addClassName(this.controllerPanel,"ACQuicktimeController");
this.playControl=document.createElement("div");Element.addClassName(this.playControl,"control");
Element.addClassName(this.playControl,"play");this.playControl.innerHTML="Play";
this.playControl.onclick=this.Play.bind(this);this.pauseControl=document.createElement("div");
Element.addClassName(this.pauseControl,"control");Element.addClassName(this.pauseControl,"pause");
this.pauseControl.innerHTML="Pause";this.pauseControl.onclick=this.Stop.bind(this);
var b=false;if(null!==this.movie){b=this.GetAutoPlay()}this.currentControl=(b)?this.pauseControl:this.playControl;
this.controllerPanel.appendChild(this.currentControl);this.sliderPanel=document.createElement("div");
Element.addClassName(this.sliderPanel,"sliderPanel");this.track=document.createElement("div");
Element.addClassName(this.track,"track");this.sliderPanel.appendChild(this.track);
this.loadedProgress=document.createElement("div");Element.addClassName(this.loadedProgress,"loadedProgress");
this.track.appendChild(this.loadedProgress);this.trackProgress=document.createElement("div");
Element.addClassName(this.trackProgress,"trackProgress");this.track.appendChild(this.trackProgress);
this.playHead=document.createElement("div");Element.addClassName(this.playHead,"playHead");
this.track.appendChild(this.playHead);this.controllerPanel.appendChild(this.sliderPanel);
this.timeDisplay=document.createElement("div");Element.addClassName(this.timeDisplay,"timeDisplay");
this.controllerPanel.appendChild(this.timeDisplay);if(a){$(a).appendChild(this.controllerPanel);
this.trackWidth=Element.getDimensions(this.track).width;if(this.delegate&&typeof this.delegate.didRenderController==="function"){this.delegate.didRenderController(this)
}this._eventSource.fire("QuickTime:didRenderController",{controller:this});if(this.movie){this.monitorMovie()
}}return this.controllerPanel},setTimeDisplayString:function(a){if(this.timeDisplay){this.timeDisplay.innerHTML=a
}},updateController:function(a){if(!this.controllerPanel){return}this._checkForClosedCaptions();
this._updateControllerLoadedProgress();if(this.isJogging||this.isPlaying()){var d=this.currentTime,b=this.GetTime(),c=this.GetDuration();
if(!isNaN(d)&&!isNaN(b)&&d!==b){if(!this.isJogging){this.slider.setValue(b/c)}this._didPlayProgress(b,c)
}}},_hasCheckedTracksForClosedCaptions:false,_checkForClosedCaptions:function(){if(this._hasCheckedTracksForClosedCaptions){return
}var a=this.GetTrackCount(),b;if(isNaN(a)){return}this._hasCheckedTracksForClosedCaptions=true;
for(b=1;b<=a;b++){if("Closed Caption"===this.GetTrackType(b)){this._closedCaptionTrackIndex=b;
this._setClosedCaptionsAvailable(true)}}},_didPlayProgress:function(a,b){if(this.delegate&&typeof this.delegate.didPlayProgress==="function"){this.delegate.didPlayProgress(this,a,b)
}this._eventSource.fire("QuickTime:didPlayProgress",{controller:this,currentTime:a,duration:b})
},_updateControllerLoadedProgress:function(d){if(this.percentLoaded<1||d){var a=Element.getDimensions(this.track).width,c=this.GetMaxBytesLoaded()/this.GetMovieSize(),b=0;
if(!isNaN(c)&&0!==c){this.percentLoaded=c}b=a*this.percentLoaded;Element.setStyle(this.loadedProgress,{width:b+"px"})
}},_didStartJogging:function(){if(!this.isJogging){this.playAfterJog=this.isPlaying();
this.isJogging=true;this.Stop();var a=this.GetTime();if(this.delegate&&typeof this.delegate.didStartJogging==="function"){this.delegate.didStartJogging(this,a)
}this._eventSource.fire("QuickTime:didStartJogging",{controller:this,time:a})}},_didStopJogging:function(){this.isJogging=false;
var a=this.GetTime();if(this.delegate&&typeof this.delegate.didStopJogging==="function"){this.delegate.didStopJogging(this,a)
}this._eventSource.fire("QuickTime:didStopJogging",{controller:this,time:a});if(this.playAfterJog){this.wasJogging=true;
this.Play()}},Play:function(){if(null!==this.movie){try{if(this.movieIsVideo){this.movie.play()
}else{this.movie.Play()}}catch(a){}}},Stop:function(){if(null!==this.movie){try{if(this.movieIsVideo){this.movie.pause()
}else{this.movie.Stop()}}catch(a){}}},Rewind:function(){if(null!==this.movie){this.movie.Stop();
this.movie.Rewind()}},Step:function(a){this.movie.Step(a)},ShowDefaultView:function(){this.movie.ShowDefaultView()
},GoPreviousNode:function(){this.movie.GoPreviousNode()},GetQuicktimeVersion:function(){return this.movie.GetQuickTimeVersion()
},GetQuicktimeLanguage:function(){return this.movie.GetQuicktimeLanguage()},GetQuicktimeConnectionSpeed:function(){return this.movie.GetQuicktimeConnectionSpeed()
},GetIsQuickTimeRegistered:function(){return this.movie.GetIsQuickTimeRegistered()
},GetComponentVersion:function(){return this.movie.GetComponentVersion()},GetPluginVersion:function(){return this.movie.GetPluginVersion()
},ResetPropertiesOnReload:function(){this.movie.ResetPropertiesOnReload()},GetPluginStatus:function(){if(!this.movieIsVideo){try{return this.movie.GetPluginStatus()
}catch(b){return"Waiting"}}else{var a=this.movie.readyState;return a>2?"Playable":"Waiting"
}},GetAutoPlay:function(){return this.movie.GetAutoPlay()},SetAutoPlay:function(a){this.movie.SetAutoPlay(a)
},GetControllerVisible:function(){return this.movie.GetControllerVisible()},SetControllerVisible:function(a){this.movie.SetControllerVisible(a)
},GetRate:function(){return this.movie.GetRate()},SetRate:function(a){this.movie.SetRate()
},GetTime:function(){var b=null;try{if(this.movieIsVideo){b=this.movie.currentTime
}else{b=this.movie.GetTime()}}catch(a){}if(null===b){b=this.currentTime+this._monitorDelay
}else{this.currentTime=b}return b||0},SetTime:function(b){try{if(this.movieIsVideo){this.movie.currentTime=b
}else{this.movie.SetTime(b)}}catch(a){}},GetVolume:function(){return this.movie.GetVolume()
},SetVolume:function(a){this.movie.SetVolume(a)},GetMute:function(){return this.movie.GetMute()
},SetMute:function(a){this.movie.SetMute(a);this.setClosedCaptionsEnabled(a)},GetMovieName:function(){return this.movie.GetMovieName()
},SetMovieName:function(a){this.movie.SetMovieName(a)},GetMovieID:function(){return this.movie.GetMovieID()
},SetMovieID:function(a){this.movie.SetMovieID(a)},GetStartTime:function(){return this.movie.GetStartTime()
},SetStartTime:function(a){this.movie.SetStartTime(a)},GetEndTime:function(){return this.movie.GetEndTime()
},SetEndTime:function(a){this.movie.SetEndTime(a)},GetBgColor:function(){return this.movie.GetBgColor()
},SetBgColor:function(a){this.movie.SetBgColor(a)},GetIsLooping:function(){return this.movie.GetIsLooping()
},SetIsLooping:function(a){this.movie.SetIsLooping(a)},GetLoopIsPalindrome:function(){return this.movie.GetLoopIsPalindrome()
},SetLoopIsPalindrome:function(a){this.movie.SetLoopIsPalindrome(a)},GetPlayEveryFrame:function(){return this.movie.GetPlayEveryFrame()
},SetPlayEveryFrame:function(a){this.movie.SetPlayEveryFrame(a)},GetHREF:function(){return this.movie.GetHREF()
},SetHREF:function(a){this.movie.SetHREF(a)},GetTarget:function(){return this.movie.GetTarget()
},SetTarget:function(a){this.movie.SetTarget(a)},GetQTNEXTUrl:function(){return this.movie.GetQTNEXTUrl()
},SetQTNEXTUrl:function(b,a){this.movie.SetQTNEXTUrl(b,a)},GetURL:function(){return this.movie.GetURL()
},SetURL:function(a){if(!!this.movie.tagName.match(/video/i)){this.movie.src=a;
this.movie.load()}else{this.movie.SetURL(a)}this.reset()},GetKioskMode:function(){return this.movie.GetKioskMode()
},SetKioskMode:function(a){this.movie.SetKioskMode(a)},GetDuration:function(){if(null===this.duration||0===this.duration||isNaN(this.duration)||this.duration===Infinity){try{if(this.movieIsVideo){this.duration=this.movie.duration
}else{this.duration=this.movie.GetDuration()}}catch(a){this.duration=0}}return this.duration
},GetMaxTimeLoaded:function(){return this.movie.GetMaxTimeLoaded()},GetTimeScale:function(){if(typeof this.timeScale!=="undefined"){return this.timeScale
}try{if(this.movieIsVideo){this.timeScale=2997}else{this.timeScale=this.movie.GetTimeScale()
}}catch(a){}return this.timeScale},GetMovieSize:function(){if(0===this.movieSize){try{if(this.movieIsVideo){this.movieSize=this.movie.totalBytes
}else{this.movieSize=this.movie.GetMovieSize()}}catch(a){this.movieSize=0}}return this.movieSize
},GetMaxBytesLoaded:function(){try{if(this.movieIsVideo){this.maxBytesLoaded=this.movie.bufferedBytes
}else{this.maxBytesLoaded=this.movie.GetMaxBytesLoaded()}}catch(a){}return this.maxBytesLoaded
},_trackCount:NaN,GetTrackCount:function(){if(!isNaN(this._trackCount)){return this._trackCount
}var a=NaN;try{var a=this.movie.GetTrackCount()}catch(b){return NaN}if(a<1){return NaN
}else{this._trackCount=a;return this._trackCount}},GetMatrix:function(){return this.movie.GetMatrix()
},SetMatrix:function(a){this.movie.SetMatrix(a)},GetRectangle:function(){return this.movie.GetRectangle()
},SetRectangle:function(a){this.movie.SetRectangle(a)},GetLanguage:function(){return this.movie.GetLanguage()
},SetLanguage:function(a){this.movie.SetLanguage(a)},GetMIMEType:function(){return this.movie.GetMIMEType()
},GetUserData:function(a){return this.movie.GetUserData(a)},GetIsVRMovie:function(){return this.movie.GetIsVRMovie()
},GetHotspotUrl:function(a){return this.movie.GetHotspotUrl(a)},SetHotspotUrl:function(a,b){this.movie.SetHotspotUrl(a,b)
},GetHotspotTarget:function(a){return this.movie.GetHotspotTarget(a)},SetHotspotTarget:function(a,b){this.movie.SetHotspotTarget(a,b)
},GetPanAngle:function(){return this.movie.GetPanAngle()},SetPanAngle:function(a){this.movie.SetPanAngle(a)
},GetTiltAngle:function(){return this.movie.GetTiltAngle()},SetTiltAngle:function(a){this.movie.SetTiltAngle(a)
},GetFieldOfView:function(){return this.movie.GetFieldOfView()},SetFieldOfView:function(a){this.movie.SetFieldOfView(a)
},GetNodeCount:function(){return this.movie.GetNodeCount()},SetNodeID:function(a){this.movie.SetNodeID(a)
},_trackNames:null,GetTrackName:function(a){if(!this._trackNames){throw"Need to attach to a movie before getting track names"
}if(this._trackNames[a]){return this._trackNames[a]}try{var b=this.movie.GetTrackName(a);
this._trackNames[a]=b;return b}catch(c){if(!this._trackExistsAtIndex(a)){throw"There is no track at the specified index: "+a
}else{return"Unknown"}}},_trackTypes:null,GetTrackType:function(a){if(!this._trackTypes){throw"Need to attach to a movie before getting track types"
}if(this._trackTypes[a]){return this._trackTypes[a]}try{var b=this.movie.GetTrackType(a);
this._trackTypes[a]=b;return b}catch(c){if(!this._trackExistsAtIndex(a)){throw"There is no track at the specified index: "+a
}else{return"Unknown"}}},GetTrackEnabled:function(a){try{return this.movie.GetTrackEnabled(a)
}catch(b){if(!this._trackExistsAtIndex(a)){throw"There is no track at the specified index: "+a
}}},SetTrackEnabled:function(b,a){try{this.movie.SetTrackEnabled(b,a)}catch(c){if(!this._trackExistsAtIndex(b)){throw"There is no track at the specified index: "+b
}}},_trackExistsAtIndex:function(a){return !isNaN(this._trackCount)&&(a<=this._trackCount)&&(a>0)
},GetSpriteTrackVariable:function(b,a){return this.movie.GetSpriteTrackVariable(b,a)
},SetSpriteTrackVariable:function(b,a){this.movie.SetSpriteTrackVariable(b,a)},_chapterCount:NaN,GetChapterCount:function(){if(!isNaN(this._chapterCount)){return this._chapterCount
}try{this._chapterCount=this.movie.GetChapterCount();return this._chapterCount}catch(a){return NaN
}},_chapterNames:null,GetChapterName:function(a){if(!this._chapterNames){throw"Need to attach to a movie before getting chapter names"
}if(this._chapterNames[a]){return this._chapterNames[a]}try{var c=this.movie.GetChapterName(a);
this._chapterNames[a]=c;return c}catch(b){if(!this._chapterExistsAtIndex(a)){throw"There is no chapter at the specified index: "+a
}else{return null}}},GoToChapter:function(a){try{this.movie.GoToChapter(a);return true
}catch(b){return false}},_chapterExistsAtIndex:function(a){return !isNaN(this._chapterCount)&&(a<=this._chapterCount)&&(a>0)
},isPlaying:function(){try{if(this.movieIsVideo){return !this.movie.paused&&!this.movie.ended
}else{return this.movie.GetRate()!==0}}catch(a){return false}},isFinished:function(){try{if(this.movieIsVideo){return this.movie.ended
}var c=this.movie.GetRate()===0,a=this.movie.GetTime()===this.GetDuration();return c&&a
}catch(b){return false}},toggle:function(){if(this.isPlaying()){this.Stop()}else{this.Play()
}},_setClosedCaptionsAvailable:function(a){this._closedCaptionsAvailable=a;if(this.controllerPanel){if(a){if(!this.captioningToggle){this.captioningToggle=document.createElement("div");
Element.addClassName(this.captioningToggle,"captioningToggle");Element.addClassName(this.captioningToggle,"ccAvailable");
Element.addClassName(this.controllerPanel,"ccAvailable");this.captioningToggle.innerHTML="Closed Captioning";
this.captioningToggle.onclick=this.toggleClosedCaptions.bind(this)}if(!this.captioningToggle.parentNode!==this.controllerPanel){this.controllerPanel.appendChild(this.captioningToggle)
}this._updateControllerLoadedProgress(true);this.slider.trackLength=this.slider.maximumOffset()-this.slider.minimumOffset()
}else{if(!a&&this.captioningToggle&&this.captioningToggle.parentNode){this.captioningToggle.parentNode.removeChild(this.captioningToggle)
}}}},toggleClosedCaptions:function(){if(!this._closedCaptionsAvailable){return}this.setClosedCaptionsEnabled(!this._closedCaptionsEnabled)
},setClosedCaptionsEnabled:function(a){if(!this._closedCaptionsAvailable){return
}try{this.SetTrackEnabled(this._closedCaptionTrackIndex,a);if(this.captioningToggle&&a){Element.addClassName(this.captioningToggle,"ccEnabled")
}else{Element.removeClassName(this.captioningToggle,"ccEnabled")}this._closedCaptionsEnabled=a;
if(this.delegate&&typeof this.delegate.didSetClosedCaptions==="function"){this.delegate.didSetClosedCaptions(this,a)
}this._eventSource.fire("QuickTime:didSetClosedCaptions",{controller:this,enabled:a})
}catch(b){}},closedCaptionsEnabled:function(){return this._closedCaptionsEnabled
},suspend:function(){if(this.movieWatcher){clearTimeout(this.movieWatcher);this.movieWatcher=null
}},decelerate:function(){this.setMonitorDelay(this.longMonitorDelay)},resume:function(){if(!this.movie){return
}if(!this.movieWatcher){this.monitorMovie()}else{this.setMonitorDelay(this.normalMonitorDelay)
}},setMonitorDelay:function(a){clearTimeout(this.movieWatcher);this._monitorDelay=a;
this.monitorMovie()},monitorDelay:function(){return this._monitorDelay}};
