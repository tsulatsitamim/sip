<script setup>
import Dashboard from 'tbb-ui/src/components/layouts/Dashboard.vue'
import AppNavbar from 'tbb-ui/src/components/layouts/AppNavbar.vue'
import AppSidebar from 'tbb-ui/src/components/layouts/AppSidebar.vue'
import IconHome from 'tbb-ui/src/components/icons/IconHome.vue'

const setting = {
    title: 'Mahad Ar-Ridho'
}

const menus = [
    { name: 'Santri', path: '/santri', icon: IconHome },
    { name: 'Kelas', path: '/kelas', icon: IconHome },
]
</script>

<template>
    <div>
        <AppSidebar :title="setting.title" :menus="menus"></AppSidebar>
        <AppNavbar :title="setting.title"></AppNavbar>
        <div id="content" class="h-screen bg-red-500">
            hello
        </div>
    </div>
</template>