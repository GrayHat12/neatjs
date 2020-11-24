export function sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
}

export function binary_step(x: number, threshold: number = 0) {
    return x < threshold ? 0 : 1;
}

export function linear_function(x: number, a: number = 4) {
    return x * a;
}

export function tanh(x: number) {
    return 2 * sigmoid(2 * x) - 1;
}

export function relu(x: number, a: number = 0) {
    return Math.max(a, x);
}

export function leaky_relu(x: number, a: number = 0, slope: number = 0.01) {
    if (x < a) return slope * x;
    return x;
}

export function parameterised_relu(x: number, a: number = 0) {
    if (x < a) return a * x;
    return x;
}

export function exponential_linear_unit(x: number, a: number = 0) {
    if (x < a) return a * (Math.exp(x) - 1);
    return x;
}

export function swish(x: number) {
    return x * sigmoid(x);
}

export function softmax(x: number[]) {
    let z = x.map(el => Math.exp(el));
    let z_ = z.map(el => el / z.reduce((a, b) => a + b));
    return z_;
}

export type ActivationFunction = (...args: any[]) => number;