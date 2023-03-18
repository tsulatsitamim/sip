import omit from "lodash/omit";
import { hash } from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.update({
    where: {
      id: event.context.params?.id,
    },
    data: {
      ...omit(body, ["id", "password"]),
      ...(body.password ? { password: await hash(body.password, 10) } : {}),
    },
  });

  return { data: user };
});
