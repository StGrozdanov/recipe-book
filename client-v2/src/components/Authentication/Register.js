import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRepeat, faKey, faEnvelope, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import style from './Authenticate.module.scss';

export default function Register() {
    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Регистрация</h2></header>
                <form style={{ marginTop: 50 }} className={style.form} autoComplete="off">
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
                        <input type="email" placeholder={'Имейл'} />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <input type="text" placeholder={'Потребителско име'} />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faKey} />
                        <input type="password" placeholder={'Парола'} />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faRepeat} />
                        <input type="password" placeholder={'Повтори паролата'} />
                    </div>
                    <div className={style['button-container']}>
                        <FontAwesomeIcon className={style['continue-icon']} icon={faRightToBracket} />
                        <input
                            style={{ marginTop: 5 }}
                            className={style['submit-btn']}
                            type="button"
                            value="Продължи"
                        />
                    </div>
                </form>
                <footer className={style['form-footer']}>
                    <Link to={'/login'}>Вече имате акаунт? Кликнете тук.</Link>
                </footer>
            </article>
        </div>
    )
}