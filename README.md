## Bloom Runtime
Stable Bloom runtime in JavaScript is in `node_modules/bloom-runtime-stable`. This runs hand-written, JavaScript-syntax Bloom.

### Usage:
Include `var Bloom = require('bloom-runtime-stable');` at the top of your file. Then write JavaScript-syntax Bloom code as in the examples.

### Examples:

    $ node examples/bloom_paths_stable.js
    $ node examples/decision_tree/decision_tree_stable.js

## Experimental Bloom Runtime
Experimental Bloom runtime in JavaScript is in `node_modules/bloom-runtime`. This runs files generated by the experimental bloom compiler.

### Usage:
Include `var Bloom = require('bloom-runtime');` at the top of your file. But you should really be generating your target file with the compiler.

### Example:

    $ node examples/bloom_paths.js

## Experiemental Bloom Compiler
Experimental Bloom compiler in JavaScript is in `bloom_compiler`. This compiles an input file to either JavaScript, to be run with the experimental runtime, or procedural PostgreSQL (PL/pgSQL).

### Usage:
Use the script `compile_bloom.sh` to generate code. To generate PL/pgSQL instead of javascript, use the optional --sql command-line argument.

### Examples:

    $ ./compile_bloom.sh examples/paths.rb paths.js
    $ node paths.js


    $ ./compile_bloom.sh --sql examples/paths.rb paths.sql
    $ plpgsql paths.sql

### Current Issues:

- Compiler only handles `pairs`, `reduce`, `group`, and `argmin` operations. The rest need to be implemented
- Compiler only handles instantaneous (<=) and deferred (<+-) operators. The rest need to be implemented
- `examples/decision_tree/typed_dtree.rb` relies on unimplemented features
