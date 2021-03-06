var Validator=Class.create();Validator.prototype={initialize:function(c,b,d,a){if(typeof d=="function"){this.options=$H(a);
this._test=d}else{this.options=$H(d);this._test=function(){return true}}this.error=b||"Validation failed.";
this.className=c},test:function(a,b){return(this._test(a,b)&&this.options.all(function(c){return Validator.methods[c.key]?Validator.methods[c.key](a,b,c.value):true
}))}};Validator.methods={pattern:function(a,c,b){return Validation.get("IsEmpty").test(a)||b.test(a)
},minLength:function(a,c,b){return a.length>=b},maxLength:function(a,c,b){return a.length<=b
},min:function(a,c,b){return a>=parseFloat(b)},max:function(a,c,b){return a<=parseFloat(b)
},notOneOf:function(a,c,b){return $A(b).all(function(d){return a!=d})},oneOf:function(a,c,b){return $A(b).any(function(d){return a==d
})},is:function(a,c,b){return a==b},isNot:function(a,c,b){return a!=b},equalToField:function(a,c,b){return a==$F(b)
},notEqualToField:function(a,c,b){return a!=$F(b)},include:function(a,c,b){return $A(b).all(function(d){return Validation.get(d).test(a,c)
})}};var Validation=Class.create();Validation.prototype={initialize:function(c,a){this.options=Object.extend({onSubmit:true,stopOnFirst:false,immediate:false,focusOnError:true,useTitles:false,onFormValidate:function(e,f){},onElementValidate:function(e,f){}},a||{});
this.form=$(c);if(this.options.onSubmit){Event.observe(this.form,"submit",this.onSubmit.bind(this),false)
}if(this.options.immediate){var b=this.options.useTitles;var d=this.options.onElementValidate;
Form.getElements(this.form).each(function(e){Event.observe(e,"blur",function(f){Validation.validate(Event.element(f),{useTitle:b,onElementValidate:d})
})})}},onSubmit:function(a){if(!this.validate()){Event.stop(a)}},validate:function(){var a=false;
var b=this.options.useTitles;var c=this.options.onElementValidate;if(this.options.stopOnFirst){a=Form.getElements(this.form).all(function(d){return Validation.validate(d,{useTitle:b,onElementValidate:c})
})}else{a=Form.getElements(this.form).collect(function(d){return Validation.validate(d,{useTitle:b,onElementValidate:c})
}).all()}if(!a&&this.options.focusOnError){Form.getElements(this.form).findAll(function(d){return $(d).hasClassName("validation-failed")
}).first().focus()}this.options.onFormValidate(a,this.form);return a},reset:function(){Form.getElements(this.form).each(Validation.reset)
}};Object.extend(Validation,{validate:function(c,a){a=Object.extend({useTitle:false,onElementValidate:function(d,e){}},a||{});
c=$(c);var b=c.classNames();return result=b.all(function(d){var e=Validation.test(d,c,a.useTitle);
a.onElementValidate(e,c);return e})},test:function(b,h,i){var j=Validation.get(b);
var a="__advice"+b.camelize();try{if(Validation.isVisible(h)&&!j.test($F(h),h)){if(!h[a]){var d=Validation.getAdvice(b,h);
if(d==null){var f=i?((h&&h.title)?h.title:j.error):j.error;d='<div class="validation-advice" id="advice-'+b+"-"+Validation.getElmID(h)+'" style="display:none">'+f+"</div>";
switch(h.type.toLowerCase()){case"checkbox":case"radio":var c=h.parentNode;if(c){new Insertion.Bottom(c,d)
}else{new Insertion.After(h,d)}break;default:new Insertion.After(h,d)}d=Validation.getAdvice(b,h)
}if(typeof Effect=="undefined"){d.style.display="block"}else{new Effect.Appear(d,{duration:1})
}}h[a]=true;h.removeClassName("validation-passed");h.addClassName("validation-failed");
return false}else{var d=Validation.getAdvice(b,h);if(d!=null){d.hide()}h[a]="";
h.removeClassName("validation-failed");h.addClassName("validation-passed");return true
}}catch(g){throw (g)}},isVisible:function(a){while(a.tagName!="BODY"){if(!$(a).visible()){return false
}a=a.parentNode}return true},getAdvice:function(a,b){return $("advice-"+a+"-"+Validation.getElmID(b))||$("advice-"+Validation.getElmID(b))
},getElmID:function(a){return a.id?a.id:a.name},reset:function(b){b=$(b);var a=b.classNames();
a.each(function(d){var e="__advice"+d.camelize();if(b[e]){var c=Validation.getAdvice(d,b);
c.hide();b[e]=""}b.removeClassName("validation-failed");b.removeClassName("validation-passed")
})},add:function(d,c,e,b){var a={};a[d]=new Validator(d,c,e,b);Object.extend(Validation.methods,a)
},addAllThese:function(a){var b={};$A(a).each(function(c){b[c[0]]=new Validator(c[0],c[1],c[2],(c.length>3?c[3]:{}))
});Object.extend(Validation.methods,b)},get:function(a){return Validation.methods[a]?Validation.methods[a]:Validation.methods._LikeNoIDIEverSaw_
},methods:{_LikeNoIDIEverSaw_:new Validator("_LikeNoIDIEverSaw_","",{})}});Validation.add("IsEmpty","",function(a){return((a==null)||(a.length==0)||(/^\s+$/.test(a)))
});Validation.addAllThese([["required","This is a required field.",function(a){return !Validation.get("IsEmpty").test(a)
}],["validate-number","Please enter a valid number in this field.",function(a){return Validation.get("IsEmpty").test(a)||(!isNaN(a)&&!/^\s+$/.test(a))
}],["validate-digits","Please use numbers only in this field. please avoid spaces or other characters such as dots or commas.",function(a){return Validation.get("IsEmpty").test(a)||!/[^\d]/.test(a)
}],["validate-alpha","Please use letters only (a-z) in this field.",function(a){return Validation.get("IsEmpty").test(a)||/^[a-zA-Z]+$/.test(a)
}],["validate-alphanum","Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.",function(a){return Validation.get("IsEmpty").test(a)||!/\W/.test(a)
}],["validate-date","Please enter a valid date.",function(a){var b=new Date(a);
return Validation.get("IsEmpty").test(a)||!isNaN(b)}],["validate-email","Valid email address required.  Example: steve@mac.com",function(a){return Validation.get("IsEmpty").test(a)||/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(a)
}],["validate-url","Please enter a valid URL.",function(a){return Validation.get("IsEmpty").test(a)||/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(a)
}],["validate-date-au","Please use this date format: dd/mm/yyyy. For example 17/03/2006 for the 17th of March, 2006.",function(a){if(Validation.get("IsEmpty").test(a)){return true
}var b=/^(\d{2})\/(\d{2})\/(\d{4})$/;if(!b.test(a)){return false}var c=new Date(a.replace(b,"$2/$1/$3"));
return(parseInt(RegExp.$2,10)==(1+c.getMonth()))&&(parseInt(RegExp.$1,10)==c.getDate())&&(parseInt(RegExp.$3,10)==c.getFullYear())
}],["validate-currency-dollar","Please enter a valid $ amount. For example $100.00 .",function(a){return Validation.get("IsEmpty").test(a)||/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(a)
}],["validate-selection","Please make a selection",function(a,b){return b.options?b.selectedIndex>0:!Validation.get("IsEmpty").test(a)
}],["validate-one-required","Please select one of the above options.",function(a,d){var c=d.parentNode;
var b=c.getElementsByTagName("INPUT");if(b.length==1){c=c.parentNode;b=c.getElementsByTagName("INPUT")
}return $A(b).any(function(e){return $F(e)})}]]);
