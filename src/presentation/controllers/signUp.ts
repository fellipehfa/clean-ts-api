import { HttpRequest, HttpResponse } from '../protocols/http'
import { BadRequestError } from '../errors/bad-request-error'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helper/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password || !httpRequest.body.passwordConfirmation) {
      return badRequest(new MissingParamError('password'))
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return badRequest(new BadRequestError('unmatch passwords'))
    }
  }
}
