<script setup lang="ts">
    import CodeEditor from '../components/CodeEditor.vue';
    import FileContentVisualizer from '../components/files/FileContentVisualizer.vue';
    import type { FolderType } from '../types/entities';
    import { getAvailableId, getuserDataFromLocalStorage, saveUserDataOnLocalStorage } from '../utils/entities';

    
    // const userFiles: FolderType = {
    //     id: getAvailableId(),
    //     name: 'User Storage',
    //     content: [
    //         {
    //             id: getAvailableId(),
    //             name: 'Pasta 01',
    //             content: [
    //                 {
    //                     id: getAvailableId(),
    //                     name: 'Arquivo 01 da pasta 01',
    //                     content: 'conteudo do arquivo',
    //                 }
    //             ]
    //         },
    //         {
    //             id: getAvailableId(),
    //             name: 'Arquivo 01 da pasta root',
    //             content: 'conteudo do arquivo'
    //         },
    //         {
    //             id: getAvailableId(),
    //             name: 'Pasta 02',
    //             content: [
    //                 {
    //                     id: getAvailableId(),
    //                     name: 'Arquivo 01 da pasta 01',
    //                     content: 'conteudo do arquivo',
    //                 }
    //             ]
    //         },
    //         {
    //             id: getAvailableId(),
    //             name: 'Pasta 03',
    //             content: [
    //                 {
    //                     id: getAvailableId(),
    //                     name: 'Arquivo 01 da pasta 01',
    //                     content: 'conteudo do arquivo',
    //                 }
    //             ]
    //         },
    //         {
    //             id: getAvailableId(),
    //             name: 'Arquivo 02 da pasta root',
    //             content: 'conteudo do arquivo'
    //         }
    //     ]
    // }

    const userFiles: FolderType | undefined = getuserDataFromLocalStorage();
</script>


<template>
    <div class="bg-red-500 p-4">
        <h1>Home Page</h1>
        <p class="text-black">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae provident maiores inventore assumenda sed, aliquam magnam odio tempore incidunt? Praesentium enim mollitia consectetur consequatur, ab sed atque ullam quas.</p>
        <CodeEditor />
    
        <p>{{ userFiles }}</p>
        <p class="bg-cyan-500 text-white w-fit p-2 rounded-sm hover:cursor-pointer" @click="() => { saveUserDataOnLocalStorage(userFiles!) }">Salvar no localStorage</p>
        <FileContentVisualizer v-if="userFiles" :folder="userFiles" />
    </div>
</template>


<style scoped>

</style>