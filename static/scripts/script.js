const form = document.getElementById('loginForm');
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailLabel = document.getElementById("loginEmailLabel");
const loginEmailIcon = document.getElementById("loginEmailIcon");
const loginPasswordIcon = document.getElementById("loginPasswordIcon");

function validateLoginForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    let isValid = true;

    if (email.trim() === '') {
        emailInput.nextElementSibling.textContent = 'Поле почта не должно быть пустым.';
        emailInput.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        emailInput.nextElementSibling.textContent = '';
        emailInput.nextElementSibling.style.display = 'none';
    }

    if (password === "") {
        passwordInput.nextElementSibling.textContent = 'Поле пароль не должно быть пустым.';
        passwordInput.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        passwordInput.nextElementSibling.textContent = '';
        passwordInput.nextElementSibling.style.display = 'none';
    }

    if (isValid) {
        form.submit();
    }
}

form.addEventListener('submit', validateLoginForm);

function validateRegisterForm() {
    const firstName = document.getElementById("nameInput").value;
    const lastName = document.getElementById("surnameInput").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
        alert("Имя и Фамилия должны содержать только латинские или кириллические символы.");
        return false;
    }
    if (firstName.trim() === "" || lastName.trim() === "") {
        alert("Имя и Фамилия не должны быть пустыми.");
        return false;
    }

    if (email.trim() === "") {
        alert("Поле почта не должно быть пустым.");
        return false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,12}$/;
    if (!password.match(passwordRegex)) {
        alert("Пароль должен содержать от 7 до 12 латинских символов, как минимум одну заглавную букву и одну цифру, без специальных символов.");
        return false;
    }

    return true;
}


emailInput.addEventListener('input', () => {
    if (emailInput.value !== '') {
      loginEmailIcon.style.display = 'none';
    } else {
      loginEmailIcon.style.display = 'block';
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value !== '') {
      loginPasswordIcon.style.display = 'none';
    } else {
      loginPasswordIcon.style.display = 'block';
    }
  });