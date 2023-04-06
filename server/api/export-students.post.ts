import { Student } from "@prisma/client";
import dayjs from "dayjs";
import XLSX from "xlsx";

const exportKeys = {
  nis: "NIS",
  nisn: "NISN",
  name: "Nama",
  nickname: "Nama Panggilan",
  gender: "Jenis Kelamin",
  religion: "Agama",
  citizenship: "Kewarganegaraan",
  childOrder: "Anak-ke",
  siblings: "Saudara Kandung",
  stepSiblings: "Saudara Tiri",
  fosterSiblings: "Saudara Aggkat",
  weight: "Berat Bdan",
  height: "Tinggi Badan",
  bloodType: "Gol Darah",
  diseaseHistory: "RIwayat Penyakit",
  allergy: "Alergi",
  spicy: "Makan Pedas",
  disability: "Catat Fisik",
  retardation: "Keterbelakangan Mental",
  stayWith: "Tinggal Bersama",
  characteristic: "Sifat Anak",
  language: "Bahasa",
  birthPlace: "Tempat Lahir",
  birthDate: "Tanggal Lahir",
  fatherName: "Nama Ayah",
  fatherBirthPlace: "Tempat Lahir Ayah",
  fatherBirthDate: "Tanggal Lahir Ayah",
  fatherJob: "Pekerjaan Ayah",
  fatherEducation: "Pendidikan Ayah",
  motherName: "Nama Ibu",
  motherBirthPlace: "Tempat Lahir Ibu",
  motherBirthDate: "Tanggal Lahir Ibu",
  motherJob: "Pekerjaan Ibu",
  motherEducation: "Pendidikan Ibu",
  parentAddress: "Alamat Orang Tua",
  parentPhone: "Telfon Orang Tua",
  waliName: "Nama Wali",
  waliBirthPlace: "Tempat Lahir Wali",
  waliBirthDate: "Tanggal Lahir Wali",
  waliJob: "Pekerjaan Wali",
  waliEducation: "Pendidikan Wali",
  waliAddress: "Alamat Wali",
  waliPhone: "Telfon Wali",
  address: "Alamat Tempat Tinggal",
  phone: "phone",
  note: "Catatan/Pelanggaran",
  originType: "Masuk Sebagai",
  originGrade: "Pindahan dari",
  originSchool: "Asal Sekolah",
  originDate: "Tanggal Lulus/Pindah",
  originClass: "Pindahan dari Kelas",
  entryDate: "Tanggal Masuk",
  entryProgram: "Masuk Program",
  entryClass: "Masuk Kelas",
};

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

  const entries = Object.entries(exportKeys);
  const data = [
    ["No", "Kelas", ...entries.map((x) => x[1])],
    ...students.map((student, i) => [
      i + 1,
      student.academicClasses[0].name,
      ...entries.map((x) => student[x[0] as keyof Student]),
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Link");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
});
