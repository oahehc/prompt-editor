export function removeEmpty(arr: string[]) {
  return arr.filter((s) => s !== "");
}

export function generateArray(length: number) {
  return Array.from({ length }, (_, i) => i);
}
