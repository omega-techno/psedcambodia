(function(h,l,k,i,j,g){g.addType("design-fadein",{},i.emptyFunction,"image",{delegate:{didShow:function(a,c,d){if(!d.content.hasClassName("has-shown")){var e=k.selectAll(".text-callout",d.content);
e.forEach(function(f){k.addClassName(f,"reveal")});d.content.className+=" has-shown"
}if(c){if(!c.content.hasClassName("has-shown")){var b=k.selectAll(".text-callout",c.content);
b.forEach(function(f){k.removeClassName(f,"reveal")})}}}}});g.addType("nested",{useKeyboardNav:false},i.emptyFunction,"_base",{});
h(function(){(function(){var b;var a=k.select(".performance-chart");if(a){if(l.Feature.isCSSAvailable("transform")){a.className+=" chart-rotate"
}b=new j.Scroll(a,{classNamePrefix:"chart-",playOnVisitorEngaged:true});b.setDelegate({canPlay:function(){return(l.Feature.isCSSAvailable("transition")&&l.Feature.isCSSAvailable("transform"))
},play:function(){var c=k.select(".bars li:first-child .bar .text",a);var d=function(f){var e=f.target||f.srcElement;
if(f.propertyName==="opacity"&&e===c){b.didPlay();k.removeVendorPrefixEventListener(a,"transitionEnd",d)
}};k.addVendorPrefixEventListener(a,"transitionEnd",d)}})}}());(function(){var b;
var a=k.select(".wifi-beams");if(a){b=new j.Scroll(a,{classNamePrefix:"beams-",playOnVisitorEngaged:true,showOnScrollOptions:{timeInView:1.75}});
b.setDelegate({canPlay:function(d){if(k.hasClassName(d.container(),"nobeamforming")){var c=k.select(".beamoutline",d.container());
if(c){k.setStyle(c,"display:none")}}return(l.Feature.threeDTransformsAvailable()===true||typeof(document.body.style.MozPerspective)!=="undefined")&&l.Feature.isCSSAvailable("transform")&&l.Feature.isCSSAvailable("transition")&&l.Feature.isCSSAvailable("mask")
},play:function(){var c=k.select(".beam",a);var d=function(f){var e=f.target||f.srcElement;
if((f.propertyName==="transform"||"-webkit-transform")&&e===c){b.didPlay();k.removeVendorPrefixEventListener(a,"transitionEnd",d)
}};k.addVendorPrefixEventListener(a,"transitionEnd",d)}})}}());(function(){var b;
var a=k.getElementById("device-face-toggle");b=new j.Scroll(a,{classNamePrefix:"design-",playOnVisitorEngaged:true});
b.setDelegate({canPlay:function(){return(l.Feature.isCSSAvailable("transition")&&l.Feature.isCSSAvailable("transform"))
},play:function(){b.didPlay()}})}())})}(AC.onDOMReady,AC.Environment,AC.Element,AC.Function,AC.Ambient,AC.AutoGallery));