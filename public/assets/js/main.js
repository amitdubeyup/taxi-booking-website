
webshims.setOptions('waitReady', false);
webshims.setOptions('forms-ext', { type: 'date' });
webshims.setOptions('forms-ext', { type: 'time' });
webshims.polyfill('forms forms-ext');

(function () {

	'use strict';



	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

	// Main Menu Superfish
	var mainMenu = function () {

		$('#nsg-taxi-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function () {
		if (!isiPad() || !isiPhone()) {
			$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function () {

		var $clone = $('#nsg-taxi-menu-wrap').clone();
		$clone.attr({
			'id': 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class': '',
			'id': ''
		});

		$('#nsg-taxi-page').prepend($clone);

		// click the burger
		$('.js-nsg-taxi-nav-toggle').on('click', function () {

			if ($('body').hasClass('nsg-taxi-offcanvas')) {
				$('body').removeClass('nsg-taxi-offcanvas');
			} else {
				$('body').addClass('nsg-taxi-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function () {
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if (w.width() > 769) {
				if ($('body').hasClass('nsg-taxi-offcanvas')) {
					$('body').removeClass('nsg-taxi-offcanvas');
				}
			}

		});

	}



	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var container = $("#offcanvas-menu, .js-nsg-taxi-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('nsg-taxi-offcanvas')) {
					$('body').removeClass('nsg-taxi-offcanvas');
				}
			}
		});
	};


	// Animations

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });
	};

	var stickyBanner = function () {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
			sticky = new Waypoint.Sticky({
				element: $stickyElement[0],
				offset: 0
			})
		}
	};

	// Document on load.
	$(function () {
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});


}());
