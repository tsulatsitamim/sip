<script setup>
import AppDashboard from 'tbb-ui/src/components/layouts/AppDashboard.vue'


definePageMeta({
    // layout: "dashboard",
});
</script>

<template>
    <AppDashboard title="Hello" :settings="useSettings" :menus="useMenus">
        hexx
    </AppDashboard>
</template>