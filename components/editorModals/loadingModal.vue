<script setup>
import { ref } from 'vue';
import { syncAndDownload } from '~/scripts/api';

const show = ref(true);
const model = defineModel();
const value = defineModel('content');

const errorShow = ref(false);
const errorMsg = ref('');
const downloading = ref(false);

function serror(msg) {
    errorShow.value = true;
    errorMsg.value = msg;
}

onMounted(() => {
    syncAndDownload(model, serror, downloading, value, show);
});
</script>

<template>
    <Modal v-model:visible="show" width="30vw" height="30vh">
        <div class="container">
            <h1>正在获取文件内容</h1>
            <h1 v-if="downloading">正在下载文件内容</h1>
            <h1 v-if="errorShow" class="error">无法加载文件: {{ errorMsg }}</h1>
        </div>
    </Modal>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100%;
}

h1 {
    margin: 0;
}

.error {
    color: red;
}
</style>
