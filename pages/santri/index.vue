<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'
import AppModal from 'tbb-ui/src/components/AppModal.vue'
import fileDownload from 'js-file-download'
import { AcademicClass } from '.prisma/client';
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import * as XLSX from 'xlsx/xlsx.mjs';

const importMapKeys = {
    'nis': 'No Induk',
    'entryClass': 'Masuk Kelas',
    'name': 'Nama',
    'birthPlace': 'Tempat Lahir',
    'birthDate': 'Tanggal Lahir',
    'fatherName': 'Nama Bapak',
    'fatherBirthPlace': 'Tempat Lahir Bapak',
    'fatherBirthDate': 'Tanggal Lahir Bapak',
    'fatherEducation': 'Pendidikan Bapak',
    'fatherJob': 'Pekerjaan Bapak',
    'motherName': 'Nama Ibu',
    'motherBirthPlace': 'Tempat Lahir Ibu',
    'motherBirthDate': 'Tanggal Lahir Ibu',
    'motherEducation': 'Pendidikan Ibu',
    'motherJob': 'Pekerjaan Ibu',
    'parentAddress': 'Alamat Orang Tua',
    'parentPhone': 'Telpon Orang Tua',
    'note': 'Keterangan',
}


const { data: academicYears } = await $fetch('/api/academic-year')
const academicYearId = ref(academicYears.length ? academicYears[0].id : null)
const crud: Ref<InstanceType<typeof CrudDataTable> | null> = ref(null)

const academicClassId = ref('all')
const academicClasses: Ref<{ id: string, name: string }[]> = ref([])

const fetchAcademicClasses = async () => {
    academicClasses.value = []
    const { data } = await $fetch(`/api/academic-class?academicYearId=${academicYearId.value}`)
    academicClasses.value = [
        { id: 'all', name: 'Semua' },
        ...data
    ]
}

if (academicYearId.value) {
    await fetchAcademicClasses()
}

const table = computed(() => {
    return {
        checkbox: true,
        url: `/api/student?academicClassId=${academicClassId.value}&academicYearId=${academicYearId.value}`,
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Nomer Induk', field: 'nis' },
            { title: 'Kelas', field: 'className' },
            { title: 'Action', field: 'action', class: 'text-center w-32' },
        ]
    }
})

watch(academicYearId, async () => {
    academicClassId.value = 'all'
        ; (crud as any).value.dataTable.clearCheckedRows()
    await fetchAcademicClasses()
})

watch(academicClassId, async () => {
    ; (crud as any).value.dataTable.clearCheckedRows()
})

const getCheckedRows = () => {
    return Object.values((crud.value as any).dataTable.checkedRows).filter(x => x)
}

const importModal = ref<InstanceType<typeof AppModal> | null>(null)
const appModal = ref<InstanceType<typeof AppModal> | null>(null)
const academicYearIdTarget = ref(null)
const academicClassIdTarget = ref(null)
const academicClassesByYear: Ref<AcademicClass[]> = ref([])

let importedStudents: any[] = []
const openImportModal = () => {
    if (!academicClassId.value || academicClassId.value === 'all') {
        return alert('Silahkan pilih kelas yang akan diimpor data')
    }
    importedStudents = []
    importModal?.value?.open()
}

const openMoveClassModal = () => {
    const studentIds = getCheckedRows()
    if (!studentIds.length) {
        return alert('Silahkan pilih santri')
    }

    appModal?.value?.open()
}

watch(academicYearIdTarget, async (id) => {
    academicClassIdTarget.value = null
    academicClassesByYear.value = []
    academicClassesByYear.value = (await $fetch(`/api/academic-class?academicYearId=${id}`)).data;
})

const addClass = async () => {
    try {
        await $fetch('/api/copy-students', {
            method: "POST",
            body: {
                studentIds: getCheckedRows(),
                classId: academicClassIdTarget.value
            }
        })

            ; (crud as any).value.dataTable.clearCheckedRows()
        appModal?.value?.close()

        alert('Santri berhasil di salin.')
    } catch (error) {
        alert('Mohon maaf ada ganguan sistem.')
    }
}

