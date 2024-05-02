import { NavLink } from "react-router-dom";
import './Nav.css'
export default function Nav() {
    return (
        <nav className="navBar">
            <NavLink to="/inventory/products" className='navItem'>Product</NavLink>
            <NavLink to="/inventory/client" className='navItem'>Client</NavLink>
            <NavLink to="/inventory/deposit" className='navItem'>Deposits</NavLink>
            <NavLink to="/inventory/categorie" className='navItem'>Categories</NavLink>
        </nav>
    )
}
