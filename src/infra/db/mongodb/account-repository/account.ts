import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accoutnWithId = await accountCollection.findOne({ _id: result.insertedId })
    const { _id, ...accountWithoutId } = accoutnWithId
    const account = Object.assign({}, accountWithoutId as AccountModel, { id: _id })
    return account
  }
}
