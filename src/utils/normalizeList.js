export const normalizeList = value => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};
