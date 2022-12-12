export class BadRequestError extends Error {
  constructor (errorName: string) {
    super(`Bad request: ${errorName}`)
    this.name = 'BadRequestError'
  }
}
