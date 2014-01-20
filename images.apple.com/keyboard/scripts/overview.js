var delegate={didAppendContent:function(a,c){this.view=a;var d=a.currentSection;
if(d.movieLink){if(!d.close){d.close=new Element("a",{className:"close "+a.triggerClassName,href:"#"}).insert("Close");
d.content.insertBefore(d.close,d.content.firstChild)}var b=(a.previousSection)?a.previousSection.id:a.orderedSections[0];
d.close.href="#"+b}},didShow:function(b,c,a){this.didAppendContent(b,a.content);
this.didShow=function(){}}};Event.onDOMReady(function(){var b=new AC.ViewMaster.Viewer($$("a.herolink"),"hero","herolink",{silentTriggers:true});
b.setDelegate(Object.extend(delegate,{willShow:function(f,g,e){var d=e.id.match(/^hero-\d$/)?true:false
}}));var a=new AC.ViewMaster.Viewer($$(".gallery-mouse-sections"),"gallery-mouse","gallery-mouse",{silentTriggers:true});
a.setDelegate(delegate);var c=new AC.ViewMaster.Tracker("click")});
