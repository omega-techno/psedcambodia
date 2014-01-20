Element.addMethods({trackTouches:function(K,G,C,I,M){var D,z,F,e,H,A,B,v=false,E,x={},w=false,J;
if(!M){M={}}var J={stopEvent:true,stopThreshold:0};Object.extend(J,M);if(typeof J.preventDefault!=="undefined"){try{console.warn("trackTouches.options.preventDefault is deprecated. Use trackTouches.options.stopEvent instead.")
}catch(y){}J.stopEvent=J.preventDefault}function L(){if(event.touches){if(event.touches.length>1){return false
}if(event.touches.length){if(J.stopEvent===true){event.preventDefault();event.stopPropagation()
}D,z={},F={},e={},H,A={},v=false,E={},x={}}}}function N(){if(K.className.match("paginglock")){try{console.warn('Lock classname "paginglock" is deprecated. Please use "toucheslock".')
}catch(g){}}if(w=!!(K.className.match("toucheslock")||K.className.match("paginglock"))){return
}if(event.touches||event.changedTouches){if(event.touches.length>1){return false
}if(event.touches.length||event.changedTouches){var c={x:(event.touches.length)?event.touches[0].clientX:event.changedTouches[0].clientX,y:(event.touches.length)?event.touches[0].clientY:event.changedTouches[0].clientY};
var i={};for(var a in event){if(event.hasOwnProperty(a)&&a!=="layerX"&&a!=="layerY"){i[a]=event[a]
}}i.originalEvent=event;i.type="touch";if(event.type==="touchend"&&!z.x&&!z.y){z.x=c.x;
z.y=c.y}if(!!z.x&&!!z.y){v={x:parseInt(z.x-c.x),y:parseInt(z.y-c.y)};v.abs={x:Math.abs(v.x),y:Math.abs(v.y)};
var b=parseInt(A.x-c.x,10)||0,d=parseInt(A.y-c.y,10)||0;if(b!==0){x.x=(b<0)?"left":"right"
}if(d!==0){x.y=(d<0)?"up":"down"}if(typeof E.x==="undefined"){E.x=0}else{if(x.x===F.x){E.x+=Math.abs(c.x-e.x)
}else{E.x=Math.abs(c.x-e.x)}}if(typeof E.y==="undefined"){E.y=0}else{if(x.y===F.y){E.y+=Math.abs(c.y-e.y)
}else{E.y=c.y-e.y}}v.current={x:E.x,y:E.y};F.x=x.x;F.y=x.y;if(event.touches.length){var h=Date.now();
var j=h-H;B=(j>0)?((Math.pow(Math.abs(A.x-c.x),2)+Math.pow(Math.abs(A.y-c.y),2))/2)/j:B
}A=c;i.time=H=h;i.duration=D-H;i.speed=B;i.direction=x;i.difference=v;i.startCoords=z;
i.coords=c;if(event.touches.length){C(i)}else{I(i)}}else{D=Date.now();B=0;z=i.startCoords=c;
A=c;G(i)}}if(i.difference&&i.difference.abs&&((J.stopEvent=="horizontal"&&i.difference.abs.x>i.difference.abs.y+J.stopThreshold)||(J.stopEvent=="vertical"&&i.difference.abs.y>i.difference.abs.x+J.stopThreshold))){event.preventDefault();
event.stopPropagation()}if(J.stopEvent&&event.type=="touchend"&&v.x===0&&v.y===0){var f=event.findElement("a");
if(f&&f.href){document.location=f.href}}e={x:c.x,y:c.y}}}Event.observe(K,"touchstart",L);
Event.observe(K,"touchmove",N);Event.observe(K,"touchend",N);Event.observe(K,"touchcancel",N)
},pagingView:function(k,i,e,h,l){try{console.warn("Element.pagingView is deprecated. Use Element.trackTouches instead.")
}catch(j){}k.trackTouches(i,e,h,l)}});document.fire("ac:trackTouches:load");document.fire("ac:pagingView:load");