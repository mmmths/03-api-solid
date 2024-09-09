import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true, // encriptado pelo HTTPs
      sameSite: true, // somente utilizado pleo mesmo domínio
      httpOnly: true, // o cookie só vai poser ser acessado pleo backend da aplicação
    })
    .status(200)
    .send({
      token,
    });
}
