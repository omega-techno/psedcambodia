AC.namespace("AC.retail");AC.retail.EventDispatch=(function(e){var f;var d=e.AC;
EventDispatch=function(){if(f){return f}if(!(this instanceof EventDispatch)){return new EventDispatch()
}this._domEventProfiles=[];this._customEventProfiles=[];this.subscribersToGarbageCollect=[];
f=this};EventDispatch.prototype={_transformEventsForPlatformTable:{iOS:{selected:"touchend",down:"touchend",hover:"touchstart"},desktop:{selected:"click",down:"mousedown",hover:"mousemove"}},_transformEventsForPlatform:function(a){if(d.Detector.iOSVersion()){return this._transformEventsForPlatformTable.iOS[a]||a
}else{return this._transformEventsForPlatformTable.desktop[a]||a}},doAutomaticGarbageCollection:function(a){if(this.subscribersToGarbageCollect.length){a.forEach(function(b,c){if(this.subscribersToGarbageCollect.indexOf(b)!==-1){a.splice(c,1)
}},this)}this.subscribersToGarbageCollect=[]},tagSubscriberForGarbageCollection:function(b,c){var a=b[c][0];
if(!a.parentNode&&(typeof a==="object"&&a.nodeType===1)){this.subscribersToGarbageCollect.push(b[c])
}},_dispatchDomEvent:function(c,b){var a=d.Event.target(c);b.subscribers.forEach(function(i,j){if(a===i[0]||i[0]==="*"||i[0].contains(a)){if(typeof i[1]==="function"){i[1].call(a,c,i[0])
}if(c.stopPropagation){c.stopPropagation()}else{c.cancelBubble=true}}this.tagSubscriberForGarbageCollection(b.subscribers,j)
},this);this.doAutomaticGarbageCollection(b.subscribers)},selectDelegateForEvent:function(b,a){var c={"default":e.document,focus:a};
var h=c[b];if(!h){h=c["default"]}return h},evaluateDelegateCardinality:function(a){return(a===e.document)?"1..":"1"
},setDomEventProfile:function(j,c){var a=this._transformEventsForPlatform(j);var b=this.selectDelegateForEvent(a,c);
var i={name:j,cardinality:this.evaluateDelegateCardinality(b),listener:d.Element.addEventListener(b,a,function(g){this._dispatchDomEvent(g,i)
}.bind(this)),subscribers:[]};this._domEventProfiles.push(i);return i},setCustomEventProfile:function(b){var a={name:b,subscribers:[]};
this._customEventProfiles.push(a);return a},getEventProfile:function(b,c){var a;
this[("_"+b+"EventProfiles")].forEach(function(h){if(h.name===c&&h.cardinality==="1.."){a=h
}});return a},subscribeEvent:function(i,j,a){var c="dom";var b=this.getEventProfile(c,j);
if(j.indexOf("::")!==-1){j=j.slice(2);c="custom"}if(!b){if(c==="dom"){b=this.setDomEventProfile(j,i)
}else{if(c==="custom"){b=this.setCustomEventProfile(j)}}}b.subscribers.push([i,a]);
return this},dispatchEvent:function(b,c,a){this._customEventProfiles.forEach(function(h){if(h.name===c){h.subscribers.forEach(function(g){if((b===g[0])&&(typeof g[1]==="function")){g[1](a)
}})}});return this}};return EventDispatch}(window));AC.retail.GlobalSearch=(function(){var l=AC.retail.util.DOM.query;
var m=AC.retail.util.ajaxGet;var n=AC.retail.EventDispatch;var h=AC.Element;var j=AC.retail.util.DOM.cumulativeOffset;
var k=function(a){if(!(this instanceof k)){return new k()}this._eventManager=new n();
this._view=a;this._container=this._buildDropDown();this._data=[];this._popDirection;
this._selection;this._lastSelectedElement};k.prototype={_classNames:"global-retail-search-dropdown",_hasMouseMoved:function(a){if(!this._lastX||!this._lastY){this._lastX=a.clientX;
this._lastY=a.clientY}else{if(this._lastX!==a.clientX||this._lastY!==a.clientY){this._lastX=a.clientX;
this._lastY=a.clientY;return true}else{return false}}},_wireEvents:function(a){var b=this;
if(a.length){b._eventManager.dispatchEvent(b._view,"listItemsAvailable",this._data);
Array.prototype.forEach.call(a,function(c){b._eventManager.subscribeEvent(c,"selected",function(){b._eventManager.dispatchEvent(b._view,"listItemSelected",c.innerHTML)
});b._eventManager.subscribeEvent(c,"hover",function(d){if(b._hasMouseMoved(d)||AC.Detector.iOSVersion()){clearTimeout(b._userHoverSelectionTimeout);
b._eventManager.dispatchEvent(b._view,"listItemHover",c.innerHTML);h.removeClassName(b._lastSelectedElement,"keyselection");
b.setSelection(b._data.indexOf(c.innerHTML));h.removeClassName(b._container,"keying")
}});b._eventManager.subscribeEvent(c,"mouseout",function(){b._eventManager.dispatchEvent(b._view,"listItemHoverEnded");
b._userHoverSelectionTimeout=setTimeout(b.setSelection.bind(b,0,true),10)})})}},_buildDropDown:function(a){var c;
var b=this._view;c=document.createElement("div");c.style.left=b.offsetLeft+"px";
c.style.top=this._view.offsetTop+this._view.clientHeight+"px";c.style.width=b.clientWidth+"px";
c.style.position="absolute";c.style.zIndex="9999";c.className=this._classNames;
b.parentNode.insertBefore(c,b.nextSibling);return c},_configurePopDirection:function(a){var c=this._container;
var d=j(this._view).top+(c.clientHeight||a);var b=document.body.clientHeight;if(d>b){this._configurePopDirection=function(){c.style.top=this._view.offsetTop-c.clientHeight+"px"
};AC.Element.addClassName(c," up");this._popDirection="up";this._configurePopDirection()
}else{c.style.top=this._view.offsetTop+this._view.clientHeight+"px";this._popDirection="down"
}},tearDown:function(b,a){if(!b&&!this._isDisplayed){clearTimeout(this.willCloseList);
this._container.style.display="block";this._container.style.opacity="1";this._lastX=undefined;
this._lastY=undefined;if(!a){this.setSelection(0,true)}this._isDisplayed=true}else{if(b&&this._isDisplayed){this._container.style.opacity="0";
this._isDisplayed=false;this.willCloseList=setTimeout(function(){if(this._container.style.opacity==="0"){this._container.style.display="none";
this._eventManager.dispatchEvent(this._view,"listClosed")}}.bind(this),250)}}},getData:function(){return this._data
},parseData:function(a){return a.slice(8,-10).split("</li><li>")},drawData:function(a){var b="<ul>";
if(a[0]===""&&a.length<2){b="<ul></ul>"}a.forEach(function(c){b+="<li>"+c+"</li>"
});b+="</ul>";this._container.innerHTML=b;this._wireEvents(l("li",this._container))
},modifyData:function(a,b,c){c=c||0;if(Array.isArray(b)){if(a&&a[0]){a=a.slice(0,c).concat(b).concat(a.slice(c))
}else{a=b||[]}}return a},setData:function(a){if(this.getPopDirection()==="up"){a=a.reverse()
}this._data=a;this.drawData(a);if(this._data[0]){if(this._popDirection==="up"){this._selection=this._data.length-1
}else{this._selection=0}}},clearData:function(){this._data=[];this._container.innerHTML=""
},getPopDirection:function(){return this._popDirection},setSelection:function(a,b){if(this.getPopDirection()==="up"&&a===0&&b){a=this._data.length-1
}if(a>this._data.length-1||!this._container.firstChild){return}else{if(a<0){this._eventManager.dispatchEvent(this._view,"listItemHoverEnded");
return}}this._selection=a;if(this._lastSelectedElement){AC.Element.removeClassName(this._lastSelectedElement,"keyselection")
}this._lastSelectedElement=this._container.firstChild.children[a];AC.Element.addClassName(this._lastSelectedElement,"keyselection");
AC.Element.addClassName(this._container,"keying");if(!b){this._eventManager.dispatchEvent(this._view,"listItemHover",this._data[a])
}},getSelection:function(){return this._selection}};var i=function(b,a){if(!(this instanceof i)){return new i()
}this._view=b;this._placeholder=this._view.getAttribute("placeholder");this._viewValue=(this._view.value===this._placeholder)?"":b.value;
this._dropDownInstance=new k(b);this._lastDisplayedAjaxTime;this._getURL=a;this._eventManager=new n()
};i.prototype={_getAutoCompleteQuery:function(b,a){var c=new Date().getTime();if(b){m(this._getURL+"?q="+b,function(d){if(!this._lastDisplayedAjaxTime||(c>this._lastDisplayedAjaxTime)){this._lastDisplayedAjaxTime=new Date().getTime();
if(typeof a==="function"){a(d)}}}.bind(this))}},setCurrentLocation:function(a){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(b){this.currentLat=b.coords.latitude;
this.currentLng=b.coords.longitude;this.currentLocationEnabledByUser=true;if(typeof a==="function"){a(this.currentLat,this.currentLng)
}}.bind(this),function(){this.currentLocationEnabledByUser=false;this.currentLocationDisabledByUser=true
}.bind(this))}else{this.currentLocationEnabledByUser=false}},pollUserEngagement:function(){if(this._view.value===""||this._view.value===this._placeholder){if(this._userLastEngagement){this._eventManager.dispatchEvent(this._view,"userEngagementChanged",false)
}this._userLastEngagement=false;return false}else{if(!this._userLastEngagement){this._eventManager.dispatchEvent(this._view,"userEngagementChanged",true)
}this._userLastEngagement=true;return true}},getDropDownInstance:function(){return this._dropDownInstance
},smartRedraw:function(b,c){var a=this._dropDownInstance.getData();if(b&&b[0]){if(this.currentLocationEnabledByUser){b=this._dropDownInstance.modifyData(b,["Current Location"],1)
}this._dropDownInstance.setData(b);this._dropDownInstance.setSelection(0,true)}if(this._view.value===""||this._view.value===this._placeholder){this._viewValue="";
this._dropDownInstance.clearData()}else{if(a&&this._view.value===a[0]&&a.length===1){return
}}if(!c){this._dropDownInstance.tearDown(!this.pollUserEngagement());this._dropDownInstance._configurePopDirection(300)
}else{this._dropDownInstance.tearDown(true)}},_wireCurrentLocationEvents:function(){var a=function(){if(this._view.value!==this._currentLocationAsInput&&this._currentLocationAsInput){this._view.style.color="";
this._currentLocationAsInput=false}};if(!this._currentLocationEventsWired){this._eventManager.subscribeEvent(this._view,"::listItemSelected",a.bind(this));
this._eventManager.subscribeEvent(this._view,"::viewInputEntered",a.bind(this));
this._eventManager.subscribeEvent(this._view,"::userEngagementChanged",a.bind(this));
this._currentLocationEventsWired=true}},setCurrentLocationAsInput:function(){if(this._currentLocationAsInput){return
}var a=this._view.value;this._view.style.color="rgb(41,87,255)";this._currentLocationAsInput=a;
if(!this.currentLat||!this.currentLat){this.setCurrentLocation(this.setCurrentLocationAsInput.bind(this,a));
return}this._eventManager.dispatchEvent(this._view,"userEngagementChanged",true);
this._eventManager.dispatchEvent(this._view,"viewUpdated");this._eventManager.dispatchEvent(this._view,"listItemSelected",this.currentLat+","+this.currentLng);
this._wireCurrentLocationEvents()},clearPseudoUserInput:function(){if(this._view.value!==this._placeholder&&this._view.value){this._view.value=this._viewValue
}},drawPseudoUserInput:function(a){this._view.value=a;this._view.select()},getViewValue:function(){if(this._viewValue){return this._viewValue
}else{return(this._view.value===this._placeholder)?"":this._view.value}},drawUserInput:function(b,c){var a;
if(b){this._view.value=b;this._viewValue=this._view.value}if(this._view.value==="Current Location"&&this.currentLocationEnabledByUser&&!this._currentLocationAsInput){this.setCurrentLocationAsInput()
}if(this._viewValue!==this._view.value&&this._view.value&&this._view.value!==this._placeholder){a=true;
this._getAutoCompleteQuery(this._viewValue=this._view.value,function(e){var d=this.getDropDownInstance();
e=d.parseData(e);this.smartRedraw(e,c)}.bind(this))}else{this.smartRedraw()}}};
i.DropDown=k;return i}());AC.retail.AutoGlobalSearch=(function(){var h=AC.retail.GlobalSearch;
var g=AC.retail.EventDispatch;var k=AC.retail.util.DOM.query;var l=AC.retail.modules;
var j;var i=function(a){var c,b;if(j){return j}j=this;if(!(this instanceof i)){return new i(a)
}c=Array.prototype.slice.apply(k(a));this._globalSearchInstances=[];b=new g();c.forEach(function(f,w){var y;
var B=new h(f,this._getURL);var z=f.getAttribute("data-autoglobalsearch-module");
var A=B.getDropDownInstance();var u=function(){var m=A.getData()?A.getData()[A.getSelection()]:false;
if(m){b.dispatchEvent(f,"listItemSelected",m)}else{if(B.getViewValue()){b.dispatchEvent(f,"listItemSelected",B.getViewValue())
}}};var v=function(m){window.setTimeout(function(){b.dispatchEvent(f,"viewInputEntered",m)
},1)};var e=function(){Element.addClassName(A._container," currentlocation");if(B.getViewValue()!=="Current Location"){y=false;
B.smartRedraw()}if(!A.getData().length||A.getData()[0]==="Current Location"){y=true;
A.setData(["Current Location"]);A.tearDown(false)}};f.setAttribute("autocorrect","off");
if(z==="retail-locator"){z=new l.retailLocator(f,b)}var d=function(m,n){A.setSelection(A.getSelection()+((m==="down")?1:-1));
B.getDropDownInstance().tearDown(false);AC.Event.stop(n)};var x=function(n){var m={9:function(){B.getDropDownInstance().tearDown(true)
},38:d.bind(null,"up",n),40:d.bind(null,"down",n),13:u};if(m[n.keyCode]){m[n.keyCode]()
}else{v(false)}};b.subscribeEvent(f,"keydown",x);b.subscribeEvent(f,"::viewInputEntered",function(m){B.drawUserInput(false,m);
b.dispatchEvent(f,"viewUpdated")});b.subscribeEvent(f,"selected",function(){if(!B.pollUserEngagement()){if(y){B.getDropDownInstance().tearDown(false);
B._viewValue=""}else{B.drawUserInput()}}});b.subscribeEvent(f,"down",function(m){if(B.pollUserEngagement()){B.drawUserInput()
}});b.subscribeEvent(f,"focus",function(m){if(AC.Detector.iOSVersion()&&!B.currentLocationDisabledByUser&&z){if(!this.hasSetCurrentLocation){B.setCurrentLocation(e);
this.hasSetCurrentLocation=true}else{if(B.currentLocationEnabledByUser){e()}}}});
b.subscribeEvent("*","down",function(){if(this!==f&&!AC.Element.hasClassName(this,"keyselection")){b.dispatchEvent(f,"listItemHoverEnded");
B.getDropDownInstance().tearDown(true)}});b.subscribeEvent(f,"::listItemHover",function(m){B.drawPseudoUserInput(m)
});b.subscribeEvent(f,"::listItemHoverEnded",B.clearPseudoUserInput.bind(B));b.subscribeEvent(f,"::listItemSelected",function(n){var m=n.split(",");
if(isNaN(+m[0])&&isNaN(+m[1])){B.drawUserInput(n)}B.getDropDownInstance().tearDown(true);
f.blur();if(!z){document.location=this._forwardURL+n}}.bind(this));this._globalSearchInstances.push({globalSearch:B,module:z||false});
if(f.value){v(true)}}.bind(this));AC.retail.globalSearchDecorator("global-retail-search");
b.dispatchEvent("*","globalSearchReady")};i.prototype={_getURL:"/global/scripts/ac_googlemap_autocomplete.php",_forwardURL:"/retail/locator/index.html?q=",getGlobalSearchInstances:function(){return this._globalSearchInstances
}};return i}());AC.onDOMReady(function(){AC.retail.AutoGlobalSearch.sharedInstance=new AC.retail.AutoGlobalSearch(".global-retail-search")
});