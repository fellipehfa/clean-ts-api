import { InvalidRequestError } from '../errors/invalid-request-error'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidRequestError('unmatch passwords'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidRequestError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
