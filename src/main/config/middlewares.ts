import { Express } from 'express'
import { bosyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bosyParser)
  app.use(cors)
}
