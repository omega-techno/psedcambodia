AC.DesignNav=Class.create({initialize:function(c,d){this.ambientDesignNav=c;this.indicator=d;
this.numSwatches=this.ambientDesignNav.getElementsBySelector("li").length;this.outgoingIndex=0;
this.incomingIndex=0;this.currentRotation=0;this.rotationPerSwatch=360/this.numSwatches
},browserSupportsEnhancedDesignNav:function(){var b;if(AC.Detector.isCSSAvailable("transform")&&AC.Detector.isCSSAvailable("transition")){this.ambientDesignNav.addClassName("enhanced");
b=true}else{this.ambientDesignNav.addClassName("unenhanced");b=false}this.browserSupportsEnhancedDesignNav=function(){return b
};return b},findShortestRotation:function(){var e=(this.incomingIndex-this.outgoingIndex+this.numSwatches)%this.numSwatches,d=(this.outgoingIndex-this.incomingIndex+this.numSwatches)%this.numSwatches,f;
f=(e<d)?e*this.rotationPerSwatch:-d*this.rotationPerSwatch;f+=this.currentRotation;
this.currentRotation=Math.round(f*100)/100;return this.currentRotation},setIndicator:function(){if(this.browserSupportsEnhancedDesignNav()){var b=this.findShortestRotation();
this.indicator.setVendorPrefixStyle("transform","rotate("+b+"deg)")}else{this.indicator.removeClassName("active-"+this.outgoingIndex);
this.indicator.addClassName("active-"+this.incomingIndex)}}});AC.BumpAnimation=Class.create({initialize:function(e,f){$(e).addClassName("enhance");
this.hasPlayed=false;this.showOnScroll=new AC.ShowOnScroll(e,{threshold:0.9});var d=this;
this.showOnScroll.setDelegate({visitorEngaged:function(){if(!d.hasPlayed){AC.Animation.getScene(f).play();
d.hasPlayed=true}}})}});AC.AutoGallery.addType("color-picker",{animationDuration:0.8,useKeyboardNav:true,alwaysUseKeyboardNav:true,shouldAnimateFadeIn:true,discontinuousPreviousNext:false},Prototype.emptyFunction,"image",{delegate:{willShow:function(e,f,d){designNav.incomingIndex=d.viewMaster.orderedSections.indexOf(d.id);
designNav.setIndicator();designNav.outgoingIndex=designNav.incomingIndex}}});var designNav;
AC.onDOMReady(function(){designNav=new AC.DesignNav($$(".design .pickernav")[0],$$(".design .pickernav span")[0]);
if(designNav.browserSupportsEnhancedDesignNav()){var b=new AC.ShowOnScroll(designNav.ambientDesignNav,{timeInView:0.2});
b.setDelegate({visitorEngaged:function(){var f=0,e=500,a=1400;setTimeout(function(){designNav.ambientDesignNav.addClassName("fadein")
},f);setTimeout(function(){designNav.ambientDesignNav.addClassName("entry")},e);
setTimeout(function(){designNav.ambientDesignNav.addClassName("postentry")},a)}})
}if(AC.Animation.isSupportedBrowser()){AC.Animation.initializeAnimations(animations);
AC.Animation.initializeScenes(scenes);new AC.BumpAnimation($("bump1"),"bump1scene");
new AC.BumpAnimation($("bump2"),"bump2scene");new AC.BumpAnimation($("bump3"),"bump3scene")
}});