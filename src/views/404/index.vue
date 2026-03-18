<template>
  <div class="not-found">
    <div class="not-found-content">
      <el-result
        icon="warning"
        title="404"
        sub-title="抱歉，您访问的页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="goHome">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;

  .not-found-content {
    text-align: center;
  }
}
</style>