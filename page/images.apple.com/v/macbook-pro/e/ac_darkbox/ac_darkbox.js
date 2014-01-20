AC.DarkBox=AC.Class();AC.DarkBox.prototype={ESC_KEY_CODE:27,initialize:function ac_initialize(b){this._identifier=b;
this.content=AC.Element.getElementById(this._identifier);AC.Element.setVendorPrefixStyle(this.content,"transform","translateZ(0)");
this.content.setAttribute("data-hires",true);this.triggers=AC.Element.selectAll("."+this._identifier);
this.content.style.display="none";this.content.parentNode.removeChild(this.content);
this._active=false;this.delegate={};this.__setupEvents();AC.Synthesize.synthesize(this)
},__setupEvents:function ac___setupEvents(){var c,d;this.__boundViewportChanged=AC.Function.bindAsEventListener(this.__viewportChanged,this);
this.__boundTriggerClicked=AC.Function.bindAsEventListener(this.__triggerClicked,this);
for(c=0,d=this.triggers.length;c<d;c+=1){AC.Element.addEventListener(this.triggers[c],"click",this.__boundTriggerClicked)
}AC.Element.addEventListener(window,"resize",this.__boundViewportChanged);AC.Element.addEventListener(window,"orientationchange",this.__boundViewportChanged);
AC.Element.addEventListener(document,"keyup",function(a){if(a.keyCode===this.ESC_KEY_CODE){this.closeDarkbox()
}}.bind(this))},__viewportChanged:function ac___viewportChanged(b){if(this._active===true){this.__resizeMask()
}},__triggerClicked:function ac___triggerClicked(b){AC.Event.stop(b);if(this._active===true){this.closeDarkbox()
}else{this.activateDarkbox()}},__maskBody:function ac___maskBody(){AC.Element.addClassName(document.documentElement,"blackout");
AC.Element.addClassName(document.body,"noscroll");this.__resizeMask()},__resizeMask:function ac___resizeMask(){this.content.style.height=(document.documentElement.clientHeight||window.innerHeight||document.documentElement.offsetHeight)+"px"
},activateDarkbox:function ac_activateDarkbox(){if(this._active!==true){this.yOffset=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
this.__maskBody();AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)");
AC.Element.setVendorPrefixStyle(this.content,"transition","400ms");setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"1"});
AC.Element.setVendorPrefixStyle(this.content,"transform","scale(1.0)")}.bind(this),100);
AC.Element.addClassName(this.content,"noscroll-show");document.body.appendChild(this.content);
this._active=true;if(typeof this.delegate.activateDarkbox==="function"){this.delegate.activateDarkbox()
}if(AC&&AC.Retina&&AC.Retina.sharedInstance){AC.Retina.sharedInstance().replace(this.content,this.content)
}}},closeDarkbox:function ac_closeDarkbox(){if(this._active===true){AC.Element.setVendorPrefixStyle(this.content,"transition","300ms");
setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)")
}.bind(this),1);var b=function(){document.body.style.height="";AC.Element.removeClassName(document.documentElement,"blackout");
AC.Element.removeClassName(this.content,"noscroll-show");AC.Element.removeClassName(document.body,"noscroll");
window.scrollTo(0,this.yOffset);this.content.parentNode.removeChild(this.content);
this._active=false;if(typeof this.delegate.closeDarkbox==="function"){this.delegate.closeDarkbox()
}AC.Element.removeVendorEventListener(this.content,"transitionEnd",b,false)}.bind(this);
AC.Element.addVendorEventListener(this.content,"transitionEnd",b,false);if(!AC.Environment.Feature.cssPropertyAvailable("transition")){b()
}}},setDelegate:function ac_setDelegate(b){this.delegate=b}};