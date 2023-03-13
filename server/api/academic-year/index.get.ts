export default defineEventHandler(async (event) => {
  const academicYear = await prisma.academicYear.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return { data: academicYear };
});
