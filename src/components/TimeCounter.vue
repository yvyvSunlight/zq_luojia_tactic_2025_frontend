<template>
    <div class="timer">
      <div class="time">
        {{ formattedTime }}
      </div>
    </div>
  </template>
  
  <script setup>
import { getStartTime } from '@/api/api';
import { ref, computed, onMounted, defineExpose } from 'vue';
  
  // 计时器状态
  const time = ref(0); // 当前时间（秒）
  const timer = ref(null); // 定时器ID
  const isRunning = ref(false); // 控制定时器是否在运行
  
// 格式化时间为 "hh:mm:ss" 格式
const formattedTime = computed(() => {
  const hours = Math.floor(time.value / 3600);
  const minutes = Math.floor((time.value % 3600) / 60);
  const seconds = time.value % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});
  
  // 启动计时器
  const startTimer = () => {
    if (timer.value) return; // 如果计时器已在运行，则不做任何操作
    console.log("启动计时器")
    isRunning.value = true;
    timer.value = setInterval(() => {
      time.value += 1; // 每秒增加1
    }, 1000);
  };
  

const resetTime = async () => {
  const end_time = localStorage.getItem('end_time')
    const team_id = localStorage.getItem('team_id')
    const res = await getStartTime(team_id)
    const start_time = res[team_id-1].start_time
    localStorage.setItem('start_time', start_time)
    if (!end_time) {
      console.log("没有结束时间")
      if (start_time) {
        const currentTime = new Date();
        const startTime = new Date(start_time + " GMT"); 
        time.value = Math.floor((currentTime - startTime) / 1000);
        console.log("time.value:",time.value)
        console.log("startTime:",startTime)
      }
      startTimer();
    } else {
      console.log("有结束时间")
      const startTime = new Date(start_time + " GMT");
      const endTime = new Date(end_time);
      time.value = Math.floor((endTime - startTime) / 1000);
      console.log("time.value:",time.value)
    }
  };


  onMounted(() => {
    resetTime();
  });

const pauseTimer = () => {
  clearInterval(timer.value);
  timer.value = null;
  isRunning.value = false;
};

defineExpose({
  pauseTimer
});
  // // 组件销毁时清理定时器
  // onUnmounted(() => {
  //   clearInterval(timer.value);
  // });
  </script>
  
  <style scoped>
  .timer {
    font-family: 'Arial', sans-serif;
    position: relative;
    text-align: center;
    font-size: 3rem;
    padding: 20px;
    background-color: #0000;
    color: white;
    border-radius: 10px;
    width: 226px;
    height: 55px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .time {
    padding: 10px;
  }
  </style>
  