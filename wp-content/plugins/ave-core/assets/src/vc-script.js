if ( vc ) {

	if (function($) {
		var liquidResponsiveAlignmentParam = Backbone.View.extend({
			events: {},
			$lg_offset_placeholder_value: !1,
			$lg_size_placeholder_value: !1,
			initialize: function() {
				_.bindAll(this, "setLgPlaceholders")
			},
			render: function() {
				return this
			},
			save: function() {
				var data = [];
				return this.$el.find(".vc_column_offset_field").each(function() {
					var $field = $(this);
					$field.is(":checkbox:checked") ? data.push($field.attr("name")) : $field.is("select") && "" !== $field.val() && data.push($field.val())
				}), data
			},
			setLgPlaceholders: function() {
				var offset = this.$lg_offset_placeholder_value.val().replace(/[^\d]/g, "");
				this.$lg_size.find("option:first").text(VcI8nColumnOffsetParam.inherit_default), this.$lg_offset.find("option:first").text(offset ? VcI8nColumnOffsetParam.inherit + offset : "")
			}
		});
	
		// VC Liquid responsive aligment js
		vc.atts.responsive_alignment = {
			parse: function(param) {
				return this.content().find("input.wpb_vc_param_value." + param.param_name).data("liquidResponsiveAlignment").save().join(" ")
			},
			init: function(param, $field) {
				$('[data-column-offset="true"]', $field).each(function() {
					var $this = $(this);
					$this.find(".wpb_vc_param_value").data("liquidResponsiveAlignment", new liquidResponsiveAlignmentParam({
						el: $this
					}).render())
				})
			}
		}
	
	}(window.jQuery), _.isUndefined(window.vc)) var vc = {
		atts: {}
	};
	(function($) {
	
		// OVerride VcBackendTtaViewInterface
		if ('VcBackendTtaViewInterface' in window) {
	
			window.VcBackendTtaViewInterface.prototype.clickAppendSection = function(e) {
				e.preventDefault();
				this.addSection(undefined, $(e.currentTarget).data('element_type'));
			};
	
			window.VcBackendTtaViewInterface.prototype.clickPrependSection = function(e) {
				e.preventDefault();
				this.addSection(!0, $(e.currentTarget).data('element_type'));
			};
	
			window.VcBackendTtaViewInterface.prototype.addSection = function(prepend, element) {
				var newTabTitle, params, shortcode;
	
				element = element || "vc_tta_section";
	
				return newTabTitle = this.defaultSectionTitle,
				params = {
					shortcode: element,
					params: {
						title: newTabTitle
					},
					parent_id: this.model.get("id"),
					order: _.isBoolean(prepend) && prepend ? vc.add_element_block_view.getFirstPositionIndex() : vc.shortcodes.getNextOrder(),
					prepend: prepend
				},
				shortcode = vc.shortcodes.create(params);
			};
		}
		
		// VC Liquid Colorpicker
		vc.atts.liquid_colorpicker = {
			init: function(param, $field) {
				var $init_val = $field.find('input.wpb_vc_param_value').val();
				$field.next('.ld-color-val').val( $init_val );
				$field.find('[data-colorpicker=true]').liquidColorPicker();
			},
			parse: function(param) {
	
				var $field = this.content().find(".wpb_vc_param_value[name=" + param.param_name + "]"),
				$css = $field.next('.ld-color-val');
	
				return $css.val();
			}
			
		}
	
		vc.atts.el_id = {
			clone: function(clonedModel, paramValue, paramSettings) {
				var shortcodeParams;
				shortcodeParams = clonedModel.get("params"), _.isUndefined(paramSettings) || _.isUndefined(paramSettings.settings) || _.isUndefined(paramSettings.settings.auto_generate) || !0 !== paramSettings.settings.auto_generate ? shortcodeParams[paramSettings.param_name] = "" : shortcodeParams[paramSettings.param_name] = "ld-" + Date.now() + "-" + vc_guid(), clonedModel.set({
					params: shortcodeParams
				}, {
					silent: !0
				})
			},
			create: function(shortcodeModel, paramValue, paramSettings) {
				if (shortcodeModel.get("cloned")) return vc.atts.el_id.clone(shortcodeModel, paramValue, paramSettings);
				if (_.isEmpty(paramValue) && !_.isUndefined(paramSettings) && !_.isUndefined(paramSettings.settings) && !_.isUndefined(paramSettings.settings.auto_generate) && 1 == paramSettings.settings.auto_generate) {
					var shortcodeParams;
					shortcodeParams = shortcodeModel.get("params"), shortcodeParams[paramSettings.param_name] = "ld-" + Date.now() + "-" + vc_guid(), shortcodeModel.set({
						params: shortcodeParams
					}, {
						silent: !0
					})
				}
			}
		};
	
		// VC liquid slider parameter js
		vc.atts.liquid_slider = {
	
			render: function(param, value) {
				return value;
			},
	
			init: function( param, $field ) {
	
				var $init_val = $field.find('input.wpb_vc_param_value').val();
				var $handle = $field.find('.liquid-handle');
	
				$field.find('.liquid-slider').slider({
					min: param.min,
					max: param.max,
					step: param.step,
					value: $init_val,
	
					create: function() {
						$handle.text( $( this ).slider( "value" ) );
					},
					slide: function( event, ui ) {
						$handle.text( ui.value );
					},
					change: function( event, ui ) {
						$field.find('input.wpb_vc_param_value').val( ui.value );
					}
				});
	
			}
	
		}
	
		// VC Select Preview parameter js
		vc.atts.select_preview = {
	
			render: function(param, value) {
				return value;
			},
	
			init: function(param, $field) {
				$field.find('.wpb_vc_param_value').imagepicker({
					show_label: true
				});
			},
			defaults: function(param) {
				var values;
				return _.isArray(param.value) || _.isString(param.value) ? _.isArray(param.value) ? (values = param.value[0]['value'], _.isArray(values) && values.length ? values[0]['value'] : values) : "" : (values = _.values(param.value)[0]['value'], values.label ? values.value : values);
			}
	
		};
		
		// VC Responsive CSS parameter js
		vc.atts.responsive_textfield = {
			parse: function(param) {
				var $field = this.content().find('.wpb_vc_param_value[name=' + param.param_name + ']');
				var $block = $field.parent();
				var options = {},
				string_pieces,
				string;
				resolutions = [ 'all','desktop', 'tablet', 'mobile' ],
	
				// Items values
				options.lg = $block.find('[data-name="textfield-lg"]').val();
				options.md = $block.find('[data-name="textfield-md"]').val();
				options.sm = $block.find('[data-name="textfield-sm"]').val();
				options.xs = $block.find('[data-name="textfield-xs"]').val();
					
				//Spacing values
				options.spacing_lg = $block.find('[data-name="spacing-lg"]').val();
				if ( _.isString(options.spacing_lg) && 0 < options.spacing_lg.length ) {
					options.spacing_lg.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (options.spacing_lg = isNaN(parseFloat(options.spacing_lg)) ? "" : parseFloat(options.spacing_lg) + "px"), options.spacing_lg.length;
				}			
				options.spacing_md = $block.find('[data-name="spacing-md"]').val();
				if ( _.isString(options.spacing_md) && 0 < options.spacing_md.length ) {
					options.spacing_lg.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (options.spacing_md = isNaN(parseFloat(options.spacing_md)) ? "" : parseFloat(options.spacing_md) + "px"), options.spacing_md.length;
				}			
				options.spacing_sm = $block.find('[data-name="spacing-sm"]').val();
				if ( _.isString(options.spacing_sm) && 0 < options.spacing_sm.length ) {
					options.spacing_sm.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (options.spacing_sm = isNaN(parseFloat(options.spacing_sm)) ? "" : parseFloat(options.spacing_sm) + "px"), options.spacing_sm.length;
				}			
				options.spacing_xs = $block.find('[data-name="spacing-xs"]').val();
				if ( _.isString(options.spacing_xs) && 0 < options.spacing_xs.length ) {
					options.spacing_xs.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (options.spacing_xs = isNaN(parseFloat(options.spacing_xs)) ? "" : parseFloat(options.spacing_xs) + "px"), options.spacing_xs.length;
				}			
	
				string_pieces = _.map(options, function(value, key) {
					if ( _.isString(value) && 0 < value.length ) {
						return key + ':' + encodeURIComponent(value);
					}
				});
				string = $.grep(string_pieces, function(value) {
					return _.isString(value) && 0 < value.length;
				}).join('|');
				return string;
			},
	
		};
	
		// VC Shape divider parameter js
		vc.atts.liquid_shape_divider = {
			parse: function(param) {
				var $field = this.content().find('.wpb_vc_param_value[name=' + param.param_name + ']');
				var $block = $field.parent();
				var options = {},
				string_pieces,
				string;
				positions: ['top', 'bottom'];
	
				//Top Shape values
				options.top_shape_type = $block.find('[data-name="top-shape-type"]').val();
				options.top_shape_color = $block.find('[data-name="top-shape-color"]').val();
				options.top_shape_height = $block.find('[data-name="top-shape-height"]').val();
				options.top_shape_width = $block.find('[data-name="top-shape-width"]').val();
	
				//Bottom Shape values
				options.bottom_shape_type = $block.find('[data-name="bottom-shape-type"]').val();
				options.bottom_shape_color = $block.find('[data-name="bottom-shape-color"]').val();
				options.bottom_shape_height = $block.find('[data-name="bottom-shape-height"]').val();
				options.bottom_shape_width = $block.find('[data-name="bottom-shape-width"]').val();
	
				string_pieces = _.map(options, function(value, key) {
					if (_.isString(value) && 0 < value.length) {
						return key + ':' + encodeURIComponent(value);
					}
				});
				string = $.grep(string_pieces, function(value) {
					return _.isString(value) && 0 < value.length;
				}).join('|');
				return string;
			},
			init: function(param, $field) {
				$(".liquid_color-control", $field).each(function() {
					var $alpha, $alpha_output, $pickerContainer, $control = $(this),
						value = $control.val().replace(/\s+/g, ""),
						alpha_val = 100;
					value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/) && (alpha_val = 100 * parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1])), $control.wpColorPicker({
						clear: function(event, ui) {
							$alpha.val(100), $alpha_output.val("100%")
						},
						change: _.debounce(function() {
							$(this).trigger("change")
						}, 500)
					}), $pickerContainer = $control.closest(".wp-picker-container"), $('<div class="vc_alpha-container"><label>Alpha: <output class="rangevalue">' + alpha_val + '%</output></label><input type="range" min="1" max="100" value="' + alpha_val + '" name="alpha" class="vc_alpha-field"></div>')
					.appendTo($pickerContainer.addClass("vc_color-picker").find(".iris-picker")), $alpha = $pickerContainer.find(".vc_alpha-field"), $alpha_output = $pickerContainer.find(".vc_alpha-container output"), $alpha.bind("change keyup", function() {
						var alpha_val = parseFloat($alpha.val()),
							iris = $control.data("a8c-iris"),
							color_picker = $control.data("wp-wpColorPicker");
						$alpha_output.val($alpha.val() + "%"), iris._color._alpha = alpha_val / 100, $control.val(iris._color.toString()), color_picker.toggler.css({
							backgroundColor: $control.val()
						})
					}).val(alpha_val).trigger("change")
				});
				$( ".liquid-slider", $field).each( function() {
					var $init_val, $control = $( this ),
						value  = $control.parent().find( ".liquid-sliderinput").val(),
						$handle = $control.find('.liquid-handle');
	
					$control.slider({
						min: 0,
						max: 500,
						step: 1,
						value: value,
	
						create: function() {
							$handle.text( $( this ).slider( "value" ) );
						},
						slide: function( event, ui ) {
							$handle.text( ui.value );
						},
						change: function( event, ui ) {
							$control.parent().find( ".liquid-sliderinput").val( ui.value );
						}
					});
				});
	
				$('h3.liquid-shape-divider-heading', $field).click(function(e) {
					var $this = $(this);
					var $parent = $this.parent();
					var target = $this.attr('data-target');
	
					$this.addClass('active').siblings().removeClass('active');
					$parent.siblings().addClass('hidden');
					$parent.siblings('[data-position=' + target + ']').removeClass('hidden');
				});
	
				$(document).on('change', '.liquid_shape_divider-type', function() {
	
					var $this = $(this);
	
					if ( typeof this.options !== typeof undefined ) {
	
						var selectedIndex = this.options[this.selectedIndex].index,
							imagePath = $(this.options[this.selectedIndex]).data('svg-path'),
							previewTarget = $($this.data('preview-target'), $this.closest('.liquid_shape_divider_settings')),
							newImageItem = $('<img src="" alt="Divider" />'),
							svgData;
	
						if ( ! previewTarget.find('img').length ) {
	
							newImageItem.appendTo(previewTarget);
	
						};
	
						previewTarget.find('img').attr('src', imagePath);
	
						$.get(previewTarget.find('img').attr('src'), function(data) {
	
							svgData = data.childNodes;
							
							if ( previewTarget.find('svg').length ) {
								previewTarget.find('svg').remove();
							}
	
							$(svgData).appendTo(previewTarget)
	
						});
	
					}
	
				});
	
				$('.liquid_shape_divider-type', $field).trigger('change');
	
			}
		};
		
		// VC Responsive CSS parameter js
		vc.atts.liquid_responsive = {
			parse: function(param) {
				var $field = this.content().find('.wpb_vc_param_value[name=' + param.param_name + ']');
				var $block = $field.parent();
				var options = {},
				string_pieces,
				string;
				positions: ['top', 'right', 'bottom', 'left'],
				resolutions = ['all','desktop', 'tablet', 'mobile'],
	
				// Large values
				options.top_all = $block.find('[data-name="top-all"]').val();
				options.right_all = $block.find('[data-name="right-all"]').val();
				options.bottom_all = $block.find('[data-name="bottom-all"]').val();
				options.left_all = $block.find('[data-name="left-all"]').val();
	
				// Desktop values
				options.top_large = $block.find('[data-name="top-large"]').val();
				options.right_large = $block.find('[data-name="right-large"]').val();
				options.bottom_large = $block.find('[data-name="bottom-large"]').val();
				options.left_large = $block.find('[data-name="left-large"]').val();
	
				// Tablet values
				options.top_medium = $block.find('[data-name="top-medium"]').val();
				options.right_medium = $block.find('[data-name="right-medium"]').val();
				options.bottom_medium = $block.find('[data-name="bottom-medium"]').val();
				options.left_medium = $block.find('[data-name="left-medium"]').val();
	
				// Mobile values
				options.top_small = $block.find('[data-name="top-small"]').val();
				options.right_small = $block.find('[data-name="right-small"]').val();
				options.bottom_small = $block.find('[data-name="bottom-small"]').val();
				options.left_small = $block.find('[data-name="left-small"]').val();
	
				string_pieces = _.map(options, function(value, key) {
					if ( _.isString(value) && 0 < value.length ) {
						value.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (value = isNaN(parseFloat(value)) ? "" : parseFloat(value) + "px"), value.length;
						return key + ':' + encodeURIComponent(value);
					}
				});
				string = $.grep(string_pieces, function(value) {
					return _.isString(value) && 0 < value.length;
				}).join('|');
				return string;
			},
	
			init: function(param, $field) {
	
				var $responsiveWrapper = $field.find('.liquid-main-responsive-wrapper');
	
				$responsiveWrapper.first().addClass('active');
	
				$('h3.liquid-responsive-css-heading', $field).on('click', function() {
	
					var $this = $(this);
	
					$this.parent().addClass('active');
					$this.parent().siblings().removeClass('active');
	
				});
			},
	
		};
	
		// VC Responsive CSS parameter js
		vc.atts.responsive_css_editor = {
			parse: function(param) {
				var $field = this.content().find('.wpb_vc_param_value[name=' + param.param_name + ']');
				var $block = $field.parent();
				var options = {},
				string_pieces,
				string;
				positions: ['top', 'right', 'bottom', 'left'],
				resolutions = ['small', 'medium', 'large'],
				props = ['margin', 'padding', 'border'];
	
				// large values
				options.margin_top_large = $block.find('[data-name="margin-top-large"]').val();
				options.margin_right_large = $block.find('[data-name="margin-right-large"]').val();
				options.margin_bottom_large = $block.find('[data-name="margin-bottom-large"]').val();
				options.margin_left_large = $block.find('[data-name="margin-left-large"]').val();
	
				options.border_top_large = $block.find('[data-name="border-top-large"]').val();
				options.border_right_large = $block.find('[data-name="border-right-large"]').val();
				options.border_bottom_large = $block.find('[data-name="border-bottom-large"]').val();
				options.border_left_large = $block.find('[data-name="border-left-large"]').val();
	
				options.padding_top_large = $block.find('[data-name="padding-top-large"]').val();
				options.padding_right_large = $block.find('[data-name="padding-right-large"]').val();
				options.padding_bottom_large = $block.find('[data-name="padding-bottom-large"]').val();
				options.padding_left_large = $block.find('[data-name="padding-left-large"]').val();
	
				// medium values
				options.margin_top_medium = $block.find('[data-name="margin-top-medium"]').val();
				options.margin_right_medium = $block.find('[data-name="margin-right-medium"]').val();
				options.margin_bottom_medium = $block.find('[data-name="margin-bottom-medium"]').val();
				options.margin_left_medium = $block.find('[data-name="margin-left-medium"]').val();
	
				options.border_top_medium = $block.find('[data-name="border-top-medium"]').val();
				options.border_right_medium = $block.find('[data-name="border-right-medium"]').val();
				options.border_bottom_medium = $block.find('[data-name="border-bottom-medium"]').val();
				options.border_left_medium = $block.find('[data-name="border-left-medium"]').val();
	
				options.padding_top_medium = $block.find('[data-name="padding-top-medium"]').val();
				options.padding_right_medium = $block.find('[data-name="padding-right-medium"]').val();
				options.padding_bottom_medium = $block.find('[data-name="padding-bottom-medium"]').val();
				options.padding_left_medium = $block.find('[data-name="padding-left-medium"]').val();
	
				// small values
				options.margin_top_small = $block.find('[data-name="margin-top-small"]').val();
				options.margin_right_small = $block.find('[data-name="margin-right-small"]').val();
				options.margin_bottom_small = $block.find('[data-name="margin-bottom-small"]').val();
				options.margin_left_small = $block.find('[data-name="margin-left-small"]').val();
	
				options.border_top_small = $block.find('[data-name="border-top-small"]').val();
				options.border_right_small = $block.find('[data-name="border-right-small"]').val();
				options.border_bottom_small = $block.find('[data-name="border-bottom-small"]').val();
				options.border_left_small = $block.find('[data-name="border-left-small"]').val();
	
				options.padding_top_small = $block.find('[data-name="padding-top-small"]').val();
				options.padding_right_small = $block.find('[data-name="padding-right-small"]').val();
				options.padding_bottom_small = $block.find('[data-name="padding-bottom-small"]').val();
				options.padding_left_small = $block.find('[data-name="padding-left-small"]').val();
	
				string_pieces = _.map(options, function(value, key) {
					if ( _.isString(value) && 0 < value.length ) {
						value.match(/^-?\d*(\.\d+){0,1}(%|in|cm|mm|em|rem|ex|pt|pc|px|vw|vh|vmin|vmax)$/) || (value = isNaN(parseFloat(value)) ? "" : parseFloat(value) + "px"), value.length;
						return key + ':' + encodeURIComponent(value);
					}
				});
				string = $.grep(string_pieces, function(value) {
					return _.isString(value) && 0 < value.length;
				}).join('|');
				return string;
	
			},
			init: function(param, $field) {
	
				var $vcOnion = $field.next('.vc_wrapper-param-type-css_editor').find('.vc_layout-onion');
	
				var $vcOnionWrap = $vcOnion.wrapInner('<div class="vc-onion-wrap active" />');
				var $vcOnionHeading = $('<h3 class="liquid-responsive-css-heading extra-small"><i class="vc-composer-icon vc-c-icon-layout_portrait-smartphones"></i></h3>');
				$field.find('.edit_form_line').clone(true).prependTo($vcOnionWrap);
				$vcOnionHeading.prependTo($vcOnion.find('.vc-onion-wrap'));
				$field.hide();
				$vcOnion.find('.liquid-main-responsive-wrapper.active').removeClass('active');
				
				var $fieldInputs = $field.find('.liquid-responsive-css-container').find('input')
				var $newFieldInputs = $vcOnion.find('.liquid-responsive-css-container').find('input');
	
				$newFieldInputs.on('change', function() {
	
					var $this = $(this);
					var thisIndex = $newFieldInputs.index( $(this) );
	
					$fieldInputs.eq(thisIndex).val($this.val()).trigger('change');
					
				});
	
				$('h3.liquid-responsive-css-heading', $vcOnion).on('click', function() {
	
					var $this = $(this);
	
					$this.closest('.vc_layout-onion').find('.vc-onion-wrap.active, .liquid-main-responsive-wrapper.active').removeClass('active');
					$this.parent().addClass('active');
	
				});
			},
	
		};
	
		// VC Advanced Liquid Checkbox js
		vc.atts.liquid_advanced_checkbox = {
	
			parse: function(param) {
	
				if ($(".liquid-advanced-checkbox input").is(':checked')) {
					var $checked = 'checked="checked"';
				} else {
					var $checked = '';
				}
	
				var $liquid_panel = $('#vc_ui-panel-edit-element'),
				$easy_mode_checkbox = $('<label class="liquid-easy-mode-switch"><input type="checkbox" class="liquid-easy-mode-checkbox" ' + $checked + ' value="true">Easy Mode<span><i class="fa fa-power-off"> </i></span></label>'),
				$easy_mode;
	
				$liquid_panel.find('.liquid-easy-mode-switch').remove();
				$liquid_panel.find('.vc_ui-panel-header-controls').prepend($easy_mode_checkbox);
				$easy_mode = $easy_mode_checkbox.find('.liquid-easy-mode-checkbox');
	
				var $advanced_checkbox = $(".liquid-advanced-checkbox input");
	
				$easy_mode.on('change', function() {
					$advanced_checkbox.trigger('click');
				});
	
				var arr, newValue;
				return arr = [],
				newValue = "",
				$("input[name=" + param.param_name + "]", this.content()).each(function() {
					var self;
					self = $(this),
					this.checked && arr.push(self.attr("value"))
	
				}),
				0 < arr.length && (newValue = arr.join(",")),
				newValue
			},
			defaults: function(param) {
				return ""
			},
		};
	
		// VC Liquid Checkbox js
		vc.atts.liquid_checkbox = {
	
			parse: function(param) {
				var arr, newValue;
				return arr = [],
				newValue = "",
				$("input[name=" + param.param_name + "]", this.content()).each(function() {
					var self;
					self = $(this),
					this.checked && arr.push(self.attr("value"))
				}),
				0 < arr.length && (newValue = arr.join(",")),
				newValue
			},
			defaults: function(param) {
				return ""
			}
		};
		
		vc.atts.liquid_button_set = {
	
			parse: function(param) {
				var arr, newValue;
				return arr = [],
				newValue = "",
				$("input[name=" + param.param_name + "]", this.content()).each(function() {
					var self;
					self = $(this),
					this.checked && arr.push(self.attr("value"))
				}),
				0 < arr.length && (newValue = arr.join(",")),
				newValue
			},
			init: function(param, $field) {
				var buttonGroup = $('.ld-btn-group', $field);
				
				$('.ld-btn', buttonGroup).on('click', function() {
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');
				});
			},
			defaults: function(param) {
				return ""
			}
		};
	
		// VC Checkbox additional html markup js
		vc.atts.checkbox = {
	
			parse: function(param) {
				var arr, newValue;
				return arr = [],
				newValue = "",
				$("input[name=" + param.param_name + "]", this.content()).each(function() {
					var self;
					var span = $('<span class="checkbox"></span>');
					self = $(this),
					this.checked && arr.push(self.attr("value"))
					if (!self.siblings('span.checkbox').length) {
						span.insertAfter(self);
					}
				}),
				0 < arr.length && (newValue = arr.join(",")),
				newValue
			},
			defaults: function(param) {
				return ""
			}
		};
	
		$('body').on('click', '.vc_ui-tabs-line-trigger', function() {
	
			var $this = $(this),
			target = $this.attr('data-vc-ui-element-target');
	
			$(target).find('input[type=checkbox]').each(function() {
	
				var span = $('<span class="checkbox"></span>');
	
				if (!$(this).siblings('span.checkbox').length) {
					span.insertAfter($(this));
				}
	
			})
	
		});
	
		$('[data-id="page-enable-stack"]').on('change', 'input[type=radio]', function() {
	
			var $body = $('body');
			var $input = $(this);
			var val = $input.val();
	
			val == 'on' ? $body.addClass('lqd-stack-enabled') : $body.removeClass('lqd-stack-enabled');
	
		});
	
		// VC One Collection
		vc.TemplateWindowUIPanelBackendEditor = vc.TemplatesPanelViewBackend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
			panelName: "template_window",
			showMessageDisabled: !1,
			initialize: function() {
				vc.TemplateWindowUIPanelBackendEditor.__super__.initialize.call(this);
				this.trigger("show", this.initTemplatesTabs, this);
			},
			show: function() {
	
				this.clearSearch(), vc.TemplateWindowUIPanelBackendEditor.__super__.show.call(this);
	
				var $liquidTemplatesContainer = $('.vc_edit-form-tab[data-tab="liquid_templates"]')
	
				$('.sortable_templates ul > li', $liquidTemplatesContainer).each(function() {
	
					"all" == $(this).attr("data-sort") ?
						$(this).find(".count").html($('.vc_ui-template-list > .vc_ui-template', $liquidTemplatesContainer).length) :
						$(this).find(".count").html($('.vc_ui-template-list > .vc_ui-template.' + $(this).attr("data-sort"), $liquidTemplatesContainer).length);
	
				});
	
				$('.sortable_templates li[data-sort="all"]', $liquidTemplatesContainer).addClass("active").trigger("click");
				
				$('.sortable_templates li', $liquidTemplatesContainer).click(function() {
	
					$('.sortable_templates li', $liquidTemplatesContainer).removeClass("active");
	
					$(this).addClass("active");
					var t = $(this).attr("data-sort");
	
					$('.vc_ui-template-list > .vc_ui-template', $liquidTemplatesContainer).removeClass("hidden");
	
					"all" != t && $('.vc_ui-template-list > .vc_ui-template:not(.' + t + ")", $liquidTemplatesContainer).addClass("hidden");
	
					$('.liquid-templates-container', $liquidTemplatesContainer).attr('data-filtered-items', t)
					
				});
	
				$('.vc_ui-template', $(this.el) ).removeClass('is-loading').find('.vc-composer-icon').removeClass('vc-c-icon-sync').addClass('vc-c-icon-add');
	
				$('.vc_ui-control-button i', $(this.el) ).removeClass('rotating');
	
				$(this.el).on('click', '.vc_ui-template [data-template-handler]' ,function() {
	
					$(this).closest('.vc_ui-template').addClass('is-loading')
					
					if ( $(this).is('.vc_ui-control-button') ) {
						$(this).find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
					} else {
						$(this).next('.vc_ui-list-bar-item-actions').find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
					}
	
				})
			},
			initTemplatesTabs: function() {
	
				this.$el.find('[data-vc-ui-element="panel-tabs-controls"]').vcTabsLine("moveTabs")
	
			},
			showMessage: function(text, type) {
	
				var wrapperCssClasses;
				if (this.showMessageDisabled) return !1;
				wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
				var $messageBox, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
				switch (type) {
					case "error":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "danger",
						icon: "times",
						text: text
					}));
					break;
					case "warning":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "warning",
						icon: "exclamation-triangle",
						text: text
					}));
					break;
					case "success":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "success",
						icon: "check",
						text: text
					}))
				}
				$messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
					$messageBox.remove()
				}, 6e3)
			},
			changeTab: function(e) {
				e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
				var $tab = $(e.currentTarget);
				$tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
			},
			setPreviewFrameHeight: function(templateID, height) {
				parseInt(height) < 100 && (height = 100), $('data-vc-template-preview-frame="' + templateID + '"').height(height)
			}
		}), vc.TemplateWindowUIPanelBackendEditor.prototype.events = $.extend(!0, vc.TemplateWindowUIPanelBackendEditor.prototype.events, {
			'click [data-vc-ui-element="button-save"]': "save",
			'click [data-vc-ui-element="button-close"]': "hide",
			'click [data-vc-ui-element="button-minimize"]': "toggleOpacity",
			"keyup [data-vc-templates-name-filter]": "searchTemplate",
			"search [data-vc-templates-name-filter]": "searchTemplate",
			"click .vc_template-save-btn": "saveTemplate",
			"click [data-template_id] [data-template-handler]": "loadTemplate",
			'click [data-vc-container=".vc_ui-list-bar"][data-vc-preview-handler]': "buildTemplatePreview",
			'click [data-vc-ui-delete="template-title"]': "removeTemplate",
			'click [data-vc-ui-element="panel-tab-control"]': "changeTab"
		}), vc.TemplateWindowUIPanelFrontendEditor = vc.TemplatesPanelViewFrontend.vcExtendUI(vc.HelperPanelViewHeaderFooter).vcExtendUI(vc.HelperTemplatesPanelViewSearch).extend({
			panelName: "template_window",
			showMessageDisabled: !1,
			show: function() {
				this.clearSearch(), vc.TemplateWindowUIPanelFrontendEditor.__super__.show.call(this), $('.vc_edit-form-tab[data-tab="liquid_templates"] .sortable_templates ul > li').each(function() {
					"all" == $(this).attr("data-sort") ? $(this).find(".count").html($('.vc_edit-form-tab[data-tab="liquid_templates"] .vc_ui-template-list > .vc_ui-template').length) : $(this).find(".count").html($('.vc_edit-form-tab[data-tab="liquid_templates"] .vc_ui-template-list > .vc_ui-template.' + $(this).attr("data-sort")).length)
				}), $('.vc_edit-form-tab[data-tab="liquid_templates"] .sortable_templates li[data-sort="all"]').addClass("active").trigger("click"), $('.vc_edit-form-tab[data-tab="liquid_templates"] .sortable_templates li').click(function() {
					$('.vc_edit-form-tab[data-tab="liquid_templates"] .sortable_templates li').removeClass("active"), $(this).addClass("active");
					var t = $(this).attr("data-sort");
					$('.vc_edit-form-tab[data-tab="liquid_templates"] .vc_ui-template-list > .vc_ui-template').removeClass("hidden"), "all" != t && $('.vc_edit-form-tab[data-tab="liquid_templates"] .vc_ui-template-list > .vc_ui-template:not(.' + t + ")").addClass("hidden")
				}),
				$('.vc_ui-template', $(this.el) ).removeClass('is-loading').find('.vc-composer-icon').removeClass('vc-c-icon-sync').addClass('vc-c-icon-add');
				$('.vc_ui-control-button i', $(this.el) ).removeClass('rotating');
				$(this.el).on('click', '.vc_ui-template [data-template-handler]' ,function() {
	
					$(this).closest('.vc_ui-template').addClass('is-loading')
					if ( $(this).is('.vc_ui-control-button') ) {
						$(this).find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
					} else {
						$(this).next('.vc_ui-list-bar-item-actions').find('.vc-composer-icon').removeClass('vc-c-icon-add').addClass('vc-c-icon-sync rotating');
					}
	
				})
			},
			showMessage: function(text, type) {
				if (this.showMessageDisabled) return !1;
				this.message_box_timeout && this.$el.find("[data-vc-panel-message]").remove() && window.clearTimeout(this.message_box_timeout), this.message_box_timeout = !1;
				var $messageBox, wrapperCssClasses, messageBoxTemplate = vc.template('<div class="vc_message_box vc_message_box-standard vc_message_box-rounded vc_color-<%- color %>"><div class="vc_message_box-icon"><i class="fa fa fa-<%- icon %>"></i></div><p><%- text %></p></div>');
				switch (wrapperCssClasses = "vc_col-xs-12 wpb_element_wrapper", type) {
					case "error":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "danger",
						icon: "times",
						text: text
					}));
					break;
					case "warning":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "warning",
						icon: "exclamation-triangle",
						text: text
					}));
					break;
					case "success":
					$messageBox = $('<div class="' + wrapperCssClasses + '" data-vc-panel-message>').html(messageBoxTemplate({
						color: "success",
						icon: "check",
						text: text
					}))
				}
				$messageBox.prependTo(this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_row.vc_active')), $messageBox.fadeIn(), this.message_box_timeout = window.setTimeout(function() {
					$messageBox.remove()
				}, 6e3)
			},
			changeTab: function(e) {
				e.preventDefault(), e && !e.isClearSearch && this.clearSearch();
				var $tab = $(e.currentTarget);
				$tab.parent().hasClass("vc_active") || (this.$el.find('[data-vc-ui-element="panel-tabs-controls"] .vc_active:not([data-vc-ui-element="panel-tabs-line-dropdown"])').removeClass("vc_active"), $tab.parent().addClass("vc_active"), this.$el.find('[data-vc-ui-element="panel-edit-element-tab"].vc_active').removeClass("vc_active"), this.$el.find($tab.data("vcUiElementTarget")).addClass("vc_active"), this.$tabsMenu && this.$tabsMenu.vcTabsLine("checkDropdownContainerActive"))
			}
		}), $.fn.vcAccordion.Constructor.prototype.collapseTemplate = function(showCallback) {
			var $allTriggers, $activeTriggers, $this, $triggers;
			$this = this.$element;
			var i;
			if (i = 0, $allTriggers = this.getContainer().find("[data-vc-preview-handler]").each(function() {
				var accordion, $this;
				$this = $(this), accordion = $this.data("vc.accordion"), void 0 === accordion && ($this.vcAccordion(), accordion = $this.data("vc.accordion")), accordion && accordion.setIndex && accordion.setIndex(i++)
			}), $activeTriggers = $allTriggers.filter(function() {
				var $this, accordion;
				return $this = $(this), accordion = $this.data("vc.accordion"), accordion.getTarget().hasClass(accordion.activeClass)
			}), $triggers = $activeTriggers.filter(function() {
				return $this[0] !== this
			}), $triggers.length && $.fn.vcAccordion.call($triggers, "hide"), this.isActive()) $.fn.vcAccordion.call($this, "hide");
			else {
				$.fn.vcAccordion.call($this, "show");
				var $triggerPanel = $this.closest(".vc_ui-list-bar-item"),
				$wrapper = $this.closest("[data-template_id]"),
				$panel = $wrapper.closest("[data-vc-ui-element=panel-content]").parent();
				setTimeout(function() {
					if (Math.round($wrapper.offset().top - $panel.offset().top) < 0) {
						var posit = Math.round($wrapper.offset().top - $panel.offset().top + $panel.scrollTop() - $triggerPanel.height());
						$panel.animate({
							scrollTop: posit
						}, 400)
					}
					"function" == typeof showCallback && showCallback($wrapper, $panel)
				}, 400)
			}
		}
	
	})(jQuery);
}