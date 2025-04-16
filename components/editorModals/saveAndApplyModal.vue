<script setup>
import Modal from '@/components/modal.vue';
import { ref } from 'vue';
import { syncAndDownload, writeContent } from '~/scripts/api';

const show = defineModel('show');
const value = defineModel('content');
const datas = defineModel('data');

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

const errorMsg = ref('');
const showError = (msg) => {
    errorMsg.value = msg;
};

const successMsg = ref('');
const isSyncing = ref(false);
async function sync() {
    isSyncing.value = true;
    await writeContent(datas, value.value, showError);
    await syncAndDownload(datas, showError, null, value, null);
    successMsg.value = '成功同步';
    setTimeout(() => {
        isSyncing.value = false;
    }, 2000);
}
</script>

<template>
    <Modal v-model:visible="show" width="50vw" height="60vh" closeable>
        <div class="container">
            <div class="containerPart">
                <h1>保存方法</h1>
                <p class="saveStep">
                    <span>1. 同步至云端</span>
                    <button @click="sync" :disabled="isSyncing">同步</button>
                    <span v-if="errorMsg" class="error">{{ errorMsg }}</span>
                    <span v-if="successMsg" class="success">{{ successMsg }}</span>
                </p>
                <p class="saveStep">
                    <span>2. 在游戏中应用配置文件</span>
                    <span>在游戏内执行: <code>!!cfg editorApply</code></span>
                </p>
            </div>
            <div class="containerPart">
                <div class="timeoutInformation">
                    <span>注: 此会话将于{{ formatTimestamp(data.lastEditTime + 1800) }}到期</span>
                    <span>最晚将于{{ formatTimestamp(data.createTime + 86400) }}到期</span>
                    <span>在保存网页编辑器的修改前，您不能关闭游戏内的文件</span>
                </div>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    height: 100%;
    font-size: 125%;
}

.containerPart {
    width: 100%;
}

.timeoutInformation {
    display: flex;
    flex-direction: column;
}

h1 {
    margin: 0;
}

.error {
    color: red;
}

.saveStep {
    display: flex;
    flex-direction: column;
    width: 100%;
}

button {
    background-color: rgba(255, 255, 255, 0.138);
    color: white;
    padding: 20px;
    width: 100%;
    margin-right: 8px;
    margin-top: 8px;
    margin-bottom: 3px;
    border-radius: 5px;
    border: 2px solid white;
    transition: border 100ms linear, background-color 100ms linear;
    font-size: 150%;
}

button:active {
    border: 2px solid aqua;
    background-color: rgba(255, 255, 255, 0.58) !important;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.304);
}

button:disabled {
    cursor: wait;
}

button:disabled:hover {
    background-color: rgba(255, 255, 255, 0.138) !important;
}
</style>
