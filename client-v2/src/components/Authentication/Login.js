import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import style from './Authenticate.module.scss';

export default function Login() {
    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Вход</h2></header>
                <form className={style.form} autoComplete="off">
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <input type="text" placeholder={'Потребителско име'} />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faKey} />
                        <input type="password" placeholder={'Парола'} />
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