// select element
const btnContainer = document.querySelector('.btn__container');
const backgroundColorMove = document.querySelector('.background-color');
const btnLogin = document.querySelector('.form__login');
const btnRegister = document.querySelector('.form__registration');
const LoginForm = document.querySelector('.form__login');
const RegisterForm = document.querySelector('.form__registration');
const usernameLogin = document.querySelector('.form__username--login');
const passwordLogin = document.querySelector('.form__password--login');
const usernameRegister = document.querySelector('.form__username--register');
const emailRegister = document.querySelector('.form__email--register');
const passwordRegister = document.querySelector('.form__password--register');
const confirmRegister = document.querySelector('.confirm__password--register');
const btnShow = document.querySelectorAll('.btn--show');

// get username from local storage
const usernameStorage = localStorage.getItem('username') || '';
const passwordStorage = localStorage.getItem('password') || '';

// add event lister to btnContainer to select btn--login and btn-registration using event delegation
btnContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn--login')) {
    backgroundColorMove.style.transform = 'translateX(0%)';
    btnLogin.style.transform = 'translateX(0%)';
    btnRegister.style.transform = 'translateX(120%)';
  }
  if (e.target.classList.contains('btn--registration')) {
    backgroundColorMove.style.transform = 'translateX(100%)';
    btnLogin.style.transform = 'translateX(-120%)';
    btnRegister.style.transform = 'translateX(0%)';
  }
});

// render error message
const renderError = function (input, message) {
  const formGroup = input.closest('.form__input-group');
  input.classList.add('error');
  input.classList.remove('success');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.classList.add('visible');
  errorMessage.textContent = message;
};

// render success
const renderSuccess = function (input) {
  const formGroup = input.closest('.form__input-group');
  input.classList.remove('error');
  input.classList.add('success');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.classList.remove('visible');
};

// convert input name first alphabet to upper case
const convertInputFirstAlphabet = function (input) {
  return input.name.replace(input.name[0], input.name[0].toUpperCase());
};

// check if the input are not empty string
const checkInputField = function (inputArr) {
  inputArr.forEach(el => {
    if (el.value === '') {
      renderError(el, `${convertInputFirstAlphabet(el)} is required`);
    } else {
      renderSuccess(el);
    }
  });
};

// refactoring checkUsernameLength function
const refactorUsernameMessage = function (input, length) {
  renderError(
    input,
    `${convertInputFirstAlphabet(input)} must be at least ${length} characters`
  );
};

// check for username length
const checkUsernameLength = function (input, min, max) {
  if (input.value.length < min) {
    refactorUsernameMessage(input, min);
  } else if (input.value.length > max) {
    refactorUsernameMessage(input, max);
  } else {
    // set username value to local storage
    localStorage.setItem('username', input.value);
  }
};

// validate email
const validateEmail = function (email) {
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegEx.test(email.value);
};

// check if the email is correct
const checkEmail = function (email) {
  if (!validateEmail(email)) {
    renderError(email, `${convertInputFirstAlphabet(email)} is not valid`);
  }
};

// check if the password length is greater than 6
const checkPasswordLength = function (password, min) {
  if (password.value.length < min) {
    renderError(
      password,
      `${convertInputFirstAlphabet(password)} must be at least 6 charcters`
    );
  } else {
    // set password value to local storage
    localStorage.setItem('password', password.value);
  }
};

// check if the password and confirm password are equal
const checkPasswordEqual = function (input1, input2) {
  if (input1.value !== input2.value) {
    renderError(input2, 'Passowrd are not the same');
  }
};

// check if the usernamelogin is equal to the usernameStorage
const checkInputValueEqualStorage = function (input1, input2) {
  if (input1.value !== input2) {
    renderError(input1, `${convertInputFirstAlphabet(input1)} does not exist`);
  }
};

// add event listners to btnLoginForm
LoginForm.addEventListener('submit', function (e) {
  // prevent form from submitting
  e.preventDefault();

  checkInputField([usernameLogin, passwordLogin]);
  checkInputValueEqualStorage(usernameLogin, usernameStorage);
  checkInputValueEqualStorage(passwordLogin, passwordStorage);
});

// add event listners to btnRegisterForm
RegisterForm.addEventListener('submit', function (e) {
  // prevent form from submitting
  e.preventDefault();

  checkInputField([
    usernameRegister,
    emailRegister,
    passwordRegister,
    confirmRegister,
  ]);
  checkUsernameLength(usernameRegister, 5, 15);
  checkEmail(emailRegister);
  checkPasswordLength(passwordRegister, 6);
  checkPasswordEqual(passwordRegister, confirmRegister);
});

// show password
btnShow.forEach(el => {
  el.addEventListener('click', function (e) {
    // prevent form from submitting
    e.preventDefault();

    // select current element
    const formControl = e.target.closest('.form__control');
    const password = formControl.querySelector('.password');
    const iconShow = formControl.querySelector('.icon--show');
    // get password type dynamically
    const type =
      password.getAttribute('type') === 'password' ? 'text' : 'password';

    // set password type to the type we are getting dynamically
    password.setAttribute('type', type);

    // generate html markup to change the password icon dynamically
    const markUp = `
        <use xlink:href="img/icons.svg#icon-eye${
          type === 'password' ? '-hidden' : ''
        }"></use>
      `;
    // set iconShow to empty string
    iconShow.innerHTML = '';
    // insert the markup to iconShow
    iconShow.insertAdjacentHTML('afterbegin', markUp);
  });
});
