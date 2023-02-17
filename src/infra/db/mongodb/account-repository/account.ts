import { ObjectId } from 'mongodb'
import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../../../../data/protocols/db'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, accessToken: string): Promise<Object> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { accessToken } })
    const account = await accountCollection.findOne({ _id: result.upsertedId })
    return account
  }
}
