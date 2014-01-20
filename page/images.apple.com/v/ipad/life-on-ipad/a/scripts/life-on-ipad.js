var BuildIn=AC.Class({initialize:function(b){this._element=AC.Element.getElementById(b);
this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.6,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Object.synthesize(this)},visitorEngaged:function(){this.showOnScroll().stopObserving();
this._element.play()}});Event.onDOMReady(function(){var c=new BuildIn("video-inline");
var d=AC.Element.getElementById("replay");AC.Element.addEventListener(c._element,"ended",function(){AC.Element.addClassName(d,"reveal")
});AC.Element.addEventListener(d,"click",function(){AC.Element.removeClassName(d,"reveal");
c._element.play()})});