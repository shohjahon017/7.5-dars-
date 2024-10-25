import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Save user data (name, address) somewhere
    navigate("/orders");
  }

  return (
    <div className="container mx-auto my-10 p-4   rounded-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-1/4 flex flex-col justify-center mx-auto"
      >
        <div className="mb-4 ">
          <label htmlFor="name" className="block font-bold mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block font-bold mb-2 text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-lg p-3 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
        >
          Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
