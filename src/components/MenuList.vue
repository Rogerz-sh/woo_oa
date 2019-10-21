<template>
    <div id="menu" class="menu">
        <div v-for="(menu, index) in storeMenus" :key="index">
            <p class="menu-label" v-text="menu.name">常规分类</p>
            <ul class="menu-list">
                <li v-for="item in menu.items" :key="item.id">
                    <router-link :class="{'is-active': $store.state.activeMenuId == item.id}" :to="item.url" v-text="item.text">人才库</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "MenuList",
    computed: {
        storeMenus: function() {
            return this.$store.state.menus;
        },
        actived: function() {
            return this.$store.state.activeMenuId;
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
