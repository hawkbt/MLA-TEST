"use client";

import React from "react";
import "./breadcrumbs.scss";
import { useRouter } from "next/navigation";

const BreadCrumbs = (props: DetailResponse) => {
  const { item } = props;
  const publicationNumber = item?.id?.slice(3);
  const router = useRouter();

  const handleBack = () => router.back();
  return (
    <nav className='item-navigation'>
      <div className='item-navigation__breadcrumbs'>
        <span className='back' onClick={handleBack}>
          Volver al Listado
        </span>
        <span>|</span>
        <div>
          {item?.category_path_from_root?.map((path, index) => (
            <span key={path}>{`${path} ${item?.category_path_from_root.length - 1 !== index ? "> " : ""}`} </span>
          ))}
        </div>
      </div>
      <div className='item-navigation__publication'>
        Publicacion: <span>#{publicationNumber}</span>
      </div>
    </nav>
  );
};

export default BreadCrumbs;
