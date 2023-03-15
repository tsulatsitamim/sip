import { Student, StudentsOnAcademicClasses } from "@prisma/client";
import { serializeDate } from "~~/server/utils/serializeDate";
import { pick } from "~~/utils/pick";

export default defineEventHandler(async (event) => {
  const student = await prisma.student.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
    include: {
      StudentsOnAcademicClasses: {
        include: { academicClass: { include: { academicYear: true } } },
        orderBy: {
          academicClass: {
            academicYear: {
              name: "desc",
            },
          },
        },
      },
    },
  });

  const academicClasses = student.StudentsOnAcademicClasses.map((x) => ({
    id: x.academicClassId,
    name: x.academicClass.name,
    year: x.academicClass.academicYear.name,
    status: x.academicClass.academicYear.status,
  }));

  return {
    data: {
      ...serializeDate(student),
      academicClasses,
    },
  };
});
