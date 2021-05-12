// right from js_composer/js/frontend_editor/containers/vc_row.js
(function ( $ ) {
	window.InlineShortcodeView_vc_row = window.InlineShortcodeView.extend( {
		column_tag: 'vc_column',
		events: {
			'mouseenter': 'removeHoldActive'
		},
		layout: 1,
		addControls: function () {
			this.$controls = $( '<div class="no-controls"></div>' );
			this.$controls.appendTo( this.$el );
			return this;
		},
		render: function () {
			var $content = this.content();
			var $videoBg = this.$el.find('[data-video-bg]');
			var $shrinkBg = this.$el.find('[data-shrink-borders]');
			var $rowBg = this.$el.find('[data-row-bg]:not([data-slideshow-bg])');
			var $slideshowBg = this.$el.find('[data-slideshow-bg]');
			var $customAnimations = this.$el.find('[data-custom-animations]');
			var $parallax = this.$el.find('[data-parallax]').not('[data-pin]');
			// var $masonry = this.$el.find('[data-liquid-masonry]');
			var $responsiveBg = this.$el.find('[data-responsive-bg=true]');

			if ( $content && $content.hasClass( 'vc_row-has-fill' ) ) {
				$content.removeClass( 'vc_row-has-fill' );
				this.$el.addClass( 'vc_row-has-fill' );
			}
			window.InlineShortcodeView_vc_row.__super__.render.call( this );

			vc.frame_window.vc_iframe.addActivity( function () {
				this.vc_iframe.liquidVideoBg = this.vc_iframe.liquidVideoBg || [];
				// this.vc_iframe.liquidShrinkBg = this.vc_iframe.liquidShrinkBg || [];
				this.vc_iframe.liquidRowBg = this.vc_iframe.liquidRowBg || [];
				this.vc_iframe.liquidSlideshowBg = this.vc_iframe.liquidSlideshowBg || [];
				// this.vc_iframe.liquidCustomAnimations = this.vc_iframe.liquidCustomAnimations || [];
				// this.vc_iframe.liquidParallax = this.vc_iframe.liquidParallax || [];
				// this.vc_iframe.liquidMasonry = this.vc_iframe.liquidMasonry || [];
				this.vc_iframe.liquidResponsiveBg = this.vc_iframe.liquidResponsiveBg || [];

				// this.vc_iframe.liquidCustomAnimations[this.vc_iframe.liquidCustomAnimations.length] = $customAnimations.liquidCustomAnimations();
				this.vc_iframe.liquidSlideshowBg[this.vc_iframe.liquidSlideshowBg.length] = $slideshowBg.length && $slideshowBg.liquidSlideshowBG();
				this.vc_iframe.liquidRowBg[this.vc_iframe.liquidRowBg.length] = $rowBg.length && $rowBg.liquidRowBG();
				// this.vc_iframe.liquidParallax[this.vc_iframe.liquidParallax.length] = $parallax.liquidParallax();
				this.vc_iframe.liquidVideoBg[this.vc_iframe.liquidVideoBg.length] = $videoBg.length && $videoBg.liquidVideoBg();
				// this.vc_iframe.liquidShrinkBg[this.vc_iframe.liquidShrinkBg.length] = $shrinkBg.liquidShrinkBorders();
				// this.vc_iframe.liquidMasonry[this.vc_iframe.liquidMasonry.length] = $masonry.length && $masonry.liquidMasonry();
				this.vc_iframe.liquidResponsiveBg[this.vc_iframe.liquidResponsiveBg.length] = $responsiveBg.length && $responsiveBg.liquidResponsiveBG();
			} );

			return this;
		},
		removeHoldActive: function () {
			vc.unsetHoldActive();
		},
		addColumn: function () {
			vc.builder.create( {
				shortcode: this.column_tag,
				parent_id: this.model.get( 'id' )
			} ).render();
		},
		addElement: function ( e ) {
			e && e.preventDefault();
			this.addColumn();
		},
		changeLayout: function ( e ) {
			e && e.preventDefault();
			this.layoutEditor().render( this.model ).show();
		},
		layoutEditor: function () {
			if ( _.isUndefined( vc.row_layout_editor ) ) {
				vc.row_layout_editor = new vc.RowLayoutUIPanelFrontendEditor( { el: $( '#vc_ui-panel-row-layout' ) } );
			}
			return vc.row_layout_editor;
		},
		convertToWidthsArray: function ( string ) {
			return _.map( string.split( /_/ ), function ( c ) {
				var w = c.split( '' );
				w.splice( Math.floor( c.length / 2 ), 0, '/' );
				return w.join( '' );
			} );
		},
		changed: function () {
			window.InlineShortcodeView_vc_row.__super__.changed.call( this );
			this.addLayoutClass();
		},
		content: function () {
			if ( false === this.$content ) {
				this.$content = this.$el.find( '.vc_container-anchor:first' ).parent();
			}
			this.$el.find( '.vc_container-anchor:first' ).remove();
			return this.$content;
		},
		addLayoutClass: function () {
			this.$el.removeClass( 'vc_layout_' + this.layout );
			this.layout = _.reject( vc.shortcodes.where( { parent_id: this.model.get( 'id' ) } ), function ( model ) {
				return model.get( 'deleted' )
			} ).length;
			this.$el.addClass( 'vc_layout_' + this.layout );
		},
		convertRowColumns: function ( layout, builder ) {
			if ( ! layout ) {
				return false;
			}
			var column_params, new_model, columns_contents, columns;
			columns_contents = [];
			columns = this.convertToWidthsArray( layout );
			vc.layout_change_shortcodes = [];
			vc.layout_old_columns = vc.shortcodes.where( { parent_id: this.model.get( 'id' ) } );
			_.each( vc.layout_old_columns, function ( column ) {
				column.set( 'deleted', true );
				columns_contents.push( {
					shortcodes: vc.shortcodes.where( { parent_id: column.get( 'id' ) } ),
					params: column.get( 'params' )
				} );
			} );
			_.each( columns, function ( column ) {
				var prev_settings = columns_contents.shift();
				if ( _.isObject( prev_settings ) ) {
					new_model = builder.create( {
						shortcode: this.column_tag,
						parent_id: this.model.get( 'id' ),
						order: vc.shortcodes.nextOrder(),
						params: _.extend( {}, prev_settings.params, { width: column } )
					} ).last();
					_.each( prev_settings.shortcodes, function ( shortcode ) {
						shortcode.save( {
								parent_id: new_model.get( 'id' ),
								order: vc.shortcodes.nextOrder()
							},
							{ silent: true } );
						vc.layout_change_shortcodes.push( shortcode );
					}, this );
				} else {
					column_params = { width: column };

					new_model = builder.create( {
						shortcode: this.column_tag,
						parent_id: this.model.get( 'id' ),
						order: vc.shortcodes.nextOrder(),
						params: column_params
					} ).last();
				}
			}, this );
			_.each( columns_contents, function ( column ) {
				_.each( column.shortcodes, function ( shortcode ) {
					shortcode.save( {
							parent_id: new_model.get( 'id' ),
							order: vc.shortcodes.nextOrder()
						},
						{ silent: true } );
					vc.layout_change_shortcodes.push( shortcode );
					shortcode.view.rowsColumnsConverted && shortcode.view.rowsColumnsConverted()
				}, this );
			}, this );
			builder.render( function () {
				_.each( vc.layout_change_shortcodes, function ( shortcode ) {
					shortcode.trigger( 'change:parent_id' );
					shortcode.view.rowsColumnsConverted && shortcode.view.rowsColumnsConverted();
				} );
				_.each( vc.layout_old_columns, function ( column ) {
					column.destroy();
				} );
				vc.layout_old_columns = [];
				vc.layout_change_shortcodes = [];
			} );
			return columns;
		},
		allowAddControl: function () {
			return vc_user_access().getState( 'shortcodes' ) !== 'edit';
		},
		allowAddControlOnEmpty: function () {
			return vc_user_access().getState( 'shortcodes' ) !== 'edit';
		}
	} );
})( window.jQuery );