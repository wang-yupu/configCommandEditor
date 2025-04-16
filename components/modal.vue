<template>
    <transition name="fade">
        <div v-if="visible" class="overlay" @click.self="closeModal">
            <transition name="scale">
                <div class="modal" v-if="visible">
                    <slot />
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    visible: Boolean,
    closeable: Boolean,
    width: {
        type: String,
        default: '50vw',
    },
    height: {
        type: String,
        default: '50vh',
    },
});

const emit = defineEmits(['update:visible']);

const closeModal = () => {
    if (props.closeable) {
        emit('update:visible', false);
    }
};

const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(117, 117, 117, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999999;
}

.modal {
    width: v-bind('props.width');
    height: v-bind('props.height');
    background-color: rgb(43, 43, 43);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 16px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: transform 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
    transform: scale(0.8);
}
</style>
