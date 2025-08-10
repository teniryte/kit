export const callAll = (
  ...fns: Array<((...args: any[]) => any) | undefined | null>
) => {
  return (...args: any[]) => {
    fns.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  };
};

export default callAll;
