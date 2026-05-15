import { asyncRoutes, constantRoutes } from '@/router'
import { AFFIX_ROUTES, APPEND_ROUTES,layout, GetComponent } from '@src/router';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  // 解析菜单
  // 没有子级，也没有配置权限的菜单都不加载
  routes.forEach(route => {
    const tmp = { ...route };
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children);
    }
    if (typeof tmp.component === 'string') {
      if (tmp.component === 'layout') {
        tmp.component = layout;
      } else {
        tmp.component = GetComponent(tmp.component);
        // const componentPath = tmp.component.replace(/^(\/\w+)$/, '$1/index')
        // const path = '@/views/'+componentPath+'.vue'
        // tmp.component = () => import(path)
      }
    }

    res.push(tmp);
  });
  return res;

}

const state = {
  routes: [],
  addRoutes: [],
  routeApis: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(AFFIX_ROUTES.concat(routes).concat(APPEND_ROUTES));
      commit('SET_ROUTES', routes);
      genRouteApis(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

function genRouteApis(list) {
  for (let i in list) {
    var data = list[i];
    if (data.children) {
      genRouteApis(data.children);
    }
    state.routeApis[data.name] = data.apis || [];
  }
}

// const actions = {
//   generateRoutes({ commit }, roles) {
//     console.log(roles)
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
