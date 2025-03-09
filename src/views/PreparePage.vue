<script setup>
import { useRouter } from 'vue-router'
// import axios from 'axios'
import { ref, onMounted } from 'vue'
import { getTeamInfo } from '@/api/api'
import QRCodeScanner from '../components/QRCodeScanner.vue';
// import { get } from 'core-js/core/dict'
const value = ref('')
const router = useRouter()
const teamMembers = ref([])
const teamName = ref('')
teamName.value = localStorage.getItem('team_name')
console.log("teamName:",teamName.value)
const goBack = () => {
  router.go(-1)
}
const gotoPlayingPage = () => {
  router.push('/playing')
}

const fetchTeamMembers = async () => {
  try {
    const team_id = localStorage.getItem('team_id')
    const res = await getTeamInfo(team_id)
    teamMembers.value = res.members
    console.log("res:",res)
  } catch (error) {
    console.log("Error fetching team members:",error)
  }
}
const scanResult = ref(null);

const handleScanResult = (result) => {
  scanResult.value = result;
  console.log('Scan result:', scanResult.value);
};

onMounted(() => {
  fetchTeamMembers()
})

const memberImage = (index) => {
  return teamMembers.value[index - 1] ? require('@/assets/icons/member.svg') : require('@/assets/icons/memberNone.svg');
};

</script>
<template>
    <div class="bg">
      <img src="@/assets/icons/returnLogo.svg" alt="" class="returnLogo" @click="goBack">
      <div class="teamName">
        {{ teamName }}
      </div>
      <div class="teamMemberArea">
        <div v-for="index in 4" :key="index" class="teamMember">
          <img :src="memberImage(index)" alt="" class="memberImage">
          <div class="memberName">
            {{ teamMembers[index - 1] ? teamMembers[index - 1].name : '--' }}
          </div>
        </div>
      </div>
      <div class="addedTitle">预约出发：</div>
   
      <div class="bookArea">
        <text>周六</text>
        <el-time-select
          v-model="value"
          style="width: 200px; height: 34px;"
          start="08:00"
          step="01:00"
          end="19:00"
          placeholder="Select time"
          format="hh:mm A"
        />
      </div>


      <img src="@/assets/icons/mapLogo.svg" alt="" class="mapLogo">
      <button @click="gotoPlayingPage">到点了，扫码出发！</button>
      <QRCodeScanner @scan-result="handleScanResult" />
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
  .returnLogo {
    position: relative;
    width: 26px;
    height: 26px;
    left: 21px;
    top: 20px;
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
    margin-top: 37px;
    margin-left: 78px;
    // padding: auto, auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .teamMemberArea {
    width: 276px;
    height: 139px;
    margin: 26px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: space-evenly;
    .teamMember {
      width: 125px;
      height: 52px;
      display: flex;
      justify-content: space-evenly;
      align-items: space-evenly;
      .memberImage {
        width: 52px;
        height: 52px;
      }
      .memberName {
        width: 78px;
        display: flex;
        justify-content: center;
        align-items: center;



        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        letter-spacing: -0.408px;

        color: #000000;



      }
    }

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

  .bookArea {
    position:relative;
    display: flex;
    width: 288px;
    height: 39px;
    margin: 21px auto;
    justify-content: space-evenly;
    // text {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: -0.41px;
    // }
  }
  
  .mapLogo {
    position: relative;
    width: 69px;
    height: 80.5px;
    margin: 15px auto;
  }
  button {
    position: relative;
    width: 200px;
    height: 49px;
    margin: 21.5px auto;
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