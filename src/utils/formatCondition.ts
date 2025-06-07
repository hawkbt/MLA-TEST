export const formatCondition = (status: string) => {
  if (status === "new") return "Nuevo";
  if (status === "used") return "Usado";
  if (status === "reaconditioned") return "Reacondicionado";
  return "";
};
