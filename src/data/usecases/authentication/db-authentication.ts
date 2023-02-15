import { Authentication, AuthenticationModel, HashCompare, LoadAccountByEmailRepository, TokenGenerate } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompare: HashCompare
  private readonly tokenGenerate: TokenGenerate

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashCompare: HashCompare,
    tokenGenerate: TokenGenerate
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.tokenGenerate = tokenGenerate
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isCompatible = await this.hashCompare.compare(authentication.password, account.password)
      if (isCompatible) {
        const token = await this.tokenGenerate.generate(account.id)
        return token
      }
    }
    return null
  }
}
