<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'

const { data } = await $fetch('/api/academic-class?status=active')
const activeClasses = [
    { id: 'all', name: 'Semua' },
    ...data
]
const academicClassId = ref('all')

const table = computed(() => {
    return {
        url: `/api/student?academicClassId=${academicClassId.value}`,
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Action', field: 'action', class: 'text-center w-32' },
        ]
    }
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
                <div class="md:w-72 md:ml-3">
                    <FormSelect v-model="academicClassId" class="" :items="activeClasses" placeholder="Pilih Kelas">
                    </FormSelect>
                </div>
            </template>
        </CrudDataTable>
    </NuxtLayout>
</template>