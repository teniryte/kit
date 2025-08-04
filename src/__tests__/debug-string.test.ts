import debugString from '../runtime/debug-string';

class Person {}

describe('debug-string', () => {
  it('stringifies primitives', () => {
    expect(debugString(1)).toBe('1');
    expect(debugString('test')).toBe('test');
    expect(debugString(null)).toBe('null');
    expect(debugString(undefined)).toBe('undefined');
    expect(debugString(true)).toBe('true');
    expect(debugString(false)).toBe('false');
    expect(debugString(NaN)).toBe('NaN');
  });

  it('stringifies functions', () => {
    expect(debugString(() => {})).toBe('<function ()>');
    expect(debugString((a: number) => a)).toBe('<function (a)>');
    expect(debugString((a: number, b: number) => a + b)).toBe(
      '<function (a, b)>'
    );
  });

  it('stringifies arrays', () => {
    expect(debugString([1, 2, 3])).toBe('[1, 2, 3]');
    expect(debugString([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(
      '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]'
    );
  });

  it('stringifies objects', () => {
    expect(debugString({ a: 1, b: 2, c: 3 })).toBe(`{
  "a": 1,
  "b": 2,
  "c": 3
}`);
  });

  it('stringifies errors', () => {
    const error = new Error('test');
    expect(debugString(error)).toBe(error.toString() + '\n' + error.stack);
  });

  it('stringifies classes', () => {
    expect(debugString(Date)).toBe('[class Date]');
    expect(debugString(Person)).toBe('[class Person]');
  });

  it('stringifies symbols', () => {
    expect(debugString(Symbol('test'))).toBe('Symbol(test)');
  });
});
