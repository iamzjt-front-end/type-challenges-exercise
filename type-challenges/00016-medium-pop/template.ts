type Pop<T extends any[]> = T extends [...infer R, infer L] ? R : T

// * 附加题
// - type MyShift<T extends any[]> = T extends [infer F, ...infer R] ? F : never
// - type Push<T extends any[], K> = [...T, K]
// - type MyUnshift<T extend any[], K> = [K, ...T]
