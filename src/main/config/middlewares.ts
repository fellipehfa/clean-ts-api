import { Express } from 'express'
import { bosyParser } from '../middlewares/body-parser'
import { contType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bosyParser)
  app.use(cors)
  app.use(contType)
}
