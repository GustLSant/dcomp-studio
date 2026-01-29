<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import PageContainer from '../components/common/PageContainer.vue';
    import Separator from '../components/common/Separator.vue';
    import MenuCard from '../components/menuView/MenuCard.vue';
    import ThemeToggleInput from '../components/menuView/ThemeToggleInput.vue';
    import Logo from '../components/common/Logo.vue';
</script>


<template>
    <PageContainer class="gap-8">
        <section class="fade-in-left-short">
            <div class="section-header">
                <Icon icon="mdi:navigation-variant-outline" width="24" height="24" />
                <p>Páginas</p>
            </div>

            <div class="flex flex-col gap-2">
                <MenuCard label="Exercícios" icon="mdi:book-edit-outline" link="/algorithms"            style="animation-delay: 0.04s;"/>
                <MenuCard label="Meus Arquivos" icon="mdi:folder-outline" link="/folder/0"              style="animation-delay: 0.08s;" />
                <MenuCard label="Algoritmos Clássicos" icon="mdi:book-open-variant" link="/algorithms"  style="animation-delay: 0.12s;"/>
            </div>
        </section>

        <Separator />

        <section class="fade-in-left-short">
            <div class="section-header">
                <Icon icon="mdi:settings" width="24" height="24" />
                <p>Configurações</p>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-2">
                    <p>Tema:</p>
                    <ThemeToggleInput />
                </div>
            </div>
        </section>

        <div class="grow"></div>

        <Separator />

        <div class="flex flex-col items-center opacity-80 fade-in-top-short">
            <div class="flex items-center gap-1">
                <Logo size="32px" />
                <p class="font-mono">DcompStudio</p>
            </div>
            <p class="text-xs opacity-60">v1.0.0</p>
        </div>
    </PageContainer>
</template>


<style scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .section-header {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
</style>