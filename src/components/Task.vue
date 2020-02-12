<template>
  <div class='tasks'>
    <el-table
      :data="tasks"
      style="width: 100%">
      :default-sort="{prop: 'date', order: 'descending'}"
      <el-table-column
        label="Date"
        prop='date'
        sortable>
        <template slot-scope='scope'>
          {{formatDateTime(scope.row.schedule).toLocaleString()}}
        </template>
      </el-table-column>
      <el-table-column
        label="Name"
        prop='name'
        sortable>
        <template slot-scope='scope'>
          <span v-bind:class="{'done' : scope.row.status }">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Priority"
        prop='priority'
        sortable>
        <template slot-scope='scope'>
          <span>{{priorityList[scope.row.priority].label}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type='primary'
            @click="handleUpdate(scope.row.id)">
            <i class='el-icon-edit'></i>
          </el-button>
          <el-button
            size="mini"
            type='primary'
            @click="handleStatusToggle(scope.row.id)">
            <span v-if='scope.row.status'><i class='el-icon-refresh-left'></i></span>
            <span v-else><i class='el-icon-check'></i></span>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleRemove(scope.row.id)">
            <i class='el-icon-close'></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <UpdateSettingComponent></UpdateSettingComponent>
    <CreateTaskComponent></CreateTaskComponent>
    <UpdateTaskComponent></UpdateTaskComponent>
    <RemoveTaskComponent></RemoveTaskComponent>
  </div>
</template>

<script>
import CreateTaskComponent from './CreateTask.vue';
import UpdateTaskComponent from './UpdateTask.vue';
import RemoveTaskComponent from './RemoveTask.vue';
import UpdateSettingComponent from './UpdateSetting.vue';

export default {
  name: 'tasks',
  components: {
    CreateTaskComponent,
    UpdateTaskComponent,
    RemoveTaskComponent,
    UpdateSettingComponent,
  },
  computed: {
    tasks: {
      get() {
        return this.$store.state.task.tasks;
      },
    },
    priorityList: {
      get() {
        return this.$store.state.task.priority;
      },
    },
    createVisible: {
      get() {
        return this.$store.state.task.create.visible;
      },
      set(value) {
        this.$store.dispatch('task/setCreateVisible', value);
      },
    },
    updateVisible: {
      get() {
        return this.$store.state.task.update.visible;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateVisible', value);
      },
    },
    updateIndex: {
      get() {
        return this.$store.state.task.update.index;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateIndex', value);
      },
    },
    updateId: {
      get() {
        return this.$store.state.task.update.id;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateId', value);
      },
    },
    removeIndex: {
      get() {
        return this.$store.state.task.remove.index;
      },
      set(value) {
        this.$store.dispatch('task/setRemoveIndex', value);
      },
    },
    removeId: {
      get() {
        return this.$store.state.task.remove.id;
      },
      set(value) {
        this.$store.dispatch('task/setRemoveId', value);
      },
    },
    removeVisible: {
      get() {
        return this.$store.state.task.remove.visible;
      },
      set(value) {
        this.$store.dispatch('task/setRemoveVisible', value);
      },
    },
    updateName: {
      get() {
        return this.$store.state.task.update.name;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormName', value);
      },
    },
    updateSchedule: {
      get() {
        return this.$store.state.task.update.schedule;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormSchedule', value);
      },
    },
    updateStatus: {
      get() {
        return this.$store.state.task.update.status;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormStatus', value);
      },
    },
    updatePriority: {
      get() {
        return this.$store.state.task.update.priority;
      },
      set(value) {
        this.$store.dispatch('task/setUpdateFormPriority', value);
      },
    },
  },
  methods: {
    handleUpdate(id) {
      this.updateIndex = this.tasks.findIndex(item => item.id === id);
      this.updateVisible = true;
      this.updateId = id;
      this.updateName = this.tasks[this.updateIndex].name;
      this.updateSchedule = this.tasks[this.updateIndex].schedule;
      this.updatePriority = this.tasks[this.updateIndex].priority;
      this.updateStatus = this.tasks[this.updateIndex].status;
    },
    handleRemove(id) {
      this.removeVisible = true;
      this.removeIndex = this.tasks.findIndex(item => item.id === id);
      this.removeId = id;
    },
    handleStatusToggle(id) {
      this.updateIndex = this.tasks.findIndex(item => item.id === id);
      this.updateId = id;
      this.updateName = this.tasks[this.updateIndex].name;
      this.updateSchedule = this.tasks[this.updateIndex].schedule;
      this.updateStatus = !this.tasks[this.updateIndex].status;
      this.updatePriority = this.tasks[this.updateIndex].priority;
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
    formatDateTime(string) {
      const date = new Date(string);
      return date;
    },
  },
  mounted() {
    this.$store.dispatch('task/read');
  },
};
</script>

<style>
span.done {
  text-decoration: line-through;
}
</style>
