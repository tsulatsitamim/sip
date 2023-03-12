<script setup lang="ts">
import DataTable from 'tbb-ui/src/components/table/DataTable.vue'

const table = {
    data: [{
        id: 1,
        name: 'Tamim'
    }, {
        id: 2,
        name: 'Zubair'
    }],
    columns: [
        { title: 'id', field: 'id' },
        { title: 'Name', field: 'name' },
    ]
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Tahun Ajaran">
        <DataTable :table="table"></DataTable>
    </NuxtLayout>
</template>