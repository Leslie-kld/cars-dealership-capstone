import React, { useState } from 'react';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const register = async (e) => {
    e.preventDefault();
        const res = await fetch("http://localhost:8080/djangoapp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, firstName, lastName, email }),
    });
     const json = await res.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem("userName", json.userName);
      window.location.href = "/";
    }
  };

  return (
    <div className="register_page">
      <form onSubmit={register}>
        <div>
          <label>Username</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;