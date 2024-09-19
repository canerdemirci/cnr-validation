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
