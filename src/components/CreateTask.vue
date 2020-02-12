<template>
  <div class='CreateTaskComponent'>
    <el-dialog
      :visible.sync='visible'
      width="70%">
      <el-form label-width='100px' :rules='rules'>
        <el-form-item label='Name'>
          <el-input
            v-model='name'
            maxlength="255"
            show-word-limit
            size='small'
            placeholder="Please input task name">
          </el-input>
        </el-form-item>
        <el-form-item label='Schedule'>
          <el-date-picker
            v-model="schedule"
            type="datetime"
            size='small'
            default='new Date()'
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
  name: 'CreateTaskComponent',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.task.create.form.name;
      },
      set(value) {
        this.$store.dispatch('task/setCreateFormName', value);
      },
    },
    schedule: {
      get() {
        return this.$store.state.task.create.form.schedule;
      },
      set(value) {
        this.$store.dispatch('task/setCreateFormSchedule', value);
      },
    },
    priority: {
      get() {
        return this.$store.state.task.create.form.priority;
      },
      set(value) {
        this.$store.dispatch('task/setCreateFormPriority', value);
      },
    },
    priorityList: {
      get() {
        return this.$store.state.task.priority;
      },
    },
    rules: {
      get() {
        return this.$store.state.task.rules;
      },
    },
    visible: {
      get() {
        return this.$store.state.task.create.visible;
      },
      set(value) {
        this.$store.dispatch('task/setCreateVisible', value);
      },
    },
  },
  methods: {
    create() {
      this.$store.dispatch('task/create').then((res) => {
        const title = 'Create task';
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
.CreateTaskComponent {
  text-align: left;
}
</style>
