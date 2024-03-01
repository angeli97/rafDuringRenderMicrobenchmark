import { renderWithRaf, renderWithoutRaf } from "./SimpleReactComponent";

export default async function runBenchmarks(numRuns: number) {
  const benchmarks = [
    { name: "renderWithoutRaf", fn: renderWithoutRaf },
    { name: "renderWithRaf", fn: renderWithRaf },
  ];

  const benchmarkDurationTotals = new Map([
    ["renderWithoutRaf", 0],
    ["renderWithRaf", 0],
  ]);

  const yieldToBrowser = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

  const runAll = async (name: string) => {
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", "parentDiv");
    document.body.appendChild(parentDiv);
    for (const benchmark of benchmarks) {
      const start = performance.now();
      performance.mark(`${benchmark.name}start`);
      for (let i = 0; i < 100; i += 1) {
        const div = document.createElement("div");
        parentDiv.appendChild(div);
        benchmark.fn(div);
      }
      const end = performance.now();
      performance.measure(benchmark.name, `${benchmark.name}start`);
      const div = document.createElement("div");
      div.setAttribute("automation", "true");
      const duration = end - start;
      div.innerText = `${name} ${benchmark.name} ${duration}`;
      document.body.appendChild(div);
      console.log(benchmark.name, duration);
      // Exclude the first run from the average
      if (!name.includes("1")) {
        benchmarkDurationTotals.set(
          benchmark.name,
          benchmarkDurationTotals.get(benchmark.name) + duration
        );
      }
      await yieldToBrowser();
    }
  };

  for (let i = 1; i <= numRuns; i++) {
    await runAll(`Run ${i}`);
  }

  benchmarks.forEach((benchmark) => {
    const div = document.createElement("div");
    div.setAttribute("automation", "true");
    div.innerText = `${benchmark.name} average duration: ${
      benchmarkDurationTotals.get(benchmark.name) / (numRuns - 1)
    }`;
    console.log(
      `${benchmark.name} average duration: ${
        benchmarkDurationTotals.get(benchmark.name) / (numRuns - 1)
      }`
    );
    document.body.appendChild(div);
  });
}
