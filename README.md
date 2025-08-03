[![npm version](https://img.shields.io/npm/v/kit.svg?color=blue)](https://www.npmjs.com/package/kit) [![npm downloads](https://img.shields.io/npm/dm/kit.svg?color=brightgreen)](https://www.npmjs.com/package/kit) [![GitHub stars](https://img.shields.io/github/stars/teniryte/kit?style=social)](https://github.com/teniryte/kit) [![License](https://img.shields.io/github/license/teniryte/kit)](LICENSE)

# Kit

Universal TypeScript utilities for development.

## Installation

```bash
npm install kit
```

## Usage

```typescript
import { /* utilities */ } from 'kit';

```

## Utilities

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