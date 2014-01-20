Event.onDOMReady(function(){var o=$$(".grid ul h3>a",".grid ul span");var u=$$(".grid ul h4>a");
if(u.length==0){u=$$(".grid ul h4")}o=o.concat(u);o.each(function(a){a.innerHTML=a.innerHTML.truncate(21)
});var x=null;if(x=$$("#related a")){x.each(function(a){var b=AC.Tracking.pageName().split(/\s-\s/g);
b=b[0]+" - "+b[1];a.observe("mousedown",function(d){var c={prop3:b+"- View In iTunes - Other",pageName:AC.Tracking.pageName()+" (US)"};
AC.Tracking.trackClick(c,this,"o",c.prop3)})})}var v=null;if(v=$$("#details a")){v.each(function(a){var b=AC.Tracking.pageName().split(/\s-\s/g);
b=b[0]+" - "+b[1];a.observe("mousedown",function(e){var c=$(a).readAttribute("class");
if(c!="audio controller movieLink"&&c!="audio movieLink"&&c!="audio controller movieLink active"&&c!="audio movieLink active"){var d={prop3:b+"- View In iTunes",pageName:AC.Tracking.pageName()+" (US)"};
AC.Tracking.trackClick(d,this,"o",d.prop3)}})})}var p=null;if(p=$$("a.more")){p.each(function(a){if(!a.readAttribute("href").match(/\/itunes\/charts\//)){a.observe("mousedown",function(c){var b={prop3:AC.Tracking.pageName()+" - Buy In iTunes",pageName:AC.Tracking.pageName()+" (US)"};
AC.Tracking.trackClick(b,this,"o",b.prop3)})}})}var A=null;if(A=$("cover")){if(A=A.down("a")){var z=AC.Tracking.pageName().split(/\s-\s/g);
z=z[0]+" - "+z[1];A.observe("mousedown",function(b){var a={prop3:z+"- View In iTunes",pageName:AC.Tracking.pageName()+" (US)"};
AC.Tracking.trackClick(a,this,"o",a.prop3)})}}if($("summary")){var w=$(document.body).hasClassName("shows")?180:210;
var s=$("summary").down("p");var B=$("summary");var t=$("summary_toggle");var q,y,r;
if(s.innerHTML.length>w){t.addClassName("visible");y=s.innerHTML;r=s.innerHTML.truncate(w,"...");
s.update(r);$("summary_toggle").observe("click",function(){if(s.hasClassName("expanded")){new Effect.Morph(B,{style:"height:6em",duration:0.3,afterFinish:function(){s.innerHTML=r;
s.removeClassName("expanded");t.update("View more").removeClassName("less")}})}else{s.update(y);
q=s.getHeight()/12;new Effect.Morph(B,{style:"height:"+q+"em",duration:0.3,afterFinish:function(){s.addClassName("expanded");
t.update("View less").addClassName("less")}})}})}else{t.hide()}}if($("related")){$("related").select("li a").each(function(a){a.innerHTML=a.innerHTML.truncate(35,"...")
})}});