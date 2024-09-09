import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserserProfileUseCaseRequest {
  userId: string;
}

interface GetUserserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserserProfileUseCaseRequest): Promise<GetUserserProfileUseCaseResponse> {
    // buscar usuário no banco pelo e-mail
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user,
    };
  }
}
