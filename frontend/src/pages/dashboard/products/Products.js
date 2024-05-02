import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav from "../../../Components/Nav";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [runUseEf, setRun] = useState(0);

  const userCont = useContext(User);
  const token = userCont.auth.token;

  useEffect(() => {
    // Fetch products
    fetch('http://127.0.0.1:8000/api/productGetAll')
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });

    // Fetch deposits
    fetch('http://127.0.0.1:8000/api/depositGetAll')
      .then((result) => result.json())
      .then((data) => {
        setDeposits(data);
      });
  }, [runUseEf]);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      Object.values(product).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  };

  const getDepositNameById = (depositId) => {
    const deposit = deposits.find((dep) => dep.Id === depositId);
    return deposit ? deposit.Name : '';
  };

  const productShow = filteredProducts.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.Reference}</td>
      <td>{product.Bar_Code}</td>
      <td>{product.Name}</td>
      <td>{product.Stock}</td>
      <td>{product.Buying_Price}</td>
      <td>{product.Selling_Price}</td>
      <td>{getDepositNameById(product.Id_Deposit)}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${product.Id}`}><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
          <i onClick={() => { deleteProduct(product.Id) }} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  async function deleteProduct(id) {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/productDel/${id}`);
      if (res.status === 200 || res.status === "done") {
        setRun((i) => i + 1);
      }
    } catch (error) {
      // Handle error
    }
  }

  return (
    <>
      <Nav />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button ><i className="fa-solid fa-search"></i></button>
        </div>
        <Link to='create' className='add-btn'><i className="fas fa-cart-plus"></i></Link>
      </div>
      <div className="users">
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Reference</th>
              <th>Bar Code</th>
              <th>Product</th>
              <th>Qte</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Deposit</th>
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
  );
}
