<template>
  <div>
    <h1 class="is-size-1">This is a DashBoard</h1>
    <ul>
      <li><router-link to="/page/list">List</router-link></li>
      <li><router-link to="/page/detail">Detail</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: function() {
    return {};
  }
};
</script>

<style scoped>
</style>