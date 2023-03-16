import pick from "lodash/pick";

export default defineEventHandler(async (event) => {
  const { academicClassId } = getQuery(event) as { academicClassId: string };

  const students = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      nis: true,
      academicClasses: {
        where: {
          academicYear: {
            status: true,
          },
        },
      },
    },
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
                academicYear: {
                  status: true,
                },
              },
            },
          },
  });

  return {
    data: students.map((x) => ({
      ...pick(x, ["id", "name", "nis"]),
      className: x.academicClasses.length ? x.academicClasses[0].name : "",
    })),
  };
});
