[![npm version](https://badge.fury.io/js/th-react-formbuilder1.svg)](//npmjs.com/package/th-react-formbuilder1)
# th-react-formbuilder1
A complete react form builder that interfaces with a json endpoint to load and save generated forms.
- Upgraded to React 16.4.1
- Use react-dnd for Drag & Drop
- Save form data with dummy api server
- Show posted data on readonly form


![](screenshot.png)

### Editing Items
![](screenshot2.png)

# Basic Usage

```javascript
var React = require('react');
var FormBuilder = require('th-react-formbuilder1');

React.render(
  <FormBuilder.ReactFormBuilder />,
  document.body
)

/// For Previe Form link ver1.2.2
React.render(
  <FormBuilder.DemoBar />,
  document.body
)
```

# Props

```javascript
var items = [{
  key: 'Header',
  name: 'Header Text',
  icon: 'fa fa-header',
  static: true,
  content: 'Placeholder Text...'
},
{
  key: 'Paragraph',
  name: 'Paragraph',
  static: true,
  icon: 'fa fa-paragraph',
  content: 'Placeholder Text...'
}];

const existingItems = function () {
  console.log('onLoad');
  return new Promise((resolve, reject) => {
    return resolve([
      {
        allowDelete: false,
        "id": "DEA93ED6-54AE-4F4F-A785-E76F75C11006",
        "element": "Camera",
        "text": "Camera",
        "required": false,
        "fieldName": "camera_2DFCB94D-A736-4CD2-89E9-42CFD9A51A75",
        "label": "Placeholder Label"
      },
      {
        "id": "842D09B3-5235-4C63-914A-A84143787148",
        "element": "Camera",
        "text": "Camera",
        "required": false,
        "fieldName": "camera_5464E5DA-422B-41D6-9663-1B52668D025E",
        "label": "Placeholder Label"
      },
    ]);
  });
};

// function to get field list data from form builder
getData(e) {
  this.setState({ fieldsList: e });
}

// function to get field list data from form builder database
getList(fieldsList) {
  return new Promise((resolve, reject) => {
    return resolve(this.state.fieldsList)
  })
}

<FormBuilder.ReactFormBuilder
  url='path/to/GET/initial.json'
  toolbarItems={items}
  onLoad={existingItems || () => this.getList(this.state.fieldsList)}
  onPost={(e) => this.getData(e)}
  saveUrl='path/to/POST/built/form.json' />
```

### Form Params

Name | Type | Required? | Description
--- | --- | --- | ---
url | string | Optional | URL path of list of existing fields. Eg. ->path/to/GET/initial.json
toolbarItems | string | Optional | Verb used in the form submission.
saveUrl | string | Optional | Defines form submit button text.  Defaults to "Submit"
onLoad | function | optional | Invoke when rendering form Preview component.
onPost | function | optional | Invoke when submit data, if exists will override form post.


# React Form Generator
Now that a form is built and saved, let's generate it from the saved json.

```javascript
var React = require('react');
var FormBuilder = require('th-react-formbuilder1');

let answerData = {
    "text_input_DEA657C9-4404-4A16-A935-9D9E4E235D6E" : "Test Value",
    "text_input_DEA657C9-2345-4A16-A935-9D9E4E235D6E" : "Another Test Value",
};


React.render(
  <FormBuilder.ReactFormGenerator
    form_action="/path/to/form/submit"
    form_method="POST"
    onSubmit={}
    task_id={12} // Used to submit a hidden variable with the id to the form from the database.
    answer_data={answerData} // Answer data, only used if loading a pre-existing form with values.
    authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
  />,
  document.body
)
```

### Form Params

Name | Type | Required? | Description
--- | --- | --- | ---
form_action | string | Required | URL path to submit the form
form_method | string | Required | Verb used in the form submission.
action_name | string | Optional | Defines form submit button text.  Defaults to "Submit"
onSubmit | function | optional | Invoke when submit data, if exists will override form post.
back_action | string | Optional | URL path to go back if needed.
back_name | string | Optional | Button text for back action.  Defaults to "Cancel".
task_id | integer | Optional | User to submit a hidden variable with id to the form on the backend database.
answer_data | array | Optional | Answer data, only used if loading a pre-existing form with values.
authenticity_token | string | Optional | If using Rails and need an auth token to submit form.
hide_actions | boolean | Optional | If you would like to hide the submit / cancel buttons set to true.
skip_validations | boolean | Optional | Suppress form validations on submit, if set to true.
read_only | boolean | Optional | Shows a read only version which has fields disabled and removes "required" labels.
variables | object | Optional | Key/value object that can be used for Signature variable replacement.

### Read only Signatures

Read only signatures allow you to use a saved/canned signature to be placed into the form. The signature will be passed in through the `variables` property to `ReactFormGenerator` and `ReactFormBuilder`.

To use a read only signature, choose the "Read only" option and enter the key value of the variable that will be used to pass in the signature.

![](screenshot3.png)

The signature data should be in base 64 format.

There is a `variables.js` file that contains a sample base 64 signature. This variable is passed into the demo builder and generator for testing. Use the variable key "JOHN" to test the variable replacement.

# Vendor Dependencies
In order to make the form builder look pretty, there are a few dependencies other than React.  See the example code in index.html for more details.

- Bootstrap
- FontAwesome
- Primereact

# SASS
All relevant styles are located in css/application.css.scss.

# Develop
```bash
$ npm install
$ npm run build:dist
$ npm run serve:api
$ npm start
```
Then navigate to http://localhost:8080/ in your browser and you should be able to see the form builder in action.
<a href="https://fixjobsalert.com/nhm-punjab-cho-result-cut-off/">Result 2021</a>

# Tests
```bash
$ npm test
```
Test is not working at this moment.
