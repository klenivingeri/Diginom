export const getRandom = (min = 100, max = 2000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
