import { EmailValidation } from '../../../presentation/helper/validator/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helper/validator/required-field-validation'
import { Validation } from '../../../presentation/helper/validator/validation'
import { ValidationComposite } from '../../../presentation/helper/validator/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
