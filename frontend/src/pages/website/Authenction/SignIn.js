import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import "./Login.css";
export default function SignIn() {
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [accept, setAccept] = useState(false);
    const [emailErr, setEmailErr] = useState('');
    const UserNow = useContext(User);
    const cookie = new Cookies();
    const nav = useNavigate();

    const validateEmail = () => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const validatePassword = () => {
        return pass.length >= 8;
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleEmailBlur = () => {
        if (!validateEmail()) {
            setEmailErr('Invalid email format');
        } else {
            setEmailErr('');
        }
    };

    const handlePasswordBlur = () => {
        if (pass.length < 8) {
            setAccept(true);
        }
    };

    const Submit = async (e) => {
        e.preventDefault();
        setAccept(true);

        if (!validateEmail() || pass.length < 8) {
            return;
        }

        try {
            //send data
            let res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: pass,
            });
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            UserNow.setAuth({ token, userDetails })
            nav('/');

        } catch (err) {
            setEmailErr('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="sign-container">
                <div className="row h-100">
                    <form className="form" onSubmit={Submit}>
                        <h1>Welcome Back! </h1>
                        {accept && emailErr && <p className="error-message">{emailErr}</p>}
                        <label htmlFor="mail">Email:</label>
                        <input
                            id="mail"
                            type="email"
                            placeholder="Email"
                            onChange={handleInputChange(setMail)}
                            onBlur={handleEmailBlur}
                            value={email}
                            className={`input ${accept && !validateEmail() ? 'error' : (validateEmail() ? 'success' : '')}`}
                            required
                        />

                        <label htmlFor="pass">Password :</label>
                        <input
                            id="pass"
                            type="password"
                            placeholder="Password"
                            onChange={handleInputChange(setPass)}
                            onBlur={handlePasswordBlur}
                            value={pass}
                            className={`input ${accept && pass.length < 8 ? 'error' : (validatePassword() ? 'success' : '')}`}
                            required
                        />
                        {pass.length < 8 && accept && <p className="error-message">Password must be at least 8 characters long.</p>}

                        <Link to='/register' className='form-link'>Register</Link>
                        <div className="btn-login">
                            <button className="login-button" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
