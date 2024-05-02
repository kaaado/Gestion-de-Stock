import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css"
import axios from "axios";

export default function CreateProduct() {
    const [name, setName] = useState('');
    const [ref, setRef] = useState('');
    const [barcode, setBarcode] = useState('');
    const [amount, setAmount] = useState('');
    const [buy, setBuy] = useState('');
    const [sell, setSell] = useState('');
    const [group, setGroup] = useState('');
    const [deposit, setDeposit] = useState('');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();
    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            // Send data with Axios
            await axios.post('http://127.0.0.1:8000/api/productAdd', {
                barcode,
                ref,
                name,
                buy,
                sell,
                amount,
                group,
                deposit
            });

            nav('/inventory/products');
        } catch (err) {
            // Handle errors if needed
        }
    }

    return (
        <div className="create-product-container" style={{ marginTop: "-10px" }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div">  <label htmlFor="name">product Name:</label>
                    <input id="name" type="text" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} value={name} required /></div>

                <div className="form-div"><label htmlFor="Reference">Reference:</label>
                    <input id="Reference" type="text" placeholder="Enter product Reference" onChange={(e) => setRef(e.target.value)} value={ref} required />
                </div>
                <div className="form-div"><label htmlFor="code">Bar Code:</label>
                    <input id="code" type="text" placeholder="Enter Bar Code" onChange={(e) => setBarcode(e.target.value)} value={barcode} required />
                </div>
                <div className="form-div"><label htmlFor="Amount">Amount:</label>
                    <input id="Amount" type="number" min={0} placeholder="Enter the number of products in stock" onChange={(e) => setAmount(e.target.value)} value={amount} required />
                </div>
                <div className="form-div"><label htmlFor="buy">Buy Price:</label>
                    <input id="buy" type="number" min={0} placeholder="Enter the buying price of the product" onChange={(e) => setBuy(e.target.value)} value={buy} required />
                </div>
                <div className="form-div"><label htmlFor="sell">Sell Price:</label>
                    <input id="sell" type="number" min={0} placeholder="Enter the selling price of the product" onChange={(e) => setSell(e.target.value)} value={sell} required />
                </div> <div className="form-div"><label htmlFor="categorie">Categorie:</label>
                    <input id="categorie" type="text" placeholder="Enter the  Id of Categorie" onChange={(e) => setGroup(e.target.value)} value={group} required />
                </div>
                <div className="form-div"><label htmlFor="deposit">Deposit:</label>
                    <input id="deposit" type="text" placeholder="Enter the Id of deposit" onChange={(e) => setDeposit(e.target.value)} value={deposit} required />
                </div><div className="form-div"><button className="create-button" type="submit">Add</button></div>
            </form>
        </div>
    );
}
