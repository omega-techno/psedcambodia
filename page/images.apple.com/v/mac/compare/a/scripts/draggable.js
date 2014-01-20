DraggableTable=Class.create({tooltipOptions:{src:"http://images.apple.com/mac/compare/images/table_tooltip.png",pos:"right",delay:1,dist:10},initialize:function(c){this.table=c;
this.dragging=false;this.numberOfColumns=this.table.down("tbody tr").select("td").length;
this.columns=new Array(this.numberOfColumns+1);for(var d=this.columns.length-1;
d>=0;d--){this.columns[d]=[]}this.columnWidth=Math.floor(this.getUnitFromStyle(this.table,this.table.getStyle("width"))/(this.numberOfColumns-1));
this.convertToBlock();this.draggables=[];for(var d=this.columns.length-2;d>=1;d--){this.draggables.push(new Draggable(this.columns[d],{constraint:"horizontal",starteffect:this.startEffect.bind(this),onStart:this.onStart.bind(this),onDrag:this.onDrag.bind(this),endeffect:this.end.bind(this)}));
this.columns[d].select("a").each(function(a){a.observe("click",function(b){if(this.dragging){b.stop()
}}.bind(this))}.bind(this))}this.table.addClassName("draggable");new AC.Tooltip(this.table.select(".th.thead"),this.tooltipOptions)
},getUnitFromStyle:function(d,c){if(c.match("px")){return parseInt(c.replace("px",""))
}else{if(c.match("em")){while(d.getStyle("font-size").match("pt")){d=d.up()}return parseInt(d.getStyle("font-size").replace("px","")*c.replace("em",""))
}}return parseInt(c)},convertToBlock:function(){var B=this.table.getStyle("width");
var j=this.table.getStyle("height");var z=0;var w=new Element("div",{className:"table "+this.table.className,style:"width:"+B+"; height:"+j+";"});
var v=false;this.rows=this.table.select("tr");var r=this.rows.length;for(var x=0;
x<r;x++){var i=this.rows[x];var A=i.immediateDescendants();var j=this.getUnitFromStyle(i,i.getStyle("height"));
var u=false;z+=j;var q=A.length;for(var y=0;y<q;y++){var s=A[y];if(s.getAttribute("colspan")==this.numberOfColumns){var t=s.positionedOffset().top;
s.className="static";s.style.width=this.columnWidth-this.getUnitFromStyle(s,s.getStyle("padding-left"))-this.getUnitFromStyle(s,s.getStyle("padding-right"))+"px";
s.style.height=j-this.getUnitFromStyle(s,s.getStyle("padding-top"))-this.getUnitFromStyle(s,s.getStyle("padding-bottom"))+"px";
s.style.top=t+"px";s.style.position="absolute";v=j;this.columns[this.columns.length-1].push(s)
}else{if(s.hasClassName("runner")){s.style.width=B}else{s.style.width=this.columnWidth-this.getUnitFromStyle(s,s.getStyle("padding-left"))-this.getUnitFromStyle(s,s.getStyle("padding-right"))+"px"
}s.style.height=j-this.getUnitFromStyle(s,s.getStyle("padding-top"))-this.getUnitFromStyle(s,s.getStyle("padding-bottom"))+"px";
if(v){u=true;s.style.paddingTop=parseInt(v)+this.getUnitFromStyle(s,s.getStyle("padding-top"))+"px"
}s.addClassName(i.className);this.columns[y].push(s)}}if(v&&u){v=false;u=false}}this.columns.each(function(c,a){var b=new Element("div",{className:"tr column column"+a,style:"width:"+this.columnWidth+"px; left:"+(a-1)*this.columnWidth+"px;"});
w.appendChild(b);c.each(function(e){var d=new Element("div").insert(e.innerHTML);
try{d.setStyle(e.readAttribute("style"))}catch(f){}d.className=e.className;d.className+=" "+e.tagName.toLowerCase();
if(e.up("thead")){d.className+=" thead"}if(e.up("tbody")){d.className+=" tbody"
}b.appendChild(d)});if(b.firstChild.hasClassName("runner")){b.style.left="0px"}this.columns[a]=b
}.bind(this));this.columns[this.columns.length-1].addClassName("static");this.table.parentNode.replaceChild(w,this.table);
this.table=w;this.table.style.height=z+"px"},startEffect:function(d){var c=[];this.staticColumns.each(function(a,b){c.push(new Effect.Fade(a,{to:0.6,sync:true}))
}.bind(this));new Effect.Parallel(c,{duration:0.2});d.addClassName("dragging")},onStart:function(d,c){document.body.style.overflowX="hidden";
this.table.addClassName("dragging");this.dragging=true;this.currentPosition=(d.currentDelta()[0]/this.columnWidth)+1;
this.staticColumns=this.columns.without(d.element)},onDrag:function(f,e){var g=Math.round(f.currentDelta()[0]/this.columnWidth)+1;
if(g!=this.currentPosition&&(0<g&&g<this.numberOfColumns)){var h=(this.currentPosition>g)?g:g-1;
this.staticColumns[h].style.left=(this.currentPosition-1)*this.columnWidth+"px";
this.currentPosition=g}},end:function(f){window.setTimeout(this.afterEnd.bind(this),100);
var e=[];this.staticColumns.each(function(a){e.push(new Effect.Appear(a,{to:1,sync:true}))
});new Effect.Parallel(e,{duration:0.2});document.body.style.overflowX="";this.table.removeClassName("dragging");
f.removeClassName("dragging");f.style.left=(this.currentPosition-1)*this.columnWidth+"px";
this.columns.sort(function(a,b){if(a.style.left.replace("px","")>b.style.left.replace("px","")){return 1
}else{if(a.style.left.replace("px","")<b.style.left.replace("px","")){return -1
}}return 0});this.columns.each(function(a,b){a.style.zIndex=b;for(var c=this.numberOfColumns;
c>=1;c--){a.removeClassName("column"+c)}a.addClassName("column"+b)}.bind(this));
if(AC.Detector.isWebKit()){var g=window.pageXOffset||(window.document.documentElement.scrollLeft||window.document.body.scrollLeft);
var h=window.pageYOffset||(window.document.documentElement.scrollTop||window.document.body.scrollTop);
window.scroll(g+1,h+1);window.scroll(g,h)}},afterEnd:function(b){this.dragging=false
}});DraggableTable.tables=[];Event.onDOMReady(function(){if(!AC.Detector.isiPad()&&!AC.Detector.isMobile()){var b=$$("table.draggable-columns");
b.each(function(a){DraggableTable.tables.push(new DraggableTable(a))})}});