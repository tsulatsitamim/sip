<script setup lang="ts">
import CrudDataTable from 'tbb-ui/src/components/table/CrudDataTable.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'

const table = {
    url: '/api/user',
    columns: [
        { title: 'Name', field: 'name' },
        { title: 'Username', field: 'username' },
        { title: 'Action', field: 'action', class: 'text-center w-32' },
    ],
}
</script>

<template>
    <NuxtLayout name="dashboard" title="Data Pengguna">
        <template #toolbar>
            <NuxtLink :to="`/pengguna/tambah`">
                <AppButton>Tambah</AppButton>
            </NuxtLink>
        </template>
        <CrudDataTable :table="table" crud-path="/pengguna">
        </CrudDataTable>
    </NuxtLayout>
</template>