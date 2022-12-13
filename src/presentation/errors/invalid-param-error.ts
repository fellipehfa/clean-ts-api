export class InvalidParamError extends Error {
  constructor (errorName: string) {
    super(`Invalid param: ${errorName}`)
    this.name = 'InvalidParamError'
  }
}
