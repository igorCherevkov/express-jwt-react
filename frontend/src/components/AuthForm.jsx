import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import '../styles/AuthForm.css';
import formPic from '../img/LoginPage.webp'
import { Link } from "react-router-dom";

function AuthForm(props) {

    return (
        <div className="wrapper">
            <div className="form-container">
                <div className="form-container-left">
                    <div className="form-left__pic">
                        <img src={formPic} className="form__pic"/>
                    </div>
                </div>
                <div className="form-container-right">
                    <form className="form" onSubmit={ props.handleFormSubmit }>
                        <h1 className="form-right__title">{ props.title }</h1>
                        <div className="input-container">
                            <input className="input" type="text" value={ props.username } name="username" placeholder="Username" onChange={ props.handleUsernameChange } />
                            <IoMdLogIn className="input-pic" />
                        </div>
                        <div className="input-container">
                            <input className="input" type="password" value={ props.password } name="password" placeholder="Password" onChange={ props.handlePasswordChange } />
                            <RiLockPasswordLine className="input-pic" />
                        </div>
                        <button className="form-button" type="submit">{ props.button }</button>
                    </form>
                    <div className="form-link__container"><Link to={ props.link } className="form-link">{ props.linkText }</Link></div>
                </div>
            </div>
        </div>
    )
  }
  
export default AuthForm