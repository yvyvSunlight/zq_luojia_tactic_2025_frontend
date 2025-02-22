<template>
    <div class="timer">
      <div class="time">
        {{ formattedTime }}
      </div>
      <div class="controls">
        <button @click="startTimer" :disabled="isRunning">Start</button>
        <button @click="pauseTimer" :disabled="!isRunning">Pause</button>
        <button @click="resetTimer">Reset</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onUnmounted } from 'vue';
  
  // 计时器状态
  const time = ref(0); // 当前时间（秒）
  const timer = ref(null); // 定时器ID
  const isRunning = ref(false); // 控制定时器是否在运行
  
  // 格式化时间为 "mm:ss" 格式
  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });
  
  // 启动计时器
  const startTimer = () => {
    if (timer.value) return; // 如果计时器已在运行，则不做任何操作
    isRunning.value = true;
    timer.value = setInterval(() => {
      time.value += 1; // 每秒增加1
    }, 1000);
  };
  
  // 暂停计时器
  const pauseTimer = () => {
    clearInterval(timer.value);
    timer.value = null;
    isRunning.value = false;
  };
  
  // 重置计时器
  const resetTimer = () => {
    clearInterval(timer.value);
    timer.value = null;
    time.value = 0;
    isRunning.value = false;
  };
  
  // 组件销毁时清理定时器
  onUnmounted(() => {
    clearInterval(timer.value);
  });
  </script>
  
  <style scoped>
  .timer {
    font-family: 'Arial', sans-serif;
    text-align: center;
    font-size: 3rem;
    padding: 20px;
    background-color: #282c34;
    color: white;
    border-radius: 10px;
    width: 250px;
    margin: 0 auto;
  }
  
  .time {
    padding: 10px;
  }
  
  .controls button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  