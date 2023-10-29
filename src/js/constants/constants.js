import IMask from 'imask';

const form = document.querySelector('#sign-up');
const usernameField = document.querySelector('#username');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const messageField = document.querySelector('#message');
const submitButton = document.querySelector('.submit-button');
const formResponse = document.querySelector('.form-response');

const requestEnv = 'http://localhost:9090/api/registration';

const maskOptions = {
  mask: '+{375} (00)000-00-00',
  lazy: false,
  placeholder: '+375',
};
const mask = IMask(phoneField, maskOptions);

const fields = {
  username: 'username',
  email: 'email',
  phone: 'phone',
  message: 'message',
};

const formData = {
  [fields.username]: {
    error: '',
  },
  [fields.email]: {
    error: '',
  },
  [fields.phone]: {
    error: '',
  },
  [fields.message]: {
    error: '',
  },
};

const classListName = {
  error: 'error',
  success: 'success',
  buttonLoading: 'button-loading',
};

const errorText = {
  required: (fieldName) => (`${fieldName} cannot be blank`),
  range: (fieldName, min, max) => `${fieldName} must be between ${min} and ${max} characters`,
  valid: (fieldName) => `${fieldName} is not valid`,
};

const formResponseErrorText = 'Something went wrong. Please try again later';

const emailRegexp = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

export {
  form,
  maskOptions,
  emailRegexp,
  usernameField,
  emailField,
  phoneField,
  mask,
  messageField,
  formResponse,
  formData,
  requestEnv,
  classListName,
  formResponseErrorText,
  fields,
  errorText,
  submitButton,
};
