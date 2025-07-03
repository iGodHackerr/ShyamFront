// import React from "react";
// import { assets } from "../assets/assets";

// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-400">
//       <div className="w-full sn:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div className="text-[#414141]">
//           <div className="flex items-center gap-2">
//             <p className="w-2 md:w-11 h-[2px] bg-[#414141]"></p>
//             <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
//           </div>
//           <h1 className="text-3xl sm:px-3 lg-text-5xl leading-relaxed prata-regular">
//             Shyam Sunder's
//           </h1>
//           <h2 className="text-2xl sm:px-2 lg-text-4xl leading-relaxed prata-regular">
//             Customs
//           </h2>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">GET NOW</p>
//             <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//           </div>
//         </div>
//       </div>
//       {/* HERO RiGHT SIDE */}
//       <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />{" "}
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import Slider from "react-slick";
import { assets } from "../assets/assets";
import myLogo from '/img.png';
import img1 from '/img1.jpg';
import img2 from '/img2.jpg';
import img3 from '/img3.jpg';
import img4 from '/img4.jpg';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const carouselImages = [
    img1,
    img2,
    img3,
    img4,
  ];

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-2 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          {/* <h1 className="text-3xl sm:px-3 lg-text-5xl leading-relaxed prata-regular">
            Shyam Sunder's
          </h1> */}
          <img src={myLogo} alt="Shyam Sunder Logo" className="w-48" />
          <h2 className="text-2xl sm:px-2 lg-text-4xl leading-relaxed prata-regular">
            Customs
          </h2>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">GET NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      
      {/* --- ADD `relative` CLASS TO THIS CONTAINER --- */}
      <div className="w-full sm:w-1/2 relative">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img src={image} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;