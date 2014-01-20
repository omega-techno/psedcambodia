AC.define("iphone/shared/ac_autogallery/Types/video-takeover",[],function(){var d=AC.AutoGallery;
var c={document:{documentElement:"width:100%; height:100%; overflow:hidden; background:#fff;",body:"width:100%; height:100%; overflow:hidden; margin:0; padding:0; border:0;"},selectAll:{"> *":"visibility:hidden; opacity:0;"},section:"display:block; position:absolute; z-index:10000; left:0; right:0; top:0; bottom:0; width:100%; height:100%;"};
d.addType("video-takeover",{shouldAnimateContentChange:false,ensureInView:false,heightFromFirstSection:false},function(){},"video",{delegate:{updateLayout:function(){if(this.__onResizeElement){var a=window.innerHeight||document.documentElement.offsetHeight;
var b=Math.round((a/2)-(480/2));if(b<0){b=0}AC.Element.setStyle(this.__onResizeElement,{paddingTop:b+"px",visibility:"visible"})
}},__onResize:function(a){if(this.__onResizeElement){this.updateLayout()}},willShow:function(n,o,s){if(s.id.match(/^video-/)){this.__currentScrollY=window.scrollY||document.documentElement.scrollTop;
for(var a in c.document){var q=document[a];q.setAttribute("data-previous-style",q.style.cssText);
q.style.cssText=c.document[a]}for(var r in c.selectAll){var t=AC.Element.selectAll(r);
var p,i;for(p=0,i=t.length;p<i;p+=1){var q=t[p];q.setAttribute("data-previous-style",q.style.cssText);
q.style.cssText=c.selectAll[r]}}s.content.setAttribute("data-previous-style",s.content.style.cssText);
s.content.style.cssText=c.section+" visibility:hidden;";var b=n.view.view();this.__parentNode=b.parentNode;
b.style.height="";document.body.appendChild(b);n.options.alwaysUseKeyboardNav=true;
this.__view=n;this.__onResizeElement=s.content;this.__boundOnResize=this.__onResize.bindAsEventListener(this);
AC.Element.addEventListener(window,"resize",this.__boundOnResize,false)}},didShow:function(a,g,h){if(h.id.match(/^video-/)){this.updateLayout();
if(!AC.Element.select("a.close",h.content)){var b=document.createElement("a");b.href="#SwapViewFirstSection";
b.className="close";b.innerHTML="<span></span>";h.content.appendChild(b)}window.scrollTo(0,0)
}else{a.view.view().style.height=h.content.offsetHeight+"px"}},willClose:function(n,o,s){if(o&&o.id.match(/^video-/)){for(var a in c.document){var q=document[a];
q.style.cssText=q.getAttribute("data-previous-style");q.removeAttribute("data-previous-style")
}for(var r in c.selectAll){var t=AC.Element.selectAll(r);var p,i;for(p=0,i=t.length;
p<i;p+=1){var q=t[p];q.style.cssText=q.getAttribute("data-previous-style");q.removeAttribute("data-previous-style")
}}o.content.style.cssText=o.content.getAttribute("data-previous-style");o.content.removeAttribute("data-previous-style");
var b=n.view.view();this.__parentNode.appendChild(b);delete this.__parentNode;if(this.__currentScrollY){window.scrollTo(0,this.__currentScrollY);
delete this.__currentScrollY}n.options.alwaysUseKeyboardNav=false;AC.Element.removeEventListener(window,"resize",this.__boundOnResize,false);
delete this.__boundOnResize;delete this.__onResizeElement;delete this.__view}}}});
Event.onDOMReady(function(){var g,b,h;var a=function(e){for(var f in AC.AutoGallery.galleries){if(AC.Element.select("a[href*="+e+"]",AC.AutoGallery.galleries[f].__wrapper)){return AC.AutoGallery.galleries[f]
}}};g=document.location.hash.toString().replace(/^#/,"");if(typeof tracker==="object"&&g.indexOf("video-")===0){tracker.mediaType="video";
b=a(g);if(b){h=b.currentSection;if(h){tracker.pageName(h)}}}})});AC.define("videos/bootstrap",["require","iphone/shared/ac_autogallery/Types/video-takeover"],function(d){var c=d("iphone/shared/ac_autogallery/Types/video-takeover")
});