Event.onDOMReady(function(){AC.AnchorPageScroller.defaultAnchorScroller.view.delegate={onScrollEnd:function(){var b=arguments[1];
var d;var a;if(b==="top"){d=document.body}else{d=document.getElementById(b)}var c=AC.Element.select("h1, h2, [role=heading], .title",d);
if(c){if(!c.getAttribute("tabindex")){c.tabIndex=-1}c.focus()}}}});