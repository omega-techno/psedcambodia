(function(){var g=AC.retail.util.generateExtension;var h=function(a){this.timeout=null;
this.images=a;this.willShow=this.__willShow.bindAsEventListener(this);this.didShow=this.__didShow.bindAsEventListener(this);
this.afterPop=this.__afterPop.bindAsEventListener(this);this.afterClose=this.__afterClose.bindAsEventListener(this);
Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow);
Event.Listener.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,this.didShow);
Event.Listener.listenForEvent(AC.OverlayPanel.overlay,"afterPop",false,this.afterPop);
Event.Listener.listenForEvent(AC.OverlayPanel.overlay,"afterClose",false,this.afterClose)
};h.prototype={init:function(){if(typeof this.vr!=="undefined"){return}this.cube=new AC.Cube360.Shapes.Cube(this.images);
this.vr=new AC.Cube360("cube360",this.cube);this.__setupScrim()},__setupScrim:function(){this.scrim=this.vr.elements.view().up().down(".scrim");
if(this.vr.shouldUseDeviceMotion()){this.scrim.addClassName("device-motion")}this.scrim.__eventHandlers={};
this.scrim.__eventHandlers.interactionStart=this.killScrim.bindAsEventListener(this);
this.scrim.__eventHandlers.transitionEnd=this.__scrimTransitionEnd.bindAsEventListener(this);
this.vr.elements.view().observe("mousedown",this.scrim.__eventHandlers.interactionStart);
this.vr.elements.view().observe("touchstart",this.scrim.__eventHandlers.interactionStart);
this.scrim.addVendorEventListener("webkitTransitionEnd",this.scrim.__eventHandlers.transitionEnd)
},__scrimTransitionEnd:function(a){this.scrim.hide()},killScrim:function(){this.scrim.setStyle("opacity:0");
window.clearTimeout(this.timeout)},animate:function(){if(this.vr.shouldUseDeviceMotion()===false){this.vr.setRotation(0,0,0);
this.vr.animate(null,360,null,60,"deg","linear")}},reset:function(){if(typeof this.vr!=="undefined"){this.vr.cancelAnimation();
window.clearTimeout(this.timeout);this.scrim.setStyle("opacity:1");this.scrim.show()
}},__willShow:function(a){if(a.event_data.data.sender.view.view().id==="store-gallery"){if(a.event_data.data.incomingView.id==="storeVR"){this.threeSixtyIsCurrent=true
}else{this.threeSixtyIsCurrent=false}if(this.threeSixtyIsCurrent){if(typeof this.vr==="undefined"){this.init()
}this.timeout=window.setTimeout(this.killScrim.bind(this),3000)}}},__didShow:function(a){if(a.event_data.data.sender.view.view().id==="store-gallery"){if(this.threeSixtyIsCurrent){this.animate()
}else{this.reset()}}},__afterPop:function(a){if(this.threeSixtyIsCurrent){this.animate()
}},__afterClose:function(a){this.reset()}};var f=null;var e=function(){f=AC.Detector.hasGyro();
if(f===null){window.setTimeout(e,10)}};e();Event.onDOMReady(function(){if(AC.Cube360.shouldCreate360()){var d,j,b=document.getElementById("galleryoverlay"),a=b.getAttribute("data-init-store"),c=document.location.href.match(/^(http|https):\/\/(.+)\/retail/i)[0]+"/store/galleries/";
if((!AC.Detector.isMobile()&&!AC.Detector.isiPad())||(f||AC.Detector.iOSVersion()>=5)){j=[c+a+"/images/cube360/top"+g("jpg"),c+a+"/images/cube360/north"+g("jpg"),c+a+"/images/cube360/east"+g("jpg"),c+a+"/images/cube360/south"+g("jpg"),c+a+"/images/cube360/west"+g("jpg"),c+a+"/images/cube360/bottom"+g("jpg")]
}else{j=[c+a+"/images/cube360/top_lowres"+g("jpg"),c+a+"/images/cube360/north_lowres"+g("jpg"),c+a+"/images/cube360/east_lowres"+g("jpg"),c+a+"/images/cube360/south_lowres"+g("jpg"),c+a+"/images/cube360/west_lowres"+g("jpg"),c+a+"/images/cube360/bottom_lowres"+g("jpg")]
}var d=new h(j)}else{$("trigger-360").remove()}})}());