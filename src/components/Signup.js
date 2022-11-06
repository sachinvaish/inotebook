import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
function Signup() {

  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = credentials.name;
    const email = credentials.email;
    const password = credentials.password;
    try {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      console.log(json);
      if (json.authToken) {
        showAlert(json.message);
        navigate("/login");
      } else {
        showAlert(json.message);
      }
    } catch (error) {
        showAlert("Server Connection Failed");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (credentials.password !== credentials.cpassword) {
      showAlert("Password fields doesn't match");
    }
  }

  return (
    <div>
      <div className="container">
        <h3 className="my-2">Sign up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input required type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input required type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" pattern="+@globex\.com" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input required type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input required type="password" className="form-control" onChange={onChange} value={credentials.cpassword} id="cpassword" name="cpassword" />
          </div>
          <button disabled={credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
