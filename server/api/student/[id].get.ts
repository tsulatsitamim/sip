export default defineEventHandler(async (event) => {
  const student = await prisma.student.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: student };
});
