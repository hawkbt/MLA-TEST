import DetailPageWrapper from "@/components/DetailsPageWrapper";
import { getItemDetails } from "@/service/itemDetails/getItemDetails";
import React from "react";

type ItemDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ItemDetailsPage = async (props: ItemDetailsPageProps) => {
  const { params } = props;
  const { id } = await params;
  const data = await getItemDetails(id);

  return <DetailPageWrapper data={data} id={id} />;
};

export default ItemDetailsPage;
