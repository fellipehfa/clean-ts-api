import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Compare Fields Validation', () => {
  test('Should return a MissingParamError if Validation fails', () => {
    const sut = new RequiredFieldValidation('inconsistent_field')
    const error = sut.validate({ any_field: 'any_data' })
    expect(error).toEqual(new MissingParamError('inconsistent_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ any_field: 'any_data' })
    expect(error).toBeFalsy()
  })
})
