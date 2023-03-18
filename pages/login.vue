<script setup lang="ts">
import AppButton from 'tbb-ui/src/components/button/AppButton.vue';
import FormInput from 'tbb-ui/src/components/form/FormInput.vue';

const loading = ref(false)
const form = reactive({
    username: '',
    password: ''
})

const login = async () => {
    loading.value = true
    try {
        const data = await $fetch('/api/login', { method: 'POST', body: form })
        localStorage.setItem("token", data);
        useRouter().push('/santri')
    } catch (error) {
        alert('Kesalahan username atau password')
    }
    loading.value = false
}
</script>

<template>
    <div class="bg-img  fixed inset-0 pt-[15vh]">
        <div class="w-full px-5 max-w-sm mx-auto px-10 pt-5 pb-10 rounded-lg bg-white">
            <img src="/img/logo.png" alt="logo" class="h-20 mx-auto mb-7">
            <FormInput v-model="form.username" label="Username" class="mb-5"></FormInput>
            <FormInput v-model="form.password" type="password" label="Password" class="mb-8"></FormInput>

            <AppButton @click="login" :loading="loading" class="w-full justify-center">Login</AppButton>
        </div>
    </div>
</template>

<style>
.bg-img {
    background-image: url("/img/bg.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
}
</style>