import XLSX from "xlsx";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const students = await prisma.student.findMany({
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
  });

  const data = [
    ["No", "NISN", "NIS", "Nama", "Kelas"],
    ...students.map((student, i) => [
      i + 1,
      student.nis,
      student.nis,
      student.name,
      student.academicClasses[0].name,
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Link");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
});
