AC.AutoGallery.addType("featured-stores",{animationDuration:1},Prototype.emptyFunction,"hero",{});
AC.AutoGallery.addSlideshowType("retail-hero",{delay:9000,discontinuousPreviousNext:false});
AC.AutoGallery.addType("hero-retail",{useKeyboardNav:true},Prototype.emptyFunction,"_base",{delegate:{willShow:function(i,l,g){var h=new Date().getHours();
var j=AC.Element.select(".time",g.content);var k=window.location.search;if((j!=null)&&(h<=4||h>=22||k.match("walk-in-limited-bopis-on"))){j.innerHTML='<a href="http://store.apple.com/us/ipad">buy online</a>'
}}}});Event.onDOMReady(function(){var e=new Date().getHours();var d=AC.Element.select(".time");
var f=window.location.search;if((d!=null)&&(e<=4||e>=22||f.match("walk-in-limited-bopis-on"))){d.innerHTML='<a href="http://store.apple.com/us/ipad">buy online</a>'
}});