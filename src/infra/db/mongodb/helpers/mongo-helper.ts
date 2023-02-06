import { MongoClient, Collection, InsertOneResult } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export const MongoHelper = {
  client: null as MongoClient,

  MONGO_CLIENT_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, this.MONGO_CLIENT_OPTIONS)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  createOne (accountData: AddAccountModel): InsertOneResult {
    return this.client.insertOne(accountData)
  }
}
