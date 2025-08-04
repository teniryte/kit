import { Kind } from '../types/kind.enum';
import kindOf from '../runtime/kind-of';

class Person {}

function createPerson() {}

describe('kind-of', () => {
  it('should return the correct kind of value', () => {
    expect(kindOf(null)).toBe(Kind.Null);
    expect(kindOf(undefined)).toBe(Kind.Undefined);
    expect(kindOf(1)).toBe(Kind.Number);
    expect(kindOf('string')).toBe(Kind.String);
    expect(kindOf(true)).toBe(Kind.Boolean);
    expect(kindOf(false)).toBe('boolean');
    expect(kindOf(new Date())).toBe(Kind.Date);
    expect(kindOf(new RegExp(''))).toBe(Kind.RegExp);
    expect(kindOf(Person)).toBe(Kind.Class);
    expect(kindOf(createPerson)).toBe(Kind.Function);
    expect(kindOf(() => {})).toBe(Kind.Function);
    expect(kindOf(Date)).toBe(Kind.Class);
    expect(kindOf(Map)).toBe(Kind.Class);
    expect(kindOf(Symbol(''))).toBe(Kind.Symbol);
    expect(kindOf(Buffer.from(''))).toBe(Kind.Buffer);
    expect(kindOf(NaN)).toBe(Kind.NaN);
    expect(kindOf(new Set())).toBe(Kind.Set);
    expect(kindOf(new Map())).toBe(Kind.Map);
    expect(kindOf(new Array())).toBe(Kind.Array);
    expect(kindOf(new ArrayBuffer(1))).toBe(Kind.ArrayBuffer);

    expect(kindOf(new Error())).toBe(Kind.Error);
    expect(kindOf(new Promise(() => {}))).toBe(Kind.Promise);
    expect(kindOf(new WeakMap())).toBe(Kind.WeakMap);
    expect(kindOf(new WeakSet())).toBe(Kind.WeakSet);
    expect(kindOf(new Int8Array())).toBe(Kind.Int8Array);
    expect(kindOf(new Uint8Array())).toBe(Kind.Uint8Array);
    expect(kindOf(new Uint8ClampedArray())).toBe(Kind.Uint8ClampedArray);

    expect(kindOf(new Int8Array())).toBe(Kind.Int8Array);
    expect(kindOf(new Promise(() => {}))).toBe(Kind.Promise);

    expect(kindOf(parseInt('sgd'))).toBe(Kind.NaN);

    (function () {
      expect(kindOf(arguments)).toBe(Kind.ArrayLike);
    })();

    expect(kindOf({})).toBe(Kind.Object);
  });
});
