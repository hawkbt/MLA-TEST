import React from "react";

type ItemDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ItemDetailsPage = async (props: ItemDetailsPageProps) => {
  const { params } = props;
  const { id } = await params;
  return <div>{id}</div>;
};

export default ItemDetailsPage;
