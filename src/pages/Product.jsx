// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProduct from "../components/RelatedProduct";

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, cartItems, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);

//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId]);

//   return productData ? (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* PRODUCT DATA */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* PRODUCT IMAGES */}

//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.image.map((item, i) => (
//               <img
//                 src={item}
//                 key={i}
//                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                 alt=""
//                 onClick={() => setImage(item)}
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img src={image} className="w-full h-auto" alt="" />
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div className="flex-1 ">
//           <h1 className="font-medium text-2xl my-2">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2">
//             <img className="w-3.5" src={assets.star_icon} alt="" />
//             <img className="w-3.5" src={assets.star_icon} alt="" />
//             <img className="w-3.5" src={assets.star_icon} alt="" />
//             <img className="w-3.5" src={assets.star_icon} alt="" />
//             <img className="w-3.5" src={assets.star_dull_icon} alt="" />
//             <p className="pl-2">(122)</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, i) => (
//                 <button
//                   className={`border py-2 px-4 bg-gray-100 ${
//                     item === size ? "border-orange-500" : ""
//                   }`}
//                   key={i}
//                   onClick={() => setSize(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
//             onClick={() => addToCart(productData._id, size)}
//           >
//             ADD TO CART
//           </button>
//           <hr className="mt-8 sm:w-4/5" />

//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original Product.</p>
//             <p>Cash o delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/* DESCRIPTION AND REVIEW SECTION */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm ">Description</b>
//           <p className="border px-5 py-3 text-sm ">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
//             dolor, consequuntur totam nostrum praesentium distinctio accusamus
//             assumenda architecto alias veritatis autem. Non facilis alias
//             quaerat quasi cumque nisi. Suscipit cupiditate perspiciatis
//             laudantium error quibusdam facere, praesentium delectus cum rerum
//             tempore laboriosam temporibus. Id voluptatibus quia, optio provident
//             nesciunt debitis. Harum!
//           </p>
//           <p>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui quos
//             deleniti corrupti dolore commodi deserunt, dicta ipsam ex nemo
//             animi.
//           </p>
//         </div>
//       </div>

//       {/* DISPLAY RELATED PRODUCTS */}
//       <RelatedProduct
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import RelatedProduct from "../components/RelatedProduct"; // Assuming you have this component

const Product = () => {
  // Use 'productId' to match the route in App.jsx
  const { productId } = useParams(); 
  const { products, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use 'productId' in the API call
        const response = await axios.get(`${backendUrl}/api/product/get/${productId}`);
        if (response.data.success) {
          const productData = response.data.product;
          setProduct(productData);
          setMainImage(productData.image[0]);
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0].size);
            setSelectedPrice(productData.sizes[0].price);
          }
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error("Error fetching product details.");
      }
    };
    fetchProduct();
  }, [productId]); // Re-fetch if the productId changes

  const handleSizeClick = (sizeObject) => {
    setSelectedSize(sizeObject.size);
    setSelectedPrice(sizeObject.price);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product._id, quantity, selectedSize, selectedPrice);
    } else {
      toast.error("Please select a size");
    }
  };

  if (!product) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-8 px-4 py-10 md:px-10 lg:flex-row">
        {/* LEFT SIDE - IMAGES */}
        <div className="flex flex-col-reverse flex-1 gap-4 lg:flex-row">
          <div className="flex flex-row justify-center gap-2 lg:flex-col">
            {product?.image?.map((img, index) => (
              <img key={index} src={img} alt="" className="object-cover w-20 h-20 cursor-pointer" onClick={() => setMainImage(img)} />
            ))}
          </div>
          <div className="flex-1">
            <img src={mainImage} alt="Main product" className="object-cover w-full h-auto max-h-[600px]" />
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="flex flex-col flex-1 gap-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">
            ₹{selectedPrice || 'Select a size'}
          </p>
          <p className="text-sm font-light text-justify">{product.description}</p>
          
          {/* SIZE SELECTION */}
          <div>
            <h2 className="mb-2 font-semibold">Select Size</h2>
            <div className="flex items-center gap-2">
              {product?.sizes?.map((sizeObj, index) => (
                <button key={index} onClick={() => handleSizeClick(sizeObj)}
                  className={`px-4 py-2 border rounded-md ${selectedSize === sizeObj.size ? "bg-black text-white" : "bg-gray-200"}`}>
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY AND ADD TO CART */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-xl">
              <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))} className="px-3 py-1 bg-gray-200 rounded-md">-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="px-3 py-1 bg-gray-200 rounded-md">+</button>
            </div>
            <button onClick={handleAddToCart} className="px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800">
              ADD TO CART
            </button>
          </div>

        </div>
      </div>
      <RelatedProduct category={product.category} />
    </div>
  );
};

export default Product;