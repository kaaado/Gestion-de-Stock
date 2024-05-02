import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
import Nav2 from "../../../Components/Nav2";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [runUseEf, setRun] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const userCont = useContext(User);
  const token = userCont.auth.token;
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user/show", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((data) =>{ 
        setUsers(data.data); 
        setFilteredUsers(data.data);
      })
}, [runUseEf])
 
  const userShow = filteredUsers.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className="icon">
          <Link to={`${user.id}`}><i className="fa-solid fa-user-pen" style={{ color: 'white', cursor: 'pointer' }}></i></Link>
          <i onClick={() => deleteUser(user.id)} className="fa-solid fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>
      </td>
    </tr>
  ));

  const deleteUser = async (id) => {
    try {
      const { value: password } = await MySwal.fire({
        title: 'Enter your pin',
        input: 'password',
        inputPlaceholder: 'Enter your pin',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter your pin!';
          }
        },
      });

      if (password) {
        if (password === "1234") {
         
          let res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          if (res.status === 200) {
            setRun((i) => i + 1);
          }
        } else {
          MySwal.fire('Error', 'Incorrect password', 'error');
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <Nav2 to="/users" name="Users" />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={() => { }}><i className="fa-solid fa-search"></i></button>
        </div>
        <Link to='createuser' className='add-btn'><i className="fas fa-user-plus"></i></Link>
      </div>
      <div className="users" style={{ fontSize: '19px' }}>
        <table className="user-table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userShow}
          </tbody>
        </table>
      </div>
    </>
  );
}
