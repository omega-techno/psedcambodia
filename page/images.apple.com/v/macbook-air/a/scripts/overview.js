(function( global, AC, $$ ) {
	"use strict";

	AC.AutoGallery.addSlideshowType(
		'mba-hero',
		// options
		{
			autoplay: 1000,
			stopAfterReturnToSection: 0,
			discontinuousPreviousNext: false
		},

		Prototype.emptyFunction,

		'hero'
	);

	AC.AutoGallery.addType(
		// name
		'slide-and-fade',

		// options
		{
			continuous:true,
			autoplay: 400,
			delay: 400
		},

		// qualifier
		Prototype.emptyFunction,

		// parentTypeName
		'slide',

		// context
		{
			viewer: AC.ViewMaster.SlideViewer,
			delegate: {
				isIE: AC.Detector.isIEStrict(),
				duration: 0.3,
				willShow: function (sender, outgoingView, incomingView) {
					// stops willshow from running on iOS - no need for willshow on iOS as the gallery is masked by static viewport dimensions, but on desktop the viewport width can vary.
					if (AC.Detector.isMobile() || AC.Detector.isiPad()) {
						return;
					}

					// assuming opacity is 0 on incoming do to didShow
					incomingView.content.setStyle('visibility:visible;');

					var self = this;
					window.setTimeout(function () {
						//setting opacity transition for IE - needed to be set seperately from mondern browsers as IE can't use css transitions
						if (self.isIE) {
							new Effect.Opacity(outgoingView.content, {
								from: 1.0,
								to: 0.0,
								duration: self.duration,
								afterFinish: function(){
									outgoingView.content.setStyle('opacity:0;');
								}
							});

							new Effect.Opacity(incomingView.content, {
								from: 0.0,
								to: 1.0,
								duration: self.duration,
								afterFinish: function() { 
									incomingView.content.setStyle('opacity:1;');
								}
							});

						//setting opacity for modern browsers
						} else {
							incomingView.content.setStyle('opacity:1;');
							outgoingView.content.setStyle('opacity:0;');
						}
					}, 0);
				},

				didShow: function (sender, outgoingView, incomingView) {
					// stops didshow from running on iOS - no need for didshow on iOS as the gallery is masked by static viewport dimensions, but on desktop the viewport width can vary.
					if (AC.Detector.isMobile() || AC.Detector.isiPad()) {
						return;
					}

					// fixes "page too wide" issue in IE. Without this the page will become as wide as the entire gallery in IE.
					if (this.isIE) {
						Element.setStyle(document.documentElement, 'overflow-x:hidden;');
					}

					// If there is no outgoingView, then this didShow is on initialize
					if (outgoingView === null) {
						var i;
						for (i = 0; i < sender.orderedSections.length; i++) {
							var section = sender.sectionWithId(sender.orderedSections[i]);
							
							//sets opacity and visibility for all but current section
							if (sender.currentSection !== section) {
								section.content.setStyle('opacity:0;');
								section.content.setStyle('visibility:hidden;');
							}
							
							//sets opacity transition on all browsers but IE. Not set for IE because it can't use css transitions.
							if (!this.isIE) {
								section.content.setVendorPrefixStyle('transition', 'opacity ' + this.duration + 's');
							}
						}
					} else {
						outgoingView.content.setStyle('visibility:hidden;');
					}
				}
			}
		}

	);

	AC.onDOMReady( function() {
		// Battery Row
		// create a clock for the 11inch MacBook Air
		var clock11inch = new AC.BatteryClock('clock-wrapper-1', $('clock-wrapper-1'), {
			angleHours: 124,
			angleMinutes: 1080,
			duration: 2,
			initialMinutes: 0,
			initialHours: 146,
			backgroundAngleHours: 270,
			fillStyle: '#80e869',
			animatedFillStyle: "#5bcc41"
		});

		// create a clock for the 13inch MacBook Air
		var clock13inch = new AC.BatteryClock('clock-wrapper-2', $('clock-wrapper-2'), {
			angleHours: 150,
			angleMinutes: 1080,
			duration: 2,
			initialMinutes: 0,
			initialHours: 210,
			backgroundAngleHours: 360,
			fillStyle: '#80e869',
			animatedFillStyle: "#5bcc41"
		});

		// handle if ipad is retina
		if (AC.Environment.Browser.name === 'Safari Mobile' && AC.Environment.Feature.isRetina()) {
			(function timingManager(){
				var clockSuccessCount = 0;
				var heroGallery = AC.AutoGallery.galleries['hero-gallery'];
				var heroSlideShow = AC.AutoGallery.slideshows['hero-gallery'];

				// get hero gallery/slideshow and add showonScroll support.
				heroGallery._showOnScroll = new AC.ShowOnScroll(heroGallery.__wrapper);

				var allContinue = function() {
					clockSuccessCount += 1;
					if (clockSuccessCount === 2) {
						heroGallery.showNext();
						heroSlideShow.start();
					}
				};

				// select for viewport conditions
				if (clock11inch._showOnScroll.isInView() && clock13inch._showOnScroll.isInView() && heroGallery._showOnScroll.isInView()) {
					heroSlideShow.stop();
					AC.NotificationCenter.subscribe('clock-animation-complete', allContinue, clock11inch);
					AC.NotificationCenter.subscribe('clock-animation-complete', allContinue, clock13inch);
				}
			}());
		}


		// Wifi Row
		(function wifiInit() {

			var designGallery;
			var designGalleryWrapper = AC.Element.getElementById('wifi-beams');

			AC.Element.addClassName( designGalleryWrapper, AC.Environment.Browser.name.toLowerCase() );

			designGallery = new AC.Ambient.Scroll(designGalleryWrapper, {
				classNamePrefix: 'beams-',
				playOnVisitorEngaged: true
			});

			designGallery.setDelegate({
				canPlay: function (self) {
					return (AC.Environment.Feature.threeDTransformsAvailable() === true || typeof (document.body.style.MozPerspective) !== 'undefined') && AC.Environment.Feature.isCSSAvailable('transform') && AC.Environment.Feature.isCSSAvailable('transition');
				},

				play: function (self) {
					designGallery.didPlay();
				}
			});
		}());
	});
}(this, AC, $$));

