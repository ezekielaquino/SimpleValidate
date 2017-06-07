# SIMPLEVALIDATE (a.k.a VALIDATE3000)

Simple form validation that also exposes your user's shortcomings :D

[GET VALIDATING! -> DEMO](https://ezekielaquino.github.io/SimpleValidate/)

## Features

- Validates all types of inputs
- Also validates emails and URL formatting
- Outputs which inputs are invalid
- Returns a promise


## How to

`npm install simplevalidate` or just include the appropriate scripts.

Simple: pass in a form element into `Validate()`. It will loop through all inputs and selects and returns a promise. If there's an error, then it will return the names of the inputs as an array; otherwise it will return the form data as an object.

If there's an error it will return an object like so: try it yourself, console log the errors!

```json
    {
        names: ["error-input-name1", "error-input-name2"],
        inputs: [inputDomNode, inputDomNode]
    }
```

### Example usage

```html
    <!-- You can specify the following with data attributes:
        data-minlength -> minimum number of characters
        data-maxlneght -> maximum number of characters
        data-name -> The label/name of the error, otherwise [name] will be used
        required -> if omitted, ignore field validation

        NOTE:
        add `novalidate` to form to disable native html5 validation
     -->
    <fieldset>
        <label>Some input label</label>
        <input type="text" name="input" data-name="Some input" data-minlength="5" data-maxlength="15">
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
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
            })
            .catch((errors) => {
                // INVALID! You get back an array of invalid input names
                for (const input of errors.inputs) {
                    input.classList.add('is-error');

                    // add some class to the parent <fieldset>
                    input.parentElement.classList.add('whoa-this-input-got-an-error');
                }

                document.querySelector('errorMsg').innerHTML = errors.names.join(', ');
            });
    });
```