// (function ( $ ) {
// 	window.InlineShortcodeView_vc_accordion = window.InlineShortcodeViewContainer.extend( {
// 		events: {},
// 		// childTag: 'vc_tta_section',
// 		childTag: 'vc_tta_section',
// 		activeClass: 'active',
// 		// controls_selector: '#vc_controls-template-vc_accordion',
// 		defaultSectionTitle: window.i18nLocale.section,
// 		initialize: function () {
// 			_.bindAll( this, 'buildSortable', 'updateSorting' );
// 			window.InlineShortcodeView_vc_accordion.__super__.initialize.call( this );
// 		},
// 		render: function () {
// 			window.InlineShortcodeViewContainer.__super__.render.call( this );
// 			var $element = this.$el.find('accordion');
// 			$element.liquidAccordion();
// 			vc.frame_window.vc_iframe.addActivity( function () {
// 				this.vc_iframe.liquidAccordion = this.vc_iframe.liquidAccordion || [];
// 				this.vc_iframe.liquidAccordion[this.vc_iframe.liquidAccordion.length] = $element.liquidAccordion();
// 			} );
// 			this.content(); // just to remove span inline-container anchor..
// 			// this.buildPagination();
// 			return this;
// 		},
// 		addControls: function () {
// 			this.$controls = $( '<div class="no-controls"></div>' );
// 			this.$controls.appendTo( this.$el );
// 			return this;
// 		},
// 		/**
// 		 * Add new element to Accordion.
// 		 * @param e
// 		 */
// 		addElement: function ( e ) {
// 			e && e.preventDefault();
// 			this.addSection( 'parent.prepend' === $( e.currentTarget ).data( 'vcControl' ) );
// 		},
// 		appendElement: function ( e ) {
// 			return this.addElement( e );
// 		},
// 		prependElement: function ( e ) {
// 			return this.addElement( e );
// 		},
// 		addSection: function ( prepend ) {
// 			var shortcode, params, i;

// 			shortcode = this.childTag;

// 			params = {
// 				shortcode: shortcode,
// 				parent_id: this.model.get( 'id' ),
// 				isActiveSection: true,
// 				params: {
// 					title: this.defaultSectionTitle
// 				}
// 			};

// 			if ( prepend ) {
// 				vc.activity = 'prepend';
// 				params.order = this.getSiblingsFirstPositionIndex();
// 			}

// 			vc.builder.create( params );

// 			// extend default params with settings presets if there are any
// 			for ( i = vc.builder.models.length - 1;
// 				  i >= 0;
// 				  i -- ) {
// 				shortcode = vc.builder.models[ i ].get( 'shortcode' );
// 			}

// 			vc.builder.render();
// 		},
// 		getSiblingsFirstPositionIndex: function () {
// 			var order,
// 				shortcodeFirst;
// 			order = 0;
// 			shortcodeFirst = vc.shortcodes.sort().findWhere( { parent_id: this.model.get( 'id' ) } );
// 			if ( shortcodeFirst ) {
// 				order = shortcodeFirst.get( 'order' ) - 1;
// 			}
// 			return order;
// 		},
// 		changed: function () {
// 			vc.frame_window.vc_iframe.buildTTA();
// 			window.InlineShortcodeView_vc_accordion.__super__.changed.call( this );
// 			_.defer( this.buildSortable );
// 			// this.buildPagination();
// 		},
// 		updated: function () {
// 			window.InlineShortcodeView_vc_accordion.__super__.updated.call( this );
// 			_.defer( this.buildSortable );
// 			// this.buildPagination();
// 		},
// 		buildSortable: function () {
// 			if ( ! vc_user_access().shortcodeEdit( this.model.get( 'shortcode' ) ) ) {
// 				return
// 			}
// 			if ( this.$el ) {
// 				this.$el.find( '.accordion' ).sortable( {
// 					forcePlaceholderSize: true,
// 					placeholder: 'vc_placeholder-row', // TODO: fix placeholder
// 					start: this.startSorting,
// 					over: function ( event, ui ) {
// 						ui.placeholder.css( { maxWidth: ui.placeholder.parent().width() } );
// 						ui.placeholder.removeClass( 'vc_hidden-placeholder' );
// 					},
// 					items: '.accordion-item',
// 					handle: '.accordion-title',// TODO: change vc_column to vc_tta_section
// 					update: this.updateSorting
// 				} );
// 			}
// 		},
// 		startSorting: function ( event, ui ) {
// 			ui.placeholder.width( ui.item.width() );
// 		},
// 		updateSorting: function ( event, ui ) {
// 			// var self = this;
// 			// this.getPanelsList().find( '.accordion-item' ).each( function () {
// 			// 	var shortcode, modelId, $this;

// 			// 	$this = $( this );
// 			// 	modelId = $this.data( 'modelId' );
// 			// 	shortcode = vc.shortcodes.get( modelId );
// 			// 	shortcode.save( { 'order': self.getIndex( $this ) }, { silent: true } );
// 			// } );
// 		},
// 		getIndex: function ( $element ) {
// 			return $element.index();
// 		},
// 		getPanelsList: function () {
// 			return this.$el.find( '.accordion' );
// 		},
// 	} );
// })( window.jQuery );