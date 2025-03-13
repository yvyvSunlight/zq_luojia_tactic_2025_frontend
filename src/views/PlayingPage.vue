<template>
    <div class="bg">
      <img src="@/assets/icons/homeWave1.svg" id="wave1" v-if="isSuccess">
      <img src="@/assets/icons/homeWave2.svg" id="wave2" v-if="isSuccess">
      <img src="@/assets/icons/returnLogo.svg" alt="" class="returnLogo" @click="goBack">
      <img src="@/assets/icons/clock.svg" alt="" class="clock">
      <!-- 计时器实现 -->
      <div class="timeArea">
        <!-- <div class="time">00:00:00</div> -->
        <TimeCounter ref="timeCounter"/>
      </div>
      <div v-if="isSuccess" class="success">攻略成功!</div>
      <button @click="scanQRCode" v-else>扫码打卡点位</button>

      <QrScanner v-if="showQrCodeReader" @decode="onDecodeHandler" @close="qrReaderClose"></QrScanner>
      <van-config-provider :theme-vars="themeVars">
        <van-dialog v-model:show="rightPosition" title="" confirm-button-color="#000">
          <div class="myDialog">
            <img src="@/assets/icons/cherry1.svg" alt=""> 
            <div class="title">攻略提示</div>  
            <div class="content">恭喜玩家攻略该点位！</div>
          </div>
        </van-dialog>
        <van-dialog v-model:show="repeatPosition" title="" confirm-button-color="#000">
          <div class="myDialog">
            <img src="@/assets/icons/cherry2.svg" alt=""> 
            <div class="title">攻略提示</div>  
            <div class="content">你已经打过卡了！</div>
          </div>
        </van-dialog>
        <van-dialog v-model:show="noneQrCode" title="" confirm-button-color="#000">
          <div class="myDialog">
            <img src="@/assets/icons/cherry2.svg" alt=""> 
            <div class="title">攻略提示</div>  
            <div class="content">无效二维码</div>
          </div>
        </van-dialog>
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
        <van-dialog v-model:show="terminalPosition" title="" confirm-button-color="#000">
          <div class="myDialog">
            <img src="@/assets/icons/cherry1.svg" alt=""> 
            <div class="title">攻略提示</div>  
            <div class="content">
              <div>
                抵达终点！
              </div>
              <div>
                恭喜攻略者通关成功！
              </div>
            </div>
          </div>
        </van-dialog>

      </van-config-provider>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TimeCounter from '../components/TimeCounter.vue'
import QrScanner from '../components/QRScanner.vue'
import { getTeamPosition, putTeamPosition, putEndTime, getEndTime } from '@/api/api'
const rightPosition = ref(false)
const wrongPosition = ref(false)
const repeatPosition = ref(false)
const terminalPosition = ref(false)
const noneQrCode = ref(false)
const isSuccess = ref(false)
const showQrCodeReader = ref(false)
const timeCounter = ref(null)
const router = useRouter()
const goBack = () => {
  router.go(-1)
}
const scanQRCode = () => {
  console.log('scanQRCode')
  showQrCodeReader.value = true
}
const themeVars = {
      dialogBackground: '#fff0f0',
      buttonDefaultBackground: '#fff0f0',
      buttonPrimaryBackground: '#fff0f0',
    };


