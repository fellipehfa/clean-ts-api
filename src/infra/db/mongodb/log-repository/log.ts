import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    const result = await errorCollection.insertOne({
      stack,
      date: new Date()
    })
    const error = await errorCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(error)
  }
}
