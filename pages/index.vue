<script setup>
import pluginIntroduction from '@/components/index/pluginIntroduction.vue';
</script>

<template>
    <div class="container">
        <div class="hero">
            <span>使用MCDR插件: <a href="https://mcdreforged.com/zh-CN/plugin/cfgcmd">cfgcmd / configCommand</a>打开一个编辑器对话以使用在线配置编辑器</span>
            <pluginIntroduction />
        </div>
        <span>Copyright (c) wangyupu 2025-present</span>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    width: 100vw;
}

.hero {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
}
</style>
