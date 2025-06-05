<script setup>
import editorToolbar from '@/components/editorToolbar.vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { version } from '~/props';

import loading from '@/components/editorModals/loadingModal.vue';
import save from '@/components/editorModals/saveAndApplyModal.vue';

const route = useRoute();
const showSaveModal = ref(false);

const toolbarDatas = reactive({
    name: 'undefined',
    author: 'undefined',
    server: 'undefined',
    createTime: 0,
    lastEditTime: 0,
    sessionID: route.params.id,
});

const currentLang = ref('yaml');
const currentValue = ref('');

const reloadKey = ref(0);

watch(toolbarDatas, () => {
    document.title = 'cfgcmd editor :: ' + toolbarDatas.name;
});
</script>

<template>
    <loading v-model="toolbarDatas" :key="reloadKey" v-model:content="currentValue" />
    <save v-model:show="showSaveModal" v-model:data="toolbarDatas" v-model:content="currentValue" />
    <div class="container">
        <editor-toolbar v-model="toolbarDatas" @reload="reloadKey++" @save="showSaveModal = true" />
        <div class="editor">
            <MonacoEditor v-model="currentValue" :lang="currentLang" :options="{ theme: 'vs-dark' }" class="editorComponent" />
        </div>
        <div class="footer">
            <span>Powered by <a href="https://www.npmjs.com/package/monaco-editor">Monaco Editor</a></span>
            <span>cfgcmd 网页编辑器 v{{ version }} <a href="https://github.com/wang-yupu/configCommandEditor">提供建议</a></span>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.editor {
    flex: 1;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
}

.editorComponent {
    height: 100%;
}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px;
}
</style>
