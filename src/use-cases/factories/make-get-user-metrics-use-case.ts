import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrimsaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrimsaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
