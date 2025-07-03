// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
//   const [currentState, setCurrentState] = useState("Login");

//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (currentState === "Sign Up") {
//         const res = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           email,
//           password,
//         });

//         if (res.data.success) {
//           setToken(res.data.token);
//           localStorage.setItem("token", res.data.token);
//         } else {
//           toast.error(res.data.message);
//         }
//       } else {
//         const res = await axios.post(backendUrl + "/api/user/login", {
//           email,
//           password,
//         });

//         if (res.data.success) {
//           setToken(res.data.token);
//           localStorage.setItem("token", res.data.token);
//         } else {
//           toast.error(res.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token]);

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {currentState === "Login" ? (
//         ""
//       ) : (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           required
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />
//       )}
//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//       />
//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//       />

//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login Here{" "}
//           </p>
//         )}
//       </div>

//       <button className="bg-black text-white font-light px-8 py-2 mt-4">
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;



import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { setToken } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    // Updated the URL to match the new route
    let url = currentState === "Login" ? "/login" : "/register"; 

    try {
      const response = await axios.post(`${backendUrl}/api/user${url}`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(`Successfully ${currentState === "Login" ? "logged in" : "registered"}!`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please check the console.");
      console.error(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 z-20 grid w-full h-screen bg-[#00000090]">
      <form onSubmit={onLogin} className="place-self-center w-[min(90vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] p-[25px] rounded-lg text-sm animate-fadeIn">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-bold">{currentState}</h2>
          <p onClick={() => setShowLogin(false)} className="w-[16px] cursor-pointer text-xl">x</p>
        </div>
        <div className="flex flex-col gap-5">
          {currentState === "Sign Up" && (
            <input className="p-2 border border-gray-400 rounded-md outline-pink-400" name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}
          <input className="p-2 border border-gray-400 rounded-md outline-pink-400" name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input className="p-2 border border-gray-400 rounded-md outline-pink-400" name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button className="p-2 text-white bg-pink-500 border-none rounded-md cursor-pointer">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 mt-[-15px]">
          <input className="mt-[5px]" type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")} className="text-pink-500 font-medium cursor-pointer">Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")} className="text-pink-500 font-medium cursor-pointer">Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;