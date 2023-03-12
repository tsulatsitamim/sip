<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
</script>


<template>
    <NuxtLayout name="dashboard" title="Tahun Ajaran - ">
        <AppCard>
            <FormInput label="Tahun Ajaran"></FormInput>
        </AppCard>
    </NuxtLayout>
</template>