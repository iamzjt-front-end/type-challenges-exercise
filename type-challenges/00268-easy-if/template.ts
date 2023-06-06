type If<C extends boolean, T, F> = C extends true ? T : F

// * @ts-expect-error
// * 这一句注释的意思是，期望底下的这段代码抛出错误，否则这句注释就会报错
// * -> 在此题的意思就是，需要限制 If 第一个参数的类型，只能是 boolean