const onDecodeHandler = async (data) => {
  console.log('onDecodeHandler', data)
  const team_id = localStorage.getItem('team_id')
  const res = await getTeamPosition(team_id)
  const last_position = res.position
  console.log("last_position:",last_position)
  if (data === "guicao_sysy") {
    if (last_position === "guicao") {
      repeatPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "kunpeng_2c2a") {
    if (last_position === "kunpeng") {
     repeatPosition.value = true
    } else if (last_position === "guicao") {
      putTeamPosition(team_id, "kunpeng")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "guiyuan_lyly") {
    if(last_position === "guiyuan") {
      repeatPosition.value = true
    } else if (last_position === "guicao") {
      putTeamPosition(team_id, "guiyuan")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "meicao_9d3a") {
    if (last_position === "meicao") {
      repeatPosition.value = true
    } else if (last_position === "kunpeng") {
      putTeamPosition(team_id, "meicao")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "wanlin_4a5c") {
    if (last_position === "wanlin") {
      repeatPosition.value = true
    } else if (last_position === "guiyuan") {
      putTeamPosition(team_id, "wanlin")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "dachuang_3e7d") {
    if (last_position === "dachuang") {
      repeatPosition.value = true
    } else if (last_position === "meicao") {
      putTeamPosition(team_id, "dachuang")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "xinli_1a3b") {
    if (last_position === "xinli") {
      repeatPosition.value = true
    } else if (last_position === "meicao") {
      putTeamPosition(team_id, "xinli")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "xinghu_5f6c") {
    if (last_position === "xinghu_5f6c") {
      repeatPosition.value = true
    } else if (last_position === "wanlin") {
      putTeamPosition(team_id, "xinghu")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "youyi_7d8e") {
    if (last_position === "youyi") {
      repeatPosition.value = true
    } else if (last_position === "wanlin") {
      putTeamPosition(team_id, "youyi")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "gongcao_9a1b") {
    if (last_position === "gongcao") {
      repeatPosition.value = true
    } else if (last_position === "dachuang"
      || last_position === "xinli"
    ) {
      putTeamPosition(team_id, "gongcao")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "xincao_3c4d") {
    if (last_position === "xincao_3c4d") {
      repeatPosition.value = true
    } else if (last_position === "xinghu"
      || last_position === "youyi") {
      putTeamPosition(team_id, "xincao")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "hubin_5e6f") {
    if (last_position === "hubin") {
      repeatPosition.value = true
    } else if (last_position === "gongcao") {
      putTeamPosition(team_id, "hubin")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "gongzhu_7a8b") {
    if (last_position === "gongzhu") {
      repeatPosition.value = true
    } else if (last_position === "gongcao") {
      putTeamPosition(team_id, "gongzhu")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "paifang_9c1d") {
    if (last_position === "paifang") {
      repeatPosition.value = true
    } else if (last_position === "xincao") {
      putTeamPosition(team_id, "paifang")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "luojia_2e3f") {
    if (last_position === "luojia") {
      repeatPosition.value = true
    } else if (last_position === "xincao") {
      putTeamPosition(team_id, "luojia")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }
  } else if (data === "jiaowu_4a5b") {
    if (last_position === "jiaowu") {
      repeatPosition.value = true
    } else if (last_position === "hubin"
      || last_position === "paifang"
    ) {
      putTeamPosition(team_id, "jiaowu")
      rightPosition.value = true
    } else {
      wrongPosition.value = true
    }

  } else if (data === "jiuyier_6c7d") {
      if (last_position === "jiuyier") {
        repeatPosition.value = true
      } else if (last_position === "gongzhu"
        || last_position === "luojia"
        || last_position === "jiaowu"
      ) {
        putTeamPosition(team_id, "jiuyier")
        terminalPosition.value = true
        isSuccess.value = true
        const end_time = new Date()
        const res = await putEndTime(team_id, end_time)
        console.log("putEndTime api拿到的res:",res)
        localStorage.setItem('end_time', end_time)   // 保存结束时间
        timeCounter.value.pauseTimer();
      } else {
        wrongPosition.value = true
      }
  } else {
    noneQrCode.value = true
  }


  showQrCodeReader.value = false
   
}

const qrReaderClose = () => {
  showQrCodeReader.value = false
}

const judgeSuccess = async () => {
  const team_id = localStorage.getItem('team_id')
  const res = await getEndTime(localStorage.getItem('team_id'))
  console.log("getEndTime api拿到的res:",res)
  const end_time = res[team_id-1].end_time
  if (end_time) {
    isSuccess.value = true
  }
}

onMounted(() => {
  console.log('mounted prepare page')
  judgeSuccess()
})


</script>

<style lang="less" scoped>
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
    
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: -0.41px;
    text-align: center;
    margin: 30px auto;
  }
}


#wave1 {
      position: absolute;
      width: 303px;
      height: auto;
      left: 72px;
      top: -57px;
    }
#wave2 {
      position: absolute;
      left: -29px;
      width: 394px;
      height: 394px;
      top: 54.06%;
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
    left: 10px;
    top: 10px;
  }
  .clock {
    width: 107px;
    height: 107px;
    margin: 0 auto;
  }
  .timeArea {
    width: 226px;
    height: 55px;
    background: #0000;
  }
  .success {
    width: 189px;
    height: 50px;
    color: #fff;
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 36px;
    line-height: 100%;
    letter-spacing: -0.41px;
    text-align: center;
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