import {
  form, formData, usernameField, emailField, mask, phoneField,
  messageField, classListName, fields, errorText,
} from '../constants/constants';

const emailValidation = (email) => {
  const re = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isRequired = (value) => (value !== '');
const isBetween = (length, min, max) => (!(length < min || length > max));

const showError = (field, message, fieldName) => {
  const formField = field.parentElement;
  formField.classList.remove(classListName.success);
  formField.classList.add(classListName.error);

  const error = formField.querySelector('p');
  error.textContent = message;
  formData[fieldName].error = message;
};

const showSuccess = (field, fieldName) => {
  const formField = field.parentElement;
  formField.classList.remove(classListName.error);
  formField.classList.add(classListName.success);

  const error = formField.querySelector('p');
  error.textContent = '';
  formData[fieldName].error = '';
};

const resetForm = () => {
  form.reset();
  mask.unmaskedValue = '';
  Object.keys(formData).forEach((field) => {
    formData[field].error = '';
  });

  document.querySelectorAll('.form-field').forEach((formField) => {
    formField.classList.remove('error', 'success');
  });
};

const validateUsername = () => {
  const min = 3;
  const max = 25;

  const username = usernameField.value.trim();

  if (!isRequired(username)) {
    showError(usernameField, errorText.required(fields.username), fields.username);
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameField, errorText.range(fields.username, min, max), fields.username);
  } else {
    showSuccess(usernameField, fields.username);
  }
};

const validateEmail = () => {
  const email = emailField.value.trim();

  if (!isRequired(email)) {
    showError(emailField, errorText.required(fields.email), fields.email);
  } else if (!emailValidation(email)) {
    showError(emailField, errorText.valid(fields.email), fields.email);
  } else {
    showSuccess(emailField, fields.email);
  }
};

const validatePhone = () => {
  const phone = mask.unmaskedValue;
  const phoneSize = 12;

  if (!isRequired(phone)) {
    showError(phoneField, errorText.required(fields.phone), fields.phone);
  } else if (phone.length < phoneSize) {
    showError(phoneField, errorText.valid(fields.phone), fields.phone);
  } else {
    showSuccess(phoneField, fields.phone);
  }
};

const validateMessage = () => {
  const min = 5;
  const max = 70;

  const message = messageField.value.trim();

  if (!isRequired(message)) {
    showError(messageField, errorText.required(fields.message), fields.message);
  } else if (!isBetween(message.length, min, max)) {
    showError(messageField, errorText.range(fields.message, min, max), fields.message);
  } else {
    showSuccess(messageField, fields.message);
  }
};

export {
  validateUsername,
  validateEmail,
  validatePhone,
  validateMessage,
  resetForm,
};
