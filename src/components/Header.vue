<template>
   <el-header class='HeaderComponent'>
    <el-menu
      mode="horizontal" :collapse='isCollapse'
      menu-trigger='click' router>
      <el-submenu index='1'>
        <template slot='title'><i class="el-icon-menu"></i></template>
        <el-menu-item
          index='signin'
          :route="{ name: 'Signin' }"
          v-if='!auth'>
            Sign In
        </el-menu-item>
        <el-menu-item
          index='signup'
          :route="{ name: 'Signup' }"
          v-if='!auth'>
            Sign Up
        </el-menu-item>
        <el-menu-item
          @click='handleSetting'
          v-if='auth'>
            Setting
        </el-menu-item>
        <el-menu-item
          @click='deleteToken'
          v-if='auth'>
            Sign Out
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        @click='handleCreate' v-if='auth'>
        <i class="el-icon-plus"></i>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  components: {
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    createVisible: {
      get() {
        return this.$store.state.task.create.visible;
      },
      set(value) {
        this.$store.dispatch('task/setCreateVisible', value);
      },
    },
    auth() {
      return this.$store.state.session.status;
    },
    updateVisible: {
      get() {
        return this.$store.state.user.update.visible;
      },
      set(value) {
        this.$store.dispatch('user/setUpdateVisible', value);
      },
    },
  },
  methods: {
    handleCreate() {
      this.createVisible = true;
    },
    handleSetting() {
      this.updateVisible = true;
    },
    deleteToken() {
      this.$store.dispatch('session/delete');
      const title = 'Sign out';
      const content = 'Succeed.';
      const h = this.$createElement;
      this.$notify({
        title,
        message: h('i', { style: 'color: teal' }, content),
      });
      this.$router.push('/signin');
    },
  },
};
</script>

<style>
.el-menu--horizontal>.el-menu-item,
.el-menu--horizontal>.el-submenu {
  float: right !important;
}
</style>
