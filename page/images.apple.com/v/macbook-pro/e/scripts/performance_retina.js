var ChartGallery=AC.Class({initialize:function(b){this._element=AC.Element.getElementById(b);
this._viewer=null;this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.6,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Object.synthesize(this);if(!AC.Element.isElement(this.element())){return false
}this.setupViewer();if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this.element(),"can-animate");
this.viewer().setDelegate(this)}},setupViewer:function(){var f=this.element();var h=AC.Element.selectAll(".gallery-content",f);
var e=AC.AutoGallery.Types.Registries.gallery.__lookup["image-fadein"].getOptions();
var g=new AC.ViewMaster.Viewer(h,f,f.id,e);this.setViewer(g)},willAnimate:function(o,m,n,l){var k=(o.orderedSections.indexOf(n.id.replace("MASKED-",""))===1);
var p=this.element();var i=false;var j=function(){if(!i){l();i=true}};if(m){m.setOpacity(0)
}if(n){n.setOpacity(1)}window.setTimeout(function(){if(k){AC.Element.addClassName(p,"second-section")
}else{AC.Element.removeClassName(p,"second-section")}p.addVendorEventListener("transitionEnd",j,true);
window.setTimeout(j,910)},10)},visitorEngaged:function(){this.showOnScroll().stopObserving();
AC.Element.addClassName(this._element,"animate")}});var BarChart=AC.Class({initialize:function(b){this._element=AC.Element.getElementById(b);
if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this._element,"can-animate")
}this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.6,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Object.synthesize(this)},visitorEngaged:function(){this.showOnScroll().stopObserving();
AC.Element.addClassName(this._element,"animate")}});Event.onDOMReady(function(){var d=new BarChart("photography-chart");
var e=new BarChart("gaming-chart");var f=new BarChart("video-chart")});