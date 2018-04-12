<template>
    <el-container class="container">
      <el-header class="header">
        <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
              </div>
                <img src="./logo.png" alt="">
              </el-col>
            <el-col :offset="16" :span="4">
              <div class="grid-content bg-purple">
              </div>
                  <a
                    href="#"
                    @click.prevent="logout">退出</a>
                </el-col>
         </el-row>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">Aside</el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('确认退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 当点击确认执行resolve函数
        // 1. 删除本地存储的Token身份标识
        window.localStorage.removeItem('admin-token')
        // 2. 跳转到登录视图
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => { // 当点击取消，执行reject函数
      })
    }
  }
}
</script>
<style>
.container {
  height: 100%;
}
.header {
  background-color: #B3C0D1;
  line-height: 60px;
}
.aside {
  background-color: #D3DCE6;
}
.main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>
