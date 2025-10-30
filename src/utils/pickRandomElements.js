export const pickRandomElements = ({ sourceArray, k = 3, id }) => {
  const filteredArray = sourceArray.filter(item => item.id !== id);

  const desiredCount = Math.max(0, Math.min(k, filteredArray.length));
  const workingCopy = sourceArray.slice();

  for (let i = 0; i < desiredCount; i++) {
    const swapIndex = i + Math.floor(Math.random() * (workingCopy.length - i));
    [workingCopy[i], workingCopy[swapIndex]] = [workingCopy[swapIndex], workingCopy[i]];
  }

  return workingCopy.slice(0, desiredCount);
};
