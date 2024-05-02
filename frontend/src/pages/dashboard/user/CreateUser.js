import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../../website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import "../../website/Authenction/Login.css";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [rpass, setRPass] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [accept, setAccept] = useState(false);
    const context = useContext(User);
    const getToken = context.auth.token;
    const cookie = new Cookies();
    const nav = useNavigate();

 


    const Submit = async (e) => {
        e.preventDefault();
        setAccept(true);

       
        try {
            // Send data
            let res = await axios.post(`http://127.0.0.1:8000/api/user/create`, {
                name: name,
                email: email,
                password: pass,
                password_confirmation: rpass
            }, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });
        
            nav('/users');
        } catch (err) {
            setEmailErr(err.response.status);
        }
        
    };

    return (
        <div className="create-product-container" style={{ marginTop: '30px' }}>
        <form className="create-product-form" onSubmit={Submit} >
            <div className="form-div">
                <label htmlFor="user">Username :</label>
                <input
                    id="user"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)} value={name}
                    className={`input ${accept ? 'error' :  'success'}`}
                    required
                /></div>
             {name.length < 3 && accept && <p className="error-message">Username must be bigger then 3 Caractere</p>}
            <div className="form-div"><label htmlFor="mail">Email:</label>
                <input
                    id="mail"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setMail(e.target.value)} value={email}
                    className={`input ${accept ? 'error' :  'success'}`}
                    required
                /></div>
         {accept && emailErr === 422 && <p className="error-message">Email is already been taken</p>}
             <div className="form-div"> <label htmlFor="pass">Password :</label>
                <input
                    id="pass"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)} value={pass} 
                    className={`input ${accept && pass.length < 8 ? 'error' :  'success' }`}
                    required
                /></div>
            {pass.length < 7 && accept && <p className="error-message">Password must be at least 8 characters long.</p>}
            <div className="form-div"> <label htmlFor="rpass">Repeat Password :</label>
                <input
                    id="rpass"
                    type="password"
                    placeholder="Repeat Password"
                    onChange={(e) => setRPass(e.target.value)} value={rpass}
                    className={`input ${accept && rpass !== pass && rpass == "" ? 'error' :  'success' }`}
                    required
                /></div>
            {rpass !== pass && accept && <p className="error-message">Passwords do not match.</p>}
            <div className="form-div">
                <button className="create-button" type="submit">Add</button>
            </div>
        </form>
    </div>
    )
}
