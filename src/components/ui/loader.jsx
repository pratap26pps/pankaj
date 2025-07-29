import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/Animations/Gearsanimation.json"; // adjust path if needed

const Loader = ({ width = 200 }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-[60vw] max-w-[400px] min-w-[120px]">
        <Lottie animationData={loadingAnimation} loop autoplay />
      </div>
    </div>
  );
};

export default Loader;
