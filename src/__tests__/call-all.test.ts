import { describe, it, expect, vi } from 'vitest';
import { callAll } from '../runtime/call-all';

describe('callAll', () => {
  it('should call all functions with the same arguments', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    const combinedFn = callAll(fn1, fn2, fn3);
    combinedFn('test', 123);

    expect(fn1).toHaveBeenCalledWith('test', 123);
    expect(fn2).toHaveBeenCalledWith('test', 123);
    expect(fn3).toHaveBeenCalledWith('test', 123);
  });

  it('should handle empty function array', () => {
    const combinedFn = callAll();
    expect(() => combinedFn('test')).not.toThrow();
  });

  it('should handle single function', () => {
    const fn = vi.fn();
    const combinedFn = callAll(fn);

    combinedFn('single');
    expect(fn).toHaveBeenCalledWith('single');
  });

  it('should handle undefined and null functions', () => {
    const fn = vi.fn();
    const combinedFn = callAll(undefined, fn, null);

    combinedFn('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should handle mixed valid and invalid functions', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const combinedFn = callAll(fn1, undefined, fn2, null);

    combinedFn('mixed', 'args');
    expect(fn1).toHaveBeenCalledWith('mixed', 'args');
    expect(fn2).toHaveBeenCalledWith('mixed', 'args');
  });

  it('should call functions in order', () => {
    const calls: string[] = [];
    const fn1 = vi.fn(() => calls.push('first'));
    const fn2 = vi.fn(() => calls.push('second'));
    const fn3 = vi.fn(() => calls.push('third'));

    const combinedFn = callAll(fn1, fn2, fn3);
    combinedFn();

    expect(calls).toEqual(['first', 'second', 'third']);
  });

  it('should handle functions that return values', () => {
    const fn1 = vi.fn(() => 'result1');
    const fn2 = vi.fn(() => 'result2');

    const combinedFn = callAll(fn1, fn2);
    const result = combinedFn();

    expect(result).toBeUndefined(); // callAll doesn't return values
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  it('should handle functions with no arguments', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const combinedFn = callAll(fn1, fn2);
    combinedFn();

    expect(fn1).toHaveBeenCalledWith();
    expect(fn2).toHaveBeenCalledWith();
  });

  it('should handle functions with multiple arguments', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const combinedFn = callAll(fn1, fn2);
    combinedFn(1, 'string', true, { key: 'value' }, [1, 2, 3]);

    expect(fn1).toHaveBeenCalledWith(
      1,
      'string',
      true,
      { key: 'value' },
      [1, 2, 3]
    );
    expect(fn2).toHaveBeenCalledWith(
      1,
      'string',
      true,
      { key: 'value' },
      [1, 2, 3]
    );
  });

  it('should handle async functions', async () => {
    const asyncFn1 = vi.fn(async () => Promise.resolve('async1'));
    const asyncFn2 = vi.fn(async () => Promise.resolve('async2'));

    const combinedFn = callAll(asyncFn1, asyncFn2);
    combinedFn('async test');

    expect(asyncFn1).toHaveBeenCalledWith('async test');
    expect(asyncFn2).toHaveBeenCalledWith('async test');
  });
});
