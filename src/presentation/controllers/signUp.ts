import { HttpRequest, HttpResponse } from '../protocols/http'
import { InvalidRequestError } from '../errors/bad-request-error'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helper/http-helper'
import { Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return badRequest(new InvalidRequestError('unmatch passwords'))
    }
  }
}
