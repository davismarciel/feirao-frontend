export const useFormattedDate = (
  timestamp: number | null | undefined | string
) => {
  if (!timestamp) return "";

  // Converte para número caso venha como string e cria o objeto Date
  const dateObj = new Date(
    typeof timestamp === "string" ? Number(timestamp) : timestamp
  );

  // Verifica se a data é válida
  if (isNaN(dateObj.getTime())) return "";

  // Formata a data como dd/mm/yyyy com as barrinhas
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};
