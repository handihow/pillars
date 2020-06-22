var customCSS = {
			"root": "ui container",
			"container": "ui form",
			"header": "ui blue header",
			"body": "",
			"bodyEmpty": "",
			"footer": "",
			"navigationButton": "ui large button",
			"completedPage": "",
			"navigation": {
				"complete": "ui right floated positive large button",
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
				"mainRoot": "ui padded raised yellow segment animated fadeIn slow",
				"flowRoot": "sv_q_flow sv_qstn",
				"header": "question-header",
				"headerLeft": "title-left",
				"content": "",
				"contentLeft": "content-left",
				"titleLeftRoot": "sv_qstn_left",
				"title": "",
				"number": "sv_q_num",
				"description": "small",
				"descriptionUnderInput": "small",
				"requiredText": "sv_q_required_text",
				"comment": "form-control",
				"required": "",
				"titleRequired": "",
				"hasError": "has-error",
				"indent": 20,
				"formGroup": "form-group"
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
				"item": "ui large buttons",
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
				"control": "form-control",
				"other": "sv_q_dd_other form-control"
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
				"button": "button",
				"buttonAdd": "button sv-paneldynamic__add-btn",
				"buttonRemove": "button sv-paneldynamic__remove-btn",
				"buttonPrev": "sv-paneldynamic__prev-btn",
				"buttonNext": "sv-paneldynamic__next-btn",
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
				"root": "imagepicker__container",
				"item": "imagepicker",
				"itemChecked": "checked",
				"itemInline": "",
				"label": "",
				"itemControl": "",
				"image": "ui fluid image",
				"itemText": "",
				"clearButton": "ui basic red button"
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