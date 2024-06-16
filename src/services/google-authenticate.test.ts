import { GoogleAuthenticateService } from './google-authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let googleAuthenticateService: GoogleAuthenticateService

describe('Google Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    googleAuthenticateService = new GoogleAuthenticateService(usersRepository)
  })

  it('should be able a create a account if the user does not exists', async () => {
    const { user } = await googleAuthenticateService.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
    })

    expect(user?.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate a user with google account', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
    })

    const { user } = await googleAuthenticateService.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
    })

    expect(user?.id).toEqual(expect.any(String))
  })
})
