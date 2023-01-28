import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRepeat, faKey, faEnvelope, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import style from './Authenticate.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as authService from '../../services/authenticationService';
import * as validator from '../../utils/formDataValidator';
import { useState } from 'react';
import FailedValidationMessage from './FailedValidationMessage';
import Notification from '../common/Notification/Notification';

export default function Register() {
    const [validationError, setValidationError] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const { userLogin } = useAuthContext();
    const navigate = useNavigate();

    const validationPassed = emailIsValid && usernameIsValid && passwordIsValid && passwordsMatch;

    function registerHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const input = Object.fromEntries(formData);

        if (!validator.formContainsEmptyFields(formData) && validationPassed) {
            authService
                .register(input)
                .then(loginData => {
                    userLogin(loginData);
                    navigate('/catalogue');
                })
                .catch(err => {
                    console.log(err)
                });

            setValidationError(false);
        } else {
            setValidationError(true);
        }
    }

    function validateInput(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const inputOptions = {
            email: (boolean) => setEmailIsValid(boolean),
            username: (boolean) => setUsernameIsValid(boolean),
            password: (boolean) => setPasswordIsValid(boolean),
        }

        if (inputName == 'repeatPassword') {
            setPasswordsMatch(password === inputValue);
        } else {
            const inputIsValid = validator.validate[inputName](inputValue);
            inputOptions[inputName](inputIsValid);
        }
    }

    function validationErrorHandler() {
        validationError ? setValidationError(false) : setValidationError(true);
    }

    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Регистрация</h2></header>
                <form
                    style={{ marginTop: 50 }}
                    className={style.form}
                    autoComplete="off"
                    onSubmit={registerHandler}
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
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <input
                            onBlur={validateInput}
                            onFocus={() => setUsernameIsValid(true)}
                            style={usernameIsValid ? {} : { borderBottomColor: 'red' }}
                            type="text"
                            placeholder={'Потребителско име'}
                            name="username"
                        />
                        {
                            usernameIsValid
                                ? null
                                : <FailedValidationMessage message={'Между 3 и 10 символа'} />
                        }
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faKey} />
                        <input
                            onBlur={validateInput}
                            onFocus={() => setPasswordIsValid(true)}
                            onChange={(e) => setPassword(e.target.value)}
                            style={passwordIsValid ? {} : { borderBottomColor: 'red' }}
                            type="password"
                            placeholder={'Парола'}
                            name="password"
                            defaultValue={password}
                        />
                        {
                            passwordIsValid
                                ? null
                                : <FailedValidationMessage message={'Минимум 4 символа'} />
                        }
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faRepeat} />
                        <input
                            onBlur={validateInput}
                            onFocus={() => setPasswordsMatch(true)}
                            style={passwordsMatch ? {} : { borderBottomColor: 'red' }}
                            type="password"
                            placeholder={'Повтори паролата'}
                            name="repeatPassword"
                        />
                        {
                            passwordsMatch
                                ? null
                                : <FailedValidationMessage message={'Паролите трябва да съвпадат'} />
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
                    <Link to={'/login'}>Вече имате акаунт? Кликнете тук.</Link>
                </footer>
            </article>
            <Notification
                type={'fail'}
                message={'Моля попълнете всички полета'}
                visibility={validationError}
                handler={validationErrorHandler}
            />
        </div>
    )
}