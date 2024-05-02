import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav3 from "../../../Components/Nav3";
import axios from "axios";
export default function Bon() {
  const [Bons, setBons] = useState([]);
  const [filteredBons, setFilteredBons] = useState([]);
  const [runUseEf, setRun] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [sellers, setSellers] = useState([]);
  
  const userCont = useContext(User);
  const token = userCont.auth.token
  


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/bondelivraisonGetAll')
      .then((result) => result.json())
      .then((data) => {
        setBons(data);
        setFilteredBons(data);
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
  const bonShow = filteredBons.map((bon, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{bon.Date}</td>
      <td>{bon.Old_Reste}</td>
      <td>{bon.Reste}</td>
      <td>{bon.Payment}</td>
      <td>{getClientNameById(bon.Id_Client)}</td>
      <td>{getSellerNameById(bon.Id_User)}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${bon.Id}`}><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
          <i onClick={() => deleteBon(bon.Id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  const deleteBon = async (id) => {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/bondelivraisonDel/${id}`);
      if (res.status === 200 || res.status === "done") {
        setRun((i) => i + 1);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = Bons.filter((bon) =>
      Object.values(bon).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredBons(filtered);
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
        <Link to='add' className='add-btn'><i className="fa-solid fa-circle-plus"></i></Link>
      </div>
      <div className="users">
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Old Reste</th>
              <th>Reste</th>
              <th>Payment</th>
              <th>Client</th>
              <th>User</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bonShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
