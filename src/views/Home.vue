<template>
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks 
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask" 
      :tasks="tasks" 
    />
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'
export default {
  // exports the Home page component which holds the Tasks and AddTask components
  name: 'Home',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask
  },
  data() {  // data() specs what will be passed to the Tasks and AddTask components
    return {
      tasks: [],  // tasks array comes from our fake Rest API server and is passed to Tasks.vue
    }
  },
  methods: {
    // addTask takes a task object when the user clicks the Add Task button and uses fetch to post the task to the fake Rest API server
    async addTask(task) {
      const res = await fetch('api/tasks', {
        // fetch() takes the url and an object with the method, headers, and body of the request
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)  // stringify takes the task object and converts it to a JSON string so that it can be sent to our fake Rest API server
      })

      const data = await res.json() // data can now be used as ref variable for the task object, which holds the new task to be added to the tasks array

      this.tasks = [...this.tasks, data]  // adds the new task to the tasks array, which is passed to Tasks.vue. the spread operator lets us add the new task to the array without mutating it and data is how we access the new task
    },
    async deleteTask(id) {
      if(confirm('Are you sure?')) {
        const res = await fetch(`api/tasks/${id}`, {  // we're using id to specify which task to delete
          method: 'DELETE',
        })

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error deleting task')
      }
    },
    async toggleReminder(id) {
      // taskToToggle is now ref variable for the task object, which holds the task to be toggled
      const taskToToggle = await this.fetchTask(id)
      // updTask ref variable for task object, which we assigned to the taskToToggle object and toggled the reminder property to the opposite of what it was
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

      const res = await fetch(`api/tasks/${id}`, {
        // this section handles the PUT request to the fake Rest API server
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      // this section updates the tasks array bc map returns a new array if the task id matches the id of the task to be toggled
      this.tasks = this.tasks.map((task) => 
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    },
    async fetchTasks() {
      const res = await fetch('api/tasks')  // res now holds the response from the fake Rest API server

      const data = await res.json() // data holds the JSON data from the fake Rest API server

      return data // we'll call this function in the created() lifecycle hook
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)  // id at end of path that dictates which task to fetch from the fake Rest API server

      const data = await res.json() // data ref to task object

      return data // now when we call fetchTask in toggleReminder(), it's passed the id of the task to be toggled and returns the task object
    }
  },
  async created() { // created() is a lifecycle hook that runs when the component is created, aka when the home page is loaded
    this.tasks = await this.fetchTasks()
  }
}
</script>