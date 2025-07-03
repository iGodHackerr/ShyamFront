// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);

//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null;
//       }

//       const res = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         let allOrdersItem = [];

//         res.data.orders.map((order) => {
//           order.items.map((item) => {
//             item["status"] = order.status;
//             item["payment"] = order.payment;
//             item["paymentMethod"] = order.paymentMethod;
//             item["date"] = order.date;

//             allOrdersItem.push(item);
//           });
//         });

//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1={"MY"} text2={"ORDERS"} />
//       </div>

//       <div>
//         {orderData.slice(0, 4).map((item, i) => (
//           <div
//             key={i}
//             className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
//               <div>
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
//                   <p>
//                     {currency}
//                     {item.price}
//                   </p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p className="mt-1">
//                   Date:{" "}
//                   <span className="text-gray-400">
//                     {new Date(item.date).toDateString()}
//                   </span>
//                 </p>
//                 <p className="mt-1">
//                   Payment:{" "}
//                   <span className="text-gray-400">{item.paymentMethod}</span>
//                 </p>
//               </div>
//             </div>

//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                 <p className="text-sm md:text-base">{item.status}</p>
//               </div>
//               <button
//                 onClick={loadOrderData}
//                 className="border px-4 py-2 text-sm text-medium rounded-sm"
//               >
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;







import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App"; // Import the backendUrl
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = () => {
  const { token } = useContext(ShopContext);
  const [data, setData] = useState([]);

  const loadOrderData = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`, // Use the correct backendUrl
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load order data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-5">My Orders</h2>
      <div className="flex flex-col gap-5">
        {data.map((order, index) => (
          <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-5 p-4 border border-gray-300 rounded-md text-sm">
            <img src={assets.parcel_icon} alt="" className="w-10" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return `${item.name} x ${item.quantity}`;
                } else {
                  return `${item.name} x ${item.quantity}, `;
                }
              })}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span className="text-pink-500">&#x25cf;</span>{" "}
              <b className="font-semibold">{order.status}</b>
            </p>
            <button onClick={loadOrderData} className="px-4 py-2 text-sm text-white bg-gray-700 border-none rounded-md">
              Call us
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;