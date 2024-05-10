import React from "react";
import { ClipLoader } from "react-spinners";
const LoadingSkeletalParent = () => {
  return (
    <div
      className={`fixed top-0 z-[10] h-screen flex justify-center items-center w-screen bg-[white]`}
    >
      <ClipLoader color="#0024e3" />
    </div>
  );
};

export default LoadingSkeletalParent;
