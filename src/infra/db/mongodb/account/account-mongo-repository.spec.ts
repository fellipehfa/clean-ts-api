import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Mongo Account Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  test('Should return an account on method add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccount())
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on method loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccount())
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on method updateAccessToken success', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne(makeFakeAccount())
    const _id = result.insertedId
    const account = await accountCollection.findOne({ _id })
    expect(account.accessToken).toBeFalsy()
    await sut.updateAccessToken(_id.toString(), 'any_token')
    const accountUpdated = await accountCollection.findOne({ _id })
    expect(accountUpdated).toBeTruthy()
    expect(accountUpdated.accessToken).toBe('any_token')
  })
})
