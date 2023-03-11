<script setup>
import AppDashboard from 'tbb-ui/src/components/layouts/AppDashboard.vue'

defineProps({
    title: { type: String, default: '' }
})
</script>

<template>
    <AppDashboard :title="title" :settings="useSettings" :menus="useMenus">
        <slot></slot>
    </AppDashboard>
</template>