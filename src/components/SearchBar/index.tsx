"use client";
import React, { useContext } from "react";
import "./searchBar.scss";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { SearchContext } from "@/context/searchContext";

type FormValues = {
  search: string;
};

const SearchBar = () => {
  const { triggerSearchData, searchValue } = useContext(SearchContext);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { search: searchValue ?? "" },
  });
  const onSubmit: SubmitHandler<FormValues> = (formData) => triggerSearchData({ value: formData.search });

  return (
    <div className='search-bar' tabIndex={0}>
      <form onSubmit={handleSubmit(onSubmit)} role='search' className='search-bar__content'>
        <label htmlFor='search-input' className='search-bar__content__label visually-hidden'>
          Ingresa lo que quieres Buscar
        </label>
        <input type='text' {...register("search")} className='search-bar__content__input' placeholder='Buscar productos, marcas y más...' />
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
