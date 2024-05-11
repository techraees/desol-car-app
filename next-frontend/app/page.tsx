"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import CarProducts from "./cars/CarProducts";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center flex-col py-10">
        <h1>
          Welcome to the App for submitting a request for a car selling service{" "}
        </h1>

        <p className="text-blue-400 underline p-3">
          <Link href="/auth/login">Try to Get Access</Link>
        </p>
      </div>
      <h2 className="text-center my-3 text-[#c5c3c3] font-[600] text-lg">
        Latest Cars With Modals
      </h2>
      <CarProducts />
    </>
  );
}
