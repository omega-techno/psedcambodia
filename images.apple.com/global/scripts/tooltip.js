AC.Tooltip=Class.create();AC.Tooltip.options={src:"http://images.apple.com/global/elements/zoomerlay/zoomerlay_tooltip.png",pos:"top",dist:5,deadspace:0};
AC.Tooltip.instances=$A([]);Object.extend(AC.Tooltip.prototype,{initialize:function(a,b){if(!AC.Tooltip.instances.length&&AC.OverlayPanel){this.listenForEvent(AC.OverlayPanel.overlay,"beforePop",true,function(){AC.Tooltip.instances.invoke("stop")
});this.listenForEvent(AC.OverlayPanel.overlay,"afterClose",true,function(){AC.Tooltip.instances.invoke("start")
})}AC.Tooltip.instances.push(this);this.options=Object.extend(Object.clone(AC.Tooltip.options),b);
this.initialized=true;this.links=a;this.activeLink;this.ie6=!!AC.Detector.getAgent().match(/msie\s+6/);
this.links.each(function(c){c.removeAttribute("title")});this.tooltip=$(new Image());
this.tooltip.onload=function(){document.body.appendChild(this.tooltip);this.imgWidth=this.tooltip.width;
this.imgHeight=this.tooltip.height;this.tooltip.setStyle({display:"none",position:"absolute",zIndex:9999,behavior:"none"})
}.bind(this);this.tooltip.src=this.options.src;this.bindMouseMove=this.onMouseMove.bind(this);
this.start()},start:function(){$(document).observe("mousemove",this.bindMouseMove)
},stop:function(){$(document).stopObserving("mousemove",this.bindMouseMove);this.onRollOut()
},isCursorOver:function(f,d){var g=d.cumulativeOffset(),b=g.left,e=g.top,a=g.left+d.getWidth(),c=g.top+d.getHeight();
return(f.pageX>=b&&f.pageX<a&&f.pageY>=e&&f.pageY<c)},isInDeadspace:function(c,b){if(!this.options.deadspace||isNaN(this.options.deadspace)){return false
}var d=b.cumulativeOffset(),a=false;switch(this.options.pos){case"top":a=(c.pageY-d.top<=this.options.deadspace);
break;case"bottom":a=((c.pageY+this.options.deadspace)-(d.top+b.getHeight())>=0);
break;case"left":a=(c.pageX-d.left<=this.options.deadspace);break;case"right":a=((c.pageX+this.options.deadspace)-(d.left+b.getWidth())>=0);
break}return a},onMouseMove:function(a){this.tooltip.setStyle({left:a.pageX+"px",top:a.pageY+"px"});
var b;this.links.each(function(c){if(this.isCursorOver(a,c)&&!this.isInDeadspace(a,c)){b=c;
throw $break}}.bind(this));if(b){if(b!=this.activeLink){if(this.activeLink){this.activeLink.removeClassName("hover")
}this.activeLink=b;this.activeLink.addClassName("hover");if(!this.ie6){this.showTooltip()
}}}else{this.onRollOut()}},onRollOut:function(){if(this.activeLink){this.activeLink.removeClassName("hover");
this.activeLink=null;if(!this.ie6){this.hideTooltip()}}},showTooltip:function(){if(this.effect){this.effect.cancel()
}this.tooltip.setStyle({display:"block",width:0,height:0});this.effect=new Effect.Parallel([new Effect.Appear(this.tooltip,{sync:true}),new Effect.Morph(this.tooltip,{style:{width:this.imgWidth+"px",height:this.imgHeight+"px"},sync:true})],{duration:0.2,afterUpdate:this.setTooltipMargins.bind(this)})
},hideTooltip:function(){if(this.effect){this.effect.cancel()}this.effect=this.effect=new Effect.Morph(this.tooltip,{style:{width:"0px",height:"0px"},duration:0.2,afterUpdate:this.setTooltipMargins.bind(this)});
this.effect=new Effect.Parallel([new Effect.Fade(this.tooltip,{sync:true}),new Effect.Morph(this.tooltip,{style:{width:"0px",height:"0px"},sync:true})],{duration:0.2,afterUpdate:this.setTooltipMargins.bind(this)})
},setTooltipMargins:function(){var c=this.tooltip.getWidth(),a=this.tooltip.getHeight();
switch(this.options.pos){case"top":var b={marginLeft:-Math.round(c/2)+"px",marginTop:-(a+this.options.dist)+"px"};
break;case"bottom":var b={marginLeft:-Math.round(c/2)+"px",marginTop:this.options.dist+"px"};
break;case"left":var b={marginLeft:-(c+this.options.dist)+"px",marginTop:-Math.round(a/2)+"px"};
break;case"right":var b={marginLeft:this.options.dist+"px",marginTop:-Math.round(a/2)+"px"};
break}this.tooltip.setStyle(b)}});Object.extend(AC.Tooltip.prototype,Event.Listener);
