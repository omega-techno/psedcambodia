(function(){var c=function(){var a=document.createElement("canvas");canvasSupported=!!(a.getContext&&a.getContext("2d"));
c=function(){return canvasSupported};return canvasSupported};var d=function(){var a=(typeof document.body.style.webkitTransform==="string"||typeof document.body.style.MozTransform==="string"||typeof document.body.style.msTransform==="string"||typeof document.body.style.OTransform==="string"||typeof document.body.style.transform==="string");
d=function(){return a};return a};AC.BatteryClock=Class.create({__defaultOptions:{duration:5,radius:100,angleHours:300,angleMinutes:3600,initialHours:0,initialMinutes:0,backgroundAngleHours:360,animationTimingFunction:function(i,j,a,b){i/=b/2;
if(i<1){return a/2*i*i+j}i--;return -a/2*(i*(i-2)-1)+j},fillStyle:"#19E063",animatedFillStyle:"#19E063"},initialize:function(j,a,h){if(!c()||!d()){return false
}var i=this;if(typeof h!=="object"){h={}}this._options=Object.extend(Object.clone(this.__defaultOptions),h);
this._hasAnimated=false;this._elements={};this._elements.container=$(j);this._canvas=document.createElement("canvas");
this._canvas.width=this._options.radius*2;this._canvas.height=this._options.radius*2;
this._elements.container.appendChild(this._canvas);this._context=this._canvas.getContext("2d");
this._elements.reflection=this.__addImage("../../v/macbook-pro/e/images/clock_numbers.svg");
this._elements.min_hand=this.__addImage("../../v/macbook-pro/e/images/clock_minute.svg");
this._elements.hour_hand=this.__addImage("../../v/macbook-pro/e/images/clock_hour.svg");
this._elements.container.addClassName("enhanced");this.overlayGradient=this._context.createLinearGradient(this._options.radius,0,this._options.radius,this._options.radius*2);
this.innerShadowGradient=this._context.createRadialGradient(this._options.radius,this._options.radius+20,30,this._options.radius,this._options.radius,this._options.radius);
this.innerShadowGradient.addColorStop(0,"transparent");this.innerShadowGradient.addColorStop(0.85,"transparent");
this.innerShadowGradient.addColorStop(0.99,"rgba(0,0,0,0.6)");this.innerShadowGradient.addColorStop(1,"transparent");
this.draw(0,true);var b=(AC.Environment.Browser.name==="Safari Mobile"&&AC.Environment.Feature.isRetina())?2.8:1;
this._showOnScroll=new AC.ShowOnScroll($(a),{timeInView:b});this._showOnScroll.setDelegate(this);
Object.synthesize(this)},__addImage:function(a){var b=new Element("img");b.src=a;
this._elements.container.appendChild(b);return b},draw:function(p,n){this.duration=this._options.duration*1000;
this.initialHours=this._options.initialHours;this.initialMinutes=this._options.initialMinutes;
this.currentAnimationTime=0;var a=(AC.Environment.Browser.name==="IE")?"":" translateZ(0)";
var o=0,r=0,q=0,t={x:this._canvas.width/2,y:this._canvas.height/2};var b=0;var s=1.57,m=13;
this._context.clearRect(0,0,this._canvas.width,this._canvas.height);this.currentAnimationTime=(this.startTime)?new Date().getTime()-this.startTime:0;
r=this._options.animationTimingFunction(this.currentAnimationTime,this.initialHours,this._options.angleHours,this.duration);
q=this._options.animationTimingFunction(this.currentAnimationTime,this.initialMinutes,this._options.angleMinutes,this.duration);
o=(r*Math.PI/180);b=(this._options.backgroundAngleHours*Math.PI/180);initialBackgroundAngleInRadians=(this._options.initialHours*Math.PI/180);
this._elements.hour_hand.setVendorPrefixStyle("transform","rotate("+r+"deg)"+a);
this._elements.min_hand.setVendorPrefixStyle("transform","rotate("+q+"deg)"+a);
this._context.beginPath();this._context.fillStyle="#E6E7E8";this._context.arc(t.x,t.y,this._options.radius-m,-s,b-1.57,false);
this._context.lineTo(t.x,t.y);this._context.closePath();this._context.fill();this._context.beginPath();
this._context.fillStyle=this._options.animatedFillStyle;this._context.arc(t.x,t.y,this._options.radius-m,-s,o-1.57,false);
this._context.lineTo(t.x,t.y);this._context.closePath();this._context.fill();this._context.beginPath();
this._context.fillStyle=this._options.fillStyle;this._context.arc(t.x,t.y,this._options.radius-m,-s,initialBackgroundAngleInRadians-1.57,false);
this._context.lineTo(t.x,t.y);this._context.closePath();this._context.fill();this._context.fillStyle="#FFFFFF";
this._context.strokeStyle="#000000";this._context.lineWidth=6;this._context.beginPath();
this._context.arc(t.x,t.y,9,0,Math.PI*2,false);this._context.closePath();this._context.fill();
this._context.beginPath();this._context.arc(t.x,t.y,9,0,Math.PI*2,false);this._context.closePath();
this._context.stroke();this._context.strokeStyle="#E6E7E8";this._context.lineWidth=3;
this._context.beginPath();this._context.arc(t.x,t.y,this._options.radius-2.5,0,Math.PI*2,false);
this._context.closePath();this._context.stroke();if(this.currentAnimationTime<this.duration&&n!==true){requestAnimationFrame(this.draw.bind(this))
}else{if(this.currentAnimationTime>=this.duration&&n!==true){AC.NotificationCenter.publish("clock-animation-complete",{target:this,data:{}},false)
}}},animate:function(){this.startTime=new Date().getTime();this.draw();this._hasAnimated=true
},visitorEngaged:function(){if(!this._hasAnimated){this.animate()}}})}());