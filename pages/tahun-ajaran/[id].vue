<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'

const { params } = useRoute()
const form = reactive({
    name: ''
})

try {
    const data = await $fetch(`/api/academic-year/${params.id}`)
    form.name = data.data.name
} catch (error) {
    alertError()
}

const loading = ref(false)
const save = async () => {
    loading.value = true
    try {
        await $fetch(`/api/academic-year/${params.id}`, { method: 'PATCH', body: form })
    } catch (error) {
        alertError()
    }
    loading.value = false
}
</script>


<template>
    <NuxtLayout name="dashboard" :title="`${params.id === 'tambah' ? 'Tambah' : 'Edit'} Tahun Ajaran`">
        <AppCard>
            <FormInput v-model="form.name" label="Tahun Ajaran"></FormInput>
            <div class="text-right mt-5">
                <AppButton @click="save"></AppButton>
            </div>
        </AppCard>
    </NuxtLayout>
</template>