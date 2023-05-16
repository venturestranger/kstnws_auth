const form = document.getElementById('loginForm');
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailLabel = document.getElementById("loginEmailLabel");
const loginEmailIcon = document.getElementById("loginEmailIcon");
const loginPasswordIcon = document.getElementById("loginPasswordIcon");

function validateLoginForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    let isValid = true;

    if (email.trim() === '') {
        emailInput.nextElementSibling.textContent = 'Поле почта не должно быть пустым.';
        emailInput.nextElementSibling.style.display = 'block';
        emailInput.classList.add("inputAdd");
        emailInput.style.borderColor = "#ED5454";
        isValid = false;
    } else {
        emailInput.nextElementSibling.textContent = '';
        emailInput.nextElementSibling.style.display = 'none';
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    }

    if (password.length > 50) {
        passwordInput.nextElementSibling.textContent = 'Слишком большой пароль';
        passwordInput.nextElementSibling.style.display = 'block';
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
        isValid = false;
    } else if (password.length < 1) {
        passwordInput.nextElementSibling.textContent = 'Заполните поле';
        passwordInput.nextElementSibling.style.display = 'block';
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
        isValid = false;
    } else {
        passwordInput.nextElementSibling.textContent = '';
        passwordInput.nextElementSibling.style.display = 'none';
        passwordInput.classList.remove("inputAdd");
        passwordInput.style.borderColor = "#B9B9B9";
    }

    if (isValid) {
        form.submit();
    }
}

form.addEventListener('submit', validateLoginForm);

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