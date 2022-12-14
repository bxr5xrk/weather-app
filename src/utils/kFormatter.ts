export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))
    : Math.sign(num) * Math.abs(num);
}
