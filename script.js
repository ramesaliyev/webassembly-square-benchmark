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
  console.log(`Summing squares of range from 1 to ${iteration}.`);

  const results = [];

  funcs.forEach(([name, func]) => {
    const startTime = performance.now();
    const result = func(iteration);
    const execTime = performance.now() - startTime;


    results.push({
      'Language': name,
      'Time (ms)': +execTime.toFixed(0),
      'Result': result 
    });
  });

  console.table(results);
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
  const [ ByHand, CPP, Rust ] = await Promise.all([
    loadAndLogWASM('by-hand/squarer.wasm'),
    loadAndLogWASM('c++/squarer.wasm'),
    loadAndLogWASM('rust/squarer.wasm'),
  ]);

  console.log('');

  // Run benchmarks.
  runBenchmark(1000000000, [
    ['Native JavaScript', JSSquarer],
    ['Wasm Written By Hand', ByHand.sumSquares],
    ['C++ Compiled to Wasm', CPP._Z10sumSquaresi],
    ['Rust Compiled to Wasm', Rust.SumSquares],
  ]);
}

/**
 * Run main at the beginning.
 */
main();
