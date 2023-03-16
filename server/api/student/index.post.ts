import omit from "lodash/omit";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicClassIds = body.academicClassIds.map((x: string) => ({
    id: x,
  }));

  const student = await prisma.student.create({
    data: {
      ...(omit(body, ["academicClassIds", "id"]) as any),
      nis: body.nis ? body.nis : null,
      academicClasses: {
        connect: academicClassIds,
      },
    },
    include: { academicClasses: true },
  });

  return { data: student };
});
