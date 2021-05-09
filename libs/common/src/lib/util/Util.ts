export function getRandomColor(): string {
  return '#' + Math.random().toString(16).substr(2, 6);
}
