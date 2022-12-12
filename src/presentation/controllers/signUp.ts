import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    if (!httpRequest.body.password || !httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new Error('Missing param: password')
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new Error('Bad request: unmatch passwords')
      }
    }
  }
}
