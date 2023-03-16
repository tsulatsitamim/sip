<script setup lang="ts">
import AppButton from 'tbb-ui/src/components/button/AppButton.vue';

withDefaults(defineProps<{
    title: string
    saveLabel: string
}>(), { saveLabel: 'Simpan' })
const emit = defineEmits(['save',])
const show = ref(false)

const open = () => {
    show.value = true
}

const close = () => {
    show.value = false
}

defineExpose({
    close, open
})

</script>

<template>
    <div tabindex="-1" :class="show ? 'top-0 ' : 'hidden top-1/2'"
        class="fixed left-0 right-0 z-[100] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center flex">

        <div class="bg-gray-900 bg-opacity-50 fixed inset-0"></div>
        <div class="relative w-full h-full max-w-2xl md:h-auto">

            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow ">

                <!-- Modal header -->
                <div class="flex justify-between items-center p-4 border-b rounded-t">
                    <h3 class="text-base font-medium text-gray-900">
                        {{ title }}
                    </h3>
                    <button type="button" @click="close"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="defaultModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <!-- Modal body -->
                <div class="p-6">
                    <slot></slot>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                    <AppButton color="outline-secondary" @click="close">Batal</AppButton>
                    <AppButton @click="emit('save')">{{ saveLabel }}</AppButton>
                </div>
            </div>
        </div>
    </div>
</template>