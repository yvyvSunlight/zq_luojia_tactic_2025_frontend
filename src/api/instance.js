import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://121.36.231.2:8080/v6' : 'http://121.36.231.2:8080/v6';
// 区分生产环境和开发环境


// 创建一个axios实例 并导出
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  withCredentials: true,
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log('打印响应体');
    console.log(response);
    if (!response.data.Code) {
      if (response.data.detail) {
        ElMessage.error(response.data.detail);
      }
    } else if (response.data.Code !== 200) {
      ElMessage.error(response.data.message);
    }
    return response.data;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      // 请求超时
      console.log(error)
      ElMessage.error('请求超时！请检查网络状况！');
    } else if (!error.response) {
      // 没有响应的情况
      console.log('没有响应');
      ElMessage.error('请求失败，没有响应');
    } 
    return Promise.reject(error);
  },
);
