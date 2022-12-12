export class InvalidRequestError extends Error {
  constructor (errorName: string) {
    super(`Invalid param: ${errorName}`)
    this.name = 'InvalidRequestError'
  }
}
