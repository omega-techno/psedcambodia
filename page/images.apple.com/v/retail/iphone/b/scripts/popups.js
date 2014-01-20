Event.onDOMReady(function(){var b=$$('a[target^="popup"]');b.each(function(a){a.observe("click",function(h){var i=a.target.split("popupw");
i=i[1].split("h");var j=parseInt(i[0]),k=parseInt(i[1]);var l="height="+k+",width="+j+"";
h.stop();window.open(a.href,"name",l)})})});