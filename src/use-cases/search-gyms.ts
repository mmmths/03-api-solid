import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gym-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}
interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

// SOLID
// D - Dependency Inversion Principle
export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);
    return { gyms };
  }
}
