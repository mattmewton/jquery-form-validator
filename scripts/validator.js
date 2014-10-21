if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

(function ($, window, document) {

  var Validator = {
    init : function (options, el) {
      var base = this;

      base.$elem = $(el);
      base.options = $.extend({}, $.fn.formValidator.options, base.$elem.data(), options);

      base.userOptions = options;
      base.setVars();
    },

    setVars : function() {
      var base = this;

      if (base.$elem.children().length === 0) {return false; }
      
      // TODO :: Use this variable to hook into custom user functions on valid form
      base.formValid = false;
      base.$formItems = base.$elem.find('.' + base.options.formItemClass);
      base.$requiredFormItems = base.$formItems.hasClass(base.options.requiredSelector);

      // initialize base functions
      base.checkInputType();
    },

    checkInputType : function () {
      var base = this;

      base.$formItems.each(function(){
        var $input = $(this);
        $input.change(function() {
          base.validateInput($input);
        });
      });
    },

    validateInput : function ($input) {
      var base = this;
      var dataSelector = base.options.dataSelector;
      var inputType = $input.attr('type');
      
      // input regex
      var ck_name = /^[A-Za-z ]{2,128}$/;
      var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      var ck_address = /^([0-9]{1,6})([\w\s]{3,128})$/;
      var ck_zip = /^[0-9]{5}$/;
      //var ck_phone = /^\(\d{3}\)\ \d{3}-\d{4}$/;
      //var ck_address = /^[0-9]{1,8}$/;
      //var ck_appt = /^[A-Za-z0-9 ]{0,128}$/;
      //var ck_phone = /^\d{3}-\d{3}-\d{4}$/;
      //var ck_ssn = /^\d{3}-\d{2}-\d{4}$/;

      console.log($input.attr(dataSelector));

      if((inputType === 'text') && ((!$input.attr(dataSelector)) || ($input.attr(dataSelector) === ''))) {
        // basic text validation
        console.log('basic text');
        base.testInput($input, ck_name);
      } else if(inputType === 'email') {
        // email validation
        base.testInput($input, ck_email)
      } else if(inputType === 'date') {
        // date validation
        base.testInput($input);
      } else if(dataSelector.indexOf('address')) {
        // address validation
        base.testInput($input, ck_address)
      } else if(dataSelector.indexOf('zip')) {
        // zip code validation
        base.testInput($input, ck_zip)
      } else {
        // more options to come
      }
    },

    testInput : function ($input, validationType) {
      var base = this;
      var inputVal = $input.val();
      
      if(!validationType.test(inputVal)) {
        base.onFieldInvalid($input);
        base.checkForm();
        return false;
      } else {
        base.onFieldValid($input);
        base.checkForm();
        return true;
      } 
    },

    /*validateSelect : function ($input) {
      var base = this;

    },*/

    onFieldValid : function ($input) {
      var base = this;

      $input.removeClass(base.options.invalidClass).addClass(base.options.validClass);
      // default logic to go here
    },

    onFieldInvalid : function ($input) {
      var base = this;

      $input.removeClass(base.options.validClass).addClass(base.options.invalidClass);
      // default logic to go here
    },

    checkForm : function($input) {
      var base = this;

      if(base.$elem.find('.valid').length === base.$elem.find('.required').length) {
        document.getElementById(base.options.submitButtonEl).disabled = false;
        base.formValid = true;
      } else {
        document.getElementById(base.options.submitButtonEl).disabled = true;
        base.formValid = false;
      }
    }

    /*onFormValid : function () {
      var base = this;
      // default logic to go here
    },

    onFormInvalid : function () {
      var base = this;
      // default logic to go here
    } */
  }

  $.fn.formValidator = function (options) {
    var validator = Object.create(Validator);
    console.log(validator);
    validator.init(options, this);
  };

  $.fn.formValidator.options = {
    validClass : 'valid',
    invalidClass : 'invalid',
    requiredClass : 'required',
    formItemClass : 'validator-item',
    dataSelector : 'data-validator',
    // TODO :: Add functionality for infinite input wrappers
    //inputWrappers : false,
    //inputWrapParentLevel : 1,
    onFieldValid : false,
    onFieldInvalid : false,
    submitButtonEl : 'submitButton',
    // TODO :: Implement HTML5 required attribute option
    // useHTML5RequiredAttribute : false
    // TODO :: Add hooks so users can write custom AJAX calls after form is valid
    onFormValid : false // Note, this is currently not doing anything
    // onFormInvalid : false
  };

})( jQuery, window, document );