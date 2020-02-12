<template>
  <div class='UpdateSettingComponent'>
    <el-dialog
      :visible.sync='visible'
      width="70%">
      <el-form label-width='100px'>
        <el-form-item label='Email'>
          <el-input
            v-model='email'
            maxlength="255"
            show-word-limit
            size='small'
            placeholder="Please input email">
          </el-input>
        </el-form-item>
        <el-form-item label='Name'>
          <el-input
            v-model='name'
            maxlength="255"
            show-word-limit
            size='small'
            placeholder="Please input name">
          </el-input>
        </el-form-item>
        <el-form-item label='Password'>
          <el-input
            v-model='password'
            maxlength="255"
            show-word-limit
            size='small'
            placeholder="Please input password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">Cancel</el-button>
          <el-button
            type="primary"
            @click="create">
            Create
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UpdateSettingComponent',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.user.update.form.email;
      },
      set(value) {
        this.$store.dispatch('user/setUpdateFormEmail', value);
      },
    },
    name: {
      get() {
        return this.$store.state.user.update.form.name;
      },
      set(value) {
        this.$store.dispatch('user/setUpdateFormName', value);
      },
    },
    password: {
      get() {
        return this.$store.state.user.update.form.password;
      },
      set(value) {
        this.$store.dispatch('user/setUpdateFormPassword', value);
      },
    },
    visible: {
      get() {
        return this.$store.state.user.update.visible;
      },
      set(value) {
        this.$store.dispatch('user/setUpdateVisible', value);
      },
    },
  },
  methods: {
    create() {
      this.$store.dispatch('user/update').then((res) => {
        const title = 'Update setting';
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
      });
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style>
.UpdateSettingComponent {
  text-align: left;
}
</style>
