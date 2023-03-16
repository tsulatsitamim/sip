export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const stage = await prisma.stage.update({
    where: {
      id: event.context.params?.id,
    },
    data: body,
  });

  return { data: stage };
});
