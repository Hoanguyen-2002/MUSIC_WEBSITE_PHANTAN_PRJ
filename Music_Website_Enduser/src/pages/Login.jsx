import React, { useState } from "react";
import axios from 'axios';
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("hello");
    
    // Tạo một đối tượng chứa dữ liệu đăng nhập
    const loginData = {
      email: email,
      password: pass
    };
    
    // Gửi yêu cầu đăng nhập đến API
    axios.post("http://localhost:3000/user/login", loginData)
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
      <h2 className="login-register-header">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button className="login-btn" type="submit">Log In</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
