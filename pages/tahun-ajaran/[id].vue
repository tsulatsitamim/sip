<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'

const { params } = useRoute()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
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
    appAlert.value?.close()

    loading.value = true
    try {
        await $fetch(`/api/academic-year/${params.id}`, { method: 'PATCH', body: form })
        appAlert.value?.open()
    } catch (error) {
        appAlert.value?.open('danger')
    }
    loading.value = false
}
</script>


<template>
    <NuxtLayout name="dashboard" :title="`${params.id === 'tambah' ? 'Tambah' : 'Edit'} Tahun Ajaran`">
        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <FormInput v-model="form.name" label="Tahun Ajaran"></FormInput>
            <div class="text-right mt-5">
                <AppButton @click="useRouter().go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>
        </AppCard>
    </NuxtLayout>
</template>