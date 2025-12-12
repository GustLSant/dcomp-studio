<script setup lang="ts">
    import type { CodeEditorButton } from '../../../../enums/codeEditor';
    import { FOOTER_BT_EVENT_SULFIX } from '../../../../utils/codeEditor';
    import eventBus from '../../../../eventBus';


    const props = defineProps<{ eventKey: CodeEditorButton }>();

    function handleButtonPressed() {
        eventBus.dispatchEvent(new Event(props.eventKey + FOOTER_BT_EVENT_SULFIX));
    }
</script>


<template>
    <button @click="() => { handleButtonPressed() }" class="flex grow basis-1 text-xs">
        <slot />
    </button>
</template>