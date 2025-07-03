// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import CartTotal from "../components/CartTotal";

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } =
//     useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = [];
//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size: item,
//               quantity: cartItems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempData);
//     }
//   }, [cartItems, products]);

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1={"YOUR"} text2={"CART"} />
//       </div>

//       <div>
//         {cartData.map((item, i) => {
//           const productsData = products.find(
//             (product) => product._id === item._id
//           );

//           return (
//             <div
//               className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//               key={i}
//             >
//               <div className="flex items-start gap-6">
//                 <img
//                   src={productsData.image[0]}
//                   className="w-16 sm:w-20"
//                   alt=""
//                 />
//                 <div>
//                   <p className="text-xs sm:text-lg font-medium">
//                     {productsData.name}
//                   </p>
//                   <div className="flex items-center gap-5 mt-2">
//                     <p>
//                       {currency}
//                       {productsData.price}
//                     </p>
//                     <p className="px-2 sm:px-3 sm:py-1 border bg-stale-50">
//                       {item.size}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <input
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                 type="number"
//                 min={1}
//                 defaultValue={item.quantity}
//                 onChange={(e) =>
//                   e.target.value === "" || e.target.value === "0"
//                     ? null
//                     : updateQuantity(
//                         item._id,
//                         item.size,
//                         Number(e.target.value)
//                       )
//                 }
//               />
//               <img
//                 src={assets.bin_icon}
//                 className="w-4 mr-4 sm:w-5 cursor-pointer"
//                 alt=""
//                 onClick={() => updateQuantity(item._id, item.size, 0)}
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//               onClick={() => navigate("/place-order")}
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="my-10">
      <div className="grid items-center grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] text-center text-gray-600 font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Remove</p>
      </div>
      <hr className="h-1 bg-gray-200" />

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`}>
            <div className="grid items-center grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] text-center my-4 text-gray-700">
              <img src={item.image} alt="" className="w-16" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{item.quantity}</p>
              <p>{item.size}</p>
              <div className="flex justify-center">
                <img
                  onClick={() => removeFromCart(item.productId, item.size)}
                  src={assets.cross_icon}
                  alt="Remove"
                  className="w-4 cursor-pointer"
                />
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p className="py-10 text-center">Your cart is empty.</p>
      )}

      <div className="flex flex-col-reverse gap-8 mt-10 md:flex-row">
        <CartTotal />
        <div className="flex-1">
          <p className="text-gray-500">
            If you have a promo code, enter it here
          </p>
          <div className="flex justify-between mt-2 bg-gray-200 rounded-md">
            <input
              className="px-3 bg-transparent border-none outline-none"
              type="text"
              placeholder="Promo code"
            />
            <button className="px-6 py-3 text-white bg-black rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;