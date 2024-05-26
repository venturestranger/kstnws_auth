const form = document.getElementById('loginForm');
const emailInput = document.querySelector("#emailInput");
const emailLabel = document.getElementById("loginEmailLabel");
const loginEmailIcon = document.getElementById("loginEmailIcon");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const emailNotValidErr = document.querySelector("#emailNotValidError");

const emailRegex = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/i;

function validateForgotEmailForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();


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

    emailInput.addEventListener('click', validateEmail);

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

emailInput.addEventListener('input', validateEmail);
form.addEventListener('submit', validateForgotEmailForm);

emailInput.addEventListener('input', () => {
    if (emailInput.value !== '') {
        loginEmailIcon.style.display = 'none';
    } else {
        loginEmailIcon.style.display = 'block';
    }
});
