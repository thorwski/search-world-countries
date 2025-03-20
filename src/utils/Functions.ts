export function formatNumber(number: number | null | undefined): string {
  if (number === null || number === undefined || isNaN(number)) {
    return "N/A";
  }

  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
