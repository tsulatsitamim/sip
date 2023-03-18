<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'

const { params } = useRoute()
const router = useRouter()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
const form = reactive({
    id: '',
    name: '',
    username: '',
    password: '',
})
const isCreate = params.id === 'tambah'

try {
    if (!isCreate) {
        const data = await $fetch(`/api/user/${params.id}`)
        form.id = data.data.id
        form.name = data.data.name
        form.username = data.data.username
        form.password = ''
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
            await $fetch(`/api/user/${form.id}`, { method: 'PATCH', body: { ...form } })
        } else {
            await $fetch(`/api/user`, { method: 'POST', body: form })

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
    <NuxtLayout name="dashboard" :title="`${isCreate ? 'Tambah' : 'Edit'} Pengguna`">
        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <FormInput v-model="form.name" label="Nama" class="mb-5"></FormInput>
            <FormInput v-model="form.username" label="Username" class="mb-5"></FormInput>
            <FormInput v-model="form.password" label="Password" class="mb-5"></FormInput>
            <div class="text-right mt-5">
                <AppButton @click="router.go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>
        </AppCard>
    </NuxtLayout>
</template>