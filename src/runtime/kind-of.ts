import Kind from '../types/kind.enum';

export function kindOf(value: unknown): Kind {
  if (value === null) return Kind.Null;
  if (value === undefined) return Kind.Undefined;

  if (typeof value === 'string') return Kind.String;

  // Check for Buffer (Node.js)
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
    return Kind.Buffer;
  }

  if (value instanceof ArrayBuffer) return Kind.ArrayBuffer;

  if (typeof value === 'number' && Number.isNaN(value)) {
    return Kind.NaN;
  }

  if (value instanceof Error) return Kind.Error;
  if (value instanceof Promise) return Kind.Promise;
  if (value instanceof WeakMap) return Kind.WeakMap;
  if (value instanceof WeakSet) return Kind.WeakSet;
  if (value instanceof Int8Array) return Kind.Int8Array;
  if (value instanceof Uint8Array) return Kind.Uint8Array;
  if (value instanceof Uint8ClampedArray) return Kind.Uint8ClampedArray;

  if (typeof value === 'function') {
    // Check for built-in classes first
    if (
      value === Date ||
      value === Map ||
      value === Set ||
      value === Array ||
      value === RegExp ||
      value === Error ||
      value === Promise ||
      value === WeakMap ||
      value === WeakSet ||
      value === Int8Array ||
      value === Uint8Array ||
      value === Uint8ClampedArray ||
      value === Int16Array ||
      value === Uint16Array ||
      value === Int32Array ||
      value === Uint32Array ||
      value === Float32Array ||
      value === Float64Array ||
      value === BigInt64Array ||
      value === BigUint64Array ||
      value === DataView ||
      value === ArrayBuffer
    ) {
      return Kind.Class;
    }

    // differentiate class from regular function
    const src = Function.prototype.toString.call(value);
    return /^class\s/.test(src) ? Kind.Class : Kind.Function;
  }

  if (Array.isArray(value)) return Kind.Array;

  if (value instanceof Set) return Kind.Set;
  if (value instanceof Map) return Kind.Map;

  // Array-like: has length, not string and not function
  if (
    typeof value === 'object' &&
    value !== null &&
    'length' in (value as any) &&
    typeof (value as any).length === 'number' &&
    !(value instanceof String)
  ) {
    return Kind.ArrayLike;
  }

  if (typeof value === 'symbol') return Kind.Symbol;
  if (typeof value === 'number') return Kind.Number;
  if (typeof value === 'boolean') return Kind.Boolean;

  if (value instanceof Date) return Kind.Date;
  if (value instanceof RegExp) return Kind.RegExp;

  return (typeof value as Kind) || Kind.Undefined;
}

export default kindOf;
