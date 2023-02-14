import { Collection } from 'mongodb'
import { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Error Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany()
  })

  const makeSut = (): LogErrorRepository => {
    return new LogMongoRepository()
  }

  test('Should create a log error on success', async () => {
    const sut = makeSut()
    await sut.logError('Error message')
    const error = await errorCollection.findOne()
    expect(error.stack).toEqual('Error message')
  })
})
