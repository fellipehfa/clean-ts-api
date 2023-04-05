import { Router } from 'express'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'

export default async (router: Router): Promise<void> => {
  router.post('/signup', await adapterRoute(makeSignUpController()))
  // router.post('/login', await adapterRoute(makeLoginUpController()))
}
