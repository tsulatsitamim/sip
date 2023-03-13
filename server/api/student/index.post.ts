export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const student = await prisma.student.create({
    data: { name: body.name } as any,
  });

  return { data: student };
});
