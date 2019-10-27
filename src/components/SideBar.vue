<template>
    <div id="sideBar" class="has-background-grey-darker">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        
    },
    // computed: {
    //     hidden: function () {
    //         return this.$routes
    //     }
    // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sideBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 50px;
    background-clip: content-box;
}
#sideBar a {
    color: #fff;
}
</style>
