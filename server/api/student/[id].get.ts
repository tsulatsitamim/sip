import { serializeDate } from "~~/server/utils/serializeDate";

export default defineEventHandler(async (event) => {
  const student = await prisma.student.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
    include: {
      academicClasses: {
        include: { academicYear: true },
      },
    },
  });

  return {
    data: serializeDate(student),
  };
});
