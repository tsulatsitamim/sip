<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'

const { data: academicYears } = await $fetch('/api/academic-year')
const academicYearId = ref(academicYears.length ? academicYears[0].id : null)

const table = computed(() => {
    return {
        url: `/api/academic-class?academicYearId=${academicYearId.value}`,
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Action', field: 'action', class: 'text-center w-32' },
        ]
    }
})
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Kelas">
        <template #toolbar>
            <NuxtLink :to="`/kelas/tambah?academicYearId=${academicYearId}`">
                <AppButton>Tambah</AppButton>
            </NuxtLink>
        </template>
        <CrudDataTable :table="table" crud-path="/kelas">
            <template #header>
                <div class="md:w-72 md:ml-3">
                    <FormSelect v-model="academicYearId" class="" :items="academicYears"></FormSelect>
                </div>
            </template>
        </CrudDataTable>
    </NuxtLayout>
</template>