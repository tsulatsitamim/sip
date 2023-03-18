import omit from "lodash/omit.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicClassIds = body.academicClassIds.map((x: string) => ({
    id: x,
  }));

  const existingStudent = await prisma.student.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
    include: {
      academicClasses: {
        where: {
          id: {
            notIn: body.academicClassIds,
          },
        },
      },
    },
  });

  const student = await prisma.student.update({
    where: {
      id: event.context.params?.id,
    },
    data: {
      ...omit(body, ["academicClassIds"]),
      nis: body.nis ? body.nis : null,
      academicClasses: {
        disconnect: existingStudent.academicClasses.map((x) => ({ id: x.id })),
        connect: academicClassIds,
      },
    },
    include: { academicClasses: true },
  });

  return {
    data: student,
  };
});
