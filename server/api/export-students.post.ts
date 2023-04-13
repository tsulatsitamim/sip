import { Student } from "@prisma/client";
import dayjs from "dayjs";
import XLSX from "xlsx";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const students = (
    await prisma.student.findMany({
      where: {
        id: { in: body.studentIds },
      },
      include: {
        academicClasses: {
          where: {
            academicYear: {
              id: body.academicYearId,
            },
          },
        },
      },
    })
  ).map((x) => ({
    ...x,
    birthDate: x.birthDate ? dayjs(x.birthDate).format("YYYY-MM-DD") : "",
    fatherBirthDate: x.fatherBirthDate
      ? dayjs(x.fatherBirthDate).format("YYYY-MM-DD")
      : "",
    motherBirthDate: x.motherBirthDate
      ? dayjs(x.motherBirthDate).format("YYYY-MM-DD")
      : "",
    waliBirthDate: x.waliBirthDate
      ? dayjs(x.waliBirthDate).format("YYYY-MM-DD")
      : "",
    originDate: x.originDate ? dayjs(x.originDate).format("YYYY-MM-DD") : "",
    entryDate: x.entryDate ? dayjs(x.entryDate).format("YYYY-MM-DD") : "",
  }));

  const headers = body.headers;
  const data = [
    ["No", "Kelas", ...headers.map((x: any) => x.label)],
    ...students.map((student, i) => [
      i + 1,
      student.academicClasses[0].name,
      ...body.headers.map((x: any) => student[x.key as keyof Student]),
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Link");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
});
