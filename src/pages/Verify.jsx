// import { useContext, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Verify = () => {
//   const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

//   const [searchParams, setSearchParams] = useSearchParams();

//   const success = searchParams.get("success");
//   const orderId = searchParams.get("orderId");

//   const verifyPayment = async () => {
//     try {
//       if (!token) {
//         return null;
//       }

//       const res = await axios.post(
//         backendUrl + "/api/order/verifystripe",
//         { success, orderId },
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         setCartItems({});
//         navigate("/orders");
//       } else {
//         navigate("/cart");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, [token]);

//   return <div></div>;
// };

// export default Verify;





import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../App"; // Import the backendUrl
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/orders");
        toast.success("Payment Successful, Order Placed!");
      } else {
        navigate("/");
        toast.error("Payment Failed. Please try again.");
      }
    } catch (error) {
        navigate("/");
        toast.error("An error occurred during payment verification.");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-[60vh] grid">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-pink-500 rounded-full place-self-center animate-spin"></div>
      <p className="text-center">Verifying Payment...</p>
    </div>
  );
};

export default Verify;