import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup'

export default async (router: Router): Promise<void> => {
  router.post('/signup', await adapterRoute(makeSignUpController()))
}
