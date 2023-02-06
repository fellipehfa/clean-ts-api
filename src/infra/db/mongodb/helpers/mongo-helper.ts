import { MongoClient, MongoClientOptions } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  MONGO_CLIENT_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URI, this.MONGO_CLIENT_OPTIONS as MongoClientOptions)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
