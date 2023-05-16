const form = document.getElementById("signUpForm");
const regEmailInput = document.getElementById("registerEmail");
const regPasswordInput = document.querySelector("#registerPassword");
const inputRegIcon = document.getElementById("emailRegIcon");
const inputRegPassword = document.getElementById("passwordRegIcon");
const firstNameInput = document.getElementById("nameInput");
const lastNameInput = document.getElementById("surnameInput");
const regPasswordInputValue = document.getElementById("registerPassword").value;
const nameErrorMsg = document.querySelector(".nameErrorMsg");
const regEmailErrorMsg = document.querySelector(".regEmailErrorMsg");
const regPasswordErrorMsg = document.querySelector(".regPasswordErrorMsg");

const anotherOptionsDiv = document.querySelector(".anotherOptions");

const nameRegex = /^[A-ZА-Я][a-zа-я]{0,29}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/;

function validateRegisterForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("nameInput").value;
  const lastName = document.getElementById("surnameInput").value;
  const regEmailInputValue = document.getElementById("registerEmail").value;

  let isValid = true;
  let anotherOptionsMargin = 0;


  if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
    nameErrorMsg.textContent = 'Имя и Фамилия должны содержать только латинские или кириллические символы.';
    firstNameInput.classList.add("inputAdd");
    firstNameInput.style.borderColor = "#ED5454";
    lastNameInput.classList.add("inputAdd");
    lastNameInput.style.borderColor = "#ED5454";
    anotherOptionsMargin = anotherOptionsMargin + 30;
    isValid = false;
  } else {
    nameErrorMsg.textContent = '';
    firstNameInput.classList.remove("inputAdd");
    firstNameInput.style.borderColor = "#B9B9B9";
    lastNameInput.classList.remove("inputAdd");
    lastNameInput.style.borderColor = "#B9B9B9";
  }

  if (firstName.trim() === "" || lastName.trim() === "") {
    nameErrorMsg.textContent = 'Поля Имя и Фамилия не должны быть пустыми.';
    isValid = false;
  }

  if (regEmailInputValue.trim() === "") {
    regEmailErrorMsg.textContent = 'Поле почта не должно быть пустым.';
    regEmailInput.classList.add("inputAdd");
    regEmailInput.style.borderColor = "#ED5454";
    anotherOptionsMargin = anotherOptionsMargin + 10;
    isValid = false;
  } else {
    regEmailInput.classList.remove("inputAdd");
    regEmailInput.style.borderColor = "#B9B9B9";
    regEmailErrorMsg.textContent = '';
  }


  if (!regPasswordInput.value.match(passwordRegex)) {
    anotherOptionsMargin += 40;
    isValid = false;
  } 

  anotherOptionsDiv.style.marginTop = `${anotherOptionsMargin}px`
  regPasswordInput.removeEventListener('click', validatePassword);
  if (isValid) {
    form.submit();
  }
}

form.addEventListener('submit', validateRegisterForm);

function validatePassword() {
  regPasswordInput.addEventListener('input', function() {
    const requirementsList = document.getElementById('passwordRequirements');
    const requirementItems = requirementsList.getElementsByTagName('li');
    const errorMessages = [];
    let hasErrors = false;
  
    // Проверка каждого требования пароля
    if (!/(?=.*\d)/.test(this.value)) {
      requirementItems[2].classList.remove('success');
      requirementItems[2].classList.add('fail');
      errorMessages.push('Минимум одна цифра');
      hasErrors = true;
    } else {
      requirementItems[2].classList.remove('fail');
      requirementItems[2].classList.add('success');
    }
  
    if (!/(?=.*[A-Z])/.test(this.value)) {
      requirementItems[1].classList.remove('success');
      requirementItems[1].classList.add('fail');
      errorMessages.push('Заглавная буква');
      hasErrors = true;
    } else {
      requirementItems[1].classList.remove('fail');
      requirementItems[1].classList.add('success');
    }
  
    if (!/^[a-zA-Z0-9]{6,16}$/.test(this.value)) {
      requirementItems[0].classList.remove('success');
      requirementItems[0].classList.add('fail');
      errorMessages.push('От 6 до 16 латинских символов');
      hasErrors = true;
    } else {
      requirementItems[0].classList.remove('fail');
      requirementItems[0].classList.add('success');
    }
  
    if (!/^[a-zA-Z0-9]+$/.test(this.value)) {
      requirementItems[3].classList.remove('success');
      requirementItems[3].classList.add('fail');
      errorMessages.push('Без специальных символов');
      hasErrors = true;
    } else {
      requirementItems[3].classList.remove('fail');
      requirementItems[3].classList.add('success');
    }
  
    if (hasErrors) {
      requirementsList.style.display = 'block';
      regPasswordInput.classList.add('inputAdd');
      regPasswordInput.style.borderColor = '#ED5454';
    } else {
      requirementsList.style.display = 'none';
      regPasswordInput.classList.remove('inputAdd');
      regPasswordInput.style.borderColor = '#B9B9B9'; 
    }
  });
}

// function validateEmail() {
//   regEmailInput.addEventListener('input', function() {

//   })
// }

function handleInputBlur() {
  regPasswordInput.classList.remove('inputAdd');
  regPasswordInput.style.borderColor = '#B9B9B9';
}

regPasswordInput.addEventListener('click', validatePassword);
regPasswordInput.addEventListener('blur', handleInputBlur);

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

