<template>
    <div id="app">
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
    computed: {

    },
    mounted: function() {
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
.container {
    padding-left: 200px;
}
</style>
