import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";

export default function CreateProduct() {
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [seller, setSeller] = useState('');
    const [payment, setPayment] = useState('');
    const [sold, setSold] = useState('');
    const [reste, setReste] = useState('');
    const [type, setType] = useState('');
    const [upDate, setUpDate] = useState('');
    const [upTime, setUpTime] = useState('');
    const [accept, setAccept] = useState('');

    const nav = useNavigate();

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            // Send data with Axios
            await axios.post('http://127.0.0.1:8000/api/factureAdd', {
                date,
                client,
                seller,
                payment,
                reste,
                sold,
                type,
                upDate,
                upTime
            });

            nav('/facture');
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
                <div className="form-div"><label htmlFor="seller">Seller:</label>
                    <input id="seller" type="number" min={1} placeholder="Enter Seller id " onChange={(e) => setSeller(e.target.value)} value={seller} required />
                </div>
                <div className="form-div"><label htmlFor="sold">Sold:</label>
                    <input id="sold" type="number" min={0} placeholder="Enter Sold " onChange={(e) => setSold(e.target.value)} value={sold} required />
                </div>
                <div className="form-div"><label htmlFor="reste">Reste:</label>
                    <input id="reste" type="number" min={0} placeholder="Enter Reste" onChange={(e) => setReste(e.target.value)} value={reste} required />
                </div>
                <div className="form-div"><label htmlFor="paid">Payment:</label>
                    <input id="paid" type="number" min={0} placeholder="Enter  Payment" onChange={(e) => setPayment(e.target.value)} value={payment} required />
                </div>
                <div className="form-div"><label htmlFor="type">Type:</label>
                    <input id="type" type="text" placeholder="Enter the type" onChange={(e) => setType(e.target.value)} value={type} required />
                </div> <div className="form-div"><label htmlFor="updd">Update Date :</label>
                    <input id="updd" type="date" placeholder="Enter date update" onChange={(e) => setUpDate(e.target.value)} value={upDate} required />
                </div> <div className="form-div"><label htmlFor="updt">Update Time:</label>
                    <input id="updt" type="datetime-local" placeholder="Enter time update" onChange={(e) => setUpTime(e.target.value)} value={upTime} required />
                </div><div className="form-div"><button className="create-button" type="submit">Add</button></div>
            </form>
        </div>
    );
}
