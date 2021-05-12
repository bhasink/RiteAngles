(function ( $ ) {
	window.InlineShortcodeView_ld_progressbar = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_progressbar.__super__.render.call( this );
			var $element = this.$el.find('[data-progressbar]');
			vc.frame_window.vc_iframe.addActivity( function () {
				this.vc_iframe.liquidProgressbar = this.vc_iframe.liquidProgressbar || [];
				this.vc_iframe.liquidProgressbar[this.vc_iframe.liquidProgressbar.length] = $element.liquidProgressbar();
			} );
			return this;
		}
	} );
})( window.jQuery );