export default defineEventHandler(async (event) => {
  const { academicYearId } = getQuery(event) as { academicYearId?: string };

  const academicClasses = await prisma.academicClass.findMany({
    where: academicYearId
      ? {
          academicYearId: academicYearId,
        }
      : {},
    include: { stage: true },
  });

  return { data: academicClasses };
});
