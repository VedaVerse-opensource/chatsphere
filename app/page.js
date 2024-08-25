import React from "react";
import Image from "next/image";
// import { useColorScheme } from "@/hooks/useColorScheme";
import Prompt from "@/components/Prompt";
import Cards from "@/components/Cards";
import Logo from "@/components/svgs/Logo";

const Home = () => {
  // const colorScheme = useColorScheme();
  // const isDarkMode = colorScheme === "dark";

  return (
    <div className={"light-mode"}>
      <div className='container'>
        <div className='title'>
          <Logo className='logo' />
          <h1 className='title-text'>ChatSphere</h1>
        </div>
        <Prompt />
        <Cards />
      </div>
    </div>
  );
};

export default Home;
