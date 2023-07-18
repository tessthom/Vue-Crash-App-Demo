import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import About from '../views/About';

// here we're defining routes relative to the root
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

// createRouter() returns an instance of the router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // history means we're using the browser history
  routes, // second param is the routes array above
});

// export to use in main.js
export default router;
