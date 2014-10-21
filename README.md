This plugin is an alternative for developers who don't want to rely on every aspect of the HTML5 Constraint API, or who have clients that want more stylistic customization requirements for cross-brower / cross-device and don't want to rely on HTML5 base browser styles.


1. How it works

The plugin checks each child input of your form and adds either a valid or invalid class to the input. 

There are a few predefined validation regex strings available to you. We will be adding more in the future, as well as the ability to add your own custom regexes. 


2. Plugin instantiation

The plugin can be instantiated as follows:

$('#myForm').formValidator({
	// user options go here	
});


3. Invoking the custom input validation regex strings.

a. The plugin handles text inputs, email inputs off the bat.

<input type="text" class="form-item" value="" placeholder="" />

b. Utilize the dataSelector to validate address and zip codes. Example as follows:

<input type="text" class="form-item" data-validator="address" value="" placeholder="Address" />
<input type="text" class="form-item" data-validator="zip" value="" placeholder="Zip" />


c. Use the required class to specify whether the input is required or not. Example as follows:

<input type="text" class="form-item required" data-validator="address" value="" placeholder="Address" />

d. Make sure your submit button is disabled. Example as follows:

<input type="submit" id="submitButton" disabled />

e. If the amount of valid inputs matches the amount of required inputs, your submit button will become enabled automatically.


4. Customization options

validClass: 		Allows you to set the name of the valid class
invalidClass: 	Allows you to set the name of the invalid class
requiredClass:	Allows you to set the name of the required class
formItemClass:	Set the name of the form item class.
dataSelector:		This is the name of the data attribute you can utilize to specify more complex input types.
submitButtonEl:	The ID of the submit button.


5. Plugin defaults

$.fn.formValidator.options = {
  validClass : 'valid',
  invalidClass : 'invalid',
  requiredClass : 'required',
  formItemClass : 'form-item',
  dataSelector : 'data-validator',
  submitButtonEl : 'submitButton',
};
