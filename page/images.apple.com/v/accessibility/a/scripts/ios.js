var Animation=AC.Class({initialize:function(a){this._element=AC.Element.getElementById(a);
this.replayButton=AC.Element.getElementById(a.split("-")[0]+"-replay");if(AC.Detector.isCSSAvailable("transition")){AC.Element.addClassName(this._element,"can-animate")
}else{return false}this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:0.2,timeInView:0.05});
this._showOnScroll.setDelegate(this);AC.Element.addEventListener(this.replayButton,"click",this.replayAnimation);
AC.Element.addEventListener(this.replayButton,"keydown",this.checkKeypress);AC.Object.synthesize(this)
},visitorEngaged:function(){this.showOnScroll().stopObserving();if(!AC.Element.hasClassName(this._element,"animate")){AC.Element.addClassName(this._element," animate")
}this._element.addVendorEventListener("animationEnd",function(){AC.Element.addClassName(this._element," finished");
AC.Element.removeClassName(this._element,"animate");this.replayButton.style.opacity=1
}.bind(this))},replayAnimation:function(){var a=AC.Element.getElementById(this.id.split("-")[0]+"-animation");
this.style.opacity=0;if(!AC.Element.hasClassName(a,"animate")){AC.Element.addClassName(a," animate")
}AC.Element.removeClassName(a,"finished")},checkKeypress:function(b){var a=b.keyCode?b.keyCode:b.which?b.which:b.charCode;
if(a==13||a==32){if(a==32){b.preventDefault()}this.click()}}});Event.onDOMReady(function(){var a=new Animation("flash-animation")
});