import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../products/Product.css"


export default function EditProductFact() {
    const [prod, setProd] = useState('');
    const [price, setPrice] = useState('');
    const [qte, setQte] = useState('');
    const [tva, setTva] = useState('0.19');
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();
    const id = window.location.pathname.split("/").slice(-1)[0];



    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/api/product_factGet/${id}`)
                .then(res => res.json())
                .then((data) => {
                    setProd(data[0].Id_Prod);
                    setPrice(data[0].Product_Price);
                    setQte(data[0].Product_Qte);
                    setTva(data[0].TVA);
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
            await axios.post(`http://127.0.0.1:8000/api/product_factUp/${id}`, {
                value1: price,
                value2: qte,
                value3: tva,
                value4: prod
            });

            nav('/fact');
        } catch (err) {
            // Handle errors if needed
            
        }
    }


    return (
        <div className="create-product-container" style={{ marginTop: "150px" }}>
            <form className="create-product-form" onSubmit={Submit}>
                <div className="form-div"><label htmlFor="n">Product id:</label>
                    <input id="n" type="number" min={0} placeholder="Enter the id of product" onChange={(e) => setProd(e.target.value)} value={prod} required /></div>
                <div className="form-div">  <label htmlFor="nam">Product Price:</label>
                    <input id="nam" type="number" min={0} placeholder="Enter the price of product" onChange={(e) => setPrice(e.target.value)} value={price} required /></div>
                <div className="form-div">  <label htmlFor="na">Product Qte:</label>
                    <input id="na" type="number" min={0} placeholder="Enter Product Qte" onChange={(e) => setQte(e.target.value)} value={qte} required /></div>
                <div className="form-div"><button className="create-button" type="submit">Update</button></div>
            </form>
        </div>
    )
}
