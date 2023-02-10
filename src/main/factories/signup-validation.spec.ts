import { CompareFieldValidation } from '../../presentation/helper/validator/compare-field-validation'
import { RequiredFieldValidation } from '../../presentation/helper/validator/required-field-validation'
import { Validation } from '../../presentation/helper/validator/validation'
import { ValidationComposite } from '../../presentation/helper/validator/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helper/validator/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
