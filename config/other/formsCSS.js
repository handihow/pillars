var customCSS = {
			"root": "ui container",
			"container": "ui form",
			"header": "ui blue header",
			"body": "",
			"bodyEmpty": "",
			"footer": "",
			"navigationButton": "ui button",
			"completedPage": "",
			"navigation": {
				"complete": "ui right floated primary button",
				"prev": "ui button",
				"next": "ui right floated primary button",
				"start": "ui positive large button"
			},
			"progress": "ui progress small success",
			"progressBar": "bar",
			"progressTextUnderBar": "label",
			"page": {
				"root": "",
				"title": "",
				"description": ""
			},
			"pageTitle": "ui center aligned large header",
			"pageDescription": "ui sub header",
			"row": "fields",
			"question": {
				"mainRoot": "field",
				"flowRoot": "",
				"header": "",
				"headerLeft": "",
				"content": "",
				"contentLeft": "",
				"titleLeftRoot": "",
				"title": "",
				"number": "",
				"description": "",
				"descriptionUnderInput": "",
				"requiredText": "",
				"comment": "",
				"required": "",
				"titleRequired": "",
				"hasError": "",
				"indent": 20,
				"formGroup": ""
			},
			"panel": {
				"title": "sv_p_title",
				"titleExpandable": "sv_p_title_expandable",
				"icon": "sv_panel_icon",
				"iconExpanded": "sv_expanded",
				"description": "small sv_p_description",
				"container": "sv_p_container"
			},
			"error": {
				"root": "ui negative message",
				"icon": "exclamation circle icon",
				"item": "",
				"locationTop": "sv_qstn_error_top",
				"locationBottom": "sv_qstn_error_bottom"
			},
			"boolean": {
				"root": "",
				"item": "ui buttons",
				"control": "sv-visuallyhidden",
				"itemChecked": "",
				"itemIndeterminate": "",
				"itemDisabled": "",
				"switch": "or",
				"slider": "",
				"label": "ui button",
				"disabledLabel": "disabled"
			},
			"checkbox": {
				"root": "ui radio checkbox",
				"item": "ui radio checkbox",
				"itemChecked": "ui radio checkbox",
				"itemInline": "ui radio checkbox",
				"itemControl": "ui radio checkbox",
				"itemDecorator": "sv-hidden",
				"label": "",
				"labelChecked": "",
				"controlLabel": "",
				"materialDecorator": "checkbox-material",
				"other": "sv_q_checkbox_other form-control",
				"column": "sv_q_select_column"
			},
			"comment": "form-control",
			"dropdown": {
				"root": "",
				"control": "ui fluid dropdown",
				"other": ""
			},
			"html": {
				"root": ""
			},
			"matrix": {
				"root": "ui celled table",
				"label": "sv_q_m_label",
				"itemChecked": "positive",
				"itemDecorator": "sv-hidden",
				"cellText": "sv_q_m_cell_text",
				"cellTextSelected": "positive",
				"cellLabel": "sv_q_m_cell_label"
			},
			"matrixdropdown": {
				"root": "table"
			},
			"matrixdynamic": {
				"root": "table",
				"button": "button",
				"buttonAdd": "",
				"buttonRemove": "",
				"iconAdd": "",
				"iconRemove": ""
			},
			"paneldynamic": {
				"root": "",
				"navigation": "sv-paneldynamic__navigation",
				"progressTop": "sv-paneldynamic__progress sv-paneldynamic__progress--top",
				"progressBottom": "sv-paneldynamic__progress sv-paneldynamic__progress--bottom",
				"title": "sv-title sv-question__title",
				"button": "ui button",
				"buttonAdd": "ui small positive button",
				"buttonRemove": "ui tiny negative button",
				"buttonPrev": "ui button",
				"buttonNext": "ui primary button",
				"progressContainer": "sv-paneldynamic__progress-container",
				"progress": "sv-progress",
				"progressBar": "sv-progress__bar",
				"progressText": "sv-paneldynamic__progress-text"
			},
			"multipletext": {
				"root": "table",
				"itemTitle": "",
				"itemValue": "sv_q_mt_item_value form-control"
			},
			"radiogroup": {
				"root": "inline fields",
				"item": "field",
				"itemChecked": "checked",
				"itemInline": "ui radio checkbox",
				"label": "",
				"labelChecked": "",
				"itemControl": "",
				"itemDecorator": "sv-hidden",
				"controlLabel": "radiogroup__label",
				"materialDecorator": "circle",
				"other": "sv_q_radiogroup_other form-control",
				"clearButton": "sv_q_radiogroup_clear button",
				"column": ""
			},
			"imagepicker": {
				"root": "sv_imgsel",
				"item": "sv_q_imgsel",
				"itemChecked": "checked",
				"itemInline": "sv_q_imagepicker_inline",
				"label": "sv_q_imgsel_label",
				"itemControl": "sv_q_imgsel_control_item",
				"image": "sv_q_imgsel_image",
				"itemText": "sv_q_imgsel_text",
				"clearButton": "sv_q_radiogroup_clear"
			},
			"rating": {
				"root": "ui buttons",
				"item": "ui toggle button",
				"selected": "active",
				"minText": "sv_q_rating_min_text",
				"itemText": "sv_q_rating_item_text",
				"maxText": "sv_q_rating_max_text",
				"disabled": ""
			},
			"text": "form-control",
			"expression": "form-control",
			"file": {
				"root": "sv_q_file",
				"placeholderInput": "sv_q_file_placeholder",
				"preview": "sv_q_file_preview",
				"removeButton": "sv_q_file_remove_button",
				"fileInput": "sv_q_file_input",
				"removeFile": "sv_q_file_remove",
				"removeFileSvg": "sv-hidden",
				"fileDecorator": "sv-hidden",
				"fileSignBottom": "sv-hidden",
				"removeButtonBottom": "sv-hidden"
			},
			"saveData": {
				"root": "",
				"saving": "alert alert-info",
				"error": "alert alert-danger",
				"success": "alert alert-success",
				"saveAgainButton": ""
			},
			"window": {
				"root": "modal-content",
				"body": "modal-body",
				"header": {
					"root": "modal-header panel-title",
					"title": "pull-left",
					"button": "glyphicon pull-right",
					"buttonExpanded": "glyphicon pull-right glyphicon-chevron-up",
					"buttonCollapsed": "glyphicon pull-right glyphicon-chevron-down"
				}
			}
		}

module.exports = customCSS;