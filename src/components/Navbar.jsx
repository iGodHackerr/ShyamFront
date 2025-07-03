// import { Link, NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useContext, useState } from "react";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);

//   const {
//     setShowSearch,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };

//   return (
//     <div className="flex item-center justify-between py-5 font-medium">
//       <Link to={"/"}>
//         <img src={assets.logo} className="w-36" alt="" />
//       </Link>

//       <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p>HOME</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/collection" className="flex flex-col items-center gap-1">
//           <p>COLLECTION</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p>ABOUT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//         <NavLink to="/contact" className="flex flex-col items-center gap-1">
//           <p>CONTACT</p>
//           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//         </NavLink>
//       </ul>

//       <div className="flex items-center gap-6">
//         <img
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           onClick={() => setShowSearch(true)}
//           alt=""
//         />

//         <div className="group relative">
//           <img
//             src={assets.profile_icon}
//             className="w-5 cursor-pointer"
//             alt=""
//             onClick={() => (token ? null : navigate("/login"))}
//           />
//           {/* DROPDOWN */}
//           {token && (
//             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
//               <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
//                 <p className="cursor-pointer hover:text-black">My Profile</p>
//                 <p
//                   onClick={() => navigate("/orders")}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   Orders
//                 </p>
//                 <p onClick={logout} className="cursor-pointer hover:text-black">
//                   Logout
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         <Link to="/cart" className="relative">
//           <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
//           <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
//             {getCartCount()}
//           </p>
//         </Link>
//         <img
//           src={assets.menu_icon}
//           className="w-5 cursor-pointer sm:hidden"
//           onClick={() => setVisible(true)}
//           alt=""
//         />
//       </div>

//       {/* SIDEBAR MENU FOR SMALL SCREEN */}
//       <div
//         className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
//           visible ? "w-full" : "w-0"
//         }`}
//       >
//         <div className="flex flex-col text-gray-600">
//           <div
//             onClick={() => setVisible(false)}
//             className="flex items-center gap-4 p-3 cursor-pointer"
//           >
//             <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
//             <p>Back</p>
//           </div>
//           <NavLink
//             onClick={() => setVisible(false)}
//             to={"/"}
//             className="py-2 pl-6 border"
//           >
//             HOME
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             to={"/collection"}
//             className="py-2 pl-6 border"
//           >
//             COLLECTION
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             to={"/about"}
//             className="py-2 pl-6 border"
//           >
//             ABOUT
//           </NavLink>
//           <NavLink
//             onClick={() => setVisible(false)}
//             to={"/contact"}
//             className="py-2 pl-6 border"
//           >
//             CONTACT
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("Home");
//   const navigate = useNavigate();

//   // Use the new function from the context
//   const { getTotalCartItems, token, setToken } = useContext(ShopContext);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-between py-4">
//       <Link to={"/"}>
//         <h1 className="text-xl font-bold sm:text-2xl">Forever</h1>
//       </Link>
//       <ul className="items-center hidden gap-5 font-medium md:flex">
//         <li onClick={() => setMenu("Home")} className={`${menu === "Home" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/"}>Home</Link>
//         </li>
//         <li onClick={() => setMenu("Collection")} className={`${menu === "Collection" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/collection"}>Collection</Link>
//         </li>
//         <li onClick={() => setMenu("About")} className={`${menu === "About" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/about"}>About</Link>
//         </li>
//         <li onClick={() => setMenu("Contact")} className={`${menu === "Contact" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/contact"}>Contact</Link>
//         </li>
//       </ul>
//       <div className="flex items-center gap-4 sm:gap-6">
//         <Link to={"/cart"} className="relative">
//           <img className="w-6" src={assets.bag_icon} alt="Cart" />
//           {/* Call the correct function here */}
//           <div className="absolute top-[-8px] right-[-8px] bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex justify-center items-center">
//             {getTotalCartItems()}
//           </div>
//         </Link>
//         {token ? (
//           <div className="relative group">
//             <img src={assets.profile_icon} alt="Profile" className="w-6 cursor-pointer" />
//             <ul className="absolute right-0 z-10 hidden p-2 text-gray-700 bg-white border rounded-md shadow-lg group-hover:block">
//               <li onClick={() => navigate("/orders")} className="p-2 cursor-pointer hover:bg-gray-100">Orders</li>
//               <hr />
//               <li onClick={logout} className="p-2 cursor-pointer hover:bg-gray-100">Logout</li>
//             </ul>
//           </div>
//         ) : (
//           <button onClick={() => setShowLogin(true)} className="px-4 py-2 text-sm text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100">
//             Sign In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("Home");
//   const navigate = useNavigate();
//   const { getTotalCartItems, token, setToken } = useContext(ShopContext);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-between py-4">
//       <Link to={"/"}>
//         <h1 className="text-xl font-bold sm:text-2xl">Shyam Sunder</h1>
//       </Link>
//       <ul className="items-center hidden gap-5 font-medium md:flex">
//         <li onClick={() => setMenu("Home")} className={`${menu === "Home" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/"}>Home</Link>
//         </li>
//         <li onClick={() => setMenu("Collection")} className={`${menu === "Collection" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/collection"}>Collection</Link>
//         </li>
//         <li onClick={() => setMenu("About")} className={`${menu === "About" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/about"}>About</Link>
//         </li>
//         <li onClick={() => setMenu("Contact")} className={`${menu === "Contact" ? "text-pink-400" : ""} cursor-pointer`}>
//           <Link to={"/contact"}>Contact</Link>
//         </li>
//       </ul>
//       <div className="flex items-center gap-4 sm:gap-6">
//         <Link to={"/cart"} className="relative">
//           <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
//           {getTotalCartItems() > 0 && (
//             <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-pink-500 rounded-full top-[-8px] right-[-8px]">
//               {getTotalCartItems()}
//             </div>
//           )}
//         </Link>
//         {token ? (
//           <div className="relative group">
//             <img src={assets.profile_icon} alt="Profile" className="w-6 cursor-pointer" />
//             <ul className="absolute right-0 z-10 hidden p-2 text-gray-700 bg-white border rounded-md shadow-lg group-hover:block">
//               <li onClick={() => navigate("/orders")} className="p-2 cursor-pointer hover:bg-gray-100">Orders</li>
//               <hr />
//               <li onClick={logout} className="p-2 cursor-pointer hover:bg-gray-100">Logout</li>
//             </ul>
//           </div>
//         ) : (
//           <button onClick={() => setShowLogin(true)} className="px-4 py-2 text-sm text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100">
//             Sign In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;




