# rAF Microbenchmark

## Methods and goals

The purpose of this microbenchmarking code is to determine whether or not calling rAF many times on a page (during each component render) impacts performance. The two benchmark functions are `renderWithoutRaf()` and `renderWithRaf`. Both functions render a simple React component, but one calls rAF directly after calling render, whereas the other does not.

## How to run the microbenchmark

1. Run `yarn build; yarn start` in the command line.
2. Adjust the number of times to run the benchmark in `index.ts` in the function params for `runBenchmark.ts`.
3. The average runtimes for rendering with and without rAF will be listen in a div on the page as well as logged to the console.

## Findings

When running the benchmark 100 times and taking the average durations of each function, there doesn't seem to be much of a difference between `renderWithoutRaf()` and `renderWithRaf`.
