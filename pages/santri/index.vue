<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'
import AppModal from 'tbb-ui/src/components/AppModal.vue'
import fileDownload from 'js-file-download'
import { AcademicClass } from '.prisma/client';


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

const openMoveClassModal = () => {
    const studentIds = getCheckedRows()
    if (!studentIds.length) {
        return alert('Silahkan pilih santri')
    }

    appModal?.value?.open()
}

const appModal = ref<InstanceType<typeof AppModal> | null>(null)
const academicYearIdTarget = ref(null)
const academicClassIdTarget = ref(null)
const academicClassesByYear: Ref<AcademicClass[]> = ref([])

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
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Santri">
        <template #toolbar>
            <AppButton :loading="loading" @click="exportStudents" color="success" class="mr-2">Download</AppButton>
            <AppButton @click="openMoveClassModal" color="danger" class="mr-2">Salin Santri</AppButton>
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
    </NuxtLayout>
</template>