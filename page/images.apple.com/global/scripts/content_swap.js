/**
* This script swaps content based on classes.  This script adds the 'active' class 
* to selectors and content sections.  Be sure to have the appropriate CSS for
* the 'active' class. Call this script with a selector class and a content class.  
* For example:
* var myContentSwap = new AC.ContentSwap('selectors', 'targets', 'click');
*
* Note: The selectors and content sections must be in the same order.  The first
*       selector will swap the content to the first content section.
*
* @author: stephanie trimble
*
*/                      

if (typeof(AC) == "undefined") { AC = {}; }

AC.ContentSwap = Class.create();
AC.ContentSwap.prototype = {

	selectorList: null,
	contentList: null,
	contentSelectorHash: null,
	eventStr: null,

	initialize: function(selectorClass, contentClass, eventStr, options) {
	
		this.eventStr = eventStr;
		this.options = options || {};
		
		// get lists of selectors and content in order
		this.selectorList = document.getElementsByClassName(selectorClass);
		this.contentList = document.getElementsByClassName(contentClass);
		
		this.setMouseover();
	},
	
	setMouseover: function() {
		for(var i=this.selectorList.length-1; i >= 0; i--) {
			Event.observe(this.selectorList[i], this.eventStr, this.swapContent.bind(this, i), false);
		}
	},
	
	swapContent: function(selectorIndex) {
		var selector = this.selectorList[selectorIndex];
		var content = this.contentList[selectorIndex];
		
		// add 'on' class
		if(!Element.hasClassName(selector, 'active')) Element.addClassName(selector, 'active');
		if(!Element.hasClassName(content, 'active')) Element.addClassName(content, 'active');

		// remove 'on' class from all other selectors and content areas
		for(var i=this.selectorList.length-1; i >= 0; i--) {
			if(i != selectorIndex) {
				if(Element.hasClassName(this.selectorList[i], 'active')) Element.removeClassName(this.selectorList[i], 'active');
				if(Element.hasClassName(this.contentList[i], 'active')) Element.removeClassName(this.contentList[i], 'active');
			}
		}
		
		if (typeof(this.options.onSwap) == 'function') {
			this.options.onSwap(selector, content);
		}
		
		return false;
	}
}
