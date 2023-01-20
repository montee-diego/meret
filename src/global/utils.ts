export function formatTime(time: number): string {
  return new Date(time * 1000).toISOString().slice(15, 19);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat().format(new Date(date));
}
