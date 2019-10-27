<template>
    <div>
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Main",
    mounted: function () {
        var self = this;
        this.$http.get('/api/common/json-menu-list').then(res => {
            self.$store.commit('loadMenu', res.results);
        });
    }
};
</script>

<style scoped>
</style>