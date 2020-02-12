<template>
  <div class='UpdateTaskComponent'>
    <el-dialog
      :visible.sync='visible'>
      <el-form label-width='100px'>
        <el-form-item label='Name'>
          <el-input
            v-model='name'
            placeholder="Please input task name">
          </el-input>
        </el-form-item>
        <el-form-item label='Schedule'>
          <el-date-picker
            v-model="schedule"
            type="datetime"
            placeholder="Please set deadline">
          </el-date-picker>
        </el-form-item>
        <el-form-item label='priority'>
          <el-select v-model="priority" placeholder="Please set priority">
            <el-option
              v-for='priority in priorityList'
              :key='priority.value'
              :label='priority.label'
              :value='priority.value'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">Cancel</el-button>
          <el-button
            type="primary"
            @click="update">
           Update
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UpdateTaskComponent',
  computed: {
    name: {
      get() {
        return this.$store.state.task.update.form.name;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormName', value);
      },
    },
    schedule: {
      get() {
        return this.$store.state.task.update.form.schedule;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormSchedule', value);
      },
    },
    memo: {
      get() {
        return this.$store.state.task.update.form.memo;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormMemo', value);
      },
    },
    status: {
      get() {
        return this.$store.state.task.update.form.status;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormStatus', value);
      },
    },
    priority: {
      get() {
        return this.$store.state.task.update.form.priority;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormPriority', value);
      },
    },
    priorityList: {
      get() {
        return this.$store.state.task.priority;
      },
    },
    visible: {
      get() {
        return this.$store.state.task.update.visible;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateVisible', value);
      },
    },
  },
  methods: {
    update() {
      this.$store.dispatch('task/update').then((res) => {
        const title = 'Update task';
        const content = res ? 'Succeed.' : 'Failed.';
        const h = this.$createElement;
        const message = res
          ? h('i', { style: 'color:teal' }, content)
          : h('i', { style: 'color:teal' }, content);
        this.$notify({
          title,
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
.UpdateTaskComponent {
  text-align: left;
}
</style>
