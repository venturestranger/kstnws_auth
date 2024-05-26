const form = document.getElementById("signUpForm");
const regEmailInput = document.getElementById("registerEmail");
const regPasswordInput = document.querySelector("#registerPassword");
const inputRegIcon = document.getElementById("emailRegIcon");
const inputRegPassword = document.getElementById("passwordRegIcon");
const firstNameInput = document.getElementById("nameInput");
const lastNameInput = document.getElementById("surnameInput");
const regPasswordInputValue = document.getElementById("registerPassword").value;
const nameErrorMsg = document.querySelector("#nameErrorMsg");
const nameEmptyErrorMsg = document.querySelector("#nameEmptyErrorMsg");
const emptyEmail = document.querySelector(".regEmptyEmailErrorMsg");
const regPasswordErrorMsg = document.querySelector(".regPasswordErrorMsg");
const emailNotValidMsg = document.querySelector(".regNotValidEmailErr");
const nameErrorMsgLi = nameEmptyErrorMsg.querySelector('li');
const nameCapitalMsg = document.querySelector("#nameCapitalMsg");

const nameRegex = /^([A-Z][a-z]{0,29}|[А-Я][а-яё]{0,29}|[A-Za-z]+)$/;
const emailRegex = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/;

function validateRegisterForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("nameInput").value;
  const lastName = document.getElementById("surnameInput").value;
  const regEmailInputValue = document.getElementById("registerEmail").value;

  

  let isValid = true;


  if (!firstName.trim().match(nameRegex) || !lastName.trim().match(nameRegex)) {
    validateNames();
    isValid = false;
  }

  if (firstName.trim() === "" || lastName.trim() === "") {
    validateNames();
    isValid = false;
  }

  if (regEmailInputValue.trim() === "") {
    validateEmail();
    isValid = false;
  }

  if (!regEmailInputValue.match(emailRegex)) {
    validateEmail();
    emailNotValidMsg.style.display = "block";
    emailNotValidMsg.classList.add("fail");
    regEmailInput.classList.add("inputAdd");
    regEmailInput.style.borderColor = "#ED5454";
    isValid = false;
  } else {
    emailNotValidMsg.style.display = "none";
    validateEmail();
  }

  if (!regPasswordInput.value.match(passwordRegex)) {
    validatePassword();
    isValid = false;
  }

  if (isValid) {
    form.submit();
  }
}

function validatePassword() {
  const requirementsList = document.getElementById('passwordRequirements');
  const requirementItems = requirementsList.getElementsByTagName('li');
  let hasErrors = false;

  function fail(ul) {
    ul.classList.remove('success');
    ul.classList.add('fail');
  }

  function success(ul) {
    ul.classList.remove('fail');
    ul.classList.add('success');
  }

  if (!/(?=.*\d)/.test(regPasswordInput.value)) {
    fail(requirementItems[2]);
    hasErrors = true;
  } else {
    success(requirementItems[2]);
  }

  if (!/(?=.*[A-Z])/.test(regPasswordInput.value)) {
    fail(requirementItems[1]);
    hasErrors = true;
  } else {
    success(requirementItems[1]);
  }

  if (!/^[a-zA-Z0-9]{6,16}$/.test(regPasswordInput.value)) {
    fail(requirementItems[0]);
    hasErrors = true;
  } else {
    success(requirementItems[0]);
  }

  if (!/^[a-zA-Z0-9]+$/.test(regPasswordInput.value)) {
    fail(requirementItems[3]);
    hasErrors = true;
  } else {
    success(requirementItems[3]);
  }

  regPasswordInput.addEventListener('blur', function () {
    requirementsList.style.display = 'none';
    regPasswordInput.classList.remove('inputAdd');
    regPasswordInput.style.borderColor = '#B9B9B9';
  })

  regPasswordInput.addEventListener('click', function () {
    requirementsList.style.display = 'block';
  })

  if (hasErrors) {
    requirementsList.style.display = 'block';
    regPasswordInput.classList.add('inputAdd');
    regPasswordInput.style.borderColor = '#ED5454';
  } else {
    requirementsList.style.display = 'none';
    regPasswordInput.classList.remove('inputAdd');
    regPasswordInput.style.borderColor = '#B9B9B9';
  }
}

function validateEmail() {
  if (regEmailInput.value.trim() === "") {
    emptyEmail.classList.add("fail")
    emptyEmail.classList.remove("success")
    emptyEmail.style.display = "block";
    regEmailInput.classList.add("inputAdd");
    regEmailInput.style.borderColor = "#ED5454";
  } else {
    regEmailInput.classList.remove("inputAdd");
    emptyEmail.style.display = "none";
    regEmailInput.style.borderColor = "#B9B9B9";
    emptyEmail.classList.remove("fail")
  }

  regEmailInput.addEventListener('blur', function () {
    emailNotValidMsg.style.display = "none";
    emptyEmail.style.display = "none";
    regEmailInput.classList.remove("inputAdd");
    regEmailInput.style.borderColor = "#B9B9B9";
  })
}



function eventListinerToNames() {
  firstNameInput.addEventListener('input', validateNames);
  lastNameInput.addEventListener('input', validateNames);
}

form.addEventListener('submit', validateRegisterForm);
regEmailInput.addEventListener('input', validateEmail);
regPasswordInput.addEventListener('input', validatePassword);
firstNameInput.addEventListener('click', eventListinerToNames);
lastNameInput.addEventListener('click', eventListinerToNames);
regEmailInput.addEventListener('click', validateEmail);
regPasswordInput.addEventListener('click', validatePassword);

regEmailInput.addEventListener('input', () => {
  if (regEmailInput.value !== '') {
    inputRegIcon.style.display = 'none';
  } else {
    inputRegIcon.style.display = 'block';
  }
});

regPasswordInput.addEventListener('input', () => {
  if (regPasswordInput.value !== '') {
    inputRegPassword.style.display = 'none';
  } else {
    inputRegPassword.style.display = 'block';
  }
});
