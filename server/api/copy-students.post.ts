export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.academicClass.update({
    where: {
      id: body.classId,
    },
    data: {
      students: {
        connect: body.studentIds.map((x: string) => ({ id: x })),
      },
    },
  });

  return {
    data: "ok",
  };
});
