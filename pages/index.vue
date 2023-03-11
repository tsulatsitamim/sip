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
    <div class="h-full flex flex-col">
        <AppSidebar :title="setting.title" :menus="menus"></AppSidebar>
        <AppNavbar :title="setting.title"></AppNavbar>
        <div id="content" class="lg:pl-[265px] flex-grow flex flex-col">
            <div>subheader</div>
            <div class="px-6 bg-red-300 flex-grow">body</div>
        </div>
    </div>
</template>