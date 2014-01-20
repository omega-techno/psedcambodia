AC.define("accessories/smartCover/SmartCover",["require"],function(d){var c=Class.create({initialize:function(b,a){this.options=b;
this.nestedViewers={};this.vrs={};this.vrPos=this.getDefaultVRPos(a);this.options.keepInMemory=this.options.keepInMemory||3;
if(!this.options.frameStops){this.options.frameStops=[{lower:0,upper:this.options.numFrames,stop:this.options.numFrames}]
}this.track_start=true;this.track_end=true;this._isShowOnScrollInit=false;if(AC.Detector&&AC.Detector.iOSVersion()>=4.3){Element.addClassName(document.body,"isiOS4_3")
}},initShowOnScroll:function(a){this.options.showOnScroll=this.options.showOnScroll||new AC.ShowOnScroll(a,{threshold:1,timeInView:0,scrollEndDelay:0});
this.options.showOnScroll.setDelegate(this);this._isShowOnScrollInit=true},render:function(){if(this.options.swapView){this.options.swapView.setDelegate(this)
}this.setupSwipeImage(this.options.swipeImg);return this},setupSwipeImage:function(b){this.swipeImg={};
if(b!==undefined){this.swipeImg.element=$(b)}this.swipeImg.hide_at_frame=(AC.Detector.isiPad()?39:82);
this.swipeImg.duration=0.125;this.swipeImg.hid_command=false;this.swipeImg.showed_command=false;
if(this.swipeImg.element!==undefined){this.swipeImg.element.setOpacity(0);var g=this.swipeImg.element.getElementsByTagName("span").item(0);
if(window.ontouchstart!==undefined&&g){g.innerHTML=this.swipeImg.element.getAttribute("data-loc-touchable")||"Swipe"
}if(AC.Detector.isCSSAvailable("transition")){var h;var a=function(e){if(e.target!==this.swipeImg.element){return false
}else{if(this.swipeImg.hid_command===true){this.swipeImg.element.hide();this.swipeImg.element.removeVendorEventListener("transitionEnd",h,false)
}}};h=a.bindAsEventListener(this);this.swipeImg.element.addVendorEventListener("transitionEnd",h,false);
this.swipeImg.element.setVendorPrefixStyle("transition","opacity "+this.swipeImg.duration+"s ease-out")
}(function(e){Event.observe(e.swipeImg.element,"mousedown",function(f){e.currentVR().onGrabStart(f)
})}(this))}},getDefaultVRPos:function(a){if(typeof a==="object"&&a.length>=2){return a
}if((AC.Detector.isiPad()||AC.Detector.isMobile())&&this.options.numMobileFrames){return[this.options.numMobileFrames-1,0]
}else{return[this.options.numFrames-1,0]}},defaultVROptions:function(){return{imageIndexOffset:0,initialPos:[0,0],throwable:false,invert:[true,false],infiniteAxis:[false,false],grabRotateDistance:780,mobileTotalFrames:this.options.numMobileFrames||this.options.numFrames,allowMobileScroll:true,introSpins:0}
},currentVR:function(){if(this._currentVR!==undefined){return this._currentVR}return null
},tryShowSwipe:function(b,a){if(a[0]===0&&this.track_end===true){this.trackvr("end");
this.track_end=false}if(this.swipeImg.element===undefined||this.swipeImg.showed_command===true){return false
}if(a[0]===this.options.initialAnimationFrame()){if(AC.Detector.isCSSAvailable("transition")){this.swipeImg.element.setOpacity(1)
}else{if(AC.Detector.isIE()){this.swipeImg.element.show();this.swipeImg.element.setOpacity(1)
}else{this.swipeImg.element.appear({duration:this.swipeImg.duration})}}this.swipeImg.showed_command=true
}},tryHideSwipe:function(b,a){if(this.swipeImg.element===undefined||this.swipeImg.hidCommand===true||!a){return false
}if(a[0]<=this.swipeImg.hide_at_frame){if(AC.Detector.isCSSAvailable("transition")){this.swipeImg.element.setStyle("opacity: 0;")
}else{if(AC.Detector.isIE()){this.swipeImg.element.hide()}else{this.swipeImg.element.fade({duration:this.swipeImg.duration})
}}this.swipeImg.hid_command=true}if(this.track_start===true){this.trackvr("start");
this.track_start=false}},trackvr:function(a){var b=(AC.Detector.isMobile())?"iphone":((AC.Detector.isiPad())?"ipad":"non-mobile");
AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - vr - "+a,prop8:b},this,"o",AC.Tracking.pageName()+" - vr - "+a)
},vrGrabEnd:function(a){if(this.options.showOnScroll.isObserving()){this.options.showOnScroll.stopObserving()
}this.animateVR(a)},vrOnGrabChange:function(b,a){this.tryHideSwipe(b,a)},vrOnGoToPos:function(b,a){this.tryShowSwipe(b,a)
},createVRDelegate:function(){var b=this.vrOnGoToPos.bind(this);var a=this.vrOnGrabChange.bind(this);
var f=this.vrGrabEnd.bind(this);return{onGotoPos:b,onGrabChange:a,onGrabEnd:f}},animateVR:function(h){var a,g=(h.mobile&&this.options.mobileFrameStops?this.options.mobileFrameStops:this.options.frameStops);
var b;for(a=0;a<g.length;a+=1){b=g[a];if(h.currentPos[0]>=b.lower&&h.currentPos[0]<=b.upper){h.animateToPos(b.stop);
return}}},recycleVRs:function(){var a;for(a in this.vrs){if(this.vrs.hasOwnProperty(a)){if(this.vrs[a]!==this.currentVR()){this.vrs[a].recycle();
this.vrs[a].vr.parentNode.removeChild(this.vrs[a].vr);delete this.vrs[a]}}}},numVRs:function(){var a=0;
var b;for(b in this.vrs){if(this.vrs.hasOwnProperty(b)){a+=1}}return a},setupVR:function(a){var b=a.id.replace("smartcover-","").replace(this.options.product+"-",""),h=this.options.imageUrlPattern(b),i=Object.clone(this.defaultVROptions());
i.initialPos=this.vrPos;var j=new AC.VR(a.content.down(".vr"),h,this.options.numFrames,i);
j.gotoPos(this.vrPos);j.setDelegate(this.createVRDelegate());return j},setCurrentVR:function(a){if(this.vrs[a.id]===undefined){this.vrs[a.id]=this.setupVR(a)
}else{this.vrs[a.id].gotoPos(this.vrPos)}this._currentVR=this.vrs[a.id];if(this.numVRs()>this.options.keepInMemory){this.recycleVRs()
}},visitorEngaged:function(){var a=this.options.swapView;var g=a.delegate.nestedViewers[a.currentSection.id];
var h;var b;if(g){h=a.delegate.vrs[g.currentSection.id];if(h&&typeof h.animateToPos==="function"){b=this.options.initialAnimationFrame();
h.animateToPos(b)}}},willClose:function(j,i,k){var b;var l;var a;if(j.nested){if(i){b=this.vrs[i.id]
}}else{if(i&&this.nestedViewers[i.id]!==undefined){a=this.nestedViewers[i.id];l=a.currentSection;
b=this.vrs[l.id]}}if(this.ignoreCurrentPos!==true){if(b!==undefined){this.vrPos=b.currentPos
}}else{this.ignoreCurrentPos=false}},didAppendContent:function(l,b){if(!l.nested){if(this.nestedViewers[l.currentSection.id]===undefined){var i=b.down(".cover");
var j={silentTriggers:true,shouldAnimateContentChange:false};if(this.coverIndex!==undefined&&this.coverIndex!==0){var k=$$("a."+i.id);
if(k[this.coverIndex]!==undefined){j.initialId=k[this.coverIndex].getAttribute("href");
j.initialId=j.initialId.replace("#","")}}else{if(this.options.initialId){j.initialId=this.options.initialId
}else{var a=$("default-cover-color");if(!a&&b){a=b.down("[id^=default]")}if(a&&a.hasClassName(i.id)){j.initialId=a.href.replace(/.*#/,"")
}}}this.nestedViewers[l.currentSection.id]=new AC.ViewMaster.Viewer($$("a."+i.id),i,i.id,j);
this.nestedViewers[l.currentSection.id].nested=true;this.nestedViewers[l.currentSection.id].setDelegate(this)
}}},didShow:function(k,j,l){if(l&&k.nested){this.coverIndex=k.indexOfSection(l);
if(!this.options.isMobileStatic){this.setCurrentVR(l)}if(!this._isShowOnScrollInit){this.initShowOnScroll(l.content)
}}else{if(l&&l.id&&j&&j.id){var a=this.nestedViewers[j.id];var i=this.nestedViewers[l.id];
var b;if(!this.options.isMobileStatic&&i&&i.currentSection){this.setCurrentVR(i.currentSection)
}if(a&&a.currentSection&&i){this.coverIndex=a.indexOfSection(a.currentSection);
b=i.sectionWithId(i.orderedSections[this.coverIndex]);if(i.currentSection!==b){this.ignoreCurrentPos=true;
i.show(b)}else{if(this.vrs[b.id]){this.vrs[b.id].gotoPos(this.vrPos)}}}}}}});return c
});AC.define("accessories/bootstrap",["require","accessories/smartCover/SmartCover"],function(d){var c=d("accessories/smartCover/SmartCover");
Event.onDOMReady(function(){var b=new AC.ViewMaster.Viewer($$("#smartcover a.vr-smartcover"),"vr-smartcover","vr-smartcover",{silentTriggers:true,shouldAnimateContentChange:false});
var f=new c({product:"smartcover",swipeImg:"smartcover-swipe",numFrames:90,swapView:b,assetVersion:$("vr-smartcover").getAttribute("data-assetversion"),imageUrlPattern:function(e){var h="j";
return"/105/media/us/ipad/2013/1f6b0ba3-a0be-4d5b-b417-0217ec2d6240/accessories/smartcover/ipad_smartcover_"+e+"_###."+h+"pg"
},initialAnimationFrame:function(){return 75},frameStops:[{lower:53,upper:89,stop:89},{lower:31,upper:54,stop:31},{lower:0,upper:30,stop:0}]}).render();
var a=new AC.ViewMaster.Viewer($$("#smartcase a.vr-smartcase"),"vr-smartcase","vr-smartcase",{silentTriggers:true,shouldAnimateContentChange:false});
vrManagerSmartcase=new c({product:"smartcase",swipeImg:"smartcase-swipe",numFrames:90,swapView:a,assetVersion:$("vr-smartcase").getAttribute("data-assetversion"),imageUrlPattern:function(e){var h="j";
return"/105/media/us/ipad/2013/1f6b0ba3-a0be-4d5b-b417-0217ec2d6240/accessories/smartcase/ipad_smartcase_"+e+"_###."+h+"pg"
},initialAnimationFrame:function(){return 75},frameStops:[{lower:53,upper:89,stop:89},{lower:30,upper:54,stop:30},{lower:0,upper:29,stop:0}]}).render()
})});