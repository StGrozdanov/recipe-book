export function inputValidateHandler(e) {
    const inputField = e.target;
    const inputFieldName = inputField.name;
    const inputFieldValue = inputField.value;
    const inputFieldContainer = e.target.parentNode;

    const warningIcon = inputFieldContainer.querySelector('.warning-icon');
    const checkIcon = inputFieldContainer.querySelector('.check-icon');

    const invalidInputMessage = inputFieldContainer.parentNode.querySelector('.invalid-input-text');

    const validationsCriteria = {
        email: (email) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) },
        username: (username) => { return username.length >= 3 && username.length <= 10 },
        password: (password) => { return password.length >= 4 },
        'confirm-pass': (confirmPass) => { return document.querySelector('#password').value === confirmPass },
    }

    if (!validationsCriteria[inputFieldName](inputFieldValue)) {
        inputFieldContainer.classList.remove('valid-input');
        checkIcon.style.display = 'none';

        inputFieldContainer.classList.add('invalid-input');
        warningIcon.style.display = 'block';
        invalidInputMessage.style.display = 'block';
    } else {
        inputFieldContainer.classList.remove('invalid-input');
        warningIcon.style.display = 'none';
        invalidInputMessage.style.display = 'none';

        inputFieldContainer.classList.add('valid-input');
        checkIcon.style.display = 'block';
    }
}

export function profileEditValidateHandler(e) {
    const inputField = e.target;
    const inputFieldName = inputField.name;
    const inputFieldValue = inputField.value;
    const inputFieldContainer = e.currentTarget.parentNode;

    const warningIcon = inputFieldContainer.querySelector('.warning-icon');
    const checkIcon = inputFieldContainer.querySelector('.check-icon');

    const invalidInputMessage = inputFieldContainer.querySelector('.invalid-input-text');

    const validationsCriteria = {
        email: (email) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) },
        username: (username) => { return username.length >= 3 && username.length <= 10 },
    }

    if (!validationsCriteria[inputFieldName](inputFieldValue)) {
        inputField.classList.remove('valid-input');
        checkIcon.style.display = 'none';

        inputField.classList.add('invalid-input');
        warningIcon.style.display = 'block';
        invalidInputMessage.style.display = 'block';
    } else {
        inputField.classList.remove('invalid-input');
        warningIcon.style.display = 'none';
        invalidInputMessage.style.display = 'none';

        inputField.classList.add('valid-input');
        checkIcon.style.display = 'block';
    }
}

export function formContainsEmptyFields(formData) {
    const formEntriesObject = Object.fromEntries(formData);
    const formValuesArray = Object.values(formEntriesObject);

    return formValuesArray.some(field => field.trim() == '');
}

export function formContainsInvalidInput(formElement) {
    const formInputFields = formElement.querySelectorAll('input');

    let isInvalid = false;

    console.log(formInputFields);

    Array.from(formInputFields).forEach(input => {
        if (input.parentNode.classList.contains('invalid-input')) {
            isInvalid = true;
            return;
        }
    });

    return isInvalid;
}

export function profileFormContainsInvalidInput(formElement) {
    const formInputFields = formElement.querySelectorAll('input');

    let isInvalid = false;

    Array.from(formInputFields).forEach(input => {
        if (input.classList.contains('invalid-input')) {
            isInvalid = true;
            return;
        }
    });

    return isInvalid;
}