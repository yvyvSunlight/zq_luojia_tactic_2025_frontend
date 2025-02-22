<template>
    <div class="bg">
      <img src="@/assets/icons/returnLogo.svg" alt="" id="returnLogo" @click="handleBack">
      <div class="titleArea">
        <div class="title" id="title1">注册成为攻略者</div>
        <div class="title" id="title2">填写获得你的身份牌</div>
      </div>
    <img src="@/assets/icons/ring.png" alt="" class="ring">
    <div class="messageArea">
      <div class="black">
        <div class="pink"></div>
      </div>
      <img src="@/assets/icons/whu2.svg" id="whu2">
      <div class="message">
        <div class="messageTitle">队伍名称</div>
        <input
        ref="teamNameInputRef"
        v-model="teamName"
        placeholder="请输入队名，例：XX队"
        type="text">
      </div>
      <div class="optionArea">
        <div class="option">
          <input type="radio" id="one" value="One" v-model="picked" name="teamChoice"/>
          <label for="one">创建队伍</label>
        </div>
        <div class="option">
          <input type="radio" id="two" value="Two" v-model="picked" name="teamChoice"/>
          <label for="two">加入队伍</label>
        </div>
      </div>
      <div class="message">
        <div class="messageTitle">姓名</div>
        <input 
        ref="studentNameInputRef"
        v-model="studentName"
        placeholder="请输入你的真实姓名" 
        type="text">
      </div>
      <div class="message">
        <div class="messageTitle">学号</div>
        <input
        ref="studentNumberInputRef"
        v-model="studentNumber"
        placeholder="请输入你的学号"
        type="text">
      </div>
      <div class="message">
        <div class="messageTitle">学院</div>
        <input 
        ref="studentCollegeInputRef"
        v-model="studentCollege"
        placeholder="请输入你的学院"
        type="text">
      </div>
      <button @click="goToPreParePage">制作身份牌</button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp, createTeam, joinTeam, getTeamInfo } from '../api/api'
import { ElMessage } from 'element-plus'
/* eslint-disable-next-line no-unused-vars */
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
const studentCollegeInputRef = ref();
const studentNameInputRef = ref();
const studentNumberInputRef = ref();
const teamNameInputRef = ref();
const picked = ref();
const studentName = ref('');
const studentNumber = ref('');
const studentCollege = ref('');
const teamName = ref('');



const handleBack = () => {
  router.go(-1)
}
const goToPreParePage = () => {
  router.push('/prepare')
}

const refresh = () => {
  console.log('refresh')
};

onMounted(() => {
  console.log('mounted')
  refresh()
})
/* eslint-disable-next-line no-unused-vars */
function makeIdentityCard() {
  console.log("-----------------");
  
  console.log(studentName.value);
  console.log("显示输入的学号，姓名，学院，队伍名字，选择的是创建队伍还是加入队伍");
  console.log(studentNumber.value, studentName.value, studentCollege.value, teamName.value, picked.value);
  if(!(studentCollege.value && studentName.value && studentNumber.value && teamName.value && picked.value)) {
    ElMessage.error('请填写完整信息')
    return;
  }
  if (!/^20[12][890123]\d{9}$/.test(studentNumber.value)) {
    ElMessage.error('请输入正确的学号');
    return;
  }
  if (picked.value === 'One') {
    const res = signUp(studentName.value, studentNumber.value, studentCollege.value);
    console.log(res);
    if (res.code === 200) {
      console.log('sign up success');
      console.log(res);
      
      const res2 = createTeam(teamName.value, studentNumber.value);
      if (res2.code === 200) {
        ElMessage.success('队伍创建成功');
        goToPreParePage();
      } else {
        ElMessage.error(res2.msg);
      }
    } else {
      ElMessage.error(res.msg);
    }
  } else {
    const teamInfo = getTeamInfo(teamName.value);
    if (teamInfo.code !== 200) {
      ElMessage.error(teamInfo.msg);
      return;
    }

    const res = signUp(studentName.value, studentNumber.value, studentCollege.value);
    if (res.code === 200) {
      const res2 = joinTeam(teamName.value, studentNumber.value);
      if (res2.code === 200) {
        ElMessage.success('加入队伍成功');
        goToPreParePage();
      } else {
        ElMessage.error(res2.msg);
      }
    } else {
      ElMessage.error(res.msg);
    }
  } 
  
}





</script>

<style lang="less" scope>
@font-face {
  font-family: 'font2';
  src: url("../assets/fonts/font2.ttf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bg {
  position: relative;
  background: #71CBB4;
  width: 375px;
  height: 100vh;
  overflow: hidden;

  #returnLogo {
    width: 26px;
    height: 26px;
    margin: 10px 0 0 10px;
  }
  .titleArea {
    position: relative;
    width: 375px;
    height: 100px;
    z-index: 1;
    .title {
      font-family: 'font2';
      color: #3E7366;
      text-align: center;
    }
    #title1 {
      font-size: 40px;
      line-height: 40.8px;
    }
    #title2 {
      font-size: 36px;
      line-height: 36.72px;
    }
  }
  .ring {
    position: absolute;
    width: 609px;
    height: 403px;
    left: -112px;
    top: -193px;
    z-index: -1;
  }
  .messageArea {
    background-color: #FFFFFF;
    position: absolute;
    width: 375px;
    height: 564px;
    left: 0px;
    bottom: 0;
    // top: 203px;

    box-shadow: 5px -4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 40px 40px 0px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .optionArea {
      display: flex;
      justify-content: space-between;

      width: 270px;
      height: 25px;
      .option {
        width: 114px;
        height: 25px;
        display: flex;
        align-items: center;
        input {
          width: 19px;
          height: 19px;
          margin-right: 9px;
        }
        label {
          width: 83px;
          height: 25px;
        }
      }
    }
    // align-items: center;
    #whu2 {
      position: absolute;
      width: 78px;
      height: 78px;
      left: 261px;
      top: 25px;
    }
    .black {
      position: relative;
      width: 78px;
      height: 21px;
      background-color: #000000;
      border-radius: 5px;
      margin-top: 13px;
      margin-left: 30px;
      margin-right: 30px;
      margin-bottom: 44px;
      .pink {
        position: absolute;
        border-radius: 10px 10px 0 0;
        width: 58px;
        height: 67px;
        background: #FBB4D9;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }     
    }
    .message {
      width: 269px;
      height: 62px;
      // margin-left: 48px;
      // border-width: 1px;
      border-bottom: 1px solid #979797; 
      border-left: none;
      border-right: none; 
      border-top: none;
      .messageTitle {
        height: 25px;
        width: 121px;
        font-size: 18px;
        font-weight: 600;
        line-height: 25.2px;
      }
      input {
        width: 235px;
        height: 34px;
        border: none;
        font-weight: 400;
        font-size: 18px;
        line-height: 25.2px;
        margin-top: 6px;
        background-color: #00000000;
      }
      input:focus {
        outline: none;
      }
    }
    .message:first-of-type
    {
      height: 79px;
    }
    button {
      width: 169px;
      height: 49px;
      background-color: #3E7366;
      font-size: 18px;
      color: #FFFFFF;
      font-weight: 400;
      line-height: 25.2px;
      border-radius: 10px;
      border-style: none;
    }

  }
  z-index: 1;

}



</style>