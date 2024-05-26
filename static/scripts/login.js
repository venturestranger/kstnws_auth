const form = document.getElementById('loginForm');
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const emailLabel = document.getElementById("loginEmailLabel");
const loginEmailIcon = document.getElementById("loginEmailIcon");
const loginPasswordIcon = document.getElementById("loginPasswordIcon");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const passwordErrorMsg = document.querySelector("#passwordErrorMsg");
const passwordLongErrorMsg = document.querySelector("#passwordLongErrorMsg");
const emailNotValidErr = document.querySelector("#emailNotValidError");

const emailRegex = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i;

function validateLoginForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    let isValid = true;

    if (email.trim() === '') {
        isValid = false;
    }

    if (!email.match(emailRegex)) {
        fail(emailNotValidErr, emailInput);
        isValid = false;
    } else {
        emailNotValidErr.style.display = 'none';
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    }

    if (password.length > 50) {
        validatePassword();
        isValid = false;
    } else if (password.length < 1) {
        validatePassword();
        isValid = false;
    }

    emailInput.addEventListener('click', validateEmail);
    passwordInput.addEventListener('click', validatePassword);

    if (isValid) {
        form.submit();
    }
}

function blur(input, firstErr, secondErr) {
    input.addEventListener('blur', function () {
        firstErr.style.display = "none";
        secondErr.style.display = "none";
        input.classList.remove("inputAdd");
        input.style.borderColor = "#B9B9B9";
    })
}

function fail(err, input) {
    err.style.display = 'block';
    err.classList.add('fail');
    input.classList.add("inputAdd");
    input.style.borderColor = "#ED5454";
}

function validateEmail() {
    if (emailInput.value.trim() === '') {
        fail(emailErrorMsg, emailInput);
    } else {
        emailErrorMsg.style.display = 'none';
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    }

    blur(emailInput, emailErrorMsg, emailNotValidErr);
}

function validatePassword() {
    if (passwordInput.value.length > 50) {
        fail(passwordLongErrorMsg, passwordInput);
    } else if (passwordInput.value.length < 1) {
        fail(passwordErrorMsg, passwordInput);
    } else {
        passwordLongErrorMsg.style.display = 'none';
        passwordErrorMsg.style.display = 'none';
        passwordInput.classList.remove("inputAdd");
        passwordInput.style.borderColor = "#B9B9B9";
    }

    blur(passwordInput, passwordLongErrorMsg, passwordErrorMsg);
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
