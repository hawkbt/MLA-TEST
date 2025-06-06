"use client";
import Link from "next/link";
import React from "react";
import "./breadcrumbs.scss";

const BreadCrumbs = (props: Item) => {
  const { category, id } = props;
  const publicationNumber = id.slice(3);
  return (
    <nav className='item-navigation'>
      <div className='item-navigation__breadcrumbs'>
        <Link href='/'>Volver al Listado</Link>
        <span>|</span>
        <div>
          {props.category.path_from_root.map(({ id, name }, index) => (
            <span key={id}>{`${name} ${category.path_from_root.length - 1 !== index ? "> " : ""}`} </span>
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
