import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  // Update addToCart to accept and send the price
  const addToCart = async (productId, quantity, size, price) => {
    try {
      if (token) {
        await axios.post(
          url + "/api/cart/add",
          { productId, quantity, size, price }, // Send price to backend
          { headers: { token } }
        );
        toast.success("Item added to cart!");
        loadCartData(token);
      }
    } catch (error) {
      toast.error("Failed to add item.");
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      if (token) {
        await axios.post(
          url + "/api/cart/remove",
          { productId, size },
          { headers: { token } }
        );
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
      // The price is now directly available on the item
      totalAmount += item.price * item.quantity;
    }
    return totalAmount;
  };
  
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if(response.data.cart){
        setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error("Failed to load cart data");
    }
  };

  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;