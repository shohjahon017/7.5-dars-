import React, { useRef, useState } from "react";
import { http } from "../axios";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [data, setData] = useState([]);
  // const

  function handleRegister(e) {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    http
      .get("auth/local/register")
      .then((data) => {
        if (data.status == 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container mx-auto justify-center flex mt-10">
      <h3>Register</h3>
      <form className="flex flex-col w-1/4    ">
        <input
          ref={usernameRef}
          className="border rounded-lg p-2 mt-2"
          type="text"
          placeholder="Enter Username..."
        />
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
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
