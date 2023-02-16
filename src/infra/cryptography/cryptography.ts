import bcrypt from 'bcrypt'
import { HashCompare, Hasher } from '../../data/protocols/cryptography/index'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const valueHashed = await bcrypt.hash(value, this.salt)
    return valueHashed
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isCompatible = await bcrypt.compare(value, hash)
    return isCompatible
  }
}
