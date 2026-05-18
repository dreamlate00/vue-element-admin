
import 'virtual:svg-icons-register';

import Vue from 'vue'
import App from './App.vue'
import router, { resetRouter } from './router';
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import GRUI from '../grui';
import './icons';

import directives from '@/directives';
import filters from '@/filters';
import haveApiRight from '@/utils/have-api-right';

import SvgIcon from '@/components/SvgIcon/index.vue';
// Vue.component('SvgIcon', SvgIcon);

import {
  getRoutes
} from '@/api/role';

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


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock');
//   mockXHR();
// }


Vue.config.productionTip = false;
Vue.prototype.haveApiRight = haveApiRight;

let whiteList = ['login'];

router.beforeEach(async (to, from, next) => {

  console.info(to)

  if (whiteList.indexOf(to.name) > -1) {
    store.dispatch('app/setLayoutLoadig', false);
    next();
    return;
  }

  if (store.state.permission.routes.length === 0) {
    store.dispatch('app/setLayoutLoadig', true);
    let menus = await getRoutes();
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    let accessRoutes = await store.dispatch('permission/generateRoutes', menus["info"]);
    
    resetRouter(accessRoutes);

    store.dispatch('app/setLayoutLoadig', false);

    next({...to,replace: true});
    return;
  }
  next();
});


new Vue({
  router,
  store,
  data() {
    return {
      eventHub: new Vue()
    }
  },
  render: h => h(App)
}).$mount('#app')