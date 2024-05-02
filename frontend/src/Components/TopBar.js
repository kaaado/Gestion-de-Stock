import { NavLink } from 'react-router-dom';
import "./TopBar.css"
import { useContext, useEffect, useState } from "react";
import {User} from '../../src/pages/website/Context/UserContext';

export default function TopBar() {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const context = useContext(User)
    useEffect(() => {
        setName(context.auth.userDetails.name)
        setMail(context.auth.userDetails.email)
    }, [])

    return (
        <header>
            <div ></div>
            <div className="info">
                <div className='user-profil'>
                    <img src={require('../image/user-photo.png')} alt="user-photo" />
                    <div className="user-info">
                        <p><b>{name}</b></p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
