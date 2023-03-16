<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'

const { params, query } = useRoute()
const router = useRouter()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
const form = reactive({
    id: '',
    name: '',
    stageId: '' as null | string,
    academicYearId: query.academicYearId as string
})
const isCreate = params.id === 'tambah'

const { data: academicYears } = await $fetch('/api/academic-year')
const { data: stages } = await $fetch('/api/stage')

try {
    if (!isCreate) {
        const { data } = await $fetch(`/api/academic-class/${params.id}`)
        form.id = data.id
        form.name = data.name
        form.academicYearId = data.academicYearId
        form.stageId = data.stageId
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
            await $fetch(`/api/academic-class/${form.id}`, { method: 'PATCH', body: form })
        } else {
            await $fetch(`/api/academic-class`, { method: 'POST', body: form })

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
    <NuxtLayout name="dashboard" :title="`${isCreate ? 'Tambah' : 'Edit'} Kelas`">
        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <FormSelect label="Jenjang Pendidikan" v-model="form.stageId" class="mb-5" :items="stages"></FormSelect>
            <FormSelect label="Tahun Ajaran" v-model="form.academicYearId" class="mb-5" :items="academicYears"></FormSelect>
            <FormInput v-model="form.name" label="Kelas"></FormInput>
            <div class="text-right mt-5">
                <AppButton @click="router.go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>
        </AppCard>
    </NuxtLayout>
</template>