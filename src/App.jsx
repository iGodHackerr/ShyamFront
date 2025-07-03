// import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home";
// import Collection from "./pages/Collection";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import PlaceOrder from "./pages/PlaceOrder";
// import Orders from "./pages/Orders";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Verify from "./pages/Verify";
// import SearchBar from "./components/SearchBar";

// const App = () => {
//   return (
//     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
//       <ToastContainer />
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/collection" element={<Collection />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/product/:productId" element={<Product />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/verify" element={<Verify />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;





import React, { useState } from "react"; // Added useState
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Your original, correct import paths
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login"; // Assuming this is your LoginPopup
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar"; // Corrected Path
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import SearchBar from "./components/SearchBar";

// Export the backend URL for other components to use
export const backendUrl = "http://192.168.1.9:4000";

const App = () => {
  // State for showing the login popup
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      {/* Conditionally render the Login component */}
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <Navbar setShowLogin={setShowLogin} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setShowLogin={setShowLogin}/>} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;