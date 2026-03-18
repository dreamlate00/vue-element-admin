import store from '@store';
let apis = store.state.permission.routeApis;

// const haveApiRight = (pathName, apiUrl) => {
//   let pathApis = apis[pathName];
//   if (pathApis && pathApis[0]) {
//     if (pathApis.includes('*')) {
//       return true;
//     }
//     return pathApis.includes(apiUrl);
//   }
//   return false;
// };

const haveApiRight = (pathName, apiUrl) => {
  return true;
};

export default haveApiRight;
