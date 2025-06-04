import React from "react";

type ItemDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ItemDetailsPage = async (props: ItemDetailsPageProps) => {
  const { params } = props;
  const { id } = await params;
  console.log(id);
  return <div>ItemDetailsPage</div>;
};

export default ItemDetailsPage;
