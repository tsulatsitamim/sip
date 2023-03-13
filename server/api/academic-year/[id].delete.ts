export default defineEventHandler(async (event) => {
  await readBody(event);

  await prisma.academicYear.delete({
    where: {
      id: event.context.params?.id,
    },
  });

  return { message: "ok" };
});
