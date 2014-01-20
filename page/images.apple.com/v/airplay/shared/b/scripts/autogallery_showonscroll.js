AC.AutoGallery.addSlideshowType("showonscroll",{autoplay:false,delay:5000},null,"standard",{});
Event.onDOMReady(function(){for(slideshow in AC.AutoGallery.slideshows){if(AC.AutoGallery.slideshows[slideshow].__type.name==="showonscroll"){AC.AutoGallery.slideshows[slideshow].__type.context=new AC.ShowOnScroll(AC.AutoGallery.slideshows[slideshow].contentController.view._viewId);
AC.AutoGallery.slideshows[slideshow].__type.context.setDelegate({visitorEngaged:function(j,i,f,g){var h=AC.AutoGallery.slideshows[j.id];
if(h.options.autoplay===false){h.options.autoplay=2500;h.start()}else{if((h.options.autoplay!==false)&&(h._playing===false)){h.start()
}}},scrolledOutOfView:function(d){var c=AC.AutoGallery.slideshows[d.id];c.stop()
}})}}});