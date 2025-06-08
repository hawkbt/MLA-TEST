export const getItemDetails = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/items/${id}`);
  const data = await response.json();
  return data;
};
