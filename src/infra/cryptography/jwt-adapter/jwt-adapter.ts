import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography'

export class JWTAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }
}
