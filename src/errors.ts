/**
 * @abstract @class
 * For custom errors that includes code property
 * @get code: number
 */
export abstract class CustomError extends Error {
    abstract get code(): number

    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

export class ValidationError extends CustomError {
    get code(): number {
        return 100
    }
}

export class InvalidTypeError extends CustomError {
    get code(): number {
        return 200
    }
}

export class RequiredError extends CustomError {
    get code(): number {
        return 201
    }
}

// String errors starts from 300
export class MinimumLengthError extends CustomError {
    get code(): number {
        return 300
    }
}

export class MaximumLengthError extends CustomError {
    get code(): number {
        return 301
    }
}

export class LengthError extends CustomError {
    get code(): number {
        return 302
    }
}

export class InvalidEmailError extends CustomError {
    get code(): number {
        return 303
    }
}

export class StartsWithError extends CustomError {
    get code(): number {
        return 304
    }
}

export class EndsWithError extends CustomError {
    get code(): number {
        return 305
    }
}

export class RegexError extends CustomError {
    get code(): number {
        return 306
    }
}

// Number errors starts from 400
export class MinNumberError extends CustomError {
    get code(): number {
        return 400
    }
}

export class MaxNumberError extends CustomError {
    get code(): number {
        return 401
    }
}

export class EqualNumberError extends CustomError {
    get code(): number {
        return 402
    }
}