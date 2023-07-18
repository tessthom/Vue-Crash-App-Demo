<template>
  <div :key="task.id" v-for="task in tasks">
    <Task 
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)" 
      :task="task" 
    />
  </div>
</template>

<script>
import Task from './Task'

  export default {
    name: 'Tasks',
    props: {
      tasks: Array, // array holds the tasks and is passed from App.vue
    },
    components: {
      Task,
    },
    emits: ['delete-task', 'toggle-reminder'],  // sends the 'delete-task' and 'toggle-reminder' events to App.vue
  }
</script>