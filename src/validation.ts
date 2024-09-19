import {
    InvalidEmailError, InvalidTypeError, LengthError,
    MaximumLengthError, MaxNumberError, MinimumLengthError, RegexError,
    MinNumberError, RequiredError, ValidationError, EqualNumberError,
    StartsWithError,
    EndsWithError
} from './errors'
import type { INumberRule, IStringRule, IValidationRule, ValidationModel, ValidationResult }
    from './index.types'

/*+
* For throwing custom errors.
*/
function throwOptionalOrDefaultError(error: Error, optionalError?: Error) {
    if (optionalError !== undefined) throw optionalError
    else throw error
}

/**
 * @abstract @class Validation rule base abstract class.
 */
export abstract class ValidationRule implements IValidationRule {
    protected _value: any
    protected _invalidTypeError?: Error

    /**
     * @property
     * Value can't be empty, undefined, NaN.
     */
    abstract required(error?: Error): never | IValidationRule

    constructor(value: any, invalidTypeError?: Error) {
        this._value = value
        this._invalidTypeError = invalidTypeError
    }

    /**
     * @property
     * For custom validation. Throws error if the given function returns false.
     * @returns never | IValidationRule
     */
    custom(func: (value: any) => boolean, error?: Error): never | this {
        if (!func(this._value)) {
            throwOptionalOrDefaultError(new ValidationError('Value is not valid'), error)
        }
        return this
    }
}

/**
 * @class
 * Validation rule class for string values
 * Validations:
 * - type checking
 * - required
 * - min
 * - max
 * - length
 * - startsWith
 * - endsWith
 * - email
 * - custom validation
 * - regex
 */
export class StringRule extends ValidationRule implements IStringRule {
    constructor(value: any, invalidTypeError?: InvalidTypeError) {
        super(value, invalidTypeError ?? new InvalidTypeError('Value must be a string'))

        // Check if the value is a valid type (string)
        if (typeof value !== 'string') {
            throw this._invalidTypeError
        }
    }

    /**
     * If the value is an empty string or undefined throws RequiredError or Error
     * @param error Optional Error class
     * @returns StringRule | never
     */
    required(error?: Error): never | this {
        if (!this._value) {
            throwOptionalOrDefaultError(new RequiredError('Value is required'), error)
        }
        return this
    }

    /**
     * If the value's length is fewer than given number throws MinimumLengthError or Error
     * @param min number - Minimum length
     * @param error Optional Error class
     * @returns StringRule | never
     */
    min(min: number, error?: Error): never | this {
        if (this._value.length < min) {
            throwOptionalOrDefaultError(
                new MinimumLengthError(`Value's character length can't be less than ${min}`), error)
        }
        return this
    }

    /**
     * If the value's length is more than given number throws MaximumLengthError or Error
     * @param max number - Maximum length
     * @param error Optional Error class
     * @returns StringRule | never
     */
    max(max: number, error?: Error): never | this {
        if (this._value.length > max) {
            throwOptionalOrDefaultError(
                new MaximumLengthError(`Value's character length can't be more than ${max}`), error)
        }
        return this
    }

    /**
     * If the value's length isn't equal exactly than given number throws LengthError or Error
     * @param length number - Length
     * @param error Optional Error class
     * @returns StringRule | never
     */
    length(length: number, error?: Error): never | this {
        if (this._value.length !== length) {
            throwOptionalOrDefaultError(
                new LengthError(`Value's character length must be exactly ${length} long`), error)
        }
        return this
    }

    /**
     * If the value's format isn't an email format throws InvalidEmailError or Error
     * @param error Optional Error class
     * @returns StringRule | never
     */
    email(error?: Error): never | this {
        // @ symbol control
        if (!this._value.includes('@')) {
            throwOptionalOrDefaultError(
                new InvalidEmailError('Value must contain the @ character'), error)
        }

        // Space control
        if (this._value.includes(' ')) {
            throwOptionalOrDefaultError(
                new InvalidEmailError('Value mustn\'t contain any whitespace characters.'), error)
        }

        const [username, domain] = this._value.split('@')

        // User name control
        if (!username) {
            throwOptionalOrDefaultError(
                new InvalidEmailError('Value must contain username'), error)
        }

        // Domain control
        if (!domain.includes('.')) {
            throwOptionalOrDefaultError(
                new InvalidEmailError('Value must contain a dot at domain'), error)
        }

        const [beforeDot, afterDot] = domain.split('.')

        if (!beforeDot || !afterDot) {
            throwOptionalOrDefaultError(
                new InvalidEmailError('Value must contain domain (like abc.com)'), error)
        }

        return this
    }

