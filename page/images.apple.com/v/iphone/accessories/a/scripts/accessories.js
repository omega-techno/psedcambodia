AC.define("iphone/shared/ac_autogallery/Types/cases",[],function(){var c=AC.Element;
var b=AC.AutoGallery;var a=function(g){var e={},h,d;for(h=0,d=g.length;h<d;h+=1){if(g[h].name.indexOf("data-")===0){var f=g[h].name;
e[f]=g[h].value}}return e};b.addType("cases",{},function(){},"image-fadein",{delegate:{_links:[],_deviceLinks:[],_caseLinks:[],getDefaultDeviceColor:function(){var e,d;
var g=this.viewer.view.view().getAttribute("data-autogallery-cases-default-device-color")||"";
var f=this._deviceLinks[0].getAttribute("data-color")||"";var h="";for(e=0,d=this.viewer.orderedSections.length;
e<d;e+=1){if(!this.viewer.orderedSections[e].match("-default")){h=this.viewer.orderedSections[e].split("-")[2];
break}}return(g!=="")?g:(f!=="")?f:h},getDefaultCaseColor:function(){var e,d;var g=this.viewer.view.view().getAttribute("data-autogallery-cases-default-case-color")||"";
var f=this._caseLinks[0].getAttribute("data-color")||"";var h="";for(e=0,d=this.viewer.orderedSections.length;
e<d;e+=1){if(!this.viewer.orderedSections[e].match("-default")){h=this.viewer.orderedSections[e].split("-")[3];
break}}return(g!=="")?g:(f!=="")?f:h},getCurrentDeviceColorFromId:function(e){var d=e.split("-");
if(d[2]&&d[2]!=="default"){return d[2]}return this.getDefaultDeviceColor()},getCurrentCaseColorFromId:function(e){var d=e.split("-");
if(d[3]&&d[3]!=="default"){return d[3]}return this.getDefaultCaseColor()},activateLinksForSectionId:function(g){var f,e;
var d=this.getCurrentDeviceColorFromId(g);var h=this.getCurrentCaseColorFromId(g);
for(f=0,e=this._deviceLinks.length;f<e;f+=1){if(d===this._deviceLinks[f].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._deviceLinks[f].className+=" active"
}else{this._deviceLinks[f].className=this._deviceLinks[f].className.replace(/active/g,"").replace(/  /g," ")
}}for(f=0,e=this._caseLinks.length;f<e;f+=1){if(h===this._caseLinks[f].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._caseLinks[f].className+=" active"
}else{this._caseLinks[f].className=this._caseLinks[f].className.replace(/active/g,"").replace(/  /g," ")
}}},setLinksHrefValuesForSectionId:function(g){var f,e;var d=this.getCurrentDeviceColorFromId(g);
var h=this.getCurrentCaseColorFromId(g);for(f=0,e=this._deviceLinks.length;f<e;
f+=1){this._deviceLinks[f].setAttribute("href","#"+this.viewer.triggerClassName+"-"+this._deviceLinks[f].getAttribute("data-color")+"-"+h)
}for(f=0,e=this._caseLinks.length;f<e;f+=1){this._caseLinks[f].setAttribute("href","#"+this.viewer.triggerClassName+"-"+d+"-"+this._caseLinks[f].getAttribute("data-color"))
}},copySectionDataAttributesToRemoteContent:function(k){var j,h,g,d,e,f;j=c.select("img",k.content)||k.content;
h=k.triggers();for(g=0,d=h.length;g<d;g+=1){e=a(h[g].attributes);for(f in e){j.setAttribute(f,e[f])
}}},willShow:function(f,e,d){if(d&&d.id){this.activateLinksForSectionId(d.id)}},didAppendContent:function(k,j){var h=k.currentSection.triggers(),g,e,d,f;
for(g=0,e=h.length;g<e;g+=1){if(h[g].getAttribute("data-screen-src")){d=h[g].getAttribute("data-screen-src");
break}}if(d){f=new Image();f.src=d;f.className="screen";j.appendChild(f)}},didShow:function(h,f,e){var g,d,j;
this.viewer=h;if(!this._didShowInitial){j=this.viewer.view.view().up(".autogallery");
if(j){this._deviceLinks=c.selectAll(".color-nav-devices a",j);this._caseLinks=c.selectAll(".color-nav-cases a",j);
this._links=this._deviceLinks.concat(this._caseLinks)}for(g=0,d=this._links.length;
g<d;g+=1){c.addClassName(this._links[g],this.viewer.triggerClassName)}}if(e&&e.id){this.copySectionDataAttributesToRemoteContent(e);
this.setLinksHrefValuesForSectionId(e.id);if(!this._didShowInitial&&this.viewer.currentSection&&this.viewer.currentSection.id.indexOf("-default")<0){this.activateLinksForSectionId(e.id);
this.viewer.view.view().style.height=AC.Element.getBoundingBox(e.content).height+"px";
this.didAppendContent(this.viewer,e.content)}}this._didShowInitial=true}}})});AC.define("iphone/shared/assetLoader/AssetLoader",["require","defer/Deferred"],function(c){var b=c("defer/Deferred");
function a(e,d){this._assetsToLoad=[].concat(e);this._type=d||"img"}a.prototype={load:function(){this._assetsLoaded=[];
this._assetsCountLoaded=0;this._defer=new b();this._failure=false;this._assetsToLoad.forEach(this._loadAsset.bind(this));
return this._defer.promise()},_progress:function(e,d){this._defer.progress(this._assetsLoaded[e]=d);
this._assetsCountLoaded+=1;if(this._assetsCountLoaded===this._assetsToLoad.length){this._defer.resolve(this._assetsLoaded)
}},_error:function(d){this._failure=true;this._defer.reject(d.target)},_loadAsset:function(e,f){var d;
if(!this._failure){d=document.createElement(this._type);d.onload=this._progress.bind(this,f,d);
d.onerror=this._error.bind(this);d.src=e}}};return a});AC.define("iphone/shared/gallery/imageLinkPreload",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var a=b("iphone/shared/assetLoader/AssetLoader");
return function(f,e){if(e===undefined){return}var d=[];f.forEach(function(i){var k=i.getAttribute("href");
var j="g";var h=new RegExp("\\.("+["pn"+j,j+"if","jp"+j,"jpe"+j].join("|")+")\\#");
if(h.test(k)){d.push(i.getAttribute("href"))}});var c=new a(d);c.load()}});AC.define("iphone/shared/fullTakeoverColorPicker/Viewer",["require","iphone/shared/assetLoader/AssetLoader"],function(b){var d=AC.Element;
var a=b("iphone/shared/assetLoader/AssetLoader");var c=AC.Retina.sharedInstance();
var e=function(g,f){AC.onDOMReady(function(){if(window.tracker){window.tracker.setDelegate({sectionDidChange:function(s,q,n,j,r){if(q.delegate&&typeof q.delegate.getCurrentAngleFromId==="function"){var p=q.previousSection.id;
var i=q.delegate.getCurrentDeviceColorFromId(p);var t=q.delegate.getCurrentCaseColorFromId(p);
var m=q.delegate.getCurrentAngleFromId(p);var l=q.delegate.getCurrentDeviceColorFromId(j);
var o=q.delegate.getCurrentCaseColorFromId(j);var k=q.delegate.getCurrentAngleFromId(j);
if(i===l&&t===o&&m!==k){r.pageName=r.pageName.replace("-"+q.delegate.getCurrentDeviceColorFromId(j),"").replace("-"+q.delegate.getCurrentCaseColorFromId(j),"")
}else{r.pageName=r.pageName.replace("-"+q.delegate.getCurrentAngleFromId(j),"")
}}return r}})}});if(AC.Environment.Browser.name==="Safari Mobile"&&AC.Environment.Browser.version===7&&AC.Environment.Feature.isHandheld()){AC.Element.addClassName(document.body.parentNode,"iphone-ios7")
}var h=new AC.ViewMaster.Viewer(d.selectAll(".full-takeover-color-picker-content a.full-takeover-color-picker"),"full-takeover-color-picker","full-takeover-color-picker",{addSectionIdAsClassName:true,heightFromFirstSection:true,imageLinkAutoCaptions:true,manageZ:true,shouldAnimateFadeIn:true,silentTriggers:true,useHTML5Tags:true,useKeyboardNav:true});
h.setDelegate({_links:[],_deviceLinks:[],_caseLinks:[],getCurrentAngleFromId:function(j){var i=j.split("-");
if(i[4]&&i[4]!=="default"){return i[4]}},getCurrentDeviceColorFromId:function(j){var i=j.split("-");
if(i[5]&&i[5]!=="default"){return i[5]}},getCurrentCaseColorFromId:function(j){var i=j.split("-");
if(i[6]&&i[6]!=="default"){return i[6]}},preloadImages:function(){this.viewer._locked=true;
var i=this._angleLinks.concat(this._caseLinks).concat(this._deviceLinks);var j=[];
i.forEach(function(l,k){var n=l.href.replace(/^.*\#/,"");var m=this.viewer.sectionWithId(n);
if(m._isContentLoaded===false){j.push(c.bestSrc(m._contentURL))}}.bind(this));new a(j).load().then(function(){this.viewer._locked=false
}.bind(this))},updateAngleForDeviceAndCaseColor:function(n,l,q){var j,k,p,m,o,i;
j=AC.Element.select("img",n);k=n.href.replace(/^.*\#/,"");if(k&&j){p=this.viewer.sectionWithId(k);
if(p){m=p.triggers();if(m[0]){j.setAttribute("alt",(m[0].textContent||m[0].innerText));
o=new RegExp("("+n.getAttribute("data-angle")+")_[^_.]*_[^_.]*");i=j.src.replace(o,"$1_"+l+"_"+q);
j.src=c.bestSrc(i)}}}},activateLinksForSectionId:function(m){var l,k;var o=this.getCurrentAngleFromId(m);
var j=this.getCurrentDeviceColorFromId(m);var n=this.getCurrentCaseColorFromId(m);
for(l=0,k=this._deviceLinks.length;l<k;l+=1){if(j===this._deviceLinks[l].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._deviceLinks[l].className+=" active"
}else{this._deviceLinks[l].className=this._deviceLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}}for(l=0,k=this._caseLinks.length;l<k;l+=1){if(n===this._caseLinks[l].getAttribute("data-color")&&this.viewer.currentSection.id.indexOf("-default")<0){this._caseLinks[l].className+=" active"
}else{this._caseLinks[l].className=this._caseLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}}for(l=0,k=this._angleLinks.length;l<k;l+=1){if(o===this._angleLinks[l].getAttribute("data-angle")&&this.viewer.currentSection.id.indexOf("-default")<0){this._angleLinks[l].className+=" active"
}else{this._angleLinks[l].className=this._angleLinks[l].className.replace(/active/g,"").replace(/  /g," ")
}this.updateAngleForDeviceAndCaseColor(this._angleLinks[l],j,n)}},setLinksHrefValuesForSectionId:function(o){var m,k;
var q=this.getCurrentAngleFromId(o);var j=this.getCurrentDeviceColorFromId(o);var p=this.getCurrentCaseColorFromId(o);
for(m=0,k=this._deviceLinks.length;m<k;m+=1){this._deviceLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+q+"-"+this._deviceLinks[m].getAttribute("data-color")+"-"+p)
}for(m=0,k=this._caseLinks.length;m<k;m+=1){this._caseLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+q+"-"+j+"-"+this._caseLinks[m].getAttribute("data-color"))
}for(m=0,k=this._angleLinks.length;m<k;m+=1){this._angleLinks[m].setAttribute("href","#"+this.viewer.triggerClassName+"-"+this._angleLinks[m].getAttribute("data-angle")+"-"+j+"-"+p);
if(this._angleLinks[m].getAttribute("data-angle")===q){if(this._angleLinks[m-1]){var l=this._angleLinks[m-1].getAttribute("data-angle");
this._paddleLinks[0].setAttribute("href","#"+this.viewer.triggerClassName+"-"+l+"-"+j+"-"+p);
this._paddleLinks[0].className=this._paddleLinks[0].className.replace(/disabled/g,"").replace(/  /g," ")
}else{this._paddleLinks[0].className+=" disabled"}if(this._angleLinks[m+1]){var n=this._angleLinks[m+1].getAttribute("data-angle");
this._paddleLinks[1].setAttribute("href","#"+this.viewer.triggerClassName+"-"+n+"-"+j+"-"+p);
this._paddleLinks[1].className=this._paddleLinks[1].className.replace(/disabled/g,"").replace(/  /g," ")
}else{this._paddleLinks[1].className+=" disabled"}}}},willShow:function(k,j,i){if(i&&i.id){f.scale(i.content);
this.activateLinksForSectionId(i.id)}},didShow:function(n,l,k){var m,j,o;this.viewer=n;
if(!this._didShowInitial){setTimeout(function(){var i=AC.Element.select("#"+g);
if(i){AC.Element.addClassName(i,"takeover-content-loaded")}},250);this._deviceLinks=d.selectAll("#"+g+" .color-nav-devices a");
this._caseLinks=d.selectAll("#"+g+" .color-nav-cases a");this._angleLinks=d.selectAll("#"+g+" .angle-nav a");
this._paddleLinks=d.selectAll("#"+g+" .paddle-nav a");this._links=this._deviceLinks.concat(this._caseLinks,this._angleLinks,this._paddleLinks);
for(m=0,j=this._links.length;m<j;m+=1){d.addClassName(this._links[m],this.viewer.triggerClassName)
}}if(k&&k.id&&k.content){f.scale(k.content);this.setLinksHrefValuesForSectionId(k.id);
if(!this._didShowInitial&&this.viewer.currentSection&&this.viewer.currentSection.id.indexOf("-default")<0){this.activateLinksForSectionId(k.id)
}if(this._didShowInitial){this.preloadImages()}}this._didShowInitial=true;this.viewer.options.shouldAnimateContentChange=true
}});return h};return e});AC.define("iphone/shared/fullTakeoverColorPicker/Scaler",["require"],function(a){function d(f){if(f==="transitionend"&&AC.Environment.Browser.name==="Safari"){f="webkitTransitionEnd"
}return f}function c(f,g,h){g=d(g);AC.Element.addEventListener(f,g,h)}function b(f,g,h){g=d(g);
AC.Element.removeEventListener(f,g,h)}var e=function(i,f,h){h=h||{};h.viewportMargins=h.viewportMargins||{top:0,right:0,bottom:0,left:0};
h.minimumView=h.minimumView||{width:0,height:0};if(!h.imageDimensions||!h.imageDimensions.width||!h.imageDimensions.height){throw new TypeError("you must supply a metrics object as an argument, with an imageDimensions property. The imageDimensions property must have a width and height property.")
}function g(o){var l=0;var j=0;var n=AC.Element.select(i);if(n&&n.offsetWidth>0&&n.offsetHeight>0){var k=AC.Element.selectAll(f);
if(o){k.push(o)}h.imageDimensions.ratio=(h.imageDimensions.height/h.imageDimensions.width);
h.viewportDimensions={width:n.offsetWidth,height:n.offsetHeight};l=Math.max(h.viewportDimensions.width-(h.viewportMargins.left+h.viewportMargins.right),h.minimumView.width);
j=Math.max(h.viewportDimensions.height-(h.viewportMargins.top+h.viewportMargins.bottom),h.minimumView.height);
var m=(l*h.imageDimensions.ratio<=j)?"width":"height";h.constrainedDimensions={width:(m==="width")?l:Math.round(j/h.imageDimensions.ratio),height:(m==="height")?j:Math.round(l*h.imageDimensions.ratio)};
k.each(function(p){if(p&&p.style){p.style.width=h.constrainedDimensions.width+"px";
p.style.height=h.constrainedDimensions.height+"px";p.style.top=Math.round(h.viewportMargins.top+((h.viewportDimensions.height-(h.constrainedDimensions.height+h.viewportMargins.top+h.viewportMargins.bottom))/2))+"px";
p.style.left=Math.round(h.viewportMargins.left+((h.viewportDimensions.width-(h.constrainedDimensions.width+h.viewportMargins.left+h.viewportMargins.right))/2))+"px"
}})}}this.scale=g;this.getMetrics=function(){return h}};return e});AC.DarkBox=AC.Class();
AC.DarkBox.prototype={ESC_KEY_CODE:27,initialize:function ac_initialize(a){this._identifier=a;
this.content=AC.Element.getElementById(this._identifier);AC.Element.setVendorPrefixStyle(this.content,"transform","translateZ(0)");
this.content.setAttribute("data-hires",true);this.triggers=AC.Element.selectAll("."+this._identifier);
this.content.style.display="none";this.content.parentNode.removeChild(this.content);
this._active=false;this.delegate={};this.__setupEvents();AC.Synthesize.synthesize(this)
},__setupEvents:function ac___setupEvents(){var b,a;this.__boundViewportChanged=AC.Function.bindAsEventListener(this.__viewportChanged,this);
this.__boundTriggerClicked=AC.Function.bindAsEventListener(this.__triggerClicked,this);
for(b=0,a=this.triggers.length;b<a;b+=1){AC.Element.addEventListener(this.triggers[b],"click",this.__boundTriggerClicked)
}AC.Element.addEventListener(window,"resize",this.__boundViewportChanged);AC.Element.addEventListener(window,"orientationchange",this.__boundViewportChanged);
AC.Element.addEventListener(document,"keyup",function(c){if(c.keyCode===this.ESC_KEY_CODE){this.closeDarkbox()
}}.bind(this))},__viewportChanged:function ac___viewportChanged(a){if(this._active===true){this.__resizeMask()
}},__triggerClicked:function ac___triggerClicked(a){AC.Event.stop(a);if(this._active===true){this.closeDarkbox()
}else{this.activateDarkbox()}},__maskBody:function ac___maskBody(){AC.Element.addClassName(document.documentElement,"blackout");
AC.Element.addClassName(document.body,"noscroll");this.__resizeMask()},__resizeMask:function ac___resizeMask(){this.content.style.height=(document.documentElement.clientHeight||window.innerHeight||document.documentElement.offsetHeight)+"px"
},activateDarkbox:function ac_activateDarkbox(){if(this._active!==true){this.yOffset=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
this.__maskBody();AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)");
AC.Element.setVendorPrefixStyle(this.content,"transition","400ms");setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"1"});
AC.Element.setVendorPrefixStyle(this.content,"transform","scale(1.0)")}.bind(this),100);
AC.Element.addClassName(this.content,"noscroll-show");document.body.appendChild(this.content);
this._active=true;if(typeof this.delegate.activateDarkbox==="function"){this.delegate.activateDarkbox()
}if(AC&&AC.Retina&&AC.Retina.sharedInstance){AC.Retina.sharedInstance().replace(this.content,this.content)
}}},closeDarkbox:function ac_closeDarkbox(){if(this._active===true){AC.Element.setVendorPrefixStyle(this.content,"transition","300ms");
setTimeout(function(){AC.Element.setStyle(this.content,{opacity:"0"});AC.Element.setVendorPrefixStyle(this.content,"transform","scale(.75)")
}.bind(this),1);var a=function(){document.body.style.height="";AC.Element.removeClassName(document.documentElement,"blackout");
AC.Element.removeClassName(this.content,"noscroll-show");AC.Element.removeClassName(document.body,"noscroll");
window.scrollTo(0,this.yOffset);this.content.parentNode.removeChild(this.content);
this._active=false;if(typeof this.delegate.closeDarkbox==="function"){this.delegate.closeDarkbox()
}AC.Element.removeVendorEventListener(this.content,"transitionEnd",a,false)}.bind(this);
AC.Element.addVendorEventListener(this.content,"transitionEnd",a,false);if(!AC.Environment.Feature.cssPropertyAvailable("transition")){a()
}}},setDelegate:function ac_setDelegate(a){this.delegate=a}};AC.define("iphone/lib/ac_darkbox/ac_darkbox",function(){});
AC.define("AC/DarkBox",["require","iphone/lib/ac_darkbox/ac_darkbox"],function(a){a("iphone/lib/ac_darkbox/ac_darkbox");
return AC.DarkBox});AC.define("iphone/shared/fullTakeoverColorPicker/DarkboxPicker",["require","iphone/shared/fullTakeoverColorPicker/Viewer","iphone/shared/fullTakeoverColorPicker/Scaler","AC/DarkBox"],function(a){var c={viewportMargins:{top:128,right:50,bottom:147,left:50},imageDimensions:{width:600,height:1200},minimumView:{width:0,height:0}};
var b;var g;function f(i){if(i==="transitionend"&&AC.Environment.Browser.name==="Safari"){i="webkitTransitionEnd"
}return i}function e(i,j,k){j=f(j);AC.Element.addEventListener(i,j,k)}function d(i,j,k){j=f(j);
AC.Element.removeEventListener(i,j,k)}var h=function(){var q="full-takeover-color-picker-overlay-wrapper";
var j="#"+q;var l=j+" figure";var r;var p;var o=AC.Element;var n=a("iphone/shared/fullTakeoverColorPicker/Viewer");
var s=a("iphone/shared/fullTakeoverColorPicker/Scaler");var i=a("AC/DarkBox");var p=new s(j,l,c);
var m=n(q,p);var u=0;function t(){r=new i(q);r.setDelegate({activateDarkbox:function(){var y=b.href.match(/[^\#]+$/)[0];
var x;m.options.shouldAnimateContentChange=false;m._currentTrigger="darkbox";for(x in AC.AutoGallery.galleries){AC.AutoGallery.galleries[x].options.oldUseKeyboardNav=AC.AutoGallery.galleries[x].options.useKeyboardNav;
AC.AutoGallery.galleries[x].options.oldAlwaysUseKeyboardNav=AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav;
AC.AutoGallery.galleries[x].options.useKeyboardNav=false;AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav=false
}m.options.useKeyboardNav=true;m.options.alwaysUseKeyboardNav=true;m.show(m.sectionWithId(y));
p.scale()},closeDarkbox:function(){m._currentTrigger=false;var x;for(x in AC.AutoGallery.galleries){AC.AutoGallery.galleries[x].options.useKeyboardNav=AC.AutoGallery.galleries[x].options.oldUseKeyboardNav;
AC.AutoGallery.galleries[x].options.alwaysUseKeyboardNav=AC.AutoGallery.galleries[x].options.oldAlwaysUseKeyboardNav
}m.options.useKeyboardNav=false;m.options.alwaysUseKeyboardNav=false;k()}});AC.Element.addEventListener(AC.Element.select("a.close",r.content),"click",function(x){r.closeDarkbox();
AC.Event.stop(x)});e(window,"resize",p.scale);e(window,"orientationchange",p.scale)
}function v(){if(document.location.hash&&/^\#full\-takeover\-color\-picker\-\w+\-\w+/.test(document.location.hash)){var x=AC.Element.select('a[href*="'+document.location.hash+'"]');
if(x){w(x)}}}function w(x){u=AC.Viewport.scrollOffsets().y;b=x;r.activateDarkbox();
setTimeout(function(){window.scrollTo(0,0)},10)}function k(){window.scrollTo(0,u)
}this.zoom=w;this.init=function(){t();v()}};return h});AC.define("iphone/shared/fullTakeoverColorPicker/builder",["require","iphone/shared/fullTakeoverColorPicker/DarkboxPicker"],function(a){var b=a("iphone/shared/fullTakeoverColorPicker/DarkboxPicker");
return function(c){var d=new b();AC.onDOMReady(function(){d.init();AC.Element.addEventListener(c,"click",function(e){d.zoom(AC.Event.target(e));
AC.Event.stop(e)})});return d}});AC.define("accessories/bootstrap",["require","iphone/shared/ac_autogallery/Types/cases","iphone/shared/gallery/imageLinkPreload","iphone/shared/fullTakeoverColorPicker/builder"],function(a){var e=a("iphone/shared/ac_autogallery/Types/cases");
var b=a("iphone/shared/gallery/imageLinkPreload");var d=a("iphone/shared/fullTakeoverColorPicker/builder");
var c=d(AC.Element.select('#main a[href*="#full-takeover-color-picker"]'));AC.onDOMReady(function(){var g,f,j;
var h=["gallery-iphone5c","gallery-iphone5s"];for(g=0,f=h.length;g<f;g+=1){j=h[g];
if(AC.AutoGallery.galleries[j]){b(AC.Element.selectAll(".imageLink",AC.AutoGallery.galleries[j].__wrapper),AC.AutoGallery.galleries[j])
}}})});