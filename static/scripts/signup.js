const firstName = document.getElementById("nameInput").value;
const lastName = document.getElementById("surnameInput").value;
const regEmailInput = document.getElementById("registerEmail");
const regPasswordInput = document.getElementById("registerPassword");
const regEmailInputValue = document.getElementById("registerEmail").value;
const regPasswordInputValue = document.getElementById("registerPassword").value;
const inputRegIcon = document.getElementById("emailRegIcon");
const inputRegPassword = document.getElementById("passwordRegIcon");

function validateRegisterForm() {
    const nameRegex = /^[A-ZА-Я][a-zа-я]{0,29}$/;

    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
        alert("Имя и Фамилия должны содержать только латинские или кириллические символы.");
        return false;
    }
    if (firstName.trim() === "" || lastName.trim() === "") {
        alert("Имя и Фамилия не должны быть пустыми.");
        return false;
    }

    if (regEmailInputValue.trim() === "") {
        alert("Поле почта не должно быть пустым.");
        return false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,12}$/;
    if (!regPasswordInputValue.match(passwordRegex)) {
        alert("Пароль должен содержать от 7 до 12 латинских символов, как минимум одну заглавную букву и одну цифру, без специальных символов.");
        return false;
    }

    return true;
}

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