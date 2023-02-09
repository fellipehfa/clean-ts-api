import { AuthModel } from '../models/auth'
export interface AuthenticationModel {
  email: string
  password: string
}

export interface Auth {
  add: (authentication: AuthenticationModel) => Promise<AuthModel>
}
