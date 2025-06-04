import React from "react";

const ItemDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return <div>ItemDetailsPage</div>;
};

export default ItemDetailsPage;
