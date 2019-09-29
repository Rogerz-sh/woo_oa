<template>
  <div>
    <h1 class="is-size-1">This is a Resume</h1>
    <ul>
      <li>
        <router-link to="/resume/list">List</router-link>
      </li>
      <li>
        <router-link to="/resume/detail">Detail</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Resume",
  data: function() {
    return {};
  }
};
</script>

<style scoped>
</style>