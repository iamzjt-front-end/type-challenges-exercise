type _U = " " | "\n" | "\t";

type Trim<S extends string> = S extends `${_U}${infer T}` | `${infer T}${_U}` ? Trim<T> : S

// 用 union 比嵌套两次三元清楚
