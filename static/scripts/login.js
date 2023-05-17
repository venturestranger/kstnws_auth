const form = document.getElementById('loginForm');
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const emailLabel = document.getElementById("loginEmailLabel");
const loginEmailIcon = document.getElementById("loginEmailIcon");
const loginPasswordIcon = document.getElementById("loginPasswordIcon");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const passwordErrorMsg = document.querySelector("#passwordErrorMsg");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLoginForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    let isValid = true;

    if (email.trim() === '') {
        isValid = false;
    } 

    if (!email.match(emailRegex)) {
        isValid = false;
    }

    if (password.length > 50) {
        isValid = false;
    } else if (password.length < 1) {
        isValid = false;
    } 

    if (isValid) {
        form.submit();
    }
}

function validateEmail() {
    if (emailInput.value.trim() === '') {
        emailErrorMsg.style.display = 'block';
        emailErrorMsg.classList.add('fail');
        emailInput.classList.add("inputAdd");
        emailInput.style.borderColor = "#ED5454";
    } else {
        emailErrorMsg.style.display = 'none';
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    }

    if (!emailInput.value.match(emailRegex)) {
        false
    }
}

function validatePassword() {
    if (passwordInput.value.length > 50) {
        passwordErrorMsg.style.display = 'block';
        passwordErrorMsg.classList.add('fail');
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
    } else if (passwordInput.value.length < 1) {
        passwordErrorMsg.style.display = 'block';
        passwordErrorMsg.classList.add('fail');
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
    } else {
        passwordErrorMsg.style.display = 'none';
        passwordInput.classList.remove("inputAdd");
        passwordInput.style.borderColor = "#B9B9B9";
    }
}

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);  

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