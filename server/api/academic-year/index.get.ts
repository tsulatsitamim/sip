export default defineEventHandler(async (event) => {
  const academicYear = await prisma.academicYear.findMany();

  return { data: academicYear };
});
