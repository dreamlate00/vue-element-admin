import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';

// ===============================旧的

// const constantRoutes = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index.vue'),
//     name: 'login',
//     meta: {
//       title: 'NotFound',
//       noCache: true,
//       noTag: true
//     },
//     hidden: true
//   }
//   , {
//     path: '/',
//     component: Layout,
//     name: 'layout',
//     meta: {
//       affix: true,
//       icon: 'el-icon-s-home',
//       title: '首页'
//     },
//     children: [{
//       path: '/',
//       component: () => import('@/views/dashboard/index.vue'),
//       name: 'index',
//       meta: {
//         affix: true,
//         title: '首页',
//         icon: 'el-icon-s-home'
//       },
//       apis: ['*']
//     }],
//     hidden: true
//   }
// ];

// 匹配不到路由进入默认页面
// var asyncRoutes = [
// ];

// ===============================


/* Layout */


/* Router Modules */
import componentsRouter from './modules/components';
import chartsRouter from './modules/charts';
import tableRouter from './modules/table';
import nestedRouter from './modules/nested';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
  {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
        },
        {
          path: 'routes',
          component: () => import('@/views/routes/index.vue'),
          name: 'routes',
          meta: { title: 'routes', icon: 'dashboard', affix: false },
        },
        {
          path: 'icons',
          component: () => import('@/views/icons/index.vue'),
          name: 'icons',
          meta: { title: 'icons', icon: 'icon', affix: false },
        },
      ]
    },  
  //   {
  //   path: '/auth',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/forbbiden',
  //       name: 'forbbiden',
  //       component: () => import('@/views/error-page/403.vue'),
  //       meta: {
  //         title: 'Forbidden',
  //         noCache: true,
  //         noTag: true
  //       },
  //       hidden: true,
  //       apis: ['*']
  //     }, {
  //       path: '/*',
  //       name: 'notfound',
  //       component: () => import('@/views/error-page/404.vue'),
  //       meta: {
  //         title: 'NotFound',
  //         noCache: true,
  //         noTag: true
  //       },
  //       hidden: true,
  //       apis: ['*']
  //     }]
  // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //     alwaysShow: true,
    //     name: 'dev',
    //     meta: { title: 'Zip', icon: 'zip' },
    //     path: '/',
    //     component: Layout,
    //     redirect: '/dashboard',
    //     children: [
    //         {
    //             path: 'dashboard',
    //             component: () => import('@/views/dashboard/index.vue'),
    //             name: 'Dashboard',
    //             meta: { title: 'Dashboard', icon: 'el-icon-menu', affix: true },
    //         },
    //         {
    //             path: 'routes',
    //             component: () => import('@/views/routes/index.vue'),
    //             name: 'routes',
    //             meta: { title: 'routes', icon: 'el-icon-menu', affix: false },
    //         },
    //     ]
    // }
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'], // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'], // or you can only set roles in sub nav
  //       },
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission',
  //         // if do not set roles, means: this page does not require permission
  //       },
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin'],
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true },
  //     },
  //   ],
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help',
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' },
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' },
  //     },
  //   ],
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' },
  //     },
  //   ],
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404',
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true },
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true },
  //     },
  //   ],
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' },
  //     },
  //   ],
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel',
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' },
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' },
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' },
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' },
  //     },
  //   ],
  // },

//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     alwaysShow: true,
//     name: 'Zip',
//     meta: { title: 'Zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: () => import('@/views/zip/index'),
//         name: 'ExportZip',
//         meta: { title: 'Export Zip' },
//       },
//     ],
//   },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' },
  //     },
  //   ],
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true,
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' },
  //     },
  //   ],
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' },
  //     },
  //   ],
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' },
  //     },
  //   ],
  // },
  {
    path: '/auth',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/forbbiden',
        name: 'forbbiden',
        component: () => import('@/views/error-page/403.vue'),
        meta: {
          title: 'Forbidden',
          noCache: true,
          noTag: true
        },
        hidden: true,
        apis: ['*']
      }, {
        path: '/*',
        name: 'notfound',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          title: 'NotFound',
          noCache: true,
          noTag: true
        },
        hidden: true,
        apis: ['*']
      }]
  },
  // // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = (routes) => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});

const router = createRouter(constantRoutes);

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(routes) {
  console.dir(routes)
  // const newRouter = createRouter(routes);
  // router.matcher = newRouter.matcher; // reset router
  router.addRoutes(routes)
}


// 1. 扫描 views 目录下所有的 .vue 文件
const modules = import.meta.glob('../views/**/*.vue')

// 2. 封装一个根据路径获取组件的函数
// 假设访问路径是 /user/list，我们尝试去匹配 ./views/user/list.vue
const getComponent = (path) => {
// console.info(path)
// 正则解释：
  // ^ 表示字符串开头
  // (\/\w+) 捕获组：匹配一个斜杠 / 加上一个或多个字母、数字或下划线
  // $ 表示字符串结尾
  path = path.replace(/^(\/\w+)$/, '$1/index')
  // 去掉开头的 '/'，并拼接成 Vite glob 扫描的相对路径格式
  const filePath = `../views/${path}.vue`
  // 如果路径是 /home，尝试匹配 ./views/home.vue；如果是 /user/list，尝试匹配 ./views/user/list.vue
  if(!modules[filePath]){
    console.error(`Component not found: ${filePath}`)
  }
  return modules[filePath]
}

export default router;
export const AFFIX_ROUTES = constantRoutes;
export const APPEND_ROUTES = asyncRoutes;
export const GetComponent = getComponent;
export const layout = Layout;