import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adapterRoute = async (controller: Controller): Promise<any> => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = { body: req.body }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
