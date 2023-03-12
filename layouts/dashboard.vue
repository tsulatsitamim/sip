<script setup>
import AppDashboard from 'tbb-ui/src/components/layouts/AppDashboard.vue'

defineProps({
    title: { type: String, default: '' }
})
</script>

<template>
    <AppDashboard :title="title" :settings="useSettings" :menus="useMenus">
        <template #toolbar>
            <slot name="toolbar"></slot>
        </template>
        <slot></slot>
    </AppDashboard>
</template>