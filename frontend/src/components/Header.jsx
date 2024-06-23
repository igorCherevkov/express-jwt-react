import '../styles/Header.css';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const JWTtoken = useSelector((state) => state.auth.JWTtoken);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('JWTtoken');
  };

  return (
      <div className='container'>
        <header className='header'> 
            <div className='header-left'>
                <Link to={HOME_ROUTE} className='logo_link'><img src={logo} className='logo__img' /></Link>
                <div className='logo__description'>SSaT - Staff selection and training</div>
            </div>
            <div className='header-right'>
                <div className='header__links'>
                  { JWTtoken ? (
                    <>
                      <Link onClick={handleLogout} className='header__links-link'>Logout</Link>
                    </>
                  ) : (
                    <>
                      <Link to={LOGIN_ROUTE} className='header__links-link'>Login</Link>
                      <Link to={REGISTRATION_ROUTE} className='header__links-link'>Register</Link>
                    </>
                  )}
                </div>
            </div>
        </header>
      </div>
    )
  }
  
export default Header