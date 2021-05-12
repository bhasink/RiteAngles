(function ( $ ) {
	window.InlineShortcodeView_ld_images_comparison = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_images_comparison.__super__.render.call( this );
			var $element = this.$el.find('.cd-image-container');
			vc.frame_window.vc_iframe.addActivity( function () {
				$element.liquidImageComparison();
			} );
			return this;
		}
	} );
})( window.jQuery );