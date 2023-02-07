import { Express } from 'express'
import { bosyParser, cors, contType } from '../middlewares'

export default (app: Express): void => {
  app.use(bosyParser)
  app.use(cors)
  app.use(contType)
}
