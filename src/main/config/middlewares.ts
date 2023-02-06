import { Express } from 'express'
import { bosyParser } from '../middlewares/body-parser'

export default (app: Express): void => {
  app.use(bosyParser)
}
