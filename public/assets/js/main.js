
webshims.setOptions('waitReady', false);
webshims.setOptions('forms-ext', { type: 'date' });
webshims.setOptions('forms-ext', { type: 'time' });
webshims.polyfill('forms forms-ext');

(function () {

	'use strict';

	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};

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

	var parallax = function () {
		if (!isiPad() || !isiPhone()) {
			$(window).stellar();
		}
	};
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

		$('.js-nsg-taxi-nav-toggle').on('click', function () {

			if ($('body').hasClass('nsg-taxi-offcanvas')) {
				$('body').removeClass('nsg-taxi-offcanvas');
			} else {
				$('body').addClass('nsg-taxi-offcanvas');
			}
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

	$(function () {
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});
}());

var arr = document.querySelectorAll(".feature-copy p");
const new_arr = [];

for (let i = 0; i < arr.length; i++) {
	temp = arr[i];
	new_arr.push(temp.toString().slice(0, -10));
}

$(".js-example-matcher").select2({});

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

// Slider Start
jssor_1_slider_init = function () {
	var jssor_1_options = {
		$AutoPlay: 1,
		$Idle: 0,
		$SlideDuration: 5000,
		$SlideEasing: $Jease$.$Linear,
		$PauseOnHover: 4,
		$SlideWidth: 140,
		$Align: 0
	};
	var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
	var MAX_WIDTH = 980;
	function ScaleSlider() {
		var containerElement = jssor_1_slider.$Elmt.parentNode;
		var containerWidth = containerElement.clientWidth;
		if (containerWidth) {
			var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
			jssor_1_slider.$ScaleWidth(expectedWidth);
		}
		else {
			window.setTimeout(ScaleSlider, 30);
		}
	}
	ScaleSlider();
	$Jssor$.$AddEvent(window, "load", ScaleSlider);
	$Jssor$.$AddEvent(window, "resize", ScaleSlider);
	$Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
};
jssor_1_slider_init();
// Slider End