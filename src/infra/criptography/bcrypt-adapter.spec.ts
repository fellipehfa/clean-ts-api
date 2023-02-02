import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const SALT = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bceypt Adapter', () => {
  test('Shoeld call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Shoeld returns a hash on success', async () => {
    const sut = new BcryptAdapter(SALT)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
