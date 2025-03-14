<template>
    <div class="bg">
      <img src="@/assets/icons/homeWave1.svg" id="wave1">
      <img src="@/assets/icons/homeCherry.svg" id="cherry">
        <img src="@/assets/icons/homeTitle.png" id="title">
        <button @click="goToSignUpPage" v-if="haveTeam">
          继续游戏
          <img src="@/assets/icons/flag.svg" id="flag">
        </button >
        <button @click="goToSignUpPage" v-else>
          新人报名
          <img src="@/assets/icons/flag.svg" id="flag">
        </button>
      <img src="@/assets/icons/homeWave2.svg" id="wave2">
      <div class="authorArea">
        <img src="@/assets/icons/whu1.svg" id="whu1">
        <img src="@/assets/icons/zqLogo.svg" id="zqLogo">
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const haveTeam = ref(false)
console.log('home page')
const router = useRouter()
const goToSignUpPage = () => {
  if (haveTeam.value) {
    router.push('/prepare')
  } else {
    router.push('/signUp')
  }
}
  
onMounted(() => {
  const team_id = localStorage.getItem('team_id')
  if (team_id) {
    haveTeam.value = true
  }
  console.log('home page mounted')
})

</script>
  
<style lang="less" scoped>
@font-face {
  font-family: 'font1';
  src: url("../assets/fonts/font1.ttf");
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .bg {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #71CBB4;
    overflow: hidden;
    z-index: 1;
    #wave1 {
      position: absolute;
      width: 303px;
      height: auto;
      left: 72px;
      top: -57px;
    }
    
      #title {
        width: 348px;
        height: auto;
        position: absolute;
        left: 14px;
        top:275px;
        z-index:2;
      }
      button {
        width: 194px;
        height: 58px;
        position: absolute;
        left: 96px;
        top:407px;
        background-color: #00000000;
        border-radius: 10px;
        border-style: none;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        font-family: 'font1';
        color:#3E7366;
        z-index: 1;
        #flag {
          width: 41px;
          height: auto;
        }
      }
    
    #cherry {
      position: absolute;
      left: 32px;
      top: 98px;
      width: 173px;
      height: auto;
    }
    #wave2 {
      position: absolute;
      left: -29px;
      width: 394px;
      height: 394px;
      top: 54.06%;
    }
    .authorArea {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10vh;
      #whu1 {
        width: 148px;
        height: auto;
      }
      #zqLogo {
        width: 102px;
        height: auto;
        margin-left: 30px;
      }
  
    }
  }
</style>
