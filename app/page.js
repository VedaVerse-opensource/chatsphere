import React from "react";
import Image from "next/image";
// import { useColorScheme } from "@/hooks/useColorScheme";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="container px-4 pb-8 flex flex-col justify-start">
      <div className="flex items-center justify-center ">
        <Image
          src="/icons/logo.svg"
          alt="ChatSphere logo"
          width="80"
          height="80"
          className="mr-6"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
          ChatSphere
        </h1>
      </div>
      <Prompt />
      <Cards />
    </div>
  );
};

export default Home;
