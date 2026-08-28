import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [state, setState] = useState("");
  const [userName, setUserName] = useState("");

  const fetchDealers = async (selectedState) => {
    const url = selectedState
      ? `http://localhost:3030/fetchDealers/${selectedState}`
      : `http://localhost:3030/fetchDealers`;
    const res = await fetch(url);
    const data = await res.json();
    setDealers(data);
  };

  useEffect(() => {
    fetchDealers("");
    const storedUser = sessionStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleFilter = (e) => {
    const selected = e.target.value;
    setState(selected);
    fetchDealers(selected);
  };

  return (
    <div>
      <nav>
        <span>Cars Dealership</span>
        {userName ? <span>Welcome, {userName}</span> : <Link to="/register">Register</Link>}
      </nav>
      <h1>Dealers</h1>
      <select value={state} onChange={handleFilter}>
        <option value="">All States</option>
        <option value="Kansas">Kansas</option>
        <option value="Illinois">Illinois</option>
        <option value="Texas">Texas</option>
        <option value="Colorado">Colorado</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>City</th><th>State</th><th>Address</th><th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map((dealer) => (
            <tr key={dealer.id}>
              <td><Link to={`/dealer/${dealer.id}`}>{dealer.full_name}</Link></td>
              <td>{dealer.city}</td>
              <td>{dealer.state}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;