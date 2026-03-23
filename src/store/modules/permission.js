import { asyncRoutes, constantRoutes } from '@/router'
import { AFFIX_ROUTES, APPEND_ROUTES } from '@src/router';
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
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
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
