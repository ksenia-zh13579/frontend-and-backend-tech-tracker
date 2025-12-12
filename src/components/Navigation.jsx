import { Link, useLocation } from 'react-router-dom';
import './Navigation.css'

function Navigation({isLoggedIn, username, handleLogout}) {
    const location = useLocation();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <Link to="/" className='nav-brand-link'>
                    <h2>🚀 Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link
                                to="/"
                                className={'nav-link ' + (location.pathname === '/' ? 'active' : '')}
                            >
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/technologies"
                                className={'nav-link ' + (location.pathname === '/technologies' ? 'active' : '')}
                            >
                                Все технологии
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/statistics"
                                className={'nav-link ' + (location.pathname === '/statistics' ? 'active' : '')}
                            >
                                Статистика
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/settings"
                                className={'nav-link ' + (location.pathname === '/settings' ? 'active' : '')}
                            >
                                Настройки
                            </Link>
                        </li>
                        <li className="user-info">
                            <span>Привет, {username}!</span>
                            <button onClick={handleLogout} className="btn btn-danger">
                                Выйти
                            </button>
                        </li>
                    </>
                    ) : (
                    <li><Link className='nav-link' to="/login">Войти</Link></li>
                )}
                
            </ul>
        </nav>
    );
}

export default Navigation;