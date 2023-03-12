export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.academicYear.delete({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: "ok" };
});
