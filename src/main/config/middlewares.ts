import { Express } from 'express'
import { bodyParser, contType, cors } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contType)
}
