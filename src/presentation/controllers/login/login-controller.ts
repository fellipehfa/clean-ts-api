import { badRequest, serverError, success, unauthorizedError } from '../../helper/http/http-helper'
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validator: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorizedError()
      return success(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
