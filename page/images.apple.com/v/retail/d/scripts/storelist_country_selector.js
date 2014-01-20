(function(){function c(){var a=document.getElementsByClassName("listing"),b=a.length;
for(var f=0;f<b;f++){a[f].hide()}}function d(){var l=$$(".select")[0],j=$$(".menu li"),b=$("current_country"),a=b.getAttribute("data-init-storeSelector"),k=b.getAttribute("data-init-value");
$(k+"stores").show();if(AC.Detector.isMobile()||AC.Detector.isiPad()){var i="change"
}else{var i="click"}AC.addEvent(l,i,function(f){var g=(f.target)?f.target:f.srcElement;
if(AC.Detector.isMobile()||AC.Detector.isiPad()){selected=j[g.selectedIndex]}else{selected=g
}if(g.tagName==="LI"||g.tagName==="SELECT"){var h=selected.getAttribute("data-tag"),e=selected.innerHTML;
c();$("current_country").update(e);$(h+"stores").show();$$(".selection")[0].innerHTML=e
}})}Event.onDOMReady(function(){c();d()})}());