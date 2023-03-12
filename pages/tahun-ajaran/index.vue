<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'

const table = {
    url: '/api/academic-year',
    columns: [
        { title: 'Name', field: 'name' },
        { title: 'Action', field: 'action', class: 'text-center w-32' },
    ]
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Tahun Ajaran">
        <CrudDataTable :table="table">
        </CrudDataTable>
    </NuxtLayout>
</template>