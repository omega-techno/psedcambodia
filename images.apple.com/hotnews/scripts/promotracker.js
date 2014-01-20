Event.onDOMReady(function(){var a;if(a=$("promos")){a.observe("mousedown",function(c){var d=null,b=null,e=null;
if(d=c.findElement("div")){if(b=d.readAttribute("id")){b=b.replace(/promo/,"")}}if(e=c.findElement("img")){e=e.src;
e=e.substring(e.lastIndexOf("../index.html")+1,e.length)}if(b!=null&&e!=null){AC.Tracking.trackClick({prop2:b,prop3:"p@"+e+" - "+AC.Tracking.pageName()},this,"o","p@"+e+" - "+AC.Tracking.pageName())
}})}});
