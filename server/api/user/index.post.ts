import { hash } from "bcrypt";
import omit from "lodash/omit.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.create({
    data: {
      ...(omit(body, ["id", "password"]) as {
        id: string;
        name: string;
        username: string;
      }),
      password: await hash(body.password, 10),
    },
  });

  return { data: user };
});
