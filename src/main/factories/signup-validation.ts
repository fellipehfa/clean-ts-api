import { CompareFieldValidation } from '../../presentation/helper/validator/compare-field-validation'
import { EmailValidation } from '../../presentation/helper/validator/email-validation'
import { RequiredFieldValidation } from '../../presentation/helper/validator/required-field-validation'
import { Validation } from '../../presentation/helper/validator/validation'
import { ValidationComposite } from '../../presentation/helper/validator/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
