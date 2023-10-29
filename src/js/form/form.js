import axios from 'axios';
import {
  validateUsername, validateEmail, validatePhone, validateMessage, resetForm,
} from '../validation/validation';
import {
  form, formResponse, formData, requestEnv, classListName,
  formResponseErrorText, fields, submitButton,
} from '../constants/constants';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateUsername();
  validateEmail();
  validatePhone();
  validateMessage();

  const formStatus = Object.values(formData).every((value) => !value.error);

  if (formStatus) {
    const successDataForSend = {
      status: 'success',
      msg: 'Ваша заявка успешно отправлена',
    };

    submitButton.classList.add(classListName.buttonLoading);
    submitButton.disabled = true;

    axios.post(requestEnv, successDataForSend)
      .then((response) => {
        formResponse.classList.add(classListName.success);
        formResponse.textContent = response.data.message;
        resetForm();
      })
      .catch(() => {
        formResponse.classList.add(classListName.error);
        formResponse.textContent = formResponseErrorText;
      })
      .finally(() => {
        submitButton.classList.remove(classListName.buttonLoading);
        submitButton.disabled = false;
      });
  } else {
    const errorFields = Object.assign({}, ...Object.keys(formData)
      .filter((field) => formData[field].error)
      .map((errorField) => ({
        [errorField]: formData[errorField].error,
      })));

    const errorDataForSend = {
      status: 'error',
      fields: errorFields,
    };

    axios.post(requestEnv, errorDataForSend)
      .catch(() => {});
  }
});

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

form.addEventListener('input', debounce((e) => {
  switch (e.target.id) {
    case fields.username:
      validateUsername();
      break;
    case fields.email:
      validateEmail();
      break;
    case fields.phone:
      validatePhone();
      break;
    case fields.message:
      validateMessage();
      break;
    default:
  }
}));
