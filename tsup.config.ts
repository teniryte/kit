import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    flatten: 'src/runtime/flatten.ts',
    primitive: 'src/types/primitive.type.ts',
    pluralize: 'src/runtime/pluralize.ts',
    kind: 'src/types/kind.enum.ts',
    'kind-of': 'src/runtime/kind-of.ts',
    'args-names': 'src/runtime/args-names.ts',
    'event-emitter': 'src/runtime/event-emitter.ts',
    'debug-string': 'src/runtime/debug-string.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [],
  outDir: 'dist',
  splitting: false,
  treeshake: true,
  minify: false,
  target: ['node18'],
});
