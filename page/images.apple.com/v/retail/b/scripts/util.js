AC.namespace("AC.retail.util");AC.retail.util.DOM={query:(function(){var b;if(document.querySelectorAll){b=function(d,a){return d.querySelectorAll(a)
}}else{b=function(d,a){return Prototype.Selector.select(a,d)}}return function(a,d){return b(d||document,a)
}}()),setOpacity:function(c,d){c.style.opacity=d;if(+AC.retail.util.environment.getIEVersion()<9){c.style.filter="alpha(opacity="+(d*100)+")"
}},cumulativeOffset:Element.cumulativeOffset,parseXML:function(c){var d=document.createElement("div");
d.innerHTML=c;return d}};AC.retail.util.template=function(e,d){var f;if(typeof e!=="string"){e=e.innerHTML
}for(f in d){if(d.hasOwnProperty(f)){e=e.replace(new RegExp("{\\s*"+f+"\\s*}","g"),d[f])
}}return e};AC.retail.util.environment=(function(d){var c=(function(){if(d.isIE()){return"ms"
}else{if(d.isWebKit()){return"webkit"}else{if(d.isFirefox()){return"moz"}else{return false
}}}}());return{getDOMVendor:function(a){if(c===a){return true}else{if(a){return false
}else{return c}}},getIEVersion:function(){var a=d.getAgent(),b=a.match(/msie\D*([\.\d]*)/i),f;
if(b&&b[1]){f=b[1]}return f},isIE6:function(){var a=d.getAgent(),b=a.match(/msie\D*([\.\d]*)/i),f;
if(b&&b[1]){f=b[1]}return(+f<=6)},isIE9:function(){return(this.getIEVersion()==="9.0")
}}}(AC.Detector));AC.retail.util.ajaxGet=function(h,g,f){var e=AC.Ajax.getTransport();
e.open("GET.html",h,true);e.onreadystatechange=function(){if(e.readyState===4){if(e.status===200){g(e.responseText)
}else{if(f){f(e.statusText)}}}};e.send()};AC.retail.util.generateExtension=function(b){return"."+b
};AC.retail.globalSearchDecorator=function(m){var p=document.getElementsByTagName("input"),l=new AC.retail.EventDispatch(),i=(AC.retail.util.environment.getDOMVendor()=="moz"||AC.Detector.iOSVersion()||AC.retail.util.environment.getDOMVendor()=="ms"),o="#999",q=false,k=null,n,r=function(c){var a=c,d=this,f=AC.retail.util.environment.isIE9();
d.placeholder=c.getAttribute("placeholder");if(a.type==="text"&&a.className===m){var b=$(a.parentNode);
if(f){b.addClassName("ienine-search-wrapper")}var e=window.location.search.toQueryParams();
if((a.value===""&&q===false&&(!e.q||(a.id=="retail-footer-search"&&e.q)))||a.value==d.placeholder){this.onBlur(a)
}}};onBlur=function(b,a){if("ms"===AC.retail.util.environment.getDOMVendor()){b.value=self.placeholder;
b.style.color="#999";b.style.fontSize="13px";b.style.fontWeight="normal"}};init=function(){if(p.length>0){for(n=0;
n<p.length;n+=1){if(!p[n].className.match("global-retail-search")){continue}self.insertReset(p[n]);
self.handleOnLoad(p[n]);if("ms"===AC.retail.util.environment.getDOMVendor()){r(p[n]);
p[n].maxLength=23;Event.observe(p[n],"focus",function(b){var a=Event.element(b);
if(a.value===self.placeholder){q=true;a.value="";a.style.color="#000"}else{if(a.value!=""){a.style.color="#000";
self.makeResetVisible(a)}}})}if(i){l.subscribeEvent(p[n],"::viewUpdated",function(a){if(a.value.length&&a.value!==self.placeholder){makeResetVisible(a)
}}.bind(null,p[n]));Event.observe(p[n],"blur",function(b){var a=Event.element(b);
if(a.value===""||a.value==self.placeholder){q=false;self.onBlur(a)}});Event.observe(p[n],"keyup",function(b){var a=b.target?b.target:b.srcElement;
if(b.keyCode==8){if(a.value.length==0){self.makeResetHide(a)}}})}}}};handleOnLoad=function(a){if(i&&a.value!=""&&a.value!=self.placeholder){if("ms"!==AC.retail.util.environment.getDOMVendor()){self.makeResetVisible(a)
}}};insertReset=function(a){var b=$(a).previousSiblings()[0];if(!b||b.tagName!="span"){var c=document.createElement("span");
c.className="reset";Element.addClassName(c,"reset");a.parentNode.insertBefore(c,a)
}};makeResetVisible=function(a){var b=a.previousSiblings()[0];if(b.tagName=="SPAN"&&b.className=="reset"){Element.addClassName($(b),"active");
Event.observe(b,"click",self.makeResetHide)}};makeResetHide=function(c){var b,a;
if(arguments[0].type&&arguments[0].type=="click"){a=c.target?c.target:c.srcElement;
b=$(a).nextSiblings()[0]}else{a=arguments[0].previousSiblings()[0];b=arguments[0]
}Element.removeClassName(a,"active");$(b).value="";if("ms"===AC.retail.util.environment.getDOMVendor()){$(b).focus()
}l.dispatchEvent($(b),"userEngagementChanged",false);Event.stopObserving(a,"click",self.makeResetHide)
};init()};