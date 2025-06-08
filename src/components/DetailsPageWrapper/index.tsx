"use client";
import React from "react";
import BreadCrumbs from "../Breadcrumbs";
import ItemDetail from "../Items/ItemDetail";
import { useQuery } from "@tanstack/react-query";
import { getItemDetails } from "@/service/itemDetails/getItemDetails";

const DetailPageWrapper = ({ data, id }: { data: DetailResponse | undefined; id: string }) => {
  const { data: detailData } = useQuery({
    queryFn: () => getItemDetails(id),
    queryKey: ["detail", id],
    initialData: data,
  });
  return (
    <main>
      <BreadCrumbs {...detailData} />
      <ItemDetail {...detailData} />
    </main>
  );
};

export default DetailPageWrapper;
