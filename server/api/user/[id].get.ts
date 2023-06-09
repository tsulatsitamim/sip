import omit from "lodash/omit.js";

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: omit(user, ["password"]) };
});
