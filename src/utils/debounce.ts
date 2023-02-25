export function debounce(fn: (...args: any[]) => any, delay: number) {
  let timerId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
