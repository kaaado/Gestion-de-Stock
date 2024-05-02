import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";


export default function EditDeposit() {
    const [name, setName] = useState('');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/api/depositGet/${id}`)
                .then(res => res.json())
                .then((data) => {
                    setName(data[0].Name);
                }
                )
        }
        catch (err) { }
    }, [])
    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            // Send data with Axios
            await axios.post(`http://127.0.0.1:8000/api/depositUp/${id}`, {
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
                <div className="form-div"><button className="create-button" type="submit">Update</button></div>
            </form>
        </div>
    )
}