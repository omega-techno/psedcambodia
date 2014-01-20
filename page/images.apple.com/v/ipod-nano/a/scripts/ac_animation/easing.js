var easingFunction={linear:function(e,a,g,f){return g*e/f+a},easeInQuad:function(e,a,g,f){return g*(e/=f)*e+a},easeOutQuad:function(e,a,g,f){return -g*(e/=f)*(e-2)+a},easeInOutQuad:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e+a}return -g/2*((--e)*(e-2)-1)+a},easeInCubic:function(e,a,g,f){return g*(e/=f)*e*e+a},easeOutCubic:function(e,a,g,f){return g*((e=e/f-1)*e*e+1)+a},easeInOutCubic:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e+a}return g/2*((e-=2)*e*e+2)+a},easeInQuart:function(e,a,g,f){return g*(e/=f)*e*e*e+a},easeOutQuart:function(e,a,g,f){return -g*((e=e/f-1)*e*e*e-1)+a},easeInOutQuart:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e*e+a}return -g/2*((e-=2)*e*e*e-2)+a},easeInQuint:function(e,a,g,f){return g*(e/=f)*e*e*e*e+a},easeOutQuint:function(e,a,g,f){return g*((e=e/f-1)*e*e*e*e+1)+a},easeInOutQuint:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e*e*e+a}return g/2*((e-=2)*e*e*e*e+2)+a},easeInSine:function(e,a,g,f){return -g*Math.cos(e/f*(Math.PI/2))+g+a},easeOutSine:function(e,a,g,f){return g*Math.sin(e/f*(Math.PI/2))+a},easeInOutSine:function(e,a,g,f){return -g/2*(Math.cos(Math.PI*e/f)-1)+a},easeInExpo:function(e,a,g,f){return(e==0)?a:g*Math.pow(2,10*(e/f-1))+a},easeOutExpo:function(e,a,g,f){return(e==f)?a+g:g*(-Math.pow(2,-10*e/f)+1)+a},easeInOutExpo:function(e,a,g,f){if(e==0){return a}if(e==f){return a+g}if((e/=f/2)<1){return g/2*Math.pow(2,10*(e-1))+a}return g/2*(-Math.pow(2,-10*--e)+2)+a},easeInCirc:function(e,a,g,f){return -g*(Math.sqrt(1-(e/=f)*e)-1)+a},easeOutCirc:function(e,a,g,f){return g*Math.sqrt(1-(e=e/f-1)*e)+a},easeInOutCirc:function(e,a,g,f){if((e/=f/2)<1){return -g/2*(Math.sqrt(1-e*e)-1)+a}return g/2*(Math.sqrt(1-(e-=2)*e)+1)+a},easeInElastic:function(g,e,k,j){var h=1.70158;var i=0;var f=k;if(g==0){return e}if((g/=j)==1){return e+k}if(!i){i=j*0.3}if(f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}return -(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e},easeOutElastic:function(g,e,k,j){var h=1.70158;var i=0;var f=k;if(g==0){return e}if((g/=j)==1){return e+k}if(!i){i=j*0.3}if(f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}return f*Math.pow(2,-10*g)*Math.sin((g*j-h)*(2*Math.PI)/i)+k+e},easeInOutElastic:function(g,e,k,j){var h=1.70158;var i=0;var f=k;if(g==0){return e}if((g/=j/2)==2){return e+k}if(!i){i=j*(0.3*1.5)}if(f<Math.abs(k)){f=k;var h=i/4}else{var h=i/(2*Math.PI)*Math.asin(k/f)}if(g<1){return -0.5*(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e}return f*Math.pow(2,-10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i)*0.5+k+e},easeInBack:function(e,a,h,g,f){if(f==undefined){f=1.70158}return h*(e/=g)*e*((f+1)*e-f)+a},easeOutBack:function(e,a,h,g,f){if(f==undefined){f=1.70158}return h*((e=e/g-1)*e*((f+1)*e+f)+1)+a},easeInOutBack:function(e,a,h,g,f){if(f==undefined){f=1.70158}if((e/=g/2)<1){return h/2*(e*e*(((f*=(1.525))+1)*e-f))+a}return h/2*((e-=2)*e*(((f*=(1.525))+1)*e+f)+2)+a},easeInBounce:function(e,a,g,f){return g-easingFunction.easeOutBounce(f-e,0,g,f)+a},easeOutBounce:function(e,a,g,f){if((e/=f)<(1/2.75)){return g*(7.5625*e*e)+a}else{if(e<(2/2.75)){return g*(7.5625*(e-=(1.5/2.75))*e+0.75)+a}else{if(e<(2.5/2.75)){return g*(7.5625*(e-=(2.25/2.75))*e+0.9375)+a}else{return g*(7.5625*(e-=(2.625/2.75))*e+0.984375)+a}}}},easeInOutBounce:function(e,a,g,f){if(e<f/2){return easingFunction.easeInBounce(e*2,0,g,f)*0.5+a}return easingFunction.easeOutBounce(e*2-f,0,g,f)*0.5+g*0.5+a}};
