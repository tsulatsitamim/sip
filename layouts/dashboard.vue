<script setup>
import AppDashboard from 'tbb-ui/src/components/layouts/AppDashboard.vue'

defineProps({
    title: { type: String, default: '' }
})

const logout = () => {
    useLogout();
}
</script>

<template>
    <AppDashboard :title="title" :settings="useSettings" :menus="useMenus" @logout="logout">
        <template #toolbar>
            <slot name="toolbar"></slot>
        </template>
        <slot></slot>
    </AppDashboard>
</template>