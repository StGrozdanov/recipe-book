import multiLineInputProcessor from "./multiLineInputProcessor.js";

const VALIDATION_CRITERIA = {
    email: (email) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) },
    username: (username) => { return username.length >= 3 && username.length <= 10 },
    password: (password) => { return password.length >= 4 },
    'confirm-pass': (confirmPass) => { return document.querySelector('#password').value === confirmPass },
    name: (recipeName) => { return /^[а-яА-Я\s]+$/.test(recipeName) && recipeName.length >= 4 },
    products: (recipeProducts) => { return multiLineInputProcessor.process(recipeProducts).length >= 3 },
    steps: (recipeSteps) => { return multiLineInputProcessor.process(recipeSteps).length >= 3 },
}

const ELEMENT_PARENT = 'parentNode';

export function inputValidateHandler(e) {
    const inputFieldContainer = e.target.parentNode;
    let inputElements = inputFieldElements(e, inputFieldContainer);

    const invalidInputMessage = inputFieldContainer.parentNode.querySelector('.invalid-input-text');

    fieldValidateHandler(inputElements, invalidInputMessage, ELEMENT_PARENT);
}

export function profileEditValidateHandler(e) {
    const inputFieldContainer = e.currentTarget.parentNode;
    let inputElements = inputFieldElements(e, inputFieldContainer);

    const invalidInputMessage = inputFieldContainer.querySelector('.invalid-input-text');

    fieldValidateHandler(inputElements, invalidInputMessage);
}

export function formContainsEmptyFields(formData) {
    const formEntriesObject = Object.fromEntries(formData);
    const formValuesArray = Object.values(formEntriesObject);

    return formValuesArray.some(field => field.trim() == '');
}

export function formContainsInvalidInput(formElement) {
    const formInputFields = formElement.querySelectorAll('input');
    const formTextFields = formElement.querySelectorAll('textarea');

    return formInvalidInputIterator(formInputFields, formTextFields, ELEMENT_PARENT);
}

export function profileFormContainsInvalidInput(formElement) {
    const formInputFields = formElement.querySelectorAll('input');

    return formInvalidInputIterator(formInputFields);
}

export function recipeFormContainsEmptyFields(fileImg, img, name, products, steps, category) {
    const noImageIsProvided = fileImg.size === 0 && img.trim() == '';
    const nameIsEmpty = name.trim() == '';
    const productsAreEmpty = products.length === 0;
    const stepsAreEmpty = steps.length === 0;
    const categoryIsEmpty = category.trim() == '';

    return nameIsEmpty || productsAreEmpty || stepsAreEmpty || categoryIsEmpty || noImageIsProvided;
}

function formInvalidInputIterator(formInputFields, formTextFields, inputCriteria) {
    let isInvalid = false;

    inputCriteria 
    ? formInputFields = Array.from(formInputFields).map(input => input = input[inputCriteria]) 
    : formInputFields;

    Array.from(formInputFields).forEach(input => {
        if (input.classList.contains('invalid-input')) {
            isInvalid = true;
            return;
        }
    });

    if (formTextFields) {
        Array.from(formTextFields).forEach(input => {
            if (input.parentNode.classList.contains('invalid-input')) {
                isInvalid = true;
                return;
            }
        });
    }

    return isInvalid;
}

function inputFieldElements(e, inputFieldContainer) {
    const inputField = e.target;
    const inputFieldName = inputField.name;
    const inputFieldValue = inputField.value;

    const warningIcon = inputFieldContainer.querySelector('.warning-icon');
    const checkIcon = inputFieldContainer.querySelector('.check-icon');

    return {
        inputField,
        inputFieldName,
        inputFieldValue,
        warningIcon,
        checkIcon,
    }
}

function fieldValidateHandler({
    inputField,
    inputFieldName,
    inputFieldValue,
    warningIcon,
    checkIcon,
},
    invalidInputMessage,
    handlerType) {

    handlerType ? inputField = inputField[handlerType] : inputField;

    if (!VALIDATION_CRITERIA[inputFieldName](inputFieldValue)) {
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