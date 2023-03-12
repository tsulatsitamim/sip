export default defineEventHandler(async (event) => {
  const academicYear = await prisma.academicYear.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  });

  return { data: academicYear };
});
