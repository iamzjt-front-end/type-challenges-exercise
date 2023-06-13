type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

// * ts内置类型：Parameters 用于提取函数类型的参数类型

// - 类型参数 T 为待处理的类型，通过 extends 约束为函数，参数和返回值任意。

// - 通过 extends 匹配一个模式类型，提取参数的类型到 infer 声明的局部变量 P 中返回。

// - 这样就实现了函数参数类型的提取，这也就是通过模式匹配做提取。
