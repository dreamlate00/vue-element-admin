// src/utils/map-register.js (或者直接在 main.js / 组件中)
import * as echarts from 'echarts';
// Vite 中引入 json 文件需要断言类型
import guangdongMap from '@/assets/json/map/guangdong.json'; 

export function registerGuangdongMap() {
  // 注册地图，名称设为 '广东' (自定义，后面配置要用到这个名称)
  echarts.registerMap('广东', guangdongMap);
}