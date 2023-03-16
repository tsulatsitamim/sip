export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const stage = await prisma.stage.create({
    data: { name: body.name },
  });

  return { data: stage };
});
