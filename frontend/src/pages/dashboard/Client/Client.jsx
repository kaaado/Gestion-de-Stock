import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../../Components/Nav";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [runUseEf, setRun] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientGetAll')
      .then((result) => result.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
      });
  }, [runUseEf]);

  const handleSearch = (searchTerm) => {
    const filtered = clients.filter((client) =>
      Object.values(client).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredClients(filtered);
  };

  const clientShow = filteredClients.map((client, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{client.Name}</td>
      <td>{client.Phone_Number}</td>
      <td>{client.Address}</td>
      <td>{client.Sold_Total}</td>
      <td>{client.Reste}</td>
      <td>{client.Paid}</td>
      <td>{client.Credit}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${client.Id}`}>
            <i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i>
          </Link>
          <i onClick={() => deleteClient(client.Id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  async function deleteClient(id) {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/clientDel/${id}`);
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
        <Link to='addclient' className='add-btn'><i className="fa-solid fa-user-plus"></i></Link>
      </div>
      <div className="users">
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Client Name</th>
              <th>Phone Number</th>
              <th>Adresse</th>
              <th>Sold</th>
              <th>Rest</th>
              <th>Payed</th>
              <th>Credit</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
