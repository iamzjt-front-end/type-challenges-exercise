type MyExclude<T, U> = T extends U ? never : T

// * 当传入的被检查类型是联合类型的时候，类型检查过程会被分解为多个分支进行

// T extends U ? X : Y
// T => A | B | C
// 假如 T 是联合类型 A ｜ B ｜ C
// A | B | C extends U ? X : Y  =>
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)

// * 内置类型 Exclude 用于删除类型集合中的指定类型
// * 此案例就是实现一个Exclude
