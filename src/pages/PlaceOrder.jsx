// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const {
//     products,
//     delivery_fee,
//     cartItems,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setCartItems,
//   } = useContext(ShopContext);

//   const [method, setMethod] = useState("cod");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     zipcode: "",
//     phone: "",
//     state: "",
//     street: "",
//     country: "",
//     city: "",
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const orderItems = [];

//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(
//               products.find((product) => product._id === items)
//             );

//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee,
//       };

//       switch (method) {
//         //API CALLS FOR COF
//         case "cod":
//           const res = await axios.post(
//             backendUrl + "/api/order/place",
//             orderData,
//             { headers: { token } }
//           );
//           if (res.data.success) {
//             setCartItems({});
//             navigate("/orders");
//           } else {
//             toast.error(res.data.message);
//           }
//           break;

//         case "stripe":
//           const responseStripe = await axios.post(
//             backendUrl + "/api/order/stripe",
//             orderData,
//             { headers: { token } }
//           );

//           if (responseStripe.data.success) {
//             const { session_url } = responseStripe.data;
//             window.location.replace(session_url);
//           } else {
//             toast.error(responseStripe.data.message);
//           }

//           break;

//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
//     >
//       {/* LEST SIDE */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//         </div>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="First name"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="firstName"
//             value={formData.firstName}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last name"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="lastName"
//             value={formData.lastName}
//             required
//           />
//         </div>

//         <input
//           type="email"
//           placeholder="Email address"
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           onChange={onChangeHandler}
//           name="email"
//           value={formData.email}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Street"
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           onChange={onChangeHandler}
//           name="street"
//           value={formData.street}
//           required
//         />

//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="City"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="city"
//             value={formData.city}
//             required
//           />
//           <input
//             type="text"
//             placeholder="State"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="state"
//             value={formData.state}
//             required
//           />
//         </div>

//         <div className="flex gap-3">
//           <input
//             type="number"
//             placeholder="Zipcode"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="zipcode"
//             value={formData.zipcode}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Country"
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//             onChange={onChangeHandler}
//             name="country"
//             value={formData.country}
//             required
//           />
//         </div>
//         <input
//           type="number"
//           placeholder="Phone"
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           onChange={onChangeHandler}
//           name="phone"
//           value={formData.phone}
//           required
//         />
//       </div>

//       {/* RIGHT SIDE */}

//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>
//         <div className="mt-12">
//           <Title text1={"PAYMENT"} text2={"METHOD"} />

//           {/* PAYMENT METHOD SELECTION */}
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div
//               onClick={() => setMethod("stripe")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "stripe" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
//             </div>
//             <div
//               onClick={() => setMethod("razorpay")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "razorpay" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
//             </div>
//             <div
//               onClick={() => setMethod("cod")}
//               className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === "cod" ? "bg-green-400" : ""
//                 }`}
//               ></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">
//                 CASH ON DELIVERY
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               className="bg-black text-white px-16 py-3 text-sm"
//               type="submit"
//             >
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, cartItems, products } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     firstName: "", lastName: "", email: "", street: "",
//     city: "", state: "", zipcode: "", country: "", phone: ""
//   });
//   const [paymentMethod, setPaymentMethod] = useState("stripe");

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//         toast.error("Your cart is empty.");
//         return;
//     }
//     const amount = getTotalCartAmount() > 0 ? getTotalCartAmount() + 50 : 0;
//     const orderData = { address: data, items: cartItems, amount: amount };

//     try {
//       if (!token) {
//         toast.error("You must be logged in.");
//         return;
//       }
//       let endpoint = paymentMethod === "stripe" ? "/place" : "/placecod";
//       const response = await axios.post(`${backendUrl}/api/order${endpoint}`, orderData, { headers: { token } });
      
//       if (response.data.success) {
//         if (paymentMethod === "stripe") {
//           window.location.replace(response.data.session_url);
//         } else {
//           toast.success("Order placed successfully!");
//           navigate("/orders");
//         }
//       } else {
//         toast.error(response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       toast.error("Failed to place order. Please try again.");
//     }
//   };

