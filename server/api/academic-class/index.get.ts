export default defineEventHandler(async (event) => {
  const academicClasses = await prisma.academicClass.findMany();

  return { data: academicClasses };
});
