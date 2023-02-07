import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  MONGO_CLIENT_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, this.MONGO_CLIENT_OPTIONS)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) this.client = await MongoClient.connect(this.url)
    return this.client.db().collection(name)
  },

  map (collectionDataWithId: any): any {
    const { _id, ...collectionDataWithoutId } = collectionDataWithId
    const account = Object.assign({}, collectionDataWithoutId, { id: _id })
    return account
  }
}
