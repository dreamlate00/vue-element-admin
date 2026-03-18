import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import GRUI from '../grui';

import directives from '@/directives';
import filters from '@/filters';
import haveApiRight from '@/utils/have-api-right';

Vue.use(filters);
// Vue.use(plugins);
Vue.use(directives);

//  交互组件size全局设置为small
Vue.use(GRUI, {
  size: 'mini'
});

Vue.use(ElementUI, {
  size: 'mini'
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')