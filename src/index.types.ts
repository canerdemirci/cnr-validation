import { CustomError } from "./errors"

/**
 * @interface
 * An interface for creating validation rule classes for different types.
 */
export interface IValidationRule {
    required: (error?: Error) => never | IValidationRule
    custom: (func: (value: any) => boolean, error?: Error) => never | IValidationRule
}

/**
 * @interface
 * Validation rule interface for string values
 */
export interface IStringRule extends IValidationRule {
    min: (min: number, error?: Error) => never | IStringRule
    max: (max: number, error?: Error) => never | IStringRule
    length: (length: number, error?: Error) => never | IStringRule
    email: (error?: Error) => never | IStringRule
    startsWith(str: string, caseSensitive?: boolean): never | IStringRule
    endsWith(str: string, caseSensitive?: boolean): never | IStringRule
    regex(pattern: RegExp, error?: Error) : never | IStringRule
    toString: () => string
}

/**
 * @interface
 * Validation rule interface for number values
 */
export interface INumberRule extends IValidationRule {
    min: (min: number, error?: Error) => never | INumberRule
    max: (max: number, error?: Error) => never | INumberRule
    equal: (number: number, error?: Error) => never | INumberRule
    toNumber: () => number
}

/**
 * @type
 * Validation model
 */
export type ValidationModel = {
    [key: string] : () => IValidationRule
}

/**
 * @type
 * Validation result
 */
export type ValidationResult = {
    [key: string] : {
        success: boolean,
        error?: CustomError
    }
}