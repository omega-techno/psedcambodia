Event.onDOMReady(function(){var k="jpg";var r=window.localFluidFigureImages||[{slideID:"gallery-1",images:[{source:"gallery1_564."+k,width:564},{source:"gallery1_1128."+k,width:1128},{source:"gallery1_2256."+k,width:2256}]},{slideID:"gallery-2",images:[{source:"gallery2_564."+k,width:564},{source:"gallery2_1128."+k,width:1128},{source:"gallery2_2256."+k,width:2256}]},{slideID:"gallery-3",images:[{source:"gallery3_564."+k,width:564},{source:"gallery3_1128."+k,width:1128},{source:"gallery3_2256."+k,width:2256}]},{slideID:"gallery-4",images:[{source:"gallery4_564."+k,width:564},{source:"gallery4_1128."+k,width:1128},{source:"gallery4_2256."+k,width:2256}]},{slideID:"gallery-5",images:[{source:"gallery5_564."+k,width:564},{source:"gallery5_1128."+k,width:1128},{source:"gallery5_2256."+k,width:2256}]}];
var q={sectionClass:"fluid-figure",viewID:"fluid-slideshow",triggerClass:"fluid-slideshow-trigger",options:{silentTriggers:true,useTouchEvents:true,discontinuousPreviousNext:true,escapeToClose:true}};
var p=new AC.FluidFigure("fluid-gallery-vertical-center",q,window.localFluidFigurePath||"http://images.apple.com/macbook-pro/design-retina/images/fluidgallery/imagepath.jpg",r,564,302,"options");
var o=window.location.hash;var n="design-hero-gallery";var j=$(n);var m=new AC.DarkBox(n);
var l={};m.setDelegate({activateDarkbox:function(){document.body.scrollTop=0;p.setVisible();
this.trackClick();for(var a in AC.AutoGallery.galleries){l[a]=AC.AutoGallery.galleries[a].options.useKeyboardNav;
AC.AutoGallery.galleries[a].options.useKeyboardNav=false}p.slideshow.options.alwaysUseKeyboardNav=true
},closeDarkbox:function(){p.setHidden();for(var a in l){AC.AutoGallery.galleries[a].options.useKeyboardNav=l[a]
}},trackClick:function(){if(typeof(AC.ViewMaster)!="undefined"&&typeof(AC.ViewMaster.Tracker)!="undefined"&&typeof(AC.ViewMaster.Tracker.prototype)!="undefined"&&typeof(AC.ViewMaster.Tracker.prototype.interactionCount)!="undefined"){AC.ViewMaster.Tracker.prototype.interactionCount=1
}var d="";if(s.u.match(/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i)){d="mobile other"
}else{if(s.u.match(/windows/i)){d="windows"}else{if(s.u.match(/(iphone|ipod)/i)){d="iphone/ipod touch"
}else{if(s.u.match(/(ipad)/i)){d="ipad"}else{if(s.u.match(/Mac OS X/i)){d="Mac"
}else{d="other"}}}}}var b=window.innerHeight;var a=d;var c=AC.Tracking.pageName()+" - gallery open";
AC.Tracking.trackClick({prop3:c,eVar16:"Gallery Interaction",prop16:"Gallery Interaction",eVar43:a,eVar44:b,events:"event1"},this,"o",c)
}});if(m.identifier()===o.substring(1)){m.activateDarkbox()}j.select(".simplenav li a").each(function(a){if(a.hash===o){m.activateDarkbox()
}})});