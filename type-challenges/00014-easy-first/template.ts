type First<T extends any[]> = T extends [infer F, ...infer Reset] ? F : never;
