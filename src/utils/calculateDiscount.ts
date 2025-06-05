export const calculateDiscount = ({ original_price, current_price }: { original_price: number; current_price: number }) => {
  const difference = original_price - current_price;
  return Math.round((difference * 100) / original_price);
};
