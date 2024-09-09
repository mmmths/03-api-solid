import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExitsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { nome, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      nome,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExitsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
    // return reply.status(500).send(); // TODO: fix me
  }

  return reply.status(201).send();
}
