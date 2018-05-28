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
const loadTimeLogs = [];
const loadAndLogWASM = fileName => {
  const startTime = performance.now();
  const loader = loadWebAssembly(fileName);

  loader.then(_ => {
    const log = [`Loaded -> ${fileName} in`, +(performance.now() - startTime).toFixed(), 'ms'];
    loadTimeLogs.push(log);
    console.log(...log);
  });

  return loader;
}

/**
 * Simple benchmark runner.
 */
const runBenchmark = (rangeMax, iteration, funcs) => {
  console.log(`Summing squares of range from 1 to ${rangeMax} for ${iteration} times.`);

  const funcCount = funcs.length;
  const iterate = [...Array(iteration).keys()];
  let results = Array(funcCount).fill(null).map(() => []);

  iterate.forEach(iterNo => {
    console.log(`> Running iteration number (${iterNo+1}/${iteration})...`);

    funcs.forEach(([name, func], index) => {
      console.log(`--> Calculating benchmark for ${name} (${index+1}/${funcCount})...`);

      const startTime = performance.now();
      const result = func(rangeMax);
      const execTime = performance.now() - startTime;

      results[index].push({
        lang: name,
        time: +execTime.toFixed(0),
        value: result 
      });
    });
  });

  results = results.map((result, index) => {
    const { lang, value } = result[0];

    const averageTime = result.reduce((acc, {time}) => acc + time, 0) / iteration;
    
    // Being sure about things.
    const allSameValues = result.every(item => item.value === value);
    const allSameLangs = result.every(item => item.lang === lang);

    if (!allSameValues || !allSameLangs) {
      throw new Error(`Something wrong! Values/Langs are not same somewhere...`);
    }    

    return {
      'Language': lang,
      'Time (ms)': +averageTime.toFixed(0),
      'Result': value
    };
  });

  console.clear();
  console.log('Benchmark completed.')
  console.log('');
  console.log('Load times:');
  loadTimeLogs.forEach(log => console.log(...log));
  console.log('');
  console.log('Benchmark results:');
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
async function runBenchmarks() {
  // Load wasms.
  console.log('');
  console.log('Loading Wasm modules...');
  const [ ByHand, CPP, Rust ] = await Promise.all([
    loadAndLogWASM('by-hand/squarer.wasm'),
    loadAndLogWASM('c++/squarer.wasm'),
    loadAndLogWASM('rust/squarer.wasm'),
  ]);

  console.log('');

  // Run benchmarks.
  runBenchmark(1000000000, 10, [
    ['Native JavaScript', JSSquarer],
    ['Wasm Written By Hand', ByHand.sumSquares],
    ['C++ Compiled to Wasm', CPP._Z10sumSquaresi],
    ['Rust Compiled to Wasm', n => Rust.SumSquares(n+1)], // Rust ranges doesnt count last item so we have this fix for now..
  ]);
}

/**
 * Run main at the beginning.
 */
console.log('Call runBenchmarks() function to run benchmarks...');
