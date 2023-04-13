<script setup lang="ts">
import AppCard from 'tbb-ui/src/components/AppCard.vue'
import FormInput from 'tbb-ui/src/components/form/FormInput.vue'
import FormText from 'tbb-ui/src/components/form/FormText.vue'
import FormSelect from 'tbb-ui/src/components/form/FormSelect.vue'
import AppButton from 'tbb-ui/src/components/button/AppButton.vue'
import AppAlert from 'tbb-ui/src/components/AppAlert.vue'
import { AcademicClass, AcademicYear, Student } from '.prisma/client'
import AppModal from '~/components/AppModal.vue'
import orderBy from 'lodash/orderBy.js'

const genders = [{ id: 'LakiLaki', name: 'Laki-Laki' }, { id: 'Perempuan', name: 'Perempuan' }]
const bloodTypes = [{ id: 'A', name: 'A' }, { id: 'B', name: 'B' }, { id: 'AB', name: 'AB' }, { id: 'O', name: 'O' }]

const { params } = useRoute()
const router = useRouter()
const appAlert = ref<InstanceType<typeof AppAlert> | null>(null)
const appModal = ref<InstanceType<typeof AppModal> | null>(null)
const form = reactive<SerializedDate<Student>>({
    id: '',
    name: '',
    nickname: null,
    gender: null,
    religion: null,
    citizenship: '',
    childOrder: null,
    siblings: null,
    stepSiblings: null,
    fosterSiblings: null,
    weight: null,
    height: null,
    bloodType: null,
    diseaseHistory: '',
    allergy: '',
    spicy: null,
    disability: '',
    retardation: '',
    stayWith: '',
    characteristic: '',
    language: '',
    nis: '',
    nisn: null,
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
    motherJob: '',
    motherEducation: '',
    parentAddress: null,
    parentPhone: null,
    waliName: '',
    waliBirthPlace: '',
    waliBirthDate: null,
    waliJob: '',
    waliEducation: '',
    waliAddress: null,
    waliPhone: null,
    address: '',
    phone: '',
    note: '',
    createdAt: new Date().toISOString(),
    originType: null,
    originGrade: null,
    originSchool: null,
    originDate: null,
    originClass: null,
    entryDate: null,
    entryProgram: null,
    entryClass: null
})
const academicClasses = ref<(AcademicClass & { academicYear: AcademicYear })[]>([])
const isCreate = params.id === 'tambah'

