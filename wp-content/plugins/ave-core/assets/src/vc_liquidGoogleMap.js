(function ( $ ) {
	window.InlineShortcodeView_ld_google_map = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_google_map.__super__.render.call( this );
			var $element = this.$el.find('[data-plugin-map]');
			vc.frame_window.vc_iframe.addActivity( function () {
				if ( typeof google !== typeof undefined && google !== null ) {
					this.vc_iframe.liquidMap = $element.liquidMap();
				}
			} );
			return this;
		}
	} );
})( window.jQuery );