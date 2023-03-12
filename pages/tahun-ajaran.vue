<script setup lang="ts">
import DataTable from 'tbb-ui/src/components/table/DataTable.vue'

const data = await $fetch('/api/academic-year')
const table = {
    data,
    columns: [
        { title: 'Name', field: 'name' },
    ]
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Tahun Ajaran">
        <DataTable :table="table"></DataTable>
    </NuxtLayout>
</template>