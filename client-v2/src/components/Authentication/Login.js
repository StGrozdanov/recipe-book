import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser, faKey, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import style from './Authenticate.module.scss';
import { useState } from 'react';
import * as authService from '../../services/authenticationService';
import * as validator from '../../utils/formDataValidator';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Login() {
    const [loginSuccess, setLoginSuccess] = useState(true);
    const { userLogin } = useAuthContext();
    const navigate = useNavigate();

    function loginHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputData = Object.fromEntries(formData);

        if (!validator.formContainsEmptyFields(formData)) {
            authService
                .login(inputData)
                .then(loginData => {
                    userLogin(loginData);
                    setLoginSuccess(true);
                    navigate('/catalogue');
                })
                .catch(err => {
                    setLoginSuccess(false);
                    console.log(err);
                });
        } else {
            setLoginSuccess(false);
        }
    }

    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Вход</h2></header>
                {!loginSuccess
                    ?
                    <>
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className={style['login-warning-icon']}
                        />
                        <h4 className={style['form-validation-msg']}>Невалидно потребителско име или парола</h4>
                    </>
                    : null
                }
                <form className={style.form} autoComplete="off" onSubmit={loginHandler}>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <input
                            onChange={() => setLoginSuccess(true)}
                            style={loginSuccess ? {} : { borderBottomColor: 'red' }}
                            type="text"
                            placeholder={'Потребителско име'}
                            name='username'
                        />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faKey} />
                        <input
                            onChange={() => setLoginSuccess(true)}
                            style={loginSuccess ? {} : { borderBottomColor: 'red' }}
                            type="password"
                            placeholder={'Парола'}
                            name='password'
                        />
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
                <Link
                    to={'/forgotten-password'}
                    className={style['forgotten-password']}
                >
                    Забравена парола
                </Link>
                <footer className={style['form-footer']}>
                    <Link to={'/register'}>
                        Все още нямате акаунт? Кликнете тук.
                    </Link>
                </footer>
            </article>
        </div >
    )
}