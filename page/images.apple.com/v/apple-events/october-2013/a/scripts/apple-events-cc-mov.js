var nativeController=false;var movieURL=null;var endStateNode;if(typeof AC=="undefined"||typeof AC.Detector=="undefined"){try{console.log("AC Not found")
}catch(e){}}else{if(AC.Detector.isMobile()){var iPhoneOSVersion=AC.Detector.iPhoneOSVersion();
if((iPhoneOSVersion&&iPhoneOSVersion[0]<3)){message="Please update to the latest version iOS.";
$("message").innerHTML=message;$("message").style.display="block"}else{movieURL=iphoneURL;
nativeController=true}}else{if(AC.Detector.isiPad()){movieURL=ipadURL;nativeController=true
}else{if(AC.Detector.isMac()){if(AC.Detector.macOSAtLeastVersion("10.6")){if(AC.Detector.isWebKit()){var ua=navigator.userAgent.toLowerCase();
var version=parseInt(parseFloat(ua.substring(ua.lastIndexOf("safari/index.html")+7)),10);
if(AC.Detector.isChrome()||version<528){movieURL=nonSlURL}else{movieURL=slURL}}else{movieURL=nonSlURL
}}else{movieURL=nonSlURL}}else{if(AC.Detector.isWin()){movieURL=windowsURL}}}}}function toggleReplay(d){var c=$("videoimage");
endStateNode=$("endState");if(d){c.toggleClassName("show");c.width="846";c.height="478";
$("endState").addClassName("endStateActive");$("videoimage").style.display="block";
Event.observe(endStateNode,"click",function(){toggleReplay(false);playVideo()})
}else{c.toggleClassName("hide");c.width="1";c.height="1";$("endState").removeClassName("endStateActive");
$("videoimage").style.display="none";Event.stopObserving(endStateNode,"click")}}function playVideo(){var o=true;
var p=false;if(!!navigator.userAgent.toLowerCase().match("firefox/4")){o=false}var m=(movieURL.indexOf("?")>0)?movieURL.substring(movieURL.lastIndexOf("."),movieURL.lastIndexOf("?")):movieURL.substring(movieURL.lastIndexOf("."),movieURL.length);
if(m===".m3u8"||m===".mov"){var q=videoJson}else{q=null}var l=Media.create($("qt-iphone"),movieURL,{id:"movie",autohref:true,width:848,height:480,autoplay:true,jsonUrl:q,expectingMovieJson:(q==null?false:true),spec:(ACUtils.Detector.isWin()&&ACUtils.Detector.isWebKit()||!AC.Detector.macOSAtLeastVersion("10.6")&&ACUtils.Detector.isWebKit()?"qt":""),controller:nativeController,cache:o});
var j={};j.pageName="V@S: QuickTime - VOD Keynote - October 2013";j.prop13=j.pageName;
AC.Tracking.trackClick(j,this,"o",j.pageName);$("content").appendChild(new Element("div",{id:"qt"}).update(l));
if(l){var k=$(document.createElement("div"));Element.addClassName(k,"controllerPanel");
$("qt-iphone").appendChild(k);var n=new Media.ControlsWidget(k);l.setControlPanel(n);
l.setDelegate(l);l.didEnd=function(){document.getElementById("qt-iphone").innerHTML="";
l=null;toggleReplay(true)}}}function createIframe(){var b;b=document.createElement("IFRAME");
b.setAttribute("src","iframe.html"+location.search);b.setAttribute("name","urls");
b.setAttribute("id","urls");b.setAttribute("width","1");b.setAttribute("height","1");
b.setAttribute("style","visibility:hidden; position:absolute; bottom:0;");document.getElementById("details").appendChild(b)
}window.onload=function(){document.getElementById("voip").href=voiceOver;document.getElementById("sosumi").innerHTML="";
document.getElementById("sosumi").appendChild(document.createTextNode(requirements));
if(refreshPage&&!/\.mov|\.m3u8/.test(slURL)){createIframe()}var c=movieURL.split(".");
c=c[c.length-1];if(AC.Detector.isiPad()||AC.Detector.isMobile()||AC.Detector.macOSAtLeastVersion("10.6")){$$(".getqt")[0].style.display="none"
}if(c==="jpg"){var d=$("qt-iphone");d.innerHTML="";d.innerHTML='<img id="videojpg" class="" src="'+movieURL+'" alt="" width="846" height="478" />'
}else{playVideo()}};