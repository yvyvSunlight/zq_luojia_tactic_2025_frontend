<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getTeamInfo, recordStartTime, getStartTime, putTeamPosition, collectReserveTime } from '@/api/api'
import QrScanner from '../components/QRScanner.vue';
import { ElMessage } from 'element-plus';
const themeVars = {
  pickerTitleFontSize: '20px',
  pickerActionFontSize: '20px',
  pickerOptionFontSize: '20px',
  pickerConfirmActionColor: '#3E7366', // 设置你想要的颜色
  dialogBackground: '#fff0f0',
  buttonDefaultBackground: '#fff0f0',
  buttonPrimaryBackground: '#fff0f0',
}
const isBegin = ref(false)
const router = useRouter()
const teamMembers = ref([])
const teamName = ref('')
const wrongPosition = ref(false)


const goBack = () => {
  router.go(-1)
}
const gotoPlay = () => {
  router.push('/playing')
}

const gotoPlayingPage = () => {
  let res = getStartTime(localStorage.getItem('team_id'))   // 拿到队伍的开始时间
  let start_time = res.start_time                           // 拿到队伍的开始时间
  if(start_time) {
    router.push('/playing')                                 // 如果有开始时间，就直接进入打卡界面
    return             
  }
  showQrCodeReader.value = true                             // 如果没有开始时间，就弹出扫码界面
}

const fetchTeamMembers = async () => {
  try {

    const team_id = localStorage.getItem('team_id')
    const res = await getTeamInfo(team_id)              // 拿到队员信息 队伍名
    teamMembers.value = res.members
    teamName.value = res.name
    localStorage.setItem('team_name', res.name)         // 存储队伍名 （option）
    const res2 = await getStartTime(team_id)            // 拿到队伍的开始时间
    if (res2[team_id-1].start_time) {
      isBegin.value = true                              // 如果有开始时间，button就可以进入打卡界面
      localStorage.setItem('start_time', res2[team_id-1].start_time) 
    }
  } catch (error) {
    console.log("Error fetching team members:",error)
    ElMessage.error('获取队伍信息失败')
  }
}

onMounted(() => {
  fetchTeamMembers()

})

const memberImage = (index) => {
  return teamMembers.value[index - 1] ? require('@/assets/icons/member.svg') : require('@/assets/icons/memberNone.svg');
};


 
const showQrCodeReader = ref(false)

 
const onDecodeHandler = async (data) => {
  console.log('onDecodeHandler', data)  
  
  showQrCodeReader.value = false
  if(data === "guicao_sysy") {
    // 如果解码结果是 guicao_sysy 则进入打卡界面
    const start_time = new Date()                                  // 拿到现在的起始时间
    const team_id = localStorage.getItem('team_id')                 // 拿到队伍id

    putTeamPosition(team_id, "guicao")                             // 更新队伍位置

    let res = await getStartTime(team_id)                          // 拿到队伍的开始时间 应该是没有的（没用）（可用于debug） 如果有开始时间则不会进入解码
    console.log("getStartTime api拿到的res.start_time:",res.start_time)  // debug

    recordStartTime(team_id, start_time)                            // 记录起始时间
    router.push('/playing')                                         // 进入打卡界面
  } else {
    wrongPosition.value = true                                     // 如果解码结果不是 guicao_sysy 则弹出提示框
  }
   
}
const qrReaderClose = () => {
  showQrCodeReader.value = false
}

const columns = [
      [
        { text: '周六', value: '周六' },
      ],
      [
        { text: '09:00-11:00', value: '09:00-11:00' },
        { text: '10:00-12:00', value: '10:00-12:00' },
        { text: '11:00-13:00', value: '11:00-13:00' },
        { text: '12:00-14:00', value: '12:00-14:00' },
        { text: '13:00-15:00', value: '13:00-15:00' },
        { text: '14:00-16:00', value: '14:00-16:00' },
        { text: '15:00-17:00', value: '15:00-17:00' },
        { text: '16:00-18:00', value: '16:00-18:00' },
        { text: '17:00-19:00', value: '17:00-19:00' },
      ],
    ];


// 控制弹出层显示
const showPicker = ref(false);

// 双向绑定选中值
const selectedValues = ref(['周六', '09:00-11:00']);

// 确认选择
const onConfirm = async () => {
  showPicker.value = false;
  try {
    const team_id = localStorage.getItem('team_id')
    const reserve_start_time = "2025-03-15 "+selectedValues.value[1].substring(0,5)
    console.log("reserve_time:",reserve_start_time)
    await collectReserveTime(team_id, reserve_start_time)
    ElMessage.success('预约成功');
  } catch (error) {
    ElMessage.error('预约失败：', error);
  }
};

const bookTime = () => {
  showPicker.value = true;
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
   
      <div class="bookArea" @click="bookTime">
        <text>
          {{ selectedValues[0] }} 
        </text>
        <text>
          {{ selectedValues[1] }}
        </text>
        <img src="@/assets/icons/open.png" alt="" class="open">
      </div>


      <img src="@/assets/icons/mapLogo.svg" alt="" class="mapLogo">
      <button @click="gotoPlay" v-if="isBegin">进入打卡界面</button>
      <button @click="gotoPlayingPage" v-else>到点了，扫码出发！</button>
        <QrScanner v-if="showQrCodeReader" @decode="onDecodeHandler" @close="qrReaderClose"></QrScanner>
      <div class="promptMessage">注：扫码后即计时开始！</div>

  <div class="container">
    <van-config-provider :theme-vars="themeVars">
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
          v-model="selectedValues"
          :columns="columns"
          title="请选择"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          option-height="54px"
          visible-option-num="5"
        />
      </van-popup>
    </van-config-provider>
  </div>
  <van-dialog v-model:show="wrongPosition" title="" confirm-button-color="#000">
          <div class="myDialog">
            <img src="@/assets/icons/cherry2.svg" alt=""> 
            <div class="title">攻略提示</div>  
            <div class="content">
              <div>不是这里！</div>
              <div>请攻略者前往正确点位</div>
            </div>
          </div>
        </van-dialog>

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

.myDialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  img {
    width: 40px;
    height: 40px;
    margin: 20px auto;
  }
  .title {
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: -0.41px;
    text-align: center;
  }
  .content {
    div {
      margin: 5px;
    }
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: -0.41px;
    text-align: center;
    margin: 30px auto;
  }
}

.open {
  width: 26px;
  height: 26px;
}
.bg {
  .returnLogo {
    position: relative;
    width: 26px;
    height: 26px;
    left: 10px;
    top: 10px;
    z-index: 10;
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
    width: 290px;
    height: 139px;
    margin: 30px auto;
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
    width: 260px;
    height: 39px;
    margin: 21px auto;
    justify-content: space-evenly;
    align-items: center;
    text {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 24px;
      line-height: 100%;
      letter-spacing: -0.41px;
    }
  }
  
  .mapLogo {
    position: relative;
    width: 69px;
    height: 80.5px;
    margin: 30px auto;
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