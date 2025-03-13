import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.luojiatactic.ziqiang.net.cn' : 'http://127.0.0.1:8000/v6';
// 区分生产环境和开发环境


// 创建一个axios实例 并导出
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  withCredentials: true,
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (!response.data.Code) {
      if (response.data.detail) {
        ElMessage.error(response.data.detail);
      }
    } else if (response.data.Code !== 200) {
      ElMessage.error(response.data.message);
      // console.log('打印响应体');
      // console.log(response);
      // return response;
    }
    return response.data;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      // 请求超时
      ElMessage.error('请求超时！请检查网络状况！');
    }
    // if (error.response) {
    //   if (error.response.data.message) {
    //     if (error.response.data.message !== '打过卡了，快走') {
    //       ElMessage.error(error.response.data.message);
    //     }
    //   } else {
    //     ElMessage.error(error.response.status + '未知错误！请稍等或联系工作人员！');
    //   }
    // }
    // console.log('打印错误');
    // console.log(error);
    // console.log(error.response)
    return Promise.reject(error);
  },
);
