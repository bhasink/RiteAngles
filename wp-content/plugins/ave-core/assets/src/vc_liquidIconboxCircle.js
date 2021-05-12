(function ( $ ) {
	window.InlineShortcodeView_ld_icon_box_circle = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_icon_box_circle.__super__.render.call( this );

			var $iconboxCircle = this.$el.find('[data-spread-incircle]');
			var $hover3d = this.$el.find('[data-hover3d=true]');

			vc.frame_window.vc_iframe.addActivity( function () {

				this.vc_iframe.liquidIconboxCircle = this.vc_iframe.liquidIconboxCircle || [];
				this.vc_iframe.liquidHover3d = this.vc_iframe.liquidHover3d || [];

				this.vc_iframe.liquidIconboxCircle[this.vc_iframe.liquidIconboxCircle.length] = $iconboxCircle.liquidIconboxCircle();
				this.vc_iframe.liquidHover3d[this.vc_iframe.liquidHover3d.length] = $hover3d.liquidHover3d();

			} );

			return this;
		}
	} );
})( window.jQuery );