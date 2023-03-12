export default defineEventHandler(async (event) => {
  return prisma.academicYear.findMany();
});
