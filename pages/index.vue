<script setup>
import Dashboard from 'tbb-ui/src/components/layouts/Dashboard.vue'
import AppNavbar from 'tbb-ui/src/components/layouts/AppNavbar.vue'
import AppSidebar from 'tbb-ui/src/components/layouts/AppSidebar.vue'
</script>

<template>
    <div>
        <AppSidebar></AppSidebar>
        <AppNavbar></AppNavbar>
        <div id="content" class="h-screen bg-red-500">
            hello
        </div>
    </div>
</template>