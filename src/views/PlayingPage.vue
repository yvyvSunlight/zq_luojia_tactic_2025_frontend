<template>
    <div class="bg">
      <img src="@/assets/icons/returnLogo.svg" alt="" class="returnLogo" @click="goBack">
      <img src="@/assets/icons/clock.svg" alt="" class="clock">
      <!-- 计时器实现 -->
      <div class="timeArea">
        <!-- <div class="time">00:00:00</div> -->
        <TimeCounter />
      </div>
      <button @click="scanQRCode">扫码打卡点位</button>
    </div>
</template>
  
<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { TimeCounter } from '../components/TimeCounter.vue'

const router = useRouter()
const goBack = () => {
  router.go(-1)
}
const scanQRCode = () => {
  // router.push('/playing')
  console.log('scanQRCode')
  ElMessage.success('打卡成功')
}



</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
}

.bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .returnLogo {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 21px;
    top: 9px;
  }
  .clock {
    width: 107px;
    height: 107px;
    margin: 0 auto;
  }
  .timeArea {
    width: 226px;
    height: 55px;
    .time {
      color: white;
    }
  }
  button {
    width: 166px;
    height: 53px;
    margin: 0 auto;
    margin-top: 89px;
    background: #3E7366;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    border: none;
  }

}



</style>