export const currencyFormat = (num: number) => {
  const n = parseInt(num, 10);
  return `$${n.toLocaleString()}`;
};
