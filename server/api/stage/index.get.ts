export default defineEventHandler(async (event) => {
  const stages = await prisma.stage.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return { data: stages };
});
