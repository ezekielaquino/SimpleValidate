/**
 * SIMPLEVALIDATOR (AKA VALIDATOR3000)
 * http://github.com/ezekielaquino/SimpleValidate
 * Simple form validator that also exposes your user's shortcomings
 * MIT License
 */

(function() {
  'use strict';


  window.Validate = function(form) {
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const textareas = form.querySelectorAll('textarea');
    const formInputs = [...inputs, ...selects, ...textareas];
    const formData = {};
    const errors = new Set([]);
    const errorInputs = new Set([]);

    const Validation = new Promise((resolve, reject) => {
      for (const input of formInputs) {
        const key = input.getAttribute('name');
        const name = input.dataset.name || key;
        const type = input.getAttribute('type') || input.tagName;

        if (type !== 'submit') {
          if (type === 'radio' || type === 'checkbox') {
            if (input.checked) {
              formData[key] = input.value;
            }
          } else if (type === 'SELECT') {
            const option = input.options[input.selectedIndex];
            if (option.value.length && !option.disabled) formData[key] = option.value;
          } else if (type === 'email') {
            if (_validateEmail(input.value)) formData[key] = input.value;
          } else if (type === 'url') {
            if (_validateURL(input.value)) formData[key] = input.value;
          } 
          else {
            if (_checkLength(input)) formData[key] = input.value;
          }

          if (formData[key]) {
            errors.delete(name)
            errorInputs.delete(input);
          } else if (input.hasAttribute('required') && !input.dataset.ignore) {
            if (!errors.has(key)) errors.add(name);
            errorInputs.add(input);
          }
        }
      }

      if (errors.size) reject({ names: Array.from(errors), inputs: Array.from(errorInputs) });
      else resolve(formData);
    });

    return Validation;
  }


  function _checkLength(input) {
    const min = parseInt(input.dataset.minlength) || 0;
    const max = parseInt(input.dataset.maxlength) || 0;

    if (min && !max) return input.value.length > min;
    else if (!min && max) return input.value.length < max;
    else return input.value.length > 0;
  }

  function _validateEmail(email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  }

  function _validateURL(url) {
    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return Boolean(res);
  }


})();