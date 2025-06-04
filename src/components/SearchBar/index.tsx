"use client";
import React from "react";
import "./searchBar.scss";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className='search-bar' tabIndex={0}>
      <form role='search' className='search-bar__content'>
        <label htmlFor='search-input' className='search-bar__content__label visually-hidden'>
          Ingresa lo que quieres Buscar
        </label>
        <input type='text' id='search-input' className='search-bar__content__input' placeholder='Buscar productos, marcas y más...' />
        <button type='submit' className='search-bar__content__button'>
          <div className='search-bar__content__button__icon' aria-label='Buscar'>
            <Image src='/images/search_icon@2x.png' alt='search icon' width={20} height={20} layout='intrinsic' />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
