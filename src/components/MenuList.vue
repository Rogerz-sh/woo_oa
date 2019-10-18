<template>
    <div id="menu" class="menu">
        <template v-for="(menu, index) in storeMenus">
            <p class="menu-label" :key="index" v-text="menu.name">常规分类</p>
            <ul class="menu-list" :key="index">
                <li v-for="item in menu.items" :key="item.url">
                    <a :href="item.url" v-text="item.text">人才库</a>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
export default {
    name: "MenuList",    
    computed: {
        storeMenus: function () {
            return this.$store.state.menus;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
    margin-top: 10px;
}
#menu .menu-label {
    color: #ddd;
}
a {
    color: #fff;
}
</style>
