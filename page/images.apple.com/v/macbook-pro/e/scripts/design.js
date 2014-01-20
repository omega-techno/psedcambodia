AC.onDOMReady(function(){if(AC.Environment.Feature.cssPropertyAvailable("transform")){var h=$("ambient-components");
var e=$("ambient-components-image");e.addClassName("ambient-bottom-prepped");var g=new AC.ShowOnScroll(h);
var f=false;g.setDelegate({visitorEngaged:function(){if(f===false){e.addClassName("ambient-bottom-complete")
}f=true}})}});AC.AutoGallery.addType("slide-caption",{},AC.Function.emptyFunction,"slide",{viewer:AC.ViewMaster.SlideViewer,delegate:{didShow:function(f,d,e){if(e&&!d){this.wrapper=f.view.view().up(".autogallery")
}if(e){this.wrapper.addClassName(e.id+"-caption")}if(d){this.wrapper.removeClassName(d.id+"-caption")
}}}});