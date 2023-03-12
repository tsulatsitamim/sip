export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicYear = await prisma.academicYear.update({
    where: {
      id: event.context.params?.id,
    },
    data: body,
  });

  return { data: body };
});
