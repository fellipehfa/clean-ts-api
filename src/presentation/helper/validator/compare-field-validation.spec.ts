import { InvalidParamError } from '../../errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('Compare Fields Validation', () => {
  test('Should return a InvalidParamError if Validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_data',
      fieldToCompare: 'wrong_data'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_data',
      fieldToCompare: 'any_data'
    })
    expect(error).toBeFalsy()
  })
})
