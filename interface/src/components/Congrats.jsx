import React from "react";
import Lottie from "lottie-react";
import congratulation from "../../public/congrats-animation.json";
const Congrats = () => {
  return (
    <div className="text-center">
      <Lottie
        animationData={congratulation}
        loop={true}
        autoplay={true}
        className="w-60 h-60 mx-auto"
      />
      <div className="text-[24px] font-semibold">
        <p>Congrats 👏 </p>
        <p>You have completed the demo.</p>
      </div>
    </div>
  );
};

export default Congrats;
