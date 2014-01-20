AC.namespace("AC.retail.modules");AC.retail.modules.retailLocator=(function(){var p=AC.retail.util.DOM.query;
var t=AC.retail.util.DOM.setOpacity;var n=AC.Object.extend;var k=AC.retail.util.template;
var m=AC.retail.util.ajaxGet;var o=AC.Storage;var q=AC.retail.util.environment;
var l=AC.retail.util.generateExtension;var s;var r=function(b,a){var c;if(s){return s
}if(!(this instanceof r)){return new r()}this._eventManager=a;a.subscribeEvent(b,"::listItemsAvailable",function(f){var e=new Date().getTime();
var d=f.length<this._RealtimeSearchMinListItems;var g=(this._lastDisplayedAjaxTime||0)<(e-this._RealtimeSearchMinWaitTime);
if(d&&g&&Array.isArray(f)){this.getNewLocations(f[0])}}.bind(this));a.subscribeEvent(b,"::listItemSelected",function(d){if(!this._spinnerSetupComplete&&this._locatorView){this.spinner=this.spinner(this._locatorView)
}this.autoEngageSpinnerOnRequest(this.getNewLocations(d))}.bind(this));a.subscribeEvent(b,"::userEngagementChanged",function(d){if(!d&&this._setupComplete){this.currentListItem="";
this.toggleGallery(false);this.setDefaultLocation("none")}else{if(this._locatorView){this._lastListItem="";
this.toggleGallery(this._locatorView)}}}.bind(this));if(window.location.search){c=window.location.search.match(/\?q=(.*?)(&|$)/i);
if(c&&c[1]){this.setViewLocation(b,decodeURI(c[1]),1)}else{this.setViewLocation(b)
}}else{this.setViewLocation(b)}if(!AC.Detector.iOSVersion()){b.focus()}this._view=b;
s=this};r.prototype={_RealtimeSearchMinListItems:5,_RealtimeSearchMinWaitTime:1000,_ShowSpinnerAfterNetworkDelayedByMs:600,_getURL:"/global/scripts/ac_googlemap_json.php?storename=Apple+Store&q=",_iconDirectory:"/retail/locator/images/icons/",_pinIconMap:["pin_a","pin_b","pin_c","pin_d","pin_e","pin_f","pin_g","pin_h","pin_i","pin_j"],_listViewIconMap:["list_a","list_b","list_c","list_d","list_e","list_f","list_g","list_h","list_i","list_j"],toggleGallery:function(d){var f=this._locatorView;
var b=p(".gallery-swap .featured-stores")[0];var c=p(".gallery-swap")[0];var a;
var e="opacity";if(c&&c.getAttribute("data-swap-type")==="height"){e="height"}if(!b){d=true
}if(e==="height"){f.style.webkitTransition="max-height 1s ease";f.style.overflow="hidden";
f.style.maxHeight="0"}this._eventManager.subscribeEvent(f,"webkitTransitionEnd",function(g){if(this===g.srcElement&&!a){c.removeChild(f)
}});this.toggleGallery=function(g){if(!g&&a){b.style.display="block";if(e==="opacity"){f.style.position="absolute"
}if(q.getDOMVendor("webkit")){if(e==="height"){f.style.maxHeight="0"}else{if(e==="opacity"){f.style.webkitTransition="opacity 0.4s ease";
f.style.opacity="0"}}}else{c.removeChild(f)}c.removeClassName("toggled");a=false
}else{if(g&&!a){f.style.zIndex="1010";f.style.position="relative";if(e==="opacity"){f.style.opacity="1"
}if(b){c.insertBefore(f,b);b.style.display="none";if(e==="height"){setTimeout(function(){f.style.maxHeight="500px"
},10)}}else{c.appendChild(f);this.toggleGallery=function(h){if(!h){this.setLocationToEmpty()
}}}c.addClassName("toggled");a=true}}};this.toggleGallery(d)},_setupComplete:false,spinner:function(c){var b=document.createElement("div");
var a=false;b.className="spinner";b.innerHTML=p("#retail-locator-spinner")[0].innerHTML;
c.appendChild(b);this._spinnerSetupComplete=true;return{show:function(){b.style.visibility="visible";
t(b,0.7);a=true},close:function(){if(!q.getDOMVendor("webkit")){b.style.visibility="hidden"
}else{t(b,0)}a=false},getSpinnerState:function(){return a}}},_newLocationRequestDelegate:function(){if(this._spinnerSetupComplete&&this.spinner.getSpinnerState()){this.spinner.close()
}},autoEngageSpinnerOnRequest:function(a){if(!this._spinnerSetupComplete||!a){return
}window.setTimeout(function(){if(this._newLocationRequestPending){this.spinner.show()
}}.bind(this),this._ShowSpinnerAfterNetworkDelayedByMs)},setDefaultLocation:function(a){if(a){a=(a==="none")?"":a;
o.setItem("ACRetailLocatorLoc",a,30)}o.setItem("ACRetailLocatorGroup",this._currentGroupNumber,30)
},getDefaultLocation:function(){var b=o.getItem("ACRetailLocatorLoc")||"";var a=o.getItem("ACRetailLocatorGroup")||"";
return[b,a]},setViewLocation:function(a,b,d){var c=this.getDefaultLocation();var e;
b=b||c[0];if(b){e=b.split(",");if(!isNaN(+e[0])&&!isNaN(+e[1])){a.value="Last Location"
}else{a.value=b}this.getNewLocations(b,d||c[1])}},setLocationToEmpty:function(){this._data={};
this._data.stores="no results found";this._currentGroupNumber=0;this._initAllViews();
this.navigateLocationGroup(0)},_initMapView:function(a){this._map=new AC.retail.Map(a,{minZoom:3,maxZoom:19,canZoom:true,display:false,controls:true}).setDisplay(true)
},_initListView:function(b,a){this._listView=b;this._listViewTemplate=a.innerHTML
},_initAllViews:function(){if(!this._setupComplete){this._locatorView=document.createElement("div");
this._locatorView.innerHTML=k(p("#retail-locator-views")[0],{nav_class:"",nav:"",direction:""});
this._initMapView(p(".retailLocatorView .mapView",this._locatorView)[0]);this._initListView(p(".retailLocatorView .listView",this._locatorView)[0],p("#retail-locator-list-item-template")[0]);
this.toggleGallery(this._locatorView);this._setupComplete=true}},_buildListViewItem:function(c,d,b){var a=document.createElement("li");
a.innerHTML=k(this._listViewTemplate,{store_name:c.name,address1:c.address,address2:c.city+", "+c.state+" "+c.zip,store_detail_link:c.url.replace(/^http:\/\/www.apple.com/,"")});
a.style.backgroundImage="url("+this._iconDirectory+this._listViewIconMap[b]+l("png")+")";
this._eventManager.subscribeEvent(a,"selected",function(e){this.setActiveListItem(a);
this._map.closeInfoBoxes();this._map.getPins(d)[1].show()}.bind(this));return a
},_generatePins:function(a,b){if(this._data.stores==="no results found"){this._map._googleMapInstance.setCenter(new google.maps.LatLng(42,-97));
this._map._googleMapInstance.setZoom(2);return}this._data.stores.forEach(function(c,e){if(a<=e&&e<b){var f=c.name.replace(/^Apple\sStore\s/,"");
var d=c.url.match(/\w+(?=\/$)/)[0];this._map.pin({lat:c.lat,lng:c.lng,centerMapBy:"bounds",icon:this._iconDirectory+this._pinIconMap[e]+l("png"),iconSize:[35,53],infoBox:(function(){var g={templateID:"retail-locator-map-item-template",animationName:"popCallout",attributes:{store_name:f,address:c.address+", ",city_state:c.city+((c.city.length+c.address.length<35)?", "+c.state+" ":", "+c.state),zip:c.zip,store_detail_link:c.url.replace(/^http:\/\/www.apple.com/,""),directions_link:("http://maps.google.com/maps?daddr="+c.address+"+"+c.city+",+"+c.state+"+"+c.zip).replace(/\s/g,"+"),image_link:"/retail/"+d+"/images/"+d+"_thumb"+l("jpg"),phone:c.phone}};
if(e===0||e===5){n(g,{displayByDefault:true,displayByDefaultDelayMs:700})}return g
}())})}},this)},setActiveListItem:function(a){if(this._activeListItem===a){return
}if(this._activeListItem){AC.Element.removeClassName(this._activeListItem,"active")
}AC.Element.addClassName(a,"active");this._activeListItem=a},_animateListViewItem:function(a,b){if(q.getDOMVendor("webkit")){a.style.webkitAnimation="fade 0.6s 1";
if(!AC.Detector.isiPad()){a.style.webkitAnimationDelay=b+"s"}t(a,0);this._eventManager.subscribeEvent(a,"webkitAnimationEnd",function(){t(a,1);
a.style.webkitAnimationName=""})}return a},drawListView:function(d,c){var a=0;var b=document.createDocumentFragment();
this._listView.innerHTML="";if(this._data.stores==="no results found"){this._listView.innerHTML=p("#retail-locator-list-empty")[0].innerHTML;
return}this._data.stores.forEach(function(h,g){if(d<=g&&g<c){var e=a/10;var f=this._buildListViewItem(h,a,g);
this._animateListViewItem(f,e);if(!a){this.setActiveListItem(f)}b.appendChild(f);
a+=1}},this);this._listView.appendChild(b)},redrawLocationGroup:function(a){var b=(a===1)?0:5;
var c=(a===1)?5:10;this._map.clearAllPins();this._generatePins(b,c);this.drawListView(b,c)
},navigateLocationGroup:function(a){var b;var c=document.createElement("div");this._currentGroupNumber=a;
this.setDefaultLocation();if(a===2){b=k(p("#retail-locator-views")[0],{nav_class:"previous",nav:"Previous",direction:"AC.retail.modules.retailLocator().navigateLocationGroup(1); return false;"})
}else{if(a===1){b=k(p("#retail-locator-views")[0],{nav_class:"next",nav:"Next",direction:"AC.retail.modules.retailLocator().navigateLocationGroup(2); return false;"})
}else{b=k(p("#retail-locator-views")[0],{nav_class:"",nav:"",direction:""})}}c.innerHTML=b;
p(".listViewContainer .nav")[0].outerHTML=p(".listViewContainer .nav",c)[0].outerHTML;
this.redrawLocationGroup(a)},getNewLocations:function(c,d){var a=new Date().getTime();
var b;if(c&&this._lastListItem!==c){this._newLocationRequestPending=true;if(c==="Current Location"||(this._view&&this._view.value==="Last Location")){return
}m(this._getURL+c,function(e){if(!this._lastDisplayedAjaxTime||(a>this._lastDisplayedAjaxTime)){this._newLocationRequestPending=false;
if(typeof this._newLocationRequestDelegate==="function"){this._newLocationRequestDelegate()
}this._initAllViews();this._data=JSON.parse(e);this._lastDisplayedAjaxTime=new Date().getTime();
if(this._data.stores==="no results found"){this.setLocationToEmpty();return}else{b=this.getDefaultLocation()[0];
this.setDefaultLocation(c);this.navigateLocationGroup(d||1);this._eventManager.dispatchEvent(this,"newNetworkLocationResults",b===c)
}}}.bind(this));this._lastListItem=c;return true}},getModuleType:function(){return"retail-locator"
}};return r}());