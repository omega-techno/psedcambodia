Event.onDOMReady(function(){var b=new AC.FixedNav("fixed-nav","content",{thresholdToActivate:160});
if(typeof b.delegate==="object"){b.setDelegate({onActivate:function(a,d){if(typeof this.indicator==="undefined"){this.indicator=$("active-indicator")
}this.indicator.className="active-"+(a.sections.length-d.index)}});b.delegate.onActivate(b,b.getActiveSection())
}});