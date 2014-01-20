var HotnewsFeed=Class.create({template:new Template('<li #{featuredClass}>#{featuredImg}<h3><a href="#{link}" class="link #{external}">#{title}</a></h3><p class="date">#{date}</p><p>#{copy} <span class="source">#{readMoreText} <a href="#{link}" class="#{external}">#{readmore}</a></span></p></li></li>'),initialize:function(wrapper,urlElement){this.wrapper=wrapper;
this.readMoreText=urlElement.getAttribute("data-readmore")||"Read more:";url=urlElement.href;
this.ajax=new Ajax.Request(url,{method:"GET",evalJS:false,evalJSON:false,evalScripts:false,onSuccess:function(request){this.results=(eval("("+request.responseText+")"));
this.parseResults()}.bind(this),onException:function(r,e){throw (e)}})},parseResults:function(){var i,h="",g="",f,j=this.results.length;
for(f=0;f<j;f++){if(this.results[f].featured===true){h+=this.parseResult(this.results[f],f)
}else{g+=this.parseResult(this.results[f],f)}}i=document.createElement("ul");i.className="stories";
i.innerHTML=h+g;this.wrapper.appendChild(i);this.wrapper.removeClassName("loading")
},parseResult:function(d,c){d.title=unescape(d.title);d.copy=unescape(d.copy);d.external=(d.link.search("http")===0)?"external":"";
d.readMoreText=this.readMoreText;if(d.featured===true){d.featuredClass='class="featured"';
d.featuredImg='<a href="'+d.link+'"><img class="left" src="'+d.image+'" alt="'+d.title+'" /></a>'
}return this.template.evaluate(d)}});Event.onDOMReady(function(){new HotnewsFeed($("hotnews-listing"),$("hotnews-feed-url"))
});