export default defineEventHandler(async (event) => {
  const students = await prisma.student.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return { data: students };
});
