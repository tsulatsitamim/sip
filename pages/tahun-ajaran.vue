<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'

const loading = ref(false)
const route = useRoute()

const data = await $fetch('/api/academic-year')
const table = {
    url: '/api/academic-year',
    columns: [
        { title: 'Name', field: 'name' },
        { title: 'Action', field: 'action', class: 'text-center w-32' },
    ]
}

const deleteItem = (id: string) => {

}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Tahun Ajaran">
        <CrudDataTable :table="table">
        </CrudDataTable>
    </NuxtLayout>
</template>