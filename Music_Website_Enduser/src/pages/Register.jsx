import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  //   console.log(pass);
  //   console.log(confirmPass);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    
    // Tạo một đối tượng chứa dữ liệu đăng nhập
    const registerData = {
      email: email,
      password: pass,
      confirmPass : confirmPass
    };
    
    // Gửi yêu cầu đăng nhập đến API
    axios.post("http://localhost:3000/user/register", registerData)
      .then(response => {
        // Xử lý phản hồi từ API
        console.log(response.data);
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="login-register-header">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            placeholder="********"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <button className="register-btn" type="submit">Register</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("login")}
      >
        Already have an account? Log in here.
      </button>
    </div>
  );
};
