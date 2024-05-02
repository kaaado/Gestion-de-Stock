import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"
import axios from "axios";


export default function EditBon() {
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [user, setUser] = useState('');
    const [payment, setPayment] = useState('');
    const [oldreste, setOldReste] = useState('');
    const [reste, setReste] = useState('');
    const [accept, setAccept] = useState('');

    const nav = useNavigate();
    const id = window.location.pathname.split("/").slice(-1)[0];


    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/api/bondelivraisonGet/${id}`)
                .then(res => res.json())
                .then((data) => {
                    setDate(data[0].Date);
                    setClient(data[0].Id_Client);
                    setUser(data[0].Id_User);
                    setPayment(data[0].Payment);
                    setReste(data[0].Reste);
                    setOldReste(data[0].Old_Reste);
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
            await axios.post(`http://127.0.0.1:8000/api/bondelivraisonUp/${id}`, {
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
                </div><div className="form-div"><button className="create-button" type="submit">Update</button></div>
            </form>
        </div>
    )
}