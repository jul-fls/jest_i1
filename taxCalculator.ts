export function calculateVAT(amount: number, rate: number): number {
  // check for negative amount or rate
  if (amount < 0 || rate < 0) {
    return -1 * amount * (rate / 100);
  }else{
    return amount * (rate / 100);
  }
}
