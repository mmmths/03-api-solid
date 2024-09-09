import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AutenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AutenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AutenticateUseCase(usersRepository);
  });
  it("should be able to Authenticate", async () => {
    await usersRepository.create({
      nome: "Mahteus veiga",
      email: "mveiga@exemple.com",
      password_hash: await hash("12356", 6),
    });

    const { user } = await sut.execute({
      email: "mveiga@exemple.com",
      password: "12356",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to Authenticate with wrong e-mail", async () => {
    await expect(() =>
      sut.execute({
        email: "mveiga@exemple.com",
        password: "12356",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to Authenticate with wrong password", async () => {
    await usersRepository.create({
      nome: "Mahteus veiga",
      email: "mveiga@exemple.com",
      password_hash: await hash("123234", 6),
    });

    await expect(() =>
      sut.execute({
        email: "mveiga@exemple.com",
        password: "12356",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
