export const normalize = (value, zeropoint, onepoint) => {
  if (onepoint == zeropoint) {
    return null;
  }
  return max(
    0.0,
    min(1.0,((value+0.0) - zeropoint)/(onepoint-zeropoint)))
};
