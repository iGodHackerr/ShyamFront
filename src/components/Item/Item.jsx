import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, name, image, price }) => {
  return (
    <Link to={`/product/${id}`} className="flex flex-col gap-2 transition-transform duration-300 ease-in-out transform hover:scale-105">
      <img
        onClick={() => window.scrollTo(0, 0)}
        src={image}
        alt={name}
        className="object-cover w-full rounded-md"
      />
      <p className="text-sm font-light text-gray-700">{name}</p>
      <div className="flex items-center gap-4">
        {/* Display the price passed down from the parent */}
        <p className="text-lg font-semibold text-gray-800">₹{price}</p>
      </div>
    </Link>
  );
};

export default Item;