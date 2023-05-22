type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// * 众所周知 readonly 只需要在键值前面加上 readonly 参数即可
