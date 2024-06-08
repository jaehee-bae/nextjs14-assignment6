export function getDateToString(date: Date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}