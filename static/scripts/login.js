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

const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/i;

function validateLoginForm(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    let isValid = true;

    if (email.trim() === '') {
        isValid = false;
    }

    if (!email.match(emailRegex)) {
        emailNotValidErr.style.display = 'block';
        emailNotValidErr.classList.add('fail');
        emailInput.classList.add("inputAdd");
        emailInput.style.borderColor = "#ED5454";
        isValid = false;
    } else {
        emailNotValidErr.style.display = 'none';
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    }

    if (password.length > 50) {
        isValid = false;
    } else if (password.length < 1) {
        isValid = false;
    }

    emailInput.addEventListener('click', validateEmail);
    passwordInput.addEventListener('click', validatePassword);

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

    emailInput.addEventListener('blur', function () {
        emailErrorMsg.style.display = "none";
        emailNotValidErr.style.display = "none";
        emailInput.classList.remove("inputAdd");
        emailInput.style.borderColor = "#B9B9B9";
    })

}

function validatePassword() {
    if (passwordInput.value.length > 50) {
        passwordLongErrorMsg.style.display = 'block';
        passwordLongErrorMsg.classList.add('fail');
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
    } else if (passwordInput.value.length < 1) {
        passwordErrorMsg.style.display = 'block';
        passwordErrorMsg.classList.add('fail');
        passwordInput.classList.add("inputAdd");
        passwordInput.style.borderColor = "#ED5454";
    } else {
        passwordLongErrorMsg.style.display = 'none';
        passwordErrorMsg.style.display = 'none';
        passwordInput.classList.remove("inputAdd");
        passwordInput.style.borderColor = "#B9B9B9";
    }

    passwordInput.addEventListener('blur', function () {
        passwordLongErrorMsg.style.display = "none";
        passwordErrorMsg.style.display = "none";
        passwordInput.classList.remove("inputAdd");
        passwordInput.style.borderColor = "#B9B9B9";
    })
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