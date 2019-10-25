<template>
    <div>
        <nav-bar></nav-bar>
        <side-bar>
            <menu-list></menu-list>
        </side-bar>
        <router-view class="container"></router-view>
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