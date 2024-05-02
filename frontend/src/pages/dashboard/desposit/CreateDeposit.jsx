import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";

export default function CreateDeposit() {
    const [name, setName] = useState('');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();
    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            // Send data with Axios
            await axios.post('http://127.0.0.1:8000/api/depositAdd', {
                name
            });

            nav('/inventory/deposit');
        } catch (err) {
            // Handle errors if needed
        }
    }


    return (
        <div className="create-product-container" style={{ marginTop: '200px' }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div">  <label htmlFor="name">Deposit Name:</label>
                    <input id="name" type="text" placeholder="Enter Deposit name" onChange={(e) => setName(e.target.value)} value={name} required /></div>
                <div className="form-div"><button className="create-button" type="submit">Add</button></div>
            </form >
        </div >
    );
}
