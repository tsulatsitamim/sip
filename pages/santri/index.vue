<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'


const { data: academicYears } = await $fetch('/api/academic-year')
const academicYearId = ref(academicYears.length ? academicYears[0].id : null)


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
    await fetchAcademicClasses()
})
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Santri">
        <template #toolbar>
            <NuxtLink :to="`/santri/tambah`">
                <AppButton>Tambah</AppButton>
            </NuxtLink>
        </template>
        <CrudDataTable :table="table" crud-path="/santri">
            <template #header>
                <div class="md:w-72 md:ml-3 mb-3 md:mb-0">
                    <FormSelect v-model="academicYearId" class="" :items="academicYears" placeholder="Pilih Tahun Akademik">
                    </FormSelect>
                </div>
                <div class="md:w-72 md:ml-3 mb-3 md:mb-0">
                    <FormSelect v-model="academicClassId" class="" :items="academicClasses" placeholder="Pilih Kelas">
                    </FormSelect>
                </div>
            </template>
        </CrudDataTable>
    </NuxtLayout>
</template>