try {
    if (!isCreate) {
        const { data } = await $fetch(`/api/student/${params.id}`)
        mapToReactive(form, data)
        academicClasses.value = orderBy(data.academicClasses, x => x.academicYear.name, 'desc')
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
            birthDate: form.birthDate ? new Date(form.birthDate).toISOString() : null,
            fatherBirthDate: form.fatherBirthDate ? new Date(form.fatherBirthDate).toISOString() : null,
            motherBirthDate: form.motherBirthDate ? new Date(form.motherBirthDate).toISOString() : null,
            waliBirthDate: form.waliBirthDate ? new Date(form.waliBirthDate).toISOString() : null,
            originDate: form.originDate ? new Date(form.originDate).toISOString() : null,
            entryDate: form.entryDate ? new Date(form.entryDate).toISOString() : null,
            academicClassIds: academicClasses.value.map(x => x.id)
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

const removeClass = (i: number) => {
    academicClasses.value.splice(i, 1)
}

const academicYearId = ref(null)
const academicClassId = ref(null)
const academicClassesByYear: Ref<AcademicClass[]> = ref([])

const { data: academicYearsData } = await $fetch('/api/academic-year')
watch(academicYearId, async (id) => {
    academicClassId.value = null
    academicClassesByYear.value = []
    academicClassesByYear.value = (await $fetch(`/api/academic-class?academicYearId=${id}`)).data.filter(x => !academicClasses.value.some(y => y.id === x.id));
})
const addClass = () => {
    const addedClass = academicClassesByYear.value.find(x => x.id === academicClassId.value)
    const academicYear = academicYearsData.find(x => x.id === academicYearId.value)
    if (addedClass && academicYear) {
        academicClasses.value.push({ ...addedClass, academicYear })
    }

    academicClasses.value = orderBy(academicClasses.value, x => x.academicYear.name, 'desc')
    appModal.value?.close()

    academicYearId.value = null
    academicClassId.value = null
    academicClassesByYear.value = []
}
</script>


<template>
    <NuxtLayout name="dashboard" :title="`${isCreate ? 'Tambah' : 'Edit'} Santri`">
        <template #toolbar>
            <AppButton @click="router.go(-1)">
                Kembali
            </AppButton>
        </template>

        <AppCard>
            <AppAlert ref="appAlert"></AppAlert>
            <div class="mb-5 font-medium text-base">
                Keterangan Anak Didik:
            </div>
            <FormInput v-model="form.nis" class="mb-5" label="Nomer Induk Santri (NIS)"
                placeholder="Nomer Induk Santri (NIS)"></FormInput>
            <FormInput v-model="form.nisn" class="mb-5" label="Nomer Induk Santri Nasional (NISN)"
                placeholder="Nomer Induk Santri Nasional (NISN)"></FormInput>

            <FormInput v-model="form.name" class="mb-5" label="Nama"></FormInput>
            <FormInput v-model="form.birthPlace" class="mb-5" label="Tempat Lahir"></FormInput>
            <FormInput v-model="form.birthDate" type="date" class="mb-5" label="Tanggal Lahir"></FormInput>
            <FormText v-model="form.address" class="mb-5" label="Alamat Tempat Tinggal"></FormText>
            <FormSelect v-model="form.bloodType" class="mb-5" label="Golongan Darah" :items="bloodTypes"></FormSelect>

            <div class="mb-5 font-medium text-base">
                Keterangan Orang Tua/Wali:
            </div>
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
            <FormInput v-model="form.motherJob" class="mb-5" label="Pekerjaan Ibu"></FormInput>
            <FormInput v-model="form.motherEducation" class="mb-5" label="Pendidikan Ibu"></FormInput>
            <FormText v-model="form.parentAddress" class="mb-5" label="Alamat Orang Tua"></FormText>
            <FormInput v-model="form.parentPhone" class="mb-5" label="Nomer Telepon Orang Tua"></FormInput>

            <FormInput v-model="form.waliName" class="mb-5" label="Nama Wali"></FormInput>
            <FormInput v-model="form.waliBirthPlace" class="mb-5" label="Tempat Lahir Wali"></FormInput>
            <FormInput v-model="form.waliBirthDate" type="date" class="mb-5" label="Tanggal Lahir Wali">
            </FormInput>
            <FormInput v-model="form.waliJob" class="mb-5" label="Pekerjaan Wali"></FormInput>
            <FormInput v-model="form.waliEducation" class="mb-5" label="Pendidikan Wali"></FormInput>
            <FormText v-model="form.waliAddress" class="mb-5" label="Alamat Wali"></FormText>
            <FormInput v-model="form.waliPhone" class="mb-5" label="Nomer Telepon Wali"></FormInput>

            <div class="mb-5 font-medium text-base">
                Keterangan Penerimaan:
            </div>
            <FormInput v-model="form.entryClass" class="mb-5" label="Masuk Kelas"></FormInput>


            <div class="mb-5 font-medium text-base">
                Lainnya:
            </div>
            <FormText v-model="form.note" class="mb-5" label="Catatan/Pelanggaran"></FormText>

            <div class="mt-10 mb-5 font-medium text-base flex items-center justify-between">
                <div>
                    Riwayat Kelas:
                </div>
                <button
                    class="text-xs text-indigo-600 shadow-none hover:opacity-75 flex items-center border border-indigo-600 p-1.5 rounded-md"
                    @click="appModal?.open()">
                    Tambah Kelas Santri
                </button>
            </div>


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-left text-gray-500">
                    <thead class="text-xs text-gray-700 bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Tahun Ajaran
                            </th>
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
                        <tr v-for="(studentClass, i) in academicClasses" :key="studentClass.id"
                            class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4">
                                {{ studentClass.academicYear.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ studentClass.name }}
                            </td>
                            <td class="px-6 py-4">
                                <span v-if="studentClass.academicYear.status"
                                    class="py-px px-3 h-5 text-xs text-teal-400 bg-teal-100 rounded-md">Aktif</span>
                                <span v-else class="py-px px-3 h-5 text-xs text-gray-400 bg-gray-100 rounded-md">Tidak
                                    Aktif</span>

                            </td>
                            <td class="px-6 py-4 text-center">
                                <button @click="removeClass(i)"
                                    class="text-xs font-bold text-blue-500 shadow-none mr-3 hover:opacity-75">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div class="text-right mt-10">
                <AppButton @click="router.go(-1)" color="secondary" class="mr-2">Kembali</AppButton>
                <AppButton @click="save" :loading="loading"></AppButton>
            </div>

            <AppModal ref="appModal" title="Tambah Kelas" save-label="Tambah" @save="addClass">
                <FormSelect v-model="academicYearId" class="mb-5" label="Tahun Akademik" :items="academicYearsData">
                </FormSelect>
                <FormSelect v-model="academicClassId" class="mb-5" label="Kelas" :items="academicClassesByYear">
                </FormSelect>
            </AppModal>
        </AppCard>
    </NuxtLayout>
</template>