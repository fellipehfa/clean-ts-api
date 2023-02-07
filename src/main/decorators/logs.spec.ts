import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './logs'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        email: 'fellipehf@gmail.com',
        name: 'Fellipe'
      }
    }
    return await new Promise(resolve => resolve(httpResponse))
  }
}

const makeController = (): Controller => {
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: ControllerStub
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: 'fellipehf@gmail.com',
        name: 'Fellipe',
        password: '123',
        passwordConfirmation: '123'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return controller with correct values', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'fellipehf@gmail.com',
        name: 'Fellipe',
        password: '123',
        passwordConfirmation: '123'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        email: 'fellipehf@gmail.com',
        name: 'Fellipe'
      }
    })
  })
})
