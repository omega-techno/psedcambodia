(function (container) {
	'use strict';
	var promos;
	var mousedown;
	var i;

	if (typeof AC !== 'object' ||
		typeof AC.Tracking !== 'object' ||
		typeof AC.Tracking.pageName !== 'function' ||
		typeof AC.Tracking.trackClick !== 'function' ||
		typeof Element.select !== 'function' ||
		typeof Element.up !== 'function' ||
		typeof Element.previous !== 'function' ||
		typeof Event.findElement !== 'function' ||
		typeof Event.observe !== 'function') {
		return false;
	}

	promos = AC.Element.selectAll('a', container);
	
	if (promos) {
		mousedown = function (evt) {
			var promo, category, name;
			promo = evt.findElement('a');
			category = promo.up('div').previous('h4');
			if (promo && category) {
				name = AC.Tracking.pageName() + ' - ' + category.innerHTML + ' - itunes this week';
				AC.Tracking.trackClick({ prop3: name }, this, 'o', name);
			}
		};

		for (i = promos.length - 1; i >= 0; i -= 1) {
			if (!promos[i].className.match('arrow')) {
				Event.observe(promos[i], 'mousedown', mousedown);
			}
		}
	}

}(AC.Element.select('#itunes-gallery')));
