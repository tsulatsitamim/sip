export default defineEventHandler(async (event) => {
  const stage = await prisma.stage.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: stage };
});
