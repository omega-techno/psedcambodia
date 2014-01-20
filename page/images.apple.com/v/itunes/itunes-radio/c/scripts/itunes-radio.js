AC.onDOMReady(function(){var f=AC.Element.getElementById("start-listening");var j=AC.Element.getElementById("featured-stations");
var g=AC.Environment.Browser.os==="iOS";if(g){if(AC.Environment.Browser.osVersion<"7.0"){AC.Element.addClassName(f,"disabled");
AC.Element.addClassName(j,"disabled")}else{if(AC.Environment.Browser.osVersion>="7.0"){AC.Element.removeClassName(f,"disabled");
AC.Element.removeClassName(j,"disabled")}}}var h=$$("#itunes-radio-intro .inlinevideo-section");
var i=new AC.ViewMaster.Viewer($$("#itunes-radio-intro .inlinevideo-section"),"itunes-radio-intro","trigger-intro-video",{silentTriggers:true,ensureInView:true})
});