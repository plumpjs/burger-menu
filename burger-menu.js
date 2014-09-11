// exports BurgerMenu

var BurgerMenu = new Class({
	
	Implements : Options,
	
	options : {
		maxWidth : 567,
		toggleSelector : '.mobileNav'
	},
	
	open : true,
	
	initialize: function(el, options) {
		this.el = $(el);
		this.setOptions(options);
		
		this.togglerEl = this.el.getElement(this.options.toggleSelector);
		this.togglerEl.addEvent('click', this.toggle.bind(this));
		
		if (window.matchMedia) {
			
			this.match = window.matchMedia('(max-width: ' + this.options.maxWidth + 'px)');
			this.match.addListener(this.onResize.bind(this));
			this.onResize(); //initial
		}
	},
	
	onResize: function() {
		
		this.calculateHeight();
		
		if (this.match.matches) {
			this.el.setStyle('height', 0);
			this.togglerEl.removeClass('open');
			this.open = false;
		} else {
			this.el.setStyle('height', 'auto');
		}
	},
	
	toggle: function(el) {
		if (this.open) {
			this.el.tween('height', 0);
			this.togglerEl.removeClass('open');
		} else {
			this.el.tween('height', this.height);
			this.togglerEl.addClass('open');
		}
		this.open = !this.open;
	},
	
	calculateHeight: function() {
		this.height = this.el.getSize().y;
	}
	
});