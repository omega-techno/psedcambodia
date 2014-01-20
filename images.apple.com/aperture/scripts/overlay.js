NestedOverlay={};Object.extend(NestedOverlay,Event.Listener);Object.extend(NestedOverlay,Event.Publisher);
Object.extend(NestedOverlay,{overlayShadowImageSrc:"http://images.apple.com/global/elements/zoomerlay/zoomerlay_bg.png",init:function(){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,this.didShow);
this.listenForEvent(AC.OverlayPanel.overlay,"beforeClose",false,this.beforeClose)
},willShow:function(a){var c=a.event_data.data;if(c.incomingView){if(c.incomingView.content.match(".nested")){AC.OverlayPanel.overlay.setOverlayShadowImageSrc(this.overlayShadowImageSrc)
}else{if(c.sender.type=="nested"){var f=c.incomingView.content.down("h2"),b=c.incomingView.triggers(),e;
if(trigger=b[0]){e=trigger.down("strong")}if(f&&e){f.innerHTML=e.innerHTML}}}}if(typeof(movieToPause)!="undefined"){if(c.sender==AC.OverlayPanel.overlay){if(c.incomingView){if(movieToPause&&typeof(movieToPause.sectionWithId)=="function"){var d=movieToPause.sectionWithId("movieposter");
if(d&&movieToPause.currentSection&&movieToPause.currentSection._movieController){this.wasPlaying=movieToPause.currentSection._movieController.playing();
this.movieType=movieToPause.currentSection._movieController.movieType();movieToPause.view.view().addClassName("moviealt");
if(this.wasPlaying===true&&this.movieType=="Video"){movieToPause.currentSection._movieController.pause()
}else{if(!movieToPause.currentSection.content.down(".endState")){movieToPause.show(d)
}}}}}else{if(movieToPause&&typeof(movieToPause.sectionWithId)=="function"){var d=movieToPause.sectionWithId("movie");
movieToPause.view.view().removeClassName("moviealt");if(this.wasPlaying===true&&this.movieType=="Video"){movieToPause.currentSection._movieController.play()
}else{if(movieToPause.currentSection!=d){movieToPause.show(d)}}}this.wasPlaying=null;
this.movieType=null}}}},didShow:function(a){var b=a.event_data.data;if(b.incomingView&&b.incomingView.content.match(".nested")){this.createNested(b.incomingView)
}},createNested:function(f){if(!f.nested){var g=f.id.replace(/overlay-/,"");var c="nested-"+g;
var e="nested-trigger-"+g;var d=f.content.down(".nested-swap");d.id=c;var a=f.content.select("a.nested-trigger");
for(var b=a.length-1;b>=0;b--){a[b].addClassName(e)}f.nested=new AC.ViewMaster.Viewer(a,d,e,{silentTriggers:true,shouldAnimateContentChange:false});
f.nested.type="nested"}else{f.nested.showFirst()}},beforeClose:function(a){var b=a.event_data.data;
if(!b||!b.currentSection||!b.currentSection.nested||!b.currentSection.nested.currentSection){return
}b.currentSection.nested.show(null,true)}});Event.onDOMReady(NestedOverlay.init.bind(NestedOverlay));
