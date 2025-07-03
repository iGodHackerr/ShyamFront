// import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";

// const CartTotal = () => {
//   const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);

//   return (
//     <div className="w-full ">
//       <div className="text-2xl">
//         <Title text1={"CART"} text2={"TOTAL"} />
//       </div>

//       <div className="flex flex-col gap-2 mt-2 text-sm">
//         <div className="flex justify-between">
//           <p>Subtotal</p>
//           <p>
//             {currency} {getCartAmount()}.00
//           </p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <p>Shipping Fee</p>
//           <p>
//             {currency} {delivery_fee}.00
//           </p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <b>Total</b>
//           <b>
//             {currency}{" "}
//             {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
//           </b>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTotal;




// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";

// const CartTotal = () => {
//   // Corrected function name here
//   const { getTotalCartAmount, cartItems } = useContext(ShopContext);
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col flex-1 gap-5">
//       <h1 className="text-2xl font-bold">Cart Totals</h1>
//       <div>
//         <div className="flex justify-between py-3 text-gray-600 border-b">
//           <p>Subtotal</p>
//           {/* And here */}
//           <p>₹{getTotalCartAmount()}</p>
//         </div>
//         <div className="flex justify-between py-3 text-gray-600 border-b">
//           <p>Shipping Fee</p>
//           <p>Free</p>
//         </div>
//         <div className="flex justify-between py-3 font-semibold border-b">
//           <p>Total</p>
//           {/* And here again */}
//           <p>₹{getTotalCartAmount()}</p>
//         </div>
//       </div>
//       <button
//         onClick={() => navigate("/place-order")}
//         className="px-6 py-3 text-white bg-pink-500 rounded-md"
//       >
//         PROCEED TO CHECKOUT
//       </button>
//     </div>
//   );
// };

// export default CartTotal;



// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";

// const CartTotal = () => {
//   const { getTotalCartAmount } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const subtotal = getTotalCartAmount();
//   // --- NEW: Conditional Shipping Logic ---
//   const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
//   const total = subtotal + shippingFee;

//   return (
//     <div className="flex flex-col flex-1 gap-5">
//       <h1 className="text-2xl font-bold">Cart Totals</h1>
//       <div>
//         <div className="flex justify-between py-3 text-gray-600 border-b">
//           <p>Subtotal</p>
//           <p>₹{subtotal}</p>
//         </div>
//         <div className="flex justify-between py-3 text-gray-600 border-b">
//           <p>Shipping Fee</p>
//           <p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p>
//         </div>
//         <div className="flex justify-between py-3 font-semibold border-b">
//           <p>Total</p>
//           <p>₹{total}</p>
//         </div>
//       </div>
//       <button
//         onClick={() => navigate("/place-order")}
//         className="px-6 py-3 text-white bg-pink-500 rounded-md"
//       >
//         PROCEED TO CHECKOUT
//       </button>
//     </div>
//   );
// };

// export default CartTotal;


import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  // Free shipping over ₹500
  const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="flex flex-col flex-1 gap-5">
      <h1 className="text-2xl font-bold">Cart Totals</h1>
      <div>
        <div className="flex justify-between py-3 text-gray-600 border-b">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>
        <div className="flex justify-between py-3 text-gray-600 border-b">
          <p>Shipping Fee</p>
          <p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p>
        </div>
        <div className="flex justify-between py-3 font-semibold border-b">
          <p>Total</p>
          <p>₹{total}</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/place-order")}
        className="px-6 py-3 text-white bg-pink-500 rounded-md"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default CartTotal;