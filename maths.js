export const isInBounds = (value, min, max) => {
  if (value < min) {
    return false;
  }
  if (value > max) {
    return false;
  }
  return true;
};
