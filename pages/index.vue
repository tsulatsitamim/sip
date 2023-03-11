<script setup>
import Dashboard from 'tbb-ui/src/components/layouts/Dashboard.vue'
</script>

<template>
    <Dashboard>
        <div
            class="fixed lg:hidden top-0 left-0 right-0 bg-white h-14 shadow-[0_0_40px_0px_rgb(82,63,105,0.1)] flex items-center justify-between px-4">

            <a href="/" class="flex items-center">
                <img src="https://siadtmi.com/img/logo-ugm.3b61ee2b.png" class="h-7" alt="Logo">
                <span class="ml-3 text-base font-semibold text-indigo-500 hover:text-indigo-700">TBB UI</span>
            </a>

            <div class="flex items-center">
                <button class="w-6 h-6 text-base relative group">
                    <span
                        class="right-0 cursor-pointer bg-slate-400 group-hover:bg-indigo-700 h-[3px] w-full inline-block rounded absolute"
                        :class="{
                            'after:w-3/4 after:content-[\'\'] after:h-[3px] after:right-0 after:bg-slate-400 after:group-hover:bg-indigo-700 after:absolute after:rounded after:-bottom-2': true,
                            'before:w-1/2 before:content-[\'\'] before:h-[3px] before:right-0 before:bg-slate-400 before:group-hover:bg-indigo-700 before:absolute before:rounded before:-top-2': true
                        }"></span>
                </button>
                <button class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        class="h-6 fill-slate-300 hover:fill-indigo-700">
                        <path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" />
                        <circle cx="12" cy="6" r="6" class="opacity-30" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="lg:pl-64 pt-14 lg:pt-16">
            <div
                class="text-gray-700 hidden lg:flex fixed top-0 left-64 right-0 h-16 bg-white justify-end px-6 shadow-[0_0_40px_0px_rgb(82,63,105,0.1)]">
                <div class="flex items-center">
                    <div class="h-11 hover:bg-slate-100 flex items-center px-2 rounded-md cursor-pointer text-slate-400">
                        Hi, <span class="font-semibold text-slate-500">Tsulatsi Tamim</span>
                    </div>
                </div>
            </div>
        </div>
    </Dashboard>
</template>