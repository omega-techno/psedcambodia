(function(){var c=AC.Class({initialize:function(a){this._element=AC.Element.getElementById(a);
this._viewer=null;this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.6,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Object.synthesize(this);if(!AC.Element.isElement(this.element())){return false
}this.setupViewer();if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this.element(),"can-animate");
this.viewer().setDelegate(this)}},setupViewer:function(){var h=this.element();var b=AC.Element.selectAll(".gallery-content",h);
var g=AC.AutoGallery.Types.Registries.gallery.__lookup["image-fadein"].getOptions();
var a=new AC.ViewMaster.Viewer(b,h,h.id,g);this.setViewer(a)},willAnimate:function(m,k,l,b){var a=(m.orderedSections.indexOf(l.id.replace("MASKED-",""))===1);
var n=this.element();var o=false;var p=function(){if(!o){b();o=true}};if(k){k.setOpacity(0)
}if(l){l.setOpacity(1)}window.setTimeout(function(){if(a){AC.Element.addClassName(n,"second-section")
}else{AC.Element.removeClassName(n,"second-section")}n.addVendorEventListener("transitionEnd",p,true);
window.setTimeout(p,910)},10)},visitorEngaged:function(){this.showOnScroll().stopObserving();
AC.Element.addClassName(this._element,"animate")}});var d=AC.Class({initialize:function(a){this._element=AC.Element.getElementById(a);
if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this._element,"can-animate")
}this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.6,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Object.synthesize(this)},visitorEngaged:function(){this.showOnScroll().stopObserving();
AC.Element.addClassName(this._element,"animate")}});AC.onDOMReady(function(){var b=new d("flash-chart");
var t=new d("wifi-chart");var a=new AC.BatteryClock("clock-wrapper-1",$("clock-wrapper-1"),{angleHours:60,angleMinutes:720,duration:2,initialMinutes:0,initialHours:210,backgroundAngleHours:270,fillStyle:"#80e869",animatedFillStyle:"#5bcc41"});
var q=new AC.BatteryClock("clock-wrapper-2",$("clock-wrapper-2"),{angleHours:30,angleMinutes:360,duration:2,initialMinutes:0,initialHours:210,backgroundAngleHours:240,fillStyle:"#80e869",animatedFillStyle:"#5bcc41"});
if(AC.Environment.Feature.cssPropertyAvailable("transform")){var r=$("ambient-backlit-keyboard");
r.addClassName("ambient-backlit-keyboard-prepped");var p=new AC.ShowOnScroll(r);
var o=false;p.setDelegate({visitorEngaged:function(){if(o===false){r.addClassName("ambient-backlit-keyboard-complete")
}o=true}})}var u=!AC.Detector.isIEStrict();var w=new AC.ViewMaster.Viewer(AC.Element.selectAll(".av .gallery-content"),AC.Element.select("#av-gallery"),"av-gallery",{silentTriggers:true,useKeyboardNav:true,shouldAnimateContentChange:u});
if(AC.Environment.Feature.canvasAvailable()){var s=AC.Element.select("#flash .hero-container");
var v=AC.Element.select("#flash .flow");var x={flow:null,init:function(){var g=".jpg";
var f=(!AC.Environment.Feature.isHandheld()&&AC.Environment.Feature.isRetina())?"_2x":"";
var m="/105/media/us/macbook-pro/2013/flash_hero_flow"+f+"/";var e="flash_hero_flow"+f;
var k=AC.require("flow/playerFactory");var h=new AC.ShowOnScroll(v,{threshold:0.9,timeInView:0.5});
var l=[m+e+"_keyframe"+g,m+e+"_endframe"+g];var i=m+e+"_###"+g;var j=m+e+"_manifest.json";
this.flow=k(v,l,i,j,{superframes:false,keyframeCache:false,benchmark:false});this.flow.frameRate=30;
this.flow.on("canplaythrough",function(){h.setDelegate({visitorEngaged:function(){x.flow.play()
}})})}};x.init();AC.Element.addClassName(s,"enhanced")}})}());