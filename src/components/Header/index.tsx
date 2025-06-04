import React from "react";
import "./header.scss";
import SearchBar from "../SearchBar";
import Image from "next/image";

const Header = () => {
  return (
    <header className='header' role='banner'>
      <div className='header__content'>
        <div className='header__content__logo' tabIndex={0}>
          <Image src='/images/logo_large_25years@2x.png' alt='Large Logo 25 Years' width={140} height={40} layout='intrinsic' />
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
