// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import Title from "../components/Title";
// import ProductItem from "../components/ProductItem";

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);

//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((p) => p.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((p) => [...p, e.target.value]);
//     }
//   };
//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((p) => p.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((p) => [...p, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case "low-high":
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;

//       case "high-low":
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;

//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* FILTER OPTIONS */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             src={assets.dropdown_icon}
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             alt=""
//           />
//         </p>
//         {/* 
//         CATEGORY FILTER */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? " " : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Men"}
//                 onChange={toggleCategory}
//               />{" "}
//               Men
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Women"}
//                 onChange={toggleCategory}
//               />{" "}
//               Women
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Kids"}
//                 onChange={toggleCategory}
//               />{" "}
//               Kids
//             </p>
//           </div>
//         </div>

//         {/* SUBCATEGORIES FILTER */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 my-5 ${
//             showFilter ? " " : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Topwear"}
//                 onChange={toggleSubCategory}
//               />{" "}
//               Topwear
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Bottomwear"}
//                 onChange={toggleSubCategory}
//               />{" "}
//               Bottomwear
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Winterwear"}
//                 onChange={toggleSubCategory}
//               />{" "}
//               Winterwear
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />

//           {/* PRODUCT SORT */}
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-gray-300 text-sm px-2"
//           >
//             <option value="relevant">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         {/* MAP PRODUCTS */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {filterProducts.map((item, i) => (
//             <ProductItem
//               key={i}
//               id={item._id}
//               image={item.image}
//               name={item.name}
//               price={item.price}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;



// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Item from "../components/Item/Item";

// const Collection = () => {
//   const { products } = useContext(ShopContext);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     category: [],
//     sort: "latest",
//   });

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
//   };

//   const toggleCategory = (e) => {
//     const { value, checked } = e.target;
//     setFilters((prev) => {
//       const newCategories = checked ? [...prev.category, value] : prev.category.filter((c) => c !== value);
//       return { ...prev, category: newCategories };
//     });
//   };
  
//   useEffect(() => {
//     if (products && products.length > 0) {
//       let tempProducts = [...products];
//       if (filters.category.length > 0) {
//         tempProducts = tempProducts.filter((p) => filters.category.includes(p.category));
//       }
//       if (filters.sort === "latest") {
//         tempProducts.sort((a, b) => b.date - a.date);
//       } else if (filters.sort === "low-to-high") {
//         tempProducts.sort((a, b) => (a.sizes[0]?.price || 0) - (b.sizes[0]?.price || 0));
//       } else if (filters.sort === "high-to-low") {
//         tempProducts.sort((a, b) => (b.sizes[0]?.price || 0) - (a.sizes[0]?.price || 0));
//       }
//       setFilteredProducts(tempProducts);
//     } else {
//         setFilteredProducts([]);
//     }
//   }, [products, filters]);

//   return (
//     <div className="flex flex-col gap-8 px-4 py-10 md:px-10 lg:flex-row">
//       <div className="w-full lg:w-1/4">
//         <h2 className="mb-4 text-xl font-bold">Filters</h2>
//         <div className="mb-6">
//           <h3 className="mb-2 font-semibold">Categories</h3>
//             {/* --- UPDATED CATEGORY FILTERS --- */}
//             <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Cotton Ruffle"} onChange={toggleCategory}/> Cotton Ruffle</p>
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Cotton"} onChange={toggleCategory}/> Cotton</p>
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Party Wear"} onChange={toggleCategory}/> Party Wear</p>
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Heavy Mirror"} onChange={toggleCategory}/> Heavy Mirror</p>
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Flower"} onChange={toggleCategory}/> Flower</p>
//                <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Diamond"} onChange={toggleCategory}/> Diamond</p>
//             </div>
//         </div>
//         <div>
//           <h3 className="mb-2 font-semibold">Sort By</h3>
//           <select onChange={(e) => handleFilterChange("sort", e.target.value)} className="w-full p-2 border rounded-md">
//             <option value="latest">Latest</option>
//             <option value="low-to-high">Price: Low to High</option>
//             <option value="high-to-low">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//       <div className="w-full lg:w-3/4">
//         <h1 className="mb-4 text-3xl font-bold">Our Collection</h1>
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
//           {filteredProducts.map((item) => {
//             const price = item.sizes && item.sizes.length > 0 ? item.sizes[0].price : 0;
//             return ( <Item key={item._id} id={item._id} name={item.name} image={item.image[0]} price={price}/> );
//           })}
//         </div>
//          {filteredProducts.length === 0 && <p className="mt-4">No products found for the selected filters.</p>}
//       </div>
//     </div>
//   );
// };

// export default Collection;


import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item/Item";

const Collection = () => {
  const { products } = useContext(ShopContext);
  // State to track which category is selected. null means show all category cards.
  const [selectedCategory, setSelectedCategory] = useState(null);

  // This hook processes your product data to create a summary for each category.
  // It only re-calculates when the main 'products' list changes.
  const categoryData = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    }, {});

    // Create a summary card for each category
    return Object.keys(productsByCategory).map(category => {
      const categoryProducts = productsByCategory[category];
      // Find the minimum price for the "Starts at..." text
      const minPrice = Math.min(
        ...categoryProducts.flatMap(p => p.sizes.map(s => s.price))
      );
      return {
        name: category,
        // Use the image of the first product as the category image
        image: categoryProducts[0].image[0],
        minPrice: minPrice,
      };
    });
  }, [products]);

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  // If a category is selected, show the product list for it
  if (selectedCategory) {
    return (
      <div className="py-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 mr-4 font-bold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            &larr; Back
          </button>
          <h1 className="text-3xl font-bold">{selectedCategory}</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((item) => {
            const price = item.sizes && item.sizes.length > 0 ? item.sizes[0].price : 0;
            return (
              <Item
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image[0]}
                price={price}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Otherwise, show the grid of category cards
  return (
    <div className="py-10">
      <h1 className="mb-8 text-3xl font-bold text-center">Our Collections</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {categoryData.map((category) => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg cursor-pointer group hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full h-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
              <p className="text-sm text-gray-200">
                Starts for just... ₹{category.minPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;