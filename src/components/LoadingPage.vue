<template>
    <div class="loading-page">
        <img src="@/assets/icons/loadingCherry.png" alt="" class="spinner">
        <div class="loading-text">{{ loadingPercentage }}%</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loadingPercentage = ref(0);

onMounted(() => {
    const interval = setInterval(() => {
        if (loadingPercentage.value < 100) {
            loadingPercentage.value += 2;
        } else {
            clearInterval(interval);
        }
    }, 100);
});
</script>

<style scoped>
.loading-page {

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #71CBB4;
    z-index: 9;
}

.spinner {
    width: 70px;
    height: 70px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
}
</style>