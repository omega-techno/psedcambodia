var activeTrigger={};Object.extend(activeTrigger,Event.Listener);Object.extend(activeTrigger,{initialize:function(b){this.listenForEvent(AC.ViewMaster,"ViewMasterWillShowNotification",false,this.willShow)
},willShow:function(m){var j=m.event_data.data.incomingView,k=m.event_data.data.outgoingView,n=j.viewMaster.orderedSections,i=j.viewMaster.orderedSections.length,h=$(j.viewMaster.__mask.parentNode).select(".page-border.left")[0],l=$(j.viewMaster.__mask.parentNode).select(".page-border.right")[0];
j.content.addClassName("active");if(h&&l){if(j.id==n[0]){h.style.display="none";
l.style.display="block"}else{if(j.id==n[i-1]){l.style.display="none";h.style.display="block"
}else{h.style.display="block";l.style.display="block"}}}}});activeTrigger.initialize();