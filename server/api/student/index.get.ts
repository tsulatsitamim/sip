export default defineEventHandler(async (event) => {
  const { academicClassId } = getQuery(event) as { academicClassId: string };

  const students = await prisma.student.findMany({
    orderBy: {
      name: "desc",
    },
    where:
      academicClassId === "all"
        ? {}
        : {
            academicClasses: {
              some: {
                id: academicClassId,
              },
            },
          },
  });

  return { data: students.map((x) => serializeDate(x)) };
});
