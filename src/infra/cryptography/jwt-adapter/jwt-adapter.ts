import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography'

export class JWTAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }
}
