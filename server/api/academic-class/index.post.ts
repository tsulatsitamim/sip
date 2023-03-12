export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const academicClass = await prisma.academicClass.create({
    data: { name: body.name, academicYearId: body.academicYearId },
  });

  return { data: academicClass };
});
