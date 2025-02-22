import { useRoute } from 'vue-router';

/**
 * description: 解析ID
 */
export const parseId = (id) => {
  return {
    line: id ? id % 1997 : 0,
    level: id ? (id % 6997) / 10 : 0,
  };
};

/**
 * description: 获取URl参数
 */
export const getUrlId = () => {
  return parseInt(useRoute().query.id ?? 0);
};
