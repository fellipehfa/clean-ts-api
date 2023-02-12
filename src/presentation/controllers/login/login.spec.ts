import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError, success, unauthorizedError } from '../../helper/http/http-helper'
import { LoginController } from './login'
import { Authentication, AuthModel, HttpRequest, Validation } from './login-protocols'

const makeAuthentication = (): Authentication => {
  class AuthenticationStup {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStup()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeFakeAuthentication = (): AuthModel => ({
  email: 'any_email@mail.com',
  token: 'any_token'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: LoginController
  authenticationStup: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStup = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authenticationStup, validationStub)
  return {
    sut,
    authenticationStup,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct value', async () => {
    const { sut, authenticationStup } = makeSut()
    const authSpy = jest.spyOn(authenticationStup, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStup } = makeSut()
    jest.spyOn(authenticationStup, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStup } = makeSut()
    jest.spyOn(authenticationStup, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorizedError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(success(makeFakeAuthentication()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
})
