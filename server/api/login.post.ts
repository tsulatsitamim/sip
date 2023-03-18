import bcrypt from "bcrypt";
import pick from "lodash/pick";
import jwt from "jsonwebtoken";

const invalidResponse = {
  statusCode: 401,
  statusMessage: "Invalid username or password",
};

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    return createError(invalidResponse);
  }

  if (await bcrypt.compare(password, user.password)) {
    return jwt.sign(pick(user, ["id", "name"]), useRuntimeConfig().jwtKey, {
      expiresIn: "7d",
    });
  }

  return createError(invalidResponse);
});
