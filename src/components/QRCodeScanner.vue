<template>
    <div class="qrcode-scanner">
      <button @click="startScan">点击扫描二维码</button>
      <qrcode-stream
        ref="qrcodeStream"
        @decode="onDecode"
        @init="onInit"
        v-show="isScanning"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  
  // 定义响应式变量
  const qrcodeStream = ref(null);
  const scanResult = ref('');
  const isScanning = ref(false);
  
  // 定义暴露的扫描结果
  defineExpose({
    scanResult
  });
  
  // 开始扫描
  const startScan = () => {
    isScanning.value = true;
  };
  
  // 停止扫描
  const stopScan = () => {
    if (qrcodeStream.value) {
      qrcodeStream.value.stop();
    }
    isScanning.value = false;
  };
  
  // 处理解码结果
  const onDecode = (result) => {
    scanResult.value = result;
    stopScan();
  };
  
  // 处理初始化错误
  const onInit = (promise) => {
    promise.catch((error) => {
      if (error.name === 'NotAllowedError') {
        console.error('需要授予摄像头访问权限');
      } else if (error.name === 'NotFoundError') {
        console.error('此设备上没有摄像头');
      } else if (error.name === 'NotSupportedError') {
        console.error('需要安全上下文（HTTPS 或 localhost）');
      } else if (error.name === 'NotReadableError') {
        console.error('摄像头可能已被占用');
      } else if (error.name === 'OverconstrainedError') {
        console.error('摄像头不支持约束条件');
      } else if (error.name === 'StreamApiNotSupportedError') {
        console.error('此浏览器不支持流 API');
      } else if (error.name === 'InsecureContextError') {
        console.error('摄像头只能在安全环境下使用。使用 HTTPS 或 localhost');
      } else {
        console.error(`摄像头错误 (${error.name})`);
      }
    });
  };
  
  // 组件销毁前停止扫描
  onBeforeUnmount(() => {
    stopScan();
  });
  </script>
  
  <style scoped>
  .qrcode-scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  button:hover {
    background-color: #2c8e63;
  }
  </style>