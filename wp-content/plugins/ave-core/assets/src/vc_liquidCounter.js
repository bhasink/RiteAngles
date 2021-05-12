(function ( $ ) {
	window.InlineShortcodeView_ld_counter = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_counter.__super__.render.call( this );
			var $element = this.$el.find('[data-enable-counter]');
			vc.frame_window.vc_iframe.addActivity( function () {
			this.vc_iframe.liquidCounter = $element.liquidCounter();
			} );
			return this;
		}
	} );
})( window.jQuery );