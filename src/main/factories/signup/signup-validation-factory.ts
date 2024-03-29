import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helper/validator'
import { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../adapters/validators/email/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
