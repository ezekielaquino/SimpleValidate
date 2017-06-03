/**
 * SIMPLEVALIDATOR (AKA VALIDATOR3000)
 * http://github.com/ezekielaquino/SimpleValidator
 * Simple form validator that also exposes your user's shortcomings
 * MIT License
 */

(function() {
  'use strict';


  window.Validate = function(form) {
    const formInputs = [...inputs, ...selects];
    const formData = {};
    const errors = new Set([]);

    const Validation = new Promise((resolve, reject) => {
      for (const input of formInputs) {
        const key = input.getAttribute('name');
        const type = input.getAttribute('type') || input.tagName;

        if (type !== 'submit') {
          if (type === 'radio' || type === 'checkbox') {
            if (input.checked) {
              formData[key] = input.value;
            }
          } else if (type === 'SELECT') {
            formData[key] = input.options[input.selectedIndex].text;
          } else if (type === 'email') {
            if (_validateEmail(input.value)) formData[key] = input.value;
          } else if (type === 'url') {
            if (_validateURL(input.value)) formData[key] = input.value;
          } 
          else {
            if (input.value.length && _checkLength(input)) formData[key] = input.value;
          }

          if (formData[key]) errors.delete(key);
          else if (!errors.has(key)) errors.add(key);
        }
      }

      if (errors.size) reject(Array.from(errors));
      else resolve(formData);
    });

    return Validation;
  }


  function _checkLength(input) {
    const min = parseInt(input.dataset.minlength) || 0;
    const max = parseInt(input.dataset.maxlength) || 0;

    if (min && !max) return input.value.length > min;
    else if (!min && max) return input.value.length < max;
    else return input.value.length > min && input.value.length < max;
  }

  function _validateEmail(email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  }

  function _validateURL(url) {
    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return Boolean(res);
  }


})();