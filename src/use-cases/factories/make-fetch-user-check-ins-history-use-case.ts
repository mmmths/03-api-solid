import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrimsaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrimsaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
