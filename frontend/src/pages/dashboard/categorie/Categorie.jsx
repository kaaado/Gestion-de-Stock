import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav from "../../../Components/Nav";

export default function Categorie() {
  const [categorie, setCategorie] = useState([]);
  const [filteredCategorie, setFilteredCategorie] = useState([]);
  const [runUseEf, setRun] = useState(0);
  const [searchI, setSearchI] = useState("");

  const userCont = useContext(User);
  const token = userCont.auth.token;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/groupetGetAll")
      .then((result) => result.json())
      .then((data) => {
        setCategorie(data);
        setFilteredCategorie(data);
      });
  }, [runUseEf]);

  const categorieShow = filteredCategorie.map((categorie, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{categorie.Name}</td>
      <td></td>
      <td>
        <div className="icon">
          <Link to={`${categorie.Id}`}><i className="fa-solid fa-pen" style={{ color: '#fff', cursor: 'pointer' }}></i></Link>
          <i onClick={() => deleteCate(categorie.Id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  const deleteCate = async (id) => {
    try {
      let res = await fetch(`http://127.0.0.1:8000/api/groupeDel/${id}`);
      if (res.status === 200 || res.status === "done") {
        setRun((i) => i + 1);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = categorie.filter((cat) =>
      cat.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategorie(filtered);
    setSearchI(searchTerm);
  };

  return (
    <>
      <Nav />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchI}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button ><i className="fa-solid fa-search"></i></button>
        </div>
        <Link to='add' className='add-btn'><i className="fa-solid fa-circle-plus"></i></Link>
      </div>
      <div className="users" style={{ fontSize: '18px' }}>
        <table className="user-table ">
          <thead>
            <tr>
              <th>N°</th>
              <th>Categorie Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categorieShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
