type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// * 判断常用 extends 关键字
// * 在 TS 充当了 if 和 在 XXX 范围内 的一个作用。
// * extends 后面通常就要接三目运算符了（也有例外）
// * 举个 🌰
// type Type01 = 1 extends string ? true : false // false

// * extends 也有不接三目运算符的时候，比如：
// * 写一个限制 string 类型的 push 方法
// * 但是这个方法的参数类型不一定是 string，也可能是 string[]，所以要用 extends
// * 但是这个时候就不需要三目运算符了，因为 extends 本身就是一个三目运算符
// * 举个 🌰
// type StrPush<T extends string[], U extends string> = [...T, U]
// type arr = StrPush<[1, 2, 3], 4>

// * 比如在这个例子中，直接会报错。因为还没进到 StrPush 的判断中，T 泛型就已经被约束为 string 类型了，U 也被约束为 string 类型

// * extends 总结：
// * extends 在 TS 的 函数体中的时候起到的是 判断范畴 的一个作用
// * 在一些特殊位置 （比如接收泛型的时候，在函数运算过程中断言变量类型的时候）起到的是一个 约束类型 的作用

// * 对于此题：
// * extends 上面讲过，属于范畴判断/约束类型，在泛型定义< >里面明显就是为了约束类型
// * 而keyof 的作用可以理解为 把一个对象中的所有 键 提取出来，类似于 Object.keys() 。

// * P in k 可以理解为 循环，遍历

// * 合起来就是：
// * K extends keyof T： K 限制为 Todo 的键值（传入的是 “title” | “completed” 符合要求，因为只能少不能多嘛）
