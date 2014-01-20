(function(){AC.AutoGallery.addType("video-showcase",{shouldAnimateContentChange:false,showFirstOnStopMovie:false,silentTriggers:true},AC.Function.emptyFunction,"video",{delegate:{willShow:function(h,j,f){var i=AC.Element.select("a.posterLink",f.content);
if(i){i.href=AC.Retina.sharedInstance().bestSrc(i.href)}var g=AC.Element.select(".endState img",f.content);
if(g){g.src=AC.Retina.sharedInstance().bestSrc(g.src)}},didShow:function(f,d,e){if(typeof(this.firstTrigger)==="undefined"){this.firstTrigger=AC.Element.select(".avatar."+f.view.view().id);
this.firstSectionId=this.firstTrigger.href.match(/#(.+)/);if(this.firstSectionId.length){this.firstSectionId=this.firstSectionId[1]
}}if(e.id!=="gallery-drummer-default"&&e.id!==this.firstSectionId){AC.Element.removeClassName(this.firstTrigger,"active")
}}}})}());