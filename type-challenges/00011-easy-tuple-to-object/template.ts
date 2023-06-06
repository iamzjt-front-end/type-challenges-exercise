type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P
}

// * @ts-expect-error
// * 这一句注释的意思是，期望底下的这段代码抛出错误，否则这句注释就会报错
// * -> 在此题的意思就是，需要限制 TupleToObject 的参数: tuple 内必须是 string 或 number

// + 当然看网上其他一些解答是用 PropertyKey 来限制的，这样就可以兼容 symbol 了
// + PropertyKey = string | number | symbol
// + 但是我觉得这样就不是 tuple 了，因为 symbol 是不会有顺序的
