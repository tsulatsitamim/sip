import { Student } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { academicClassId } = getQuery(event) as { academicClassId: string };

  const students = (await prisma.student.findMany({
    orderBy: {
      name: "desc",
    },
    where:
      academicClassId === "all"
        ? {}
        : {
            StudentsOnAcademicClasses: {
              some: {
                academicClassId,
              },
            },
          },
  })) as SerializedDate<Student>[];

  return { data: students };
});
