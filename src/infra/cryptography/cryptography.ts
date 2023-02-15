import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography/index'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const valueHashed = await bcrypt.hash(value, this.salt)
    return valueHashed
  }
}