//   useEffect(() => {
//     // --- THIS IS THE FIX ---
//     // Only redirect if the main product list has loaded AND the cart is empty.
//     if (products.length > 0 && (!token || getTotalCartAmount() === 0)) {
//       toast.info("Your cart is empty. Redirecting...");
//       navigate("/cart");
//     }
//   }, [token, getTotalCartAmount, navigate, products]);

//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col items-start justify-between gap-8 py-10 md:flex-row">
//       {/* Address Information inputs... */}
//       <div className="w-full max-w-[500px]">
//         <p className="mb-8 text-3xl font-bold">Delivery Information</p>
//         <div className="flex gap-3">
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name"/>
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name"/>
//         </div>
//         <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address"/>
//         <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street"/>
//         <div className="flex gap-3">
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
//         </div>
//         <div className="flex gap-3">
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code"/>
//           <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
//         </div>
//         <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
//       </div>

//       {/* Cart Totals and Payment Method */}
//       <div className="w-full max-w-[400px]">
//         <div className="flex flex-col flex-1 gap-5">
//             <h2 className="text-2xl font-bold">Cart Totals</h2>
//             <div>
//                 <div className="flex justify-between py-3 text-gray-600 border-b"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
//                 <div className="flex justify-between py-3 text-gray-600 border-b"><p>Shipping Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p></div>
//                 <div className="flex justify-between py-3 font-semibold border-b"><p>Total</p><p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p></div>
//             </div>
//             <div className="mt-6">
//                 <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>
//                 <div className="flex flex-col gap-3">
//                     <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="w-5 h-5"/><span>Pay with Stripe</span></label>
//                     <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-5 h-5" /><span>Cash on Delivery</span></label>
//                 </div>
//             </div>
//             <button type="submit" className="w-full px-6 py-3 mt-4 text-white bg-pink-500 rounded-md">
//                 {paymentMethod === "stripe" ? "PROCEED TO PAYMENT" : "PLACE ORDER (COD)"}
//             </button>
//         </div>
//       </div>
//     </form>
//   );
// };
// export default PlaceOrder;


import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const subtotal = getTotalCartAmount();
  // Free shipping over ₹500
  const shippingFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const totalAmount = subtotal + shippingFee;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
        toast.error("Your cart is empty.");
        return;
    }
    const orderData = {
      address: data,
      items: cartItems,
      amount: totalAmount, // Send the final calculated amount
    };

    try {
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }
      let endpoint = paymentMethod === "stripe" ? "/place" : "/placecod";
      const response = await axios.post(`${backendUrl}/api/order${endpoint}`, orderData, { headers: { token } });
      
      if (response.data.success) {
        if (paymentMethod === "stripe") {
          window.location.replace(response.data.session_url);
        } else {
          toast.success("Order placed successfully!");
          navigate("/orders");
        }
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    if (products.length > 0 && (!token || getTotalCartAmount() === 0)) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate, products]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start justify-between gap-8 py-10 md:flex-row">
      <div className="w-full max-w-[500px]">
        <p className="mb-8 text-3xl font-bold">Delivery Information</p>
        <div className="flex gap-3"><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name"/><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name"/></div>
        <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address"/>
        <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street"/>
        <div className="flex gap-3"><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/></div>
        <div className="flex gap-3"><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code"/><input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/></div>
        <input className="w-full p-2 mb-4 border border-gray-400 rounded-md" required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
      </div>
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col flex-1 gap-5">
            <h2 className="text-2xl font-bold">Cart Totals</h2>
            <div>
                <div className="flex justify-between py-3 text-gray-600 border-b"><p>Subtotal</p><p>₹{subtotal}</p></div>
                <div className="flex justify-between py-3 text-gray-600 border-b"><p>Shipping Fee</p><p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p></div>
                <div className="flex justify-between py-3 font-semibold border-b"><p>Total</p><p>₹{totalAmount}</p></div>
            </div>
            <div className="mt-6">
                <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="w-5 h-5"/><span>Pay with Stripe</span></label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-5 h-5" /><span>Cash on Delivery</span></label>
                </div>
            </div>
            <button type="submit" className="w-full px-6 py-3 mt-4 text-white bg-pink-500 rounded-md">
                {paymentMethod === "stripe" ? "PROCEED TO PAYMENT" : "PLACE ORDER (COD)"}
            </button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;