import { StringRule, NumberRule, ValidationRule } from "../src/index"
import fs from "fs"
//import StringRule from "./dist"

type ValidationTestInput = {
    type: string | number,
    value: any,
    description: string,
    expected: any,
}
type ValidationTestOutput = ValidationTestInput & {
    result: any,
    passed: 'yes' | 'no',
    errorCode?: string,
    errorName?: string,
    errorDesc?: string
}
type TestFunction = (value: any) => never | ValidationRule
type TestGroup = {
    name: string,
    tests: {
        test: {
            data: ValidationTestInput,
            func: TestFunction
        }
    }[]
}

function validationTest(test: ValidationTestInput, func: TestFunction): ValidationTestOutput {
    let result: any
    let error: any

    try {
        func(test.value)
        result = true
    } catch (err: any) {
        result = false
        error = err
    }

    return {
        type: test.type,
        value: test.value,
        description: test.description,
        expected: test.expected,
        result: result,
        passed: result === test.expected ? 'yes' : 'no',
        errorCode: error?.code,
        errorName: error?.name,
        errorDesc: error?.message
    }
}

function groupResults(group: TestGroup): { group: string, results: ValidationTestOutput[] } {
    let results: ValidationTestOutput[] = []

    group.tests.forEach(tg => results.push(validationTest(tg.test.data, tg.test.func)))

    return {
        group: group.name,
        results: results
    }
}

function createHtmlTableString(data: ValidationTestOutput[]): string {
    const headers: string[] = [
        'Type',
        'Value',
        'Description',
        'Expected',
        'Result',
        'Passed',
        'Error Code',
        'Error Name',
        'Error Description'
    ]
    const content: string[][] = data.map(d => Object.values(d).map<string>(v => String(v)))

    let html = '<table><thead><tr>'

    headers.forEach(h => html += `<th>${h}</th>`)

    html += '</tr></thead><tbody>'

    content.forEach(r => {
        html += '<tr>'
        r.forEach((v, i) => {
            let td = v
            if (v === 'undefined' && i > 1) { td = '-' }
            if (v === 'yes' && i === 5) { td = '[✔]' }
            if (v === 'no' && i === 5) { td = '[X]' }
            html += `<td>${td}</td>`
        })
        html += "</tr>"
    })

    html += '</tbody></table>'

    return html
}

