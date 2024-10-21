import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const token = localStorage.getItem("token");

  const removeFromCart = (id, color) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.color === color))
    );
  };

  const handleChangeCount = (count, id, color) => {
    let copied = [...cart];
    copied = copied.map((value) => {
      if (value.id === id && value.color === color) {
        value.amount = Number(count);
      }
      return value;
    });
    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  };

  return (
    <div className="container mx-auto">
      {cart.length > 0 ? (
        cart.map((value) => (
          <div
            key={value.id + value.color}
            className="flex border-b border-t p-4 gap-14 items-center justify-between mx-20"
          >
            <div>
              <img
                width={200}
                height={200}
                src={value.image}
                alt={value.title}
              />
            </div>
            <div>
              <h3 className="text-2xl font-sans font-bold ">{value.title}</h3>
              Color:
              <span
                style={{ backgroundColor: value.color }}
                className="block w-8 h-8 rounded-full cursor-pointer transition duration-200 transform hover:scale-110"
              ></span>
            </div>
            <div>
              <select
                className="border p-1 rounded-lg "
                value={value.amount}
                onChange={(e) =>
                  handleChangeCount(e.target.value, value.id, value.color)
                }
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div>
              <h3 className="">${value.price}</h3>
            </div>
            <button
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              onClick={() => removeFromCart(value.id, value.color)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p></p>
      )}
      {token ? (
        <button>PROCEED TO CHECKOUT</button>
      ) : (
        <button>PLEASE LOGIN</button>
      )}
    </div>
  );
}

export default Cart;
