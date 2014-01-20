AC.ShowOnScroll=AC.Class();AC.ShowOnScroll.prototype={__defaultOptions:{threshold:0.5,timeInView:1,scrollEndDelay:0.4},initialize:function ac_initialize(b,a){if(typeof a!=="object"){a={}}this._options=AC.Object.extend(AC.Object.clone(this.__defaultOptions),a);if(AC.Environment.Browser.os==="iOS"){this._options.scrollEndDelay=0}this._element=AC.Element.getElementById(b);this._delegate={};this.startObserving();AC.Object.synthesize(this)},startObserving:function ac_startObserving(){if(typeof this.__boundOnScroll==="undefined"){this.__boundOnScroll=AC.Function.bindAsEventListener(this.__onScroll,this)}if(typeof this.__boundRefreshMetrics==="undefined"){this.__boundRefreshMetrics=AC.Function.bindAsEventListener(this.refreshMetrics,this)}if(typeof this.__boundWindowLoad==="undefined"){this.__boundWindowLoad=AC.Function.bindAsEventListener(this.__onWindowLoad,this)}if(this._isObserving!==true){AC.Element.addEventListener(window,"scroll",this.__boundOnScroll);AC.Element.addEventListener(window,"load",this.__boundWindowLoad);AC.Element.addEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.addEventListener(window,"orientationchange",this.__boundRefreshMetrics);this._isObserving=true}},stopObserving:function ac_stopObserving(){if(this._isObserving===true){AC.Element.removeEventListener(window,"scroll",this.__boundOnScroll);AC.Element.removeEventListener(window,"resize",this.__boundRefreshMetrics);AC.Element.removeEventListener(window,"orientationchange",this.__boundRefreshMetrics);this._isObserving=false}},setDelegate:function ac_setDelegate(a){if(typeof a==="object"){this._delegate=a}},refreshMetrics:function ac_refreshMetrics(){delete this._viewportMetrics;delete this._elementMetrics;this._viewportMetrics=this.viewportMetrics();this._elementMetrics=this.elementMetrics()},isInView:function ac_isInView(a){if(typeof a==="undefined"){a=this.pixelsInView()}return(a>0)},isEnoughInView:function ac_isEnoughInView(a){if(typeof a==="undefined"){a=this.percentInView()}return(a===0)?false:(a>=this._options.threshold)},viewportMetrics:function ac_viewportMetrics(){if(typeof this._viewportMetrics==="undefined"){this._viewportMetrics={};this._viewportMetrics.height=window.innerHeight||document.documentElement.clientHeight;AC.Object.synthesize(this)}return this._viewportMetrics},elementMetrics:function ac_elementMetrics(){if(typeof this._elementMetrics==="undefined"){this._elementMetrics={};this._elementMetrics.height=this._element.offsetHeight;this._elementMetrics.offsetY=AC.Element.cumulativeOffset(this._element).top;AC.Object.synthesize(this)}return this._elementMetrics},pixelsInView:function ac_pixelsInView(){var c;var d=this.viewportMetrics();var b=this.elementMetrics();var a=this.elementViewportOffsetY();if(a>=0){c=d.height-a;if(c>b.height){c=b.height}}else{c=b.height+a}if(c<0){c=0}return(this._pixelsInView=c)},percentInView:function ac_percentInView(b){var c=this.viewportMetrics();var a=this.elementMetrics();if(typeof b!=="number"){b=this.pixelsInView()}this._percentInView=(b===0)?0:(b/a.height);return this._percentInView},percentTravelled:function ac_percentTravelled(c){var d=this.viewportMetrics();var b=this.elementMetrics();var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;var e=d.height+b.height;this._percentTravelled=1-(((b.height+b.offsetY)-a)/e);return this._percentTravelled},elementViewportOffsetY:function ac_elementViewportOffsetY(){var b=this.elementMetrics();var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;return b.offsetY-a}};AC.Object.extend(AC.ShowOnScroll.prototype,{__onScroll:function ac___onScroll(){var d=this._percentInView;var c=(typeof d==="undefined");var e=this.pixelsInView();var b=this.percentInView(e);var a=this.percentTravelled(e);if(this.isInView(e)&&(d===0||c)){if(typeof this._delegate.scrolledIntoView==="function"){this._delegate.scrolledIntoView(this._element)}}if((b===0&&d>0)&&!c){if(typeof this._delegate.scrolledOutOfView==="function"){this._delegate.scrolledOutOfView(this._element)}}if(b===1&&(d<1||c)){if(typeof this._delegate.scrolledIntoViewCompletely==="function"){this._delegate.scrolledIntoViewCompletely(this._element,e)}}if((b<1&&d===1)&&!c){if(typeof this._delegate.scrolledOutOfViewCompletely==="function"){this._delegate.scrolledOutOfViewCompletely(this._element,e,a)}}if(this.__hasChangedInViewPastThresholdStatus(d,b)){if(this.isEnoughInView(b)){this.__scrolledIntoViewPastThreshold()}else{if(!c){this.__scrolledOutOfViewPastThreshold()}}}if(this.isInView(e)){if(typeof this._delegate.scrolledWhileInView==="function"){this._delegate.scrolledWhileInView(this._element,e,a)}}if(!c){this.__resetOnScrollEndTimer()}},__onWindowLoad:function ac___onWindowLoad(){var a=this;window.setTimeout(function(){a.__onScroll.call(a)},500)},__onScrollEnd:function ac___onScrollEnd(){delete this.__onScrollEndTimer;this.refreshMetrics();if(typeof this._delegate.scrollEnd==="function"){this._delegate.scrollEnd(this._element,this._pixelsInView,this._percentTravelled)}},__scrolledIntoViewPastThreshold:function ac___scrolledIntoViewPastThreshold(){this.__startTimeInViewTimer();if(typeof this._delegate.scrolledIntoViewPastThreshold==="function"){this._delegate.scrolledIntoViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)}},__scrolledOutOfViewPastThreshold:function ac___scrolledOutOfViewPastThreshold(){this.__cancelTimeInViewTimer();if(typeof this._delegate.scrolledOutOfViewPastThreshold==="function"){this._delegate.scrolledOutOfViewPastThreshold(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)}},__visitorEngaged:function ac___visitorEngaged(){if(typeof this._delegate.visitorEngaged==="function"){this._delegate.visitorEngaged(this._element,this._pixelsInView,this._percentTravelled,this._options.threshold)}delete this.__timeInViewTimerId},__hasChangedInViewPastThresholdStatus:function ac___hasChangedInViewPastThresholdStatus(b,a){if(((this.isEnoughInView(a))&&(!this.isEnoughInView(b)))||((!this.isEnoughInView(a))&&(this.isEnoughInView(b)))||(typeof b==="undefined")){return true}else{return false}},__cancelTimeInViewTimer:function ac___cancelTimeInViewTimer(){if(typeof this.__timeInViewTimerId!=="undefined"){window.clearTimeout(this.__timeInViewTimerId);delete this.__timeInViewTimerId}},__startTimeInViewTimer:function ac___startTimeInViewTimer(){this.__cancelTimeInViewTimer();if(typeof this.__boundVisitorEngaged==="undefined"){this.__boundVisitorEngaged=this.__visitorEngaged.bind(this)}this.__timeInViewTimerId=window.setTimeout(this.__boundVisitorEngaged,(this._options.timeInView*1000))},__resetOnScrollEndTimer:function ac___resetOnScrollEndTimer(){window.clearTimeout(this.__onScrollEndTimer);if(typeof this.__boundOnScrollEnd==="undefined"){this.__boundOnScrollEnd=this.__onScrollEnd.bind(this)}this.__onScrollEndTimer=window.setTimeout(this.__boundOnScrollEnd,this._options.scrollEndDelay*1000)}});AC.ShowOnScroll.version="2.1";
