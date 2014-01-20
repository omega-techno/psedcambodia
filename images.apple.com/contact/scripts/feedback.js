KmLoader.success=function(g,j){var m="";for(i=0;i<g.results.length;i++){if(g.results[i]!=null){var h=true;
if(KmLoader.ignoreArticles!==undefined&&g.results[i].url.indexOf("support.apple.com/kb/index.html")!=-1){var l=g.results[i].url.indexOf("?")!=-1?g.results[i].url.indexOf("?"):g.results[i].url.length;
var k=g.results[i].url.substring(g.results[i].url.lastIndexOf("../index.html")+1,l);if(KmLoader.ignoreArticles.indexOf(k)!=-1){h=false
}}if(h){m+='<li><a href="'+g.results[i].url+'" onclick="s_objectID=\''+g.results[i].url+"_p"+j+"-"+i+"';\">"+g.results[i].title+"</a></li>"
}}}$("portlet_"+j).innerHTML=m};FeedbackForm=Class.create({adviceTemplate:'<div id="form-advice" style="display:none;">        <div class="wrapper">            <h3>There were errors in your feedback submission:</h3>            <ul class="square">                <li class="customer_name">Please enter your name.</li>                <li class="customer_email">Please enter a valid email address.</li>                <li class="subject">Please enter a subject.</li>                <li class="url">Please enter a page or URL</li>                <li class="feedback_comment">Please enter a comment.</li>            </ul>        </div>    </div>',init:function(b){this.customControls=[];
this.customSelects=[];this.customRadios=[];this.customCheckboxes=[];this.openSelect=false
},initialize:function(b){this.init();this.form=$$('form[action*="https://feedback.apple.com/bin/nph-fb.pl"]')[0];
if(!this.form){return}this.form.getElements().each(function(a){if(a.type!="hidden"){a.setAttribute("tabindex","1")
}});this.buildCustomControls();this.initValidation();this.clickListener=this.handleClick.bind(this);
document.observe("click",this.clickListener);this.keyDownListener=this.handleKeyDown.bind(this);
document.observe("keydown",this.keyDownListener)},buildCustomControls:function(){if(!AC.Detector.isIE()){this.elements=this.form.getElements();
this.elements.each(function(d){if(d.type=="hidden"){return}var e=d.tagName.toLowerCase();
if(e=="input"){if(d.type=="radio"){var d=d.up("fieldset");if(!d.hasClassName("replaced")){var f=new FeedbackForm.CustomRadio(d,this);
this.customControls.push(f);this.customRadios.push(f)}}else{if(d.type=="checkbox"){var d=d.up("fieldset");
if(!d.hasClassName("replaced")){var f=new FeedbackForm.CustomCheckbox(d,this);this.customControls.push(f);
this.customCheckboxes.push(f)}}}}}.bind(this))}},findControl:function(f){for(var e=this.customControls.length-1;
e>=0;e--){var d=this.customControls[e];if(f==d.container||f.descendantOf(d.container)){return d
}}return false},closeSelects:function(b){this.customSelects.each(function(a){if(a.isOpen&&(b==null||b!=a.container)){a.close()
}})},handleClick:function(c){var d=c.findElement();var d=this.findFormTarget(d);
this.closeSelects(d)},findFormTarget:function(f){var d=f.descendantOf(this.form);
if(!d){return false}if(!f.hasAttribute("tabindex")){f=f.up("*[tabindex]")}if(!f){return false
}var e=f.descendantOf(this.form);if(e){return f}return false},handleKeyDown:function(g){var h=g.findElement();
var h=this.findFormTarget(h);if(h){var e=this.findControl(h);if(e){if(g.keyCode==32||g.keyCode==Event.KEY_RETURN){g.stop();
if(e.isOpen===true){e.close()}else{e.handleSelect(g,h)}}else{if(g.keyCode==Event.KEY_ESC){this.closeSelects(null)
}else{if(g.keyCode==Event.KEY_DOWN){if(this.customSelects.indexOf(e)!=-1){g.stop();
if(e.previousSelection){var f=e.previousSelection.i+1;if(f<e.controls.length){e.moveSelection(g,e.controls[f],f)
}}}}else{if(g.keyCode==Event.KEY_UP){if(this.customSelects.indexOf(e)!=-1){g.stop();
if(e.previousSelection){var f=e.previousSelection.i-1;if(f>=0){e.moveSelection(g,e.controls[f],f)
}}}}}}}}}},initValidation:function(c){this.validation=new Validation(this.form,{immediate:true,focusOnError:false,onFormValidate:this.handleFormValidate.bind(this),onElementValidate:this.handleElementValidate.bind(this)});
var d=[];for(key in Validation.methods){d=d.concat($$("."+key))}d=d.uniq();d.each(function(a){a.insert({after:'<i class="failed" id="advice-'+a.identify()+'" style="display:none">Required</div>'})
})},buildAdvice:function(b){if(!this.advice){this.form.insert({top:this.adviceTemplate});
this.advice=$("form-advice")}},handleFormValidate:function(f){if(f==false){this.buildAdvice();
this.advice.select("li").each(function(a){if(a.getAttribute("toStyle")){a.setStyle(a.getAttribute("toStyle"));
a.removeAttribute("toStyle")}});var d=0.5;var e=function(a){if(a){a.options.beforeUpdate=function(){}
}new Effect.ScrollTo(this.advice,{duration:d})}.bind(this);if(!this.advice.visible()){new Effect.BlindDown(this.advice,{duration:d,beforeUpdate:e})
}else{e()}}},handleElementValidate:function(f,d){this.buildAdvice();var e=this.advice.down("."+d.name);
if(e){e.setAttribute("toStyle",(f)?"display:none;":"display:;")}}});FeedbackForm.CustomControl=Class.create({previousSelection:null,className:"",id:"",multiselect:false,initialize:function(d,c){this.parent=c;
this.replaced=d;this.replaced.addClassName("replaced");this.legend=d.down("legend");
this.controls=d.childElements();if(this.legend){this.controls=this.controls.without(this.legend)
}this.fields=this.replaced.select("input").concat(this.replaced.select("option"));
this.fields.each(function(a){a.setAttribute("tabindex","-1")});this.build()},build:function(){this.wrapper=new Element("div",{"class":"custom"+this.className+"wrap"});
this.container=new Element("ul",{"class":"custom"+this.className});var b=new Element("p").update(this.legend.innerHTML);
b.addClassName("legend");this.wrapper.appendChild(b);this.controls.each(this.buildControl.bind(this));
this.wrapper.appendChild(this.container);this.replaced.parentNode.appendChild(this.wrapper)
},buildControl:function(f,e){var d=new Element("li",{"class":this.className,tabindex:"1"}).update("<span>"+f.down("label").innerHTML+"</span>");
this.container.appendChild(d);if(f.readAttribute("checked")=="checked"||f.readAttribute("selected")=="selected"){this.select(d,f,e)
}if(this.handleSelect&&typeof(this.handleSelect)=="function"){d.observe("click",this.handleSelect.bindAsEventListener(this,d,e))
}this.controls[e]=d},handleSelect:function(f,d,e){if(e==null){e=this.controls.indexOf(d)
}if(!this.multiselect&&this.previousSelection&&this.previousSelection.field&&this.previousSelection.control){this.toggleSelected(this.previousSelection.control,this.previousSelection.field,this.previousSelection.i)
}this.toggleSelected(d,this.fields[e],e);this.validate(this.fields[e])},toggleSelected:function(f,d,e){if(d.readAttribute("checked")=="checked"||d.readAttribute("selected")=="selected"){this.unselect(f,d,e)
}else{this.select(f,d,e)}},unselect:function(f,d,e){f.removeClassName("selected");
d.removeAttribute("selected");d.removeAttribute("checked");this.previousSelection=null
},select:function(f,d,e){f.addClassName("selected");d.writeAttribute("checked","checked");
d.writeAttribute("selected","selected");this.previousSelection={control:f,field:d,i:e}
},validate:function(c){if(c.tagName.toLowerCase()=="option"){c=c.up("select")}if(c){var d=Validation.validate(c,{useTitle:this.parent.validation.options.useTitles,onElementValidate:this.parent.validation.options.onElementValidate})
}return null}});FeedbackForm.CustomRadio=Class.create(FeedbackForm.CustomControl,{className:"radio"});
FeedbackForm.CustomCheckbox=Class.create(FeedbackForm.CustomControl,{className:"checkbox",multiselect:true});
Event.onDOMReady(function(){var b=new FeedbackForm("feedback.apple.com")});