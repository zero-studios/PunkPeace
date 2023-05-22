<script>
/**
 * @fileOverview A component to manage input fields
 * @module elements/InputField
 * @property {string}	[type="text"]	the input field type
 * @property {string}	[fieldId="field_`uuid()`"]	the input field ID
 * @property {string}	[name]	the input field name
 * @property {string}	[label="Label"]	the input field label
 * @property {string}	[placeholder=InputField.type]	the input field placeholder attribute
 * @property {boolean}	[validate=null]	enable or disable input field validation
 * @property {integer}	[tabindex=0]	manually override keyboard tabindexing
 */

import { uuid } from "$js/helpers/uuid";

export let type = "text";
export let name;
export let label = "Label";
export let placeholder = type;
export let validate = null;
export let tabindex = 0;

let fieldId = `field_${uuid()}`;
</script>

<div class="input-group">
	<label for={fieldId}>{label}{@html (validate === true) ? `<span>*</span>` : ""}</label>
	<input id={fieldId} name={name || fieldId} placeholder={placeholder} type={type} validate={validate} tabindex={tabindex} />
</div>
