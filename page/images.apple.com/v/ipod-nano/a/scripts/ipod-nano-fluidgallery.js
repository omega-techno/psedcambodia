var instantiateFluidDarkBox=function(j,f,i){var h=window.location.hash;var g={};
f.setDelegate({activateDarkbox:function(){j.setVisible();this.trackClick();for(var a in AC.AutoGallery.galleries){g[a]=AC.AutoGallery.galleries[a].options.useKeyboardNav;
AC.AutoGallery.galleries[a].options.useKeyboardNav=false}j.slideshow.options.alwaysUseKeyboardNav=true
},closeDarkbox:function(){j.setHidden();for(var a in g){AC.AutoGallery.galleries[a].options.useKeyboardNav=g[a]
}},trackClick:function(){if(typeof(AC.ViewMaster)!="undefined"&&typeof(AC.ViewMaster.Tracker)!="undefined"&&typeof(AC.ViewMaster.Tracker.prototype)!="undefined"&&typeof(AC.ViewMaster.Tracker.prototype.interactionCount)!="undefined"){AC.ViewMaster.Tracker.prototype.interactionCount=1
}var a=AC.Tracking.pageName()+" - gallery open";AC.Tracking.trackClick({prop3:a,eVar16:"Gallery Interaction",prop16:"Gallery Interaction",events:"event1"},this,"o",a)
}});if(f.identifier()===h.substring(1)){f.activateDarkbox()}i.select(".simplenav li a").each(function(a){if(a.hash===h){f.activateDarkbox()
}})};