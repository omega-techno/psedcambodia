if(typeof AC==="undefined"){AC={}}AC.Cube360=function(f,e,h){this.options=Object.extend(Object.clone(this.__defaultOptions),h||{});
if(!AC.Cube360.shouldCreate360()){return}this.elements={};this.__setupView(f);if(Object.isElement(this.elements._view)){this._id=this.elements._view.getAttribute("id");
if(this._id!==""&&this._id!=="undefined"){this.synthesize();this.shape=e;if(AC.Cube360.Shapes.isValidShape(this.shape)){this.__setup();
this.__addHandlers()}else{try{console.warn("Invalid shape instance.")}catch(g){}}}else{try{console.warn("View element must have valid ID attribute.")
}catch(g){}}}else{try{console.warn("View must be an Element.")}catch(g){}}};Object.extend(AC.Cube360,{prefix:"ac-cube360",__forceDisabledBrowsers:{allOrNothing:[/Chrome/,/Android/],deviceMotion:[]},shouldCreate360:function(){if(AC.Detector.supportsThreeD()&&!AC.Cube360.browserDisabledByForce()){return true
}return false},browserDisabledByForce:function(){return AC.Cube360.matchUserAgentToRegexArray(AC.Cube360.__forceDisabledBrowsers.allOrNothing)
},deviceMotionDisabledByForce:function(){return AC.Cube360.matchUserAgentToRegexArray(AC.Cube360.__forceDisabledBrowsers.deviceMotion)
},matchUserAgentToRegexArray:function(e,f){var d;if(typeof f!=="string"){f=navigator.userAgent
}for(d=0;d<e.length;d++){if(f.match(e[d])){return true}}return false},radToDeg:function(b){return b*(180/Math.PI)
},degToRad:function(b){return b*(Math.PI/180)}});AC.Cube360.prototype={__defaultOptions:{perspective:392,ringRadius:320,initialXRotation:0,initialYRotation:0,initialZOffset:400,allowUserInteractions:true,useDeviceMotion:true,offsetInitialDeviceMotion:false,allowTouchWhileUsingDeviceMotion:true,invert:true,constrainAxis:false,preventInversionAlongXAxis:false,preventInversionAlongYAxis:false},animate:function(j,k,n,o,h,l,m){this.animateAxis("x",j,o,h,l,m);
this.animateAxis("y",k,o,h,l,m);this.animateAxis("z",n,o,h,l,m)},animateAxis:function(j,n,o,q,l,m){if(q!=="deg"&&q!=="rad"){q="deg"
}if(typeof l==="undefined"){l="linear"}var k=this.angleForAxisInRadians(j);if(q==="deg"){k=AC.Cube360.radToDeg(k)
}var p=function(a){a.axis=j;a.angle=n;a.duration=o;a.unit=q;a.easing=l;this.elements.axes[j].removeVendorEventListener("webkitTransitionEnd",this.__boundAfterAnimationFinish,false);
if(typeof m==="function"){window.setTimeout(function(b){m(b)},0)}};this.__boundAfterAnimationFinish=p.bindAsEventListener(this);
this.elements.axes[j].addVendorEventListener("webkitTransitionEnd",this.__boundAfterAnimationFinish,false);
if(n!==k&&typeof n!=="undefined"&&n!==null){this.elements.axes[j].setVendorPrefixStyle("-webkit-transition-property","-webkit-transform");
this.elements.axes[j].setVendorPrefixStyle("-webkit-transition-duration",o+"s");
this.elements.axes[j].setVendorPrefixStyle("-webkit-transition-timing-function",l);
this.elements.axes[j].onTransitionEnd=function(a){this.cancelAnimation(j)}.bindAsEventListener(this);
this.elements.axes[j].addVendorEventListener("webkitTransitionEnd",this.elements.axes[j].onTransitionEnd);
this.setRotationForAxis(j,n,q)}},cancelAnimation:function(d){var e=this;var f=function(b){var a=e.angleForAxisInRadians(b);
e.elements.axes[b].setVendorPrefixStyle("-webkit-transition-property","");e.elements.axes[b].setVendorPrefixStyle("-webkit-transition-duration","");
e.elements.axes[b].setVendorPrefixStyle("-webkit-transition-timing-function","");
e.setRotationForAxis(b,a,"rad");if(typeof e.elements.axes[b].onTransitionEnd!=="undefined"){e.elements.axes[b].removeVendorEventListener("webkitTransitionEnd",e.elements.axes[b].onTransitionEnd);
delete e.elements.axes[b].onTransitionEnd}e.elements.axes[b].removeVendorEventListener("webkitTransitionEnd",e.__boundAfterAnimationFinish,false)
};if(d==="x"||d==="y"||d==="z"){f(d)}else{f("x");f("y");f("z")}},innermostAxis:function(){if(typeof this.elements!=="undefined"&&typeof this.elements.axes!=="undefined"){if(Object.isElement(this.elements.axes.y)){return this.elements.axes.y
}}},coordsFromEvent:function(b){if("touches" in b&&b.touches.length){return{x:b.touches[0].clientX,y:b.touches[0].clientY}
}else{return{x:b.clientX,y:b.clientY}}return null},angleForAxisInRadians:function(e){var g,f;
f=window.getComputedStyle(this.elements.axes[e]).webkitTransform;try{f=new WebKitCSSMatrix(f)
}catch(h){f=null}if(f===null){return null}if(e==="y"){g=Math.atan2(f.m13,f.m11)*-1;
if(this.__isTrackingUserInteraction===true&&this.options.preventInversionAlongYAxis){if(f.m11<0){g+=Math.PI
}}}else{g=Math.atan2(f.m23,f.m22);if(this.__isTrackingUserInteraction===true&&this.options.preventInversionAlongXAxis){if(f.m22<0){g+=Math.PI
}}}return g},setRotation:function(f,g,h,e){this.setRotationForAxis("x",f,e);this.setRotationForAxis("y",g,e);
this.setRotationForAxis("z",h,e)},setRotationForAxis:function(e,f,d){if(typeof this.elements.axes[e]!=="undefined"){if(this.options.constrainAxis!==e&&typeof f!=="undefined"&&f!==null&&!isNaN(f)){if(d!=="deg"&&d!=="rad"){d="deg"
}this.elements.axes[e].setVendorPrefixStyle("-webkit-transform","rotate"+(e.toUpperCase())+"("+f+d+")")
}}},shouldUseDeviceMotion:function(){return(this.options.useDeviceMotion===true)&&(("DeviceMotionEvent" in window)||("DeviceMotionEvent" in window))&&(this.__isTrackingUserInteraction!==true)&&!(AC.Cube360.deviceMotionDisabledByForce())
},__addHandlers:function(){this.handlers={};this.handlers.__interactionStart=this.__interactionStart.bindAsEventListener(this);
this.handlers.__interactionMove=this.__interactionMove.bindAsEventListener(this);
this.handlers.__interactionEnd=this.__interactionEnd.bindAsEventListener(this);
this.handlers.__interactionDeviceMotion=this.__interactionDeviceMotion.bindAsEventListener(this);
this.interaction={};if("TouchEvent" in window){if(typeof Element.trackTouches==="function"){this.elements._view.trackTouches(this.handlers.__interactionStart,this.handlers.__interactionMove,this.handlers.__interactionEnd)
}else{try{console.warn("You must include the trackTouches js library for touch events.")
}catch(b){}}}else{this.elements._view.observe("mousedown",this.handlers.__interactionStart);
Event.observe(document,"mousemove",this.handlers.__interactionMove);Event.observe(document,"mouseup",this.handlers.__interactionEnd)
}Event.observe(window,"devicemotion",this.handlers.__interactionDeviceMotion);Event.observe(window,"deviceorientation",this.handlers.__interactionDeviceMotion)
},__interactionDeviceMotion:function(m){if(this.shouldUseDeviceMotion()===true){this.cancelAnimation();
if(m.type==="deviceorientation"){if(this.options.offsetInitialDeviceMotion===true){var g;
switch(window.orientation){case 180:g=(m.beta+90)*-1;break;case 90:g=(m.gamma+90)*-1;
break;case -90:g=(m.gamma-90);break;default:g=(m.beta-90);break}g=this.__isTrackingUserInteraction?null:AC.Cube360.degToRad(g);
this.setRotationForAxis("x",g,"rad");this.options.offsetInitialDeviceMotion=false
}}else{if(m.type==="devicemotion"){if(this.options.offsetInitialDeviceMotion!==true){if(m.rotationRate===null){this.options.useDeviceMotion=false;
return false}var k,l,g,j,h=5.8;k=Math.atan((m.rotationRate.alpha*m.interval)/this.options.ringRadius*h);
l=Math.atan((m.rotationRate.beta*m.interval)/this.options.ringRadius*h);switch(window.orientation){case 180:g=k;
j=l;break;case 90:g=l;j=k*-1;break;case -90:g=l*-1;j=k;break;default:g=k*-1;j=l*-1;
break}g=this.__isTrackingUserInteraction?null:this.angleForAxisInRadians("x")-g;
j=this.__isTrackingUserInteraction?null:this.angleForAxisInRadians("y")+j;this.setRotation(g,j,null,"rad")
}}}}},__interactionStart:function(d){if(this.options.allowUserInteractions===true&&(this.options.allowTouchWhileUsingDeviceMotion===true||this.shouldUseDeviceMotion()!==true)){var c=this.coordsFromEvent(d);
this.cancelAnimation();this.__resetInteractionObject();this.interaction.startX=c.x;
this.interaction.startY=c.y;this.rotation.x=this.angleForAxisInRadians("x");this.rotation.y=this.angleForAxisInRadians("y");
this.interaction.rotation.x=this.rotation.x;this.interaction.rotation.y=this.rotation.y;
this.setRotation(this.rotation.x,this.rotation.y,null,"rad");this.__isTrackingUserInteraction=true;
this.elements._view.addClassName("grabbing")}if(d.type.match(/touch/i)===null){d.stop()
}},__interactionMove:function(e){if(this.__isTrackingUserInteraction===true){var d=this.coordsFromEvent(e),f=displacement={};
f.pixels={};f.angle={};f.pixels.x=d.x-this.interaction.startX,f.pixels.y=d.y-this.interaction.startY;
displacement.x=Math.atan(f.pixels.x/this.options.ringRadius);displacement.y=Math.atan(-f.pixels.y/this.options.ringRadius);
f.angle.x=displacement.y;f.angle.y=displacement.x;if(this.options.preventInversionAlongXAxis){f.angle.x*=Math.cos(this.rotation.x)
}if(this.options.preventInversionAlongYAxis){f.angle.y*=Math.cos(this.rotation.y)
}if(this.options.invert===true){f.angle.x*=-1;f.angle.y*=-1}this.rotation.x=this.interaction.rotation.x+f.angle.x;
this.rotation.y=this.interaction.rotation.y+f.angle.y;this.setRotation(this.rotation.x,this.rotation.y,null,"rad")
}if(e.type.match(/touch/i)===null){e.stop()}},__interactionEnd:function(b){if(this.__isTrackingUserInteraction===true){this.__isTrackingUserInteraction=false;
this.elements._view.removeClassName("grabbing");this.__resetInteractionObject()
}if(b.type.match(/touch/i)===null){b.stop()}},__resetInteractionObject:function(){if(typeof this.interaction!=="object"){this.interaction={}
}this.interaction.rotation={};this.interaction.matrices={};this.rotation={x:0,y:0};
delete this.__savedEvents},__setup:function(){var b;this.__setupContainer();this.__setupAxes();
this.shape.setup(this);this.elements.axes.x.appendChild(this.elements.axes.y);this.elements.axes.z.appendChild(this.elements.axes.x);
this.elements.container.appendChild(this.elements.axes.z);this.elements._view.appendChild(this.elements.container);
this.__resetInteractionObject()},__setupView:function(d){if(typeof d==="string"||Object.isElement(d)){this.elements._view=$(d);
this.elements._view.addClassName(AC.Cube360.prefix);this.elements._view.addClassName("active");
this.elements._view.setVendorPrefixStyle("-webkit-perspective",this.options.perspective.toString());
if(this.options.allowUserInteractions===true){this.elements._view.addClassName("interactable")
}var c=this;this.elements.view=function(){return c.elements._view}}else{this.elements._view=null
}},__setupContainer:function(){this.elements.container=new Element("div");this.elements.container.addClassName(AC.Cube360.prefix+"-container");
this.elements.container.setVendorPrefixStyle("-webkit-transform","translateZ("+this.options.initialZOffset+"px)")
},__setupAxes:function(){this.elements.axes={};this.elements.axes.x=new Element("div");
this.elements.axes.y=new Element("div");this.elements.axes.z=new Element("div");
this.elements.axes.x.addClassName(AC.Cube360.prefix+"-axis");this.elements.axes.y.addClassName(AC.Cube360.prefix+"-axis");
this.elements.axes.z.addClassName(AC.Cube360.prefix+"-axis");this.elements.axes.x.addClassName(AC.Cube360.prefix+"-axis-x");
this.elements.axes.y.addClassName(AC.Cube360.prefix+"-axis-y");this.elements.axes.z.addClassName(AC.Cube360.prefix+"-axis-z");
this.elements.axes.x.setVendorPrefixStyle("-webkit-transform","rotateX("+this.options.initialXRotation+"deg)");
this.elements.axes.y.setVendorPrefixStyle("-webkit-transform","rotateY("+this.options.initialYRotation+"deg)");
this.elements.axes.z.setVendorPrefixStyle("-webkit-transform","rotateZ(0)")}};if(typeof Object.synthesize!=="undefined"){Object.synthesize(AC.Cube360.prototype)
}AC.Cube360.Shapes=Class.create({initialize:function(b){this.elements={};this.faces=b
},setup:function(b){this.cube360=b;this.elements.container=this.cube360.innermostAxis();
this.__setupFaces(this.faces)},__setupFaces:function(){for(i=0;i<this.faces.length;
i++){if(typeof this.faces[i]==="string"){this.faces[i]=this.__setupImage(this.faces[i],i)
}this.elements.container.appendChild(this.faces[i])}},__setupImage:function(f,d){var e=new Image();
e.src=f;e.className=AC.Cube360.prefix+"-face ac-cube360-face-"+d;e.id=AC.Cube360.prefix+"-face-"+this.cube360.id()+"-"+d;
e.alt="";return e}});AC.Cube360.Shapes.isValidShape=function(b){return true};AC.Cube360.Shapes.Cube=Class.create(AC.Cube360.Shapes,{__defaultOptions:{sideLength:400,fixAliasOnEdges:true},initialize:function($super,d,c){$super(d);
this.options=Object.extend(Object.clone(this.__defaultOptions),c||{})},setup:function($super,h){$super(h);
var l;var j=(this.options.sideLength/2);var k=(this.options.fixAliasOnEdges===true)?this.options.sideLength+1:this.options.sideLength;
var m=function(a){a.setStyle("height:"+k+"px");a.setStyle("width:"+k+"px")};for(l=0;
l<this.faces.length;l++){var g;switch(l){case 0:g="translateY(-"+j+"px) rotate3d(1,0,0,-90deg) rotate3d(0,0,1,180deg)";
break;case 1:g="translateZ(-"+j+"px) rotate3d(0,0,0,0)";break;case 2:g="translateX("+j+"px) rotate3d(0,1,0,-90deg)";
break;case 3:g="translateZ("+j+"px) rotate3d(0,1,0,180deg)";break;case 4:g="translateX(-"+j+"px) rotate3d(0,1,0,90deg)";
break;default:g="translateY("+j+"px) rotate3d(1,0,0,90deg)";break}this.faces[l].setVendorPrefixStyle("-webkit-transform",g);
m(this.faces[l])}m(this.cube360.elements.axes.x);m(this.cube360.elements.axes.y);
m(this.cube360.elements.axes.z);m(this.cube360.elements.container)}});