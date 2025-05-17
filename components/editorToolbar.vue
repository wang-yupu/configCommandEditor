<script setup>
const model = defineModel();

defineEmits(['save', 'reload']);

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}
</script>

<template>
    <div class="toolbar">
        <div class="info">
            <span
                >会话开启者: <code>{{ model.author }}</code
                >; 文件夹名称: <code>{{ model.server }}</code></span
            >
            <span
                >此会话创建时间: <code>{{ formatTimestamp(model.createTime) }}</code
                >; 最后修改时间: <code>{{ formatTimestamp(model.lastEditTime) }}</code></span
            >
            <span
                >会话ID: <code>{{ model.sessionID }}</code></span
            >
        </div>
        <div class="title">
            <span>{{ model.name }}</span>
        </div>
        <div class="ops">
            <button @click="$emit('save')" class="primaryButton">保存修改</button>
            <button @click="$emit('reload')">重载文件</button>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.info {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
}

.info > span {
    margin-top: 6px;
    margin-bottom: 6px;
}

.title {
    display: flex;
    align-items: center;
    font-size: 150%;
}

.ops {
    display: flex;
    flex-direction: row;
}

code {
    background-color: rgba(255, 255, 255, 0.138);
    font-size: 100%;
    padding: 4px;
    border-radius: 3px;
}

.primaryButton {
    background-color: rgba(0, 202, 67, 0.656);
}

button {
    background-color: rgba(255, 255, 255, 0.138);
    color: white;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 8px;
    margin-top: 3px;
    margin-bottom: 3px;
    border-radius: 5px;
    border: 2px solid white;
    transition: border 100ms linear, background-color 100ms linear;
}

button:active {
    border: 2px solid aqua;
    background-color: rgba(255, 255, 255, 0.58) !important;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.304);
}
</style>
