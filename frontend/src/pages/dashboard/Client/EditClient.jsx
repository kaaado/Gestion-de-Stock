import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";


export default function EditProduct() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setAdresse] = useState('');
    const [sold, setSold] = useState('');
    const [reste, setReste] = useState('');
    const [paid, setPaid] = useState('');
    const [credit, setCredit] = useState('');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/api/clientGet/${id}`)
                .then(res => res.json())
                .then((data) => {
                    setName(data[0].Name);
                    setPhone(data[0].Phone_Number);
                    setAdresse(data[0].Address);
                    setCredit(data[0].Credit);
                    setReste(data[0].Reste);
                    setSold(data[0].Sold_Total);
                    setPaid(data[0].Paid);
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
            await axios.post(`http://127.0.0.1:8000/api/clientUp/${id}`, {
                name,
                phone,
                adresse,
                sold,
                reste,
                paid,
                credit
            });


            nav('/inventory/client');
        } catch (err) {
            // Handle errors if needed

        }
    }

    return (
        <div className="create-product-container" style={{ marginTop: '-15px' }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div">  <label htmlFor="name">Client Name:</label>
                    <input id="name" type="text" placeholder="Enter Client name" onChange={(e) => setName(e.target.value)} value={name} required /></div>
                <div className="form-div"><label htmlFor="phone">Phone Number:</label>
                    <input id="phone" type="tel" placeholder="Enter Client phone number" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="form-div"><label htmlFor="adresse">Adresse:</label>
                    <input id="adresee" type="text" placeholder="Enter Client adresse" onChange={(e) => setAdresse(e.target.value)} value={adresse} required />
                </div>
                <div className="form-div"><label htmlFor="sold">Sold Total:</label>
                    <input id="sold" type="number" min={0} placeholder="Enter Client Sold Total" onChange={(e) => setSold(e.target.value)} value={sold} required />
                </div>
                <div className="form-div"><label htmlFor="reste">Reste:</label>
                    <input id="reste" type="number" min={0} placeholder="Enter Client Reste" onChange={(e) => setReste(e.target.value)} value={reste} required />
                </div>
                <div className="form-div"><label htmlFor="paid">Paid:</label>
                    <input id="paid" type="number" min={0} placeholder="Enter Client Paid" onChange={(e) => setPaid(e.target.value)} value={paid} required />
                </div>
                <div className="form-div"><label htmlFor="credit">Credit Limit:</label>
                    <input id="credit" type="number" min={0} placeholder="Enter the the Credit limit for the Client" onChange={(e) => setCredit(e.target.value)} value={credit} required />
                </div> <div className="form-div"><button className="create-button" type="submit">Update</button></div>
            </form>
        </div>
    )
}