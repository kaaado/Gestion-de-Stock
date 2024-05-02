import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav3 from "../../../Components/Nav3";
import axios from "axios";

export default function Facture() {
  const [factures, setFactures] = useState([]);
  const [clients, setClients] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [runUseEf, setRun] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const userCont = useContext(User);
  const token = userCont.auth.token;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/factureGetAll')
      .then((result) => result.json())
      .then((data) => {
        setFactures(data);
        setFilteredFactures(data);
      });

    fetch('http://127.0.0.1:8000/api/clientGetAll')
      .then((result) => result.json())
      .then((data) => {
        setClients(data);
      });

    // Assuming you have a seller API endpoint
    axios.get("http://127.0.0.1:8000/api/user/show", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => {
        setSellers(data.data);
      });
  }, [runUseEf]);

  const getClientNameById = (clientId) => {
    const client = clients.find((c) => c.Id === clientId);
    return client ? client.Name : '';
  };

  const getSellerNameById = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    return seller ? seller.name : sellerId;
  };

  const factureShow = filteredFactures.map((facture, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{facture.Date}</td>
      <td>{getClientNameById(facture.Id_Client)}</td>
      <td>{getSellerNameById(facture.Id_Seller)}</td>
      <td>{facture.Payment}</td>
      <td>{facture.Reste}</td>
      <td>{facture.Solde}</td>
      <td>{facture.Type}</td>
      <td>{facture.Update_Date}</td>
      <td>{facture.Update_Time}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${facture.Id}`}><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
          <i onClick={() => deleteFacture(facture.Id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  const deleteFacture = async (id) => {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/factureDel/${id}`);
      if (res.status === 200 || res.status === "done") {
        setRun((i) => i + 1);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = factures.filter((facture) =>
      Object.values(facture).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredFactures(filtered);
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <Nav3 />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button ><i className="fa-solid fa-search"></i></button>
        </div>
        <Link to='/add' className='add-btn'><i className="fa-solid fa-circle-plus"></i></Link>
      </div>
      <div className="users">
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Client</th>
              <th>Seller</th>
              <th>Payment</th>
              <th>Reste</th>
              <th>Solde</th>
              <th>Type</th>
              <th>Update Date</th>
              <th>Update Time</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {factureShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
