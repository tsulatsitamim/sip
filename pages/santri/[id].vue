<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import FormText from 'tbb-ui/src/components/form/FormText.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'
import { Student } from '.prisma/client'

const { params } = useRoute()
const router = useRouter()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
const form = reactive<SerializedDate<Student>>({
    id: '',
    name: '',
    nis: '',
    birthPlace: '',
    birthDate: null,
    fatherName: '',
    fatherBirthPlace: '',
    fatherBirthDate: null,
    fatherJob: '',
    fatherEducation: '',
    motherName: '',
    motherBirthPlace: '',
    motherBirthDate: null,
    motherEducation: '',
    address: '',
    phone: '',
    note: '',
})
const isCreate = params.id === 'tambah'

try {
    if (!isCreate) {
        const { data } = await $fetch(`/api/student/${params.id}`)
        mapToReactive(form, data)
    }
} catch (error) {
    alertError()
}

const loading = ref(false)
const save = async () => {
    appAlert.value?.close()

    loading.value = true
    try {
        const body = {
            ...form,
            birthDate: form.birthDate ? new Date(form.birthDate) : null,
            fatherBirthDate: form.fatherBirthDate ? new Date(form.fatherBirthDate) : null,
            motherBirthDate: form.motherBirthDate ? new Date(form.motherBirthDate) : null,
        }

        if (form.id) {
            await $fetch(`/api/student/${form.id}`, {
                method: 'PATCH', body
            })
        } else {
            await $fetch(`/api/student`, { method: 'POST', body })

            setTimeout(() => {
                router.go(-1)
            }, 1000);
        }
        appAlert.value?.open()
    } catch (error) {
        appAlert.value?.open('danger')
    }

    scrollTop()
    loading.value = false
}
</script>


<template>
    <NuxtLayout name="dashboard" :title="`${isCreate ? 'Tambah' : 'Edit'} Santri`">
        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <div class="mb-5 font-medium text-base">
                Biodata Santri:
            </div>
            <FormInput v-model="form.name" class="mb-5" label="Nama Santri"></FormInput>
            <FormInput v-model="form.nis" class="mb-5" label="Nomer Induk Santri (NIS)"
                placeholder="Nomer Induk Santri (NIS)"></FormInput>
            <FormInput v-model="form.birthPlace" class="mb-5" label="Tempat Lahir"></FormInput>
            <FormInput v-model="form.birthDate" type="date" class="mb-5" label="Tanggal Lahir"></FormInput>
            <FormInput v-model="form.fatherName" class="mb-5" label="Nama Ayah"></FormInput>
            <FormInput v-model="form.fatherBirthPlace" class="mb-5" label="Tempat Lahir Ayah"></FormInput>
            <FormInput v-model="form.fatherBirthDate" type="date" class="mb-5" label="Tanggal Lahir Ayah">
            </FormInput>
            <FormInput v-model="form.fatherJob" class="mb-5" label="Pekerjaan Ayah"></FormInput>
            <FormInput v-model="form.fatherEducation" class="mb-5" label="Pendidikan Ayah"></FormInput>
            <FormInput v-model="form.motherName" class="mb-5" label="Nama Ibu"></FormInput>
            <FormInput v-model="form.motherBirthPlace" class="mb-5" label="Tempat Lahir Ibu"></FormInput>
            <FormInput v-model="form.motherBirthDate" type="date" class="mb-5" label="Tanggal Lahir Ibu">
            </FormInput>
            <FormInput v-model="form.motherEducation" class="mb-5" label="Pendidikan Ibu"></FormInput>
            <FormInput v-model="form.address" class="mb-5" label="Alamat"></FormInput>
            <FormInput v-model="form.phone" class="mb-5" label="Nomer Telepon"></FormInput>
            <FormText v-model="form.note" class="mb-5" label="Catatan"></FormText>

            <div class="mt-10 mb-5 font-medium text-base">
                Riwayat Kelas:
            </div>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-left text-gray-500">
                    <thead class="text-xs text-gray-700 bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Kelas
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-center w-[100px]">
                                Tindakan
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr v-for="studentClass in form.classes" class="bg-white border-b hover:bg-gray-50">
                                                                                <td class="px-6 py-4">
                                                                                    {{ studentClass.name }} {{ studentClass }}
                                                                                </td>
                                                                                <td class="px-6 py-4">
                                                                                    Silver
                                                                                </td>
                                                                                <td class="px-6 py-4 text-center">
                                                                                    <button class="text-xs font-bold text-blue-500 shadow-none mr-3 hover:opacity-75">
                                                                                        Hapus
                                                                                    </button>
                                                                                </td>
                                                                            </tr> -->
                    </tbody>
                </table>
            </div>



            <div class="text-right mt-10">
                <AppButton @click="router.go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>

        </AppCard>
    </NuxtLayout>
</template>