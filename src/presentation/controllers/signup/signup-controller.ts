import { badRequest, serverError, success } from '../../helper/http/http-helper'
import { AddAccount, Controller, HttpRequest, HttpResponse, Validation } from './signup-controller-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validator: Validation

  constructor (addAccount: AddAccount, validator: Validation) {
    this.addAccount = addAccount
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}