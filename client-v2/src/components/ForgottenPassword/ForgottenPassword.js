import { useState } from 'react';
import * as authService from '../../services/authenticationService';
import * as validator from '../../utils/formDataValidator';
import style from '../Authentication/Authenticate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FailedValidationMessage from '../Authentication/FailedValidationMessage';
import Notification from '../common/Notification/Notification';
import emailjs from '@emailjs/browser';

export default function ForgottenPassword() {
    const [validationError, setValidationError] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailSendSuccess, setEmailSendSuccess] = useState(false);
    const [emailSendError, setEmailSendError] = useState(false);
    const [userData, setUserData] = useState({});

    async function sendEmailHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const input = Object.fromEntries(formData);

        if (!validator.formContainsEmptyFields(formData) && emailIsValid) {
            const emailAddress = input.email;

            authService
                .forgottenPassword(emailAddress)
                .then(response => {
                    const code = response.code;
                    const username = response.username;
                    setUserData({ email: emailAddress, code, username });
                })
                .catch(err => {
                    console.log(err);
                    setValidationError(true);
                });

            const serviceName = process.env.REACT_APP_EMAIL_JS_SERVICE.replaceAll(`'`, '');
            const template = process.env.REACT_APP_EMAIL_JS_TEMPLATE.replaceAll(`'`, '');
            const token = process.env.REACT_APP_EMAIL_JS_TOKEN.replaceAll(`'`, '');

            const emailJSResponse = await emailjs.send(serviceName, template, userData, token);
            emailJSResponse.text == 'OK' ? setEmailSendSuccess(true) : setEmailSendSuccess(false) && setEmailSendError(true);
        }
    }

    function validateInput(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const inputIsValid = validator.validate[inputName](inputValue);
        setEmailIsValid(inputIsValid);
    }

    function validationErrorHandler() {
        validationError ? setValidationError(false) : setValidationError(true);
    }

    function emailSendSuccessHandler() {
        emailSendSuccess ? setEmailSendSuccess(false) : setEmailSendSuccess(false);
    }

    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Забравена Парола</h2></header>
                <form
                    style={{ marginTop: 120 }}
                    className={style.form}
                    autoComplete="off"
                    onSubmit={(e) => sendEmailHandler(e)}
                >
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
                        <input
                            onBlur={validateInput}
                            onFocus={() => setEmailIsValid(true)}
                            style={emailIsValid ? {} : { borderBottomColor: 'red' }}
                            type="text"
                            placeholder={'Имейл'}
                            name="email"
                        />
                        {
                            emailIsValid
                                ? null
                                : <FailedValidationMessage message={'Имейлът трябва да е валиден'} />
                        }
                    </div>
                    <div className={style['button-container']}>
                        <FontAwesomeIcon className={style['continue-icon']} icon={faRightToBracket} />
                        <input
                            style={{ marginTop: 5 }}
                            className={style['submit-btn']}
                            type="submit"
                            value="Продължи"
                        />
                    </div>
                </form>
                <footer className={style['form-footer']}>
                    <Link to={'/register'}>Кликнете тук, ако нямате регистрация.</Link>
                </footer>
            </article>
            <Notification
                type={'fail'}
                message={'Не открихме имейлът, който сте заявили'}
                visibility={validationError}
                handler={validationErrorHandler}
            />
            <Notification
                type={'success'}
                message={'Успешно заявихте нова парола. Погледнете имейла си за по-нататъчни инструкции.'}
                visibility={emailSendSuccess}
                handler={emailSendSuccessHandler}
            />
            <Notification
                type={'fail'}
                message={'В момента имаме проблем с услугата за изпращане на имейли. Моля опитайте отново по-късно.'}
                visibility={emailSendError}
                handler={() => setEmailSendSuccess(null)}
            />
        </div>
    );
}