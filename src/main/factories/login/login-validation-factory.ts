import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helper/validator'
import { Validation } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../adapters/validators/email/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
