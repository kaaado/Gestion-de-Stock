import { NavLink } from "react-router-dom";
import './Nav.css'
export default function Nav(props) {
    return (
        <nav className="navBar">
            <NavLink to={props.to} className='navItem'>{props.name}</NavLink>
        </nav>
    )
}