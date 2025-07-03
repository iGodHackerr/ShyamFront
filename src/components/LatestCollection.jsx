// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import ProductItem from "./ProductItem";

// const LatestCollection = () => {
//   const { products } = useContext(ShopContext);

//   const [latestProduct, setLatestProduct] = useState([]);

//   useEffect(() => {
//     setLatestProduct(products.slice(0, 10));
//   }, [products]);

//   return (
//     <div className="my-10 ">
//       <div className="text-center py-8 text-3xl">
//         <Title text1={"LATEST"} text2={"COLLECTION"} />
//         <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ex
//           velit, quae quo minima repudiandae
//         </p>
//       </div>

//       {/* RENDERING PRODUCT */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//         {latestProduct.map((item, index) => (
//           <ProductItem
//             id={item._id}
//             key={index}
//             image={item.image}
//             name={item.name}
//             price={item.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LatestCollection;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "./Item/Item";
import Title from "./Title"; // Assuming Title component exists

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Using 'products'
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    // Safety check
    if (products && products.length > 0) {
      const sorted = [...products].sort((a, b) => b.date - a.date);
      setLatestProduct(sorted.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ex
          velit, quae quo minima repudiandae
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item) => {
          const price = item.sizes && item.sizes.length > 0 ? item.sizes[0].price : 0;
          return (
            <Item
              id={item._id}
              key={item._id}
              image={item.image[0]}
              name={item.name}
              price={price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;