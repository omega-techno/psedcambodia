AC.onDOMReady(function(){var c=AC.Element.getElementById("hero-video");var d=AC.Element.getElementById("main");
if(typeof c!=="undefined"){if(!c.canPlayType||!c.canPlayType("video/mp4")){AC.Element.addClassName(d,"no-video")
}}});