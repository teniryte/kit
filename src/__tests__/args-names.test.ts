import { argsNames } from '../runtime/args-names';

describe('args-names', () => {
  it('should return the correct arguments names', () => {
    expect(argsNames(() => {})).toEqual([]);
    expect(argsNames((a: number) => a)).toEqual(['a']);
    expect(
      argsNames(function (a: number, b: number) {
        return a + b;
      })
    ).toEqual(['a', 'b']);
    expect(
      argsNames(function (a: number, b: number, c: number) {
        return a + b + c;
      })
    ).toEqual(['a', 'b', 'c']);
  });
});
