<script setup lang="ts">
    import RecentFileViewer from '../components/homeview/RecentFileViewer.vue';
    import FileList from '../components/homeview/FileList.vue';
    import Navbar from '../components/layout/Navbar.vue';
</script>


<template>
    <Navbar />

    <div class="flex flex-col gap-4 p-4 fade-in-left-normal">
        <RecentFileViewer />
        <FileList />
    </div>
</template>


<style scoped>

</style>