export const formatDate = (date: number | string) => {
  if (!date || isNaN(new Date(date).getTime())) return "N/A";

  return new Date(date).toLocaleDateString("pt-BR");
};
