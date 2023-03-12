export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicClass = await prisma.academicClass.update({
    where: {
      id: event.context.params?.id,
    },
    data: body,
  });

  return { data: academicClass };
});