import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import myLogo from '/img.png';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const { getTotalCartItems, token, setToken } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleLinkClick = (menuName, path) => {
    setMenu(menuName);
    setIsMenuOpen(false); // Close menu on navigation
    navigate(path);
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Logo */}
      {/* <Link to={"/"} onClick={() => setMenu("Home")}>
        <h1 className="text-xl font-bold sm:text-2xl">Shyam Sunder</h1>
      </Link> */}
      <img src={myLogo} alt="Shyam Sunder Logo" className="w-32" />
      {/* Desktop Navigation */}
      <ul className="items-center hidden gap-5 font-medium text-gray-700 md:flex">
        <li onClick={() => setMenu("Home")} className={`${menu === "Home" ? "text-pink-400" : ""} cursor-pointer`}>
          <Link to={"/"}>Home</Link>
        </li>
        <li onClick={() => setMenu("Collection")} className={`${menu === "Collection" ? "text-pink-400" : ""} cursor-pointer`}>
          <Link to={"/collection"}>Collection</Link>
        </li>
        <li onClick={() => setMenu("About")} className={`${menu === "About" ? "text-pink-400" : ""} cursor-pointer`}>
          <Link to={"/about"}>About</Link>
        </li>
        <li onClick={() => setMenu("Contact")} className={`${menu === "Contact" ? "text-pink-400" : ""} cursor-pointer`}>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {getTotalCartItems() > 0 && (
            <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-pink-500 rounded-full top-[-8px] right-[-8px]">
              {getTotalCartItems()}
            </div>
          )}
        </Link>
        
        {token ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="Profile" className="w-6 cursor-pointer" />
            <ul className="absolute right-0 z-10 hidden w-40 p-2 text-gray-700 bg-white border rounded-md shadow-lg group-hover:block">
              <li onClick={() => navigate("/orders")} className="p-2 cursor-pointer hover:bg-gray-100">Orders</li>
              <hr />
              <li onClick={logout} className="p-2 cursor-pointer hover:bg-gray-100">Logout</li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className="px-4 py-2 text-sm text-gray-700 border border-gray-400 rounded-full hover:bg-gray-100">
            Sign In
          </button>
        )}

        {/* Hamburger Menu Icon - Visible only on mobile */}
        <div className="block md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
           <button onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
           </button>
        </div>
        <ul className="flex flex-col items-center gap-8 mt-10 text-xl">
          <li onClick={() => handleLinkClick("Home", "/")} className="cursor-pointer">Home</li>
          <li onClick={() => handleLinkClick("Collection", "/collection")} className="cursor-pointer">Collection</li>
          <li onClick={() => handleLinkClick("About", "/about")} className="cursor-pointer">About</li>
          <li onClick={() => handleLinkClick("Contact", "/contact")} className="cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Overlay for when mobile menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default Navbar;