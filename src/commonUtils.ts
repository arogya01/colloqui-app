export const _debounceTextSearch = (callback: () => void, delay: number) => {
  let timeoutId;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  };
};
