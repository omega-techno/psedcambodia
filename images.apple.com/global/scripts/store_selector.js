var xml_escape_map={"&":"&amp;",'"':"&quot;","<":"&lt;",">":"&gt;"};var xml_unescape_map={"&amp;":"&","&quot;":'"',"&lt;":"<","&gt;":">"};
function encodeXml(b){if(!b){return b}return b.replace(/([\&"<>])/g,function(d,a){return xml_escape_map[a]
})}function decodeXml(b){if(!b){return b}return b.replace(/(&quot;|&lt;|&gt;|&amp;)/g,function(d,a){return xml_unescape_map[a]
})}StoreSelector=Class.create();StoreSelector.prototype={stateDictionary:null,states:[],global_response:null,locationSelector:[],storeSelector:[],submitButton:false,cookiedLocation:false,cookiedStore:false,activateButton:false,urlStoreAppleId:null,urlStoreLocation:null,stateWithName:function(c){var d=this.stateDictionary[c];
if(!d){d=(this.stateDictionary[c]={stores:[]});d.name=c}return d},initialize:function(o,j,q,n,r,k,l,m){this.phonePropertyName=(typeof l==="string")?l:"phone";
this.stateDictionary={AK:{name:"Alaska",stores:[]},AL:{name:"Alabama",stores:[]},AZ:{name:"Arizona",stores:[]},AR:{name:"Arkansas",stores:[]},CA:{name:"California",stores:[]},CO:{name:"Colorado",stores:[]},CT:{name:"Connecticut",stores:[]},DE:{name:"Delaware",stores:[]},DC:{name:"District of Columbia",stores:[]},FL:{name:"Florida",stores:[]},GA:{name:"Georgia",stores:[]},HI:{name:"Hawaii",stores:[]},ID:{name:"Idaho",stores:[]},IL:{name:"Illinois",stores:[]},IN:{name:"Indiana",stores:[]},IA:{name:"Iowa",stores:[]},KS:{name:"Kansas",stores:[]},KY:{name:"Kentucky",stores:[]},LA:{name:"Louisiana",stores:[]},ME:{name:"Maine",stores:[]},MD:{name:"Maryland",stores:[]},MA:{name:"Massachusetts",stores:[]},MI:{name:"Michigan",stores:[]},MN:{name:"Minnesota",stores:[]},MS:{name:"Mississippi",stores:[]},MO:{name:"Missouri",stores:[]},MT:{name:"Montana",stores:[]},NE:{name:"Nebraska",stores:[]},NV:{name:"Nevada",stores:[]},NH:{name:"New Hampshire",stores:[]},NJ:{name:"New Jersey",stores:[]},NM:{name:"New Mexico",stores:[]},NY:{name:"New York",stores:[]},NC:{name:"North Carolina",stores:[]},ND:{name:"North Dakota",stores:[]},OH:{name:"Ohio",stores:[]},OK:{name:"Oklahoma",stores:[]},OR:{name:"Oregon",stores:[]},PA:{name:"Pennsylvania",stores:[]},RI:{name:"Rhode Island",stores:[]},SC:{name:"South Carolina",stores:[]},SD:{name:"South Dakota",stores:[]},TN:{name:"Tennessee",stores:[]},TX:{name:"Texas",stores:[]},UT:{name:"Utah",stores:[]},VT:{name:"Vermont",stores:[]},VA:{name:"Virginia",stores:[]},WA:{name:"Washington",stores:[]},WV:{name:"West Virginia",stores:[]},WI:{name:"Wisconsin",stores:[]},WY:{name:"Wyoming",stores:[]},Tokyo:{name:"Tokyo",stores:[]},Fukuoka:{name:"Fukuoka",stores:[]},Germany:{name:"Germany",stores:[]},NSW:{name:"New South Wales",stores:[]},VIC:{name:"Victoria",stores:[]},QLD:{name:"Queensland",stores:[]},QC:{name:"Quebec",stores:[]},ON:{name:"Ontario",stores:[]},AB:{name:"Alberta",stores:[]},MB:{name:"Manitoba",stores:[]},BC:{name:"British Columbia",stores:[]},France:{name:"France",stores:[]},Italy:{name:"Italy",stores:[]},CHDE:{name:"Switzerland German",stores:[]},Geneva:{name:"Geneva",stores:[]},UK:{name:"UK",stores:[]},Surrey:{name:"Surrey",stores:[]},Kent:{name:"Kent",stores:[]}};
var p=document.getElementsByTagName("html")[0].getAttribute("lang");if(p.toUpperCase()==="FR-CA"){this.stateDictionary.BC={name:"Colombie Britannique",stores:[]};
this.stateDictionary["British Columbia"]=this.stateDictionary.BC;this.stateDictionary.QC={name:"Québec",stores:[]};
this.stateDictionary.Quebec=this.stateDictionary.QC}if(p.match(/-AU$/i)){this.stateDictionary.WA={name:"Western Australia",stores:[]}
}this.urlStoreAppleId=getUrlVars()["store"];this.locationSelector=j;this.storeSelector=q;
this.submitButton=n;this.linkType=r;this.delegate=k;this.skipStateFlag=this.locationSelector.style.display=="none"?true:false;
if(Cookie.get("retail_storeloc")&&this.submitButton){this.cookiedLocation=Cookie.get("retail_storeloc")
}if(Cookie.get("retail_storenumb")&&this.submitButton){this.cookiedStore=Cookie.get("retail_storenumb")
}if(o==null){this.sendRequest(m)}else{this.global_response=o;this.populateLocationsWithin()
}if(this.cookiedStore&&this.submitButton){this.submitButton.addClassName("active")
}if(!this.skipStateFlag){Event.observe(this.locationSelector,"change",function(a){var c=this.locationSelector.selectedIndex;
var b=this.locationSelector.getElementsByTagName("option")[c];this.showStores(this.stateWithName(b.value).stores)
}.bindAsEventListener(this))}Event.observe(this.storeSelector,"change",function(b){var d=this.storeSelector.selectedIndex;
var a=this.storeSelector.getElementsByTagName("option")[d];if(typeof(a.value)!="undefined"&&d!=0){if(!this.submitButton){var d=this.locationSelector.selectedIndex;
var c=this.locationSelector.getElementsByTagName("option")[d];if(Cookie.get("retail_storeloc")){Cookie.erase("retail_storeloc")
}Cookie.set("retail_storeloc",c.value,14);if(Cookie.get("retail_storenumb")){Cookie.erase("retail_storenumb")
}Cookie.set("retail_storenumb",a.getAttribute("name"),14);window.location=a.value
}else{this.submitButton.addClassName("active")}}else{if(this.submitButton){this.submitButton.removeClassName("active")
}}}.bindAsEventListener(this));if(this.submitButton&&this.linkType!="phone"){Event.observe(this.submitButton,"click",function(b){Event.stop(b);
var d=this.locationSelector.selectedIndex;var c=this.locationSelector.getElementsByTagName("option")[d];
var d=this.storeSelector.selectedIndex;var a=this.storeSelector.getElementsByTagName("option")[d];
if(this.submitButton.hasClassName("active")&&typeof(a.value)!="undefined"){if(Cookie.get("retail_storeloc")){Cookie.erase("retail_storeloc")
}Cookie.set("retail_storeloc",c.value,14);if(Cookie.get("retail_storenumb")){Cookie.erase("retail_storenumb")
}Cookie.set("retail_storenumb",a.getAttribute("name"),14);window.location=a.value
}else{if(typeof(c.value)=="undefined"){this.locationSelector.focus()}else{this.storeSelector.focus()
}}}.bindAsEventListener(this))}if(this.submitButton&&this.linkType=="phone"){Event.observe(this.submitButton,"click",function(b){Event.stop(b);
var d=this.locationSelector.selectedIndex;var c=this.locationSelector.getElementsByTagName("option")[d];
var d=this.storeSelector.selectedIndex;var a=this.storeSelector.getElementsByTagName("option")[d];
if(this.submitButton.hasClassName("active")&&typeof(a.value)!="undefined"){if(Cookie.get("retail_storeloc")){Cookie.erase("retail_storeloc")
}Cookie.set("retail_storeloc",c.value,14);if(Cookie.get("retail_storenumb")){Cookie.erase("retail_storenumb")
}Cookie.set("retail_storenumb",a.getAttribute("name"),14);this.sendReq($H({store:a.value}))
}else{if(typeof(c.value)=="undefined"){this.locationSelector.focus()}else{this.storeSelector.focus()
}}}.bindAsEventListener(this));Event.observe($("phoneToggle"),"click",this.phoneToggleClicked.bindAsEventListener(this))
}},getStateAbbr:function(c){for(var d in this.stateDictionary){if(this.stateDictionary[d].name==c){return d
}}},phoneToggleClicked:function(c){if(c){Event.stop(c)}var d=$("phoneResults");
if(d){d.hide()}d=$("phoneFields");if(d){d.show()}},sendReq:function(c){var d=new Ajax.Request("/retail/scripts/storewidget.php",{method:"POST",parameters:c,onComplete:this.acknowledgeComplete.bind(this)})
},acknowledgeComplete:function(e){var h=e.responseText;var f=this.scopedEval(h);
if(f){var g=f[0];this.setStoreInfo(g);$("phoneFields").hide();$("phoneResults").show()
}},changeOverlayHeight:function(f){var g=$$(".overlay.locationoverlay")[0];var i=$$(".overlayshadow.locationoverlay")[0];
var h=AC.OverlayPanel.overlay.height();var j=f.getHeight();AC.OverlayPanel.overlay.setHeight(j)
},scopedEval:function(stringValue){try{return(function(){return eval("("+stringValue+")")
})()}catch(e){return null}},setStoreInfo:function(c){var d=$("phoneResults");d.down(".fn").innerHTML=c.storeName;
d.down(".street-address").innerHTML=c.address1;d.down(".extended-address").innerHTML=c.address2;
d.down(".locality").innerHTML=c.city;d.down(".region").innerHTML=c.state;d.down(".postal-code").innerHTML=c.zip;
d.down(".tel").innerHTML=c[this.phonePropertyName]},convert_string_to_xml:function(e){var d=e;
try{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async="false";xmlDoc.loadXML(d);
return xmlDoc}catch(f){parser=new DOMParser();xmlDoc=parser.parseFromString(d,"text/xml");
return xmlDoc}},getXMLObj:function(response){if(response.responseObject){oCountryStoreStack=response.responseObject
}else{var global_response=response.responseText;var oCountryStoreStack=eval("("+global_response+")")
}var requestedCountry=oCountryStoreStack[0].country;var cache_states=new Array();
var xmlstr="<records storeWidgetVersion='1.0' conciergeWidgetVersion='1.0'>";xmlstr+="<country name='"+requestedCountry+"'>";
this._hideStates=false;if(oCountryStoreStack[0].availableStores[0].state==oCountryStoreStack[0].country){this._hideStates=true;
this.locationSelector.style.display="none"}else{this.locationSelector.style.display="inline"
}for(var i=0;i<oCountryStoreStack[0].availableStores.length;i++){var stateName=this.getStateAbbr([oCountryStoreStack[0].availableStores[i].state]);
if(stateName===undefined){stateName=oCountryStoreStack[0].availableStores[i].state||requestedCountry
}var tempstr="<state name='"+encodeXml(stateName)+"'>";var use_it="true";if(cache_states.length==0){cache_states.push(oCountryStoreStack[0].availableStores[i].state)
}else{for(var x=0;x<cache_states.length;x++){if(oCountryStoreStack[0].availableStores[i].state==cache_states[x]){use_it="false"
}}}if(use_it=="true"){cache_states.push(oCountryStoreStack[0].availableStores[i].state);
xmlstr+=tempstr;for(var g=0;g<oCountryStoreStack[0].availableStores.length;g++){if(oCountryStoreStack[0].availableStores[g].state==oCountryStoreStack[0].availableStores[i].state){xmlstr+="<store><appleid>"+oCountryStoreStack[0].availableStores[g].appleid+"</appleid><name>"+encodeXml(oCountryStoreStack[0].availableStores[g].name)+"</name><city>"+encodeXml(oCountryStoreStack[0].availableStores[g].city)+"</city><phone>(555) 366-8477</phone><link>default</link></store>"
}}xmlstr+="</state>"}if(this.urlStoreAppleId===oCountryStoreStack[0].availableStores[i].appleid){this.urlStoreLocation=stateName
}}xmlstr+="</country>";xmlstr+="</records>";this.global_response=this.convert_string_to_xml(xmlstr);
this.populateLocationsWithin()},_selectAStateOptionLabel:(function(){var c=document.getElementsByTagName("html")[0].getAttribute("lang"),d="Select a State";
if(typeof c!=="string"||c.length<=0){return d}c=c.toUpperCase();if(c==="EN-CA"){d="Select a Province"
}else{if(c==="FR-CA"){d="Choisissez une province"}}return d})(),_selectAStoreOptionLabel:(function(){var c=document.getElementsByTagName("html")[0].getAttribute("lang"),d="Select a Store";
if(typeof c!=="string"||c.length<=0){return d}c=c.toUpperCase();if(c==="FR-CA"){d="Choisissez une boutique"
}return d})(),populateLocationsWithin:function(){var F=this,y,N,y=[];N=this.states=(this.global_response).getElementsByTagName("state");
if(N.length==0){N=this.states=[this.global_response]}if(this.states.length>1){for(var B=0,A=N.length;
B<A;B++){y[B]=N[B]}y.sort(function(a,b){var c=F.stateWithName(a.getAttribute("name")).name,d=F.stateWithName(b.getAttribute("name")).name;
return c!=d?c<d?-1:1:0});this.states=y}this.storeSelector.getElementsByTagName("option")[0].innerHTML="";
var J=document.getElementById("selectState");var G=document.getElementById("selectStore");
var R=this.delegate;var I=R&&(typeof R.shouldAddStateNamed==="function");var E=true;
var C=this._hideStates;if(this.delegate&&(typeof R.shouldHideStates==="function")){C=R.shouldHideStates(this.states);
if(!!C===true&&!this._hideStates){this.locationSelector.style.display="none"}else{this.locationSelector.style.display="inline"
}this._hideStates=!!C}if(J){StoreSelector.prototype._selectAStateOptionLabel=J.innerHTML;
J.parentNode.removeChild(J)}if(G){StoreSelector.prototype._selectAStoreOptionLabel=G.innerHTML;
G.parentNode.removeChild(G)}var i,z;for(var B=0;B<this.states.length;B++){var P=this.states[B];
var L=P.getAttribute("name");var M=this.stateWithName(P.getAttribute("name")).name;
if(B===0){i=P;z=L}E=true;if(I){E=R.shouldAddStateNamed(M)}if(!E){continue}var D=((L==this.cookiedLocation)||(this.states.length===1))?true:false;
if(this.skipStateFlag){D=true}else{var H=this.createOption(L,M,D,"");this.locationSelector.appendChild(H)
}var K,O,x,Q;if(this._hideStates){D=true;K=this.stateWithName(z);O=i;x=z;Q=this.createStores(P);
if(K.stores.length){K.stores.push.apply(K.stores,Q)}else{K.stores=Q}}else{K=this.stateWithName(L);
O=P;x=L;K.stores=this.createStores(O)}if(D){this.showStores(this.stateWithName(x).stores);
this.storeSelector.getElementsByTagName("option")[0].innerHTML=this._selectAStoreOptionLabel;
if(this.storeSelector.selectedIndex===-1){this.storeSelector.getElementsByTagName("option")[0].selected=true
}else{if(this.submitButton){this.submitButton.addClassName("active")}}}}if(this.states.length===1&&this._hideStates){this.locationSelector.style.display="none"
}if(!this.skipStateFlag){this.locationSelector.getElementsByTagName("option")[0].innerHTML=this._selectAStateOptionLabel;
this.locationSelector.removeAttribute("disabled")}},showStores:function(e){if(this.submitButton){this.submitButton.removeClassName("active")
}Element2.Methods.removeAllChildNodes(this.storeSelector);if(typeof(e)=="undefined"||!e.length){this.storeSelector.setAttribute("disabled","disabled");
this.storeSelector.appendChild(this.createOption("",this._selectAStoreOptionLabel,false,""));
return}if(e.length>0){this.storeSelector.appendChild(this.createOption("",this._selectAStoreOptionLabel,false,""));
var f=[];for(var d=0;d<e.length;d++){f.push([e[d].text,e[d]])}f.sort(function(a,b){return a[0]!=b[0]?a[0]<b[0]?-1:1:0
});for(var d=0;d<e.length;d++){this.storeSelector.appendChild(f[d][1])}this.storeSelector.removeAttribute("disabled")
}},createStores:function(I){var v=[];var B=true;var M=this.delegate;var E=M&&(typeof M.shouldAddStoreWithConciergeIdForStateNamed==="function");
var N=M&&(typeof M.shouldSelectStoreWithCode_defaultValue_==="function");var K=M&&(typeof M.storeLinkForStoreWithConciergeIdStateNamed==="function");
var J=I.getElementsByTagName("store"),w=[],y=0,x=J.length;var L=this.urlStoreAppleId||this.cookiedStore;
while(y<x){w[y]=J[y++]}w.sort(function(c,d){var b=c.getElementsByTagName("city")[0].firstChild.nodeValue,a=d.getElementsByTagName("city")[0].firstChild.nodeValue;
return b!=a?b<a?-1:1:0});for(var y=0;y<x;y++){var G=w[y];var A=G.getElementsByTagName("appleid")[0].firstChild.nodeValue;
var D=G.getElementsByTagName("city")[0].firstChild.nodeValue+", "+G.getElementsByTagName("name")[0].firstChild.nodeValue;
var C=(A==L)?true:false;var F=C;switch(this.linkType){case"genius":var i="http://concierge.apple.com/store/"+A;
break;case"procare":var i="http://concierge.apple.com/store/"+A;break;case"business":var i="http://concierge.apple.com/biz/"+A;
break;case"personal":var i="http://concierge.apple.com/ps/"+A;break;case"promo":var i="http://concierge.apple.com/promo/store/"+A;
break;case"workshop":var i="http://concierge.apple.com/workshops/"+A;break;case"setup":var i="http://concierge.apple.com/setup/"+A;
break;case"phone":var i=A;break;case"store":var i=G.getElementsByTagName("link")[0].firstChild.nodeValue;
break;default:var i=G.getElementsByTagName("link")[0].firstChild.nodeValue;break
}B=true;if(E){var H=this.stateWithName(I.getAttribute("name")).name;B=M.shouldAddStoreWithConciergeIdForStateNamed(A,H)
}if(!B){continue}if(K){i=M.storeLinkForStoreWithConciergeIdStateNamed(A,H)}if(N){F=M.shouldSelectStoreWithCode_defaultValue_(A,F)
}var z=this.createOption(i,D,F,A);if(!F){this.storeSelector.getElementsByTagName("option")[0].innerHTML=this._selectAStoreOptionLabel
}else{I.setAttribute("selected","selected")}v.push(z)}return v},createOption:function(h,g,j,i){var f=$(document.createElement("option"));
if(i!=""){f.setAttribute("name",i)}f.setAttribute("value",h);if(j){f.setAttribute("selected","selected")
}f.appendChild(document.createTextNode(g));return f},sendRequest:function(h){var l=getPHPFile();
var j=document.getElementsByTagName("html")[0].getAttribute("lang");var k="appID="+encodeURI("192")+"&";
k+="overrideauthentication="+encodeURI("true")+"&";k+="locale="+encodeURI(j?j:"en_US");
var i=this;var n="/v/retail/concierge/a/"+l+"?type="+h;var m=window.location.host;
new Ajax.Request(n,{method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:k,connection:"close",onSuccess:this.getXMLObj.bind(this)})
}};CrossDomainRequestCallback=[];function executeCrossDomainRequest(p,m,i){var k=function(a){var b={responseObject:a};
i(b)},l,n,j,o;CrossDomainRequestCallback.push(k);l=CrossDomainRequestCallback.length-1;
n=encodeURIComponent("CrossDomainRequestCallback["+l+"]");j=document.createElement("script");
j.setAttribute("charset","utf-8");j.setAttribute("type","text/javascript");if(p.indexOf("?")===-1){p=p+"?"+m
}else{p=p+"&"+m}p=p.replace(/&callback/g,"")+"&callback="+n;j.setAttribute("src",p);
o=document.getElementsByTagName("head")[0];o.appendChild(j);o=null}var Cookie={set:function(j,i,d){var g="";
if(d!=undefined){var h=new Date();h.setTime(h.getTime()+(86400000*parseFloat(d)));
g="; expires="+h.toGMTString();path="; path=/"}return(document.cookie=escape(j)+"="+escape(i||"")+g+path)
},get:function(d){var c=document.cookie.match(new RegExp("(^|;)\\s*"+escape(d)+"=([^;\\s]*)"));
return(c?unescape(c[2]):null)},erase:function(d){var c=Cookie.get(d)||true;Cookie.set(d,"",-1);
return c},accept:function(){if(typeof navigator.cookieEnabled=="boolean"){return navigator.cookieEnabled
}Cookie.set("_test","1");return(Cookie.erase("_test")==="1")}};getUrlVars=function(){var g=[],h;
var f=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");
for(var e=0;e<f.length;e++){h=f[e].split("=");g.push(h[0]);g[h[0]]=h[1]}return g
};getPHPFile=function(){return"concierge_data.php"};