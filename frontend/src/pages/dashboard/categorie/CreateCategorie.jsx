import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import "../products/Product.css"

export default function CreateCategorie() {
    const [name, setName] = useState('');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();

    async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
        // Send data with Axios
        await axios.post('http://127.0.0.1:8000/api/groupeAdd', {
            name
        });

        nav('/inventory/categorie');
    } catch (err) {
        // Handle errors if needed
        
    }
}


    return (
        <div className="create-product-container" style={{ marginTop: '200px' }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div">  <label htmlFor="name">Categorie Name:</label>
                    <input id="name" type="text" placeholder="Enter Categorie name" onChange={(e) => setName(e.target.value)} value={name} required /></div>
                <div className="form-div"><button className="create-button" type="submit">Add</button></div>
            </form>
        </div>
    );
}