const loading = ref(false)
const exportStudents = async () => {
    loading.value = true

    try {
        const data = await $fetch('/api/export-students', {
            responseType: 'blob',
            method: 'POST',
            body: {
                studentIds: getCheckedRows(),
                academicYearId: academicYearId.value
            },
        })

        fileDownload(data, 'export.xlsx');
    } catch (error) {
        console.log(error);

        alert('Mohon maaf ada ganguan sistem.')
    }

    loading.value = false
}

interface InputFileEvent extends Event {
    target: HTMLInputElement;
}

const processSheet = async (e: InputFileEvent) => {
    const sheet = e.target.files![0]
    if (!sheet) {
        return alert('File tidak didukung!')
    }
    const workbook = XLSX.readFile(await sheet.arrayBuffer());
    const students = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: false })
    const keys = Object.entries(importMapKeys)
    importedStudents = students.map((x: any) => keys.reduce((prev, next) => ({ ...prev, [next[0]]: x[next[1]] }), {}))
}


const importStudents = async () => {
    loading.value = true

    try {
        const data = await $fetch('/api/import-students', {
            method: 'POST',
            body: {
                students: importedStudents.map(x => ({
                    ...x,
                    birthDate: new Date(x.birthDate).toISOString(),
                    fatherBirthDate: new Date(x.fatherBirthDate).toISOString(),
                    motherBirthDate: new Date(x.motherBirthDate).toISOString(),
                })),
                academicClassId: academicClassId.value
            },
        })
    } catch (error) {
        console.log(error);
        alert('Mohon maaf ada ganguan sistem.')
    }

    importModal.value?.close()
    crud.value?.dataTable?.fetchData()
    loading.value = false
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Santri">
        <template #toolbar>
            <AppButton @click="openImportModal" :loading="loading" color="warning" class="mr-2">
                Impor</AppButton>
            <AppButton :loading="loading" @click="exportStudents" color="success" class="mr-2">Ekspor</AppButton>
            <AppButton @click="openMoveClassModal" color="danger" class="mr-2">Naik Kelas</AppButton>
            <NuxtLink :to="`/santri/tambah`">
                <AppButton>Tambah Santri</AppButton>
            </NuxtLink>
        </template>
        <CrudDataTable ref="crud" :table="table" crud-path="/santri">
            <template #header>
                <div class="md:w-72 md:ml-3 mb-3 md:mb-0">
                    <FormSelect v-model="academicYearId" class=""
                        :items="[...academicYears, { id: 'noclass', name: 'Tanpa Kelas' }]"
                        placeholder="Pilih Tahun Akademik">
                    </FormSelect>
                </div>
                <div class="md:w-72 md:ml-3 mb-3 md:mb-0">
                    <FormSelect v-model="academicClassId" class="" :items="academicClasses" placeholder="Pilih Kelas">
                    </FormSelect>
                </div>
            </template>
        </CrudDataTable>
        <AppModal ref="appModal" title="Salin Santri ke Kelas" save-label="Salin" @save="addClass">
            <FormSelect v-model="academicYearIdTarget" class="mb-5" label="Tahun Akademik" :items="academicYears">
            </FormSelect>
            <FormSelect v-model="academicClassIdTarget" class="mb-5" label="Kelas" :items="academicClassesByYear">
            </FormSelect>
        </AppModal>

        <AppModal ref="importModal" title="Impor Santri" save-label="Impor" @save="importStudents">
            <ol class="list-disc text-sm mb-3 pl-3">
                <li>Pastikan data file Excel yang diimport sesuai format template</li>
                <li>Pastikan tidak ada santri terdaftar dengan nomer induk yang sama dengan data yang akan
                    diimport</li>
            </ol>

            <div class="font-medium mb-5 text-blue-600 hover:opacity-70">
                <a href="/template-impor.xlsx"> Download Template</a>
            </div>
            <FormInput @input="processSheet" accept=".xlsx" type="file" label="File Excel (.xlsx)"></FormInput>
        </AppModal>
    </NuxtLayout>
</template>