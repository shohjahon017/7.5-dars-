import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    http
      .get(`products`)
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {loader && (
        <div className="mt-5">
          <RingLoader></RingLoader>
        </div>
      )}
      {products.length > 0 &&
        products.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => handleRedirect(product.id)}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-md rounded-xl border p-3 cursor-pointer "
            >
              <img
                className="h-[200px] w-full object-cover rounded-xl mb-3"
                src={product.attributes.image}
                alt={product.attributes.title}
              />
              <h3 className="text-center mb-2">{product.attributes.title}</h3>
              <h3 className="text-center text-gray-500">
                ${product.attributes.price}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
