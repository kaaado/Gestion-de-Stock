import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../../website/Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import "./Login.css";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [rpass, setRPass] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [accept, setAccept] = useState(false);
    

    const context = useContext(User)
    const getToken = context.auth.token;
    const cookie = new Cookies();
    const nav = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
        setAccept(true);

     

        try {
            // Send data
            let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
                name: name,
                email: email,
                password: pass,
                password_confirmation: rpass
            });
        
            const token = res.data.data.token;
            cookie.set("Bearer", token);
            const userDetails = res.data.data.user;
            context.setAuth({ token, userDetails })
            nav('/');
        } catch (err) {
            setEmailErr(err.response.status);
        }
        
    };

    return (
        <div className="container">
        <div className="sign-container">
            <div className="row h-100">
                <form className="form" onSubmit={Submit}>
                    <h1>Register Now! </h1>
                    <label htmlFor="user">Username :</label>
                <input
                    id="user"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)} value={name}
                    className={`input ${accept ? 'error' :  'success'}`}
                    required
                />
             {name.length < 3 && accept && <p className="error-message">Username must be bigger then 3 Caractere</p>}
           <label htmlFor="mail">Email:</label>
                <input
                    id="mail"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setMail(e.target.value)} value={email}
                    className={`input ${accept ? 'error' :  'success'}`}
                    required
                />
         {accept && emailErr === 422 && <p className="error-message">Email is already been taken</p>}
            <label htmlFor="pass">Password :</label>
                <input
                    id="pass"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)} value={pass} 
                    className={`input ${accept && pass.length < 8 ? 'error' :  'success' }`}
                    required
                />
            {pass.length < 7 && accept && <p className="error-message">Password must be at least 8 characters long.</p>}
           <label htmlFor="rpass">Repeat Password :</label>
                <input
                    id="rpass"
                    type="password"
                    placeholder="Repeat Password"
                    onChange={(e) => setRPass(e.target.value)} value={rpass}
                    className={`input ${accept && rpass !== pass && rpass == "" ? 'error' :  'success' }`}
                    required
                />
            {rpass !== pass && accept && <p className="error-message">Passwords do not match.</p>}

                    <Link to='/login' className='form-link'>Login</Link>
                    <div className="btn-login">
                        <button className="login-button" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}
