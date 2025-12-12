// utils/formatStats.ts
export const formatStat = (num: number) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num) + "+";
};