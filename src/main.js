import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// returns instance of the App component
createApp(App)
  .use(router)  // instructs app to use router from router/index.js
  .mount('#app')  // mounts the app to the #app div in public/index.html