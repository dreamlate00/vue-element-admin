<template>
  <div class="route-list-container">
    <h2>当前项目已注册的路由列表</h2>
    <ul>
      <li v-for="(route, index) in allRoutes" :key="index" class="route-item">
        <!-- 显示路由路径，使用 router-link 实现点击跳转 -->
        <router-link :to="route.path" v-if="route.path">{{ route.path }}</router-link>
        <span v-else style="color: #999;">(无路径/重定向)</span>
        
        <!-- 显示路由名称 -->
        <span class="route-name" v-if="route.name">[名称: {{ route.name }}]</span>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'RouteList',
  data() {
    return {
      // 直接从 $router.options.routes 获取所有注册的路由数组
      allRoutes: this.$router.options.routes
    }
  },
    mounted(){
      console.info(this.$router)
    }
}
</script>

<style scoped>
.route-list-container {
  padding: 20px;
}
.route-item {
  margin: 10px 0;
  font-size: 16px;
}
.route-name {
  margin-left: 15px;
  color: #42b983;
  font-size: 14px;
}
a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  color: #42b983;
  text-decoration: underline;
}
</style>