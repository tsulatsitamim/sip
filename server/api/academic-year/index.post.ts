export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicYear = await prisma.academicYear.create({
    data: { name: body.name },
  });

  return { data: academicYear };
});
