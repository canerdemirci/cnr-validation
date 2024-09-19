import { IValidationRule } from "../../src"

export type InputType = 'text' | 'number' | 'email' | 'password' | 'checkbox'
export type InputData = {
    name: string,
    title: string,
    initialValue: string | number,
    inputType?: InputType
    textArea?: boolean
    rule: (value: any) => IValidationRule
}
export type FormData = {
    inputs: InputData[]
}
export type FormValue = {
    name: string
    value: any
}
export type FormError = {
    name: string
    error?: Error
}