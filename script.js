/**
 * Util for loading web assembly.
 */
const loadWebAssembly = fileName => (
  fetch(fileName)
    .then(response => response.arrayBuffer() )
    .then(bytes => WebAssembly.instantiate(bytes, {}) )
    .then(result => result.instance.exports)
);

/**
 * Util for loading and printing load time of web assembly.
 */
const loadAndLogWASM = fileName => {
  const startTime = performance.now();
  const loader = loadWebAssembly(fileName);

  loader.then(_ =>
    console.log(
      `${fileName} load time is `,
      performance.now() - startTime
    )
  );

  return loader;
}

/**
 * Simple benchmark runner.
 */
const runBenchmark = (iteration, funcs) => {
  console.log(`Running benchmarks for ${iteration} iterations.`);

  Object.keys(funcs).forEach(lang => {
    const startTime = performance.now();
    const result = funcs[lang](iteration);
    const execTime = performance.now() - startTime;

    console.log(lang, +execTime.toFixed(0), 'ms ->', result);
  });
};

/**
 * Imparative JavaScript squarer func.
 */
const JSSquarer = n => {
  var total = 0;

  for (var i = 0; i <= n; i++) {
    total += i * i
  }

  return total;
};

/**
 * Our main test function.
 */
async function main() {
  // Load wasms.
  const [ CPP, Rust ] = await Promise.all([
    loadAndLogWASM('c++/squarer.wasm'),
    loadAndLogWASM('rust/squarer.wasm')
  ]);

  console.log('');

  // Run benchmarks.
  runBenchmark(1000000000, {
    'js': JSSquarer,
    'c++': CPP._Z10sumSquaresi,
    'rust': Rust.SumSquares,
  });
}

/**
 * Run main at the beginning.
 */
main();
