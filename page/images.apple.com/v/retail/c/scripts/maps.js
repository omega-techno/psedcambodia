AC.namespace("AC.retail.Map");AC.retail.Map=(function(){var g=AC.retail.util.DOM.query,f=AC.retail.util.environment,e=AC.Retina.sharedInstance(),h=function(b,a){if(!b){throw"Map constructor needs DOM Element container as argument"
}if(!(this instanceof h)){return new h(b,a)}this._container=(typeof b==="object")?b:g(b)[0];
this._controls=!!a.controls;this._zoom=a.zoom||4;this._maxZoom=a.maxZoom;this._minZoom=a.minZoom;
this._canZoom=!!a.canZoom;this.setDisplay(!!a.display);this._pins=[];this._latlngStack=[]
};h.prototype={_constructGoogleMap:function(){this._googleMapInstance=new google.maps.Map(this._container,{zoom:this._zoom,maxZoom:(!this._canZoom)?this._zoom:this._maxZoom,minZoom:(!this._canZoom)?this._zoom:this._minZoom,streetViewControl:false,mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!this._controls})
},_constructMarker:function(a,b,d){var c=e.shouldReplace()?b.replace(/[.]/,"_2x."):b;
b=new google.maps.MarkerImage(c,null,null,null,new google.maps.Size(d[0],d[1]));
return new google.maps.Marker({map:this._googleMapInstance,visible:!!b,icon:b,position:a})
},closeInfoBoxes:function(){this._pins.forEach(function(a){a[1].close()})},_constructInfoBox:function(c,b){var a=new h.InfoBox(c.position,this._googleMapInstance,b.infoBox,this);
google.maps.event.addListener(c,"click",function(d){this.closeInfoBoxes();a.show()
}.bind(this));return a},_autoPositionInfoBoxDelegate:function(l,a,b){var c;var d;
var k=l;k.y-=Math.abs(a);k.x-=b/3;c=this.getProjection().fromDivPixelToLatLng(k);
k.y+=Math.abs(a);k.x=l.x+b;d=this.getProjection().fromDivPixelToLatLng(k);this._map.panToBounds(new google.maps.LatLngBounds(c).extend(d))
},recalculateZoomAndBounds:function(a){a=a||this._latlngStack;var b=new google.maps.LatLngBounds();
a.forEach(function(c){b.extend(c)});this._googleMapInstance.fitBounds(b)},setDisplay:function(a){this._display=a;
if(a&&!this._googleMapInstance){this._constructGoogleMap();if(this._pinOptions){this.pin(this._pinOptions);
delete this._pinOptions}}else{if(this._googleMapInstance){if(a){this._container.style.visibility="visible"
}else{this._container.style.visibility="hidden"}}}return this},getPins:function(a){if(a!==undefined){return this._pins[a]
}return this._pins},disablePin:function(a){a[0].setMap(null);this._latlngStack.splice(this._latlngStack.indexOf(a[2]),1)
},clearAllPins:function(){this._pins.forEach(function(a){if(typeof a[1]==="object"){a[1].close()
}this.disablePin(a)},this);this._pins=[]},pin:function(c){var a,d,k,b=false,l=this._googleMapInstance;
if(!l){this._pinOptions=c}else{if(c.lat&&c.lng){a=new google.maps.LatLng(c.lat,c.lng);
this._latlngStack.push(a);d=this._constructMarker(a,c.icon,c.iconSize);if(c.infoBox){b=this._constructInfoBox(d,c);
b.delegate.willShow=c.infoBox.willShow||this._autoPositionInfoBoxDelegate.bind(b)
}if(c.centerMapBy==="bounds"){this.recalculateZoomAndBounds()}else{l.setCenter(a)
}this._pins.push([d,b,a])}}return this}};return h}());AC.namespace("AC.retail.Map.InfoBox");
AC.retail.Map.InfoBox=(function(){var k=AC.retail.util.DOM.query,l=AC.retail.util.template,j=AC.Object.extend,n=AC.Element,i=AC.retail.util.environment,h=AC.Retina.sharedInstance(),m=function(a,b,d,c){if(!(this instanceof m)){return new m(a,b,d)
}this._container=document.createElement("div");this._latlng=a;this._map=b;this._animationName=d.animationName;
this._retailmap=c;this.delegate={};this.onAdd=function(){var g,p,e=[],f=[];this._container.innerHTML=l(k("#"+d.templateID)[0],d.attributes);
this._container.style.position="absolute";this.getPanes().floatPane.appendChild(this._container);
Array.prototype.forEach.call(k("a",this._container),function(o){if(o.href.indexOf("#close")!==-1){g=o
}else{p=o;Event.observe(p,"mousedown",function(r){e=[r.pageX,r.pageY]});Event.observe(p,"click",function(r){r.cancelBubble=true;
f=[r.pageX,r.pageY];if(e[0]!==f[0]||e[1]!==f[1]){r.preventDefault()}})}});if(g){Event.observe(g,"click",function(o){o.preventDefault();
this.close()}.bind(this));this.close()}if(d.displayByDefault){setTimeout(function(){c.closeInfoBoxes();
this.show()}.bind(this),d.displayByDefaultDelayMs||500)}};this.setMap(b)};m.prototype=new google.maps.OverlayView();
j(m.prototype,{_reposition:function(){this._position=this.getProjection().fromLatLngToDivPixel(this._latlng);
this._container.style.left=this._position.x+"px";this._container.style.top=this._position.y+"px"
},draw:function(){this._reposition()},show:function(){this._container.style.display="block";
if(this._animationName){this._container.children[0].style[i.getDOMVendor()+"AnimationName"]=this._animationName;
this._container.children[0].style.opacity="1"}if(typeof this.delegate.willShow==="function"){this.delegate.willShow(this.getProjection().fromLatLngToDivPixel(this._latlng),this._container.children[0].offsetTop,this._container.children[0].clientWidth)
}},close:function(){if(this._animationName){this._container.children[0].style[i.getDOMVendor()+"AnimationName"]="";
this._container.children[0].style.opacity="0"}this._container.style.display="none"
}});return m}());