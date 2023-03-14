import { Student } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const student = (await prisma.student.findFirstOrThrow({
    where: {
      id: event.context.params?.id,
    },
  })) as SerializedDate<Student>;

  return { data: student };
});
