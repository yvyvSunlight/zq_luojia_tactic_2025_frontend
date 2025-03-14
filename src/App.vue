<template>
   <RouterView> </RouterView>
   <LoadingPage v-if="isLoading" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import LoadingPage from './components/LoadingPage.vue';
const isLoading = ref(true);
const router = useRouter();

const routeGuard = (to, from, next) => {
  isLoading.value = true;
  next();
}

const routeComplete = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
}

onMounted(() => {
  router.beforeEach(routeGuard);
  router.afterEach(routeComplete);
});
// 卸载路由守卫
onUnmounted(() => {
  router.beforeEach((...args) => {
    // eslint-disable-next-line no-unused-vars
    const [to, from, next] = args;
    next();
  });
});


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
