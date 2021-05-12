(function ($) {
	window.InlineShortcodeView_ld_images_group_element = window.InlineShortcodeView.extend({
		render: function() {
			window.InlineShortcodeView_ld_images_group_element.__super__.render.call( this );
			return this.setPosition(), this;
		},
		beforeUpdate: function() {
			var singleImageElement = this.$el.children('.liquid-img-group-single');
			singleImageElement.removeClass('pos-reset');
		},
		updated: function() {
			window.InlineShortcodeView_ld_images_group_element.__super__.render.call( this );
			return this.setPosition(), this;
		},
		getParams: function () {
			var paramsSettings;
			return paramsSettings = this.mapped_params, this.params = _.extend({}, this.model.get("params")), _.each(paramsSettings, function (param) {
				var value;
				value = vc.atts.parseFrame.call(this, param), this.params[param.param_name] = value
			}, this), _.each(vc.edit_form_callbacks, function (callback) {
				callback.call(this)
			}, this), this.params
		},
		setPosition: function() {
			
			var params = this.getParams();
			var elID = this.model.get("id");
			this.$el.addClass('ld-fi-' + elID);
			
			var isAbsolute = params.absolute_pos;
			var style = $('<style class="lqd-dynamic-css"></style>');
			var allMedia = '.ld-fi-' + elID + ' {';
			var smallMedia = '@media (min-width: 768px) {.ld-fi-' + elID + ' {';
			var mediumMedia = '@media (min-width: 992px) {.ld-fi-' + elID + ' {';
			var largeMedia = '@media (min-width: 1200px) {.ld-fi-' + elID + ' {';
			
			if ( params.position ) {
				
				var positionArray = params.position.split('|');
				
				// making array of objects of positions. e.g. ["top_large": "5%"]
				positionArray.map( (pos, i) => {
	
					var position = pos.split(':');
					
					positionArray[i] = {};
	
					positionArray[i].labl = position[0];
					positionArray[i].val = decodeURI(position[1]);
	
				} );
				positionArray.map( (pos, i) => {

					var allPatt = /_all/g;
					var smPatt = /_small/g;
					var mdPatt = /_medium/g;
					var lgPatt = /_large/g;

					if ( allPatt.test(pos.labl) ) {

						allMedia += pos.labl.split('_')[0];
						allMedia += ':' + pos.val + ';';
						
					}

					if ( smPatt.test(pos.labl) ) {

						smallMedia += pos.labl.split('_')[0];
						smallMedia += ':' + pos.val + ';';
						
					}

					if ( mdPatt.test(pos.labl) ) {

						mediumMedia += pos.labl.split('_')[0];
						mediumMedia += ':' + pos.val + ';';
						
					}

					if ( lgPatt.test(pos.labl) ) {

						largeMedia += pos.labl.split('_')[0];
						largeMedia += ':' + pos.val + ';';
						
					}
					
				});	
				
			}
			
			if ( params.margin ) {
				
				var marginArray = params.margin.split('|');
				
				// making array of objects of margins. e.g. ["top_large": "5%"]
				marginArray.map( (pos, i) => {
	
					var margin = pos.split(':');
					
					marginArray[i] = {};
	
					marginArray[i].labl = margin[0];
					marginArray[i].val = decodeURI(margin[1]);
	
				} );
				marginArray.map( (pos, i) => {

					var allPatt = /_all/g;
					var smPatt = /_small/g;
					var mdPatt = /_medium/g;
					var lgPatt = /_large/g;

					if ( allPatt.test(pos.labl) ) {

						allMedia += 'margin-' + pos.labl.split('_')[0];
						allMedia += ':' + pos.val + ';';
						
					}

					if ( smPatt.test(pos.labl) ) {

						smallMedia += 'margin-' + pos.labl.split('_')[0];
						smallMedia += ':' + pos.val + ';';
						
					}

					if ( mdPatt.test(pos.labl) ) {

						mediumMedia += 'margin-' + pos.labl.split('_')[0];
						mediumMedia += ':' + pos.val + ';';
						
					}

					if ( lgPatt.test(pos.labl) ) {

						largeMedia += 'margin-' + pos.labl.split('_')[0];
						largeMedia += ':' + pos.val + ';';
						
					}
					
				});	
				
			}

			allMedia += '}';
			smallMedia += '}}';
			mediumMedia += '}}';
			largeMedia += '}}';

			style.html(allMedia + smallMedia + mediumMedia + largeMedia);

			this.$el.prev('.lqd-dynamic-css').length && this.$el.prev('.lqd-dynamic-css').remove();

			style.insertBefore(this.$el)

			if ( isAbsolute == 'yes' ) {

				var singleImageElement = this.$el.children('.liquid-img-group-single');
				this.$el.css('position', 'absolute');
				singleImageElement.addClass('pos-reset');

			}

		}
	});
})(window.jQuery);