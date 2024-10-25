import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";

function Orders() {
  const { cart } = useContext(CartContext);

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div
              key={item.id + item.color}
              className="flex border-b border-t p-4 gap-14 items-center justify-between mx-20"
            >
              <div>
                <img
                  width={200}
                  height={200}
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div>
                <h3 className="text-2xl font-sans font-bold ">{item.title}</h3>
                Color:
                <span
                  style={{ backgroundColor: item.color }}
                  className="block w-8 h-8 rounded-full cursor-pointer transition duration-200 transform hover:scale-110"
                ></span>
              </div>
              <div>
                <h3 className="">${item.price}</h3>
              </div>
              <div>
                <h3 className="">Quantity: {item.amount}</h3>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <h3 className="text-2xl font-bold">Total: ${calculateTotal()}</h3>
          </div>
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
}

export default Orders;
