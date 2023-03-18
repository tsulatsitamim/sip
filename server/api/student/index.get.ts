import pick from "lodash/pick.js";

export default defineEventHandler(async (event) => {
  const { academicClassId, academicYearId } = getQuery(event) as {
    academicClassId: string;
    academicYearId: string;
  };

  const students = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      nis: true,
      academicClasses: {
        where: {
          academicYear: {
            id: academicYearId,
          },
          id: academicClassId === "all" ? undefined : academicClassId,
        },
      },
    },
    orderBy: {
      name: "desc",
    },
    where:
      academicClassId === "all"
        ? {
            academicClasses:
              academicYearId === "noclass"
                ? {
                    none: {},
                  }
                : {
                    some: {
                      academicYear: {
                        id: academicYearId,
                      },
                    },
                  },
          }
        : {
            academicClasses: {
              some: {
                id: academicClassId,
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
