import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}

describe('Required Fields Validation', () => {
  test('Should return a MissingParamError if Validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ inconsistent_field: 'any_data' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_data' })
    expect(error).toBeFalsy()
  })
})
