[![npm version](https://img.shields.io/npm/v/kit.svg?color=blue)](https://www.npmjs.com/package/kit) [![npm downloads](https://img.shields.io/npm/dm/kit.svg?color=brightgreen)](https://www.npmjs.com/package/kit) [![GitHub stars](https://img.shields.io/github/stars/teniryte/kit?style=social)](https://github.com/teniryte/kit) [![License](https://img.shields.io/github/license/teniryte/kit)](LICENSE)

# Kit

A lightweight TypeScript library providing some specific utilities and types.

## Installation

```bash
npm install kit
# or
yarn add kit
# or
bun add kit
```

## Usage

```typescript
import { flatten } from 'kit';
// or
import flatten from 'kit/flatten';

```

## Utilities

### kindOf

> Returns the specific type/kind of a value with enhanced type detection beyond `typeof`.

```ts
import { kindOf } from 'kit';

kindOf(null); // => 'null'
kindOf(undefined); // => 'undefined'
kindOf(NaN); // => 'nan'
kindOf('string'); // => 'string'
kindOf(123); // => 'number'
kindOf(true); // => 'boolean'
kindOf(Symbol()); // => 'symbol'
kindOf([]); // => 'array'
kindOf(new Set()); // => 'set'
kindOf(new Map()); // => 'map'
kindOf(new Date()); // => 'date'
kindOf(/regex/); // => 'regexp'
kindOf(Buffer.from('test')); // => 'buffer'
kindOf(class Test {}); // => 'class'
kindOf(() => {}); // => 'function'
```

### pluralize

> Russian pluralization utility that returns the correct word form based on count.

```ts
import { pluralize } from 'kit';

// Basic usage with three forms: nominative, genitive singular, genitive plural
pluralize(0, 'ящик', 'ящика', 'ящиков'); // => 'ящиков'
pluralize(1, 'ящик', 'ящика', 'ящиков'); // => 'ящик'
pluralize(2, 'ящик', 'ящика', 'ящиков'); // => 'ящика'
pluralize(5, 'ящик', 'ящика', 'ящиков'); // => 'ящиков'

// Can also use arrays
pluralize(1, ['ящик', 'ящика', 'ящиков']); // => 'ящик'
pluralize(2, ['ящик', 'ящика', 'ящиков']); // => 'ящика'
```

### flatten

> Flattens an object or an array.

```ts
import { flatten } from 'kit';

// Flatten an array
const flatNumbers = flatten([1, [2, [3, 4]]]); // => [1, 2, 3, 4]

// Flatten an object
const flatObject = flatten({
  a: 1,
  b: {
    c: {
      d: 2
    },
    d: [3, 4]
  }
}); // => { a: 1, 'b.c.d': 2, 'b.d': [3, 4]}

// Flatten an object with arrays unpacking
const flatObject = flatten({
  a: 1,
  b: {
    c: {
      d: 2
    },
    d: [3, 4]
  }
}); // => { a: 1, 'b.c.d': 2, 'b.d.0': 3, 'b.d.1': 4}
```

## Utility Types

### Kind

> Enum containing possible kind of value variants:

```ts
enum Kind {
  Null = 'null',
  String = 'string',
  Undefined = 'undefined',
  Array = 'array',
  ArrayLike = 'array-like',
  Class = 'class',
  Function = 'function',
  Symbol = 'symbol',
  Number = 'number',
  Date = 'date',
  Boolean = 'boolean',
  Regex = 'regexp',
  Buffer = 'buffer',
  NaN = 'nan',
  Set = 'set',
  Map = 'map',
  ArrayBuffer = 'arraybuffer'
}
```

### Primitive

> Simple type for primitives.

```ts
import { Primitive } from 'kit';

type MyObject = {
  var1: Primitive;
};
```

## License

MIT