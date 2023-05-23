type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never;
