<template>
  <div id="App">
    <el-container>
      <HeaderComponent></HeaderComponent>
      <router-view></router-view>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
// import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    // Footer,
  },
};
</script>

<style>
* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",
  "Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
