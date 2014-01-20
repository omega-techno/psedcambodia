(function(){var c=function(b,a){b=AC.Element.getElementById(b);var f=b.parentNode;
if(AC.Element.isElement(f)){while(f){if(typeof a==="function"){if(a(f)===false){break
}}if(f!==document.body){f=f.parentNode}else{f=null}}}};var d=function(b,a){b=AC.Element.getElementById(b);
var f=null;if(b!==null&&a===undefined){return b.parentNode}c(b,function(e){if(AC.Element.matchesSelector(e,a)){f=e;
return false}});return f};AC.onDOMReady(function(){var b={addSectionIdAsClassName:true,ensureInView:true,escapeToClose:true,heightFromFirstSection:true,imageLinkAutoCaptions:true,manageZ:1010,showFirstOnStopMovie:true,silentTriggers:true,useHTML5Tags:true};
var j={willAnimate:function(h,A,e,x,z,f){var v=AC.Element.select(".paddle-nav");
var B=d(e,".hero-gallery-content");var w=AC.Element.select(".video-hardware",B);
var y=AC.Element.select(".video-wrapper",B);var i=AC.Element.select(".moviePanel",e);
var g;if(AC.Element.hasClassName(e,"gallery-video")){l.stop();g=document.createElement("div");
g.setAttribute("id","spinner");AC.Element.insert(g,i,"first");AC.Element.addClassName(w,"fadeout");
AC.Element.addClassName(y,"tiltup");AC.Element.addClassName(y,"appear");window.setTimeout(function(){AC.Element.removeClassName(y,"appear")
},f*1000);h._animation(h.view,A,e,x,z,f);AC.Element.addClassName(v,"disabled")}if(AC.Element.hasClassName(A,"gallery-video")){AC.Element.addClassName(y,"appear");
AC.Element.removeClassName(w,"fadeout");AC.Element.removeClassName(y,"tiltup");
h._animation(h.view,A,e,x,z,f);AC.Element.removeClassName(v,"disabled")}}};var m=new AC.ViewMaster.Viewer([AC.Element.getElementById("drummer-video-content")],"drummer-video","drummer-video",b);
m.setDelegate(j);var a=new AC.ViewMaster.Viewer([AC.Element.getElementById("arpeggiator-video-content")],"arpeggiator-video","arpeggiator-video",b);
a.setDelegate(j);var k=new AC.ViewMaster.Viewer([AC.Element.getElementById("flexpitch-video-content")],"flexpitch-video","flexpitch-video",b);
k.setDelegate(j);var n=new AC.ViewMaster.SlideViewer(AC.Element.selectAll(".hero-gallery-content"),"hero-gallery","hero-gallery",{addSectionIdAsClassName:true,discontinuousPreviousNext:true,heightFromFirstSection:true,imageLinkAutoCaptions:true,initialId:"gallery-intro",manageZ:true,silentTriggers:true,useHTML5Tags:true,useKeyboardNav:true,useTouchEvents:false});
var l=new AC.ViewMaster.Slideshow(n,null,{autoplay:true,delay:6400});n.setDelegate({didShow:function(g,e,f){if(e){var h=AC.Element.select(".paddle-nav");
AC.Element.removeClassName(h,"disabled");if(e.content.id.match(/drummer/)){m.showFirst()
}if(e.content.id.match(/arpeggiator/)){a.showFirst()}if(e.content.id.match(/flexpitch/)){k.showFirst()
}}},willShow:function(i,h,p,e,f,g){if(i._currentTrigger){l.stop()}}})});Media.Spec.QuickTime._createEmbed=function(g,h){var a=document.createElement("embed");
var b=(Media.Detection.Firefox()&&AC.Environment.Browser.version<19);a.setAttribute("src",g);
a.setAttribute("type","video/quicktime");if(!b&&!Media.Detection.Opera()){a.setAttribute("wmode","transparent")
}a.setAttribute("postdomevents",true);a.setAttribute("controller",h.controller);
a.setAttribute("showlogo",false);a.setAttribute("scale","tofit");if(h){if(!isNaN(parseInt(h.width,10))){a.setAttribute("width",h.width)
}if(!isNaN(parseInt(h.height,10))){a.setAttribute("height",h.height)}if(typeof h.target!="undefined"){a.setAttribute("target",h.target)
}}return a};if(!ACUtils.Detector.isIE()){ACUtils.cumulativeOffset=function(b){var f=0,a=0;
do{if(b.className.indexOf("hero-gallery-content")<0){f+=b.offsetTop||0;a+=b.offsetLeft||0
}b=b.offsetParent}while(b);a+=((document.viewport.getDimensions().width-document.body.offsetWidth)/2);
return this._returnOffset(a,f)}}(function(){if(window.attachEvent){var b=function(){var l=document.compatible;
var e=!l?7:undefined;var m;var i;var n=[];if(l){m=l.length;if(m===0){e=parseInt(document.documentMode,10)
}if(m>0){for(i=0;i<m;i+=1){n.push(parseInt(l[i].version.match(/\d{1,2}/),10))}n=n.sort(function(g,h){return g-h
});e=n.pop()}}return e};var a=b();var f=function(){if(document.body.currentStyle){var e;
var o;var p;var r;var m=[];var n;var q=function(i,h){var g=false;c(i,function(j){if(j===h){return false
}if(j.currentStyle.hasLayout){g=true;return false}});return g};AC.Element.selectAll("a > * img").forEach(function(g){e=g.parentNode;
o=d(g,"a");if(q(g,o)&&g.height>0&&g.width>0){if(!AC.Element.select("ieclickbooster",o)){p=document.createElement("ieclickbooster");
r=AC.Element.getStyle(o,"position");if(r==="static"){AC.Element.setStyle(o,{position:"relative"})
}AC.Element.selectAll("> *",o).forEach(function(i){var h=parseInt(i.currentStyle.zIndex,10);
if(h>0){m.push(h)}});m.sort(function(h,i){return i-h});n=m[0]?m[0].toString():"1";
AC.Element.insert(p,o);AC.Element.setStyle(p,{display:"block",position:"absolute",top:"0",bottom:"0",left:"0",right:"0",background:"url(/global/elements/blank.gif)",cursor:"pointer",zIndex:n})
}}})}};AC.onDOMReady(function(){if(a<=7){f()}})}}())}());