var LanguageChooser=AC.Class({initialize:function(i,g,h,j,k,l){this._updateHash=!!l;
this._defaultLanguage=i;this._view=$(g);this._viewer=null;this._storageKey=j;this._triggers=[];
this._select=$(h);this._language=null;AC.Object.synthesize(this);this.setLanguage(window.location.hash.replace("#",""));
if(!this.language()){this.setLanguage(AC.Storage.getItem(this._storageKey))}if(!this.language()){this.__updateLanguageFromNavigator()
}this.__updateLanguageChooser(this.language());this.__createTriggers(this.language(),k);
this.__setupViewer();this.select().observe("change",this.__onSelect.bindAsEventListener(this))
},__onSelect:function(d){var c=this.select().value;this.setLanguage(c);this.viewer().show(this.viewer().sectionWithId(c))
},__updateLanguageFromNavigator:function(){var b="en";if(typeof window.navigator.language!=="undefined"){b=window.navigator.language.toLowerCase().replace(/(-.*)/,"")
}else{if(typeof window.navigator.browserLanguage!=="undefined"){b=window.navigator.browserLanguage.toLowerCase().replace(/(-.*)/,"")
}}this.setLanguage(b)},setLanguage:function(b){if(b===""){return}this._language=b;
AC.Storage.setItem(this.storageKey(),b);if(this.updateHash()){window.location.hash=b
}},__updateLanguageChooser:function(f){var e=this.select().options;var d;for(d=0;
d<e.length;d+=1){if(e[d].value===f){this.select().selectedIndex=d;return true}}return this.setLanguage(this.defaultLanguage())
},__createTriggers:function(j,l){var k=this.defaultLanguage();var i=this.select().options;
var n;var m=this.select().id;var h=function(a){var b=new Element("a");var c=(a===k)?"#"+a:l+a+".html#"+a;
b.addClassName(m);b.setAttribute("href",c);return b};for(n=0;n<i.length;n+=1){this.triggers()[n]=h(i[n].value)
}},__setupViewer:function(){var b=new AC.ViewMaster.Viewer(this.triggers(),this.view(),this.select().id,{shouldAnimateContentChange:false,initialId:this.language(),silentTriggers:true});
b.setDelegate(this);this.setViewer(b)},willShow:function(f,d,e){if(e){this.__updateLanguageChooser(e.id)
}}});