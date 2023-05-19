const form = document.getElementById('loginForm');
const passwordInput = document.querySelector("#passwordInput");
const passwordIcon = document.getElementById("passwordIcon");
const repeatPasswordIcon = document.querySelector("#repeatPasswordIcon");
const passwordErrorMsg = document.querySelector("#passwordErrorMsg");
const passwordLongErrorMsg = document.querySelector("#passwordLongErrorMsg");
const passwordRepeatInput = document.querySelector("#passwordRepeatInput");
const passwordRepeatErrorMsg = document.querySelector("#passwordRepeatErrorMsg");
const passwordRepeatEmptyErrorMsg = document.querySelector("#passwordRepeatEmptyErrorMsg");

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/;

function validateForgotPasswordForm(event) {
    event.preventDefault();
    const password = passwordInput.value;


    let isValid = true;

    if (!password.match(passwordRegex)) {
        validatePassword();
        isValid = false;
    }

    if (passwordRepeatInput.value !== passwordInput.value) {
        validateRepeatPassword();
        failed(passwordRepeatErrorMsg, passwordRepeatInput);
        isValid = false;
    } else {
        passwordRepeatErrorMsg.style.display = 'none';
        passwordRepeatInput.classList.remove("inputAdd");
        passwordRepeatInput.style.borderColor = "#B9B9B9";
    }

    passwordInput.addEventListener('click', validatePassword);
    passwordRepeatInput.addEventListener('click', validateRepeatPassword);

    if (isValid) {
        form.submit();
    }
}

function failed(err, input) {
    err.style.display = 'block';
    err.classList.add('fail');
    input.classList.add("inputAdd");
    input.style.borderColor = "#ED5454";
}

function validatePassword() {
    const requirementsList = document.getElementById('passwordRequirements');
    const requirementItems = requirementsList.getElementsByTagName('li');
    let hasErrors = false;

    function fail(ul) {
        ul.classList.remove('success');
        ul.classList.add('fail');
    }

    function success(ul) {
        ul.classList.remove('fail');
        ul.classList.add('success');
    }

    if (!/(?=.*\d)/.test(passwordInput.value)) {
        fail(requirementItems[2]);
        hasErrors = true;
    } else {
        success(requirementItems[2]);
    }

    if (!/(?=.*[A-Z])/.test(passwordInput.value)) {
        fail(requirementItems[1]);
        hasErrors = true;
    } else {
        success(requirementItems[1]);
    }

    if (!/^[a-zA-Z0-9]{6,16}$/.test(passwordInput.value)) {
        fail(requirementItems[0]);
        hasErrors = true;
    } else {
        success(requirementItems[0]);
    }

    if (!/^[a-zA-Z0-9]+$/.test(passwordInput.value)) {
        fail(requirementItems[3]);
        hasErrors = true;
    } else {
        success(requirementItems[3]);
    }

    passwordInput.addEventListener('blur', function () {
        requirementsList.style.display = 'none';
        passwordInput.classList.remove('inputAdd');
        passwordInput.style.borderColor = '#B9B9B9';
    })

    passwordInput.addEventListener('click', function () {
        requirementsList.style.display = 'block';
    })

    if (hasErrors) {
        requirementsList.style.display = 'block';
        passwordInput.classList.add('inputAdd');
        passwordInput.style.borderColor = '#ED5454';
    } else {
        requirementsList.style.display = 'none';
        passwordInput.classList.remove('inputAdd');
        passwordInput.style.borderColor = '#B9B9B9';
    }
}

function validateRepeatPassword() {
    if (passwordRepeatInput.value.trim() === '') {
        failed(passwordRepeatEmptyErrorMsg, passwordRepeatInput);
    } else {
        passwordRepeatEmptyErrorMsg.style.display = 'none';
        passwordRepeatInput.classList.remove("inputAdd");
        passwordRepeatInput.style.borderColor = "#B9B9B9";
    }

    passwordRepeatInput.addEventListener('blur', function() {
        passwordRepeatErrorMsg.style.display = 'none';
        passwordRepeatEmptyErrorMsg.style.display = 'none';
        passwordRepeatInput.classList.remove("inputAdd");
        passwordRepeatInput.style.borderColor = "#B9B9B9";
    })
}

passwordRepeatInput.addEventListener('input', validateRepeatPassword);
passwordInput.addEventListener('input', validatePassword);
form.addEventListener('submit', validateForgotPasswordForm);

passwordInput.addEventListener('input', () => {
    if (passwordInput.value !== '') {
        passwordIcon.style.display = 'none';
    } else {
        passwordIcon.style.display = 'block';
    }
});

passwordRepeatInput.addEventListener('input', () => {
    if (passwordRepeatInput.value !== '') {
        repeatPasswordIcon.style.display = 'none';
    } else {
        repeatPasswordIcon.style.display = 'block';
    }
});