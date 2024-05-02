import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../../Components/Nav";

export default function Deposit() {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [runUseEf, setRun] = useState(0);



  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/depositGetAll')
      .then((result) => result.json())
      .then((data) => {
        setDeposits(data);
        setFilteredDeposits(data);
      });
  }, [runUseEf]);

  const handleSearch = (searchTerm) => {
    const filtered = deposits.filter((deposit) =>
      Object.values(deposit).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredDeposits(filtered);
  };

  const depositShow = filteredDeposits.map((deposit, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{deposit.Name}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${deposit.Id}`}><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
          <i onClick={() => deleteDeposit(deposit.Id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  async function deleteDeposit(id) {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/depositDel/${id}`);
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
        <Link to='adddeposit' className='add-btn'><i className="fa-solid fa-circle-plus"></i></Link>
      </div>
      <div className="users" style={{ fontSize: '18px' }}>
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Deposit Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {depositShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
