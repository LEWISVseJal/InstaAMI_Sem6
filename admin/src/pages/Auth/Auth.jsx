import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loading= useSelector((state)=>state.authReducer.loading)

  const [data, setData] = useState(initialState)
  
  const [confirmPass,setConfirmPass]=useState(true)

  const handleChange = (e) =>
  {
    setData({...data,[e.target.name]:e.target.value})
  }
  
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    dispatch(logIn(data, navigate));
  };
  
  const resetForm = () => {
    setConfirmPass(confirmPass);
    setData({initialState});
  }

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>InstaAmi Admin</h1>
        </div>
      </div>
      {/*Right Side */}
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Admin Login</h3>

        <div>
            <input
            required
            type="text"
            className="infoInput"
            name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
          />
        </div>

        <div>
            <input
              required
            type="password"
            className="infoInput"
            name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
        </div>
          <button className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading? "Loading..." : "Login"}
          </button>
      </form>
    </div>
  </div>
  );
};

export default Auth;