    /**
     * If the value doesn't start with given string throws StartsWithError or Error
     * @param str string - supposed to be at the begining
     * @param caseSensitive boolean - if wanted exact match it should be true
     * @param error Optional Error class
     * @returns StringRule | never
     */
    startsWith(str: string, caseSensitive: boolean = true, error?: Error): never | this {
        if ((caseSensitive == true && !this._value.startsWith(str)) ||
            (!caseSensitive && !this._value.toLowerCase().startsWith(str.toLowerCase()))) {
            throwOptionalOrDefaultError(
                new StartsWithError(
                    `Value must start with ${caseSensitive ? 'exactly' : ''} "${str}"`), error)
        }

        return this
    }

    /**
     * If the value doesn't start with given string throws StartsWithError or Error
     * @param str string - supposed to be at the begining
     * @param caseSensitive boolean - if wanted exact match it should be true
     * @param error Optional Error class
     * @returns StringRule | never
     */
    endsWith(str: string, caseSensitive: boolean = true, error?: Error): never | this {
        if ((caseSensitive == true && !this._value.endsWith(str)) ||
            (!caseSensitive && !this._value.toLowerCase().endsWith(str.toLowerCase()))) {
            throwOptionalOrDefaultError(
                new EndsWithError(
                    `Value must end with ${caseSensitive ? 'exactly' : ''} "${str}"`), error)
        }

        return this
    }

    /**
     * For regex validation. Throws error if the given pattern doesn't match.
     * @param pattern RegExp
     * @param error Error | undefined
     * @returns StringRule | never
     */
    regex(pattern: RegExp, error?: Error) : never | StringRule {
        if (!pattern.test(this._value)) {
            throwOptionalOrDefaultError(
                new RegexError('Value is not valid according to provided regex pattern'), error)
        }
        return this
    }

    toString(): string {
        return this._value.toString()
    }
}

/**
 * @class
 * Validation rule class for number values
 * Validations:
 * - type checking
 * - required
 * - min
 * - max
 * - equal
 * - custom
 */
export class NumberRule extends ValidationRule implements INumberRule {
    constructor(value: any, invalidTypeError?: InvalidTypeError) {
        super(value, invalidTypeError ?? new InvalidTypeError('Value must be a number'))

        // Check if the value is a valid type (number)
        if (typeof value !== 'number' || Number.isNaN(value)) {
            throw this._invalidTypeError
        }
    }

    /**
     * If the value is an NaN or undefined throws RequiredError or Error
     * @param error Optional Error class
     * @returns NumberRule | never
     */
    required(error?: Error): never | this {
        if (this._value !== 0 && !this._value) {
            throwOptionalOrDefaultError(new RequiredError('Value is required'), error)
        }
        return this
    }

    /**
    * If the value is fewer than given number throws MinNumberError or Error
    * @param min number - Minimum number
    * @param error Optional Error class
    * @returns NumberRule | never
    */
    min(min: number, error?: Error): never | this {
        if (this._value < min) {
            throwOptionalOrDefaultError(new MinNumberError(`Value can\'t be less than ${min}`), error)
        }
        return this
    }

    /**
    * If the value is more than given number throws MaxNumberError or Error
    * @param max number - Maximum number
    * @param error Optional Error class
    * @returns NumberRule | never
    */
    max(max: number, error?: Error): never | this {
        if (this._value > max) {
            throwOptionalOrDefaultError(new MaxNumberError(`Value can\'t be more than ${max}`), error)
        }
        return this
    }

    /**
    * If the value isn't equal to given number throws EqualNumberError or Error
    * @param max number - Maximum number
    * @param error Optional Error class
    * @returns NumberRule | never
    */
    equal(number: number, error?: Error): never | this {
        if (this._value !== number) {
            throwOptionalOrDefaultError(
                new EqualNumberError(`Value must be equal to ${number}`), error)
        }
        return this
    }

    toNumber(): number {
        return this._value
    }
}

/**
 * @class
 * Validation class. Takes a validation model then you can validate the fields in the model
 */
export class Validation {
    private _model: ValidationModel;

    constructor(model: ValidationModel) {
        this._model = model
    }

    /**
     * @property
     * Validates the class's model then returns {model field: {succes:boolean,error?:Error}}
     * @returns ValidationResult
     */
    validate() : ValidationResult {
        let result: ValidationResult = {}

        for (let m in this._model) {
            try {
                this._model[m]()
                result[m] = {
                    success: true,
                }
            } catch(err: any) {
                result[m] = {
                    success: false,
                    error: err
                }
            }
        }

        return result
    }
}
