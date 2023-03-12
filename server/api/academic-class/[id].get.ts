export default defineEventHandler(async (event) => {
  const academicClass = await prisma.academicClass.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: academicClass };
});
