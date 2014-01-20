if(!Array.prototype.indexOf){Array.prototype.indexOf=function(j){if(this==null){throw new TypeError()
}var h,f,i=Object(this),g=i.length>>>0;if(g===0){return -1}h=0;if(arguments.length>1){h=Number(arguments[1]);
if(h!=h){h=0}else{if(h!=0&&h!=Infinity&&h!=-Infinity){h=(h>0||-1)*Math.floor(Math.abs(h))
}}}if(h>=g){return -1}for(f=h>=0?h:Math.max(g-Math.abs(h),0);f<g;f++){if(f in i&&i[f]===j){return f
}}return -1}}(function(u){var z,p,r,v,q;z=["ae","am","asia","at","au","befr","benl","bg","bh","br","bw","ca","ca/fr","cf","chde","chfr","ci","cm","cn","cz","de","dk","ee","eg","es","fi","fr","gn","gq","gr","gw","hk","hk/en","hr","hu","id","ie","il","in","it","jo","jp","ke","kr","kw","la","lae","li","lt","lu","lv","ma","md","me","mg","mk","ml","mt","mu","mx","my","mz","ne","ng","nl","no","nz","om","ph","pl","pt","qa","ro","ru","sa","se","sg","si","sk","sn","th","tn","tr","tw","ug","uk","vn","za"];
r={desktop:"/ipad-air/",iPhone:"/ipad-air/index1.html",iPad:"/ipad-air/index2.html"};
function o(b){var d=b.split("../index.html");var e=d[1];var c=d[2];var a=e;if(e==="ca"&&c==="fr"){a+="/"+c
}else{if(e==="hk"&&c==="en"){a+="/"+c}}if(z.indexOf(a)>=0){return"/"+a}else{return""
}}function w(a){return a.match(/AppleWebKit/i)}function A(a){return w(a)&&a.match(/iPad/i)
}function y(a){return a.match(/iPhone/i)}function x(a){return a.match(/iPod/i)}function s(a){return w(a)&&a.match(/Mobile/i)&&!A(a)
}function t(a){return s(a)||A(a)?parseFloat(a.match(/os ([\d_]*)/i)[1].replace("_",".")):0
}function B(a){if(A(a)){return"iPad"}if((y(a)||x(a))){return"iPhone"}else{return"desktop"
}}p=o(u.location.pathname);v=B(navigator.userAgent);q=p+r[v];if(u.location.pathname!==q){u.location=q
}}(this));