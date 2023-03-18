export default defineEventHandler(async (event) => {
  const user = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return { data: user };
});
