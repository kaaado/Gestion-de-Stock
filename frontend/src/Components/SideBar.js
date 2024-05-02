import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie"
import Swal from "sweetalert2"
import "./SideBar.css"

export default function SideBar() {
    const cookie = new Cookies();
    const token = cookie.get('Bearer')
    const nav = useNavigate()
    const bodyElement = document.body;
    async function handleLogout() {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        cookie.remove('Bearer')
        Swal.fire({
            title: 'Logout Succsessfully',
            icon: 'success',
            showConfirmButton: false,
            backdrop: true,
        })
        setTimeout(() => {
            window.location.reload()
            nav('/')
        }, 1700)
    }
    return (
        <aside className="sideBar">
            <div className="logo-container">
                <div className="logo"></div>
                <h1>Stock IT</h1>
            </div>
            <div className="make-btn">
                <Link to='/invoice' className="sideButton"><i className="fa-solid fa-plus"></i>Make order</Link>
            </div>
            <div className="sideIem-container">
                {/* <NavLink to="/" className="sideItem d-flex"><i className="fa-solid fa-house" ></i>Dashboard</NavLink> */}
                <NavLink to="/" className="sideItem d-flex"><i className="fas fa-shopping-cart" ></i>Sell</NavLink>
                <NavLink to="/inventory" className="sideItem d-flex"><i className="fa-solid fa-warehouse" ></i>Inventory</NavLink>
                <NavLink to="/users" className="sideItem d-flex"><i className="fa-solid fa-user-tie" ></i>Adminstration</NavLink>
                <NavLink to="/about" className="sideItem d-flex"><i className="fa-solid fa-circle-info" ></i>About Us</NavLink>
            </div><div style={{ position: "absolute", bottom: '20px' }}>
                <Link className="sideItem d-flex" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" ></i>Logout</Link>
            </div>

        </aside>
    )
}
