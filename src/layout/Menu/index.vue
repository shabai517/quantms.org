<template>
  <div>
    <el-image style="width: 160px; margin: 30px 0" :src="nfCoreLogo" fit="fill" />
  <el-menu active-text-color="#ffd04b" background-color="#4B8F73" class="el-menu-vertical-demo" default-active="1" text-color="#fff" router unique-opened>
    <el-menu-item index="/home">
      <span>Introduction</span>
    </el-menu-item>
    <el-menu-item index="/information">
      <span>Datasets</span>
    </el-menu-item>
    <el-menu-item index="/ae">
      <span>Visualization</span>
    </el-menu-item>
  </el-menu>
  </div>

</template>

<script setup>
import nfCoreLogo from '@/assets/images/nf-core-quantms_logo_light.png'
</script>

<style lang="scss" scoped>
.el-menu-item {
  width: 200px;
}
.el-menu-item span {
  text-align: center;
  font-size: 16px;
  color: #11202c;
  margin-left: 20px;
}
</style>
