import React from "react";
import Lottie from "lottie-react";
import failed from "../../public/failed-animation.json";
const Failure = () => {
  return (
    <div className="text-center">
      <Lottie
        animationData={failed}
        loop={true}
        autoplay={true}
        className="w-40 h-40 mx-auto"
      />
      <div className="text-[24px] font-semibold mt-12">
        <p>Thank you for your trial.</p>
        <p>Regrettably, your course performance did not meet our required standards.</p>
      </div>
    </div>
  );
};

export default Failure;
