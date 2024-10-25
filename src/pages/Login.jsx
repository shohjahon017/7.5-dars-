import React, { useRef, useState } from "react";
import { http } from "../axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://strapi-store-server.onrender.com/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container mx-auto justify-center flex mt-10">
      <form className="flex flex-col w-1/4" onSubmit={handleLogin}>
        <input
          ref={emailRef}
          className="border rounded-lg p-2 mt-2"
          type="email"
          placeholder="Enter Email..."
        />
        <input
          ref={passwordRef}
          className="border rounded-lg p-2 mt-2"
          type="password"
          placeholder="Enter Password..."
        />
        <button
          className="mt-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
        <Link to="/register" className="text-blue-500">
          Register ga o'tish
        </Link>
      </form>
    </div>
  );
}

export default Login;
