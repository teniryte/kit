import flatten from '../runtime/flatten';
import { describe, it, expect } from 'vitest';

describe('flatten', () => {
  it('flattens an array', () => {
    expect(flatten([1, 2, [3, 4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('flattens an object', () => {
    expect(flatten({ a: 1, b: [2, 3], c: { d: 4, e: [5, 6] } })).toEqual({
      a: 1,
      b: [2, 3],
      'c.d': 4,
      'c.e': [5, 6],
    });
  });

  it('flattens an object and unpacks arrays', () => {
    expect(flatten({ a: 1, b: [2, 3], c: { d: 4, e: [5, 6] } }, true)).toEqual({
      a: 1,
      'b.0': 2,
      'b.1': 3,
      'c.d': 4,
      'c.e.0': 5,
      'c.e.1': 6,
    });
    expect(
      flatten(
        {
          a: 1,
          b: {
            c: {
              d: 2,
            },
            d: [3, 4],
          },
        },
        true
      )
    ).toEqual({ a: 1, 'b.c.d': 2, 'b.d.0': 3, 'b.d.1': 4 });
  });
});
