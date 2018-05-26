## Hello WASM & Little Benchmark
This repo contains my hello world with Web Assembly and a little square benchmark. I've followed [this article](https://medium.freecodecamp.org/get-started-with-webassembly-using-only-14-lines-of-javascript-b37b6aaca1e4) while creating. You can try it on your own system. [Online Demo](http://ramesaliyev.com/webassembly-square-benchmark/)

Benchmark code is; sum square of numbers within range of 0 to 1,000,000,000 (bilion).

- MacBook Air (13-inch, Early 2014), 1,7 GHz Intel Core i7, 8 GB 1600 MHz DDR3

|Language|Execution Time (ms)|
|:------:|:------------:|
|JavaScript|**~1100**|
|C++|**~930**|
|Rust|**~930**|

- Windows 10 Desktop PC, 4.2 GHz Intel Core i7, 16 GB 3200 MHz DDR4

|Language|Execution Time (ms)|
|:------:|:------------:|
|JavaScript|**~920**|
|C++|**~1110**|
|Rust|**~1110**|

Thanks [Berkan Yavri](https://github.com/yavrib) for contributing Rust code and Windows Benchmark.

## Tools Used
- https://mbebenita.github.io/WasmExplorer/
- https://wasdk.github.io/WasmFiddle/

## What next?
- https://labnotes.panderalabs.com/learning-how-to-learn-webassembly-7743663ed4d0
- https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/