const tests: TestGroup[] = [
    {
        name: 'String type checking tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'number',
                        value: 32,
                        description: 'String type test',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'undefined',
                        value: undefined,
                        description: 'String type test',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'null',
                        value: null,
                        description: 'String type test',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'boolean',
                        value: false,
                        description: 'String type test',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'NaN',
                        value: NaN,
                        description: 'String type test',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'array',
                        value: ['a', 'b', 'c', 1, 2, 3],
                        description: 'String type test with an array',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                },
            },
        ]
    },
    {
        name: 'String basic tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'string',
                        value: '',
                        description: 'String required test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required()
                },
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc',
                        description: 'String required test',
                        expected: true
                    },
                    func: (value) => new StringRule(value).required()
                },
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc',
                        description: 'String min length test - min: 4',
                        expected: false
                    },
                    func: (value) => new StringRule(value).min(4)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcd',
                        description: 'String min length test - min: 4',
                        expected: true
                    },
                    func: (value) => new StringRule(value).min(4)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: '',
                        description: 'String min length test - min: 1',
                        expected: false
                    },
                    func: (value) => new StringRule(value).min(1)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcde',
                        description: 'String max length test - max: 4',
                        expected: false
                    },
                    func: (value) => new StringRule(value).max(4)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcd',
                        description: 'String max length test - max: 4',
                        expected: true
                    },
                    func: (value) => new StringRule(value).max(4)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc',
                        description: 'String max length test - max: 4',
                        expected: true
                    },
                    func: (value) => new StringRule(value).max(4)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcd',
                        description: 'String length test - length: 5',
                        expected: false
                    },
                    func: (value) => new StringRule(value).length(5)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcdef',
                        description: 'String length test - length: 5',
                        expected: false
                    },
                    func: (value) => new StringRule(value).length(5)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abcde',
                        description: 'String length test - length: 5',
                        expected: true
                    },
                    func: (value) => new StringRule(value).length(5)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc_HELLO',
                        description: 'String starts with test [exactly] - with: abc_',
                        expected: true
                    },
                    func: (value) => new StringRule(value).startsWith('abc_')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'xyztHELLO',
                        description: 'String starts with test [exactly] - with: abc_',
                        expected: false
                    },
                    func: (value) => new StringRule(value).startsWith('abc_')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'ABC_HELLO',
                        description: 'String starts with test [exactly] - with: abc_',
                        expected: false
                    },
                    func: (value) => new StringRule(value).startsWith('abc_')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'ABC_HELLO',
                        description: 'String starts with test [not exactly] - with: abc_',
                        expected: true
                    },
                    func: (value) => new StringRule(value).startsWith('abc_', false)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'Abc_HELLO',
                        description: 'String starts with test [not exactly] - with: abc_',
                        expected: true
                    },
                    func: (value) => new StringRule(value).startsWith('abc_', false)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'öÖçÇiİüÜ#+?=-HELLO',
                        description: 'String starts with test [exactly] - with: öÖçÇiİüÜ#+?=-',
                        expected: true
                    },
                    func: (value) => new StringRule(value).startsWith('öÖçÇiİüÜ#+?=-')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'öÖçÇiİüÜ#+?-HELLO',
                        description: 'String starts with test [not exactly] - with: ööççiiüü#+?=-',
                        expected: true
                    },
                    func: (value) => new StringRule(value).startsWith('ööççiİüü#+?-', false)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLO_guys',
                        description: 'String ends with test [exactly] - with: _guys',
                        expected: true
                    },
                    func: (value) => new StringRule(value).endsWith('_guys')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLOgirls',
                        description: 'String ends with test [exactly] - with: _guys',
                        expected: false
                    },
                    func: (value) => new StringRule(value).endsWith('_guys')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLO_GUYS',
                        description: 'String ends with test [exactly] - with: _guys',
                        expected: false
                    },
                    func: (value) => new StringRule(value).endsWith('_guys')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLO_GUYS',
                        description: 'String ends with test [not exactly] - with: _guys',
                        expected: true
                    },
                    func: (value) => new StringRule(value).endsWith('_guys', false)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLO_Guys',
                        description: 'String ends with test [not exactly] - with: _guys',
                        expected: true
                    },
                    func: (value) => new StringRule(value).endsWith('_guys', false)
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLOöÖçÇiİüÜ#+?=-',
                        description: 'String ends with test [exactly] - with: öÖçÇiİüÜ#+?=-',
                        expected: true
                    },
                    func: (value) => new StringRule(value).endsWith('öÖçÇiİüÜ#+?=-')
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'HELLOöÖçÇiİüÜ#+?-',
                        description: 'String ends with test [not exactly] - with: ööççiiüü#+?=-',
                        expected: true
                    },
                    func: (value) => new StringRule(value).endsWith('ööççiİüü#+?-', false)
                }
            },
        ]
    },
    {
        name: 'String email tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'string',
                        value: '',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'a',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc.com',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@.',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@.com',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz.',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'ab c@xy z. co m',
                        description: 'Email validation test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz.com',
                        description: 'Email validation test',
                        expected: true
                    },
                    func: (value) => new StringRule(value).email()
                }
            },
        ],
    },
    {
        name: 'String custom tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc',
                        description: 'Custom validation test - Must be a numeric character',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                        .custom((v) => Array.from('0123456789')
                        .map(i => v.includes(i)).some((i) => i === true),
                            new Error('Value must include a number'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'ab9c',
                        description: 'Custom validation test - Must be a numeric character',
                        expected: true
                    },
                    func: (value) => new StringRule(value)
                        .custom((v) => Array.from('0123456789')
                        .map(i => v.includes(i)).some((i) => i === true),
                            new Error('Value must include a number'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz.com',
                        description: 'Regex validation test - Email regex',
                        expected: true
                    },
                    func: (value) => new StringRule(value)
                        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            new Error('Email format is not valid'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc.com',
                        description: 'Regex validation test - Email regex',
                        expected: false
                    },
                    func: (value) => new StringRule(value)
                        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            new Error('Email format is not valid'))
                }
            }
        ]
    },
    {
        name: 'String rule chaining tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'a_bc@xyz.net',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: true
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'a_bc@xyz.com',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz.com',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'abc@xyz.comXXXXXXXXXO',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 'a@x.c',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: '',
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: 32,
                        description: 'Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test',
                        expected: false
                    },
                    func: (value) => new StringRule(value).required().min(11).max(20)
                        .email().custom(v => v.includes('_'), new Error('Must include _'))
                        .regex(/net$/, new Error('Must end with net'))
                }
            },
        ]
    },
    {
        name: 'Number type checking tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'number',
                        value: -32,
                        description: 'Number type test - negative',
                        expected: true
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 32,
                        description: 'Number type test - positive',
                        expected: true
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 32.55,
                        description: 'Number type test float',
                        expected: true
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'string',
                        value: '32',
                        description: 'Number type test - string',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'undefined',
                        value: undefined,
                        description: 'Number type test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'null',
                        value: null,
                        description: 'Number type test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'boolean',
                        value: false,
                        description: 'Number type test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'NaN',
                        value: NaN,
                        description: 'Number type test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
            {
                test: {
                    data: {
                        type: 'array',
                        value: ['a', 'b', 'c', 1, 2, 3],
                        description: 'Number type test with an array',
                        expected: false
                    },
                    func: (value) => new NumberRule(value)
                },
            },
        ]
    },
    {
        name: 'Number tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'undefined',
                        value: undefined,
                        description: 'Number required test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).required(),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 32,
                        description: 'Number required test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).required(),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 32,
                        description: 'Number min value test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).min(40),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40,
                        description: 'Number min value test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).min(40),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40,
                        description: 'Number min value test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).min(40.75),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40.75,
                        description: 'Number min value test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).min(40.75),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 45,
                        description: 'Number max value test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).max(40),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40,
                        description: 'Number max value test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).max(40),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 41,
                        description: 'Number max value test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).max(40.75),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40.75,
                        description: 'Number max value test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).max(40.75),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 8.75,
                        description: 'Number equal value test',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).equal(8),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 8,
                        description: 'Number equal value test',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).equal(8),
                }
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40/5,
                        description: 'Number equal value test - 40/5=8?',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).equal(8),
                }
            },
        ]
    },
    {
        name: 'Custom number tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'number',
                        value: 30,
                        description: 'Number custom test 100/4=25?',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).custom(v => 100/4 === v,
                        new Error('Value must be 1/4 of 100')
                    ),
                }
            },
        ]
    },
    {
        name: 'Number rule chaining tests',
        tests: [
            {
                test: {
                    data: {
                        type: 'number',
                        value: 50,
                        description: 'Number chain rules: required, min(25), max(50), equal(50), custom(100/2)',
                        expected: true
                    },
                    func: (value) => new NumberRule(value).required().min(25).max(50).equal(50)
                        .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 40,
                        description: 'Number chain rules: required, min(25), max(50), equal(50), custom(100/2)',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).required().min(25).max(50).equal(50)
                        .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 20,
                        description: 'Number chain rules: required, min(25), max(50), equal(50), custom(100/2)',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).required().min(25).max(50).equal(50)
                        .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: 70,
                        description: 'Number chain rules: required, min(25), max(50), equal(50), custom(100/2)',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).required().min(25).max(50).equal(50)
                        .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
                },
            },
            {
                test: {
                    data: {
                        type: 'number',
                        value: undefined,
                        description: 'Number chain rules: required, min(25), max(50), equal(50), custom(100/2)',
                        expected: false
                    },
                    func: (value) => new NumberRule(value).required().min(25).max(50).equal(50)
                        .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
                },
            },
        ]
    }
]

var output = '<html><head><style>table, th, td {border: 1px solid black;padding: .5rem;'
output += 'border-collapse: collapse;}tr:hover{background-color: grey;}</style>'
output += '<title>Validation Tests</title></head><body>'
output += '<h1>Validation Tests</h1>'

tests.forEach(gr => {
    const isPassed = !groupResults(gr).results.some(r => r.passed === "no")
    output += `<h2>${gr.name} - ${isPassed ? '[✔]' : '[X]'} - ${gr.tests.length} test</h2>`
    output += createHtmlTableString(groupResults(gr).results)
})

output += '</body></html>'

fs.writeFile('./test/log.html', output, err => {
    if (err) {
        console.error('Logging error!')
    } else {
        console.info('Logging success!')
    }
})