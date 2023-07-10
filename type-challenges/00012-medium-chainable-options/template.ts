type Chainable<T extends Record<string, any> = {}> = {
  option: <K extends string, V>(
      key: K extends keyof T ? never : K,
      value: V,
  ) => Chainable<Omit<T, K> & Record<K, V>>
  get(): T
}
