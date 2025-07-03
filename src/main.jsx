// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import ShopContextProvider from "./context/ShopContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <ShopContextProvider>
//       <App />
//     </ShopContextProvider>
//   </BrowserRouter>
// );


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx'
import { BrowserRouter } from 'react-router-dom'

// --- ADD THESE TWO LINES FOR CAROUSEL STYLING ---
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
)