export const formatTime = (time: number): string => {
  return new Date(time * 1000).toISOString().slice(15, 19);
};
