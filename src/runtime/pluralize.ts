import flatten from './flatten';

export const pluralize = (
  count: number,
  ...words: Array<string | string[]>
) => {
  let cases = [2, 0, 1, 1, 1, 2],
    titles = flatten(words) as string[];
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];
};

export default pluralize;
