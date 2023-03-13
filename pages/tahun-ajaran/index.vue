<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'

const table = {
    url: '/api/academic-year',
    columns: [
        { title: 'Name', field: 'name' },
        { title: 'Status', field: 'status' },
        { title: 'Action', field: 'action', class: 'text-center w-32' },
    ],
    mapper: ((x: any) => ({ ...x, status: x.status ? 'Aktif' : 'Non Aktif' }))
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Tahun Ajaran">
        <template #toolbar>
            <NuxtLink :to="`/tahun-ajaran/tambah`">
                <AppButton>Tambah</AppButton>
            </NuxtLink>
        </template>
        <CrudDataTable :table="table" crud-path="/tahun-ajaran">
        </CrudDataTable>
    </NuxtLayout>
</template>