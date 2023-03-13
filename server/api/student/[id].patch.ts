export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const student = await prisma.student.update({
    where: {
      id: event.context.params?.id,
    },
    data: body,
  });

  return { data: student };
});
