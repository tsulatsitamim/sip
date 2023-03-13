<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue';

const { params } = useRoute()
const router = useRouter()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
const form = reactive({
    id: '',
    name: '',
    status: 'false',
})
const isCreate = params.id === 'tambah'

try {
    if (!isCreate) {
        const data = await $fetch(`/api/academic-year/${params.id}`)
        form.id = data.data.id
        form.name = data.data.name
        form.status = `${data.data.status}`
    }
} catch (error) {
    alertError()
}

const loading = ref(false)
const save = async () => {
    appAlert.value?.close()

    loading.value = true
    try {
        if (form.id) {
            await $fetch(`/api/academic-year/${form.id}`, { method: 'PATCH', body: { ...form, status: form.status === 'true' } })
        } else {
            await $fetch(`/api/academic-year`, { method: 'POST', body: form })

            setTimeout(() => {
                router.go(-1)
            }, 1000);
        }
        appAlert.value?.open()
    } catch (error) {
        appAlert.value?.open('danger')
    }
    loading.value = false
}
</script>


<template>
    <NuxtLayout name="dashboard" :title="`${isCreate ? 'Tambah' : 'Edit'} Tahun Ajaran`">
        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <FormInput v-model="form.name" label="Tahun Ajaran" class="mb-5"></FormInput>
            <FormSelect v-model="form.status" label="Status" :items="[
                { id: 'true', name: 'Aktif' },
                { id: 'false', name: 'Non Aktif' },
            ]"></FormSelect>
            <div class="text-right mt-5">
                <AppButton @click="router.go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>
        </AppCard>
    </NuxtLayout>
</template>