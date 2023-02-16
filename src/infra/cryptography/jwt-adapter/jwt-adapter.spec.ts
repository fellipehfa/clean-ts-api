import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography'
import { JWTAdapter } from './jwt-adapter'

const JWT_SECRET = 'secret'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): Encrypter => {
  return new JWTAdapter(JWT_SECRET)
}

describe('JWT Adapter', () => {
  test('Should call sing method of jwt with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, JWT_SECRET)
  })

  test('Should returns a sing method of jwt on success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throws if sing method of jwt throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
