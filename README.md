# cnr-validation

> About
A typescript node package for using chainable validation rules.

[![NPM](https://img.shields.io/npm/v/cnr-validation.svg)](https://www.npmjs.com/package/cnr-validation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![cover](https://github.com/canerdemirci/cnr-validation/blob/main/cnr-validation.png)

## Install

```bash
npm install --save cnr-validation
```

## Usage
[a link](https://github.com/canerdemirci/cnr-validation/blob/main/test/test.ts)

```typescript
import { StringRule, NumberRule, ValidationRule } from "../src/index"

new StringRule(value)
    .required().min(11).max(20)
    .email().custom(v => v.includes('_'), new Error('Must include _'))
    .regex(/net$/, new Error('Must end with net'))

new NumberRule(value)
    .required().min(25).max(50).equal(50)
    .custom(v => 100/2 === value, new Error('Must be 1/2 of 100'))
```

## License

MIT © [canerdemirci](https://github.com/canerdemirci)

# Test
- npm run test

# Example Test Results
<html><head><style>table, th, td {border: 1px solid black;padding: .5rem;border-collapse: collapse;}tr:hover{background-color: grey;}</style><title>Validation Tests</title></head><body><h1>Validation Tests</h1><h2>String type checking tests - [✔] - 6 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>number</td><td>32</td><td>String type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr><tr><td>undefined</td><td>undefined</td><td>String type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr><tr><td>null</td><td>null</td><td>String type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr><tr><td>boolean</td><td>false</td><td>String type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr><tr><td>NaN</td><td>NaN</td><td>String type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr><tr><td>array</td><td>a,b,c,1,2,3</td><td>String type test with an array</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr></tbody></table><h2>String basic tests - [✔] - 25 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>string</td><td></td><td>String required test</td><td>false</td><td>false</td><td>[✔]</td><td>201</td><td>RequiredError</td><td>Value is required</td></tr><tr><td>string</td><td>abc</td><td>String required test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abc</td><td>String min length test - min: 4</td><td>false</td><td>false</td><td>[✔]</td><td>300</td><td>MinimumLengthError</td><td>Value's character length can't be less than 4</td></tr><tr><td>string</td><td>abcd</td><td>String min length test - min: 4</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td></td><td>String min length test - min: 1</td><td>false</td><td>false</td><td>[✔]</td><td>300</td><td>MinimumLengthError</td><td>Value's character length can't be less than 1</td></tr><tr><td>string</td><td>abcde</td><td>String max length test - max: 4</td><td>false</td><td>false</td><td>[✔]</td><td>301</td><td>MaximumLengthError</td><td>Value's character length can't be more than 4</td></tr><tr><td>string</td><td>abcd</td><td>String max length test - max: 4</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abc</td><td>String max length test - max: 4</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abcd</td><td>String length test - length: 5</td><td>false</td><td>false</td><td>[✔]</td><td>302</td><td>LengthError</td><td>Value's character length must be exactly 5 long</td></tr><tr><td>string</td><td>abcdef</td><td>String length test - length: 5</td><td>false</td><td>false</td><td>[✔]</td><td>302</td><td>LengthError</td><td>Value's character length must be exactly 5 long</td></tr><tr><td>string</td><td>abcde</td><td>String length test - length: 5</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abc_HELLO</td><td>String starts with test [exactly] - with: abc_</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>xyztHELLO</td><td>String starts with test [exactly] - with: abc_</td><td>false</td><td>false</td><td>[✔]</td><td>304</td><td>StartsWithError</td><td>Value must start with exactly abc_</td></tr><tr><td>string</td><td>ABC_HELLO</td><td>String starts with test [exactly] - with: abc_</td><td>false</td><td>false</td><td>[✔]</td><td>304</td><td>StartsWithError</td><td>Value must start with exactly abc_</td></tr><tr><td>string</td><td>ABC_HELLO</td><td>String starts with test [not exactly] - with: abc_</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>Abc_HELLO</td><td>String starts with test [not exactly] - with: abc_</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>öÖçÇiİüÜ#+?=-HELLO</td><td>String starts with test [exactly] - with: öÖçÇiİüÜ#+?=-</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>öÖçÇiİüÜ#+?-HELLO</td><td>String starts with test [not exactly] - with: ööççiiüü#+?=-</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>HELLO_guys</td><td>String ends with test [exactly] - with: _guys</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>HELLOgirls</td><td>String ends with test [exactly] - with: _guys</td><td>false</td><td>false</td><td>[✔]</td><td>305</td><td>EndsWithError</td><td>Value must end with exactly _guys</td></tr><tr><td>string</td><td>HELLO_GUYS</td><td>String ends with test [exactly] - with: _guys</td><td>false</td><td>false</td><td>[✔]</td><td>305</td><td>EndsWithError</td><td>Value must end with exactly _guys</td></tr><tr><td>string</td><td>HELLO_GUYS</td><td>String ends with test [not exactly] - with: _guys</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>HELLO_Guys</td><td>String ends with test [not exactly] - with: _guys</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>HELLOöÖçÇiİüÜ#+?=-</td><td>String ends with test [exactly] - with: öÖçÇiİüÜ#+?=-</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>HELLOöÖçÇiİüÜ#+?-</td><td>String ends with test [not exactly] - with: ööççiiüü#+?=-</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>String email tests - [✔] - 10 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>string</td><td></td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain the @ character</td></tr><tr><td>string</td><td>a</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain the @ character</td></tr><tr><td>string</td><td>abc.com</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain the @ character</td></tr><tr><td>string</td><td>abc@</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain a dot at domain</td></tr><tr><td>string</td><td>abc@.</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain domain (like abc.com)</td></tr><tr><td>string</td><td>abc@.com</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain domain (like abc.com)</td></tr><tr><td>string</td><td>abc@xyz</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain a dot at domain</td></tr><tr><td>string</td><td>abc@xyz.</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value must contain domain (like abc.com)</td></tr><tr><td>string</td><td>ab c@xy z. co m</td><td>Email validation test</td><td>false</td><td>false</td><td>[✔]</td><td>303</td><td>InvalidEmailError</td><td>Value mustn't contain any whitespace characters.</td></tr><tr><td>string</td><td>abc@xyz.com</td><td>Email validation test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>String custom tests - [✔] - 4 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>string</td><td>abc</td><td>Custom validation test - Must be a numeric character</td><td>false</td><td>false</td><td>[✔]</td><td>-</td><td>Error</td><td>Value must include a number</td></tr><tr><td>string</td><td>ab9c</td><td>Custom validation test - Must be a numeric character</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abc@xyz.com</td><td>Regex validation test - Email regex</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>abc.com</td><td>Regex validation test - Email regex</td><td>false</td><td>false</td><td>[✔]</td><td>-</td><td>Error</td><td>Email format is not valid</td></tr></tbody></table><h2>String rule chaining tests - [✔] - 7 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>string</td><td>a_bc@xyz.net</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>a_bc@xyz.com</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>-</td><td>Error</td><td>Must end with net</td></tr><tr><td>string</td><td>abc@xyz.com</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>-</td><td>Error</td><td>Must include _</td></tr><tr><td>string</td><td>abc@xyz.comXXXXXXXXXO</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>301</td><td>MaximumLengthError</td><td>Value's character length can't be more than 20</td></tr><tr><td>string</td><td>a@x.c</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>300</td><td>MinimumLengthError</td><td>Value's character length can't be less than 11</td></tr><tr><td>string</td><td></td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>201</td><td>RequiredError</td><td>Value is required</td></tr><tr><td>string</td><td>32</td><td>Chaining-1 required-min-max-email-custom (Must include _)-regex (Must end with net) test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a string</td></tr></tbody></table><h2>Number type checking tests - [✔] - 9 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>number</td><td>-32</td><td>Number type test - negative</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>32</td><td>Number type test - positive</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>32.55</td><td>Number type test float</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>string</td><td>32</td><td>Number type test - string</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>undefined</td><td>undefined</td><td>Number type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>null</td><td>null</td><td>Number type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>boolean</td><td>false</td><td>Number type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>NaN</td><td>NaN</td><td>Number type test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>array</td><td>a,b,c,1,2,3</td><td>Number type test with an array</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr></tbody></table><h2>Number tests - [✔] - 13 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>undefined</td><td>undefined</td><td>Number required test</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr><tr><td>number</td><td>32</td><td>Number required test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>32</td><td>Number min value test</td><td>false</td><td>false</td><td>[✔]</td><td>400</td><td>MinNumberError</td><td>Value can't be less than 40</td></tr><tr><td>number</td><td>40</td><td>Number min value test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>40</td><td>Number min value test</td><td>false</td><td>false</td><td>[✔]</td><td>400</td><td>MinNumberError</td><td>Value can't be less than 40.75</td></tr><tr><td>number</td><td>40.75</td><td>Number min value test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>45</td><td>Number max value test</td><td>false</td><td>false</td><td>[✔]</td><td>401</td><td>MaxNumberError</td><td>Value can't be more than 40</td></tr><tr><td>number</td><td>40</td><td>Number max value test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>41</td><td>Number max value test</td><td>false</td><td>false</td><td>[✔]</td><td>401</td><td>MaxNumberError</td><td>Value can't be more than 40.75</td></tr><tr><td>number</td><td>40.75</td><td>Number max value test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>8.75</td><td>Number equal value test</td><td>false</td><td>false</td><td>[✔]</td><td>402</td><td>EqualNumberError</td><td>Value must be equal to 8</td></tr><tr><td>number</td><td>8</td><td>Number equal value test</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>8</td><td>Number equal value test - 40/5=8?</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>Custom number tests - [✔] - 1 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>number</td><td>30</td><td>Number custom test 100/4=25?</td><td>false</td><td>false</td><td>[✔]</td><td>-</td><td>Error</td><td>Value must be 1/4 of 100</td></tr></tbody></table><h2>Number rule chaining tests - [✔] - 5 test</h2><table><thead><tr><th>Type</th><th>Value</th><th>Description</th><th>Expected</th><th>Result</th><th>Passed</th><th>Error Code</th><th>Error Name</th><th>Error Description</th></tr></thead><tbody><tr><td>number</td><td>50</td><td>Number chain rules: required, min(25), max(50), equal(50), custom(100/2)</td><td>true</td><td>true</td><td>[✔]</td><td>-</td><td>-</td><td>-</td></tr><tr><td>number</td><td>40</td><td>Number chain rules: required, min(25), max(50), equal(50), custom(100/2)</td><td>false</td><td>false</td><td>[✔]</td><td>402</td><td>EqualNumberError</td><td>Value must be equal to 50</td></tr><tr><td>number</td><td>20</td><td>Number chain rules: required, min(25), max(50), equal(50), custom(100/2)</td><td>false</td><td>false</td><td>[✔]</td><td>400</td><td>MinNumberError</td><td>Value can't be less than 25</td></tr><tr><td>number</td><td>70</td><td>Number chain rules: required, min(25), max(50), equal(50), custom(100/2)</td><td>false</td><td>false</td><td>[✔]</td><td>401</td><td>MaxNumberError</td><td>Value can't be more than 50</td></tr><tr><td>number</td><td>undefined</td><td>Number chain rules: required, min(25), max(50), equal(50), custom(100/2)</td><td>false</td><td>false</td><td>[✔]</td><td>200</td><td>InvalidTypeError</td><td>Value must be a number</td></tr></tbody></table><!-- Code injected by live-server -->
</body></html>

# Example (React)
```typescript
import { useEffect, useState } from 'react'
import { NumberRule, StringRule, Validation, ValidationModel, ValidationResult } from '../../src'
import './App.css'
import { RiErrorWarningFill } from 'react-icons/ri'

function App() {
  const validationModel: ValidationModel = {
    name: () => new StringRule(name).required().min(5).max(10).endsWith('er'),
    age: () => new NumberRule(age).required().min(18).max(120),
    email: () => new StringRule(email).required().email(),
    bio: () => new StringRule(bio).max(100)
  }

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number>(18)
  const [email, setEmail] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [validationResult, setValidationResult] = useState<ValidationResult>(validate())

  useEffect(() => {
    setValidationResult(validate())
  }, [name, age, email, bio])

  function validate(): ValidationResult {
    return new Validation(validationModel).validate()
  }

  function handleFormSubmit(e: any) {
    e.preventDefault()

    for (let r in validationResult) {
      if (!validationResult[r].success) {
        alert('Form is not valid\n' + JSON.stringify({
          name: validationResult.name?.error?.message,
          age: validationResult.age?.error?.message,
          email: validationResult.email?.error?.message,
          bio: validationResult.bio?.error?.message,
        }))
        return
      }
    }

    alert('Form is valid\n' + JSON.stringify({
      name: name,
      age: age,
      email: email,
      bio: bio,
    }))
  }

  return (
    <div className="main-container">
      <header>
        <h2>VALIDATION TEST FORM</h2>
      </header>
      <form className="example-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <div>
            <label htmlFor="name">Name</label>
            <div
              className="input-error-message"
              style={{ display: validationResult.name?.error?.message ? 'flex' : 'none' }}
            >
              <span>{validationResult.name?.error?.message}</span>
              <RiErrorWarningFill />
            </div>
          </div>
          <input type="text" name="name" id="name" value={name}
            onChange={(e: any) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="age">Age</label>
            <div
              className="input-error-message"
              style={{ display: validationResult.age?.error?.message ? 'flex' : 'none' }}
            >
              <span>{validationResult.age?.error?.message}</span>
              <RiErrorWarningFill />
            </div>
          </div>
          <input type="number" name="age" id="age" value={age}
            onChange={(e: any) => setAge(parseInt(e.target.value))} />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="email">Email</label>
            <div
              className="input-error-message"
              style={{ display: validationResult.email?.error?.message ? 'flex' : 'none' }}
            >
              <span>{validationResult.email?.error?.message}</span>
              <RiErrorWarningFill />
            </div>
          </div>
          <input type="text" name="email" id="email" value={email}
            onChange={(e: any) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="bio">Bio</label>
            <div
              className="input-error-message"
              style={{ display: validationResult.bio?.error?.message ? 'flex' : 'none' }}
            >
              <span>{validationResult.bio?.error?.message}</span>
              <RiErrorWarningFill />
            </div>
          </div>
          <textarea name="bio" id="bio" value={bio} rows={4}
            onChange={(e: any) => setBio(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
```