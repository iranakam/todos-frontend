<template>
  <el-row class='HomeView'>
    <el-col :span='24'>
      <el-main class="grid-content bg-purple-light">
        <TaskComponent></TaskComponent>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import TaskComponent from '../components/Task.vue';

export default {
  name: 'HomeView',
  components: {
    TaskComponent,
  },
  computed: {
    isAuthorized: {
      get() {
        if (this.$store.state.session.token !== '') {
          return true;
        }
        return false;
      },
    },
  },
};
</script>
