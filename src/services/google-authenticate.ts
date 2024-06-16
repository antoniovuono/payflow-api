import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'

interface GoogleAuthenticateServiceRequest {
  name: string
  email: string
}

interface GoogleAuthenticateServiceResponse {
  user: User | null
}

export class GoogleAuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
  }: GoogleAuthenticateServiceRequest): Promise<GoogleAuthenticateServiceResponse> {
    const userAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if (!userAlreadyRegistered) {
      const createdUser = await this.usersRepository.create({
        name,
        email,
      })

      return { user: createdUser }
    }

    return { user: userAlreadyRegistered }
  }
}
