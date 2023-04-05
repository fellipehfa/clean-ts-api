import bcrypt from 'bcrypt'
import { HashCompare, Hasher } from '../../../data/protocols/cryptography'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const valueHashed = await bcrypt.hash(value, this.salt)
    return valueHashed
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isCompatible = await bcrypt.compare(value, hash)
    return isCompatible
  }
}
