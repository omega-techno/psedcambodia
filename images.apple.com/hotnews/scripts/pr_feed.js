var PressReleasesFeed=Class.create({template:new Template('<li #{newDate}><a href="#{link}" class="link">#{title}</a>#{parsedDate}</li>'),initialize:function(wrapper,urlElement){this.wrapper=wrapper;
url=urlElement.href;this.ajax=new Ajax.Request(url,{method:"GET",evalJS:false,evalJSON:false,evalScripts:false,onSuccess:function(request){this.results=(eval("("+request.responseText+")"));
this.parseResults()}.bind(this),onException:function(r,e){throw (e)}})},parseResults:function(){var c,d="",a,b=this.results.length;
for(a=0;a<b;a++){d+=this.parseResult(this.results[a],a)}c=document.createElement("ul");
c.className="stories";c.innerHTML=d;this.wrapper.appendChild(c);this.wrapper.removeClassName("loading")
},parseResult:function(a,b){if(!this.results[b-1]||this.results[b-1].date!==a.date){a.newDate='class="newdate"';
a.parsedDate='<span class="date">'+a.date+"</span>"}else{a.newDate="";a.parsedDate=""
}return this.template.evaluate(a)}});Event.onDOMReady(function(){new PressReleasesFeed($("pr-listing"),$("pr-feed-url"))
});