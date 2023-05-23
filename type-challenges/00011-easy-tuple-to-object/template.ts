type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
