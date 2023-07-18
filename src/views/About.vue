<template>
  <h3>Version 1.0.0</h3>
  <router-link to="/">Go Back</router-link>
</template>

<script>
export default {
  // a view is a component that's rendered when a route is visited
  name: 'About',
  inheritAttrs: false,  // prevents attributes from being inherited by the root element of the component
};
</script>