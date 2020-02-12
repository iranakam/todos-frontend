<template>
  <div class='RemoveTaskComponent'>
    <el-dialog
      :visible.sync='visible'>
      <span>Want to remove?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="remove">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RemoveTaskComponent',
  computed: {
    visible: {
      get() {
        return this.$store.state.task.remove.visible;
      },
      set(value) {
        this.$store.dispatch('task/setRemoveVisible', value);
      },
    },
  },
  methods: {
    remove() {
      this.$store.dispatch('task/remove').then((res) => {
        const title = 'Remove task';
        const content = res ? 'Succeed.' : 'Failed.';
        const h = this.$createElement;
        const message = res
          ? h('i', { style: 'color:teal' }, content)
          : h('i', { style: 'color:red' }, content);
        this.$notify({
          title,
          message,
        });
        this.visible = false;
      });
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style>
</style>
