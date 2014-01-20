if(typeof AC==="undefined"){AC={}}AC.FixedElement=Class.create({defaultOptions:{iOSTransition:".4s -webkit-transform cubic-bezier(0.25, 0.1, 0.25, 1.0)"},initialize:function(c,d,b){if(typeof AC.Detector!=="undefined"&&AC.Detector.isIEStrict()&&!!AC.Detector.getAgent().match(/msie 6/i)){return false
}this.element=$(c);if(this.element===null){return false}this.parent=$(d);this.delegate={};
this.options=(typeof b!=="object")?Object.clone(this.defaultOptions):Object.extend(Object.clone(this.defaultOptions),b);
this.isiOS=(typeof AC.Detector!=="undefined"&&AC.Detector.iOSVersion()!==false);
this.updateOffsets();this._boundOnScroll=this.onScroll.bindAsEventListener(this);
Element.observe(window,"scroll",this._boundOnScroll);Element.observe(window,"resize",this._boundOnScroll);
var a=this;window.setTimeout(function(){a.onScroll.apply(a)},0);if(typeof AC.AnchorPageScroller!=="undefined"&&typeof AC.AnchorPageScroller.defaultAnchorScroller==="object"){AC.AnchorPageScroller.defaultAnchorScroller.view.delegate.onScrollEnd=function(){a.onScroll()
}}if(this.isiOS){if(typeof this.options.iOSTransition==="string"&&this.options.iOSTransition!=="false"){this.element.setStyle({"-webkit-transition":this.options.iOSTransition})
}var a=this;window.setTimeout(function(){a.onScroll.apply(a)},100)}},setDelegate:function(a){if(typeof a==="object"){this.delegate=a
}},updateOffsets:function(){if(typeof this.element.offsets==="undefined"){this.element.offsets=this.element.cumulativeOffset()
}this.element.offsets.bottom=this.element.offsets.top+this.element.getHeight();
this.element.offsets.right=this.element.offsets.left+this.element.getWidth();if(typeof this.parent!=="undefined"){this.parent.offsets=this.parent.cumulativeOffset();
this.parent.offsets.bottom=this.parent.offsets.top+this.parent.getHeight();this.parent.offsets.right=this.parent.offsets.left+this.parent.getWidth()
}},getViewPortInfo:function(){var a={};a.scrollOffsets=document.viewport.getScrollOffsets();
a.height=document.viewport.getHeight();a.width=document.viewport.getWidth();return a
},onScroll:function(){var a=this.getViewPortInfo();this._isStatic=true;if(a.scrollOffsets.top>=this.element.offsets.top){if(typeof this.parent!=="undefined"&&typeof this.parent.offsets!=="undefined"&&this.element.offsets.bottom-this.element.offsets.top+a.scrollOffsets.top>=this.parent.offsets.bottom){if(this.isiOS){this.element.setStyle({"-webkit-transform":"translate3d(0,"+(this.parent.offsets.bottom-this.element.offsets.bottom)+"px,0)"})
}else{this.element.setStyle({position:"absolute",top:(this.parent.offsets.bottom-this.parent.offsets.top-this.element.offsets.bottom+this.element.offsets.top)+"px","z-index":this.element.getStyle("z-index")||1})
}}else{if(this.isiOS){this.element.setStyle({"-webkit-transform":"translate3d(0,"+(a.scrollOffsets.top-this.element.offsets.top)+"px,0)"})
}else{this.element.setStyle({position:"fixed",top:0,"z-index":this.element.getStyle("z-index")||1})
}}this.element.removeClassName("static");this._isStatic=false}else{if(this.isiOS){this.element.setStyle({"-webkit-transform":"translate3d(0,0,0)"})
}else{this.element.setStyle({position:"static"})}this.element.addClassName("static")
}if(typeof this.delegate.onScroll==="function"){this.delegate.onScroll(this,a,this._isStatic)
}return a}});AC.FixedNav=Class.create(AC.FixedElement,{defaultOptions:{alwaysActive:true,thresholdToActivate:0,sectionRegExp:/^.*$/},initialize:function($super,b,c,a){this.defaultOptions=Object.extend(AC.FixedElement.prototype.defaultOptions,this.defaultOptions);
this.element=$(b);this.links=this.validateInternalLinks(this.element.getElementsBySelector("a"));
$super(this.element,c,a);this.activate(this.getActiveSection())},updateOffsets:function($super){$super();
this._getSections()},validateInternalLinks:function(b){if(typeof b!=="undefined"&&b.length>0){for(var c=b.length-1;
c>=0;c--){var a=b[c].getAttribute("href");if(a.indexOf("#")!==-1){if(a.match(/^#/)==null){b[c].setAttribute("href",a.replace(/^.*#/,"#"))
}}else{b=b.without(b[c])}}}return b},_getSections:function(){this.sections=[];if(this.links.length<0){return
}this.links.each(function(b,a){var c=this._getSection(b,a);if(c!==null){this.sections.push(c)
}}.bind(this));this.sections.sort(function(d,c){return d.element.offsets.top-c.element.offsets.top
})},_getSection:function(b,a){var c={};c.index=a||this.links.indexOf(b);c.link=b;
c.id=b.getAttribute("href").replace("#","").match(this.options.sectionRegExp)[0];
c.element=$(c.id);if(c.element===null||typeof c.element==="undefined"){return null
}c.element.offsets=c.element.cumulativeOffset();c.element.offsets.bottom=c.element.offsets.top+c.element.getHeight();
c.element.offsets.right=c.element.offsets.left+c.element.getWidth();return c},getActiveSection:function(b){if(typeof this.sections!=="object"||this.sections.length<=0){return
}if(typeof b==="undefined"){var b=this.getViewPortInfo()}var a=(this.options.alwaysActive===true)?this.sections[0]:null;
for(var c=this.sections.length-1;c>=0;c--){if(this._checkIfActive(b,this.sections[c])){a=this.sections[c];
c=-1}}if(this.activeSection!==a){if(this.activeSection!==null){this.deactivate(this.activeSection)
}if(a!==null){this.activate(a)}}this.activeSection=a;delete a;return this.activeSection
},_checkIfActive:function(a,b){if(typeof a==="undefined"){var a=this.getViewPortInfo()
}if(a.scrollOffsets.top>=b.element.offsets.top-this.options.thresholdToActivate){return true
}else{return false}},activate:function(a){if(a===null){return null}if(a&&typeof a==="object"&&"link" in a){a.link.addClassName("active")
}if(typeof this.delegate.onActivate==="function"){this.delegate.onActivate(this,a)
}},deactivate:function(a){if(a===null){return null}if(a&&typeof a==="object"&&"link" in a){a.link.removeClassName("active")
}if(typeof this.delegate.onDeactivate==="function"){this.delegate.onDeactivate(this,a)
}},onScroll:function($super){var a=$super();this.getActiveSection(a)}});