import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../components/CartContext";

function Details() {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((data) => {
        if (data.status === 200) {
          setProduct(data.data.data);
          setColor(data.data.data.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddToBag = (e) => {
    e.preventDefault();

    const card = {
      id: product.id,
      title: product.attributes.title,
      color,
      cart: cart,
      amount: Number(amount),
      price: product.attributes.price,
      image: product.attributes.image,
    };

    let copied = [...cart];
    let isExist = copied.find(function (c) {
      return c.id == card.id && color == c.color;
    });

    if (!isExist) {
      copied.push(card);
    } else {
      copied = copied.map(function (value) {
        if (value.id == card.id && value.color == color) {
          value.amount += Number(card.amount);
        }
        return value;
      });
    }

    setCart(copied);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container mx-auto my-40 ">
      {product.id && (
        <div className="flex gap-10">
          <img
            className=" ml-40 w-1/3 h-[600px] rounded-lg object-cover"
            src={product.attributes.image}
            alt=""
          />
          <div className="w-1/2 mt-10">
            <h3 className="text-4xl font-bold mb-4">
              {product.attributes.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {product.attributes.description}
            </p>
            <h3 className="text-2xl font-bold mb-6">
              ${product.attributes.price}
            </h3>

            <h4 className="text-2xl font-bold ">Colors</h4>
            <div className="flex space-x-2 mb-4">
              {product.attributes.colors &&
                product.attributes.colors.map((colorProduct) => (
                  <span
                    key={colorProduct}
                    style={{
                      backgroundColor: colorProduct,
                      border:
                        color === colorProduct ? "2px solid black" : "none",
                    }}
                    onClick={() => {
                      setColor(colorProduct);
                    }}
                    className="block w-8 h-8 rounded-full cursor-pointer transition duration-200 transform hover:scale-110"
                  ></span>
                ))}
            </div>
            <div>
              <h4 className="text-2xl font-bold">Amount</h4>
              <select
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-3 border rounded-md mb-6"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <button
              onClick={handleAddToBag}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Add to Bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
