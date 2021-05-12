(function ( $ ) {
	window.InlineShortcodeView_ld_countdown = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_countdown.__super__.render.call( this );
			var $element = this.$el.find('[data-plugin-countdown=true]');
			vc.frame_window.vc_iframe.addActivity( function () {
			this.vc_iframe.liquidCountdown = $element.liquidCountdown();
			} );
			return this;
		}
	} );
})( window.jQuery );