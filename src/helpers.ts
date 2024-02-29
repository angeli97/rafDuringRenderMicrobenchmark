export function waste(ms, name) {
    performance.mark(name+'start');
    const start = performance.now();
    while(performance.now() - start < ms) {}
    performance.measure(name, name+'start');
}