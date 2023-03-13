export default defineEventHandler(async (event) => {
  await readBody(event);

  await prisma.student.delete({
    where: {
      id: event.context.params?.id,
    },
  });

  return { message: "ok" };
});
