export class InvalidRequestError extends Error {
  constructor (errorName: string) {
    super(`Bad request: ${errorName}`)
    this.name = 'InvalidRequestError'
  }
}
