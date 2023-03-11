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
            <div class="py-4 px-6">Sub Header</div>
            <div class="px-6 flex-grow">Body</div>
            <div class="bg-white py-3 px-6 text-right"> <span class="mr-1 text-slate-400">{{ new Date().getFullYear()
            }}</span> Mahad
                Ar-Ridho</div>
        </div>
    </div>
</template>