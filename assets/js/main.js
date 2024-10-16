/* ------------------------------------------------
	COMMON SCRIPTS FOR TEMPLATE
------------------------------------------------ */

/*
_________________________________________________

	Stories - HTML5 Personal Blog CSS Grid Layout Template
	Version: 1.0 (created - 29.06.2019)
	Created By: Nina Papchenya
	Support: ninapapchenya@gmail.com
_________________________________________________
	
	
--- Table of Contents ---

	1.0 Initialization
	
	2.0 Search form 
	
	3.0 Back to top on long page 
	
	4.0 Sliders
	
	5.0 Two-level main menu

--- End - Table of Contents ---	
*/

(function($) {
	'use strict';

/* --------------------------------------------------
	1.0 Initialization
-------------------------------------------------- */
	
	// Initialize all functions when the document is ready
	$(document).ready(function(){
		
		// Initialization Sliders
		initSliders();
		
		// DropDown for Two-level Main Menu
		mLvlMenuOnClick();
		
		// DropDown menu panel on mobile devices
		$('#mobile-menu-opener').on('click touchstart', function(e){
			e.preventDefault();
			
			if (!$('#main-nav').hasClass('slideUp')) {
				$('#main-nav').addClass('slideUp');
			} 
			
			$('#main-nav').toggleClass('slideDown');
			$(this).toggleClass('menu-open');
		});
		
		$(window).resize(function() {
			if ($(window).width() > 769) {
				if ($('#main-nav').hasClass('slideUp')) {
					$('#main-nav').removeClass('slideUp');
				} 
				
				if ($('#main-nav').hasClass('slideDown')) {
					$('#main-nav').removeClass('slideDown');
					$('#mobile-menu-opener').removeClass('menu-open');
				} 
			}
		});
		
		// DropDown panel with post list filter
		$('#open-post-filter').on('click touchstart', function(e){
			e.preventDefault();
			$('#post-filter').toggleClass('post-filter-slideDown');
			$(this).toggleClass('post-filter-opened');
		});
		
		// Search collapsing 
		initSearchForm();
		
		// Back to top on long page
		backToTop();
			
	});
	
	// Initialize functions after elements are loaded
	$(window).on('load', function(){
		
		//Site Preloader
		$('#preloader .ctn-preloader').fadeOut(); 	
		$('#preloader').delay(350).fadeOut('slow');
	});
	
/* --------------------------------------------------
	2.0 Search form 
-------------------------------------------------- */

	function initSearchForm(){
		var sForm = $('.search-form');
		var sFormOpenBtn = sForm.find('.search-opener');
		var sFormCloseBtn = sForm.find('.search-shutter');
		var sQuery = sForm.find('.search-text');
		var isOpen = false; 
		
		sFormOpenBtn.on('click touchstart', function(e){
			if (isOpen) {
				e.preventDefault();
				closeForm();
			} else {
				e.preventDefault();
				openForm();
			}
		});
		
		sFormCloseBtn.on('click touchstart', function(){
			if (isOpen) {
				closeForm();
				sQuery.val('');
			}
		});
		
		sForm.find('form').on('submit', function(){
			if (sQuery.val().trim() === "") {
				sQuery.attr('placeholder','Enter search text...');
				return false;
			}
		});
		
		var body = document.querySelector('body');
		
		var bodyEv = function(e) {
			var target = $(e.target);
			
			if (!target.closest(sFormOpenBtn).length) {
				if (isOpen && sForm.find(target).length !==1 && sQuery.val().trim().length <= 0) {	
					closeForm();
				}
			}
		};
				
		function openForm() { //open it
			sForm.addClass('search-form-open');
			sFormOpenBtn.addClass('search-opener-hide');
			sQuery.focus();
			isOpen = true;
			
			body.addEventListener('click', bodyEv);
			body.addEventListener('touchstart', bodyEv);
		}	
		
		function closeForm() { //close it
			sForm.removeClass('search-form-open');
			sFormOpenBtn.removeClass('search-opener-hide');
			sQuery.blur();
			isOpen = false;
			
			body.removeEventListener('click', bodyEv);
			body.removeEventListener('touchstart', bodyEv);
		}
	}

/* --------------------------------------------------
	3.0 Back to top on long page 
-------------------------------------------------- */
	
	function backToTop() {
		var backBtn = $('#back-to-top');
		
		backBtn.hide();
		
		$(window).scroll(function(){
			if ($(this).scrollTop() > 600) {
				backBtn.fadeIn();
			} else {
				backBtn.fadeOut();
			}
		});
		
		backBtn.on('click', function(){
			$('html, body').animate({ scrollTop: 0 }, 800);
			return false;
		});
	}
	
/* --------------------------------------------------
	4.0 Sliders 
-------------------------------------------------- */

	function initSliders() {
		var aSlider = $('.slider .slider-content');
		
		aSlider.bxSlider({
			mode: 'fade',
			nextText: '&rsaquo;',
			prevText: '&lsaquo;',
			pager: false,
			touchEnabled: false, 
			onSliderLoad: function() {
				$(this).parent('.bx-viewport').after('<div class="pager"><span class="curr-item">'+viewOfNumber(this.getCurrentSlide()+1)+'</span>'+viewOfNumber(this.getSlideCount())+'</div>');
				
				$(this).parents('.slider').css('visibility', 'visible');
			},
			onSlideAfter: function($slideElement, oldIndex, newIndex) {
				$(this).parent('.bx-viewport').next('.pager').find('.curr-item').text(viewOfNumber(newIndex+1));
			}
		});
	}
	
	function viewOfNumber(n) {
        return (n < 10 ? "0" : "") + n;
	}
	
/* --------------------------------------------------
	5.0 Two-level main menu
-------------------------------------------------- */	

	function mLvlMenuOnHover() { //onHover
		var mMenu = $('#main-menu .main-menu-content');
						
		var openSubmenu = function($link, submenu) {
			$link.addClass('active-has-sbm');
			var submHeight = submenu.prop('scrollHeight');
			submenu.addClass('submenu-open').css('height', submHeight);
		}
			
		var closeSubmenu = function($link, submenu) {
			$link.removeClass('active-has-sbm');
			submenu.removeClass('submenu-open').css('height', 0);
		}
		
		mMenu.children('.has-submenu').on('mouseenter touchstart', function(e){
			e.preventDefault();
				
			var thisLink = $(this);
			var thisSubmenu = $(this).find('.submenu');
			openSubmenu(thisLink, thisSubmenu);
		});
		
		mMenu.children('.has-submenu').on('mouseleave touchend', function(e){
			e.preventDefault();
					
			var thisLink = $(this);
			var thisSubmenu = $(this).find('.submenu');
			closeSubmenu(thisLink, thisSubmenu);
		}); 
	}
	
	function mLvlMenuOnClick() { //onClick
		var mMenu = $('#main-menu .main-menu-content');
		var menuOpen = false; 
		
		var body = document.querySelector('body');

		var bodyEv = function(e) {
			var target = $(e.target);
			
			if(!target.closest('.main-nav').length) {
				if ( menuOpen ) { closeSubmenu($('.active-has-sbm'), $('.submenu-open')); }
			}
		};
		
		var openSubmenu = function($link, submenu) {
			$link.addClass('active-has-sbm');
			var submHeight = submenu.prop('scrollHeight');
			submenu.addClass('submenu-open').css('height', submHeight);
			menuOpen = true;
			
			body.addEventListener('click', bodyEv);
			body.addEventListener('touchstart', bodyEv);
		}
			
		var closeSubmenu = function($link, submenu) {
			$link.removeClass('active-has-sbm');
			submenu.removeClass('submenu-open').css('height', 0);
			menuOpen = false;
			
			body.removeEventListener('click', bodyEv);
			body.removeEventListener('touchstart', bodyEv);	
		}
				
		mMenu.children('.has-submenu').on('click touchstart', function(e){
			var thisLink = $(this);
			var thisSubmenu = $(this).find('.submenu');
			var theSame = false;
			
			if (mMenu.find('.active-has-sbm').length > 0) 
			{ 
				if (thisLink.length == $('.active-has-sbm').length && thisLink.length == thisLink.filter($('.active-has-sbm')).length) { 
					theSame = true; 
				}
			}

			if (theSame) { 
				closeSubmenu(thisLink, thisSubmenu); 
			} else {
				closeSubmenu($('.active-has-sbm'), $('.submenu-open'));
				openSubmenu(thisLink, thisSubmenu);
			} 	
			
		});
	}
	
})(jQuery);