import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExitsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("should be able to register", async () => {
    const { user } = await sut.execute({
      nome: "Matheus Veiga",
      email: "mveiga@exemple.com",
      password: "12356",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      nome: "Matheus Veiga",
      email: "mveiga@exemple.com",
      password: "12356",
    });
    const isPasswordCorrectlyHashed = await compare(
      "12356",
      user.password_hash,
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same e-mail twice", async () => {
    const email = "mveiga@exemple.com";

    await sut.execute({
      nome: "Matheus Veiga",
      email,
      password: "12356",
    });

    await expect(() =>
      sut.execute({
        nome: "Matheus Veiga",
        email,
        password: "12356",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExitsError);
  });
});
