export const isInBounds = (value, min, max) => {
  if (value < min) {
    return false;
  }
  if (value > max) {
    return false;
  }
  return true;
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
