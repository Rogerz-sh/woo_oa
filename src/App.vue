<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
    watch: {
        $route: function() {
            this.auth();
        }
    },
    created: function() {
        var self = this;
        self.$nextTick(function() {
            self.auth();
        });
    }
};
</script>

<style>
html,
body {
    font-family: "微软雅黑";
    height: 100%;
    /* font-size: 12px; */
}
#app {
    height: 100%;
}
#sideBar {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
