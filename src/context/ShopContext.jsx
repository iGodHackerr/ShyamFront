// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [token, setToken] = useState("");
//   const [products, setProducts] = useState([]); // Use 'products' consistently

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`);
//       setProducts(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch products");
//     }
//   };

//   const loadCartData = async (token) => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
//       if (response.data.cart) {
//         setCartItems(response.data.cart.items);
//       }
//     } catch (error) {
//       console.error("Failed to load cart data");
//     }
//   };

//   useEffect(() => {
//     // Fetch products for all users when the app loads
//     fetchProducts();
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       // Load cart data only if user is logged in
//       loadCartData(storedToken); 
//     }
//   }, []);

//   const addToCart = async (productId, quantity, size, price) => {
//     try {
//       if (token) {
//         await axios.post(`${backendUrl}/api/cart/add`, { productId, quantity, size, price }, { headers: { token } });
//         toast.success("Item added to cart!");
//         loadCartData(token);
//       } else {
//         toast.error("Please login to add items to the cart.");
//       }
//     } catch (error) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const removeFromCart = async (productId, size) => {
//     try {
//       if (token) {
//         await axios.post(`${backendUrl}/api/cart/remove`, { productId, size }, { headers: { token } });
//         toast.info("Item removed from cart.");
//         loadCartData(token);
//       }
//     } catch (error) {
//       toast.error("Failed to remove item.");
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item of cartItems) {
//       totalAmount += item.price * item.quantity;
//     }
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItems = 0;
//     for (const item of cartItems) {
//       totalItems += item.quantity;
//     }
//     return totalItems;
//   };
  
//   const contextValue = {
//     products, // Changed from all_product
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     getTotalCartItems,
//     token,
//     setToken,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;




import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products");
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
      if (response.data.cart) {
        setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error("Failed to load cart data");
    }
  };

  useEffect(() => {
    fetchProducts();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadCartData(storedToken); 
    }
  }, []);

  const addToCart = async (productId, quantity, size, price) => {
    try {
      if (token) {
        await axios.post(`${backendUrl}/api/cart/add`, { productId, quantity, size, price }, { headers: { token } });
        toast.success("Item added to cart!");
        loadCartData(token);
      } else {
        toast.error("Please login to add items to the cart.");
      }
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      if (token) {
        await axios.post(`${backendUrl}/api/cart/remove`, { productId, size }, { headers: { token } });
        toast.info("Item removed from cart.");
        loadCartData(token);
      }
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item of cartItems) {
      totalItems += item.quantity;
    }
    return totalItems;
  };
  
  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;