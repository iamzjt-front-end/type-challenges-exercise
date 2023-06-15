type Last<T extends any[]> = T extends [...infer K, infer L] ? L : never
