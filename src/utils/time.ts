export const secondToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const secLeft = (seconds % 60).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumIntegerDigits: 2,
  });
  const minLeft = (minutes % 60).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumIntegerDigits: 2,
  });
  const hLeft = (hours % 60).toFixed(0);
  return `${Number(hLeft) ? hLeft + ':' : ''}
  ${minLeft}:${secLeft}`;
};
