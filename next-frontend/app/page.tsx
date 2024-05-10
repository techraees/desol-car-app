"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center flex-col h-[90vh]">
        <h1>Welcome to the App for submitting a request for a car selling service </h1>

        <p className="text-blue-400 underline p-3">
          <Link href="/auth/login">Try to Login to Get Access</Link>
        </p>
      </div>
    </>
  );
}
