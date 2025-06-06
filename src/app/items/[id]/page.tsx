import BreadCrumbs from "@/components/Breadcrumbs";
import ItemDetail from "@/components/Items/ItemDetail";
import React from "react";

type ItemDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const getItemDetails = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/items/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const ItemDetailsPage = async (props: ItemDetailsPageProps) => {
  const { params } = props;
  const { id } = await params;
  const data = await getItemDetails(id);
  return (
    <main>
      <BreadCrumbs {...data} />
      <ItemDetail item={data} />
    </main>
  );
};

export default ItemDetailsPage;
