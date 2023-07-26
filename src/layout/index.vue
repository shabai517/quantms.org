<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <el-affix>
          <Menu />
        </el-affix>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-footer class="footer">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Menu from './Menu'
import Footer from './Footer'
</script>
<style lang="scss" scoped>
.aside {
  margin-left: 10px;
  height: 2500px;
  background-color: #4b8f73;
}
.footer {
  border-top: 1px solid #ebecee;
}
</style>
