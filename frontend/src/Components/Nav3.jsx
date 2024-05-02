import { NavLink } from "react-router-dom";
import './Nav.css'
export default function Nav3() {
    return (
        <nav className="navBar">
            <NavLink to="/facture" className='navItem'>Facture</NavLink>
            <NavLink to="/bon" className='navItem'>Bon Livration</NavLink>
            <NavLink to="/fact" className='navItem'>Product Facture</NavLink>
        </nav>
    )
}
