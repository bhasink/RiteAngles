(function ( $ ) {
	window.InlineShortcodeViewld_blog = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeViewld_blog.__super__.render.call( this );

			var $carousel = this.$el.find('[data-liquid-carousel]');
			var $responsiveBg = this.$el.find('[data-responsive-bg=true]');
			// var $masonry = this.$el.find('[data-liquid-masonry]');

			vc.frame_window.vc_iframe.addActivity( function () {

				this.vc_iframe.liquidCarousel = this.vc_iframe.liquidCarousel || [];
				this.vc_iframe.liquidResponsiveBg = this.vc_iframe.liquidResponsiveBg || [];
				// this.vc_iframe.liquidMasonry = this.vc_iframe.liquidMasonry || [];

				this.vc_iframe.liquidCarousel[this.vc_iframe.liquidCarousel.length] = $carousel.liquidCarousel();
				this.vc_iframe.liquidResponsiveBg[this.vc_iframe.liquidResponsiveBg.length] = $responsiveBg.liquidResponsiveBG();
				// this.vc_iframe.liquidMasonry[this.vc_iframe.liquidMasonry.length] = $masonry.liquidMasonry();
				
			} );
			return this;
		}
	} );
})( window.jQuery );