import React from "react";
import loader from "../../public/waiting-animation.json";
import Image from "next/image";
import Lottie from "lottie-react";
function Loading() {
  return (
    <div className="text-center">
      <Lottie
        animationData={loader}
        loop={true}
        autoplay={true}
        className="w-60 h-60 mx-auto"
      />
    </div>
  );
}

export default Loading;
