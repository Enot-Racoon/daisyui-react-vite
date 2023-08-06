export {}

declare global {
  type ValOrArr<T> = T | T[]

  type IndexKey = string | number | symbol
}
