type U = " " | "\n" | "\t";

type TrimLeft<S extends string> = S extends `${ U }${ infer T }` ? TrimLeft<T> : S
