const form = document.getElementById("signUpForm");
const regEmailInput = document.getElementById("registerEmail");
const regPasswordInput = document.querySelector("#registerPassword");
const inputRegIcon = document.getElementById("emailRegIcon");
const inputRegPassword = document.getElementById("passwordRegIcon");
const firstNameInput = document.getElementById("nameInput");
const lastNameInput = document.getElementById("surnameInput");

function validateRegisterForm(event) {
    event.preventDefault();
    const firstName = document.getElementById("nameInput").value;
    const nameErrorMsg = document.querySelector(".nameErrorMsg");
    const regEmailErrorMsg = document.querySelector(".regEmailErrorMsg");
    const regPasswordErrorMsg = document.querySelector(".regPasswordErrorMsg");
    const lastName = document.getElementById("surnameInput").value;
    const regEmailInputValue = document.getElementById("registerEmail").value;
    const regPasswordInputValue = document.getElementById("registerPassword").value;
    const anotherOptionsDiv = document.querySelector(".anotherOptions");

    let isValid = true;
    let anotherOptionsMargin = 0;

    const nameRegex = /^[A-ZА-Я][a-zа-я]{0,29}$/;
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

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,12}$/;
    
    regPasswordInput.addEventListener('input', function() {
        if (!this.value.match(passwordRegex)) {
          let errorMessages = [];
      
          if (!/(?=.*\d)/.test(this.value)) {
            errorMessages.push('Пароль должен содержать хотя бы одну цифру.');
          }
      
          if (!/(?=.*[a-z])/.test(this.value)) {
            errorMessages.push('Пароль должен содержать хотя бы одну строчную букву.');
          }
      
          if (!/(?=.*[A-Z])/.test(this.value)) {
            errorMessages.push('Пароль должен содержать хотя бы одну заглавную букву.');
          }
      
          if (!/^[a-zA-Z0-9]{7,12}$/.test(this.value)) {
            errorMessages.push('Пароль должен содержать от 7 до 12 латинских символов без специальных символов.');
          }
      
          regPasswordErrorMsg.textContent = errorMessages.join(' ');
          regPasswordInput.classList.add('inputAdd');
          regPasswordInput.style.borderColor = '#ED5454';
          anotherOptionsMargin += 40;
          isValid = false;
        } else {
          regPasswordInput.classList.remove('inputAdd');
          regPasswordInput.style.borderColor = '#B9B9B9';
          regPasswordErrorMsg.textContent = '';
          isValid = true;
        }
      });

    anotherOptionsDiv.style.marginTop = `${anotherOptionsMargin}px`

    if (isValid) {
        form.submit();
    }
}

form.addEventListener('submit', validateRegisterForm);

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

