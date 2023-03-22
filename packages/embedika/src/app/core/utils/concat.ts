export function dataToString(data: string | string[]) {
  return Array.isArray(data) ? data.join(' ') : data;
}
