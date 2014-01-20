AC.define("iphone/shared/ac_autogallery/Types/video-takeover",[],function(){var a=AC.AutoGallery;
var c=AC.Element;var b=function b(){try{var g,f,j,h,k;g=document.createElement("div");
c.setStyle(g,{visibility:"hidden",position:"absolute",left:"0",top:"-480px",width:"848px",height:"480px"});
f=document.createElement("div");c.setStyle(f,{visibility:"hidden",position:"absolute",left:"0",top:"-480px",width:"848px",height:"480px"});
document.body.appendChild(f);j=Media.create(g,"",{id:"test-controller",autohref:true,width:848,height:480,autoplay:false,jsonUrl:false,expectingMovieJson:false,controller:false});
h=new Media.ControlsWidget(f);j.setControlPanel(h);k=h.controllerType.toString();
j.setControlPanel(null);document.body.removeChild(f);return k}catch(i){return false
}};var e=(b()==="slim")?800:540;var d={document:{documentElement:"width:100%; min-height:"+e+"px; margin:0; padding:0; border:0; background:#fff;",body:"width:100%; min-height:"+e+"px; margin:0; padding:0; border:0;"},selectAll:{'> *:not([class*="ACMedia"])':"display:none;"},view:"display:block; position:absolute; z-index:10000; left:0; right:0; top:0; bottom:0;",section:"display:block; position:absolute; z-index:10000; left:0; right:0; top:0; bottom:0;"};
a.addType("video-takeover",{shouldAnimateContentChange:false,ensureInView:false,heightFromFirstSection:false},function(){},"video",{delegate:{updateLayout:function(){if(this.__onResizeElement){var i=document.documentElement.clientHeight||window.innerHeight||document.documentElement.offsetHeight;
var h=document.body.offsetHeight;var f=(i>h)?i:h;var g=Math.round((f/2)-(480/2));
if(g<0){g=0}AC.Element.setStyle(this.__onResizeElement,{paddingTop:g+"px",visibility:"visible"})
}},__onResize:function(f){if(this.__onResizeElement){this.updateLayout()}},willShow:function(m,l,g){if(g.id.match(/^video-/)){this.__currentScrollY=window.scrollY||document.documentElement.scrollTop;
for(var p in d.document){var j=document[p];j.setAttribute("data-previous-style",j.style.cssText);
j.style.cssText=d.document[p]}for(var h in d.selectAll){var f=AC.Element.selectAll(h);
var k,n;for(k=0,n=f.length;k<n;k+=1){var j=f[k];j.setAttribute("data-previous-style",j.style.cssText);
j.style.cssText=d.selectAll[h]}}g.content.setAttribute("data-previous-style",g.content.style.cssText);
g.content.style.cssText=d.section+" visibility:hidden;";var o=m.view.view();this.__parentNode=o.parentNode;
o.setAttribute("data-previous-style",o.style.cssText);o.style.cssText=d.section;
document.body.appendChild(o);m.options.alwaysUseKeyboardNav=true;this.__view=m;
this.__onResizeElement=g.content;this.__boundOnResize=this.__onResize.bindAsEventListener(this);
AC.Element.addEventListener(window,"resize",this.__boundOnResize,false)}},didShow:function(i,g,f){if(f.id.match(/^video-/)){this.updateLayout();
if(!AC.Element.select("a.close",f.content)){var h=document.createElement("a");h.href="#SwapViewFirstSection";
h.className="close";h.innerHTML="<span></span>";f.content.appendChild(h)}window.scrollTo(0,0)
}else{i.view.view().style.height=f.content.offsetHeight+"px"}},willClose:function(m,l,g){if(l&&l.id.match(/^video-/)){for(var p in d.document){var j=document[p];
j.style.cssText=j.getAttribute("data-previous-style");j.removeAttribute("data-previous-style")
}for(var h in d.selectAll){var f=AC.Element.selectAll(h);var k,n;for(k=0,n=f.length;
k<n;k+=1){var j=f[k];j.style.cssText=j.getAttribute("data-previous-style");j.removeAttribute("data-previous-style")
}}l.content.style.cssText=l.content.getAttribute("data-previous-style");l.content.removeAttribute("data-previous-style");
var o=m.view.view();this.__parentNode.appendChild(o);o.style.cssText=o.getAttribute("data-previous-style",o.style.cssText);
o.removeAttribute("data-previous-style");delete this.__parentNode;if(this.__currentScrollY){window.scrollTo(0,this.__currentScrollY);
delete this.__currentScrollY}m.options.alwaysUseKeyboardNav=false;AC.Element.removeEventListener(window,"resize",this.__boundOnResize,false);
delete this.__boundOnResize;delete this.__onResizeElement;delete this.__view}}}});
Event.onDOMReady(function(){var g,h,f;var i=function(k){for(var j in AC.AutoGallery.galleries){if(AC.Element.select("a[href*="+k+"]",AC.AutoGallery.galleries[j].__wrapper)){return AC.AutoGallery.galleries[j]
}}};g=document.location.hash.toString().replace(/^#/,"");if(typeof tracker==="object"&&g.indexOf("video-")===0){tracker.mediaType="video";
h=i(g);if(h){f=h.currentSection;if(f){tracker.pageName(f)}}}})});AC.define("videos/bootstrap",["require","iphone/shared/ac_autogallery/Types/video-takeover"],function(a){var b=a("iphone/shared/ac_autogallery/Types/video-takeover")
});