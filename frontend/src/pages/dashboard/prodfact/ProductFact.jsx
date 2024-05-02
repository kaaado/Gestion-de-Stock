import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, json } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav3 from "../../../Components/Nav3";


export default function ProductFact() {
    const [products, setProducts] = useState([]);
    const [productfact, setProductFact] = useState([]);
    const [runUseEf, setRun] = useState(0);

    const userCont = useContext(User);
    const token = userCont.auth.token;

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/product_factGetAll')
            .then((result) => result.json())
            .then((data) => setProductFact(data));
            fetch('http://127.0.0.1:8000/api/productGetAll')
            .then((result) => result.json())
            .then((data) => setProducts(data));
    }, [runUseEf])
const getProductNameById = (productId) => {
    const product = products.find((c) => c.Id === productId);
    return product ? product.Name :  productId;
  };
    const productShow = productfact.map((prodfact, index) => <tr key={index} >
        <td>{index + 1}</td>
        <td>{getProductNameById(prodfact.Id_Prod)}</td>
        <td>{prodfact.Product_Price}</td>
        <td>{prodfact.Product_Qte}</td>
        <td>{prodfact.TVA}</td>
        <td>{(parseFloat(prodfact.Product_Price) * parseInt(prodfact.Product_Qte)) * parseFloat(prodfact.TVA)}</td>
        <td>{parseFloat(prodfact.Product_Price) * parseInt(prodfact.Product_Qte)}</td>
        <td>{(parseFloat(prodfact.Product_Price) * parseInt(prodfact.Product_Qte)) + (parseFloat(prodfact.Product_Price) * parseInt(prodfact.Product_Qte)) * parseFloat(prodfact.TVA)}</td>
        <td>
        </td>
        <td><div className="icon">
            <Link to={`${prodfact.Id_Fact}`} ><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
            <i onClick={() => { dellteProductFact(prodfact.Id_Fact, prodfact.Id_Prod) }} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div></td></tr >)
    const res = productfact.reduce((total, prodfact) => total + ((parseFloat(prodfact.Product_Price) * parseInt(prodfact.Product_Qte)) + parseFloat(prodfact.TVA)), 0)

    async function dellteProductFact(idf, idp) {
        try {
            let res = await fetch(`http://127.0.0.1:8000/api/product_factDel/${idf}/${idp}`)
            if (res.status === 200 || res.status === "done") {
                setRun((i) => i + 1)
            }
        } catch (error) {
        }
    }

    return (
        <>
         <Nav3 />
            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'flex-end' }}>
               
                <Link to='add' className='add-btn'><i className="fas fa-cart-plus"></i></Link>
            </div>
            <div className="users">
                <table className="user-table ">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th> Product</th>
                            <th>Product Price</th>
                            <th>Qte</th>
                            <th>TVA</th>
                            <th>TVA Price</th>
                            <th>Total Price</th>
                            <th>Total Price with TVA</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productShow}
                    </tbody>
                </table>
            </div>
        </>
    )
}
