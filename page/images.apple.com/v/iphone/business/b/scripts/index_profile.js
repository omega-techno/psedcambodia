Event.onDOMReady(function(){var j=Element.extend(document.getElementById("ambient-profiles"));
var i;var f;var g;var h=function(){g=(AC.Detector.isCSSAvailable("transform")===true&&AC.Detector.supportsThreeD()===true);
h=function(){return g};return g};if(h()){j.addClassName("ambient-profiles-prepped");
i=new AC.ShowOnScroll(j);f=false;i.setDelegate({visitorEngaged:function(){if(f===false&&h()){j.addClassName("ambient-profiles-complete")
}f=true}})}else{j.addClassName("ambient-profiles-fallback")}});