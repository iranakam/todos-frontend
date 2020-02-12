<template>
  <el-row>
    <el-col :span='12' :offset='6'>
      <el-main class='SigninView'>
        <el-form label-width="120px">
          <el-form-item label='Email' >
            <el-input
              v-model='email'
              maxlength='255'
              clearable
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label='Password'>
            <el-input v-model='password'
              show-password
              clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="createToken">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SigninView',
  data() {
    return {
      activeIndex: this.$route.name,
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.session.create.form.email;
      },
      set(value) {
        this.$store.dispatch('session/setFormEmail', value);
      },
    },
    password: {
      get() {
        return this.$store.state.session.create.form.password;
      },
      set(value) {
        this.$store.dispatch('session/setFormPassword', value);
      },
    },
  },
  methods: {
    createToken() {
      this.$store.dispatch('session/create').then((res) => {
        const title = 'Sign in';
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
</style>
