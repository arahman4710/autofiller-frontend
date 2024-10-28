/* eslint @typescript-eslint/naming-convention: 0 */
declare type Maybe<T> = T | null
declare type InputMaybe<T> = Maybe<T>
declare type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
declare type MakeOptional<T, K extends keyof T> = { [SubKey in K]?: Maybe<T[SubKey]> } & Omit<T, K>
declare type MakeMaybe<T, K extends keyof T> = { [SubKey in K]: Maybe<T[SubKey]> } & Omit<T, K>
declare type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
declare type Incremental<T> =
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
  | T
