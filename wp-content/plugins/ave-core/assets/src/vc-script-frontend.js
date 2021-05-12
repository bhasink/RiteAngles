(function ( $ ) {

	// function initInView( model ) {

		// console.log( vc.frame_window.vc_iframe );

		// var childTag = '[vc_tta_section]';
		// vc.events.on(
		// 	'shortcodes:' + childTag + ':add:parent:' + model.get( 'id' ),
		// 	function ( model ) {
		// 		var activeTabIndex, models, parentModel;
		// 		parentModel = vc.shortcodes.get( model.get( 'parent_id' ) );
		// 		activeTabIndex = parseInt( parentModel.getParam( 'active_section' ) );
		// 		if ( 'undefined' === typeof(activeTabIndex) ) {
		// 			activeTabIndex = 1;
		// 		}
		// 		models = _.pluck( _.sortBy( vc.shortcodes.where( { parent_id: parentModel.get( 'id' ) } ),
		// 			function ( model ) {
		// 				return model.get( 'order' );
		// 			} ), 'id' );
		// 		if ( models.indexOf( model.get( 'id' ) ) === activeTabIndex - 1 ) {
		// 			model.set( 'isActiveSection', true );
		// 		}
		// 		return model;
		// 	}
		// );
		// vc.events.on(
		// 	'shortcodes:' + childTag + ':clone:parent:' + model.get( 'id' ),
		// 	function ( model ) {
		// 		vc.ttaSectionActivateOnClone && model.set( 'isActiveSection', true );
		// 		vc.ttaSectionActivateOnClone = false;
		// 	}
		// );
	// }

	// vc.events.on( 'shortcodes:add', initInView );

})( window.jQuery );