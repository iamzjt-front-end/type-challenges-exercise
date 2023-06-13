type MyReturnType<T extends Function> = T extends (...args: any[]) => infer P ? P : never;

// - T 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 P 里返回。

// - 参数类型可以是任意类型，也就是 any[]。
// - 但是注意，这里不能用 unknown，因为涉及到参数的逆变性质。
