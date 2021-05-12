(function ( $ ) {
	window.InlineShortcodeView_ld_fancy_heading = window.InlineShortcodeView.extend( {
		render: function () {
			window.InlineShortcodeView_ld_fancy_heading.__super__.render.call( this );
			var $fitText = this.$el.find('[data-fittext]');
			var $splitText = this.$el.find('[data-split-text]');
			var $customAnimations = this.$el.find('[data-custom-animations]');
			var $textRotator = this.$el.find('[data-text-rotator]');
			vc.frame_window.vc_iframe.addActivity( function () {

				this.vc_iframe.liquidFitText = this.vc_iframe.liquidFitText || [];
				// this.vc_iframe.liquidSplitText = this.vc_iframe.liquidSplitText || [];
				// this.vc_iframe.liquidCustomAnimations = this.vc_iframe.liquidCustomAnimations || [];
				// this.vc_iframe.liquidTextRotator = this.vc_iframe.liquidTextRotator || [];

				this.vc_iframe.liquidFitText[this.vc_iframe.liquidFitText.length] = $fitText.liquidFitText();
				// this.vc_iframe.liquidSplitText[this.vc_iframe.liquidSplitText.length] = $splitText.liquidSplitText();
				// this.vc_iframe.liquidCustomAnimations[this.vc_iframe.liquidCustomAnimations.length] = $customAnimations.liquidCustomAnimations();
				// this.vc_iframe.liquidTextRotator[this.vc_iframe.liquidTextRotator.length] = $textRotator.liquidTextRotator();

			} );
			return this;
		}
	} );
})( window.jQuery );