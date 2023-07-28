<template>
  <div class="display-box">
    <h1 class="title">
      <span>Protein </span>
      <span
        v-for="(s, index) in font"
        :key="index"
        v-bind:style="{ color: fontColor[index] }"
        >{{ s }}</span
      >
    </h1>
    <!-- serch -->
    <div class="search-box">
      <el-select
        v-model="sapiens"
        class="m-2"
        placeholder="Select organism"
        style="width: 140px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="input"
        placeholder="protein name"
        clearable
        class="input"
      />
      <router-link class='link' :to="{
        path: '/ae/tissues',
        query: {
          protein: input
        }
      }">
      <el-button type="primary" plain >Search</el-button>
      </router-link>
    </div>
    <p>
      Find the iBAQ distribution for your protein of interest, e.g. ABCD4_HUMAN
    </p>
    <!--  Image  -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// sapiens
const sapiens = ref('')
// select_menus
const options = [
  {
    value: 'Homo sapiens',
    label: 'Homo sapiens'
  }
]


const font = ['V', 'i', 's', 'u', 'a', 'l', 'i', 'z', 'a', 't', 'i', 'o', 'n']
const fontColor = [
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6'
]
// input protien name
const input = ref('')
</script>
<style lang="scss" scoped>
.display-box {
  margin: 0 20px;
}
.introduction-msg {
  font-family: 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  border: 1px solid red;
  margin-bottom: 20px;
}
.input {
  width: 150px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: aqua;
  display: flex;
  align-items: center;
}
h1 {
  text-align: left;
}
.search-box {
  display: flex;
  margin-bottom: 2px;
}
.display-box p {
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-left: 2px;
}
.title {
  font-size: 40px;
  // font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}
.link {
  text-decoration: none;
}
</style>
