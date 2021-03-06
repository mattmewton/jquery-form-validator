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
      var ck_phone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
      var ck_address = /^([0-9]{1,6})([\w\s]{3,128})$/;
      var ck_address_apt = /^.{1,128}$/;
      var ck_zip = /^[0-9]{5}$/;

      //if($input.attr(dataSelector) && $input.attr(dataSelector).indexOf('/')) {
        // custom regex always takes precedence
        // cast string to regex
        //var regex = new RegExp( $input.attr(dataSelector).replace(/\/(.*)\//, '$1') );
        //base.testInput($input, regex);
        //console.log('custom regex');
      //} 
      if($input[0].nodeName.toLowerCase() === 'select') {
        // basic select validation
        base.validateSelect($input);
      } else if((inputType === 'text') && ((!$input.attr(dataSelector)) || ($input.attr(dataSelector) === ''))) {
        // basic text validation
        base.testInput($input, ck_name);
      } else if(inputType === 'email') {
        // email validation
        base.testInput($input, ck_email)
      } else if(inputType === 'tel') {
        // phone validation
        base.testInput($input, ck_phone)
      } else if(inputType === 'date') {
        // date validation
        base.testInput($input);
      } else if($input.attr(dataSelector).indexOf('address') >= 0) {
        // address validation
        base.testInput($input, ck_address);
      } else if($input.attr(dataSelector).indexOf('floorSuiteApt') >= 0) {
        // address validation
        base.testInput($input, ck_address_apt);
      } else if($input.attr(dataSelector).indexOf('zip') >= 0) {
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

    validateSelect : function ($select) {
      var base = this;
      var selectID = $select.attr('id');

      if($select !== null && document.getElementById(selectID).selectedIndex > 0){
        base.onFieldValid($select);
        base.checkForm();
        return true;
      } else {
        base.onFieldInvalid($select);
        base.checkForm();
        return false;
      }
    },

    onFieldValid : function ($input) {
      var base = this;

      $input.removeClass(base.options.invalidClass).addClass(base.options.validClass);
      $input.parent().find('> i').remove();
      $input.parent().append('<i class="fa fa-check-circle"></i>');
      $input.removeClass('invalid').addClass('valid');
    },

    onFieldInvalid : function ($input) {
      var base = this;

      $input.removeClass(base.options.validClass).addClass(base.options.invalidClass);
      $input.parent().find('> i').remove();
      $input.parent().append('<i class="fa fa-times-circle"></i>');
      $input.removeClass('valid').addClass('invalid');
    },

    checkForm : function($input) {
      var base = this;

      if(base.$elem.find('.required.valid').length === base.$elem.find('.required').length) {
        document.getElementById(base.options.submitButtonEl).disabled = false;
        base.formValid = true;
      } else {
        document.getElementById(base.options.submitButtonEl).disabled = true;
        base.formValid = false;
      }
    }
  }

  $.fn.formValidator = function (options) {
    var validator = Object.create(Validator);
    validator.init(options, this);
  };

  $.fn.formValidator.options = {
    validClass : 'valid',
    invalidClass : 'invalid',
    requiredClass : 'required',
    formItemClass : 'form-item',
    dataSelector : 'data-validator',
    onFieldValid : false,
    onFieldInvalid : false,
    submitButtonEl : 'submitButton'
  };

})( jQuery, window, document );