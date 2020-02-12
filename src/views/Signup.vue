<template>
  <el-row>
    <el-col :span='12' :offset='6'>
      <el-main class='SignupView'>
        <el-form label-width="120px">
          <el-form-item label="Email">
            <el-input v-model="email"
              maxlength='255'
              clearable
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="name"
              maxlength='255'
              clearable
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm">
            <el-input v-model="password_confirm" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createUser">
              Create
            </el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'SignupView',
  components: {
  },
  data() {
    return {
      activeIndex: this.$route.name,
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.user.create.form.email;
      },
      set(value) {
        this.$store.dispatch('user/setCreateFormEmail', value);
      },
    },
    name: {
      get() {
        return this.$store.state.user.create.form.name;
      },
      set(value) {
        this.$store.dispatch('user/setCreateFormName', value);
      },
    },
    password: {
      get() {
        return this.$store.state.user.create.form.password;
      },
      set(value) {
        this.$store.dispatch('user/setCreateFormPassword', value);
      },
    },
    password_confirm: {
      get() {
        return this.$store.state.user.create.form.password_confirm;
      },
      set(value) {
        this.$store.dispatch('user/setCreateFormPasswordConfirm', value);
      },
    },
  },
  methods: {
    createUser() {
      this.$store.dispatch('user/create').then((res) => {
        const title = 'Sign up';
        const content = res ? 'Succeed.' : 'Failed.';
        const h = this.$createElement;
        const message = res
          ? h('i', { style: 'color:teal' }, content)
          : h('i', { style: 'color:red' }, content);
        const duration = 2000;
        this.$notify({
          title,
          duration,
          message,
        });
        this.$router.push('/');
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
