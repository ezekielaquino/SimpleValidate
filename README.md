# SIMPLEVALIDATE (a.k.a VALIDATE3000)

Simple form validation that also exposes your user's shortcomings :D


## Features

- Validates all types of inputs
- Also validates emails and URL formatting
- Outputs which inputs are invalid
- Returns a promise


## How to

Simple: pass in a form element into `Validate()`. It will loop through all inputs and selects and returns a promise. If there's an error, then it will return the names of the inputs as an array; otherwise it will return the form data as an object.

```html
    <!-- You can specify min/max length via data-attributes -->
    <fieldset>
        <label>Some input label</label>
        <input type="text" name="Input" data-minlength="5" data-maxlength="15">
    </fieldset>
```

```js
    const form = document.querySelector('form');
    const submit = form.querySelector('button');
    const errors = form.querySelector('.errors');

    submit.addEventListener('click', function(event) {
        event.preventDefault();

        Validate(form)
            .then((data) => {
                // VALID! Do stuff here like...
                // AJAX away the data, etc.
                console.log(JSON.stringify(data));
            })
            .catch((error) => {
                // INVALID! You get back an array of invalid input names
                errors.innerHTML = error.join(', ');
            });
    });
```