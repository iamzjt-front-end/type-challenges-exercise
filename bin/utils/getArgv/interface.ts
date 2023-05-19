export interface IPropsRules {
  direct: string
  alias?: string
  type: 'string' | 'boolean'
  describe?: string
  default: any
  [any: string]: any
}

export interface IOps {
  usage?: string
  describe?: string
}

export interface IMinimistOps {
  string: string[]
  boolean: string[]
  alias: any
  default: any
}
