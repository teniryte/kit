import isClass from '../runtime/is-class';
import { describe, it, expect } from 'vitest';

describe('is-class', () => {
  it('should return true if the value is a class', () => {
    expect(isClass(class {})).toBe(true);
    expect(isClass(Date)).toBe(true);
    expect(isClass(Map)).toBe(true);
    expect(isClass(Set)).toBe(true);
    expect(isClass(Array)).toBe(true);
    expect(isClass(RegExp)).toBe(true);
    expect(isClass(Error)).toBe(true);
    expect(isClass(Promise)).toBe(true);
    expect(isClass(WeakMap)).toBe(true);
    expect(isClass(function person() {})).toBe(false);
    expect(isClass(function Person() {})).toBe(true);
    expect(isClass(() => {})).toBe(false);
    expect(isClass(function () {})).toBe(false);
  });
});
