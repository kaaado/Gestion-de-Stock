import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";

export default function CreateBon() {
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [user, setUser] = useState('');
    const [payment, setPayment] = useState('');
    const [oldreste, setOldReste] = useState('');
    const [reste, setReste] = useState('');
    const [accept, setAccept] = useState('');

    const nav = useNavigate();

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            // Send data with Axios
            await axios.post('http://127.0.0.1:8000/api/bondelivraisonAdd', {
                date,
                oldreste,
                reste,
                payment,
                client,
                user
            });

            nav('/bon');
        } catch (err) {
            // Handle errors if needed
        }
    }

    return (
        <div className="create-product-container" style={{ marginTop: '-15px' }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div">  <label htmlFor="client">Client :</label>
                    <input id="client" type="number" min={1} placeholder="Enter Client Id" onChange={(e) => setClient(e.target.value)} value={client} required /></div>
                <div className="form-div"><label htmlFor="date">Date:</label>
                    <input id="date" type="date" placeholder="Enter date" onChange={(e) => setDate(e.target.value)} value={date} required />
                </div>
                <div className="form-div"><label htmlFor="user">User:</label>
                    <input id="user" type="number" min={1} placeholder="Enter User id " onChange={(e) => setUser(e.target.value)} value={user} required />
                </div>
                <div className="form-div"><label htmlFor="oldreste">Old Reste:</label>
                    <input id="oldreste" type="number" min={0} placeholder="Enter Sold " onChange={(e) => setOldReste(e.target.value)} value={oldreste} required />
                </div>
                <div className="form-div"><label htmlFor="reste">Reste:</label>
                    <input id="reste" type="number" min={0} placeholder="Enter Reste" onChange={(e) => setReste(e.target.value)} value={reste} required />
                </div>
                <div className="form-div"><label htmlFor="paid">Payment:</label>
                    <input id="paid" type="number" min={0} placeholder="Enter  Payment" onChange={(e) => setPayment(e.target.value)} value={payment} required />
                </div>
                <div className="form-div"><button className="create-button" type="submit">Add</button></div>
            </form>
        </div>
    );
}
