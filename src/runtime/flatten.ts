import { Primitive } from '../types/primitive.type';

export function flatten(input: unknown, unpackArrays = false): unknown {
  if (Array.isArray(input)) {
    // recursively flatten array
    return input.reduce<unknown[]>((acc, val) => {
      if (Array.isArray(val)) {
        acc.push(...(flatten(val, unpackArrays) as unknown[]));
      } else if (typeof val === 'object' && val !== null) {
        acc.push(flatten(val, unpackArrays)); // nested objects remain objects
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  } else if (typeof input === 'object' && input !== null) {
    // object → flat object
    const result: Record<string, Primitive> = {};

    const recurse = (obj: Record<string, unknown>, parentKey = '') => {
      for (const [key, val] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(val)) {
          if (unpackArrays) {
            // unpack array into separate properties
            const flattenedArray = flatten(val, unpackArrays) as unknown[];
            flattenedArray.forEach((item, index) => {
              result[`${newKey}.${index}`] = item as Primitive;
            });
          } else {
            // keep array as is
            result[newKey] = flatten(val, unpackArrays) as unknown as Primitive;
          }
        } else if (typeof val === 'object' && val !== null) {
          recurse(val as Record<string, unknown>, newKey);
        } else {
          result[newKey] = val as Primitive;
        }
      }
    };

    recurse(input as Record<string, unknown>);
    return result;
  }

  // if primitive
  return input;
}

export default flatten;
