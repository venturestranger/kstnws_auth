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

const anotherOptionsDiv = document.querySelector(".anotherOptions");

const nameRegex = /^[A-ZА-Я][a-zа-я]{0,29}$/;
const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/;

function validateRegisterForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("nameInput").value;
  const lastName = document.getElementById("surnameInput").value;
  const regEmailInputValue = document.getElementById("registerEmail").value;

  let isValid = true;


  if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
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

form.addEventListener('submit', validateRegisterForm);

function validatePassword() {
  const requirementsList = document.getElementById('passwordRequirements');
  const requirementItems = requirementsList.getElementsByTagName('li');
  let hasErrors = false;

  // Проверка каждого требования пароля
  if (!/(?=.*\d)/.test(this.value)) {
    requirementItems[2].classList.remove('success');
    requirementItems[2].classList.add('fail');
    hasErrors = true;
  } else {
    requirementItems[2].classList.remove('fail');
    requirementItems[2].classList.add('success');
  }

  if (!/(?=.*[A-Z])/.test(this.value)) {
    requirementItems[1].classList.remove('success');
    requirementItems[1].classList.add('fail');
    hasErrors = true;
  } else {
    requirementItems[1].classList.remove('fail');
    requirementItems[1].classList.add('success');
  }

  if (!/^[a-zA-Z0-9]{6,16}$/.test(this.value)) {
    requirementItems[0].classList.remove('success');
    requirementItems[0].classList.add('fail');
    hasErrors = true;
  } else {
    requirementItems[0].classList.remove('fail');
    requirementItems[0].classList.add('success');
  }

  if (!/^[a-zA-Z0-9]+$/.test(this.value)) {
    requirementItems[3].classList.remove('success');
    requirementItems[3].classList.add('fail');
    hasErrors = true;
  } else {
    requirementItems[3].classList.remove('fail');
    requirementItems[3].classList.add('success');
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

regPasswordInput.addEventListener('input', validatePassword);

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

regEmailInput.addEventListener('input', validateEmail);

function eventListinerToNames() {
  firstNameInput.addEventListener('input', validateNames);
  lastNameInput.addEventListener('input', validateNames);
}


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