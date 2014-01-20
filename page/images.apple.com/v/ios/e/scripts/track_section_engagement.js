var TrackVisitorEngagement=Class.create({__defaultOptions:{onlyTrackOnce:true,id:"",minimumDuration:1,threshold:0.75,debug:false,decimals:1},initialize:function(c,d){if(typeof d!=="object"){d={}
}if(typeof this.__defaultOptions!=="object"){this.__defaultOptions={}}this._options=Object.extend(Object.clone(this.__defaultOptions),d);
this._element=AC.Element.getElementById(c);if(this._options.debug===true){AC.Element.setStyle(this._element,{outline:"5px rgba(223,124,60,0.5) dotted"})
}this._showOnScroll=new AC.ShowOnScroll(this._element,{threshold:this._options.threshold});
this._showOnScroll.setDelegate(this);Object.synthesize(this)},scrolledIntoViewPastThreshold:function(h,g,e,f){this.__startTime=new Date().getTime()
},scrolledOutOfViewPastThreshold:function(n,k,e,i){var l=Math.pow(10,this._options.decimals);
var m={prop34:(AC.Tracking.pageName()+" - "+this._options.id+" - section engaged"),prop35:(Math.round((new Date().getTime()-this.__startTime)/(1000/l))/l)};
if(m.prop35>=this._options.minimumDuration){if(this._options.onlyTrackOnce===true&&this.__hasTracked===true){return
}AC.Tracking.trackClick(m,this,"o",m.prop34);this.__hasTracked=true;if(this._options.debug){try{console.log(m.prop34+": "+m.prop35+"s")
}catch(j){}AC.Element.setStyle(n,{outline:"5px rgba(93,208,82,.5) dotted"})}}}});
Event.onDOMReady(function(){var b=AC.Element.selectAll("[data-track-visitor-engagement]");
b.each(function(e){var f={};f.id=e.getAttribute("data-track-visitor-engagement");
var a=parseFloat(e.getAttribute("data-track-visitor-engagement-threshold"));if(!isNaN(a)){f.threshold=a
}new TrackVisitorEngagement(e,f)})});