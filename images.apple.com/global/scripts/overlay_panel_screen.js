if(typeof(AC)=="undefined"){AC={}}AC.OverlayScreen=Class.create();Object.extend(AC.OverlayScreen.prototype,Event.Listener);
Object.extend(AC.OverlayScreen.prototype,Event.Publisher);Object.extend(AC.OverlayScreen.prototype,{initialize:function(b){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
this.listenForEvent(b,"beforeClose",false,this.willClose);this.bindSetDimensions=this.setDimensions.bind(this)
},screen:function(b){this._screen=new Element("div",{id:"OverlayPanelScreen",className:"overlaypanelscreen",style:"position:absolute; display:none; top:0; left:0;"});
document.body.appendChild(this._screen);this.setDimensions();this._screen.observe("click",b.close.bindAsEventListener(b))
},setDimensions:function(){var e=$(document.documentElement);var g=e.getDimensions();
var h=g.width;if(document.body.clientWidth>h){h=document.body.clientWidth}var f=g.height;
if(document.body.clientHeight>f){f=document.body.clientHeight}this._screen.setStyle({width:h+"px",height:f+"px"})
},escape:function(b){this._escape=Event.observe(window,"keyup",function(a){if(a.keyCode==Event.KEY_ESC){if(b.currentSection){b.close()
}}}.bind(b))},willShow:function(d){var f=d.event_data.data.sender;var e=d.event_data.data.incomingView;
if(f.overlay){if(!this._escape){this.escape(f)}if(e){if(!this._screen){this.screen(f)
}Event.observe((document.onresize?document:window),"resize",this.bindSetDimensions);
new Effect.Appear(this._screen,{duration:1,from:0,to:AC.OverlayScreen.opacity})
}}},willClose:function(e,h,f){var g=e.event_data.data;if(g.overlay&&this._screen){Event.stopObserving((document.onresize?document:window),"resize",this.bindSetDimensions);
new Effect.Fade(this._screen,{duration:0.3,afterFinish:function(a){a.element.setOpacity(0)
}})}}});AC.OverlayScreen.opacity=0.85;Event.onDOMReady(function(){AC.OverlayPanel.overlayScreen=new AC.OverlayScreen(AC.OverlayPanel.overlay)
});