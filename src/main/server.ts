import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.SERVER_PORT, () => console.log(`Server running at ${env.SERVER_HOST}:${env.SERVER_PORT}`))
  })
  .catch(console.error)
