<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.go(-1)
}
const gotoPlayingPage = () => {
  router.push('/playing')
}

</script>
<template>
    <div class="bg">
      <img src="@/assets/icons/returnLogo.svg" alt="" class="returnLogo" @click="goBack">
      <div class="teamName"></div>
      <div class="teamMemberArea"></div>
      <div class="addedTitle">预约出发：</div>
   
      <!-- 选择预约时间 -->
      <img src="@/assets/icons/mapLogo.svg" alt="" class="mapLogo">
      <button @click="gotoPlayingPage">到点了，扫码出发！</button>
      <div class="promptMessage">注：扫码后即计时开始！</div>
    </div>
</template>
  

<style scoped lang="less">
@font-face {
  font-family: 'font2';
  src: url("../assets/fonts/font2.ttf");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
}

.bg {
  // display: flex;
  // flex-direction: column;
  .returnLogo {
    position: relative;
    width: 26px;
    height: 26px;
    left: 21px;
    top: 9px;
  }
  .teamName {
    position: relative;
    width: 220px;
    height: 51px;
    margin: 0 auto;
    font-family: 'font2';
    font-size: 44px;
    font-weight: 900;
    line-height: 44.88px;
    color: #3E7366;
  }
  .teamMemberArea {
    width: 276px;
    height: 139px;

  }
  .addedTitle {
    position: relative;
    width: 103px;
    height: 20px;
    margin-left: 47px;
    font-family: 'font2';
    font-size: 20px;
    font-weight: 900;
    line-height: 20.4px;
    color: #3E7366;
  }

  
  .mapLogo {
    position: relative;
    width: 69px;
    height: 80.5px;
    margin: 0 auto;

  }
  button {
    position: relative;
    width: 200px;
    height: 49px;
    margin: 0 auto;
    // left: 50%;
    // transform: translateX(-50%);
    background: #3E7366;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 18px;
    line-height: 25.2px;
    // margin-top: 20px;
    border: none;
  }
  .promptMessage {
    position: relative;
    width: 236px;
    height: 25px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 25.2px;
  }
}

</style>